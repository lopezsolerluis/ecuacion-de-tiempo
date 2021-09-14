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
            {:x (ecu/dia->ms tt) :y (/ (fun tt) 1000)}))
       (range (/ anio delta-t)))))

(defn calcular-ecuacion-tiempo [datos-centro datos-reduccion]
  (mapv (fn [{x1 :x y1 :y} {x2 :x y2 :y}]
            {:x x1 :y (+ y1 y2)})
        datos-centro datos-reduccion))

(defn calcular-ecuacion [ecuacion fase parametro]
  (crear-datos (fn [t] (-> (ecu/anomalia-media (- t fase -1) anio)
                           (ecuacion parametro)))))

(defn calcular-ecuaciones []
  (let [datos-centro (calcular-ecuacion ecu/ecuacion-de-centro @perihelio @excentricidad)
        datos-reduccion (calcular-ecuacion ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo datos-centro datos-reduccion)]
    (-> {}
        (assoc :data-centro datos-centro)
        (assoc :data-reduccion datos-reduccion)
        (assoc :data-ecuacion-tiempo datos-ecuacion-tiempo))))

(def ecuaciones (r/atom (calcular-ecuaciones)))

(defn actualizar-ecuacion [ecuacion fase parametro]
  (let [datos-nuevos (calcular-ecuacion ecuacion fase parametro)
        ecuaciones-nuevas (assoc @ecuaciones (if (= ecu/ecuacion-de-centro ecuacion) :data-centro :data-reduccion) datos-nuevos)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo (:data-centro ecuaciones-nuevas) (:data-reduccion ecuaciones-nuevas))]
    (assoc ecuaciones-nuevas :data-ecuacion-tiempo datos-ecuacion-tiempo)))

; (defn leer-slider [slider]
;   (js/parseFloat (.-value slider)))

(defn get-app-element []
  (gdom/getElement "app"))

(def axis-style {:line {:stroke "#333"}
                 :ticks {:stroke "#999"}
                 :text {:stroke "none"
                        :fill "#333"}})

(defn line-chart [[data1 color1] [data2 color2] [data3 color3]]
  [:> rvis/XYPlot
   {:width 1500 :height 700 :margin {:left 150 :right 50} :xType "time" :yType "time-utc"}
   [:> rvis/VerticalGridLines {:style axis-style}]
   [:> rvis/HorizontalGridLines {:style axis-style}]
   [:> rvis/XAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style}]
   [:> rvis/YAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat  #(ecu/ms->hms (* % 1000))}]
   [:> rvis/DiscreteColorLegend {:style {:position "absolute" :left 200 :top 10}
                                 :orientation "horizontal"
                                 :colors [color1 color2 color3]
                                 :items [" Ecuación de Tiempo"
                                         " Ecuación de Centro"
                                         " Reducción al Ecuador"]}]
   [:> rvis/LineSeries {:data data1 :strokeWidth 5 :stroke color1
                        :style {:fill "none"}}]
   [:> rvis/LineSeries {:data data2 :stroke color2
                        :style {:fill "none"}}]
   [:> rvis/LineSeries {:data data3 :stroke color3
                        :style {:fill "none"}}]])

(defn graph []
  [:div.graph
   [line-chart [(:data-ecuacion-tiempo @ecuaciones) "red"]
               [(:data-centro @ecuaciones) "blue"]
               [(:data-reduccion @ecuaciones) "green"]]])

(defn slider-inclinacion []
  [:div
   [:label "Inclinación: " (.toFixed (ecu/deg @inclinacion) 2) "º"]
   [:input {:type "range" :defaultValue (ecu/deg @inclinacion) :min 0 :max 89.99 :step 0.01 :id "slider-inclinacion"
            :onInput (fn [e]
                       (let [valor (js/parseFloat (.. e -target -value))]
                         (reset! inclinacion (ecu/rad valor))
                         (reset! ecuaciones (actualizar-ecuacion ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion))))}]])
(defn slider-excentricidad []
  [:div
   [:label "Excentricidad: " (.toFixed @excentricidad 3)]
   [:input {:type "range" :defaultValue @excentricidad :min 0 :max 0.999 :step 0.001 :id "slider-excentricidad"
            :onInput (fn [e]
                       (let [valor (js/parseFloat (.. e -target -value))]
                         (reset! excentricidad valor)
                         (reset! ecuaciones (actualizar-ecuacion ecu/ecuacion-de-centro @perihelio @excentricidad))))}]])
(defn slider-equinoccio-marzo []
  [:div
   [:label "Equinoccio del punto Vernal: " (ecu/getDate @equinoccio-marzo)]
   [:input {:type "range" :defaultValue @equinoccio-marzo :min 1 :max 365 :step 1 :id "slider-equinoccio-marzo"
            :onInput (fn [e]
                       (let [valor (js/parseInt (.. e -target -value))]
                         (reset! equinoccio-marzo valor)
                         (reset! ecuaciones (actualizar-ecuacion ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion))))}]])

(defn slider-perihelio []
  [:div
   [:label "Perihelio: " (ecu/getDate @perihelio)]
   [:input {:type "range" :defaultValue @perihelio :min 1 :max 365 :step 1 :id "slider-perihelio"
            :onInput (fn [e]
                       (let [valor (js/parseInt (.. e -target -value))]
                         (reset! perihelio valor)
                         (reset! ecuaciones (actualizar-ecuacion ecu/ecuacion-de-centro @perihelio @excentricidad))))}]])

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

;;(set! (.-value label-inclinacion) 1)
   ;;(str "Inclinación: " (.toFixed (ecu/deg @inclinacion) 2) "º"))
