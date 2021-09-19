// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('reagent.dom');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.impl.util');
goog.require('reagent.impl.template');
goog.require('reagent.impl.batching');
goog.require('reagent.ratom');
reagent.dom.global$module$react_dom = goog.global["ReactDOM"];
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(reagent.dom.roots,cljs.core.dissoc,container);

return reagent.dom.global$module$react_dom.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__13405 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__13406 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__13406);

try{var G__13407 = (comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null));
var G__13408 = container;
var G__13409 = (function (){
var _STAR_always_update_STAR__orig_val__13410 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__13411 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__13411);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [comp,container], null));

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__13410);
}});
return reagent.dom.global$module$react_dom.render(G__13407,G__13408,G__13409);
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__13405);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__13413 = arguments.length;
switch (G__13413) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,null);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback){
reagent.ratom.flush_BANG_();

var f = (function (){
return reagent.impl.template.as_element(((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return reagent.dom.render_comp(f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return reagent.dom.global$module$react_dom.findDOMNode(this$);
});
(reagent.impl.template.find_dom_node = reagent.dom.dom_node);
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_();

var seq__13415_13419 = cljs.core.seq(cljs.core.vals(cljs.core.deref(reagent.dom.roots)));
var chunk__13416_13420 = null;
var count__13417_13421 = (0);
var i__13418_13422 = (0);
while(true){
if((i__13418_13422 < count__13417_13421)){
var v_13423 = chunk__13416_13420.cljs$core$IIndexed$_nth$arity$2(null,i__13418_13422);
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(reagent.dom.re_render_component,v_13423);


var G__13424 = seq__13415_13419;
var G__13425 = chunk__13416_13420;
var G__13426 = count__13417_13421;
var G__13427 = (i__13418_13422 + (1));
seq__13415_13419 = G__13424;
chunk__13416_13420 = G__13425;
count__13417_13421 = G__13426;
i__13418_13422 = G__13427;
continue;
} else {
var temp__5720__auto___13428 = cljs.core.seq(seq__13415_13419);
if(temp__5720__auto___13428){
var seq__13415_13429__$1 = temp__5720__auto___13428;
if(cljs.core.chunked_seq_QMARK_(seq__13415_13429__$1)){
var c__4556__auto___13430 = cljs.core.chunk_first(seq__13415_13429__$1);
var G__13431 = cljs.core.chunk_rest(seq__13415_13429__$1);
var G__13432 = c__4556__auto___13430;
var G__13433 = cljs.core.count(c__4556__auto___13430);
var G__13434 = (0);
seq__13415_13419 = G__13431;
chunk__13416_13420 = G__13432;
count__13417_13421 = G__13433;
i__13418_13422 = G__13434;
continue;
} else {
var v_13435 = cljs.core.first(seq__13415_13429__$1);
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(reagent.dom.re_render_component,v_13435);


var G__13436 = cljs.core.next(seq__13415_13429__$1);
var G__13437 = null;
var G__13438 = (0);
var G__13439 = (0);
seq__13415_13419 = G__13436;
chunk__13416_13420 = G__13437;
count__13417_13421 = G__13438;
i__13418_13422 = G__13439;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render();
});