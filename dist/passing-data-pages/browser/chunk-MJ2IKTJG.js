import{$ as T,Aa as ie,Ca as Fe,D as Se,Da as Ue,Ea as _e,Fa as ae,G as ke,Ka as ce,La as N,Ma as P,N as te,Na as Be,Oa as Ve,Pa as ze,Qa as $e,Ra as Ke,Sa as Xe,Ta as qe,Ua as M,W as xe,Wa as x,X as Le,a as B,b as Oe,bb as Je,ca as k,db as Ge,eb as le,fa as ne,fc as We,gb as z,i as V,ib as O,ic as ue,jc as Ze,kc as Ye,lc as E,na as Ce,oa as m,oc as $,p as Ie,pa as re,pb as de,q as ee,ra as v,sa as se,ta as je,u as S,ua as R,vc as Qe,wa as oe,xc as he,ya as d,yc as K,za as w}from"./chunk-S7LRKC3Z.js";var C=class{},q=class{},D=class t{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(s=>{let n=s.indexOf(":");if(n>0){let r=s.slice(0,n),o=r.toLowerCase(),i=s.slice(n+1).trim();this.maybeSetNormalizedName(r,o),this.headers.has(o)?this.headers.get(o).push(i):this.headers.set(o,[i])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((s,n)=>{this.setHeaderEntries(n,s)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([s,n])=>{this.setHeaderEntries(s,n)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let s=this.headers.get(e.toLowerCase());return s&&s.length>0?s[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,s){return this.clone({name:e,value:s,op:"a"})}set(e,s){return this.clone({name:e,value:s,op:"s"})}delete(e,s){return this.clone({name:e,value:s,op:"d"})}maybeSetNormalizedName(e,s){this.normalizedNames.has(s)||this.normalizedNames.set(s,e)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(s=>{this.headers.set(s,e.headers.get(s)),this.normalizedNames.set(s,e.normalizedNames.get(s))})}clone(e){let s=new t;return s.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,s.lazyUpdate=(this.lazyUpdate||[]).concat([e]),s}applyUpdate(e){let s=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,s);let r=(e.op==="a"?this.headers.get(s):void 0)||[];r.push(...n),this.headers.set(s,r);break;case"d":let o=e.value;if(!o)this.headers.delete(s),this.normalizedNames.delete(s);else{let i=this.headers.get(s);if(!i)return;i=i.filter(a=>o.indexOf(a)===-1),i.length===0?(this.headers.delete(s),this.normalizedNames.delete(s)):this.headers.set(s,i)}break}}setHeaderEntries(e,s){let n=(Array.isArray(s)?s:[s]).map(o=>o.toString()),r=e.toLowerCase();this.headers.set(r,n),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(s=>e(this.normalizedNames.get(s),this.headers.get(s)))}};var pe=class{encodeKey(e){return He(e)}encodeValue(e){return He(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function Rt(t,e){let s=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[i,a]=o==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,o)),e.decodeValue(r.slice(o+1))],l=s.get(i)||[];l.push(a),s.set(i,l)}),s}var Mt=/%(\d[a-f0-9])/gi,Dt={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function He(t){return encodeURIComponent(t).replace(Mt,(e,s)=>Dt[s]??e)}function X(t){return`${t}`}var b=class t{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new pe,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Rt(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(s=>{let n=e.fromObject[s],r=Array.isArray(n)?n.map(X):[X(n)];this.map.set(s,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let s=this.map.get(e);return s?s[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,s){return this.clone({param:e,value:s,op:"a"})}appendAll(e){let s=[];return Object.keys(e).forEach(n=>{let r=e[n];Array.isArray(r)?r.forEach(o=>{s.push({param:n,value:o,op:"a"})}):s.push({param:n,value:r,op:"a"})}),this.clone(s)}set(e,s){return this.clone({param:e,value:s,op:"s"})}delete(e,s){return this.clone({param:e,value:s,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let s=this.encoder.encodeKey(e);return this.map.get(e).map(n=>s+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let s=new t({encoder:this.encoder});return s.cloneFrom=this.cloneFrom||this,s.updates=(this.updates||[]).concat(e),s}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let s=(e.op==="a"?this.map.get(e.param):void 0)||[];s.push(X(e.value)),this.map.set(e.param,s);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],r=n.indexOf(X(e.value));r!==-1&&n.splice(r,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var ye=class{constructor(){this.map=new Map}set(e,s){return this.map.set(e,s),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function At(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function et(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function tt(t){return typeof Blob<"u"&&t instanceof Blob}function nt(t){return typeof FormData<"u"&&t instanceof FormData}function Nt(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var L=class t{constructor(e,s,n,r){this.url=s,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(At(this.method)||r?(this.body=n!==void 0?n:null,o=r):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new D,this.context??=new ye,!this.params)this.params=new b,this.urlWithParams=s;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=s;else{let a=s.indexOf("?"),l=a===-1?"?":a<s.length-1?"&":"";this.urlWithParams=s+l+i}}}serializeBody(){return this.body===null?null:et(this.body)||tt(this.body)||nt(this.body)||Nt(this.body)||typeof this.body=="string"?this.body:this.body instanceof b?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||nt(this.body)?null:tt(this.body)?this.body.type||null:et(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof b?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let s=e.method||this.method,n=e.url||this.url,r=e.responseType||this.responseType,o=e.body!==void 0?e.body:this.body,i=e.withCredentials!==void 0?e.withCredentials:this.withCredentials,a=e.reportProgress!==void 0?e.reportProgress:this.reportProgress,l=e.headers||this.headers,c=e.params||this.params,h=e.context??this.context;return e.setHeaders!==void 0&&(l=Object.keys(e.setHeaders).reduce((p,y)=>p.set(y,e.setHeaders[y]),l)),e.setParams&&(c=Object.keys(e.setParams).reduce((p,y)=>p.set(y,e.setParams[y]),c)),new t(s,n,o,{params:c,headers:l,context:h,reportProgress:a,responseType:r,withCredentials:i})}},I=function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t}(I||{}),j=class{constructor(e,s=W.Ok,n="OK"){this.headers=e.headers||new D,this.status=e.status!==void 0?e.status:s,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},me=class t extends j{constructor(e={}){super(e),this.type=I.ResponseHeader}clone(e={}){return new t({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},J=class t extends j{constructor(e={}){super(e),this.type=I.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new t({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},G=class extends j{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},W=function(t){return t[t.Continue=100]="Continue",t[t.SwitchingProtocols=101]="SwitchingProtocols",t[t.Processing=102]="Processing",t[t.EarlyHints=103]="EarlyHints",t[t.Ok=200]="Ok",t[t.Created=201]="Created",t[t.Accepted=202]="Accepted",t[t.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",t[t.NoContent=204]="NoContent",t[t.ResetContent=205]="ResetContent",t[t.PartialContent=206]="PartialContent",t[t.MultiStatus=207]="MultiStatus",t[t.AlreadyReported=208]="AlreadyReported",t[t.ImUsed=226]="ImUsed",t[t.MultipleChoices=300]="MultipleChoices",t[t.MovedPermanently=301]="MovedPermanently",t[t.Found=302]="Found",t[t.SeeOther=303]="SeeOther",t[t.NotModified=304]="NotModified",t[t.UseProxy=305]="UseProxy",t[t.Unused=306]="Unused",t[t.TemporaryRedirect=307]="TemporaryRedirect",t[t.PermanentRedirect=308]="PermanentRedirect",t[t.BadRequest=400]="BadRequest",t[t.Unauthorized=401]="Unauthorized",t[t.PaymentRequired=402]="PaymentRequired",t[t.Forbidden=403]="Forbidden",t[t.NotFound=404]="NotFound",t[t.MethodNotAllowed=405]="MethodNotAllowed",t[t.NotAcceptable=406]="NotAcceptable",t[t.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",t[t.RequestTimeout=408]="RequestTimeout",t[t.Conflict=409]="Conflict",t[t.Gone=410]="Gone",t[t.LengthRequired=411]="LengthRequired",t[t.PreconditionFailed=412]="PreconditionFailed",t[t.PayloadTooLarge=413]="PayloadTooLarge",t[t.UriTooLong=414]="UriTooLong",t[t.UnsupportedMediaType=415]="UnsupportedMediaType",t[t.RangeNotSatisfiable=416]="RangeNotSatisfiable",t[t.ExpectationFailed=417]="ExpectationFailed",t[t.ImATeapot=418]="ImATeapot",t[t.MisdirectedRequest=421]="MisdirectedRequest",t[t.UnprocessableEntity=422]="UnprocessableEntity",t[t.Locked=423]="Locked",t[t.FailedDependency=424]="FailedDependency",t[t.TooEarly=425]="TooEarly",t[t.UpgradeRequired=426]="UpgradeRequired",t[t.PreconditionRequired=428]="PreconditionRequired",t[t.TooManyRequests=429]="TooManyRequests",t[t.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",t[t.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",t[t.InternalServerError=500]="InternalServerError",t[t.NotImplemented=501]="NotImplemented",t[t.BadGateway=502]="BadGateway",t[t.ServiceUnavailable=503]="ServiceUnavailable",t[t.GatewayTimeout=504]="GatewayTimeout",t[t.HttpVersionNotSupported=505]="HttpVersionNotSupported",t[t.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",t[t.InsufficientStorage=507]="InsufficientStorage",t[t.LoopDetected=508]="LoopDetected",t[t.NotExtended=510]="NotExtended",t[t.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",t}(W||{});function fe(t,e){return{body:e,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,transferCache:t.transferCache}}var Pt=(()=>{let e=class e{constructor(n){this.handler=n}request(n,r,o={}){let i;if(n instanceof L)i=n;else{let c;o.headers instanceof D?c=o.headers:c=new D(o.headers);let h;o.params&&(o.params instanceof b?h=o.params:h=new b({fromObject:o.params})),i=new L(n,r,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:h,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let a=ee(i).pipe(ke(c=>this.handler.handle(c)));if(n instanceof L||o.observe==="events")return a;let l=a.pipe(Se(c=>c instanceof J));switch(o.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return l.pipe(S(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe(S(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe(S(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return l.pipe(S(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(n,r={}){return this.request("DELETE",n,r)}get(n,r={}){return this.request("GET",n,r)}head(n,r={}){return this.request("HEAD",n,r)}jsonp(n,r){return this.request("JSONP",n,{params:new b().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,r={}){return this.request("OPTIONS",n,r)}patch(n,r,o={}){return this.request("PATCH",n,fe(o,r))}post(n,r,o={}){return this.request("POST",n,fe(o,r))}put(n,r,o={}){return this.request("PUT",n,fe(o,r))}};e.\u0275fac=function(r){return new(r||e)(d(C))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})();function it(t,e){return e(t)}function Ot(t,e){return(s,n)=>e.intercept(s,{handle:r=>t(r,n)})}function It(t,e,s){return(n,r)=>_e(s,()=>e(n,o=>t(o,r)))}var St=new v(""),ge=new v(""),kt=new v(""),xt=new v("");function Lt(){let t=null;return(e,s)=>{t===null&&(t=(w(St,{optional:!0})??[]).reduceRight(Ot,it));let n=w(de),r=n.add();return t(e,s).pipe(te(()=>n.remove(r)))}}var rt=(()=>{let e=class e extends C{constructor(n,r){super(),this.backend=n,this.injector=r,this.chain=null,this.pendingTasks=w(de);let o=w(xt,{optional:!0});this.backend=o??n}handle(n){if(this.chain===null){let o=Array.from(new Set([...this.injector.get(ge),...this.injector.get(kt,[])]));this.chain=o.reduceRight((i,a)=>It(i,a,this.injector),it)}let r=this.pendingTasks.add();return this.chain(n,o=>this.backend.handle(o)).pipe(te(()=>this.pendingTasks.remove(r)))}};e.\u0275fac=function(r){return new(r||e)(d(q),d(Ue))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})();var Ct=/^\)\]\}',?\n/;function jt(t){return"responseURL"in t&&t.responseURL?t.responseURL:/^X-Request-URL:/m.test(t.getAllResponseHeaders())?t.getResponseHeader("X-Request-URL"):null}var st=(()=>{let e=class e{constructor(n){this.xhrFactory=n}handle(n){if(n.method==="JSONP")throw new T(-2800,!1);let r=this.xhrFactory;return(r.\u0275loadImpl?Ie(r.\u0275loadImpl()):ee(null)).pipe(xe(()=>new V(i=>{let a=r.build();if(a.open(n.method,n.urlWithParams),n.withCredentials&&(a.withCredentials=!0),n.headers.forEach((u,f)=>a.setRequestHeader(u,f.join(","))),n.headers.has("Accept")||a.setRequestHeader("Accept","application/json, text/plain, */*"),!n.headers.has("Content-Type")){let u=n.detectContentTypeHeader();u!==null&&a.setRequestHeader("Content-Type",u)}if(n.responseType){let u=n.responseType.toLowerCase();a.responseType=u!=="json"?u:"text"}let l=n.serializeBody(),c=null,h=()=>{if(c!==null)return c;let u=a.statusText||"OK",f=new D(a.getAllResponseHeaders()),A=jt(a)||n.url;return c=new me({headers:f,status:a.status,statusText:u,url:A}),c},p=()=>{let{headers:u,status:f,statusText:A,url:Pe}=h(),g=null;f!==W.NoContent&&(g=typeof a.response>"u"?a.responseText:a.response),f===0&&(f=g?W.Ok:0);let H=f>=200&&f<300;if(n.responseType==="json"&&typeof g=="string"){let mt=g;g=g.replace(Ct,"");try{g=g!==""?JSON.parse(g):null}catch(gt){g=mt,H&&(H=!1,g={error:gt,text:g})}}H?(i.next(new J({body:g,headers:u,status:f,statusText:A,url:Pe||void 0})),i.complete()):i.error(new G({error:g,headers:u,status:f,statusText:A,url:Pe||void 0}))},y=u=>{let{url:f}=h(),A=new G({error:u,status:a.status||0,statusText:a.statusText||"Unknown Error",url:f||void 0});i.error(A)},De=!1,Ae=u=>{De||(i.next(h()),De=!0);let f={type:I.DownloadProgress,loaded:u.loaded};u.lengthComputable&&(f.total=u.total),n.responseType==="text"&&a.responseText&&(f.partialText=a.responseText),i.next(f)},Ne=u=>{let f={type:I.UploadProgress,loaded:u.loaded};u.lengthComputable&&(f.total=u.total),i.next(f)};return a.addEventListener("load",p),a.addEventListener("error",y),a.addEventListener("timeout",y),a.addEventListener("abort",y),n.reportProgress&&(a.addEventListener("progress",Ae),l!==null&&a.upload&&a.upload.addEventListener("progress",Ne)),a.send(l),i.next({type:I.Sent}),()=>{a.removeEventListener("error",y),a.removeEventListener("abort",y),a.removeEventListener("load",p),a.removeEventListener("timeout",y),n.reportProgress&&(a.removeEventListener("progress",Ae),l!==null&&a.upload&&a.upload.removeEventListener("progress",Ne)),a.readyState!==a.DONE&&a.abort()}})))}};e.\u0275fac=function(r){return new(r||e)(d(K))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),at=new v(""),Ft="XSRF-TOKEN",Ut=new v("",{providedIn:"root",factory:()=>Ft}),_t="X-XSRF-TOKEN",Bt=new v("",{providedIn:"root",factory:()=>_t}),Z=class{},Vt=(()=>{let e=class e{constructor(n,r,o){this.doc=n,this.platform=r,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let n=this.doc.cookie||"";return n!==this.lastCookieString&&(this.parseCount++,this.lastToken=$(n,this.cookieName),this.lastCookieString=n),this.lastToken}};e.\u0275fac=function(r){return new(r||e)(d(E),d(R),d(Ut))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})();function zt(t,e){let s=t.url.toLowerCase();if(!w(at)||t.method==="GET"||t.method==="HEAD"||s.startsWith("http://")||s.startsWith("https://"))return e(t);let n=w(Z).getToken(),r=w(Bt);return n!=null&&!t.headers.has(r)&&(t=t.clone({headers:t.headers.set(r,n)})),e(t)}var ct=function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t}(ct||{});function $t(t,e){return{\u0275kind:t,\u0275providers:e}}function Kt(...t){let e=[Pt,st,rt,{provide:C,useExisting:rt},{provide:q,useExisting:st},{provide:ge,useValue:zt,multi:!0},{provide:at,useValue:!0},{provide:Z,useClass:Vt}];for(let s of t)e.push(...s.\u0275providers);return ie(e)}var ot=new v("");function Xt(){return $t(ct.LegacyInterceptors,[{provide:ot,useFactory:Lt},{provide:ge,useExisting:ot,multi:!0}])}var Ln=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=ne({type:e}),e.\u0275inj=re({providers:[Kt(Xt())]});let t=e;return t})();var Ee=class extends Ye{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Te=class t extends Ee{static makeCurrent(){Ze(new t)}onAndCancel(e,s,n){return e.addEventListener(s,n),()=>{e.removeEventListener(s,n)}}dispatchEvent(e,s){e.dispatchEvent(s)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,s){return s=s||this.getDefaultDocument(),s.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,s){return s==="window"?window:s==="document"?e:s==="body"?e.body:null}getBaseHref(e){let s=Jt();return s==null?null:Gt(s)}resetBaseElement(){F=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return $(document.cookie,e)}},F=null;function Jt(){return F=F||document.querySelector("base"),F?F.getAttribute("href"):null}function Gt(t){return new URL(t,document.baseURI).pathname}var Wt=(()=>{let e=class e{build(){return new XMLHttpRequest}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),be=new v(""),ht=(()=>{let e=class e{constructor(n,r){this._zone=r,this._eventNameToPlugin=new Map,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,r,o){return this._findPluginFor(r).addEventListener(n,r,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(i=>i.supports(n)),!r)throw new T(5101,!1);return this._eventNameToPlugin.set(n,r),r}};e.\u0275fac=function(r){return new(r||e)(d(be),d(O))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),Y=class{constructor(e){this._doc=e}},ve="ng-app-id",ft=(()=>{let e=class e{constructor(n,r,o,i={}){this.doc=n,this.appId=r,this.nonce=o,this.platformId=i,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=he(i),this.resetHostNodes()}addStyles(n){for(let r of n)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(n){for(let r of n)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let n=this.styleNodesInDOM;n&&(n.forEach(r=>r.remove()),n.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(n){this.hostNodes.add(n);for(let r of this.getAllStyles())this.addStyleToHost(n,r)}removeHost(n){this.hostNodes.delete(n)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(n){for(let r of this.hostNodes)this.addStyleToHost(r,n)}onStyleRemoved(n){let r=this.styleRef;r.get(n)?.elements?.forEach(o=>o.remove()),r.delete(n)}collectServerRenderedStyles(){let n=this.doc.head?.querySelectorAll(`style[${ve}="${this.appId}"]`);if(n?.length){let r=new Map;return n.forEach(o=>{o.textContent!=null&&r.set(o.textContent,o)}),r}return null}changeUsageCount(n,r){let o=this.styleRef;if(o.has(n)){let i=o.get(n);return i.usage+=r,i.usage}return o.set(n,{usage:r,elements:[]}),r}getStyleElement(n,r){let o=this.styleNodesInDOM,i=o?.get(r);if(i?.parentNode===n)return o.delete(r),i.removeAttribute(ve),i;{let a=this.doc.createElement("style");return this.nonce&&a.setAttribute("nonce",this.nonce),a.textContent=r,this.platformIsServer&&a.setAttribute(ve,this.appId),n.appendChild(a),a}}addStyleToHost(n,r){let o=this.getStyleElement(n,r),i=this.styleRef,a=i.get(r)?.elements;a?a.push(o):i.set(r,{elements:[o],usage:1})}resetHostNodes(){let n=this.hostNodes;n.clear(),n.add(this.doc.head)}};e.\u0275fac=function(r){return new(r||e)(d(E),d(se),d(oe,8),d(R))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),we={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},Me=/%COMP%/g,pt="%COMP%",Zt=`_nghost-${pt}`,Yt=`_ngcontent-${pt}`,Qt=!0,Ht=new v("",{providedIn:"root",factory:()=>Qt});function en(t){return Yt.replace(Me,t)}function tn(t){return Zt.replace(Me,t)}function yt(t,e){return e.map(s=>s.replace(Me,t))}var lt=(()=>{let e=class e{constructor(n,r,o,i,a,l,c,h=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=a,this.platformId=l,this.ngZone=c,this.nonce=h,this.rendererByCompId=new Map,this.platformIsServer=he(l),this.defaultRenderer=new U(n,a,c,this.platformIsServer)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===k.ShadowDom&&(r=Oe(B({},r),{encapsulation:k.Emulated}));let o=this.getOrCreateRenderer(n,r);return o instanceof Q?o.applyToHost(n):o instanceof _&&o.applyStyles(),o}getOrCreateRenderer(n,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let a=this.doc,l=this.ngZone,c=this.eventManager,h=this.sharedStylesHost,p=this.removeStylesOnCompDestroy,y=this.platformIsServer;switch(r.encapsulation){case k.Emulated:i=new Q(c,h,r,this.appId,p,a,l,y);break;case k.ShadowDom:return new Re(c,h,n,r,a,l,this.nonce,y);default:i=new _(c,h,r,p,a,l,y);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}};e.\u0275fac=function(r){return new(r||e)(d(ht),d(ft),d(se),d(Ht),d(E),d(R),d(O),d(oe))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),U=class{constructor(e,s,n,r){this.eventManager=e,this.doc=s,this.ngZone=n,this.platformIsServer=r,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,s){return s?this.doc.createElementNS(we[s]||s,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,s){(dt(e)?e.content:e).appendChild(s)}insertBefore(e,s,n){e&&(dt(e)?e.content:e).insertBefore(s,n)}removeChild(e,s){e&&e.removeChild(s)}selectRootElement(e,s){let n=typeof e=="string"?this.doc.querySelector(e):e;if(!n)throw new T(-5104,!1);return s||(n.textContent=""),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,s,n,r){if(r){s=r+":"+s;let o=we[r];o?e.setAttributeNS(o,s,n):e.setAttribute(s,n)}else e.setAttribute(s,n)}removeAttribute(e,s,n){if(n){let r=we[n];r?e.removeAttributeNS(r,s):e.removeAttribute(`${n}:${s}`)}else e.removeAttribute(s)}addClass(e,s){e.classList.add(s)}removeClass(e,s){e.classList.remove(s)}setStyle(e,s,n,r){r&(x.DashCase|x.Important)?e.style.setProperty(s,n,r&x.Important?"important":""):e.style[s]=n}removeStyle(e,s,n){n&x.DashCase?e.style.removeProperty(s):e.style[s]=""}setProperty(e,s,n){e!=null&&(e[s]=n)}setValue(e,s){e.nodeValue=s}listen(e,s,n){if(typeof e=="string"&&(e=ue().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${s}`);return this.eventManager.addEventListener(e,s,this.decoratePreventDefault(n))}decoratePreventDefault(e){return s=>{if(s==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(s)):e(s))===!1&&s.preventDefault()}}};function dt(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Re=class extends U{constructor(e,s,n,r,o,i,a,l){super(e,o,i,l),this.sharedStylesHost=s,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=yt(r.id,r.styles);for(let h of c){let p=document.createElement("style");a&&p.setAttribute("nonce",a),p.textContent=h,this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,s){return super.appendChild(this.nodeOrShadowRoot(e),s)}insertBefore(e,s,n){return super.insertBefore(this.nodeOrShadowRoot(e),s,n)}removeChild(e,s){return super.removeChild(this.nodeOrShadowRoot(e),s)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},_=class extends U{constructor(e,s,n,r,o,i,a,l){super(e,o,i,a),this.sharedStylesHost=s,this.removeStylesOnCompDestroy=r,this.styles=l?yt(l,n.styles):n.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Q=class extends _{constructor(e,s,n,r,o,i,a,l){let c=r+"-"+n.id;super(e,s,n,o,i,a,l,c),this.contentAttr=en(c),this.hostAttr=tn(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,s){let n=super.createElement(e,s);return super.setAttribute(n,this.contentAttr,""),n}},nn=(()=>{let e=class e extends Y{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,o){return n.addEventListener(r,o,!1),()=>this.removeEventListener(n,r,o)}removeEventListener(n,r,o){return n.removeEventListener(r,o)}};e.\u0275fac=function(r){return new(r||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})(),ut=["alt","control","meta","shift"],rn={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},sn={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},on=(()=>{let e=class e extends Y{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,o){let i=e.parseEventName(r),a=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ue().onAndCancel(n,i.domEventName,a))}static parseEventName(n){let r=n.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),a="",l=r.indexOf("code");if(l>-1&&(r.splice(l,1),a="code."),ut.forEach(h=>{let p=r.indexOf(h);p>-1&&(r.splice(p,1),a+=h+".")}),a+=i,r.length!=0||i.length===0)return null;let c={};return c.domEventName=o,c.fullKey=a,c}static matchEventFullKeyCode(n,r){let o=rn[n.key]||n.key,i="";return r.indexOf("code.")>-1&&(o=n.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),ut.forEach(a=>{if(a!==o){let l=sn[a];l(n)&&(i+=a+".")}}),i+=o,i===r)}static eventCallback(n,r,o){return i=>{e.matchEventFullKeyCode(i,n)&&o.runGuarded(()=>r(i))}}static _normalizeKey(n){return n==="esc"?"escape":n}};e.\u0275fac=function(r){return new(r||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})();function sr(t,e){return We(B({rootComponent:t},an(e)))}function an(t){return{appProviders:[...hn,...t?.providers??[]],platformProviders:un}}function cn(){Te.makeCurrent()}function ln(){return new ce}function dn(){return Ce(document),document}var un=[{provide:R,useValue:Qe},{provide:je,useValue:cn,multi:!0},{provide:E,useFactory:dn,deps:[]}];var hn=[{provide:Fe,useValue:"root"},{provide:ce,useFactory:ln,deps:[]},{provide:be,useClass:nn,multi:!0,deps:[E,O,R]},{provide:be,useClass:on,multi:!0,deps:[E]},lt,ft,ht,{provide:Je,useExisting:lt},{provide:K,useClass:Wt,deps:[]},[]];var or=(()=>{let e=class e{constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}};e.\u0275fac=function(r){return new(r||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var fn=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=m({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=d(pn),o},providedIn:"root"});let t=e;return t})(),pn=(()=>{let e=class e extends fn{constructor(n){super(),this._doc=n}sanitize(n,r){if(r==null)return null;switch(n){case M.NONE:return r;case M.HTML:return P(r,"HTML")?N(r):qe(this._doc,String(r)).toString();case M.STYLE:return P(r,"Style")?N(r):r;case M.SCRIPT:if(P(r,"Script"))return N(r);throw new T(5200,!1);case M.URL:return P(r,"URL")?N(r):Xe(String(r));case M.RESOURCE_URL:if(P(r,"ResourceURL"))return N(r);throw new T(5201,!1);default:throw new T(5202,!1)}}bypassSecurityTrustHtml(n){return Be(n)}bypassSecurityTrustStyle(n){return Ve(n)}bypassSecurityTrustScript(n){return ze(n)}bypassSecurityTrustUrl(n){return $e(n)}bypassSecurityTrustResourceUrl(n){return Ke(n)}};e.\u0275fac=function(r){return new(r||e)(d(E))},e.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();function yn(t){t||(ae(yn),t=w(z));let e=new V(s=>t.onDestroy(s.next.bind(s)));return s=>s.pipe(Le(e))}function mn(t,e){let s=!e?.manualCleanup;s&&!e?.injector&&ae(mn);let n=s?e?.injector?.get(z)??w(z):null,r;e?.requireSync?r=le({kind:0}):r=le({kind:1,value:e?.initialValue});let o=t.subscribe({next:i=>r.set({kind:1,value:i}),error:i=>{if(e?.rejectErrors)throw i;r.set({kind:2,error:i})}});return n?.onDestroy(o.unsubscribe.bind(o)),Ge(()=>{let i=r();switch(i.kind){case 1:return i.value;case 2:throw i.error;case 0:throw new T(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}export{Pt as a,Ln as b,lt as c,sr as d,or as e,fn as f,yn as g,mn as h};
