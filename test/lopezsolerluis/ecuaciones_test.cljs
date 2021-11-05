(ns lopezsolerluis.ecuaciones-test
    (:require
     [cljs.test :refer-macros [deftest is are testing]]
     [lopezsolerluis.ecuaciones :refer [sin cos ecuacion-de-kepler
                                        anomalia-verdadera ecuacion-de-centro
                                        reduccion-al-ecuador inflexion?]]))

(defn to-deg [x]
  (* x 180 (/ (.-PI js/Math))))

(defn to-rad [x]
  (* x (.-PI js/Math) (/ 180)))

(defn abs [x]
  (.abs js/Math x))

(deftest sin-test
  (is (= 0 (sin 0))
   (is (= 1 (sin (/ (.-PI js/Math) 2))))))

(deftest cos-test
  (is (= 1 (cos 0))))

(def tolerancia 1e-6)

(deftest kepler-test
  (are [anomalia-media excentricidad anomalia-excentrica]
      (>= tolerancia (abs (- (to-deg (ecuacion-de-kepler
                                      (to-rad anomalia-media) excentricidad))
                             anomalia-excentrica)))
      0  0   0
     45 .3  59.86569329123942
    135 .7 153.1282081652666
     39 .6  71.62461285320336
     5 .1   5.554589
     2 .99 32.361007
     5 .1  5.554589
     5 .2 6.246908
     5 .3 7.134960
     5 .4 8.313903
     5 .5 9.950063
     5 .6 12.356653
     5 .7 16.16799
     5 .8 22.656579
     5 .9 33.344447
     5 .99 45.361023
     1 .99 24.725822
     33 .99 89.722155))


(deftest anomalia-verdadera-test
  (are [anomalia-excentrica excentricidad anomalia-v]
      (>= tolerancia (abs (- (to-deg (anomalia-verdadera
                                      (to-rad anomalia-excentrica) excentricidad))
                             anomalia-v)))
    34.026714 0.8502196 94.163310))

; (deftest ecuacion-de-centro-test
;   (are [anomalia-media excentricidad resultado]
;       ; (>= tolerancia (abs (- (to-deg (ecuacion-de-centro (to-rad anomalia-media) excentricidad))
;       ;                        resultado)))
;       (= (to-deg (ecuacion-de-centro (to-rad anomalia-media) excentricidad)) resultado)
;       0 .99 0))

; (deftest reduccion-al-ecuador-test
;   (are [longitud-ecliptica inclinacion resultado]
;       ; (>= tolerancia (abs (- (to-deg (reduccion-al-ecuador (to-rad anomalia-media) excentricidad))
;       ;                        resultado)))
;       (= (to-deg (reduccion-al-ecuador (to-rad longitud-ecliptica) (to-rad inclinacion))) resultado)
;       270 23 0))
 
(deftest inflexion?-test
  (are [previos actual resultado]
    (= (inflexion? previos actual) resultado)
    [{:y 0} {:y 1}] {:y 2} false
    [{:y 0} {:y 1}] {:y 0} true
    [{:y 0} {:y -1}] {:y 2} true
    [{:y 0} {:y -1}] {:y -2} false
    [{:y 0} {:y 10}] {:y 20} false
    [{:y 0} {:y 1} {:y 1} {:y 1}] {:y 0} true
    [{:y 10} {:y 1}] {:y 2} true))
