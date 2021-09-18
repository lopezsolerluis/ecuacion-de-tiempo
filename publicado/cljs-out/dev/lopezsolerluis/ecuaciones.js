// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('lopezsolerluis.ecuaciones');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.string');
goog.require('goog.string.format');
lopezsolerluis.ecuaciones.sin = (function lopezsolerluis$ecuaciones$sin(alpha){
return Math.sin(alpha);
});
lopezsolerluis.ecuaciones.cos = (function lopezsolerluis$ecuaciones$cos(alpha){
return Math.cos(alpha);
});
lopezsolerluis.ecuaciones.tan = (function lopezsolerluis$ecuaciones$tan(alpha){
return Math.tan(alpha);
});
lopezsolerluis.ecuaciones.atan = (function lopezsolerluis$ecuaciones$atan(var_args){
var G__13533 = arguments.length;
switch (G__13533) {
case 1:
return lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$1 = (function (x){
return Math.atan(x);
}));

(lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return Math.atan2(x,y);
}));

(lopezsolerluis.ecuaciones.atan.cljs$lang$maxFixedArity = 2);

lopezsolerluis.ecuaciones.abs = (function lopezsolerluis$ecuaciones$abs(x){
return Math.abs(x);
});
lopezsolerluis.ecuaciones.sqrt = (function lopezsolerluis$ecuaciones$sqrt(x){
return Math.sqrt(x);
});
lopezsolerluis.ecuaciones.floor = (function lopezsolerluis$ecuaciones$floor(x){
return Math.floor(x);
});
lopezsolerluis.ecuaciones.pi = Math.PI;
lopezsolerluis.ecuaciones.rad = (function lopezsolerluis$ecuaciones$rad(n){
return ((n * lopezsolerluis.ecuaciones.pi) * ((1) / (180)));
});
lopezsolerluis.ecuaciones.deg = (function lopezsolerluis$ecuaciones$deg(n){
return ((n * (180)) * ((1) / lopezsolerluis.ecuaciones.pi));
});
lopezsolerluis.ecuaciones.radianes__GT_horas = (function lopezsolerluis$ecuaciones$radianes__GT_horas(n){
return ((n * (12)) * ((1) / lopezsolerluis.ecuaciones.pi));
});
lopezsolerluis.ecuaciones.rad__GT_ms = (function lopezsolerluis$ecuaciones$rad__GT_ms(n){
return ((n * (43200000)) * ((1) / lopezsolerluis.ecuaciones.pi));
});
lopezsolerluis.ecuaciones.mod_2pi = (function lopezsolerluis$ecuaciones$mod_2pi(n){
return cljs.core.mod(n,((2) * lopezsolerluis.ecuaciones.pi));
});
lopezsolerluis.ecuaciones.inflexion_QMARK_ = (function lopezsolerluis$ecuaciones$inflexion_QMARK_(previos,actual){
var ys_previos = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y,previos);
var ys = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ys_previos,cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(actual));
return cljs.core.not((function (){var or__4126__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._LT__EQ_,ys);
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._GT__EQ_,ys);
}
})());
});
/**
 * Calcula los extremos de una serie de datos
 */
lopezsolerluis.ecuaciones.extremos = (function lopezsolerluis$ecuaciones$extremos(data){
return cljs.core.cst$kw$extrema.cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__13535,dato){
var map__13536 = p__13535;
var map__13536__$1 = (((((!((map__13536 == null))))?(((((map__13536.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13536.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13536):map__13536);
var accum = map__13536__$1;
var lasts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13536__$1,cljs.core.cst$kw$lasts);
var extrema = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13536__$1,cljs.core.cst$kw$extrema);
if(lopezsolerluis.ecuaciones.inflexion_QMARK_(lasts,dato)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$4(accum,cljs.core.cst$kw$extrema,cljs.core.conj,cljs.core.last(lasts)),cljs.core.cst$kw$lasts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.last(lasts),dato], null));
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(accum,cljs.core.cst$kw$lasts,cljs.core.conj,dato);
}
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$lasts,cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(data,(cljs.core.count(data) - (5))),cljs.core.cst$kw$extrema,cljs.core.PersistentVector.EMPTY], null),data));
});
lopezsolerluis.ecuaciones.dia_del_anio = (function lopezsolerluis$ecuaciones$dia_del_anio(dia,mes){
var milisegundos = (new Date((1970),(mes - (1)),(dia + (1)))).getTime();
return lopezsolerluis.ecuaciones.floor((((milisegundos / (1000)) / (3600)) / (24)));
});
lopezsolerluis.ecuaciones.meses = new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"], null);
/**
 * Recibe un día (de 1 a 365) y devuelve una cadena 'dia de mes'
 */
