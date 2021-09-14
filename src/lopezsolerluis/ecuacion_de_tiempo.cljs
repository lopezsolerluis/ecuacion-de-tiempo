(ns ^:figwheel-hooks lopezsolerluis.ecuacion-de-tiempo
  (:require
   [goog.dom :as gdom]
   [goog.events :as gevents]
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljsjs.react-vis :as rvis]
   ;;["d3-time-format" :refer (timeFormatDefaultLocale)]
   [lopezsolerluis.ecuaciones :as ecu]))

(def anio 365.25)
(def inclinacion (r/atom (ecu/rad 23.5)))
(def excentricidad (r/atom 0.01671))
(def perihelio (r/atom (ecu/dia-del-anio 4 1)))
(def equinoccio-marzo (r/atom (ecu/dia-del-anio 21 3)))

(defn crear-datos
  ([fun] (crear-datos fun 1 anio))
  ([fun delta-t] (crear-datos fun delta-t anio))
  ([fun delta-t anio]
   (mapv (fn [t]
          (let [tt (* t delta-t)]
            {:x (ecu/dia->ms tt) :y (fun tt)}))
       (range (dec (/ anio delta-t))))))

(defn calcular-ecuacion-tiempo [datos-centro datos-reduccion]
  (mapv (fn [{x1 :x y1 :y} {x2 :x y2 :y}]
            {:x x1 :y (+ y1 y2)})
        datos-centro datos-reduccion))

(defn calcular-ecuacion [ecuacion fase parametro]
  (crear-datos (fn [t] (-> (ecu/anomalia-media (- t fase -1) anio)
                           (ecuacion parametro)))))

(defn calcular-series []
  (let [datos-centro (calcular-ecuacion ecu/ecuacion-de-centro @perihelio @excentricidad)
        datos-reduccion (calcular-ecuacion ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo datos-centro datos-reduccion)]
    (-> {}
        (assoc :data-centro datos-centro)
        (assoc :data-reduccion datos-reduccion)
        (assoc :data-ecuacion-tiempo datos-ecuacion-tiempo)
        (assoc :data-centro-extremos (ecu/extremos datos-centro))
        (assoc :data-reduccion-extremos (ecu/extremos datos-reduccion))
        (assoc :data-ecuacion-tiempo-extremos (ecu/extremos datos-ecuacion-tiempo)))))

(def ecuaciones (r/atom (calcular-series)))

(defn actualizar-serie [ecuacion fase parametro]
  (let [datos-nuevos (calcular-ecuacion ecuacion fase parametro)
        ecuaciones-nuevas (assoc @ecuaciones (if (= ecu/ecuacion-de-centro ecuacion) :data-centro :data-reduccion) datos-nuevos)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo (:data-centro ecuaciones-nuevas) (:data-reduccion ecuaciones-nuevas))
        extremos-nuevos (ecu/extremos datos-nuevos)]
      (-> ecuaciones-nuevas
          (assoc :data-ecuacion-tiempo datos-ecuacion-tiempo)
          (assoc (if (= ecu/ecuacion-de-centro ecuacion) :data-centro-extremos :data-reduccion-extremos) extremos-nuevos)
          (assoc :data-ecuacion-tiempo-extremos (ecu/extremos datos-ecuacion-tiempo)))))


(defn get-app-element []
  (gdom/getElement "app"))

(def axis-style {:line {:stroke "#333"}
                 :ticks {:stroke "#999"}
                 :text {:stroke "none"
                        :fill "#333"}})

(def line-style {:fill "none" :strokeLinejoin "round" :strokeLinecap "round"})

