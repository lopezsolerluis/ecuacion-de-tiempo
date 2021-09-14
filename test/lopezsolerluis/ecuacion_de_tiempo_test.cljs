(ns lopezsolerluis.ecuacion-de-tiempo-test
    (:require
     [cljs.test :refer-macros [deftest is are testing]]
     [lopezsolerluis.ecuacion-de-tiempo :as ecu-ti]))


; (deftest extremos-testing
;   (are [data resultado]
;     (= (ecu-ti/extremos data) resultado)
;     [{:x 0 :y 0} {:x 1 :y 1} {:x 2 :y 0}] [{:x 1 :y 1}]
;     ))