lopezsolerluis.ecuaciones.getDate = (function lopezsolerluis$ecuaciones$getDate(dia){
var fecha = (new Date((1970),(0),dia));
var mes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(lopezsolerluis.ecuaciones.meses,fecha.getMonth());
var dia__$1 = fecha.getDate();
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(dia__$1)," de ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(mes)].join('');
});
/**
 * Recibe un día en milisegundos desde el 1 de Enero y devuelve una cadena 'mes'
 */
lopezsolerluis.ecuaciones.ms__GT_mes = (function lopezsolerluis$ecuaciones$ms__GT_mes(ms){
var dia = (ms / (86400000));
var fecha = (new Date((1970),(0),(dia + (1))));
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(lopezsolerluis.ecuaciones.meses,fecha.getMonth());
});
lopezsolerluis.ecuaciones.dia__GT_ms = (function lopezsolerluis$ecuaciones$dia__GT_ms(d){
return (d * (86400000));
});
lopezsolerluis.ecuaciones.ms__GT_hms = (function lopezsolerluis$ecuaciones$ms__GT_hms(ms){
var ms_abs = lopezsolerluis.ecuaciones.abs(ms);
var signo = (((ms < (0)))?"-":"+");
var milliseconds = lopezsolerluis.ecuaciones.floor((cljs.core.mod(ms_abs,(1000)) / (1)));
var seconds = lopezsolerluis.ecuaciones.floor(cljs.core.mod((ms_abs / (1000)),(60)));
var minutes = lopezsolerluis.ecuaciones.floor(cljs.core.mod((ms_abs / (60000)),(60)));
var hours = lopezsolerluis.ecuaciones.floor(cljs.core.mod((ms_abs / (3600000)),(24)));
return [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours))?"":[signo,cljs.core.str.cljs$core$IFn$_invoke$arity$1(hours),"h "].join('')),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours))?((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),minutes))?"":[signo,cljs.core.str.cljs$core$IFn$_invoke$arity$1(minutes),"m "].join('')):[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.string.format("%02d",minutes)),"m "].join('')),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$variadic((0),hours,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([minutes], 0)))?(((ms_abs < (1)))?"0":[signo,cljs.core.str.cljs$core$IFn$_invoke$arity$1(seconds),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.string.format("%03d",milliseconds))].join('')):goog.string.format("%02d",seconds))),"s"].join('');
});
lopezsolerluis.ecuaciones.anomalia_media = (function lopezsolerluis$ecuaciones$anomalia_media(dia,anio){

return lopezsolerluis.ecuaciones.mod_2pi(((((2) * lopezsolerluis.ecuaciones.pi) * dia) * ((1) / anio)));
});
/**
 * 'anomalia-media' debe estar en radianes.
 * Resuelve la ecuación de Kepler por aproximaciones sucesivas. El resultado está en radianes
 */
