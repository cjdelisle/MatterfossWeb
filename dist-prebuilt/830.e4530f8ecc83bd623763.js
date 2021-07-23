(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[830],{63470:(e,t,r)=>{"use strict";r.d(t,{QI:()=>s,sk:()=>o,lg:()=>i});var a=r(17214),n=r(27457);function s(e){return(t,r)=>{const s=(0,n.rc)(r());return t(a.zP(s,!0,e))}}function o(){return(e,t)=>{const r=(0,n.rc)(t());return e(a.zP(r,!1))}}function i(){return(e,t)=>{const r=(0,n.rc)(t());return e(a.lg(r))}}},96512:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var a=r(45697),n=r.n(a),s=(r(39714),r(67294)),o=r(44012),i=r(73727);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class l extends s.PureComponent{render(){return s.createElement("div",{id:"back_button",className:"signup-header"},s.createElement(i.Link,{onClick:this.props.onClick,to:this.props.url},s.createElement(o.Z,{id:"generic_icons.back",defaultMessage:"Back Icon"},(e=>s.createElement("span",{id:"back_button_icon",className:"fa fa-1x fa-angle-left",title:e.toString()}))),s.createElement(o.Z,{id:"web.header.back",defaultMessage:"Back"})))}}c(l,"propTypes",{url:n().string,onClick:n().func}),c(l,"defaultProps",{url:"/"})},99830:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>q});var a=r(37703),n=r(87271),s=(r(33948),r(4723),r(19601),r(45697)),o=r.n(s),i=r(67294),c=r(44012),l=r(5977),u=r(34288),m=r(16406),d=r(96512),p=r(73406),f=r(14890),h=r(27457),g=r(63470),E=(r(15306),r(74935)),b=r(82251),v=r(45288),y=r(927);function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class N extends i.PureComponent{constructor(e){super(e),M(this,"input",void 0),M(this,"submit",(e=>{var t,r;e.preventDefault();const a=null===(t=this.input)||void 0===t||null===(r=t.current)||void 0===r?void 0:r.value.replace(/\s/g,"");a&&0!==a.length?(this.setState({error:null}),this.props.actions.activateMfa(a).then((({error:e})=>{e?"ent.mfa.activate.authenticate.app_error"===e.server_error_id?this.setState({error:E._u("mfa.setup.badCode","Invalid code. If this issue persists, contact your System Administrator.")}):this.setState({error:e.message}):this.props.history.push("/mfa/confirm")}))):this.setState({error:E._u("mfa.setup.codeError","Please enter the code from Google Authenticator.")})})),this.state={secret:"",qrCode:""},this.input=i.createRef()}componentDidMount(){const e=this.props.currentUser;e&&!e.mfa_active?this.props.actions.generateMfaSecret().then((({data:e,error:t})=>{t?this.setState({serverError:t.message}):this.setState({secret:e.secret,qrCode:e.qr_code})})):this.props.history.push("/")}render(){let e,t,r="form-group";return this.state.error&&(e=i.createElement("div",{className:"form-group has-error"},i.createElement("label",{className:"control-label"},this.state.error)),r+=" has-error"),this.props.enforceMultifactorAuthentication&&(t=i.createElement("p",null,i.createElement(v.Z,{id:"mfa.setup.required",defaultMessage:"**Multi-factor authentication is required on {siteName}.**",values:{siteName:this.props.siteName}}))),i.createElement("div",null,i.createElement("form",{onSubmit:this.submit,className:r},t,i.createElement("p",null,i.createElement(v.Z,{id:"mfa.setup.step1",defaultMessage:"**Step 1: **On your phone, download Google Authenticator from [iTunes](!https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8') or [Google Play](!https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en)"})),i.createElement("p",null,i.createElement(v.Z,{id:"mfa.setup.step2",defaultMessage:"**Step 2: **Use Google Authenticator to scan this QR code, or manually type in the secret key"})),i.createElement("div",{className:"form-group"},i.createElement("div",{className:"col-sm-12"},i.createElement("img",{alt:"qr code image",style:k.qrCode,src:"data:image/png;base64,"+this.state.qrCode}))),i.createElement("br",null),i.createElement("div",{className:"form-group"},i.createElement("p",{className:"col-sm-12"},i.createElement(c.Z,{id:"mfa.setup.secret",defaultMessage:"Secret: {secret}",values:{secret:this.state.secret}}))),i.createElement("p",null,i.createElement(v.Z,{id:"mfa.setup.step3",defaultMessage:"**Step 3: **Enter the code generated by Google Authenticator"})),i.createElement("p",null,i.createElement(y.Z,{ref:this.input,className:"form-control",placeholder:{id:(0,b.t)("mfa.setup.code"),defaultMessage:"MFA Code"},autoFocus:!0})),e,i.createElement("button",{type:"submit",className:"btn btn-primary"},i.createElement(c.Z,{id:"mfa.setup.save",defaultMessage:"Save"}))))}}M(N,"propTypes",{siteName:o().string,enforceMultifactorAuthentication:o().bool.isRequired,actions:o().shape({activateMfa:o().func.isRequired,generateMfaSecret:o().func.isRequired}).isRequired,history:o().shape({}).isRequired});const k={qrCode:{maxHeight:170}},A=(0,a.connect)((function(e){const t=(0,n.iE)(e),r=t.SiteName,a="true"===t.EnforceMultifactorAuthentication;return{currentUser:(0,h.ts)(e),siteName:r,enforceMultifactorAuthentication:a}}),(function(e){return{actions:(0,f.bindActionCreators)({activateMfa:g.QI,generateMfaSecret:g.lg},e)}}))(N);function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const Z=r(78274).ZP.KeyCodes;class C extends i.PureComponent{constructor(...e){super(...e),P(this,"submit",(e=>{e.preventDefault(),(0,u.mc)()})),P(this,"onKeyPress",(e=>{(0,E.pD)(e,Z.ENTER)&&this.submit(e)}))}componentDidMount(){document.body.addEventListener("keydown",this.onKeyPress)}componentWillUnmount(){document.body.removeEventListener("keydown",this.onKeyPress)}render(){return i.createElement("div",null,i.createElement("form",{onSubmit:this.submit,onKeyPress:this.onKeyPress,className:"form-group"},i.createElement("p",null,i.createElement(v.Z,{id:"mfa.confirm.complete",defaultMessage:"**Set up complete!**"})),i.createElement("p",null,i.createElement(c.Z,{id:"mfa.confirm.secure",defaultMessage:"Your account is now secure. Next time you sign in, you will be asked to enter a code from the Google Authenticator app on your phone."})),i.createElement("button",{type:"submit",className:"btn btn-primary"},i.createElement(c.Z,{id:"mfa.confirm.okay",defaultMessage:"Okay"}))))}}class S extends i.PureComponent{constructor(...e){var t,r;super(...e),r=e=>{e.preventDefault(),(0,u.gc)("/login")},(t="handleOnClick")in this?Object.defineProperty(this,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[t]=r}componentDidMount(){document.body.classList.add("sticky"),document.getElementById("root").classList.add("container-fluid"),this.props.enableMultifactorAuthentication||this.props.history.push("/")}componentWillUnmount(){document.body.classList.remove("sticky"),document.getElementById("root").classList.remove("container-fluid")}render(){let e;return e=this.props.mfa&&this.props.enforceMultifactorAuthentication?i.createElement("div",{className:"signup-header"},i.createElement("button",{className:"style--none color--link",onClick:this.handleOnClick},i.createElement(p.Z,null),i.createElement(c.Z,{id:"web.header.logout",defaultMessage:"Logout"}))):i.createElement(d.Z,null),i.createElement("div",{className:"inner-wrap"},i.createElement("div",{className:"row content"},i.createElement("div",null,e,i.createElement("div",{className:"col-sm-12"},i.createElement("div",{className:"signup-team__container"},i.createElement("h3",null,i.createElement(c.Z,{id:"mfa.setupTitle",defaultMessage:"Multi-factor Authentication Setup"})),i.createElement("img",{alt:"signup team logo",className:"signup-team-logo",src:m.Z}),i.createElement("div",{id:"mfa"},i.createElement(l.rs,null,i.createElement(l.AW,{path:"".concat(this.props.match.url,"/setup"),render:e=>i.createElement(A,Object.assign({state:this.state,updateParent:this.updateParent},e))}),i.createElement(l.AW,{path:"".concat(this.props.match.url,"/confirm"),render:e=>i.createElement(C,Object.assign({state:this.state,updateParent:this.updateParent},e))}))))))))}}S.propTypes={location:o().object.isRequired,children:o().node,mfa:o().bool.isRequired,enableMultifactorAuthentication:o().bool.isRequired,enforceMultifactorAuthentication:o().bool.isRequired,match:o().shape({url:o().string.isRequired}).isRequired};const q=(0,a.connect)((function(e){const t=(0,n.lJ)(e),r=(0,n.iE)(e);return{mfa:"true"===t.MFA,enableMultifactorAuthentication:"true"===r.EnableMultifactorAuthentication,enforceMultifactorAuthentication:"true"===r.EnforceMultifactorAuthentication}}))(S)},73406:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var a=r(67294),n=r(86896);function s(){const{formatMessage:e}=(0,n.Z)();return a.createElement("i",{className:"fa fa-1x fa-angle-left",title:e({id:"generic_icons.logout",defaultMessage:"Logout Icon"})})}},16406:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});const a=r.p+"files/a0a7d819869d6545c06500f0d8179b41.png"}}]);
//# sourceMappingURL=830.e4530f8ecc83bd623763.js.map