// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('lopezsolerluis.ecuacion_de_tiempo');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('reagent.core');
goog.require('reagent.dom');
goog.require('lopezsolerluis.ecuaciones');
lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis = goog.global["reactVis"];
lopezsolerluis.ecuacion_de_tiempo.anio = 365.25;
lopezsolerluis.ecuacion_de_tiempo.inclinacion_terrestre = lopezsolerluis.ecuaciones.rad(23.5);
lopezsolerluis.ecuacion_de_tiempo.excentricidad_terrestre = 0.01671;
lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo_terrestre = lopezsolerluis.ecuaciones.dia_del_anio((21),(3));
lopezsolerluis.ecuacion_de_tiempo.perihelio_terrestre = lopezsolerluis.ecuaciones.dia_del_anio((4),(1));
lopezsolerluis.ecuacion_de_tiempo.inclinacion = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lopezsolerluis.ecuacion_de_tiempo.inclinacion_terrestre);
lopezsolerluis.ecuacion_de_tiempo.excentricidad = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lopezsolerluis.ecuacion_de_tiempo.excentricidad_terrestre);
lopezsolerluis.ecuacion_de_tiempo.perihelio = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lopezsolerluis.ecuacion_de_tiempo.perihelio_terrestre);
lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo_terrestre);
lopezsolerluis.ecuacion_de_tiempo.crear_datos = (function lopezsolerluis$ecuacion_de_tiempo$crear_datos(var_args){
var G__13548 = arguments.length;
switch (G__13548) {
case 1:
return lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$1 = (function (fun){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (t){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,lopezsolerluis.ecuaciones.dia__GT_ms(t),cljs.core.cst$kw$y,(fun.cljs$core$IFn$_invoke$arity$1 ? fun.cljs$core$IFn$_invoke$arity$1(t) : fun.call(null,t))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1((lopezsolerluis.ecuacion_de_tiempo.anio - (1))));
}));

(lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$2 = (function (fun,delta_t){
return lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$3(fun,delta_t,lopezsolerluis.ecuacion_de_tiempo.anio);
}));

(lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$3 = (function (fun,delta_t,anio){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (t){
var tt = (t * delta_t);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,lopezsolerluis.ecuaciones.dia__GT_ms(tt),cljs.core.cst$kw$y,(fun.cljs$core$IFn$_invoke$arity$1 ? fun.cljs$core$IFn$_invoke$arity$1(tt) : fun.call(null,tt))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(((anio / delta_t) - (1))));
}));

(lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$lang$maxFixedArity = 3);

lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion_tiempo = (function lopezsolerluis$ecuacion_de_tiempo$calcular_ecuacion_tiempo(datos_centro,datos_reduccion){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (p__13550,p__13551){
var map__13552 = p__13550;
var map__13552__$1 = (((((!((map__13552 == null))))?(((((map__13552.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13552.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13552):map__13552);
var x1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13552__$1,cljs.core.cst$kw$x);
var y1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13552__$1,cljs.core.cst$kw$y);
var map__13553 = p__13551;
var map__13553__$1 = (((((!((map__13553 == null))))?(((((map__13553.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13553.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13553):map__13553);
var x2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13553__$1,cljs.core.cst$kw$x);
var y2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13553__$1,cljs.core.cst$kw$y);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,x1,cljs.core.cst$kw$y,(y1 + y2)], null);
}),datos_centro,datos_reduccion);
});
lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion = (function lopezsolerluis$ecuacion_de_tiempo$calcular_ecuacion(ecuacion,fase,parametro){
return lopezsolerluis.ecuacion_de_tiempo.crear_datos.cljs$core$IFn$_invoke$arity$1((function (t){
var G__13556 = lopezsolerluis.ecuaciones.anomalia_media(((t - fase) - (-1)),lopezsolerluis.ecuacion_de_tiempo.anio);
var G__13557 = parametro;
return (ecuacion.cljs$core$IFn$_invoke$arity$2 ? ecuacion.cljs$core$IFn$_invoke$arity$2(G__13556,G__13557) : ecuacion.call(null,G__13556,G__13557));
}));
});
lopezsolerluis.ecuacion_de_tiempo.calcular_series = (function lopezsolerluis$ecuacion_de_tiempo$calcular_series(){
var datos_centro = lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion(lopezsolerluis.ecuaciones.ecuacion_de_centro,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad));
var datos_reduccion = lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion(lopezsolerluis.ecuaciones.reduccion_al_ecuador,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion));
var datos_ecuacion_tiempo = lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion_tiempo(datos_centro,datos_reduccion);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$data_DASH_centro,datos_centro),cljs.core.cst$kw$data_DASH_reduccion,datos_reduccion),cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo,datos_ecuacion_tiempo),cljs.core.cst$kw$data_DASH_centro_DASH_extremos,lopezsolerluis.ecuaciones.extremos(datos_centro)),cljs.core.cst$kw$data_DASH_reduccion_DASH_extremos,lopezsolerluis.ecuaciones.extremos(datos_reduccion)),cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo_DASH_extremos,lopezsolerluis.ecuaciones.extremos(datos_ecuacion_tiempo));
});
lopezsolerluis.ecuacion_de_tiempo.ecuaciones = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lopezsolerluis.ecuacion_de_tiempo.calcular_series());
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
lopezsolerluis.ecuacion_de_tiempo.actualizar_serie = (function lopezsolerluis$ecuacion_de_tiempo$actualizar_serie(ecuacion,fase,parametro){
var datos_nuevos = lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion(ecuacion,fase,parametro);
var ecuaciones_nuevas = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lopezsolerluis.ecuaciones.ecuacion_de_centro,ecuacion))?cljs.core.cst$kw$data_DASH_centro:cljs.core.cst$kw$data_DASH_reduccion),datos_nuevos);
var datos_ecuacion_tiempo = lopezsolerluis.ecuacion_de_tiempo.calcular_ecuacion_tiempo(cljs.core.cst$kw$data_DASH_centro.cljs$core$IFn$_invoke$arity$1(ecuaciones_nuevas),cljs.core.cst$kw$data_DASH_reduccion.cljs$core$IFn$_invoke$arity$1(ecuaciones_nuevas));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ecuaciones_nuevas,cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo,datos_ecuacion_tiempo);
});
/**
 * 'data-tipo' es :data-centro o :data-reduccion
 */
lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos = (function lopezsolerluis$ecuacion_de_tiempo$actualizar_extremos(data_tipo){
var extremos_nuevos = lopezsolerluis.ecuaciones.extremos((function (){var G__13558 = cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones);
return (data_tipo.cljs$core$IFn$_invoke$arity$1 ? data_tipo.cljs$core$IFn$_invoke$arity$1(G__13558) : data_tipo.call(null,G__13558));
})());
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$data_DASH_centro,data_tipo))?cljs.core.cst$kw$data_DASH_centro_DASH_extremos:cljs.core.cst$kw$data_DASH_reduccion_DASH_extremos),extremos_nuevos),cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo_DASH_extremos,lopezsolerluis.ecuaciones.extremos(cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))));
});
lopezsolerluis.ecuacion_de_tiempo.getHeightOfElement = (function lopezsolerluis$ecuacion_de_tiempo$getHeightOfElement(e){
return e.offsetHeight;
});
lopezsolerluis.ecuacion_de_tiempo.getWindowHeight = (function lopezsolerluis$ecuacion_de_tiempo$getWindowHeight(){
return window.innerHeight;
});
lopezsolerluis.ecuacion_de_tiempo.get_app_element = (function lopezsolerluis$ecuacion_de_tiempo$get_app_element(){
return goog.dom.getElement("app");
});
lopezsolerluis.ecuacion_de_tiempo.axis_style = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$stroke,"#333"], null),cljs.core.cst$kw$ticks,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$stroke,"#999"], null),cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"#333"], null)], null);
lopezsolerluis.ecuacion_de_tiempo.line_style = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$strokeLinejoin,"round",cljs.core.cst$kw$strokeLinecap,"round"], null);
lopezsolerluis.ecuacion_de_tiempo.line_chart = (function lopezsolerluis$ecuacion_de_tiempo$line_chart(p__13561,data1_extremos,p__13562,data2_extremos,p__13563,data3_extremos){
var vec__13564 = p__13561;
var data1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13564,(0),null);
var color1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13564,(1),null);
var vec__13567 = p__13562;
var data2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13567,(0),null);
var color2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13567,(1),null);
var vec__13570 = p__13563;
var data3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13570,(0),null);
var color3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13570,(1),null);
var extremo_absoluto_maximo = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (punto){
return lopezsolerluis.ecuaciones.abs(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(punto));
}),data1_extremos));
return new cljs.core.PersistentVector(null, 17, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.FlexibleXYPlot,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$margin,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$left,(100),cljs.core.cst$kw$right,(50)], null),cljs.core.cst$kw$xType,"time-utc",cljs.core.cst$kw$yType,"time-utc",cljs.core.cst$kw$yDomain,(((extremo_absoluto_maximo < (100)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-100),(100)], null):null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.VerticalGridLines,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.axis_style], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.HorizontalGridLines,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.axis_style], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.XAxis,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$tickSizeInner,(0),cljs.core.cst$kw$tickSizeOuter,(6),cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.axis_style,cljs.core.cst$kw$tickFormat,(function (p1__13559_SHARP_){
return lopezsolerluis.ecuaciones.ms__GT_mes(p1__13559_SHARP_);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.YAxis,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$tickSizeInner,(0),cljs.core.cst$kw$tickSizeOuter,(6),cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.axis_style,cljs.core.cst$kw$tickFormat,(function (p1__13560_SHARP_){
return lopezsolerluis.ecuaciones.ms__GT_hms(p1__13560_SHARP_);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.DiscreteColorLegend,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,(120),cljs.core.cst$kw$top,(10)], null),cljs.core.cst$kw$orientation,"horizontal",cljs.core.cst$kw$items,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$title," Ecuaci\u00F3n de Tiempo",cljs.core.cst$kw$color,color1,cljs.core.cst$kw$strokeWidth,(3)], null),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$title," Reducci\u00F3n al Ecuador",cljs.core.cst$kw$color,color3,cljs.core.cst$kw$strokeWidth,(3)], null),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$title," Ecuaci\u00F3n de Centro",cljs.core.cst$kw$color,color2,cljs.core.cst$kw$strokeWidth,(3)], null)], null)], null)], null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$variadic((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)], 0)))?cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__4529__auto__ = (function lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13573(s__13574){
return (new cljs.core.LazySeq(null,(function (){
var s__13574__$1 = s__13574;
while(true){
var temp__5720__auto__ = cljs.core.seq(s__13574__$1);
if(temp__5720__auto__){
var s__13574__$2 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13574__$2)){
var c__4527__auto__ = cljs.core.chunk_first(s__13574__$2);
var size__4528__auto__ = cljs.core.count(c__4527__auto__);
var b__13576 = cljs.core.chunk_buffer(size__4528__auto__);
if((function (){var i__13575 = (0);
while(true){
if((i__13575 < size__4528__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4527__auto__,i__13575);
cljs.core.chunk_append(b__13576,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["et",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)));

var G__13585 = (i__13575 + (1));
i__13575 = G__13585;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13576),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13573(cljs.core.chunk_rest(s__13574__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13576),null);
}
} else {
var item = cljs.core.first(s__13574__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["et",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13573(cljs.core.rest(s__13574__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4529__auto__(data1_extremos);
})()):null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)))?cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__4529__auto__ = (function lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13577(s__13578){
return (new cljs.core.LazySeq(null,(function (){
var s__13578__$1 = s__13578;
while(true){
var temp__5720__auto__ = cljs.core.seq(s__13578__$1);
if(temp__5720__auto__){
var s__13578__$2 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13578__$2)){
var c__4527__auto__ = cljs.core.chunk_first(s__13578__$2);
var size__4528__auto__ = cljs.core.count(c__4527__auto__);
var b__13580 = cljs.core.chunk_buffer(size__4528__auto__);
if((function (){var i__13579 = (0);
while(true){
if((i__13579 < size__4528__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4527__auto__,i__13579);
cljs.core.chunk_append(b__13580,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["re",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)));

var G__13586 = (i__13579 + (1));
i__13579 = G__13586;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13580),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13577(cljs.core.chunk_rest(s__13578__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13580),null);
}
} else {
var item = cljs.core.first(s__13578__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["re",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13577(cljs.core.rest(s__13578__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4529__auto__(data3_extremos);
})()):null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)))?cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__4529__auto__ = (function lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13581(s__13582){
return (new cljs.core.LazySeq(null,(function (){
var s__13582__$1 = s__13582;
while(true){
var temp__5720__auto__ = cljs.core.seq(s__13582__$1);
if(temp__5720__auto__){
var s__13582__$2 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13582__$2)){
var c__4527__auto__ = cljs.core.chunk_first(s__13582__$2);
var size__4528__auto__ = cljs.core.count(c__4527__auto__);
var b__13584 = cljs.core.chunk_buffer(size__4528__auto__);
if((function (){var i__13583 = (0);
while(true){
if((i__13583 < size__4528__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4527__auto__,i__13583);
cljs.core.chunk_append(b__13584,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["ec",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)));

var G__13587 = (i__13583 + (1));
i__13583 = G__13587;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13584),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13581(cljs.core.chunk_rest(s__13582__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13584),null);
}
} else {
var item = cljs.core.first(s__13582__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.Hint,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,item], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#333",cljs.core.cst$kw$fontWeight,"bold",cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null),lopezsolerluis.ecuaciones.ms__GT_hms(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(item))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["ec",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(item))].join('')], null)),lopezsolerluis$ecuacion_de_tiempo$line_chart_$_iter__13581(cljs.core.rest(s__13582__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4529__auto__(data2_extremos);
})()):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.LineSeries,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$data,data1,cljs.core.cst$kw$strokeWidth,(5),cljs.core.cst$kw$stroke,color1,cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.line_style], null)], null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$variadic((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)], 0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.MarkSeries,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$data,data1_extremos,cljs.core.cst$kw$stroke,color1,cljs.core.cst$kw$size,(5),cljs.core.cst$kw$fill,color1,cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.LineSeries,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$data,data2,cljs.core.cst$kw$strokeWidth,(2),cljs.core.cst$kw$stroke,color2,cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.line_style], null)], null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.MarkSeries,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$data,data2_extremos,cljs.core.cst$kw$stroke,color2,cljs.core.cst$kw$size,(3),cljs.core.cst$kw$fill,color2,cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.LineSeries,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$data,data3,cljs.core.cst$kw$strokeWidth,(2),cljs.core.cst$kw$stroke,color3,cljs.core.cst$kw$style,lopezsolerluis.ecuacion_de_tiempo.line_style], null)], null),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$_GT_,lopezsolerluis.ecuacion_de_tiempo.global$module$cljsjs$react_vis.MarkSeries,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$data,data3_extremos,cljs.core.cst$kw$stroke,color3,cljs.core.cst$kw$size,(3),cljs.core.cst$kw$fill,color3,cljs.core.cst$kw$opacity,cljs.core.cst$kw$opacidad.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null):null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.color_centro = "green";
lopezsolerluis.ecuacion_de_tiempo.color_proyeccion = "blue";
lopezsolerluis.ecuacion_de_tiempo.color_ecuacion_tiempo = "red";
lopezsolerluis.ecuacion_de_tiempo.graph = (function lopezsolerluis$ecuacion_de_tiempo$graph(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$graph,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.line_chart,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones)),lopezsolerluis.ecuacion_de_tiempo.color_ecuacion_tiempo], null),cljs.core.cst$kw$data_DASH_ecuacion_DASH_tiempo_DASH_extremos.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$data_DASH_centro.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones)),lopezsolerluis.ecuacion_de_tiempo.color_centro], null),cljs.core.cst$kw$data_DASH_centro_DASH_extremos.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$data_DASH_reduccion.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones)),lopezsolerluis.ecuacion_de_tiempo.color_proyeccion], null),cljs.core.cst$kw$data_DASH_reduccion_DASH_extremos.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.ecuaciones))], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.slider_inclinacion = (function lopezsolerluis$ecuacion_de_tiempo$slider_inclinacion(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$valor,"Inclinaci\u00F3n: ",lopezsolerluis.ecuaciones.deg(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)).toFixed((2)),"\u00B0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$onTouchEnd,cljs.core.cst$kw$min,cljs.core.cst$kw$type,cljs.core.cst$kw$onKeyUp,cljs.core.cst$kw$max,cljs.core.cst$kw$id,cljs.core.cst$kw$onInput,cljs.core.cst$kw$defaultValue,cljs.core.cst$kw$step,cljs.core.cst$kw$onMouseUp],[(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(0),"range",(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),89.99,"slider-inclinacion",(function (e){
var valor = parseFloat(e.target.value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(0));

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.inclinacion,lopezsolerluis.ecuaciones.rad(valor));

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.reduccion_al_ecuador,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)));
}),lopezsolerluis.ecuaciones.deg(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)),0.01,(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
})])], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.slider_excentricidad = (function lopezsolerluis$ecuacion_de_tiempo$slider_excentricidad(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$valor,"Excentricidad: ",cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad).toFixed((3))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$onTouchEnd,cljs.core.cst$kw$min,cljs.core.cst$kw$type,cljs.core.cst$kw$onKeyUp,cljs.core.cst$kw$max,cljs.core.cst$kw$id,cljs.core.cst$kw$onInput,cljs.core.cst$kw$defaultValue,cljs.core.cst$kw$step,cljs.core.cst$kw$onMouseUp],[(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(0),"range",(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),0.999,"slider-excentricidad",(function (e){
var valor = parseFloat(e.target.value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(0));

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.excentricidad,valor);

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.ecuacion_de_centro,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)));
}),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad),0.001,(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
})])], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.slider_equinoccio_marzo = (function lopezsolerluis$ecuacion_de_tiempo$slider_equinoccio_marzo(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$valor,"Equinoccio del punto Vernal: ",lopezsolerluis.ecuaciones.getDate(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$onTouchEnd,cljs.core.cst$kw$min,cljs.core.cst$kw$type,cljs.core.cst$kw$onKeyUp,cljs.core.cst$kw$max,cljs.core.cst$kw$id,cljs.core.cst$kw$onInput,cljs.core.cst$kw$defaultValue,cljs.core.cst$kw$step,cljs.core.cst$kw$onMouseUp],[(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(1),"range",(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(365),"slider-equinoccio-marzo",(function (e){
var valor = parseInt(e.target.value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(0));

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo,valor);

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.reduccion_al_ecuador,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)));
}),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo),(1),(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
})])], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.slider_perihelio = (function lopezsolerluis$ecuacion_de_tiempo$slider_perihelio(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$valor,"Perihelio: ",lopezsolerluis.ecuaciones.getDate(cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$onTouchEnd,cljs.core.cst$kw$min,cljs.core.cst$kw$type,cljs.core.cst$kw$onKeyUp,cljs.core.cst$kw$max,cljs.core.cst$kw$id,cljs.core.cst$kw$onInput,cljs.core.cst$kw$defaultValue,cljs.core.cst$kw$step,cljs.core.cst$kw$onMouseUp],[(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(1),"range",(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
}),(365),"slider-perihelio",(function (e){
var valor = parseInt(e.target.value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(0));

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.perihelio,valor);

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.ecuacion_de_centro,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)));
}),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio),(1),(function (_){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,cljs.core.assoc,cljs.core.cst$kw$opacidad,(1));
})])], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.sliders = (function lopezsolerluis$ecuacion_de_tiempo$sliders(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$medio,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,lopezsolerluis.ecuacion_de_tiempo.color_proyeccion], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.slider_inclinacion], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.slider_equinoccio_marzo], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,"Reset",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,lopezsolerluis.ecuacion_de_tiempo.color_proyeccion], null),cljs.core.cst$kw$on_DASH_click,(function (){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.inclinacion,lopezsolerluis.ecuacion_de_tiempo.inclinacion_terrestre);

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo,lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo_terrestre);

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.reduccion_al_ecuador,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.equinoccio_marzo),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.inclinacion)));

