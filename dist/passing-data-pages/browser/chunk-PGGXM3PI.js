import{h as et}from"./chunk-2W2UJ6VQ.js";import{a as tt}from"./chunk-UB3E2Y34.js";import{a as nt}from"./chunk-6JECF5VE.js";import"./chunk-5VU4FEMT.js";import{$ as rt,X as it,Y as ot,ba as lt,g as Q}from"./chunk-LQNHJOFK.js";import{A as N,Ab as q,Bb as d,Cb as m,D as U,Db as M,Eb as v,Ga as L,Hb as p,Jb as a,Mb as C,Sb as P,Wb as J,Xa as w,Ya as D,Z as x,_ as $,a as K,aa as b,b as I,ea as R,fa as j,ga as S,ha as g,ia as h,ib as A,la as Y,pa as B,q as V,qb as H,u as T,w as z,xb as _,yb as G,za as y,zb as X,zc as Z}from"./chunk-S7LRKC3Z.js";function ht(t,e,i,n){let o=window&&!!window.document&&window.document.documentElement,r=o&&e?window:i;if(t&&(r=t&&o&&typeof t=="string"?wt(t,i.nativeElement,n):t,!r))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function wt(t,e,i){return(i?window.document:e).querySelector(t)}function O(t){return t&&!t.firstChange}function vt(){return typeof window<"u"}var St={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},_t={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"},k=class{constructor(e=!0){this.vertical=e,this.propsMap=e?St:_t}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}};function Ct(t,e,i){return!!(t&&e||!i&&e)}function Tt({windowElement:t,axis:e}){return xt({axis:e,isWindow:bt(t)},t)}function xt(t,e){let i=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return I(K({},t),{container:i})}function bt(t){return["Window","global"].some(i=>Object.prototype.toString.call(t).includes(i))}function F(t,e){return t?e.document.documentElement:null}function st(t,e){let i=Ht(e);return e.isWindow?yt(i,t,e):Dt(i,t,e)}function yt(t,e,i){let{axis:n,container:o,isWindow:r}=i,{offsetHeightKey:l,clientHeightKey:s}=at(n),f=t+pt(F(r,o),n,r),c=dt(e.nativeElement,r,l,s),u=Mt(e.nativeElement,n,r)+c;return{height:t,scrolled:f,totalToScroll:u,isWindow:r}}function Dt(t,e,i){let{axis:n,container:o}=i,r=o[n.scrollTopKey()],l=o[n.scrollHeightKey()];return{height:t,scrolled:r,totalToScroll:l,isWindow:!1}}function at(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function Ht({container:t,isWindow:e,axis:i}){let{offsetHeightKey:n,clientHeightKey:o}=at(i);return dt(t,e,n,o)}function dt(t,e,i,n){if(isNaN(t[i])){let o=F(e,t);return o?o[n]:0}else return t[i]}function Mt(t,e,i){let n=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[n]+pt(t,e,i)}function pt(t,e,i){let n=e.pageYOffsetKey(),o=e.scrollTopKey(),r=e.offsetTopKey();return isNaN(window.pageYOffset)?F(i,t)[o]:t.ownerDocument?t.ownerDocument.defaultView[n]:t[r]}function Pt(t,e={down:0,up:0},i){let n,o;if(t.totalToScroll<=0)return!1;let r=t.isWindow?t.scrolled:t.height+t.scrolled;if(i)n=(t.totalToScroll-r)/t.totalToScroll,o=(e?.down?e.down:0)/10;else{let s=t.scrolled+(t.totalToScroll-r);n=t.scrolled/s,o=(e?.up?e.up:0)/10}return n<=o}function Ot(t,e){return t<e.scrolled}function kt(t,e,i){let n=Ot(t,e);return{fire:Pt(e,i,n),scrollDown:n}}var E=class{constructor(e){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},Object.assign(this,e)}updateScrollPosition(e){return this.lastScrollPosition=e}updateTotalToScroll(e){this.lastTotalToScroll!==e&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=e)}updateScroll(e,i){this.updateScrollPosition(e),this.updateTotalToScroll(i)}updateTriggeredFlag(e,i){i?this.triggered.down=e:this.triggered.up=e}isTriggeredScroll(e,i){return i?this.triggered.down===e:this.triggered.up===e}};function Et(t){let{scrollContainer:e,scrollWindow:i,element:n,fromRoot:o}=t,r=Tt({axis:new k(!t.horizontal),windowElement:ht(e,i,n,o)}),l=new E({totalToScroll:st(n,r).totalToScroll}),s={container:r.container,throttle:t.throttle},f={up:t.upDistance,down:t.downDistance};return Wt(s).pipe(z(()=>V(st(n,r))),T(c=>Ft(l.lastScrollPosition,c,f)),x(({stats:c})=>l.updateScroll(c.scrolled,c.totalToScroll)),U(({fire:c,scrollDown:u,stats:{totalToScroll:gt}})=>Ct(t.alwaysCallback,c,l.isTriggeredScroll(gt,u))),x(({scrollDown:c,stats:{totalToScroll:u}})=>{l.updateTriggeredFlag(u,c)}),T(Kt))}function Wt(t){let e=N(t.container,"scroll");return t.throttle&&(e=e.pipe($(t.throttle,void 0,{leading:!0,trailing:!0}))),e}function Ft(t,e,i){let{scrollDown:n,fire:o}=kt(t,e,i);return{scrollDown:n,fire:o,stats:e}}var W={DOWN:"[NGX_ISE] DOWN",UP:"[NGX_ISE] UP"};function Kt(t){let{scrollDown:e,stats:{scrolled:i}}=t;return{type:e?W.DOWN:W.UP,payload:{currentScrollPosition:i}}}var ft=(()=>{let e=class e{constructor(n,o){this.element=n,this.zone=o,this.scrolled=new b,this.scrolledUp=new b,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:n,infiniteScrollDisabled:o,infiniteScrollDistance:r}){let l=O(n),s=O(o),f=O(r),c=!s&&!this.infiniteScrollDisabled||s&&!o.currentValue||f;(l||s||f)&&(this.destroyScroller(),c&&this.setup())}setup(){vt()&&this.zone.runOutsideAngular(()=>{this.disposeScroller=Et({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(n=>this.handleOnScroll(n))})}handleOnScroll({type:n,payload:o}){let r=n===W.DOWN?this.scrolled:this.scrolledUp;It(r)&&this.zone.run(()=>r.emit(o))}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}};e.\u0275fac=function(o){return new(o||e)(D(Y),D(A))},e.\u0275dir=S({type:e,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[L]});let t=e;return t})();function It(t){return t.observed??t.observers.length>0}var mt=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=j({type:e}),e.\u0275inj=B({});let t=e;return t})();var ut=(()=>{let e=class e{onClick(n){n.stopPropagation()}};e.\u0275fac=function(o){return new(o||e)},e.\u0275dir=S({type:e,selectors:[["","stopPropagation",""]],hostBindings:function(o,r){o&1&&p("click",function(s){return r.onClick(s)})},standalone:!0});let t=e;return t})();function zt(t,e){if(t&1&&M(0,"img",6),t&2){let i=a().$implicit;C("ngSrc","https://image.tmdb.org/t/p/w500/",i.poster_path,"")}}function Nt(t,e){if(t&1){let i=v();d(0,"img",7),p("click",function(){g(i);let o=a().$implicit,r=a();return h(r.movieService.movieDetailId$.next(+o.id))}),m()}if(t&2){let i=a().$implicit;C("ngSrc","https://image.tmdb.org/t/p/w500/",i.poster_path,"")}}function Ut(t,e){if(t&1){let i=v();d(0,"button",8),p("click",function(){g(i);let o=a().$implicit,r=a();return h(r.watchlistService.remove$.next(o.id))}),d(1,"mat-icon"),P(2,"favorite"),m()()}}function $t(t,e){if(t&1){let i=v();d(0,"button",9),p("click",function(){g(i);let o=a().$implicit,r=a();return h(r.watchlistService.add$.next(o))}),d(1,"mat-icon"),P(2,"favorite"),m()()}}function Rt(t,e){if(t&1){let i=v();d(0,"div",3),p("click",function(){g(i);let o=a();return h(o.movieService.scrollState.set({scrollTo:o.scrollPosition()}))}),H(1,zt,1,1,"img",4)(2,Nt,1,1)(3,Ut,3,0,"button",5)(4,$t,3,0),m()}if(t&2){let i=e.$implicit,n=e.$index,o=a();C("routerLink","/detail/",i.id,""),w(),_(1,n<2?1:2),w(2),_(3,o.watchlistService.isMovieOnWatchlist(i.id)?3:4)}}function jt(t,e){t&1&&M(0,"div",10)}var ge=(()=>{let e=class e{constructor(){this.movieService=y(tt),this.watchlistService=y(nt)}ngAfterViewInit(){window.scrollTo(0,this.movieService.scroll())}scrollPosition(){return window.scrollY}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=R({type:e,selectors:[["app-home"]],standalone:!0,features:[J],decls:5,vars:1,consts:[[1,"container"],["infiniteScroll","",1,"movie-list",3,"scrolled"],["class","loader"],[1,"card",3,"routerLink","click"],["priority","","class","image","width","300","height","500",3,"ngSrc"],["mat-mini-fab","","color","warn","class","btn-favorite-home","stopPropagation",""],["priority","","width","300","height","500",1,"image",3,"ngSrc"],["width","300","height","500",1,"image",3,"ngSrc","click"],["mat-mini-fab","","color","warn","stopPropagation","",1,"btn-favorite-home",3,"click"],["mat-mini-fab","","color","none","stopPropagation","",1,"btn-favorite-home",3,"click"],[1,"loader"],["class","card",3,"routerLink"]],template:function(o,r){o&1&&(d(0,"div",0)(1,"div",1),p("scrolled",function(){return r.movieService.state().genre?r.movieService.paginationGenre$.next(r.movieService.lastKnownMovie()):r.movieService.pagination$.next(r.movieService.lastKnownMovie())}),X(2,Rt,5,3,"div",11,G),m(),H(4,jt,1,0,"div",2),m()),o&2&&(w(2),q(r.movieService.movies()),w(2),_(4,r.movieService.loading()?4:-1))},dependencies:[Q,et,Z,mt,ft,ot,it,lt,rt,ut],styles:[".card[_ngcontent-%COMP%]{position:relative;width:320px;display:flex;margin:1rem;flex-direction:column;align-items:center;background:#3a3a3a;box-shadow:0 3px 15px 3px #0006;transition:all .2s ease}.card[_ngcontent-%COMP%]:hover{cursor:pointer;transform:scale(1.03);z-index:0}.image[_ngcontent-%COMP%]{width:320px;object-fit:cover}.title[_ngcontent-%COMP%]{width:100%;background:#000;text-align:center}.movie-list[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:3rem;display:grid;grid-template-columns:repeat(3,1fr);padding:5px;border:none}@media (max-width: 1050px){.movie-list[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}@media (max-width: 700px){.movie-list[_ngcontent-%COMP%]{grid-template-columns:1fr}}.movie-list-item[_ngcontent-%COMP%]{text-wrap:no-wrap;margin:3px 0;text-align:center;padding:6px;border-radius:5px;background-color:salmon;color:azure;text-decoration:none}.form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:300px;margin-top:4rem;background:#3a3a3a;padding:2rem;border-radius:5px}.form-heading[_ngcontent-%COMP%]{margin:0rem 0rem 2rem;text-align:center}.form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:10px;text-align:center;border:none;outline:none;padding:10px 5px;border-radius:5px}.btn-back[_ngcontent-%COMP%]{margin:1rem;padding:10px;border-radius:5px;border:none;color:azure;background:teal;transition:all .2s ease}.btn-back[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.btn-favorite-home[_ngcontent-%COMP%]{position:absolute!important;bottom:5px;right:0;align-self:center;margin:0rem 5px;border:none;z-index:10}"]});let t=e;return t})();export{ge as default};
