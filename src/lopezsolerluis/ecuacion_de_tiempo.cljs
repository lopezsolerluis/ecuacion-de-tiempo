(ns ^:figwheel-hooks lopezsolerluis.ecuacion-de-tiempo
  (:require
   [goog.dom :as gdom]
   [goog.events :as gevents]
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljsjs.react-vis :as rvis]
   [lopezsolerluis.math :as math]
   [lopezsolerluis.ecuaciones :as ecu]
   [lopezsolerluis.traducciones :as trad :refer [app-tr]]))

(defn getLanguage []
  (-> (or (.-language js/navigator) (.-userLanguage js/navigator) "en")
      (subs 0 2)))

(def language-selector (gdom/getElement "language"))

(set! (.-value language-selector) (getLanguage))

;(def anio-tropico 365.24219) ; https://scienceworld.wolfram.com/astronomy/TropicalYear.html
(def anio-anomalistico 365.259635) ; https://scienceworld.wolfram.com/astronomy/AnomalisticYear.html
(def inclinacion-terrestre (math/rad 23.5))
(def excentricidad-terrestre 0.017)
(def equinoccio-marzo-terrestre (ecu/dia-del-anio 21 3))
(def perihelio-terrestre (ecu/dia-del-anio 4 1))
(def inclinacion (r/atom inclinacion-terrestre))
(def excentricidad (r/atom excentricidad-terrestre))
(def perihelio (r/atom perihelio-terrestre))
(def equinoccio-marzo (r/atom equinoccio-marzo-terrestre))
(def lang (r/atom (keyword (getLanguage))))

(defn crear-datos
  ([fun anio]
   (mapv (fn [t]
          {:x (ecu/dia->ms t) :y (fun t)})
       (range (dec anio))))
  ([fun anio delta-t]
   (mapv (fn [t]
          (let [tt (* t delta-t)]
            {:x (ecu/dia->ms tt) :y (fun tt)}))
       (range (dec (/ anio delta-t))))))

(defn calcular-ecuacion [ecuacion]
  (crear-datos (fn [dia] (ecuacion dia anio-anomalistico @perihelio @excentricidad @equinoccio-marzo @inclinacion))
                      anio-anomalistico))

(defn calcular-ecuacion-tiempo [datos-centro datos-reduccion]
  (mapv (fn [{x1 :x y1 :y} {x2 :x y2 :y}]
            {:x x1 :y (+ y1 y2)})
        datos-centro datos-reduccion))

(defn calcular-series []
  (let [datos-centro (calcular-ecuacion ecu/ecuacion-de-centro)
        datos-reduccion (calcular-ecuacion ecu/reduccion-al-ecuador)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo datos-centro datos-reduccion)]
    (-> {}
        (assoc :data-centro datos-centro)
        (assoc :data-reduccion datos-reduccion)
        (assoc :data-ecuacion-tiempo datos-ecuacion-tiempo)
        (assoc :data-centro-extremos (ecu/extremos datos-centro))
        (assoc :data-reduccion-extremos (ecu/extremos datos-reduccion))
        (assoc :data-ecuacion-tiempo-extremos (ecu/extremos datos-ecuacion-tiempo)))))

(def ecuaciones (r/atom (calcular-series)))

(defn actualizar-serie [ecuacion]
  (let [datos-nuevos (calcular-ecuacion ecuacion)
        ecuaciones-nuevas (assoc @ecuaciones (if (= ecu/ecuacion-de-centro ecuacion) :data-centro :data-reduccion) datos-nuevos)
        datos-ecuacion-tiempo (calcular-ecuacion-tiempo (:data-centro ecuaciones-nuevas) (:data-reduccion ecuaciones-nuevas))]
    (assoc ecuaciones-nuevas :data-ecuacion-tiempo datos-ecuacion-tiempo)))

