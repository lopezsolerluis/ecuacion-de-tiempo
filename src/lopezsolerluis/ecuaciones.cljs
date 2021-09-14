(ns lopezsolerluis.ecuaciones)

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

(defn rad [n] (* n pi (/ 180)))
(defn deg [n] (* n 180 (/ pi)))

(defn radianes->horas [n] (* n 12 (/ pi)))

(defn rad->ms [n] (* n 43200000 (/ pi))) ;; 12 horas son 43200000 milisegundos

(defn mod-2pi [n]
  (mod n (* 2 pi)))

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
    (floor (/ milisegundos 1000 3600 24))))

(def meses ["Enero" "Febrero" "Marzo" "Abril" "Mayo" "Junio" "Julio" "Agosto" "Septiembre" "Octubre" "Noviembre" "Diciembre"])

(defn getDate
  "Recibe un día (de 1 a 365) y devuelve una cadena 'dia de mes'"
  [dia]
  (let [fecha (js/Date. 1970 0 dia)
        mes (get meses (.getMonth fecha))
        dia (.getDate fecha)]
   (str dia " de " mes)))

(defn ms->mes
  "Recibe un día en milisegundos desde el 1 de Enero y devuelve una cadena 'mes'"
  [ms]
  (let [dia (/ ms 86400000)
        fecha (js/Date. 1970 0 (inc dia))]
   (get meses (.getMonth fecha))))

(defn dia->ms [d]
  (* d 86400000)) ;; 1 día son 86400000 milisegundos

(defn n->2dig [n]
  (cond (= n 0) "00"
        (< n 10) (str 0 n)
        :else (str n)))

(defn ms->hms [ms]
  (let [ms-abs (abs ms)
        signo (if (< ms 0) "-" "+")
        milliseconds (floor (/ (mod ms-abs 1000) 10))
        seconds (floor (mod (/ ms-abs 1000) 60))
        minutes (floor (mod (/ ms-abs 60000) 60))
        hours (floor (mod (/ ms-abs 3600000) 24))]
     (str (if (= 0 hours) "" (str signo hours "h "))
          (if (= 0 hours)
              (if (= 0 minutes) "" (str signo minutes "m "))
              (str (n->2dig minutes) "m "))
          (if (= 0 hours minutes)
              (if (= ms 0) "0" (str signo seconds "." (n->2dig milliseconds)))
              (n->2dig seconds))  "s")))

    ; var milliseconds = parseInt((duration % 1000) / 100),
    ;     seconds = Math.floor((duration / 1000) % 60),
    ;     minutes = Math.floor((duration / (1000 * 60)) % 60),
    ;     hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    ;
    ;   hours = (hours < 10) ? "0" + hours : hours;
    ;   minutes = (minutes < 10) ? "0" + minutes : minutes;
    ;   seconds = (seconds < 10) ? "0" + seconds : seconds;
    ;
    ;   return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
(defn anomalia-media [dia anio]
  "Devuelve la anomalía media en radianes."
  (mod-2pi (* 2 pi dia (/ anio))))

(defn ecuacion-de-kepler
  "'anomalia-media' debe estar en radianes.
   Resuelve la ecuación de Kepler por aproximaciones sucesivas. El resultado está en radianes"
  ([anomalia-media excentricidad]
   (ecuacion-de-kepler anomalia-media excentricidad 1e-9 anomalia-media))
  ([anomalia-media excentricidad tolerancia anomalia-excentrica]
   (let [nueva-anomalia-excentrica
         (+ anomalia-media (* excentricidad (sin anomalia-excentrica)))]
     (if (<= (abs (- anomalia-excentrica nueva-anomalia-excentrica))
             tolerancia)
       (mod-2pi nueva-anomalia-excentrica)
       (recur anomalia-media excentricidad tolerancia nueva-anomalia-excentrica)))))

(defn anomalia-verdadera [anomalia-excentrica excentricidad]
  "'anomalia-excentrica' debe estar en radianes.
   El resultado está en radianes"
  (let [anomalia-verdadera-radianes (* 2 (atan (* (sqrt (/ (+ 1 excentricidad) (- 1 excentricidad)))
                                                  (tan (/ anomalia-excentrica 2)))))]
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
  (mod-2pi (atan (* (sin longitud-ecliptica) (cos inclinacion))
                 (cos longitud-ecliptica))))

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
