(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[865],{48865:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>D}),n(4723);var o=n(37703),r=n(14890),i=n(88329),s=n(6977),a=n(87271),c=n(27457),u=n(89262),d=n(59930),p=n(74935),l=n(45697),m=n.n(l),h=n(67294),f=n(5977),w=n(81249),b=n.n(w),v=n(33256),g=n(34288),L=n(90767),y=n(47470),O=n(19476),U=n(58367),k=n(5666),E=n(58194),T=n(91384);function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const S=k.Z.dispatch,R=k.Z.getState;class z extends h.PureComponent{constructor(e){super(e),j(this,"onDesktopMessageListener",(({origin:e,data:{type:t,message:n={}}={}}={})=>{if(this.props.currentUser&&e===window.location.origin)switch(t){case"register-desktop":{const{version:e}=n;window.desktop||(window.desktop={}),window.desktop.version=b().valid(b().coerce(e));break}case"user-activity-update":{const{userIsActive:e,manual:t}=n;!0!==e&&!1!==e||E.Z.userUpdateActiveStatus(e,t);break}case"notification-clicked":{const{channel:e,teamId:t}=n;window.focus(),this.props.actions.getChannelURLAction(e,t);break}}})),j(this,"handleBackSpace",(e=>{8!==e.which||["input","textarea"].includes(e.target.tagName.toLowerCase())||e.preventDefault()})),j(this,"handleBeforeUnload",(()=>{window.removeEventListener("beforeunload",this.handleBeforeUnload),document.cookie.indexOf("MMUSERID=")>-1&&(0,v.SU)("",this.props.currentChannelId||"")(S,R),L.xv()}));const t=document.getElementById("root");t&&(t.className+=" channel-view")}isValidState(){return null!=this.props.currentUser}componentDidMount(){if(L.j2(),this.props.enableTimezone&&this.props.actions.autoUpdateTimezone((0,U.x_)()),window.addEventListener("beforeunload",this.handleBeforeUnload),window.addEventListener("focus",this.onFocusListener),window.addEventListener("blur",this.onBlurListener),document.hasFocus()||g.UF(!1),window.addEventListener("message",this.onDesktopMessageListener),window.postMessage({type:"webapp-ready"},window.location.origin),y.s()?document.body.classList.add("ios"):y.Dt()&&document.body.classList.add("android"),!this.props.currentUser){const e=document.getElementById("root");e&&e.setAttribute("class",""),g.gc("/login?redirect_to="+encodeURIComponent(this.props.location.pathname),!0,!1)}window.addEventListener("keydown",this.handleBackSpace),this.isValidState()&&T.Z.signalLogin()}componentWillUnmount(){L.xv(),window.removeEventListener("keydown",this.handleBackSpace),window.removeEventListener("focus",this.onFocusListener),window.removeEventListener("blur",this.onBlurListener),window.removeEventListener("message",this.onDesktopMessageListener)}render(){if(!this.isValidState())return h.createElement(O.Z,null);if(this.props.mfaRequired){if("/mfa/setup"!==this.props.location.pathname)return h.createElement(f.l_,{to:"/mfa/setup"})}else if("/mfa/confirm"===this.props.location.pathname);else if(this.props.showTermsOfService&&"/terms_of_service"!==this.props.location.pathname)return h.createElement(f.l_,{to:"/terms_of_service?redirect_to="+encodeURIComponent(this.props.location.pathname)});return this.props.children}onFocusListener(){g.UF(!0)}onBlurListener(){g.UF(!1)}}j(z,"propTypes",{currentUser:m().object,currentChannelId:m().string,children:m().object,mfaRequired:m().bool.isRequired,enableTimezone:m().bool.isRequired,actions:m().shape({autoUpdateTimezone:m().func.isRequired,getChannelURLAction:m().func.isRequired}).isRequired,showTermsOfService:m().bool.isRequired});const C=(e,t)=>(n,o)=>u.m.push((0,p.qr)(o(),e,t)),D=(0,o.connect)((function(e,t){const n=(0,a.lJ)(e),o=(0,a.iE)(e),r=(0,c.YE)(e);return{currentUser:(0,c.ts)(e),currentChannelId:(0,s.gO)(e),mfaRequired:(0,d.b2)((0,c.ts)(e),n,o,t.match.url),enableTimezone:"true"===o.ExperimentalTimezone,showTermsOfService:r}}),(function(e){return{actions:(0,r.bindActionCreators)({autoUpdateTimezone:i.g,getChannelURLAction:C},e)}}))(z)},88329:(e,t,n)=>{"use strict";n.d(t,{g:()=>u}),n(88674);var o=n(27457),r=n(83175),i=n(17214);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){return async(t,n)=>{const s=(0,o.ts)(n()),c=(0,r.S)(n(),s.id),u=c.automaticTimezone!==e;if(c.useAutomaticTimezone&&u){const o={useAutomaticTimezone:"true",automaticTimezone:e,manualTimezone:c.manualTimezone},r=a(a({},s),{},{timezone:o});(0,i.DO)(r)(t,n)}}}}}]);
//# sourceMappingURL=865.6e8d6a2149ba80d24bda.js.map