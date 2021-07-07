/*! For license information please see main.js.LICENSE.txt */
(self.webpackChunkreact_reversi=self.webpackChunkreact_reversi||[]).push([[179],{125:(e,t,n)=>{"use strict";n(370);var r=n(683),a=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var s=Symbol.for;a=s("react.element"),t.Fragment=s("react.fragment")}var o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,s={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!l.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===s[r]&&(s[r]=t[r]);return{$$typeof:a,type:e,key:c,ref:u,props:s,_owner:o.current}}t.jsx=c,t.jsxs=c},638:(e,t,n)=>{"use strict";e.exports=n(125)},538:(e,t,n)=>{"use strict";var r=n(791),a=n(686),s=n(620),o=n(655),i=n(20),l=n(683);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d,f={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0},p=l.createContext();function h(){return f}var y=function(){function e(){(0,s.Z)(this,e),this.usedNamespaces={}}return(0,o.Z)(e,[{key:"addUsedNamespaces",value:function(e){var t=this;e.forEach((function(e){t.usedNamespaces[e]||(t.usedNamespaces[e]=!0)}))}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),e}();function m(){return d}var v={type:"3rdParty",init:function(e){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f=u(u({},f),e)}(e.options.react),function(e){d=e}(e)}};r.Z.use(a.Z).use(v).init({debug:!1,fallbackLng:!1,resources:{"zh-TW":{translation:{Reversi:"黑白棋","Play with friend":"跟朋友同樂",Restart:"重新","Play Again?":"再來一局？",Score:"記分板",Hint:"顯示提示","Allow Retract":"允許悔棋","AI Version":"AI 版本"}}}});var g=n(302),x=n(126);const b=x.v9,j=()=>(0,x.I0)();var w=n(796);const N="REBOOT",S="RESET",k="SWITCH_PLAYER",C="USER_PLACE_CHESS",O="W",E="B",I="WC",P="BC",R="IDLE",Y="ENDED",_=(0,w.PH)(N),A=(0,w.PH)(S),Z=((0,w.PH)(k),(0,w.PH)(C,((e,t)=>({payload:{row:e,col:t}}))));var M=n(232),D=n(175);const B=(0,D.WAo)(((e,t)=>(0,D.u4g)(((n,r)=>(0,D.yGi)(e[r]||r,t[r],n)),{},(0,D.XPQ)(t)))),F=e=>e.game.board,H=(0,D.zGw)(D.xHg,(0,D.vMG)(D.yRu),(0,D.eiS)([O,E]),(0,D.UID)(D.kE),B({[O]:"white",[E]:"black"})),L=()=>(0,M.P1)([F],H),T=(0,M.P1)([e=>e.game.player],(e=>!!e));var V=n(996);const z=(0,V.vV)((0,D.DZ1)((()=>(0,D.DZ1)((0,D.Bxt)(null),8)),8)),U=(0,w.oM)({name:"game",initialState:{state:R,candidate:0,switchCount:0,version:"v3Overview",ai:null,player:null,board:z,pastStep:[],allowRetractStep:0,log:[],message:""},reducers:{setBoard(e,{payload:t}){e.board=t},resetBoard(e){Object.assign(e,{board:z,pastStep:[]})},setPlayer(e,{payload:t}){e.player=t},setAi(e,{payload:t}){e.ai=t},setCandidate(e,{payload:t}){e.candidate=t},setMessage(e,{payload:t}){e.message=t},setState(e,{payload:t}){e.state=t},setRetractStep(e,{payload:t}){e.allowRetractStep=t},setVersion(e,{payload:t}){e.version=t},addSwitch(e){e.switchCount+=1},resetSwitch(e){e.switchCount=0},pushLog(e,{payload:t}){e.log.push(t)},clearLog(e){e.log=[]},saveStep(e){e.pastStep.push({board:e.board,player:e.player,candidate:e.candidate,log:e.log,message:e.message}),e.pastStep.length>e.allowRetractStep&&e.pastStep.splice(1)},restoreStep(e){Object.assign(e,{...e.pastStep[0],pastStep:e.pastStep.slice(1)})}}}),G=U.actions,W=(0,w.oM)({name:"ui",initialState:{overlay:"",history:{win:0,lose:0,draw:0}},reducers:{incrementHistory:(e,{payload:t})=>{e.history[t]+=1},setOverlay(e,{payload:t}){e.overlay=t}}}),$=W.actions;var q=n(8),X=n(36),K=n(656);const J=(0,n(695).UY)({game:U.reducer,ui:W.reducer});var Q=n(480),ee=n(900),te=function(e){return{done:!0,value:e}},ne={};function re(e){return(0,Q.CE)(e)?"channel":(0,Q.eR)(e)?String(e):(0,Q.Yl)(e)?e.name:String(e)}function ae(e,t,n){var r,a,s,o=t;function i(t,n){if(o===ne)return te(t);if(n&&!a)throw o=ne,n;r&&r(t);var i=n?e[a](n):e[o]();return o=i.nextState,s=i.effect,r=i.stateUpdater,a=i.errorState,o===ne?te(t):s}return(0,ee.q)(i,(function(e){return i(null,e)}),n)}function se(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var s,o={done:!1,value:(0,ee.K)(e)},i=function(e){return{done:!1,value:ee.L.apply(void 0,[t].concat(r,[e]))}},l=function(e){return s=e};return ae({q1:function(){return{nextState:"q2",effect:o,stateUpdater:l}},q2:function(){return{nextState:"q1",effect:i(s)}}},"q1","takeEvery("+re(e)+", "+t.name+")")}function oe(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return ee.L.apply(void 0,[se,e,t].concat(r))}var ie=n(215);const le=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[1,-1],[-1,1]];function ce(e,t){return e<8&&e>=0&&t<8&&t>=0}function ue(e){return e===O?E:O}function de(e){return e===P||e===I}function fe(e){return!e||de(e)}function pe(e){return e===O?I:P}function he(e){return e===O?"white":"black"}function ye({board:e,player:t,row:n,col:r,rd:a,cd:s}){let o=0,i=!1;if(!ce(n,r)||!fe(e[n][r]))return 0;let l=n+a,c=r+s;for(;ce(l,c);){if(fe(e[l][c])||e[l][c]===t){i=e[l][c]===t;break}o+=1,l+=a,c+=s}return i&&o>0?o:0}function me({board:e,player:t,row:n,col:r,rd:a,cd:s}){if(!ye({board:e,player:t,row:n,col:r,rd:a,cd:s}))return!1;let o=n+a,i=r+s;for(;ce(o,i)&&!fe(e[o][i])&&e[o][i]!==t;)e[o][i]=t,o+=a,i+=s;return!0}function ve({board:e,row:t,col:n,player:r}){return(0,V.ZP)(e,(e=>{for(let a=0;a<8;a+=1){const[s,o]=le[a];me({board:e,player:r,row:t,col:n,rd:s,cd:o})}e[t][n]=r}))}function ge(e){return(0,V.ZP)(e,(e=>{for(let t=0;t<8;t+=1)for(let n=0;n<8;n+=1)de(e[t][n])&&(e[t][n]=null)}))}function xe({board:e,player:t}){const n=pe(t);let r=0;const a=(0,V.ZP)(e,(e=>{for(let a=0;a<8;a+=1)for(let s=0;s<8;s+=1)if(!e[a][s])for(let o=0;o<8;o+=1){const[i,l]=le[o];if(ye({board:e,player:t,row:a,col:s,rd:i,cd:l})){e[a][s]=n,r+=1;break}}}));return{count:r,board:a}}function be(e,t){let n=0;for(let r=0;r<e.length;r++){const a=e[r];for(let e=0;e<a.length;e++)a[e]===t&&(n+=1)}return n}function je(e,t,n,r){const a=le.map((([a,s])=>ye({board:e,player:t,row:n,col:r,rd:a,cd:s})));let s=0;return 0===n&&0===r||7===n&&7===r?s=200:(0!==n&&7!==n||1!==r&&6!==r)&&(1!==n&&6!==n||0!==r&&7!==r)?0===n||0===r||7===n||7===r?s=80:1===n||1===r||6===n||6===r?s=-20:2!==n&&2!==r&&5!==n&&5!==r||(s=20):s=-80,2*(0,D.Smz)(a)+s}function we(e,t,n,r){const a=le.map((([a,s])=>ye({board:e,player:t,row:n,col:r,rd:a,cd:s}))),s=function(e,t,n){const r=function(e,t,n){return le.reduce(((r,[a,s])=>r+Number(!!function(e,t,n){return ce(t,n)?!fe(e[t][n])&&e[t][n]:null}(e,t+a,n+s))),0)}(e,t,n),a=0===t||7===t,s=0===n||7===n;return Oe(t,n)?1e8:a&&(1===n||6===n)||(1===t||6===t)&&s?r>0?-300:15e3:Ee(t,n)?1500+100*r:1===t||1===n||6===t||6===n?-200:2===t||2===n||5===t||5===n?50:0}(e,n,r),o=function(e,t,n,r,a){const s=le.map((([a,s])=>ye({board:e,player:ue(t),row:n-a,col:r-s,rd:a,cd:s}))),o=(0,D.u4g)(D.Fp7,0,s);return o>0?a>0?2*o+20*a:50*-a+5*o:-1e4}((0,V.ZP)(e,(e=>{e[n][r]=t})),t,n,r,s);return 2*(0,D.Smz)(a)+(o?s:2*Math.abs(s))-o}function Ne(e,t,n,r){return we(e,t,n,r)+Se(ve({board:e,row:n,col:r,player:t}),t)}function Se(e,t){let n=0;const r=ue(t);let a=0,s=0;for(let o=0;o<e.length;o++){const i=e[o];for(let e=0;e<i.length;e++)Oe(o,e)?i[e]===t?(n+=1e8,a+=1):i[e]===r&&(n+=-4e8,s+=1):Ee(o,e)?i[e]===t?(n+=1e3,a+=1):i[e]===r&&(n+=-2e3,s+=1):i[e]===t?(n+=1,a+=1):i[e]===r&&(n+=-2,s+=1)}return 0===a?Number.MIN_SAFE_INTEGER:0===s?Number.MAX_SAFE_INTEGER:n}function ke(e){return function(t,n,r,a){const s=ue(n),o=pe(s),{board:i}=xe({board:ge(ve({board:t,row:r,col:a,player:n})),player:s});if(0===be(i,s)||0===be(i,o))return Number.MAX_SAFE_INTEGER;const l=[];for(let t=0;t<i.length;t++){const n=i[t];for(let r=0;r<n.length;r++)n[r]===o&&l.push(e(i,s,t,r))}return 0===l.length?Number.MIN_SAFE_INTEGER:-(0,D.u4g)(D.Fp7,Number.MIN_SAFE_INTEGER,l)}}const Ce={v1:je,v2:we,v3:ke(we),v3Overview:ke(Ne),v2Overview:Ne,v1MinMax:ke(je),v1Overview:ke((function(e,t,n,r){return je(e,t,n,r)+Se(ve({board:e,row:n,col:r,player:t}),t)}))};function Oe(e,t){return!(0!==e&&7!==e||0!==t&&7!==t)}function Ee(e,t){return 0===e||0===t||7===e||7===t}const Ie=(0,V.vV)([(0,D.DZ1)((0,D.Bxt)(null),8),(0,D.DZ1)((0,D.Bxt)(null),8),(0,D.DZ1)((0,D.Bxt)(null),8),[null,null,null,E,O,null,null,null],[null,null,null,O,E,null,null,null],(0,D.DZ1)((0,D.Bxt)(null),8),(0,D.DZ1)((0,D.Bxt)(null),8),(0,D.DZ1)((0,D.Bxt)(null),8)]);function*Pe(){yield(0,ee.Y)(G.setState(R)),yield(0,ee.Y)($.setOverlay("")),yield(0,ee.Y)(G.setMessage("")),yield(0,ee.Y)(G.clearLog()),yield(0,ee.Y)(G.resetBoard()),yield(0,ee.Y)(G.setAi(null)),yield(0,ee.Y)(G.setPlayer(null)),yield(0,ee.Y)(G.resetSwitch())}function*Re({payload:e}){yield(0,ee.N)(Pe),yield(0,ee.Y)(G.setAi(e)),yield(0,ee.Y)(G.setPlayer(E)),yield(0,ee.Y)(G.setBoard(Ie)),yield(0,ee.N)(Ze),yield(0,ee.Y)(G.setState("PLAYING")),e===E&&(yield(0,ee.N)(Me),yield(0,ee.N)(_e))}const Ye=L();function*_e(){const{game:{ai:e,switchCount:t,player:n}}=yield(0,ee.a3)(),r=yield(0,ee.a3)(Ye);if(t>2){if(yield(0,ee.Y)(G.setMessage("Game set")),yield(0,ee.Y)(G.setState(Y)),r.black===r.white)return yield(0,ee.Y)($.setOverlay("Draw")),void(e&&(yield(0,ee.Y)($.incrementHistory("draw"))));const t=r.black>r.white?E:O;return void(e?e===t?(yield(0,ee.Y)($.setOverlay("You Lose")),yield(0,ee.Y)($.incrementHistory("lose"))):(yield(0,ee.Y)($.setOverlay("You Win")),yield(0,ee.Y)($.incrementHistory("win"))):yield(0,ee.Y)($.setOverlay((a=he(t),`${(0,D.YMb)(a).toUpperCase()}${(0,D.GbB)(a)} Win`))))}var a;yield(0,ee.N)(Ae);const s=ue(n);yield(0,ee.Y)(G.setPlayer(s)),yield(0,ee.N)(Ze),(yield(0,ee.a3)((e=>e.game.candidate)))?(0===t&&(yield(0,ee.Y)(G.setMessage(""))),yield(0,ee.Y)(G.resetSwitch()),s===e&&(yield(0,ee.N)(Me),yield(0,ee.N)(_e))):(yield(0,ee.Y)(G.setMessage(`No move, turn to ${he(n)}`)),yield(0,ee.Y)(G.addSwitch()),yield(0,ee.N)(_e))}function*Ae(){const e=ge(yield(0,ee.a3)((e=>e.game.board)));yield(0,ee.Y)(G.setBoard(e))}function*Ze(){const{game:{player:e,board:t}}=yield(0,ee.a3)(),{board:n,count:r}=xe({board:t,player:e});yield(0,ee.Y)(G.setBoard(n)),yield(0,ee.Y)(G.setCandidate(r))}function*Me(){const{game:{board:e,player:t,ai:n,version:r}}=yield(0,ee.a3)(),a=[],s=Ce[r];(0,ie.Z)(s,"version invalid");const o=pe(t);for(let t=0;t<8;t+=1)for(let r=0;r<8;r+=1)if(e[t][r]===o){const o=s(e,n,t,r);a.push({row:t,col:r,score:o})}(0,ie.Z)(a.length,"Invalid State: no candidates point");const i=(0,D.u4g)(D.Fp7,Number.MIN_SAFE_INTEGER,(0,D.UID)((0,D.vgT)("score"),a)),{row:l,col:c}=(u=(0,D.hXT)((0,D.OH4)("score",i),a))[Math.trunc(Math.random()*u.length)];var u;yield(0,ee.U)(300),yield(0,ee.Y)(G.pushLog({player:t,pos:`(${l}, ${c})`}));const d=ve({board:e,row:l,col:c,player:t});yield(0,ee.Y)(G.setBoard(d))}function*De({payload:{col:e,row:t}}){const{game:{player:n,board:r}}=yield(0,ee.a3)();if(!function(e,t,n,r){const a=pe(t);return ce(n,r)&&e[n][r]===a}(r,n,t,e))return;yield(0,ee.Y)(G.saveStep()),yield(0,ee.Y)(G.pushLog({player:n,pos:`(${t}, ${e})`}));const a=ve({board:r,row:t,col:e,player:n});yield(0,ee.Y)(G.setBoard(a)),yield(0,ee.N)(_e)}const{store:Be,persistor:Fe,runSaga:He,close:Le}=(()=>{const e=(0,K.ZP)(),t=(0,w.xC)({reducer:(0,q.OJ)({key:"reversi",storage:X.Z,whitelist:["history"]},J),middleware:(0,w.Bx)({thunk:!1,serializableCheck:{ignoredActions:[q._P,q.I2,q.E7,q.ex,q.e,q.Nz]}}).concat(e)}),n=(0,q.p5)(t);return{store:t,persistor:n,runSaga:e.run,close(){t.dispatch(K.uR)}}})();He((function*(){yield(0,ee._)([oe(N,Pe),oe(S,Re),oe(C,De),oe(k,_e)])}));var Te=n(603);function Ve(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ze(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Ve(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ve(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ue(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"==typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var Ge={};function We(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"==typeof t[0]&&Ge[t[0]]||("string"==typeof t[0]&&(Ge[t[0]]=new Date),Ue.apply(void 0,t))}function $e(e,t,n){e.loadNamespaces(t,(function(){e.isInitialized?n():e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}))}function qe(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return We("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],a=!!t.options&&t.options.fallbackLng,s=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var o=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!o(t.isLanguageChangingTo,e)||!t.hasResourceBundle(r,e)&&t.services.backendConnector.backend&&(!o(r,e)||a&&!o(s,e)))}function Xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ke(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Xe(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Xe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Je(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=(0,l.useContext)(p)||{},a=r.i18n,s=r.defaultNS,o=n||a||m();if(o&&!o.reportNamespaces&&(o.reportNamespaces=new y),!o){We("You will need to pass in an i18next instance by using initReactI18next");var i=function(e){return Array.isArray(e)?e[e.length-1]:e},c=[i,{},!1];return c.t=i,c.i18n={},c.ready=!1,c}o.options.react&&void 0!==o.options.react.wait&&We("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var u=Ke(Ke(Ke({},h()),o.options.react),t),d=u.useSuspense,f=e||s||o.options&&o.options.defaultNS;f="string"==typeof f?[f]:f||["translation"],o.reportNamespaces.addUsedNamespaces&&o.reportNamespaces.addUsedNamespaces(f);var v=(o.isInitialized||o.initializedStoreOnce)&&f.every((function(e){return qe(e,o,u)}));function g(){return o.getFixedT(null,"fallback"===u.nsMode?f:f[0])}var x=(0,l.useState)(g),b=ze(x,2),j=b[0],w=b[1],N=(0,l.useRef)(!0);(0,l.useEffect)((function(){var e=u.bindI18n,t=u.bindI18nStore;function n(){N.current&&w(g)}return N.current=!0,v||d||$e(o,f,(function(){N.current&&w(g)})),e&&o&&o.on(e,n),t&&o&&o.store.on(t,n),function(){N.current=!1,e&&o&&e.split(" ").forEach((function(e){return o.off(e,n)})),t&&o&&t.split(" ").forEach((function(e){return o.store.off(e,n)}))}}),[o,f.join()]);var S=(0,l.useRef)(!0);(0,l.useEffect)((function(){N.current&&!S.current&&w(g),S.current=!1}),[o]);var k=[j,o,v];if(k.t=j,k.i18n=o,k.ready=v,v)return k;if(!v&&!d)return k;throw new Promise((function(e){$e(o,f,(function(){e()}))}))}var Qe=n(638);function et(){return(0,Qe.jsx)("rect",{fill:"green",width:"640",height:"640","data-testid":"background"})}function tt({col:e}){return(0,Qe.jsx)("line",{stroke:"black",strokeWidth:"1px",x1:80*e,x2:80*e,y1:"0",y2:"640","data-testid":"column"})}function nt({row:e}){return(0,Qe.jsx)("line",{stroke:"black",strokeWidth:"1px",y1:80*e,y2:80*e,x1:"0",x2:"640","data-testid":"row"})}function rt(){return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,D.DZ1)((e=>(0,Qe.jsx)(nt,{row:e},e)),9),(0,D.DZ1)((e=>(0,Qe.jsx)(tt,{col:e},e)),9)]})}function at(){return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,Qe.jsx)(et,{}),(0,Qe.jsx)(rt,{})]})}const st=(0,l.memo)(at);var ot=n(491);const it=(0,ot.Z)("circle",{target:"e1uz12sv0"})({name:"je8g23",styles:"pointer-events:none"}),lt=function({color:e,row:t,col:n,isCandidate:r,showHint:a,onClick:s}){const o=(0,l.useCallback)((()=>{s(t,n)}),[t,n,s]);return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,Qe.jsx)("rect",{onClick:o,width:"80",height:"80",fillOpacity:"0",x:80*n,y:80*t}),(0,Qe.jsx)(it,{fill:e,fillOpacity:r?a?"0.3":"0":"1",cx:80*n+40,cy:80*t+40,r:30})]})},ct=(0,ot.Z)("text",{target:"ewhnoa10"})({name:"11k2whj",styles:"font-size:2.5em;pointer-events:none"});function ut({x:e,y:t,color:n,children:r,background:a,onClick:s,value:o}){return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,Qe.jsx)("circle",{fill:a,cx:e,cy:t,r:80,onClick:()=>s(o)}),(0,Qe.jsx)(ct,{fill:n,textAnchor:"middle",x:e,y:t+10,children:r})]})}function dt({onClick:e}){return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,Qe.jsx)(ut,{color:"white",background:"black",x:160,y:300,value:O,onClick:e,children:"Black"}),(0,Qe.jsx)(ut,{color:"black",background:"white",x:480,y:300,value:E,onClick:e,children:"White"})]})}const ft=(0,ot.Z)("text",{target:"eaz4nck0"})({name:"1x8ic45",styles:"fill:red;font-size:8em;pointer-events:none;text-anchor:middle"});function pt({reset:e,placeChess:t,board:n,hint:r,showChooseColor:a,overlay:s}){return(0,Qe.jsxs)("svg",{height:"640px",width:"640px",children:[(0,Qe.jsx)(st,{}),n.flatMap(((e,n)=>e.map(((e,a)=>e?(0,Qe.jsx)(lt,{row:n,col:a,showHint:r,color:e===O||e===I?"white":"black",isCandidate:e===I||e===P,onClick:t},8*n+a):null)))),a||(0,Qe.jsx)(dt,{onClick:e}),!!s&&(0,Qe.jsx)(ft,{x:"50%",y:"50%",children:s})]})}function ht({hint:e}){const t=b((e=>e.game.board)),n=b(T),r=b((e=>e.ui.overlay)),a=j(),s=(0,l.useCallback)(((e,t)=>{r&&a($.setOverlay("")),n&&a(Z(e,t))}),[a,r,n]);return(0,Qe.jsx)(pt,{board:t,showChooseColor:n,hint:e,overlay:r,reset:e=>a(A(e)),placeChess:s})}var yt=n(622);const mt=function({target:e,children:t}){const n=(0,l.useRef)(null);return n.current||(n.current=document.getElementById(e)),(0,g.createPortal)(t,n.current)};function vt({open:e,children:t,onConfirm:n,onCancel:r}){return(0,Qe.jsx)(mt,{target:"dialog-root",children:(0,Qe.jsxs)("div",{className:(0,yt.Z)("modal",{"is-active":e}),children:[(0,Qe.jsx)("div",{className:"modal-background"}),(0,Qe.jsx)("div",{className:"modal-content",children:(0,Qe.jsxs)("div",{className:"box",children:[(0,Qe.jsx)("p",{className:"title is-2",children:t}),(0,Qe.jsxs)("div",{className:"field is-grouped",children:[(0,Qe.jsx)("p",{className:"control",children:(0,Qe.jsx)("button",{className:"button is-primary",onClick:n,children:"Yes"})}),(0,Qe.jsx)("p",{className:"control",children:(0,Qe.jsx)("button",{className:"button",onClick:r,children:"No"})})]})]})}),(0,Qe.jsx)("button",{className:"modal-close",onClick:r})]})})}const gt=(0,ot.Z)("div",{target:"e895ipb0"})({name:"1c1h94e",styles:"height:600px;overflow:auto;padding:0 10px"}),xt=({log:e})=>(0,Qe.jsxs)("div",{className:"card",children:[(0,Qe.jsx)("div",{className:"card-header",children:(0,Qe.jsx)("div",{className:"card-header-title",children:(0,Qe.jsx)("p",{className:"title is-6",children:"Log"})})}),(0,Qe.jsx)("div",{className:"card-content",children:(0,Qe.jsx)(gt,{children:e.map((({player:e,pos:t},n)=>(0,Qe.jsxs)("div",{className:"is-flex",children:[(0,Qe.jsx)("span",{className:"icon",children:(0,Qe.jsx)("i",{className:(0,yt.Z)(e===O?"far":"fas","fa-circle")})}),(0,Qe.jsx)("span",{children:t})]},n)))})})]});function bt(){const e=b((e=>e.game.log));return(0,Qe.jsx)(xt,{log:e})}function jt(e,t){return e===t?"ai":"player"}function wt({score:e,ai:t,history:n}){const{t:r}=Je();return(0,Qe.jsxs)("div",{className:"card",children:[(0,Qe.jsx)("div",{className:"card-header",children:(0,Qe.jsx)("p",{className:"card-header-title",children:r("Score")})}),(0,Qe.jsxs)("div",{className:"card-content",children:[(0,Qe.jsxs)("div",{children:["black(",jt(E,t),"): ",e.black]}),(0,Qe.jsxs)("div",{children:["white(",jt(O,t),"): ",e.white]}),(0,Qe.jsx)("hr",{}),(0,Qe.jsxs)("div",{children:["win: ",n.win]}),(0,Qe.jsxs)("div",{children:["lose: ",n.lose]}),(0,Qe.jsxs)("div",{children:["draw: ",n.draw]}),(0,Qe.jsx)("hr",{}),(0,Qe.jsx)("p",{className:"is-size-6 has-text-grey",children:"v1.9.0"})]})]})}const Nt=L();function St(){const e=b(Nt),t=b((e=>e.game.ai)),n=b((e=>e.ui.history));return(0,Qe.jsx)(wt,{score:e,ai:t,history:n})}const kt=[["v1","V1"],["v2","V2"],["v3","V3 (V2 + min-max)"],["v3Overview","V4 (V2 + min-max + overview)"],["v2Overview","V2 + overview"],["v1MinMax","V1 + min-max"],["v1Overview","V1 + min-max + overview"]];function Ct({isOpen:e,onClose:t,onHintChange:n,onRetractChange:r,onVersionChange:a}){const{t:s}=Je();return(0,Qe.jsx)(mt,{target:"dialog-root",children:(0,Qe.jsxs)("div",{className:(0,yt.Z)("modal",{"is-active":e}),children:[(0,Qe.jsx)("div",{className:"modal-background"}),(0,Qe.jsx)("div",{className:"modal-content",children:(0,Qe.jsxs)("div",{className:"box",children:[(0,Qe.jsx)("div",{className:"field",children:(0,Qe.jsx)("p",{className:"control",children:(0,Qe.jsxs)("label",{className:"checkbox",htmlFor:"hint",children:[(0,Qe.jsx)("input",{type:"checkbox",name:"hint",onChange:n}),s("Hint")]})})}),(0,Qe.jsx)("div",{className:"field",children:(0,Qe.jsx)("p",{className:"control",children:(0,Qe.jsxs)("label",{className:"checkbox",htmlFor:"retract",children:[(0,Qe.jsx)("input",{type:"checkbox",name:"retract",onChange:r}),s("Allow Retract")]})})}),(0,Qe.jsx)("div",{className:"field",children:(0,Qe.jsxs)("div",{className:"control",children:[(0,Qe.jsx)("label",{className:"label",htmlFor:"version",children:s("AI Version")}),(0,Qe.jsx)("div",{className:"select",children:(0,Qe.jsx)("select",{name:"version",defaultValue:"v3Overview",onChange:a,children:kt.map((([e,t])=>(0,Qe.jsx)("option",{value:e,children:t})))})})]})}),(0,Qe.jsx)("div",{className:"field",children:(0,Qe.jsx)("p",{className:"control",children:(0,Qe.jsx)("button",{className:"button is-primary",onClick:t,children:"OK"})})})]})}),(0,Qe.jsx)("button",{className:"modal-close",onClick:t})]})})}function Ot({setHuman:e,reboot:t,allowRetract:n,restoreStep:r,onOpenSetting:a}){const{t:s}=Je();return(0,Qe.jsxs)("nav",{className:"navbar",children:[(0,Qe.jsx)("div",{className:"navbar-brand",children:(0,Qe.jsx)("div",{className:"navbar-item",children:(0,Qe.jsx)("p",{className:"title is-3",children:s("Reversi")})})}),(0,Qe.jsx)("div",{className:"navbar-item navbar-end",children:(0,Qe.jsx)("div",{className:"field is-grouped",children:(0,Qe.jsxs)("p",{className:"control",children:[(0,Qe.jsxs)("button",{className:"button is-rounded",onClick:e,children:[(0,Qe.jsx)("span",{className:"icon",children:(0,Qe.jsx)("i",{className:"fas fa-user-friends"})}),(0,Qe.jsx)("span",{children:s("Play with friend")})]}),(0,Qe.jsxs)("button",{className:"button is-rounded",onClick:t,children:[(0,Qe.jsx)("span",{className:"icon",children:(0,Qe.jsx)("i",{className:"fas fa-power-off"})}),(0,Qe.jsx)("span",{children:s("Restart")})]}),(0,Qe.jsx)("button",{className:"button is-rounded",disabled:!n,onClick:r,children:(0,Qe.jsx)("span",{className:"icon",children:(0,Qe.jsx)("i",{className:"fas fa-undo"})})}),(0,Qe.jsx)("button",{className:"button is-rounded",onClick:a,children:(0,Qe.jsx)("span",{className:"icon",children:(0,Qe.jsx)("i",{className:"fas fa-cog"})})})]})})})]})}function Et(e){const t=b((e=>!!(e.game.allowRetractStep&&e.game.pastStep.length>0))),n=j();return(0,Qe.jsx)(Ot,{allowRetract:t,reboot:()=>n(_()),setHuman:()=>n(A(null)),restoreStep:()=>n(G.restoreStep()),...e})}function It({showReplay:e,message:t,reboot:n,setVersion:r,setAllowRetract:a,resetState:s}){const[o,i]=(0,l.useState)(!1),[c,u]=(0,l.useState)(!1),d=(0,l.useCallback)((()=>u(!0)),[]),f=(0,l.useCallback)((()=>u(!1)),[]),{t:p}=Je();return(0,Qe.jsxs)(Qe.Fragment,{children:[(0,Qe.jsxs)("div",{className:"container is-fluid",children:[(0,Qe.jsxs)("div",{className:"columns",children:[(0,Qe.jsxs)("div",{className:"column is-6 is-offset-2",children:[(0,Qe.jsx)(Et,{onOpenSetting:d}),(0,Qe.jsxs)("div",{className:"columns",children:[(0,Qe.jsxs)("div",{className:"column",children:[(0,Qe.jsx)(ht,{hint:o}),(0,Qe.jsx)("span",{className:"is-pulled-right",children:t})]}),(0,Qe.jsx)("div",{className:"column",children:(0,Qe.jsx)(St,{})})]})]}),(0,Qe.jsx)("div",{className:"column is-2 is-hidden-touch",children:(0,Qe.jsx)(bt,{})})]}),(0,Qe.jsx)(vt,{open:e,onConfirm:n,onCancel:s,children:p("Play Again?")}),(0,Qe.jsx)(Ct,{isOpen:c,onClose:f,onHintChange:e=>i(e.target.checked),onRetractChange:e=>a(e.target.checked),onVersionChange:e=>r(e.target.value)})]}),(0,Qe.jsx)(Te.Z,{href:"https://github.com/DanSnow/react-reversi"})]})}function Pt(){const e=b((e=>e.game.message)),t=b((e=>e.game.ai)),n=b((e=>e.game.state===Y&&!e.ui.overlay)),r=j(),a=(0,l.useCallback)((e=>{r(e?G.setRetractStep(3):G.setRetractStep(0))}),[r,t]);return(0,Qe.jsx)(It,{message:e,showReplay:n,setVersion:e=>r(G.setVersion(e)),resetState:()=>r(G.setState(R)),reboot:()=>r(_()),setAllowRetract:a})}function Rt(e){const[t,n]=(0,l.useState)(!1),{persistor:r}=e;return(0,l.useEffect)((()=>{const e=()=>{const{bootstrapped:e}=r.getState();e&&n(!0),t()},t=r.subscribe(e);return e(),t}),[r]),"function"==typeof e.children?e.children(t):t?e.children:e.loading??null}function Yt(){return(0,Qe.jsx)(x.zt,{store:Be,children:(0,Qe.jsx)(Rt,{persistor:Fe,children:(0,Qe.jsx)(Pt,{})})})}g.render((0,Qe.jsx)(Yt,{}),document.getElementById("root"))},992:(e,t,n)=>{"use strict";t.__esModule=!0,t.default=function(e){var t=(0,a.default)(e);return{getItem:function(e){return new Promise((function(n,r){n(t.getItem(e))}))},setItem:function(e,n){return new Promise((function(r,a){r(t.setItem(e,n))}))},removeItem:function(e){return new Promise((function(n,r){n(t.removeItem(e))}))}}};var r,a=(r=n(731))&&r.__esModule?r:{default:r}},731:(e,t)=>{"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(){}t.__esModule=!0,t.default=function(e){var t="".concat(e,"Storage");return function(e){if("object"!==("undefined"==typeof self?"undefined":n(self))||!(e in self))return!1;try{var t=self[e],r="redux-persist ".concat(e," test");t.setItem(r,"test"),t.getItem(r),t.removeItem(r)}catch(e){return!1}return!0}(t)?self[t]:a};var a={getItem:r,setItem:r,removeItem:r}},36:(e,t,n)=>{"use strict";var r;t.Z=void 0;var a=(0,((r=n(992))&&r.__esModule?r:{default:r}).default)("local");t.Z=a}},e=>{"use strict";e(e.s=538)}]);