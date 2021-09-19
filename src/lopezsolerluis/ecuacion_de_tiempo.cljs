(ns ^:figwheel-hooks lopezsolerluis.ecuacion-de-tiempo
  (:require
   [goog.dom :as gdom]
   [goog.events :as gevents]
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljsjs.react-vis :as rvis]
   [lopezsolerluis.ecuaciones :as ecu]))

(def anio 365.25)
(def inclinacion-terrestre (ecu/rad 23.5))
(def excentricidad-terrestre 0.01671)
(def equinoccio-marzo-terrestre (ecu/dia-del-anio 21 3))
(def perihelio-terrestre (ecu/dia-del-anio 4 1))
(def inclinacion (r/atom inclinacion-terrestre))
(def excentricidad (r/atom excentricidad-terrestre))
(def perihelio (r/atom perihelio-terrestre))
(def equinoccio-marzo (r/atom equinoccio-marzo-terrestre))

(defn crear-datos
  ([fun]
   (mapv (fn [t]
          {:x (ecu/dia->ms t) :y (fun t)})
       (range (dec anio))))
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
(swap! ecuaciones assoc :opacidad 1)

(defn actualizar-serie [ecuacion fase parametro]
  (let [datos-nuevos (calcular-ecuacion ecuacion fase parametro)
        ecuaciones-nuevas (assoc @ecuaciones (if (= ecu/ecuacion-de-centro ecuacion) :data-centro :data-reduccion) datos-nuevos)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo (:data-centro ecuaciones-nuevas) (:data-reduccion ecuaciones-nuevas))]
    (assoc ecuaciones-nuevas :data-ecuacion-tiempo datos-ecuacion-tiempo)))


(defn actualizar-extremos
  "'data-tipo' es :data-centro o :data-reduccion"
  [data-tipo]
  (let [extremos-nuevos (ecu/extremos (data-tipo @ecuaciones))]
    (-> @ecuaciones
      (assoc (if (= :data-centro data-tipo) :data-centro-extremos :data-reduccion-extremos) extremos-nuevos)
      (assoc :data-ecuacion-tiempo-extremos (ecu/extremos (:data-ecuacion-tiempo @ecuaciones))))))

(defn getHeightOfElement [e]
  (.-offsetHeight e))

(defn getWindowHeight []
  (.-innerHeight js/window))

(defn get-app-element []
  (gdom/getElement "app"))

(def axis-style {:line {:stroke "#333"}
                 :ticks {:stroke "#999"}
                 :text {:stroke "none"
                        :fill "#333"}})

(def line-style {:fill "none" :strokeLinejoin "round" :strokeLinecap "round"})