(defn actualizar-extremos-una-serie
  "'data-tipo' es :data-centro o :data-reduccion"
  [data-tipo]
  (let [extremos-nuevos (ecu/extremos (data-tipo @ecuaciones))]
    (-> @ecuaciones
      (assoc (if (= :data-centro data-tipo) :data-centro-extremos :data-reduccion-extremos) extremos-nuevos)
      (assoc :data-ecuacion-tiempo-extremos (ecu/extremos (:data-ecuacion-tiempo @ecuaciones))))))

(defn actualizar-extremos []
  (-> @ecuaciones
    (assoc :data-centro-extremos (ecu/extremos (:data-centro @ecuaciones)))
    (assoc :data-reduccion-extremos (ecu/extremos (:data-reduccion @ecuaciones)))
    (assoc :data-ecuacion-tiempo-extremos (ecu/extremos (:data-ecuacion-tiempo @ecuaciones)))))

(defn get-app-element []
  (gdom/getElement "app"))

(def axis-style {:line {:stroke "#333"}
                 :ticks {:stroke "#999"}
                 :text {:stroke "none"
                        :fill "#333"}})

(def line-style {:fill "none" :strokeLinejoin "round" :strokeLinecap "round"})

(defn line-chart [[data1 color1] data1-extremos [data2 color2] data2-extremos [data3 color3] data3-extremos]
  (let [extremo-absoluto-maximo (->> (map (fn [punto] (math/abs (:y punto))) (or data1-extremos
                                                                                 (ecu/extremos (:data-ecuacion-tiempo @ecuaciones))))
                                     (reduce max))]
    [:> rvis/FlexibleXYPlot
     {:margin {:left 100 :right 50 :top 20} :xType "time-utc" :yType "time-utc"
                                                              :yDomain (if (< extremo-absoluto-maximo 100) [-100,100])}
     [:> rvis/VerticalGridLines {:style axis-style}]
     [:> rvis/HorizontalGridLines {:style axis-style}]
     [:> rvis/XAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat #(ecu/ms->mes @lang %)}]
     [:> rvis/YAxis {:tickSizeInner 0 :tickSizeOuter 6 :style axis-style :tickFormat  #(ecu/ms->hms %)}]
     [:> rvis/DiscreteColorLegend {:style {:position "absolute" :left 120 :top 10}
                                   :orientation "vertical"
                                   :items [{:title (app-tr @lang :ecuacion-de-tiempo) :color color1 :strokeWidth 3}
                                           {:title (app-tr @lang :reduccion-al-ecuador) :color color3 :strokeWidth 3}
                                           {:title (app-tr @lang :ecuacion-de-centro) :color color2 :strokeWidth 3}]}]
     (if (not= 0 @inclinacion @excentricidad)
      (doall (for [item data1-extremos]
              ^{:key (str "et" (:x item))} [:> rvis/Hint {:value item}
                                            [:div {:style {:color "#333" :fontWeight "bold"}}
                                                (ecu/ms->hms (:y item))]])))
     (if (not= 0 @inclinacion)
      (doall (for [item data3-extremos]
              ^{:key (str "re" (:x item))} [:> rvis/Hint {:value item}
                                            [:div {:style {:color "#333" :fontWeight "bold"}}
                                                  (ecu/ms->hms (:y item))]])))
     (if (not= 0 @excentricidad)
       (doall (for [item data2-extremos]
               ^{:key (str "ec" (:x item))} [:> rvis/Hint {:value item}
                                             [:div {:style {:color "#333" :fontWeight "bold"}}
                                                 (ecu/ms->hms (:y item))]])))

     [:> rvis/LineSeries {:data data1 :strokeWidth 5 :stroke color1
                          :style line-style}]
     (if (not= 0 @inclinacion @excentricidad)
         [:> rvis/MarkSeries {:data data1-extremos :stroke color1 :size 5
                              :fill color1}])
     [:> rvis/LineSeries {:data data2 :strokeWidth 2 :stroke color2
                          :style line-style}]
     (if (not= 0 @excentricidad)
         [:> rvis/MarkSeries {:data data2-extremos :stroke color2 :size 3
                              :fill color2}])
     [:> rvis/LineSeries {:data data3 :strokeWidth 2 :stroke color3
                          :style line-style}]
     (if (not= 0 @inclinacion)
         [:> rvis/MarkSeries {:data data3-extremos :stroke color3 :size 3
                              :fill color3}])]))

(def color-centro "green")
(def color-proyeccion "blue")
(def color-ecuacion-tiempo "red")

(defn graph []
  [:div.graph
   [line-chart ;[(:data-ecuacion-tiempo @ecuaciones) color-ecuacion-tiempo]
               ;(:data-ecuacion-tiempo-extremos @ecuaciones)
               [(:data-centro @ecuaciones) color-centro]
               (:data-centro-extremos @ecuaciones)]])
            ;   [(:data-reduccion @ecuaciones) color-proyeccion]
            ;   (:data-reduccion-extremos @ecuaciones)]])

