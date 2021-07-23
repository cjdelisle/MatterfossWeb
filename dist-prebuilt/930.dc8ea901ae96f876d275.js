(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[930],{37979:(e,t,r)=>{"use strict";r.d(t,{x:()=>a,h:()=>i}),r(88674);var s=r(17214);function a(e,t,r){return a=>n(a(s.x4(e,t,r)))}function i(e,t,r){return a=>n(a(s.h8(e,t,r)))}async function n(e){let t=await e;return t.error&&"api.context.mfa_required.app_error"===t.error.server_error_id&&(t={data:!0}),t}},96512:(e,t,r)=>{"use strict";r.d(t,{Z:()=>c});var s=r(45697),a=r.n(s),i=(r(39714),r(67294)),n=r(44012),o=r(73727);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class c extends i.PureComponent{render(){return i.createElement("div",{id:"back_button",className:"signup-header"},i.createElement(o.Link,{onClick:this.props.onClick,to:this.props.url},i.createElement(n.Z,{id:"generic_icons.back",defaultMessage:"Back Icon"},(e=>i.createElement("span",{id:"back_button_icon",className:"fa fa-1x fa-angle-left",title:e.toString()}))),i.createElement(n.Z,{id:"web.header.back",defaultMessage:"Back"})))}}l(c,"propTypes",{url:a().string,onClick:a().func}),l(c,"defaultProps",{url:"/"})},37635:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var s=r(45697),a=r.n(s),i=r(67294),n=r(44012);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class l extends i.PureComponent{render(){const{customDescriptionText:e,siteName:t}=this.props;let r=null;return r=e||i.createElement(n.Z,{id:"web.root.signup_info",defaultMessage:"All team communication in one place, searchable and accessible anywhere"}),i.createElement(i.Fragment,null,i.createElement("h1",{id:"site_name"},t),i.createElement("h4",{id:"site_description",className:"color--light"},r))}}o(l,"propTypes",{customDescriptionText:a().string,siteName:a().string}),o(l,"defaultProps",{siteName:"MatterFOSS"})},97930:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>C});var s=r(37703),a=r(14890),i=r(17214),n=r(87271),o=r(97254),l=r(99206),c=r(37979),m=r(74935),u=(r(88674),r(33948),r(60285),r(64765),r(73210),r(45697)),d=r.n(u),p=r(67294),h=r(44012),g=r(73727),E=r(17310),f=r(59925),v=r(34288),_=r(89262),b=r(78274),N=r(16406),S=r(96512),w=r(19476),k=r(37635),y=r(45288);function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class L extends p.PureComponent{constructor(e){super(e),R(this,"emailRef",void 0),R(this,"nameRef",void 0),R(this,"passwordRef",void 0),R(this,"setDocumentTitle",(e=>{e&&(document.title=e)})),R(this,"getTokenData",((e,t)=>{const r=JSON.parse(t);return{loading:!1,token:e,email:r.email,teamName:r.name}})),R(this,"getInviteInfo",(async e=>{const t=await this.props.actions.getTeamInviteInfo(e);"data"in t?this.setState({loading:!1,noOpenServerError:!1,serverError:"",teamName:t.data.name}):"error"in t&&this.setState({loading:!1,noOpenServerError:!0,serverError:p.createElement(h.Z,{id:"signup_user_completed.invalid_invite",defaultMessage:"The invite link was invalid.  Please speak with your Administrator to receive an invitation."})})})),R(this,"handleSignupSuccess",((e,t)=>{(0,f.L9)("signup","signup_user_02_complete");const r=new URLSearchParams(this.props.location.search).get("redirect_to");this.props.actions.loginById(t.id,e.password,"").then((t=>{if("error"in t)if("api.user.login.not_verified.app_error"===t.error.server_error_id){let t="/should_verify_email?email="+encodeURIComponent(e.email);this.state.teamName&&(t+="&teamname="+encodeURIComponent(this.state.teamName)),r&&(t+="&redirect_to="+r),_.m.push(t)}else this.setState({serverError:t.error.message,isSubmitting:!1});else this.state.token&&this.state.token.length>0&&this.props.actions.setGlobalItem(this.state.token,JSON.stringify({usedBefore:!0})),r?_.m.push(r):v.mc()}))})),R(this,"isUserValid",(()=>{var e,t,r;const s=null===(e=this.emailRef.current)||void 0===e?void 0:e.value.trim();if(!s)return this.setState({nameError:"",emailError:p.createElement(h.Z,{id:"signup_user_completed.required"}),passwordError:"",serverError:""}),!1;if(!(0,E.Jh)(s))return this.setState({nameError:"",emailError:p.createElement(h.Z,{id:"signup_user_completed.validEmail"}),passwordError:"",serverError:""}),!1;const a=null===(t=this.nameRef.current)||void 0===t?void 0:t.value.trim().toLowerCase();if(!a)return this.setState({nameError:p.createElement(h.Z,{id:"signup_user_completed.required"}),emailError:"",passwordError:"",serverError:""}),!1;const i=m.rh(a);if(i){let e;return e=i.id===b.qf.RESERVED_NAME?{nameError:p.createElement(h.Z,{id:"signup_user_completed.reserved"}),emailError:"",passwordError:"",serverError:""}:{nameError:p.createElement(h.Z,{id:"signup_user_completed.usernameLength",values:{min:b.ZP.MIN_USERNAME_LENGTH,max:b.ZP.MAX_USERNAME_LENGTH}}),emailError:"",passwordError:"",serverError:""},this.setState(e),!1}const n=null===(r=this.passwordRef.current)||void 0===r?void 0:r.value,{valid:o,error:l}=m.eW(n,this.props.passwordConfig);return!(!o&&l&&(this.setState({nameError:"",emailError:"",passwordError:l,serverError:""}),1))})),R(this,"handleSubmit",(e=>{if(e.preventDefault(),(0,f.L9)("signup_email","click_create_account"),!this.state.isSubmitting&&this.isUserValid()){var t,r,s;this.setState({nameError:"",emailError:"",passwordError:"",serverError:"",isSubmitting:!0});const e={email:null===(t=this.emailRef.current)||void 0===t?void 0:t.value.trim(),username:null===(r=this.nameRef.current)||void 0===r?void 0:r.value.trim().toLowerCase(),password:null===(s=this.passwordRef.current)||void 0===s?void 0:s.value,allow_marketing:!0},a=new URLSearchParams(this.props.location.search).get("redirect_to");this.props.actions.createUser(e,this.state.token,this.state.inviteId,a).then((t=>{"error"in t?this.setState({serverError:t.error.message,isSubmitting:!1}):this.handleSignupSuccess(e,t.data)}))}})),R(this,"renderEmailSignup",(()=>{let e=null,t=p.createElement("span",{id:"valid_email",className:"help-block"},p.createElement(h.Z,{id:"signup_user_completed.emailHelp",defaultMessage:"Valid email required for sign-up"})),r="form-group";this.state.emailError&&(e=p.createElement("label",{className:"control-label"},this.state.emailError),t="",r+=" has-error");let s=null,a=p.createElement("span",{id:"valid_name",className:"help-block"},p.createElement(h.Z,{id:"signup_user_completed.userHelp",defaultMessage:"You can use lowercase letters, numbers, periods, dashes, and underscores."})),i="form-group";this.state.nameError&&(s=p.createElement("label",{className:"control-label"},this.state.nameError),a="",i+=" has-error");let n=null,o="form-group";this.state.passwordError&&(n=p.createElement("label",{className:"control-label"},this.state.passwordError),o+=" has-error");let l=null;this.state.email&&(l=p.createElement(y.Z,{id:"signup_user_completed.emailIs",defaultMessage:"Your email address is **{email}**. You'll use this address to sign in to {siteName}.",values:{email:this.state.email,siteName:this.props.siteName}}));let c="mt-8";return this.state.email&&(c="hidden"),p.createElement("form",null,p.createElement("div",{className:"inner__content"},p.createElement("div",{className:c},p.createElement("h5",{id:"email_label"},p.createElement("strong",null,p.createElement(h.Z,{id:"signup_user_completed.whatis",defaultMessage:"What's your email address?"}))),p.createElement("div",{className:r},p.createElement("input",{id:"email",type:"email",ref:this.emailRef,className:"form-control",defaultValue:this.state.email,placeholder:"",maxLength:128,autoFocus:!0,spellCheck:"false",autoCapitalize:"off"}),e,t)),l,p.createElement("div",{className:"mt-8"},p.createElement("h5",{id:"name_label"},p.createElement("strong",null,p.createElement(h.Z,{id:"signup_user_completed.chooseUser",defaultMessage:"Choose your username"}))),p.createElement("div",{className:i},p.createElement("input",{id:"name",type:"text",ref:this.nameRef,className:"form-control",placeholder:"",maxLength:b.ZP.MAX_USERNAME_LENGTH,spellCheck:"false",autoCapitalize:"off"}),s,a)),p.createElement("div",{className:"mt-8"},p.createElement("h5",{id:"password_label"},p.createElement("strong",null,p.createElement(h.Z,{id:"signup_user_completed.choosePwd",defaultMessage:"Choose your password"}))),p.createElement("div",{className:o},p.createElement("input",{id:"password",type:"password",ref:this.passwordRef,className:"form-control",placeholder:"",maxLength:128,spellCheck:"false"}),n)),p.createElement("p",{className:"mt-5"},p.createElement("button",{id:"createAccountButton",type:"submit",onClick:this.handleSubmit,className:"btn-primary btn",disabled:this.state.isSubmitting},p.createElement(h.Z,{id:"signup_user_completed.create",defaultMessage:"Create Account"})))))}));const t=new URLSearchParams(this.props.location.search).get("d"),r=new URLSearchParams(this.props.location.search).get("t"),s=new URLSearchParams(this.props.location.search).get("id");this.state={loading:!1},r&&r.length>0?this.state=this.getTokenData(r,t):s&&s.length>0&&(this.state={loading:!0,inviteId:s}),this.emailRef=p.createRef(),this.nameRef=p.createRef(),this.passwordRef=p.createRef()}componentDidMount(){(0,f.L9)("signup","signup_user_01_welcome"),this.setDocumentTitle(this.props.siteName);const{inviteId:e}=this.state;e&&e.length>0&&this.getInviteInfo(e),this.props.hasAccounts||document.body.classList.remove("sticky")}componentDidUpdate(){this.setDocumentTitle(this.props.siteName)}render(){const{customDescriptionText:e,enableSignUpWithEmail:t,location:r,privacyPolicyLink:s,siteName:a,termsOfServiceLink:i,hasAccounts:n}=this.props;let o,l=null;if(this.state.serverError&&(l=p.createElement("div",{id:"existingEmailErrorContainer",className:"form-group has-error"},p.createElement("label",{className:"control-label"},this.state.serverError))),this.state.loading)return p.createElement(w.Z,null);if(!t)return null;o=this.renderEmailSignup();let c=null;return!this.state.noOpenServerError&&o&&(c=p.createElement("p",{id:"signup_agreement"},p.createElement(y.Z,{id:"create_team.agreement",defaultMessage:"Welcome to your new MatterFOSS server, you can specify your own message here by changing signup_email.jsx.",values:{siteName:a,TermsOfServiceLink:"!".concat(i),PrivacyPolicyLink:"!".concat(s)}}))),this.state.noOpenServerError&&(o=null),p.createElement("div",null,n&&p.createElement(S.Z,{onClick:()=>(0,f.L9)("signup_email","click_back")}),p.createElement("div",{id:"signup_email_section",className:"col-sm-12"},p.createElement("div",{className:"signup-team__container padding--less"},p.createElement("img",{alt:"signup team logo",className:"signup-team-logo",src:N.Z}),p.createElement(k.Z,{customDescriptionText:e,siteName:a}),p.createElement("h4",{id:"create_account",className:"color--light"},p.createElement(h.Z,{id:"signup_user_completed.lets",defaultMessage:"Let's create your account"})),p.createElement("span",{id:"signin_account",className:"color--light"},p.createElement(h.Z,{id:"signup_user_completed.haveAccount",defaultMessage:"Already have an account?"})," ",p.createElement(g.Link,{id:"signin_account_link",to:"/login"+r.search,onClick:()=>(0,f.L9)("signup_email","click_signin_account")},p.createElement(h.Z,{id:"signup_user_completed.signIn",defaultMessage:"Click here to sign in."}))),o,l,c)))}}R(L,"propTypes",{location:d().object,enableSignUpWithEmail:d().bool.isRequired,siteName:d().string,termsOfServiceLink:d().string,privacyPolicyLink:d().string,customDescriptionText:d().string,passwordConfig:d().object,hasAccounts:d().bool.isRequired,actions:d().shape({createUser:d().func.isRequired,loginById:d().func.isRequired,setGlobalItem:d().func.isRequired,getTeamInviteInfo:d().func.isRequired}).isRequired});const C=(0,s.connect)((function(e){const t=(0,n.iE)(e),r="true"===t.EnableSignUpWithEmail,s=t.SiteName||"",a=t.TermsOfServiceLink,i=t.PrivacyPolicyLink,o=t.CustomDescriptionText,l="false"===t.NoAccounts;return{enableSignUpWithEmail:r,siteName:s,termsOfServiceLink:a,privacyPolicyLink:i,customDescriptionText:o,passwordConfig:(0,m.lD)(t),hasAccounts:l}}),(function(e){return{actions:(0,a.bindActionCreators)({createUser:i.r4,loginById:c.h,setGlobalItem:l.Bc,getTeamInviteInfo:o.sS},e)}}))(L)},16406:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});const s=r.p+"files/a0a7d819869d6545c06500f0d8179b41.png"}}]);
//# sourceMappingURL=930.dc8ea901ae96f876d275.js.map