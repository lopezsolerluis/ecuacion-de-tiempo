(ns lopezsolerluis.ecuaciones
  (:require
    [goog.string :as gstring]
    [goog.string.format]
    [lopezsolerluis.math :as math]
    [lopezsolerluis.traducciones :as trad :refer [app-tr]]))

(defn rad->hs [n] (* n 12 (/ math/pi)))

(defn rad->ms [n] (* n 43200000 (/ math/pi))) ;; 12 horas son 43200000 milisegundos

(defn mod-2pi [n]
  (mod n math/two-pi))

(defn inflexion? [previos actual]
  (let [ys-previos (mapv :y previos)
        ys (conj ys-previos (:y actual))]
    (not (or (apply <= ys)
             (apply >= ys)))))

(defn extremos
  "Calcula los extremos de una serie de datos"
  [data]
  (:extrema
    (reduce (fn [{:keys [lasts extrema] :as accum} dato]
              (if (inflexion? lasts dato)
                  (-> accum
                      (update :extrema conj (last lasts))
                      (assoc :lasts [(last lasts) dato]))
                  (update accum :lasts conj dato)))
          {:lasts (subvec data (- (count data) 5)) :extrema []}
          data)))

(defn dia-del-anio [dia mes]
  (let [milisegundos (.getTime (js/Date. 1970 (- mes 1) (+ dia 1)))]
    (math/floor (/ milisegundos 1000 3600 24))))

(defn getDate
  "Recibe un día (de 1 a 365) y devuelve una cadena 'dia de mes'"
  [lang dia]
  (let [fecha (js/Date. 1970 0 dia)
        mes (app-tr lang :meses (.getMonth fecha))
        dia (.getDate fecha)]
    (str dia (app-tr lang :de) mes)))

(defn ms->mes
  "Recibe un día en milisegundos desde el 1 de Enero y devuelve una cadena 'mes'"
  [lang ms]
  (let [dia (/ ms 86400000)
        fecha (js/Date. 1970 0 (inc dia))]
    (app-tr lang :meses (.getMonth fecha))))

(defn dia->ms [d]
  (* d 86400000)) ;; 1 día son 86400000 milisegundos

(defn ms->hms [ms]
  (let [ms-abs (math/abs ms)
        signo (if (< ms 0) "-" "+")
        milliseconds (math/floor (/ (mod ms-abs 1000) 1))
        seconds (math/floor (mod (/ ms-abs 1000) 60))
        minutes (math/floor (mod (/ ms-abs 60000) 60))
        hours (math/floor (mod (/ ms-abs 3600000) 24))]
     (str (if (= 0 hours) "" (str signo hours "h "))
          (if (= 0 hours)
              (if (= 0 minutes) "" (str signo minutes "m "))
              (str (gstring/format "%02d" minutes) "m "))
          (if (= 0 hours minutes)
              (if (< ms-abs 1) "0" (str signo seconds "." (gstring/format "%03d" milliseconds)))
              (gstring/format "%02d" seconds))  "s")))

(defn anomalia-media [dia anio]
  "Devuelve la anomalía media en radianes."
  (mod-2pi (* math/two-pi dia (/ anio))))

(defn ecuacion-de-kepler
  "'anomalia-media' debe estar en radianes.
   Resuelve la ecuación de Kepler por aproximaciones sucesivas. El resultado está en radianes"
  ([anomalia-media excentricidad]
   (ecuacion-de-kepler anomalia-media excentricidad 1e-9 anomalia-media))
  ([anomalia-media excentricidad tolerancia anomalia-excentrica]
   (let [nueva-anomalia-excentrica
         (+ anomalia-media (* excentricidad (math/sin anomalia-excentrica)))]
     (if (<= (math/abs (- anomalia-excentrica nueva-anomalia-excentrica))
             tolerancia)
       (mod-2pi nueva-anomalia-excentrica)
       (recur anomalia-media excentricidad tolerancia nueva-anomalia-excentrica)))))

(defn anomalia-verdadera [anomalia-excentrica excentricidad]
  "'anomalia-excentrica' debe estar en radianes.
   El resultado está en radianes"
  (let [anomalia-verdadera-radianes (* 2 (math/atan (* (math/sqrt (/ (+ 1 excentricidad) (- 1 excentricidad)))
                                                       (math/tan (/ anomalia-excentrica 2)))))]
    (mod-2pi anomalia-verdadera-radianes)))

(defn ecuacion-de-centro [anomalia-media excentricidad]
  "'anomalia-media' debe estar en radianes.
  El resultado está en milisegundos"
  (let [anomalia-excentrica (ecuacion-de-kepler anomalia-media excentricidad)
        anomalia-verdadera (anomalia-verdadera anomalia-excentrica excentricidad)]
     (rad->ms (- anomalia-media anomalia-verdadera))))

(defn proyeccion-al-ecuador [longitud-ecliptica inclinacion]
  "'longitud-ecliptica' e 'inclinacion' deben estar en radianes.
  El resultado está en radianes"
  (mod-2pi (math/atan (* (math/sin longitud-ecliptica) (math/cos inclinacion))
                      (math/cos longitud-ecliptica))))

(defn reduccion-al-ecuador [longitud-ecliptica inclinacion]
  "'longitud-ecliptica' e 'inclinacion' deben estar en radianes.
  El resultado está en milisegundos"
  (let [proyeccion (proyeccion-al-ecuador longitud-ecliptica inclinacion)]
    (rad->ms (- longitud-ecliptica proyeccion))))

(defn ecuacion-de-tiempo
  [dia anio inclinacion excentricidad dia-vernal dia-perihelio]
  (let [anom-med (anomalia-media (- dia dia-perihelio) anio)
        longitud (anomalia-media (- dia dia-vernal) anio)
        e-centro (ecuacion-de-centro anom-med excentricidad)
        r-ecuador (reduccion-al-ecuador longitud inclinacion)]
    (rad->ms (+ e-centro r-ecuador))))
