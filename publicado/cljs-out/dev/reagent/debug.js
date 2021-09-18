// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__13025__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__13025 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13026__i = 0, G__13026__a = new Array(arguments.length -  0);
while (G__13026__i < G__13026__a.length) {G__13026__a[G__13026__i] = arguments[G__13026__i + 0]; ++G__13026__i;}
  args = new cljs.core.IndexedSeq(G__13026__a,0,null);
} 
return G__13025__delegate.call(this,args);};
G__13025.cljs$lang$maxFixedArity = 0;
G__13025.cljs$lang$applyTo = (function (arglist__13027){
var args = cljs.core.seq(arglist__13027);
return G__13025__delegate(args);
});
G__13025.cljs$core$IFn$_invoke$arity$variadic = G__13025__delegate;
return G__13025;
})()
);

(o.error = (function() { 
var G__13028__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__13028 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13029__i = 0, G__13029__a = new Array(arguments.length -  0);
while (G__13029__i < G__13029__a.length) {G__13029__a[G__13029__i] = arguments[G__13029__i + 0]; ++G__13029__i;}
  args = new cljs.core.IndexedSeq(G__13029__a,0,null);
} 
return G__13028__delegate.call(this,args);};
G__13028.cljs$lang$maxFixedArity = 0;
G__13028.cljs$lang$applyTo = (function (arglist__13030){
var args = cljs.core.seq(arglist__13030);
return G__13028__delegate(args);
});
G__13028.cljs$core$IFn$_invoke$arity$variadic = G__13028__delegate;
return G__13028;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});