(defn slider
  [label atom-value fn-value-label digits label2 fn-value-range min max step id fn-value-2 ecuacion]
  (letfn [(fn-change-start [] (swap! ecuaciones dissoc :data-centro-extremos :data-reduccion-extremos :data-ecuacion-tiempo-extremos))
          (fn-change-end [] (reset! ecuaciones (actualizar-extremos)))]
    [:div
     [:label.valor label (if digits (.toFixed (fn-value-label @atom-value) digits) (fn-value-label @atom-value)) label2]
     [:input {:type "range" :value (fn-value-range @atom-value) :min min :max max :step step :id id
              :onTouchStart fn-change-start
              :onMouseDown fn-change-start
              :onKeyDown fn-change-start
              :on-change (fn [e]
                           (let [valor (js/parseFloat (.. e -target -value))]
                             (reset! atom-value (fn-value-2 valor))
                             (reset! ecuaciones (actualizar-serie ecuacion))))
              :onTouchEnd fn-change-end
              :onMouseUp fn-change-end
              :onKeyUp fn-change-end}]]))

(defn boton-reset
  [color param1 param1-default param2 param2-default ecuacion]
  [:input {:type "button" :value "Reset" :style {:color color}
           :on-click (fn [] (reset! param1 param1-default)
                            (reset! param2 param2-default)
                            (reset! ecuaciones (actualizar-serie ecuacion))
                            (reset! ecuaciones (actualizar-extremos)))}])

(defn sliders []
  [:div.form
   [:span.medio
    [:span {:style {:color color-proyeccion}}
      [slider (app-tr @lang :inclinacion) inclinacion math/deg 2 "°" math/deg 0 89.99 0.01 "slider-inclinacion" math/rad ecu/reduccion-al-ecuador]
      [slider (app-tr @lang :equinoccio-vernal) equinoccio-marzo (partial ecu/getDate @lang) false "" identity 1 365 1 "slider-equinoccio-marzo" identity ecu/reduccion-al-ecuador]]
      [boton-reset color-proyeccion inclinacion inclinacion-terrestre equinoccio-marzo equinoccio-marzo-terrestre ecu/reduccion-al-ecuador]]
   [:span.medio
     [:span {:style {:color color-centro}}
       [slider (app-tr @lang :eccentricidad) excentricidad identity 3 "" identity 0 0.999 0.001 "slider-excentricidad" identity ecu/ecuacion-de-centro]
       [slider (app-tr @lang :perihelio) perihelio (partial ecu/getDate @lang) false "" identity 1 365 1 "slider-perihelio" identity ecu/ecuacion-de-centro]
       [boton-reset color-centro excentricidad excentricidad-terrestre perihelio perihelio-terrestre ecu/ecuacion-de-centro]]]])

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

(defn update-language [evt]
  (reset! lang (.. evt -target -value)))

(gevents/listen language-selector "change" update-language)

;; specify reload hook with ^;after-load metadata
(defn ^:after-load on-reload []
  (mount-app-element))
