import{a as p}from"./chunk-5VU4FEMT.js";import{k as r}from"./chunk-DM6JDEZS.js";import{a as i,b as a,db as c,eb as m,hb as n,l as h,oa as d,za as l}from"./chunk-S7LRKC3Z.js";var g=(()=>{let s=class s{constructor(){this.storageService=l(p),this.state=m({watchlistItems:[],loaded:!1,error:null}),this.watchlistItemsLoaded$=this.storageService.loadWatchlist(),this.watchlistItems=c(()=>this.state().watchlistItems),this.loaded=c(()=>this.state().loaded),this.add$=new h,this.remove$=new h,this.add$.pipe(r()).subscribe(e=>this.state.update(t=>a(i({},t),{watchlistItems:[...t.watchlistItems,e]}))),this.remove$.pipe(r()).subscribe(e=>this.state.update(t=>a(i({},t),{watchlistItems:t.watchlistItems.filter(u=>u.id!==e)}))),this.watchlistItemsLoaded$.pipe(r()).subscribe({next:e=>this.state.update(t=>a(i({},t),{watchlistItems:e,loaded:!0})),error:e=>this.state.update(t=>a(i({},t),{error:e}))}),n(()=>{this.loaded()&&this.storageService.saveWatchlist(this.watchlistItems())})}isMovieOnWatchlist(e){return this.watchlistItems().some(t=>t.id===e)}};s.\u0275fac=function(t){return new(t||s)},s.\u0275prov=d({token:s,factory:s.\u0275fac,providedIn:"root"});let o=s;return o})();export{g as a};
