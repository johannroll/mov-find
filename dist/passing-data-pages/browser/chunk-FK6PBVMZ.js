import{a as z}from"./chunk-NWT5ADVY.js";import"./chunk-5VU4FEMT.js";import{X as _,Y as g,aa as B,ba as D,ca as C,g as V}from"./chunk-Y45GAI2G.js";import{Ab as T,Bb as n,Cb as a,Db as x,Eb as w,Hb as m,Jb as p,Mb as v,Sb as l,Tb as W,Wb as f,Xa as c,aa as O,db as P,ea as d,eb as S,ha as h,ia as u,nc as F,qb as y,sb as I,xb as k,za as M,zb as E,zc as L}from"./chunk-S7LRKC3Z.js";var Y=(e,t)=>t.id;function q(e,t){if(e&1){let o=w();n(0,"li")(1,"div",1)(2,"div",2),x(3,"img",3),n(4,"div",4)(5,"p"),l(6),a()()(),n(7,"button",5),m("click",function(){let r=h(o).$implicit,b=p();return u(b.delete.emit(r.id))}),n(8,"mat-icon"),l(9," cancel "),a()()()()}if(e&2){let o=t.$implicit;c(2),v("routerLink","/detail/",o.id,""),c(),v("ngSrc","https://image.tmdb.org/t/p/w500/",o.poster_path,""),c(3),W(o.title)}}function A(e,t){e&1&&(n(0,"div")(1,"h2"),l(2,"You haven't added any movies yet"),a()())}var $=(()=>{let t=class t{constructor(){this.delete=new O}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=d({type:t,selectors:[["app-watchlist-list"]],inputs:{watchlistItems:"watchlistItems"},outputs:{delete:"delete"},standalone:!0,features:[f],decls:5,vars:1,consts:[[1,"watchlist"],[1,"watchlist-item-container"],[1,"watchlist-item",3,"routerLink"],["priority","","width","500","height","750",1,"watchlist-item-image",3,"ngSrc"],[1,"watchlist-item-details"],["mat-icon-button","",1,"remove-btn",3,"click"]],template:function(i,r){i&1&&(n(0,"section")(1,"ul",0),E(2,q,10,3,"li",null,Y,!1,A,3,0,"div"),a()()),i&2&&(c(2),T(r.watchlistItems))},dependencies:[g,_,C,D,L,V],styles:[".watchlist[_ngcontent-%COMP%]{max-width:550px;display:flex;flex-direction:column}.watchlist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:1rem}.watchlist-item-container[_ngcontent-%COMP%]{width:550px;display:grid;grid-template-columns:490px 60px}.watchlist-item[_ngcontent-%COMP%]{display:flex;align-items:center;border-radius:10px;cursor:pointer;transition:all .2s ease;border:1px solid rgb(190,190,190,.8);box-shadow:2px 2px 10px 2px #0003}.watchlist-item[_ngcontent-%COMP%]:hover{transform:scale(1.025)}.watchlist-item-details[_ngcontent-%COMP%]{width:450px;display:flex;align-items:center;margin-left:10px;font-size:1rem}.watchlist-item-image[_ngcontent-%COMP%]{height:75px;width:450px;object-fit:cover;border-top-left-radius:10px;border-bottom-left-radius:10px}.remove-btn[_ngcontent-%COMP%]{align-self:center;margin:auto}@media (max-width: 610px){.watchlist-item-container[_ngcontent-%COMP%]{width:450px;grid-template-columns:410px 40px}}@media (max-width: 500px){.watchlist-item[_ngcontent-%COMP%]{flex-direction:column}.watchlist-item-details[_ngcontent-%COMP%]{width:300px;font-size:.9rem}.watchlist-item-image[_ngcontent-%COMP%]{width:300px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-left-radius:0}.watchlist-item[_ngcontent-%COMP%]{width:300px}.watchlist-item-container[_ngcontent-%COMP%]{width:350px;grid-template-columns:310px 40px}}@media (max-width: 400px){.watchlist-item[_ngcontent-%COMP%]{flex-direction:column}.watchlist-item-details[_ngcontent-%COMP%]{width:275px;font-size:.8rem}.watchlist-item-image[_ngcontent-%COMP%], .watchlist-item[_ngcontent-%COMP%]{width:275px}.watchlist-item-container[_ngcontent-%COMP%]{width:315px;grid-template-columns:275px 45px}.remove-btn[_ngcontent-%COMP%]{margin-left:7px}.watchlist-item-image[_ngcontent-%COMP%]{height:90px}}"]});let e=t;return e})();function G(e,t){if(e&1){let o=w();n(0,"app-watchlist-list",3),m("delete",function(i){h(o);let r=p();return u(r.watchlistService.remove$.next(i))}),a()}if(e&2){let o=p();I("watchlistItems",o.items())}}function H(e,t){e&1&&x(0,"div",4)}var mt=(()=>{let t=class t{constructor(){this.location=M(F),this.watchlistService=M(z),this.items=P(()=>this.watchlistService.watchlistItems()),this.back=S(this.location)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=d({type:t,selectors:[["app-watchlist"]],standalone:!0,features:[f],decls:6,vars:1,consts:[["mat-mini-fab","","color","accent",1,"btn-back",3,"click"],[1,"container"],[3,"watchlistItems"],[3,"watchlistItems","delete"],[1,"loader"]],template:function(i,r){i&1&&(n(0,"button",0),m("click",function(){return r.back().back()}),n(1,"mat-icon"),l(2,"arrow_back"),a()(),n(3,"div",1),y(4,G,1,1,"app-watchlist-list",2)(5,H,1,0),a()),i&2&&(c(4),k(4,r.watchlistService.loaded()?4:5))},dependencies:[$,g,_,C,B]});let e=t;return e})();export{mt as default};
