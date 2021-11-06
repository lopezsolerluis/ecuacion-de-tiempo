(ns lopezsolerluis.ecuaciones
  (:require
    [goog.string :as gstring]
    [goog.string.format]
    [lopezsolerluis.math :as math]
    [lopezsolerluis.traducciones :as trad :refer [app-tr]]))

(defn rad->ms [n] (* n 43200000 (/ math/pi))) ;; 12 horas son 43200000 milisegundos

(defn mod-2pi [n]
  (mod n math/pi2))

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
  "Devuelve el día del año, de 1 a 365"
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

(defn dia->ms [d] (* d 86400000)) ;; 1 día son 86400000 milisegundos

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

(defn anomalia-media [dia perihelio anio]
  "Devuelve la anomalía media en radianes."
  (mod-2pi (* math/pi2 (- dia perihelio) (/ anio))))

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

(defn anomalia-verdadera
  ([anomalia-media excentricidad]
    "'anomalia-media' debe estar en radianes.
    El resultado está en radianes"
    (let [anomalia-e (ecuacion-de-kepler anomalia-media excentricidad)
          anomalia-v (* 2 (math/atan (* (math/sqrt (/ (+ 1 excentricidad) (- 1 excentricidad)))
                                        (math/tan (/ anomalia-e 2)))))]
      (mod-2pi anomalia-v)))
  ([dia perihelio anio excentricidad]
    "El resultado está en radianes"
    (let [anomalia-m (anomalia-media dia perihelio anio)]
      (anomalia-verdadera anomalia-m excentricidad))))

(defn ecuacion-de-centro [dia anio perihelio excentricidad _ _]
  "El resultado está en milisegundos"
  (let [anomalia-m (anomalia-media dia perihelio anio)
        anomalia-v (anomalia-verdadera anomalia-m excentricidad)]
     (rad->ms (- anomalia-m anomalia-v))))

(defn proyeccion-al-ecuador [longitud-ecliptica inclinacion]
  "'longitud-ecliptica' e 'inclinacion' deben estar en radianes.
  El resultado está en radianes"
  (mod-2pi (math/atan (* (math/sin longitud-ecliptica) (math/cos inclinacion))
                      (math/cos longitud-ecliptica))))

(defn reduccion-al-ecuador [dia anio perihelio excentricidad equinoccio inclinacion]
  "inclinacion' debe estar en radianes.
  El resultado está en milisegundos"
  (let [anomalia-v (anomalia-verdadera dia perihelio anio excentricidad)
        anomalia-v-equinoccio (anomalia-verdadera equinoccio perihelio anio excentricidad)
        longitud-ecliptica (mod-2pi (- anomalia-v anomalia-v-equinoccio))
        proyeccion (proyeccion-al-ecuador longitud-ecliptica inclinacion)]
    (rad->ms (- longitud-ecliptica proyeccion))))

(def ex 0.017)
(def incl (math/rad 23.5))
(def per (dia-del-anio 4 1))
(def equi (dia-del-anio 21 3))
