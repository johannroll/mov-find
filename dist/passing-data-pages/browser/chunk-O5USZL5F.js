import{$ as q,Ba as y,Ca as l,Ja as k,Ma as re,Oa as se,Ob as $,Pb as v,aa as J,ab as C,da as p,fa as Q,ga as L,gb as T,ha as A,jb as N,kb as oe,kc as fe,lb as ue,lc as De,ma as R,nb as ae,ob as ce,pa as F,pc as ge,qa as ee,qb as de,rc as b,sa as S,sb as le,sc as x,va as te,ya as ne,za as ie,zb as he}from"./chunk-HA7JJ4OK.js";var Ae=null;function U(){return Ae}function Nt(t){Ae??=t}var pe=class{};var Y=new S(""),Se=(()=>{let n=class n{historyGo(e){throw new Error("")}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=F({token:n,factory:()=>l(Me),providedIn:"platform"});let t=n;return t})();var Me=(()=>{let n=class n extends Se{constructor(){super(),this._doc=l(Y),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return U().getBaseHref(this._doc)}onPopState(e){let i=U().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=U().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=F({token:n,factory:()=>new n,providedIn:"platform"});let t=n;return t})();function ve(t,n){if(t.length==0)return n;if(n.length==0)return t;let s=0;return t.endsWith("/")&&s++,n.startsWith("/")&&s++,s==2?t+n.substring(1):s==1?t+n:t+"/"+n}function me(t){let n=t.match(/#|\?|$/),s=n&&n.index||t.length,e=s-(t[s-1]==="/"?1:0);return t.slice(0,e)+t.slice(s)}function E(t){return t&&t[0]!=="?"?"?"+t:t}var W=(()=>{let n=class n{historyGo(e){throw new Error("")}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=F({token:n,factory:()=>l(Le),providedIn:"root"});let t=n;return t})(),Be=new S(""),Le=(()=>{let n=class n extends W{constructor(e,i){super(),this._platformLocation=e,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??l(Y).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return ve(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+E(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let u=this.prepareExternalUrl(r+E(o));this._platformLocation.pushState(e,i,u)}replaceState(e,i,r,o){let u=this.prepareExternalUrl(r+E(o));this._platformLocation.replaceState(e,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}};n.\u0275fac=function(i){return new(i||n)(y(Se),y(Be,8))},n.\u0275prov=F({token:n,factory:n.\u0275fac,providedIn:"root"});let t=n;return t})();var Re=(()=>{let n=class n{constructor(e){this._subject=new J,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=Pe(me(Fe(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+E(i))}normalize(e){return n.stripTrailingSlash(Oe(this._basePath,Fe(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+E(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+E(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i,complete:r})}};n.normalizeQueryParams=E,n.joinWithSlash=ve,n.stripTrailingSlash=me,n.\u0275fac=function(i){return new(i||n)(y(W))},n.\u0275prov=F({token:n,factory:()=>Te(),providedIn:"root"});let t=n;return t})();function Te(){return new Re(y(W))}function Oe(t,n){if(!t||!n.startsWith(t))return n;let s=n.substring(t.length);return s===""||["/",";","?","#"].includes(s[0])?s:n}function Fe(t){return t.replace(/\/index.html$/,"")}function Pe(t){if(new RegExp("^(https?:)?//").test(t)){let[,s]=t.split(/\/\/[^\/]+/);return s}return t}var be=function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t}(be||{});var g=function(t){return t[t.Decimal=0]="Decimal",t[t.Group=1]="Group",t[t.List=2]="List",t[t.PercentSign=3]="PercentSign",t[t.PlusSign=4]="PlusSign",t[t.MinusSign=5]="MinusSign",t[t.Exponential=6]="Exponential",t[t.SuperscriptingExponent=7]="SuperscriptingExponent",t[t.PerMille=8]="PerMille",t[t.Infinity=9]="Infinity",t[t.NaN=10]="NaN",t[t.TimeSeparator=11]="TimeSeparator",t[t.CurrencyDecimal=12]="CurrencyDecimal",t[t.CurrencyGroup=13]="CurrencyGroup",t}(g||{});function _(t,n){let s=$(t),e=s[v.NumberSymbols][n];if(typeof e>"u"){if(n===g.CurrencyDecimal)return s[v.NumberSymbols][g.Decimal];if(n===g.CurrencyGroup)return s[v.NumberSymbols][g.Group]}return e}function ke(t,n){return $(t)[v.NumberFormats][n]}var Ne=/^(\d+)?\.((\d+)(-(\d+))?)?$/,Ce=22,O=".",I="0",$e=";",xe=",",z="#";function Ue(t,n,s,e,i,r,o=!1){let u="",m=!1;if(!isFinite(t))u=_(s,g.Infinity);else{let d=Ge(t);o&&(d=je(d));let h=n.minInt,a=n.minFrac,f=n.maxFrac;if(r){let w=r.match(Ne);if(w===null)throw new Error(`${r} is not a valid digit info`);let K=w[1],P=w[3],X=w[5];K!=null&&(h=V(K)),P!=null&&(a=V(P)),X!=null?f=V(X):P!=null&&a>f&&(f=a)}He(d,a,f);let c=d.digits,D=d.integerLen,Z=d.exponent,M=[];for(m=c.every(w=>!w);D<h;D++)c.unshift(0);for(;D<0;D++)c.unshift(0);D>0?M=c.splice(D,c.length):(M=c,c=[0]);let B=[];for(c.length>=n.lgSize&&B.unshift(c.splice(-n.lgSize,c.length).join(""));c.length>n.gSize;)B.unshift(c.splice(-n.gSize,c.length).join(""));c.length&&B.unshift(c.join("")),u=B.join(_(s,e)),M.length&&(u+=_(s,i)+M.join("")),Z&&(u+=_(s,g.Exponential)+"+"+Z)}return t<0&&!m?u=n.negPre+u+n.negSuf:u=n.posPre+u+n.posSuf,u}function ze(t,n,s){let e=ke(n,be.Decimal),i=Ve(e,_(n,g.MinusSign));return Ue(t,i,n,g.Group,g.Decimal,s)}function Ve(t,n="-"){let s={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},e=t.split($e),i=e[0],r=e[1],o=i.indexOf(O)!==-1?i.split(O):[i.substring(0,i.lastIndexOf(I)+1),i.substring(i.lastIndexOf(I)+1)],u=o[0],m=o[1]||"";s.posPre=u.substring(0,u.indexOf(z));for(let h=0;h<m.length;h++){let a=m.charAt(h);a===I?s.minFrac=s.maxFrac=h+1:a===z?s.maxFrac=h+1:s.posSuf+=a}let d=u.split(xe);if(s.gSize=d[1]?d[1].length:0,s.lgSize=d[2]||d[1]?(d[2]||d[1]).length:0,r){let h=i.length-s.posPre.length-s.posSuf.length,a=r.indexOf(z);s.negPre=r.substring(0,a).replace(/'/g,""),s.negSuf=r.slice(a+h).replace(/'/g,"")}else s.negPre=n+s.posPre,s.negSuf=s.posSuf;return s}function je(t){if(t.digits[0]===0)return t;let n=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(n===0?t.digits.push(0,0):n===1&&t.digits.push(0),t.integerLen+=2),t}function Ge(t){let n=Math.abs(t)+"",s=0,e,i,r,o,u;for((i=n.indexOf(O))>-1&&(n=n.replace(O,"")),(r=n.search(/e/i))>0?(i<0&&(i=r),i+=+n.slice(r+1),n=n.substring(0,r)):i<0&&(i=n.length),r=0;n.charAt(r)===I;r++);if(r===(u=n.length))e=[0],i=1;else{for(u--;n.charAt(u)===I;)u--;for(i-=r,e=[],o=0;r<=u;r++,o++)e[o]=Number(n.charAt(r))}return i>Ce&&(e=e.splice(0,Ce-1),s=i-1,i=1),{digits:e,exponent:s,integerLen:i}}function He(t,n,s){if(n>s)throw new Error(`The minimum number of digits after fraction (${n}) is higher than the maximum (${s}).`);let e=t.digits,i=e.length-t.integerLen,r=Math.min(Math.max(n,i),s),o=r+t.integerLen,u=e[o];if(o>0){e.splice(Math.max(t.integerLen,o));for(let a=o;a<e.length;a++)e[a]=0}else{i=Math.max(0,i),t.integerLen=1,e.length=Math.max(1,o=r+1),e[0]=0;for(let a=1;a<o;a++)e[a]=0}if(u>=5)if(o-1<0){for(let a=0;a>o;a--)e.unshift(0),t.integerLen++;e.unshift(1),t.integerLen++}else e[o-1]++;for(;i<Math.max(0,r);i++)e.push(0);let m=r!==0,d=n+t.integerLen,h=e.reduceRight(function(a,f,c,D){return f=f+a,D[c]=f<10?f:f-10,m&&(D[c]===0&&c>=d?D.pop():m=!1),f>=10?1:0},0);h&&(e.unshift(h),t.integerLen++)}function V(t){let n=parseInt(t);if(isNaN(n))throw new Error("Invalid integer literal when parsing "+t);return n}function $t(t,n){n=encodeURIComponent(n);for(let s of t.split(";")){let e=s.indexOf("="),[i,r]=e==-1?[s,""]:[s.slice(0,e),s.slice(e+1)];if(i.trim()===n)return decodeURIComponent(r)}return null}var j=/\s+/,Ee=[],xt=(()=>{let n=class n{constructor(e,i){this._ngEl=e,this._renderer=i,this.initialClasses=Ee,this.stateMap=new Map}set klass(e){this.initialClasses=e!=null?e.trim().split(j):Ee}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(j):e}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let i of e)this._updateState(i,!0);else if(e!=null)for(let i of Object.keys(e))this._updateState(i,!!e[i]);this._applyStateDiff()}_updateState(e,i){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(e,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let i=e[0],r=e[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(e,i){e=e.trim(),e.length>0&&e.split(j).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};n.\u0275fac=function(i){return new(i||n)(C(R),C(T))},n.\u0275dir=L({type:n,selectors:[["","ngClass",""]],inputs:{klass:[p.None,"class","klass"],ngClass:"ngClass"},standalone:!0});let t=n;return t})();var Ut=(()=>{let n=class n{constructor(e){this._viewContainerRef=e,this._viewRef=null,this.ngTemplateOutletContext=null,this.ngTemplateOutlet=null,this.ngTemplateOutletInjector=null}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}};n.\u0275fac=function(i){return new(i||n)(C(de))},n.\u0275dir=L({type:n,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},standalone:!0,features:[k]});let t=n;return t})();function _e(t,n){return new q(2100,!1)}var G=class{createSubscription(n,s){return N(()=>n.subscribe({next:s,error:e=>{throw e}}))}dispose(n){N(()=>n.unsubscribe())}},H=class{createSubscription(n,s){return n.then(s,e=>{throw e})}dispose(n){}},Ye=new H,We=new G,zt=(()=>{let n=class n{constructor(e){this._latestValue=null,this._subscription=null,this._obj=null,this._strategy=null,this._ref=e}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(e){return this._obj?e!==this._obj?(this._dispose(),this.transform(e)):this._latestValue:(e&&this._subscribe(e),this._latestValue)}_subscribe(e){this._obj=e,this._strategy=this._selectStrategy(e),this._subscription=this._strategy.createSubscription(e,i=>this._updateLatestValue(e,i))}_selectStrategy(e){if(fe(e))return Ye;if(De(e))return We;throw _e(n,e)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(e,i){e===this._obj&&(this._latestValue=i,this._ref.markForCheck())}};n.\u0275fac=function(i){return new(i||n)(C(ue,16))},n.\u0275pipe=A({name:"async",type:n,pure:!1,standalone:!0});let t=n;return t})();var Vt=(()=>{let n=class n{transform(e){return JSON.stringify(e,null,2)}};n.\u0275fac=function(i){return new(i||n)},n.\u0275pipe=A({name:"json",type:n,pure:!1,standalone:!0});let t=n;return t})();function Ze(t,n){return{key:t,value:n}}var jt=(()=>{let n=class n{constructor(e){this.differs=e,this.keyValues=[],this.compareFn=we}transform(e,i=we){if(!e||!(e instanceof Map)&&typeof e!="object")return null;this.differ??=this.differs.find(e).create();let r=this.differ.diff(e),o=i!==this.compareFn;return r&&(this.keyValues=[],r.forEachItem(u=>{this.keyValues.push(Ze(u.key,u.currentValue))})),(r||o)&&(this.keyValues.sort(i),this.compareFn=i),this.keyValues}};n.\u0275fac=function(i){return new(i||n)(C(oe,16))},n.\u0275pipe=A({name:"keyvalue",type:n,pure:!1,standalone:!0});let t=n;return t})();function we(t,n){let s=t.key,e=n.key;if(s===e)return 0;if(s===void 0)return 1;if(e===void 0)return-1;if(s===null)return 1;if(e===null)return-1;if(typeof s=="string"&&typeof e=="string")return s<e?-1:1;if(typeof s=="number"&&typeof e=="number")return s-e;if(typeof s=="boolean"&&typeof e=="boolean")return s<e?-1:1;let i=String(s),r=String(e);return i==r?0:i<r?-1:1}var Gt=(()=>{let n=class n{constructor(e){this._locale=e}transform(e,i,r){if(!Ke(e))return null;r||=this._locale;try{let o=Xe(e);return ze(o,r,i)}catch(o){throw _e(n,o.message)}}};n.\u0275fac=function(i){return new(i||n)(C(ge,16))},n.\u0275pipe=A({name:"number",type:n,pure:!0,standalone:!0});let t=n;return t})();function Ke(t){return!(t==null||t===""||t!==t)}function Xe(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new Error(`${t} is not a number`);return t}var Ht=(()=>{let n=class n{};n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=Q({type:n}),n.\u0275inj=ee({});let t=n;return t})(),qe="browser",Je="server";function Yt(t){return t===qe}function Qe(t){return t===Je}var ye=class{};var Ie=t=>t.src,et=new S("",{providedIn:"root",factory:()=>Ie});var tt=new S("NG_OPTIMIZED_PRELOADED_IMAGES",{providedIn:"root",factory:()=>new Set}),nt=(()=>{let n=class n{constructor(){this.preloadedImages=l(tt),this.document=l(Y)}createPreloadLinkTag(e,i,r,o){if(this.preloadedImages.has(i))return;this.preloadedImages.add(i);let u=e.createElement("link");e.setAttribute(u,"as","image"),e.setAttribute(u,"href",i),e.setAttribute(u,"rel","preload"),e.setAttribute(u,"fetchpriority","high"),o&&e.setAttribute(u,"imageSizes",o),r&&e.setAttribute(u,"imageSrcset",r),e.appendChild(this.document.head,u)}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=F({token:n,factory:n.\u0275fac,providedIn:"root"});let t=n;return t})();var it=/^((\s*\d+w\s*(,|$)){1,})$/;var rt=[1,2],st=640;var ot=1920,ut=1080;var Wt=(()=>{let n=class n{constructor(){this.imageLoader=l(et),this.config=at(l(ie)),this.renderer=l(T),this.imgElement=l(R).nativeElement,this.injector=l(re),this.isServer=Qe(l(te)),this.preloadLinkCreator=l(nt),this.lcpObserver=null,this._renderedSrc=null,this.priority=!1,this.disableOptimizedSrcset=!1,this.fill=!1}ngOnInit(){ae("NgOptimizedImage"),this.placeholder&&this.removePlaceholderOnLoad(this,this.imgElement,this.renderer),this.setHostAttributes()}setHostAttributes(){this.fill?this.sizes||="100vw":(this.setHostAttribute("width",this.width.toString()),this.setHostAttribute("height",this.height.toString())),this.setHostAttribute("loading",this.getLoadingBehavior()),this.setHostAttribute("fetchpriority",this.getFetchPriority()),this.setHostAttribute("ng-img","true");let e=this.updateSrcAndSrcset();this.sizes&&this.setHostAttribute("sizes",this.sizes),this.isServer&&this.priority&&this.preloadLinkCreator.createPreloadLinkTag(this.renderer,this.getRewrittenSrc(),e,this.sizes)}ngOnChanges(e){if(e.ngSrc&&!e.ngSrc.isFirstChange()){let i=this._renderedSrc;this.updateSrcAndSrcset(!0);let r=this._renderedSrc;this.lcpObserver!==null&&i&&r&&i!==r&&this.injector.get(ce).runOutsideAngular(()=>{this.lcpObserver?.updateImage(i,r)})}}callImageLoader(e){let i=e;return this.loaderParams&&(i.loaderParams=this.loaderParams),this.imageLoader(i)}getLoadingBehavior(){return!this.priority&&this.loading!==void 0?this.loading:this.priority?"eager":"lazy"}getFetchPriority(){return this.priority?"high":"auto"}getRewrittenSrc(){if(!this._renderedSrc){let e={src:this.ngSrc};this._renderedSrc=this.callImageLoader(e)}return this._renderedSrc}getRewrittenSrcset(){let e=it.test(this.ngSrcset);return this.ngSrcset.split(",").filter(r=>r!=="").map(r=>{r=r.trim();let o=e?parseFloat(r):parseFloat(r)*this.width;return`${this.callImageLoader({src:this.ngSrc,width:o})} ${r}`}).join(", ")}getAutomaticSrcset(){return this.sizes?this.getResponsiveSrcset():this.getFixedSrcset()}getResponsiveSrcset(){let{breakpoints:e}=this.config,i=e;return this.sizes?.trim()==="100vw"&&(i=e.filter(o=>o>=st)),i.map(o=>`${this.callImageLoader({src:this.ngSrc,width:o})} ${o}w`).join(", ")}updateSrcAndSrcset(e=!1){e&&(this._renderedSrc=null);let i=this.getRewrittenSrc();this.setHostAttribute("src",i);let r;return this.ngSrcset?r=this.getRewrittenSrcset():this.shouldGenerateAutomaticSrcset()&&(r=this.getAutomaticSrcset()),r&&this.setHostAttribute("srcset",r),r}getFixedSrcset(){return rt.map(i=>`${this.callImageLoader({src:this.ngSrc,width:this.width*i})} ${i}x`).join(", ")}shouldGenerateAutomaticSrcset(){let e=!1;return this.sizes||(e=this.width>ot||this.height>ut),!this.disableOptimizedSrcset&&!this.srcset&&this.imageLoader!==Ie&&!e}generatePlaceholder(e){let{placeholderResolution:i}=this.config;return e===!0?`url(${this.callImageLoader({src:this.ngSrc,width:i,isPlaceholder:!0})})`:typeof e=="string"&&e.startsWith("data:")?`url(${e})`:null}shouldBlurPlaceholder(e){return!e||!e.hasOwnProperty("blur")?!0:!!e.blur}removePlaceholderOnLoad(e,i,r){let o=r.listen(i,"load",()=>{o(),u(),e.placeholder=!1}),u=r.listen(i,"error",()=>{o(),u(),e.placeholder=!1})}ngOnDestroy(){}setHostAttribute(e,i){this.renderer.setAttribute(this.imgElement,e,i)}};n.\u0275fac=function(i){return new(i||n)},n.\u0275dir=L({type:n,selectors:[["img","ngSrc",""]],hostVars:18,hostBindings:function(i,r){i&2&&he("position",r.fill?"absolute":null)("width",r.fill?"100%":null)("height",r.fill?"100%":null)("inset",r.fill?"0":null)("background-size",r.placeholder?"cover":null)("background-position",r.placeholder?"50% 50%":null)("background-repeat",r.placeholder?"no-repeat":null)("background-image",r.placeholder?r.generatePlaceholder(r.placeholder):null)("filter",r.placeholder&&r.shouldBlurPlaceholder(r.placeholderConfig)?"blur(15px)":null)},inputs:{ngSrc:[p.HasDecoratorInputTransform,"ngSrc","ngSrc",ct],ngSrcset:"ngSrcset",sizes:"sizes",width:[p.HasDecoratorInputTransform,"width","width",x],height:[p.HasDecoratorInputTransform,"height","height",x],loading:"loading",priority:[p.HasDecoratorInputTransform,"priority","priority",b],loaderParams:"loaderParams",disableOptimizedSrcset:[p.HasDecoratorInputTransform,"disableOptimizedSrcset","disableOptimizedSrcset",b],fill:[p.HasDecoratorInputTransform,"fill","fill",b],placeholder:[p.HasDecoratorInputTransform,"placeholder","placeholder",dt],placeholderConfig:"placeholderConfig",src:"src",srcset:"srcset"},standalone:!0,features:[le,k]});let t=n;return t})();function at(t){let n={};return t.breakpoints&&(n.breakpoints=t.breakpoints.sort((s,e)=>s-e)),Object.assign({},ne,t,n)}function ct(t){return typeof t=="string"?t:se(t)}function dt(t){return typeof t=="string"&&t.startsWith("data:")?t:b(t)}export{U as a,Nt as b,pe as c,Y as d,W as e,Re as f,$t as g,xt as h,Ut as i,zt as j,Vt as k,jt as l,Gt as m,Ht as n,qe as o,Yt as p,Qe as q,ye as r,Wt as s};
