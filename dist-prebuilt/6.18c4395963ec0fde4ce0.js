(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[6],{96512:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var s=a(45697),i=a.n(s),n=(a(39714),a(67294)),r=a(44012),l=a(73727);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class d extends n.PureComponent{render(){return n.createElement("div",{id:"back_button",className:"signup-header"},n.createElement(l.Link,{onClick:this.props.onClick,to:this.props.url},n.createElement(r.Z,{id:"generic_icons.back",defaultMessage:"Back Icon"},(e=>n.createElement("span",{id:"back_button_icon",className:"fa fa-1x fa-angle-left",title:e.toString()}))),n.createElement(r.Z,{id:"web.header.back",defaultMessage:"Back"})))}}c(d,"propTypes",{url:i().string,onClick:i().func}),c(d,"defaultProps",{url:"/"})},33006:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>E});var s=a(14890),i=a(37703),n=a(87271),r=a(17214),l=a(45697),c=a.n(l),d=(a(88674),a(33948),a(60285),a(64765),a(67294)),m=a(44012),o=a(96512),u=a(20608);function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class p extends d.PureComponent{constructor(e){super(e),f(this,"handleResend",(async()=>{const e=new URLSearchParams(this.props.location.search).get("email");if(e){this.setState({resendStatus:"sending"});const{data:t,error:a}=await this.props.actions.sendVerificationEmail(e);t?this.setState({resendStatus:"success"}):a&&this.setState({resendStatus:"failure"})}})),this.state={resendStatus:"none"}}render(){let e="";return"success"===this.state.resendStatus&&(e=d.createElement("div",null,d.createElement("br",null),d.createElement("p",{"data-testid":"emailVerifySentMessage",className:"alert alert-success"},d.createElement(u.Z,null),d.createElement(m.Z,{id:"email_verify.sent",defaultMessage:" Verification email sent."})))),"failure"===this.state.resendStatus&&(e=d.createElement("div",null,d.createElement("br",null),d.createElement("p",{className:"alert alert-danger"},d.createElement(m.Z,{id:"generic_icons.fail",defaultMessage:"Faliure Icon"},(e=>d.createElement("i",{className:"fa fa-times",title:e}))),d.createElement(m.Z,{id:"email_verify.failed"})))),d.createElement("div",null,d.createElement(o.Z,null),d.createElement("div",{className:"col-sm-12"},d.createElement("div",{className:"signup-team__container"},d.createElement("h3",{"data-testid":"emailVerifyAlmost"},d.createElement(m.Z,{id:"email_verify.almost",defaultMessage:"{siteName}: You are almost done",values:{siteName:this.props.siteName}})),d.createElement("div",null,d.createElement("p",{"data-testid":"emailVerifyNotVerifiedBody"},d.createElement(m.Z,{id:"email_verify.notVerifiedBody",defaultMessage:"Please verify your email address. Check your inbox for an email."})),d.createElement("button",{"data-testid":"emailVerifyResend",onClick:this.handleResend,className:"btn btn-primary"},d.createElement(m.Z,{id:"email_verify.resend",defaultMessage:"Resend Email"})),e))))}}f(p,"propTypes",{location:c().shape({search:c().string.isRequired}).isRequired,siteName:c().string,actions:c().shape({sendVerificationEmail:c().func.isRequired}).isRequired});const E=(0,i.connect)((e=>{const{SiteName:t}=(0,n.iE)(e);return{siteName:t}}),(e=>({actions:(0,s.bindActionCreators)({sendVerificationEmail:r.zk},e)})))(p)}}]);
//# sourceMappingURL=6.18c4395963ec0fde4ce0.js.map