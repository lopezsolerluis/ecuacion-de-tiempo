(ns lopezsolerluis.math)

(defn sin [alpha]
  (.sin js/Math alpha))

(defn cos [alpha]
  (.cos js/Math alpha))

(defn tan [alpha]
  (.tan js/Math alpha))

(defn atan
  ([x] (.atan js/Math x))
  ([x y] (.atan2 js/Math x y)))

(defn abs [x]
  (.abs js/Math x))

(defn sqrt [x]
  (.sqrt js/Math x))

(defn floor [x]
  (.floor js/Math x))

(def pi (.-PI js/Math))

(def pi2 (* 2 pi))

(defn rad [n] (* n pi (/ 180)))
(defn deg [n] (* n 180 (/ pi)))
