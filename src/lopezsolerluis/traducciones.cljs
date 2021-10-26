(ns lopezsolerluis.traducciones)

(def translations
  {
   :en {:ecuacion-de-tiempo "Equation of Time"
        :reduccion-al-ecuador "Reduction to the Ecuator"
        :ecuacion-de-centro "Equation of Center"
        :inclinacion "Inclination: "
        :equinoccio-vernal "Vernal equinox: "
        :eccentricidad "Eccentricity: "
        :perihelio "Perihelion Date: "
        :meses (fn [[i]] (get ["January" "Febraury" "March" "April" "May" "June" "July" "August" "September" "October" "November" "December"] i))
        :de "/"
   }
   :es {:ecuacion-de-tiempo "Ecuación de Tiempo"
        :reduccion-al-ecuador "Reducción al Ecuador"
        :ecuacion-de-centro "Ecuación de Centro"
        :inclinacion "Inclinación: "
        :equinoccio-vernal "Equinoccio del punto vernal: "
        :eccentricidad "Excentricidad: "
        :perihelio "Perihelio: "
        :meses (fn [[i]] (get ["Enero" "Febrero" "Marzo" "Abril" "Mayo" "Junio" "Julio" "Agosto" "Septiembre" "Octubre" "Noviembre" "Diciembre"] i))
        :de " de "
   }
  })
