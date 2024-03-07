import{h as tt}from"./chunk-2W2UJ6VQ.js";import{a as Q}from"./chunk-ZVYAW45M.js";import{h as Z}from"./chunk-DM6JDEZS.js";import{A as I,Ab as X,Bb as g,Cb as f,D as N,Db as b,Eb as D,Ga as L,Hb as m,Jb as d,Mb as h,Wb as q,Xa as u,Ya as y,Z as w,_ as z,a as k,aa as v,b as W,ea as U,fa as R,ga as V,ha as T,ia as C,ib as A,la as j,pa as Y,q as K,qb as _,u as S,w as F,xb as x,yb as B,za as $,zb as G,zc as J}from"./chunk-S7LRKC3Z.js";function at(t,e,i,o){let n=window&&!!window.document&&window.document.documentElement,r=n&&e?window:i;if(t&&(r=t&&n&&typeof t=="string"?dt(t,i.nativeElement,o):t,!r))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function dt(t,e,i){return(i?window.document:e).querySelector(t)}function O(t){return t&&!t.firstChange}function pt(){return typeof window<"u"}var ft={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},ut={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"},H=class{constructor(e=!0){this.vertical=e,this.propsMap=e?ft:ut}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}};function gt(t,e,i){return!!(t&&e||!i&&e)}function mt({windowElement:t,axis:e}){return ht({axis:e,isWindow:St(t)},t)}function ht(t,e){let i=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return W(k({},t),{container:i})}function St(t){return["Window","global"].some(i=>Object.prototype.toString.call(t).includes(i))}function E(t,e){return t?e.document.documentElement:null}function et(t,e){let i=Tt(e);return e.isWindow?wt(i,t,e):vt(i,t,e)}function wt(t,e,i){let{axis:o,container:n,isWindow:r}=i,{offsetHeightKey:l,clientHeightKey:c}=it(o),a=t+nt(E(r,n),o,r),s=ot(e.nativeElement,r,l,c),p=Ct(e.nativeElement,o,r)+s;return{height:t,scrolled:a,totalToScroll:p,isWindow:r}}function vt(t,e,i){let{axis:o,container:n}=i,r=n[o.scrollTopKey()],l=n[o.scrollHeightKey()];return{height:t,scrolled:r,totalToScroll:l,isWindow:!1}}function it(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function Tt({container:t,isWindow:e,axis:i}){let{offsetHeightKey:o,clientHeightKey:n}=it(i);return ot(t,e,o,n)}function ot(t,e,i,o){if(isNaN(t[i])){let n=E(e,t);return n?n[o]:0}else return t[i]}function Ct(t,e,i){let o=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[o]+nt(t,e,i)}function nt(t,e,i){let o=e.pageYOffsetKey(),n=e.scrollTopKey(),r=e.offsetTopKey();return isNaN(window.pageYOffset)?E(i,t)[n]:t.ownerDocument?t.ownerDocument.defaultView[o]:t[r]}function yt(t,e={down:0,up:0},i){let o,n;if(t.totalToScroll<=0)return!1;let r=t.isWindow?t.scrolled:t.height+t.scrolled;if(i)o=(t.totalToScroll-r)/t.totalToScroll,n=(e?.down?e.down:0)/10;else{let c=t.scrolled+(t.totalToScroll-r);o=t.scrolled/c,n=(e?.up?e.up:0)/10}return o<=n}function _t(t,e){return t<e.scrolled}function xt(t,e,i){let o=_t(t,e);return{fire:yt(e,i,o),scrollDown:o}}var P=class{constructor(e){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},Object.assign(this,e)}updateScrollPosition(e){return this.lastScrollPosition=e}updateTotalToScroll(e){this.lastTotalToScroll!==e&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=e)}updateScroll(e,i){this.updateScrollPosition(e),this.updateTotalToScroll(i)}updateTriggeredFlag(e,i){i?this.triggered.down=e:this.triggered.up=e}isTriggeredScroll(e,i){return i?this.triggered.down===e:this.triggered.up===e}};function bt(t){let{scrollContainer:e,scrollWindow:i,element:o,fromRoot:n}=t,r=mt({axis:new H(!t.horizontal),windowElement:at(e,i,o,n)}),l=new P({totalToScroll:et(o,r).totalToScroll}),c={container:r.container,throttle:t.throttle},a={up:t.upDistance,down:t.downDistance};return Dt(c).pipe(F(()=>K(et(o,r))),S(s=>Ot(l.lastScrollPosition,s,a)),w(({stats:s})=>l.updateScroll(s.scrolled,s.totalToScroll)),N(({fire:s,scrollDown:p,stats:{totalToScroll:st}})=>gt(t.alwaysCallback,s,l.isTriggeredScroll(st,p))),w(({scrollDown:s,stats:{totalToScroll:p}})=>{l.updateTriggeredFlag(p,s)}),S(Ht))}function Dt(t){let e=I(t.container,"scroll");return t.throttle&&(e=e.pipe(z(t.throttle,void 0,{leading:!0,trailing:!0}))),e}function Ot(t,e,i){let{scrollDown:o,fire:n}=xt(t,e,i);return{scrollDown:o,fire:n,stats:e}}var M={DOWN:"[NGX_ISE] DOWN",UP:"[NGX_ISE] UP"};function Ht(t){let{scrollDown:e,stats:{scrolled:i}}=t;return{type:e?M.DOWN:M.UP,payload:{currentScrollPosition:i}}}var rt=(()=>{let e=class e{constructor(o,n){this.element=o,this.zone=n,this.scrolled=new v,this.scrolledUp=new v,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:o,infiniteScrollDisabled:n,infiniteScrollDistance:r}){let l=O(o),c=O(n),a=O(r),s=!c&&!this.infiniteScrollDisabled||c&&!n.currentValue||a;(l||c||a)&&(this.destroyScroller(),s&&this.setup())}setup(){pt()&&this.zone.runOutsideAngular(()=>{this.disposeScroller=bt({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(o=>this.handleOnScroll(o))})}handleOnScroll({type:o,payload:n}){let r=o===M.DOWN?this.scrolled:this.scrolledUp;Pt(r)&&this.zone.run(()=>r.emit(n))}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}};e.\u0275fac=function(n){return new(n||e)(y(j),y(A))},e.\u0275dir=V({type:e,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[L]});let t=e;return t})();function Pt(t){return t.observed??t.observers.length>0}var lt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=R({type:e}),e.\u0275inj=Y({});let t=e;return t})();function Et(t,e){if(t&1&&b(0,"img",5),t&2){let i=d().$implicit;h("ngSrc","https://image.tmdb.org/t/p/w500/",i.poster_path,"")}}function kt(t,e){if(t&1){let i=D();g(0,"img",6),m("click",function(){T(i);let n=d().$implicit,r=d();return C(r.movieService.movieDetailId$.next(+n.id))}),f()}if(t&2){let i=d().$implicit;h("ngSrc","https://image.tmdb.org/t/p/w500/",i.poster_path,"")}}function Wt(t,e){if(t&1){let i=D();g(0,"div",3),m("click",function(){T(i);let n=d();return C(n.movieService.scrollState.set({scrollTo:n.scrollPosition()}))}),_(1,Et,1,1,"img",4)(2,kt,1,1),f()}if(t&2){let i=e.$implicit,o=e.$index;h("routerLink","/detail/",i.id,""),u(),x(1,o<4?1:2)}}function Kt(t,e){t&1&&b(0,"div",7)}var Qt=(()=>{let e=class e{constructor(){this.movieService=$(Q)}ngAfterViewInit(){window.scrollTo(0,this.movieService.scroll())}scrollPosition(){return window.scrollY}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=U({type:e,selectors:[["app-home"]],standalone:!0,features:[q],decls:5,vars:1,consts:[[1,"container"],["infiniteScroll","",1,"movie-list",3,"scrolled"],["class","loader"],[1,"card",3,"routerLink","click"],["priority","","class","image","width","300","height","500",3,"ngSrc"],["priority","","width","300","height","500",1,"image",3,"ngSrc"],["width","300","height","500",1,"image",3,"ngSrc","click"],[1,"loader"],["class","card",3,"routerLink"]],template:function(n,r){n&1&&(g(0,"div",0)(1,"div",1),m("scrolled",function(){return r.movieService.state().genre?r.movieService.paginationGenre$.next(r.movieService.lastKnownMovie()):r.movieService.pagination$.next(r.movieService.lastKnownMovie())}),G(2,Wt,3,2,"div",8,B),f(),_(4,Kt,1,0,"div",2),f()),n&2&&(u(2),X(r.movieService.movies()),u(2),x(4,r.movieService.loading()?4:-1))},dependencies:[Z,tt,J,lt,rt],styles:[".card[_ngcontent-%COMP%]{width:320px;display:flex;margin:1rem;flex-direction:column;align-items:center;background:#3a3a3a;box-shadow:0 2px 10px 2px #0006;transition:all .2s ease}.card[_ngcontent-%COMP%]:hover{cursor:pointer;transform:scale(1.03);z-index:0}.image[_ngcontent-%COMP%]{width:320px;object-fit:cover}.title[_ngcontent-%COMP%]{width:100%;background:#000;text-align:center}.movie-list[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:3rem;display:grid;grid-template-columns:repeat(3,1fr);padding:5px;border:none}@media (max-width: 1050px){.movie-list[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}@media (max-width: 700px){.movie-list[_ngcontent-%COMP%]{grid-template-columns:1fr}}.movie-list-item[_ngcontent-%COMP%]{text-wrap:no-wrap;margin:3px 0;text-align:center;padding:6px;border-radius:5px;background-color:salmon;color:azure;text-decoration:none}.form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:300px;margin-top:4rem;background:#3a3a3a;padding:2rem;border-radius:5px}.form-heading[_ngcontent-%COMP%]{margin:0rem 0rem 2rem;text-align:center}.form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:10px;text-align:center;border:none;outline:none;padding:10px 5px;border-radius:5px}.btn-back[_ngcontent-%COMP%]{margin:1rem;padding:10px;border-radius:5px;border:none;color:azure;background:teal;transition:all .2s ease}.btn-back[_ngcontent-%COMP%]:hover{transform:scale(1.05)}"]});let t=e;return t})();export{Qt as default};