lopezsolerluis.ecuaciones.ecuacion_de_kepler = (function lopezsolerluis$ecuaciones$ecuacion_de_kepler(var_args){
var G__13539 = arguments.length;
switch (G__13539) {
case 2:
return lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$2 = (function (anomalia_media,excentricidad){
return lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$4(anomalia_media,excentricidad,1.0E-9,anomalia_media);
}));

(lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$4 = (function (anomalia_media,excentricidad,tolerancia,anomalia_excentrica){
while(true){
var nueva_anomalia_excentrica = (anomalia_media + (excentricidad * lopezsolerluis.ecuaciones.sin(anomalia_excentrica)));
if((lopezsolerluis.ecuaciones.abs((anomalia_excentrica - nueva_anomalia_excentrica)) <= tolerancia)){
return lopezsolerluis.ecuaciones.mod_2pi(nueva_anomalia_excentrica);
} else {
var G__13541 = anomalia_media;
var G__13542 = excentricidad;
var G__13543 = tolerancia;
var G__13544 = nueva_anomalia_excentrica;
anomalia_media = G__13541;
excentricidad = G__13542;
tolerancia = G__13543;
anomalia_excentrica = G__13544;
continue;
}
break;
}
}));

(lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$lang$maxFixedArity = 4);

lopezsolerluis.ecuaciones.anomalia_verdadera = (function lopezsolerluis$ecuaciones$anomalia_verdadera(anomalia_excentrica,excentricidad){

var anomalia_verdadera_radianes = ((2) * lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$1((lopezsolerluis.ecuaciones.sqrt((((1) + excentricidad) / ((1) - excentricidad))) * lopezsolerluis.ecuaciones.tan((anomalia_excentrica / (2))))));
return lopezsolerluis.ecuaciones.mod_2pi(anomalia_verdadera_radianes);
});
lopezsolerluis.ecuaciones.ecuacion_de_centro = (function lopezsolerluis$ecuaciones$ecuacion_de_centro(anomalia_media,excentricidad){

var anomalia_excentrica = lopezsolerluis.ecuaciones.ecuacion_de_kepler.cljs$core$IFn$_invoke$arity$2(anomalia_media,excentricidad);
var anomalia_verdadera = lopezsolerluis.ecuaciones.anomalia_verdadera(anomalia_excentrica,excentricidad);
return lopezsolerluis.ecuaciones.rad__GT_ms((anomalia_media - anomalia_verdadera));
});
lopezsolerluis.ecuaciones.proyeccion_al_ecuador = (function lopezsolerluis$ecuaciones$proyeccion_al_ecuador(longitud_ecliptica,inclinacion){

return lopezsolerluis.ecuaciones.mod_2pi(lopezsolerluis.ecuaciones.atan.cljs$core$IFn$_invoke$arity$2((lopezsolerluis.ecuaciones.sin(longitud_ecliptica) * lopezsolerluis.ecuaciones.cos(inclinacion)),lopezsolerluis.ecuaciones.cos(longitud_ecliptica)));
});
lopezsolerluis.ecuaciones.reduccion_al_ecuador = (function lopezsolerluis$ecuaciones$reduccion_al_ecuador(longitud_ecliptica,inclinacion){

var proyeccion = lopezsolerluis.ecuaciones.proyeccion_al_ecuador(longitud_ecliptica,inclinacion);
return lopezsolerluis.ecuaciones.rad__GT_ms((longitud_ecliptica - proyeccion));
});
lopezsolerluis.ecuaciones.ecuacion_de_tiempo = (function lopezsolerluis$ecuaciones$ecuacion_de_tiempo(dia,anio,inclinacion,excentricidad,dia_vernal,dia_perihelio){
var anom_med = lopezsolerluis.ecuaciones.anomalia_media((dia - dia_perihelio),anio);
var longitud = lopezsolerluis.ecuaciones.anomalia_media((dia - dia_vernal),anio);
var e_centro = lopezsolerluis.ecuaciones.ecuacion_de_centro(anom_med,excentricidad);
var r_ecuador = lopezsolerluis.ecuaciones.reduccion_al_ecuador(longitud,inclinacion);
return lopezsolerluis.ecuaciones.rad__GT_ms((e_centro + r_ecuador));
});