(defn line-chart [[data1 color1] data1-extremos [data2 color2] data2-extremos [data3 color3] data3-extremos]
  (let [extremo-absoluto-maximo (->> (map (fn [punto] (ecu/abs (:y punto))) data1-extremos)
                                      (reduce max))]
    [:> rvis/FlexibleXYPlot
     {:margin {:left 100 :right 50} :xType "time-utc" :yType "time-utc" :yDomain (if (< extremo-absoluto-maximo 100) [-100,100])}
     [:> rvis/VerticalGridLines {:style axis-style}]
     [:> rvis/HorizontalGridLines {:style axis-style}]
     [:> rvis/XAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat #(ecu/ms->mes %)}]
     [:> rvis/YAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat  #(ecu/ms->hms %)}]
     [:> rvis/DiscreteColorLegend {:style {:position "absolute" :left 120 :top 10}
                                   :orientation "horizontal"
                                   :items [{:title " Ecuación de Tiempo" :color color1 :strokeWidth 3}
                                           {:title " Reducción al Ecuador" :color color3 :strokeWidth 3}
                                           {:title " Ecuación de Centro"  :color color2 :strokeWidth 3}]}]
     (if (not= 0 @inclinacion @excentricidad)
      (doall (for [item data1-extremos]
              ^{:key (str "et" (:x item))} [:> rvis/Hint {:value item}
                                            [:div {:style {:color "#333" :fontWeight "bold" :opacity (:opacidad @ecuaciones)}}
                                                (ecu/ms->hms (:y item))]])))
     (if (not= 0 @inclinacion)
      (doall (for [item data3-extremos]
              ^{:key (str "re" (:x item))} [:> rvis/Hint {:value item}
                                            [:div {:style {:color "#333" :fontWeight "bold" :opacity (:opacidad @ecuaciones)}}
                                                  (ecu/ms->hms (:y item))]])))
     (if (not= 0 @excentricidad)
       (doall (for [item data2-extremos]
               ^{:key (str "ec" (:x item))} [:> rvis/Hint {:value item}
                                             [:div {:style {:color "#333" :fontWeight "bold" :opacity (:opacidad @ecuaciones)}}
                                                 (ecu/ms->hms (:y item))]])))

     [:> rvis/LineSeries {:data data1 :strokeWidth 5 :stroke color1
                          :style line-style}]
     (if (not= 0 @inclinacion @excentricidad)
         [:> rvis/MarkSeries {:data data1-extremos :stroke color1 :size 5
                              :fill color1 :opacity (:opacidad @ecuaciones)}])
     [:> rvis/LineSeries {:data data2 :strokeWidth 2 :stroke color2
                          :style line-style}]
     (if (not= 0 @excentricidad)
         [:> rvis/MarkSeries {:data data2-extremos :stroke color2 :size 3
                              :fill color2 :opacity (:opacidad @ecuaciones)}])
     [:> rvis/LineSeries {:data data3 :strokeWidth 2 :stroke color3
                          :style line-style}]
     (if (not= 0 @inclinacion)
         [:> rvis/MarkSeries {:data data3-extremos :stroke color3 :size 3
                              :fill color3 :opacity (:opacidad @ecuaciones)}])]))

(def color-centro "green")
(def color-proyeccion "blue")
(def color-ecuacion-tiempo "red")

(defn graph []
  [:div.graph
   [line-chart [(:data-ecuacion-tiempo @ecuaciones) color-ecuacion-tiempo]
               (:data-ecuacion-tiempo-extremos @ecuaciones)
               [(:data-centro @ecuaciones) color-centro]
               (:data-centro-extremos @ecuaciones)
               [(:data-reduccion @ecuaciones) color-proyeccion]
               (:data-reduccion-extremos @ecuaciones)]])

(defn slider
  [label atom-value fn-value-label digits label2 fn-value-range min max step id fn-value-2 ecuacion param1 param2 tipo-data]
  [:div
   [:label.valor label (if digits (.toFixed (fn-value-label @atom-value) digits) (fn-value-label @atom-value)) label2]
   [:input {:type "range" :defaultValue (fn-value-range @atom-value) :min min :max max :step step :id id
            :onInput (fn [e]
                       (let [valor (js/parseFloat (.. e -target -value))]
                         (swap! ecuaciones assoc :opacidad 0)
                         (reset! atom-value (fn-value-2 valor))
                         (reset! ecuaciones (actualizar-serie ecuacion @param1 @param2))))
            :onTouchEnd (fn [_] (reset! ecuaciones (actualizar-extremos tipo-data))
                                (swap! ecuaciones assoc :opacidad 1))
            :onMouseUp (fn [_] (reset! ecuaciones (actualizar-extremos tipo-data))
                               (swap! ecuaciones assoc :opacidad 1))
            :onKeyUp (fn [_] (reset! ecuaciones (actualizar-extremos tipo-data))
                             (swap! ecuaciones assoc :opacidad 1))}]])

(defn sliders []
  [:div.form
   [:span.medio
    [:span {:style {:color color-proyeccion}}
      [slider "Inclinación: " inclinacion ecu/deg 2 "°" ecu/deg 0 89.99 0.01 "slider-inclinacion" ecu/rad ecu/reduccion-al-ecuador equinoccio-marzo inclinacion :data-reduccion]
      [slider "Equinoccio del punto Vernal: " equinoccio-marzo ecu/getDate false "" identity 1 365 1 "slider-equinoccio-marzo" identity ecu/reduccion-al-ecuador equinoccio-marzo inclinacion :data-reduccion]]
    [:input {:type "button" :value "Reset" :style {:color color-proyeccion}
             :on-click (fn[] (reset! inclinacion inclinacion-terrestre)
                             (reset! equinoccio-marzo equinoccio-marzo-terrestre)
                             (reset! ecuaciones (actualizar-serie ecu/reduccion-al-ecuador @equinoccio-marzo @inclinacion))
                             ; (set! (.-val slider-inclinacion) inclinacion-terrestre)
                             (reset! ecuaciones (actualizar-extremos :data-reduccion)))}]]

   [:span.medio
     [:span {:style {:color color-centro}}
       ;;[slider-excentricidad]
       [slider "Excentricidad: " excentricidad identity 3 "" identity 0 0.999 0.001 "slider-excentricidad" identity ecu/ecuacion-de-centro perihelio excentricidad :data-centro]
       [slider "Perihelio: " perihelio ecu/getDate false "" identity 1 365 1 "slider-perihelio" identity ecu/ecuacion-de-centro perihelio excentricidad :data-centro]
       ;;[slider-perihelio]
       [:input {:type "button" :value "Reset" :style {:color color-centro}
                :on-click (fn[] (reset! excentricidad excentricidad-terrestre)
                                (reset! perihelio perihelio-terrestre)
                                (reset! ecuaciones (actualizar-serie ecu/ecuacion-de-centro @perihelio @excentricidad))
                                (reset! ecuaciones (actualizar-extremos :data-centro)))}]]]])

(defn app []
  [:div.todo
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