(defn line-chart [[data1 color1] data1-extremos [data2 color2] data2-extremos [data3 color3] data3-extremos]
  [:> rvis/XYPlot
   {:width 1500 :height 700 :margin {:left 150 :right 50} :xType "time-utc" :yType "time-utc"}
   [:> rvis/VerticalGridLines {:style axis-style}]
   [:> rvis/HorizontalGridLines {:style axis-style}]
   [:> rvis/XAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat #(ecu/ms->mes %)}]
   [:> rvis/YAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat  #(ecu/ms->hms %)}]
   [:> rvis/DiscreteColorLegend {:style {:position "absolute" :left 200 :top 10}
                                 :orientation "horizontal"
                                 ;;:colors [color1 color2 color3]
                                 :items [{:title " Ecuación de Tiempo" :color color1 :strokeWidth 15}
                                         " Ecuación de Centro"
                                         " Reducción al Ecuador"]}]
   [:> rvis/LineSeries {:data data1 :strokeWidth 5 :stroke color1
                          :style line-style}]
   [:> rvis/MarkSeries {:data data1-extremos :stroke color1 :fill color1 :size 5}]
   [:> rvis/LineSeries {:data data2 :strokeWidth 2 :stroke color2
                        :style line-style}]
   [:> rvis/MarkSeries {:data data2-extremos :stroke color2 :fill color2 :size 3}]
   [:> rvis/LineSeries {:data data3 :strokeWidth 2 :stroke color3
                        :style line-style}]
   [:> rvis/MarkSeries {:data data3-extremos :stroke color3 :fill color3 :size 3}]])


(defn graph []
  [:div.graph
   [line-chart [(:data-ecuacion-tiempo @ecuaciones) "red"]
               (:data-ecuacion-tiempo-extremos @ecuaciones)
               [(:data-centro @ecuaciones) "blue"]
               (:data-centro-extremos @ecuaciones)
               [(:data-reduccion @ecuaciones) "green"]
               (:data-reduccion-extremos @ecuaciones) "green"]])

(defn slider-inclinacion []
  [:div
   [:label "Inclinación: " (.toFixed (ecu/deg @inclinacion) 2) "°"]
   [:input {:type "range" :defaultValue (ecu/deg @inclinacion) :min 0 :max 89.99 :step 0.01 :id "slider-inclinacion"
            :onInput (fn [e]
                       (let [valor (js/parseFloat (.. e -target -value))]
                         (reset! inclinacion (ecu/rad valor))
                         (reset! ecuaciones (actualizar-serie ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion))))}]])
(defn slider-excentricidad []
  [:div
   [:label "Excentricidad: " (.toFixed @excentricidad 3)]
   [:input {:type "range" :defaultValue @excentricidad :min 0 :max 0.999 :step 0.001 :id "slider-excentricidad"
            :onInput (fn [e]
                       (let [valor (js/parseFloat (.. e -target -value))]
                         (reset! excentricidad valor)
                         (reset! ecuaciones (actualizar-serie ecu/ecuacion-de-centro @perihelio @excentricidad))))}]])
(defn slider-equinoccio-marzo []
  [:div
   [:label "Equinoccio del punto Vernal: " (ecu/getDate @equinoccio-marzo)]
   [:input {:type "range" :defaultValue @equinoccio-marzo :min 1 :max 365 :step 1 :id "slider-equinoccio-marzo"
            :onInput (fn [e]
                       (let [valor (js/parseInt (.. e -target -value))]
                         (reset! equinoccio-marzo valor)
                         (reset! ecuaciones (actualizar-serie ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion))))}]])

(defn slider-perihelio []
  [:div
   [:label "Perihelio: " (ecu/getDate @perihelio)]
   [:input {:type "range" :defaultValue @perihelio :min 1 :max 365 :step 1 :id "slider-perihelio"
            :onInput (fn [e]
                       (let [valor (js/parseInt (.. e -target -value))]
                         (reset! perihelio valor)
                         (reset! ecuaciones (actualizar-serie ecu/ecuacion-de-centro @perihelio @excentricidad))))}]])

(defn sliders []
  [:div
   [slider-inclinacion]
   [slider-excentricidad]
   [slider-equinoccio-marzo]
   [slider-perihelio]])

(defn app []
  [:div
    [graph]
    [sliders]])

(defn mount [el]
  (rdom/render [app] el))

(defn mount-app-element []
  (when-let [el (get-app-element)]
    (mount el)))

(mount-app-element)

;; specify reload hook with ^;after-load metadata
(defn ^:after-load on-reload []
  (mount-app-element))