(lopezsolerluis.ecuacion_de_tiempo.slider_inclinacion.val = lopezsolerluis.ecuacion_de_tiempo.inclinacion_terrestre);

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_reduccion));
})], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$medio,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,lopezsolerluis.ecuacion_de_tiempo.color_centro], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.slider_excentricidad], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.slider_perihelio], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,"Reset",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,lopezsolerluis.ecuacion_de_tiempo.color_centro], null),cljs.core.cst$kw$on_DASH_click,(function (){
cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.excentricidad,lopezsolerluis.ecuacion_de_tiempo.excentricidad_terrestre);

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.perihelio,lopezsolerluis.ecuacion_de_tiempo.perihelio_terrestre);

cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_serie(lopezsolerluis.ecuaciones.ecuacion_de_centro,cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.perihelio),cljs.core.deref(lopezsolerluis.ecuacion_de_tiempo.excentricidad)));

return cljs.core.reset_BANG_(lopezsolerluis.ecuacion_de_tiempo.ecuaciones,lopezsolerluis.ecuacion_de_tiempo.actualizar_extremos(cljs.core.cst$kw$data_DASH_centro));
})], null)], null)], null)], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.app = (function lopezsolerluis$ecuacion_de_tiempo$app(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$todo,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.graph], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.sliders], null)], null);
});
lopezsolerluis.ecuacion_de_tiempo.mount = (function lopezsolerluis$ecuacion_de_tiempo$mount(el){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lopezsolerluis.ecuacion_de_tiempo.app], null),el);
});
lopezsolerluis.ecuacion_de_tiempo.mount_app_element = (function lopezsolerluis$ecuacion_de_tiempo$mount_app_element(){
var temp__5720__auto__ = lopezsolerluis.ecuacion_de_tiempo.get_app_element();
if(cljs.core.truth_(temp__5720__auto__)){
var el = temp__5720__auto__;
return lopezsolerluis.ecuacion_de_tiempo.mount(el);
} else {
return null;
}
});
lopezsolerluis.ecuacion_de_tiempo.mount_app_element();
lopezsolerluis.ecuacion_de_tiempo.on_reload = (function lopezsolerluis$ecuacion_de_tiempo$on_reload(){
return lopezsolerluis.ecuacion_de_tiempo.mount_app_element();
});
