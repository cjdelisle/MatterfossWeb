(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[594],{96512:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var s=a(45697),r=a.n(s),n=(a(39714),a(67294)),i=a(44012),l=a(73727);function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class c extends n.PureComponent{render(){return n.createElement("div",{id:"back_button",className:"signup-header"},n.createElement(l.Link,{onClick:this.props.onClick,to:this.props.url},n.createElement(i.Z,{id:"generic_icons.back",defaultMessage:"Back Icon"},(e=>n.createElement("span",{id:"back_button_icon",className:"fa fa-1x fa-angle-left",title:e.toString()}))),n.createElement(i.Z,{id:"web.header.back",defaultMessage:"Back"})))}}m(c,"propTypes",{url:r().string,onClick:r().func}),m(c,"defaultProps",{url:"/"})},37635:(e,t,a)=>{"use strict";a.d(t,{Z:()=>m});var s=a(45697),r=a.n(s),n=a(67294),i=a(44012);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class m extends n.PureComponent{render(){const{customDescriptionText:e,siteName:t}=this.props;let a=null;return a=e||n.createElement(i.Z,{id:"web.root.signup_info",defaultMessage:"All team communication in one place, searchable and accessible anywhere"}),n.createElement(n.Fragment,null,n.createElement("h1",{id:"site_name"},t),n.createElement("h4",{id:"site_description",className:"color--light"},a))}}l(m,"propTypes",{customDescriptionText:r().string,siteName:r().string}),l(m,"defaultProps",{siteName:"MatterFOSS"})},11594:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>C});var s=a(37703),r=a(87271),n=a(6977),i=a(26721),l=a(45697),m=a.n(l),c=(a(4723),a(19601),a(67294)),u=a(5977),o=a(47130),d=a(96512),p=(a(73210),a(44012)),h=a(59925),E=a(78274),g=a(12266),_=a(16406),f=a(86040);function N(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class b extends c.PureComponent{constructor(e){var t;super(e),N(this,"submitNext",(e=>{e.preventDefault(),(0,h.L9)("display_name","click_next");const t=this.state.teamDisplayName.trim();if(!t)return void this.setState({nameError:c.createElement(p.Z,{id:"create_team.display_name.required",defaultMessage:"This field is required"})});if(t.length<E.ZP.MIN_TEAMNAME_LENGTH||t.length>E.ZP.MAX_TEAMNAME_LENGTH)return void this.setState({nameError:c.createElement(p.Z,{id:"create_team.display_name.charLength",defaultMessage:"Name must be {min} or more characters up to a maximum of {max}. You can add a longer team description later.",values:{min:E.ZP.MIN_TEAMNAME_LENGTH,max:E.ZP.MAX_TEAMNAME_LENGTH}})});const a=this.props.state;a.wizard="team_url",a.team.display_name=t,a.team.name=(0,g.oK)(t),this.props.updateParent(a)})),N(this,"handleFocus",(e=>{e.preventDefault(),e.currentTarget.select()})),N(this,"handleDisplayNameChange",(e=>{this.setState({teamDisplayName:e.target.value})})),this.state={teamDisplayName:(null===(t=this.props.state.team)||void 0===t?void 0:t.display_name)||""}}componentDidMount(){(0,h.L9)("signup","signup_team_01_name")}render(){let e=null,t="form-group";return this.state.nameError&&(e=c.createElement("label",{className:"control-label"},this.state.nameError),t+=" has-error"),c.createElement("div",null,c.createElement("form",null,c.createElement("img",{alt:"signup logo",className:"signup-team-logo",src:_.Z}),c.createElement("h2",null,c.createElement(p.Z,{id:"create_team.display_name.teamName",defaultMessage:"Team Name"})),c.createElement("div",{className:t},c.createElement("div",{className:"row"},c.createElement("div",{className:"col-sm-9"},c.createElement("input",{id:"teamNameInput",type:"text",className:"form-control",placeholder:"",maxLength:128,value:this.state.teamDisplayName,autoFocus:!0,onFocus:this.handleFocus,onChange:this.handleDisplayNameChange,spellCheck:"false"}))),e),c.createElement("div",null,c.createElement(p.Z,{id:"create_team.display_name.nameHelp",defaultMessage:"Name your team in any language. Your team name shows in menus and headings."})),c.createElement("button",{id:"teamNameNextButton",type:"submit",className:"btn btn-primary mt-8",onClick:this.submitNext},c.createElement(p.Z,{id:"create_team.display_name.next",defaultMessage:"Next"}),c.createElement(f.Z,null))))}}N(b,"propTypes",{state:m().shape({wizard:m().string.isRequired}).isRequired,updateParent:m().func.isRequired});var v=a(37635),M=a(14890),T=a(97254),y=(a(88674),a(19728)),Z=a(78318),L=a(45288),x=a(15558);function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class w extends c.PureComponent{constructor(e){var t;super(e),P(this,"submitBack",(e=>{e.preventDefault(),(0,h.L9)("signup","click_back");const t=this.props.state;t.wizard="display_name",this.props.updateParent(t)})),P(this,"submitNext",(async e=>{e.preventDefault(),(0,h.L9)("signup","click_finish");const t=this.state.teamURL.trim(),a=g.oK(t),{actions:{checkIfTeamExists:s,createTeam:r}}=this.props;if(!t)return void this.setState({nameError:c.createElement(p.Z,{id:"create_team.team_url.required",defaultMessage:"This field is required"})});if(a.length<E.ZP.MIN_TEAMNAME_LENGTH||a.length>E.ZP.MAX_TEAMNAME_LENGTH)return void this.setState({nameError:c.createElement(p.Z,{id:"create_team.team_url.charLength",defaultMessage:"Name must be {min} or more characters up to a maximum of {max}",values:{min:E.ZP.MIN_TEAMNAME_LENGTH,max:E.ZP.MAX_TEAMNAME_LENGTH}})});if(a!==t||!/^[a-z]+([a-z\-0-9]+|(__)?)[a-z0-9]+$/g.test(t))return void this.setState({nameError:c.createElement(p.Z,{id:"create_team.team_url.regex",defaultMessage:"Use only lower case letters, numbers and dashes. Must start with a letter and can't end in a dash."})});for(let e=0;e<E.ZP.RESERVED_TEAM_NAMES.length;e++)if(0===a.indexOf(E.ZP.RESERVED_TEAM_NAMES[e]))return void this.setState({nameError:c.createElement(L.Z,{id:"create_team.team_url.taken",defaultMessage:"This URL [starts with a reserved word](!https://docs.mattermost.com/help/getting-started/creating-teams.html#team-url) or is unavailable. Please try another."})});this.setState({isLoading:!0});const n=JSON.parse(JSON.stringify(this.props.state));if(n.team.type="O",n.team.name=t,(await s(t)).exists)return this.setState({nameError:c.createElement(p.Z,{id:"create_team.team_url.unavailable",defaultMessage:"This URL is taken or unavailable. Please try another."})}),void this.setState({isLoading:!1});const i=await r(n.team),l=i.data,m=i.error;l?(this.props.history.push("/"+l.name+"/channels/"+E.ZP.DEFAULT_CHANNEL),(0,h.L9)("signup","signup_team_03_complete")):m&&(this.setState({nameError:m.message}),this.setState({isLoading:!1}))})),P(this,"handleFocus",(e=>{e.preventDefault(),e.currentTarget.select()})),P(this,"handleTeamURLInputChange",(e=>{this.setState({teamURL:e.target.value})})),this.state={nameError:"",isLoading:!1,teamURL:null===(t=e.state.team)||void 0===t?void 0:t.name}}componentDidMount(){(0,h.L9)("signup","signup_team_02_url")}render(){let e=null,t="form-group";this.state.nameError&&(e=c.createElement("label",{className:"control-label"},this.state.nameError),t+=" has-error");const a="".concat(g.fO(),"/"),s=c.createElement(y.Z,{id:"urlTooltip"},a);let r=c.createElement(p.Z,{id:"create_team.team_url.finish",defaultMessage:"Finish"});return this.state.isLoading&&(r=c.createElement(p.Z,{id:"create_team.team_url.creatingTeam",defaultMessage:"Creating team..."})),c.createElement("div",null,c.createElement("form",null,c.createElement("img",{alt:"signup team logo",className:"signup-team-logo",src:_.Z}),c.createElement("h2",null,c.createElement(p.Z,{id:"create_team.team_url.teamUrl",defaultMessage:"Team URL"})),c.createElement("div",{className:t},c.createElement("div",{className:"row"},c.createElement("div",{className:"col-sm-11"},c.createElement("div",{className:"input-group input-group--limit"},c.createElement(x.Z,{delayShow:E.ZP.OVERLAY_TIME_DELAY,placement:"top",overlay:s},c.createElement("span",{className:"input-group-addon"},a)),c.createElement("input",{id:"teamURLInput",type:"text",className:"form-control",placeholder:"",maxLength:128,value:this.state.teamURL,autoFocus:!0,onFocus:this.handleFocus,onChange:this.handleTeamURLInputChange,spellCheck:"false"})))),e),c.createElement("p",null,c.createElement(p.Z,{id:"create_team.team_url.webAddress",defaultMessage:"Choose the web address of your new team:"})),c.createElement("ul",{className:"color--light"},c.createElement("li",null,c.createElement(p.Z,{id:"create_team.team_url.hint1",defaultMessage:"Short and memorable is best"})),c.createElement("li",null,c.createElement(p.Z,{id:"create_team.team_url.hint2",defaultMessage:"Use lowercase letters, numbers and dashes"})),c.createElement("li",null,c.createElement(p.Z,{id:"create_team.team_url.hint3",defaultMessage:"Must start with a letter and can't end in a dash"}))),c.createElement("div",{className:"mt-8"},c.createElement(Z.Z,{id:"teamURLFinishButton",type:"submit",bsStyle:"primary",disabled:this.state.isLoading,onClick:e=>this.submitNext(e)},r)),c.createElement("div",{className:"mt-8"},c.createElement("a",{href:"#",onClick:this.submitBack},c.createElement(p.Z,{id:"create_team.team_url.back",defaultMessage:"Back to previous step"})))))}}P(w,"propTypes",{state:m().shape({wizard:m().string.isRequired}).isRequired,updateParent:m().func.isRequired,actions:m().shape({checkIfTeamExists:m().func.isRequired,createTeam:m().func.isRequired}).isRequired,history:m().shape({}).isRequired});const A=(0,s.connect)(null,(function(e){return{actions:(0,M.bindActionCreators)({checkIfTeamExists:T.iw,createTeam:T.Cm},e)}}))(w);function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class R extends c.PureComponent{constructor(e){super(e),k(this,"updateParent",(e=>{this.setState(e),this.props.history.push("/create_team/"+e.wizard)})),this.state={team:{},wizard:"display_name"}}render(){const{currentChannel:e,currentTeam:t,customDescriptionText:a,match:s,siteName:r}=this.props;let n="/select_team";return t&&(n="/".concat(t.name),e&&(n+="/channels/".concat(e.name))),c.createElement("div",null,c.createElement(o.Z,null),c.createElement(d.Z,{url:n}),c.createElement("div",{className:"col-sm-12"},c.createElement("div",{className:"signup-team__container"},c.createElement(v.Z,{customDescriptionText:a,siteName:r}),c.createElement("div",{className:"signup__content"},c.createElement(u.rs,null,c.createElement(u.AW,{path:"".concat(this.props.match.url,"/display_name"),render:e=>c.createElement(b,Object.assign({state:this.state,updateParent:this.updateParent},e))}),c.createElement(u.AW,{path:"".concat(this.props.match.url,"/team_url"),render:e=>c.createElement(A,Object.assign({state:this.state,updateParent:this.updateParent},e))}),c.createElement(u.l_,{to:"".concat(s.url,"/display_name")}))))))}}k(R,"propTypes",{customDescriptionText:m().string.isRequired,siteName:m().string.isRequired,match:m().shape({url:m().string.isRequired}).isRequired});const C=(0,s.connect)((function(e){const t=(0,r.iE)(e);return{currentChannel:(0,n.TB)(e),currentTeam:(0,i.kA)(e),customDescriptionText:t.CustomDescriptionText,siteName:t.SiteName}}))(R)},16406:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});const s=a.p+"files/a0a7d819869d6545c06500f0d8179b41.png"}}]);
//# sourceMappingURL=594.920eca001e83a7e902d9.js.map