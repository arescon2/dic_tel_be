var pe=Object.defineProperty,he=Object.defineProperties;var me=Object.getOwnPropertyDescriptors;var Q=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var J=(a,n,l)=>n in a?pe(a,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[n]=l,v=(a,n)=>{for(var l in n||(n={}))ge.call(n,l)&&J(a,l,n[l]);if(Q)for(var l of Q(n))ye.call(n,l)&&J(a,l,n[l]);return a},L=(a,n)=>he(a,me(n));import{c as be,a as fe,u as H,b as F,d as K,j as c,e,B as w,F as R,f as W,g as ke,h as Be,D as X,i as ve,M as Y,n as x,L as Z,H as xe,k as C,r as b,R as G,C as D,I as z,A as Ce,E as _,l as Ee,t as we,P as De,m as Ne,o as ee,p as V,q as te,Q as Se,s as Ae,T as ae,v as ne,w as M,x as Re,y as Pe,z as Te,G as Le,J as Ge,K as Fe,N as Oe,O as Me,S as $e,U as Ie,V as ze,W as je,X as Ue}from"./vendor.417ac784.js";const He=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))i(u);new MutationObserver(u=>{for(const s of u)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const s={};return u.integrity&&(s.integrity=u.integrity),u.referrerpolicy&&(s.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?s.credentials="include":u.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(u){if(u.ep)return;u.ep=!0;const s=l(u);fetch(u.href,s)}};He();const Ke={loadingGlobal:!0,mainMenu:[],logined:!1},se=be({name:"main_store",initialState:Ke,reducers:{setMainMenu:(a,n)=>{a.mainMenu=[...n.payload]},setLogined:(a,n)=>{a.logined=n.payload},setLoading:(a,n)=>{a.loadingGlobal=n.payload},setPageTitle:(a,n)=>{a.pageTitle=n.payload}}}),{setMainMenu:dt,setLogined:j,setLoading:ue,setPageTitle:pt}=se.actions;var Ve=se.reducer;const le=fe.create({baseURL:"http://localhost:3000/",timeout:6e4,withCredentials:!0,headers:{"Content-Type":"application/json"}}),qe=async function(a,n){try{return await le.get(a,{params:n||{}})}catch(l){throw new Error(l)}},re=async function(a,n={},l={}){return new Promise((i,u)=>{le.post(a,n,{params:l}).then(s=>{i(s.data,s)}).catch(s=>{u(s.response.data,s.response)})})},Qe=()=>{H(u=>u.main);const a=F(),n=K();return c("div",{className:"header-block",children:[e(w,{icon:e(R,{icon:W}),type:"text"}),c("div",{className:"user-block",children:[e(w,{icon:e(R,{icon:ke}),type:"text",onClick:()=>a("/user-cabinet")}),e(w,{icon:e(R,{icon:Be}),type:"text"}),e(X,{type:"vertical"}),e(w,{icon:e(R,{icon:ve}),type:"text",danger:!0,onClick:()=>{re("/auth/logout").then(()=>{a("/login"),n(j(!1))})}})]})]})};const Je=()=>{let a=[{id:1,icon:"home",title:"\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",placeholder:"\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",link:"/"},{id:2,icon:"clipboard-list",title:"\u0422\u0438\u043A\u0435\u0442\u044B",placeholder:"\u0422\u0438\u043A\u0435\u0442\u044B",link:"/page/tickets"},{id:3,icon:"cog",title:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",placeholder:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",link:"/settings"}];const n=F(),l=u=>{n(u.link)};return e("div",{className:"left-block",children:e(Y,{className:"root-menu",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],mode:"vertical",children:(()=>a.map(u=>e(Y.Item,{style:{paddingLeft:"none"},placeholder:u.placeholder,onClick:()=>l(u),children:e(R,{style:{width:"100%"},size:"lg",icon:u.icon})},x())))()})})};const We=a=>c(Z,{className:"rootLayout",children:[c(xe,{children:[e("meta",{charSet:"utf-8"}),e("title",{children:"AllTum.\u0416\u0443\u0440\u043D\u0430\u043B"})]},x()),e(Je,{},x()),c("div",{className:"card-root-block",children:[e(Qe,{}),e(Z.Content,{className:"body-block",children:a.children})]},x())]});const Xe=()=>e(C,{children:e("div",{className:"content",children:c("div",{className:"loading",children:[e("p",{children:"loading"}),e("span",{})]})})});const Ye=()=>{const a=F(),n=K(),{logined:l}=H(t=>t.main),[i,u]=b.exports.useState(""),[s,f]=b.exports.useState(""),[h,P]=b.exports.useState([]),O=t=>{t.charCode===13&&T()},T=()=>{re("/auth/login",{login:i,password:s}).then(()=>{a("/"),n(j(!0)),n(ue(!1))}).catch(t=>{P(t.message||[])})},r=t=>u(t.target.value),d=t=>f(t.target.value);return b.exports.useEffect(()=>{l&&a("/")},[]),[e("div",{className:"bkg-login"}),c("div",{className:"login-form-block",children:[e(G,{className:"row-login-block",children:e("h2",{className:"title bp3-heading",children:"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435"})}),e(G,{className:"row-login-block",children:e(D,{children:e(z,{onChange:r,onKeyPress:O,placeholder:"\u041B\u043E\u0433\u0438\u043D",value:i})})}),e(G,{className:"row-login-block",children:e(D,{children:e(z,{type:"password",onChange:d,onKeyPress:O,placeholder:"\u041F\u0430\u0440\u043E\u043B\u044C",value:s})})}),e(G,{className:"row-login-block",children:e(D,{children:e(w,{alignText:"center",className:"success-button",type:"link",onClick:T,children:"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F"})})}),e(G,{className:"row-login-block",children:(()=>h.map(t=>e(Ce,{message:t,type:"error"})))()})]})]},Ze=()=>e("div",{children:"Main page"});const _e=()=>{const a=F();return e(G,{children:e(D,{md:24,children:e(_,{description:"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",children:e(w,{type:"primary",onClick:()=>a("/"),children:"\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443"})})})})};const I={Row:{id:null,orderBy:1,element:"block",type:"Row",parent:"root"},Input:{id:null,orderBy:1,element:"input",type:"text"}};I.Col=L(v({},I.Row),{type:"Col",md:12});I.Div=L(v({},I.Row),{type:"Div",classes:""});const ie=({config:a,onUpdate:n})=>{const[l,i]=b.exports.useState(!0),[u,s]=b.exports.useState([]);b.exports.useEffect(()=>{s(a)},[]);const f=g=>{i(!1),s(g),i(!0)},[h,P]=b.exports.useState(!1),[O,T]=b.exports.useState({}),[r,d]=b.exports.useState({parent:"root",orderBy_prev:null}),N=(g,k=!1)=>{let S=[...u];if(k){let y=S.findIndex(B=>B.id===g.id);S.splice(y,1,v({},g))}else{let y=S.filter(B=>B.parent===g.parent).sort((B,E)=>B.orderBy-E.orderBy);if(y.length>0){let B=g.orderBy;y.map(E=>{if(E.orderBy>=B){B++,E.orderBy=B;let ce=S.findIndex(de=>de.id===E.id);S.splice(ce,1,v({},E))}}),S.push(v({},g))}else S.push(v({},g))}console.log(S),s([...S])},t=(g,k=0)=>{let S=k?k+1:1;if(g==="root"){let y=v({},I.Row);y.id=x(),y.parent=g,y.orderBy=S,N(y)}else o(g,k)},p=()=>{T({}),d({parent:"root",orderBy_prev:null}),P(!1)},o=(g,k)=>{d({parent:g,orderBy_prev:k}),P(!0)},m=g=>{let k=v({},I[g]);k.id=x(),k.parent=r.parent,k.orderBy=r.orderBy_prev?r.orderBy_prev+1:1,N(k),p()},A=(g=null)=>{if(!g){we("id is null",{type:"error"});return}},$=()=>{let g=u.find(k=>k.id===r.parent);if(!g||!h)return"null";{let k=["Grid","Data Display","Form"],y=[{type:"Row",group:"Grid",visible:[]},{type:"Col",group:"Grid",visible:["Row","Col"]},{type:"Div",group:"Grid",visible:["Row","Col","Div"]},{type:"Input",group:"Form",visible:["Col"]}].filter(B=>{if(B.visible.findIndex(E=>E===g.type)>-1)return B});return e(C,{children:k.map(B=>[e(D,{md:12,children:e("h6",{className:"bp3-heading",children:B})},x()),e(D,{md:12,children:y.filter(E=>E.group==B).map(E=>e(w,{ghost:!0,type:"primary",onClick:()=>m(E.type),style:{marginRight:"5px"},children:E.type},x()))},x()),e(X,{},x())])})}};return e(D,{children:l?c(C,{children:[e(oe,{parent:"root",config:u,setConfig:g=>f(g),handlePlusButton:t,handleUpdOpenBlock:A}),c(Ee,{visible:h,onCancel:p,title:"\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043B\u043E\u043A\u0430, "+r.parent,footer:!1,children:[e("div",{style:{marginTop:"10px"}}),h?$():null]})]}):e(C,{children:"loading"})})},oe=({parent:a="root",config:n=[],setConfig:l,handlePlusButton:i,handleUpdOpenBlock:u})=>{const s=r=>{let d=[...n],N=d.find(m=>m.id===r);const t=m=>{d=d.filter(A=>A.id!==r),d.map(A=>{A.parent===m&&t(A.id)})};t(r);let p=d.filter(m=>m.parent===N.parent).sort((m,A)=>m.orderBy-A.orderBy),o=N.orderBy;p.map(m=>{if(m.orderBy>=o){console.log("tut"),m.orderBy=o;let A=d.findIndex($=>$.id===m.id);o++,d.splice(A,1,v({},m))}}),l(d)};let f=(r,d,N)=>e("div",{className:`creator-button-block type-block-${N}`,children:e(w,{onClick:()=>i(r,d),className:"creator-plus-button",type:"primary",size:"small",children:"+"})});const h=({el_conf:r,parent:d,orderBy_prev:N})=>{let t={};r.type==="Col"&&(t.md=r.md||12),r.classes&&(t.className=r.classes);const p=e(oe,{parent:r.id,config:n,setConfig:l,handlePlusButton:i,handleUpdOpenBlock:u}),o=m=>c("div",{className:"creator-block-name",children:[c("span",{className:"name-block",children:[r.orderBy," - ",m," - ",r.id]}),c("div",{style:{float:"right"},children:[e(w,{type:"primary",size:"small",icon:e(R,{icon:"cog"}),onClick:()=>u(r.id)}),e(De,{title:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435",onConfirm:()=>s(r.id),okText:"\u0414\u0430",children:e(w,{size:"small",type:"primary",danger:!0,icon:e(R,{icon:"trash"})})})]})]});return{Row:c(C,{children:[c(G,L(v({style:{border:"1px solid #ffcfcf",padding:"3px",marginBottom:"2px"}},t),{children:[o("Row"),p]})),f(d,N,"Row")]}),Col:c(C,{children:[c(D,L(v({style:{border:"1px solid rgb(83 171 185)",padding:"3px",marginTop:"7px"},className:r.classes},t),{children:[o("Col"),p]})),f(d,N,"Col")]}),Div:c(C,{children:[c("div",L(v({className:r.classes},t),{children:[o("Div"),p]})),f(d,N,"Div")]})}[r.type]},P=({el_conf:r})=>e(z,{}),O=({el_conf:r,orderBy_prev:d})=>({block:e(C,{children:e(h,{el_conf:r,parent:a,orderBy_prev:d})}),input:e(C,{children:e(P,{el_conf:r})})})[r.element]||c(C,{children:[" \u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 ",r.element," \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D "]});let T=n.filter(r=>r.parent===a).sort((r,d)=>r.orderBy-d.orderBy);return T.length>0?e(C,{children:T.map((r,d)=>e(O,{el_conf:r,orderBy_prev:r.orderBy,last:T.length===d+1},x()))}):c("span",{children:["empty ",a,f(a,null)]})},U=({config:a=[],data:n,updData:l,el_data:i})=>{const u=F();let s=i||!1;const f=({el_conf:t})=>{let p={};t.type==="Col"&&(p.md=t.md||12),t.classes&&(p.className=t.classes);const o=e(U,{config:t.child||[],data:n,el_data:i,updData:l});return{Row:e(G,L(v({className:t.classes},p),{children:o})),Col:e(D,L(v({className:t.classes},p),{children:o})),div:e("div",L(v({className:t.classes},p),{children:o}))}[t.type]},h=({el_conf:t})=>{let p={};t.placeholder&&(p.placeholder=t.placeholder),p.type=t.input_type||"text";let o=t.disable||!1;t.value&&t.value.includes("bind.")||(p.defaultValue=t.value);let m={Text:e(z,v({className:t.classes,disabled:o},p))}[t.type];return t.placeholder&&(m=e(Tooltip2,{fill:!0,content:(s?s[t.placeholder]:t.placeholder)||"",placement:(s?s[t.position]:t.position)||"auto",children:m})),m},P=({el_conf:t})=>{let p=t.disable||!1;const o=()=>{t.linkto&&u(s[t.linkto])};let m=e(Button,{text:(s?s[t.text]||s.text:t.text)||"",type:t[t.type]||"button",intent:(s?s[t.text]:t.intent)||"none",icon:(s?s[t.icon]:t.icon)||null,small:t.size=="small",large:t.size=="large",disabled:p,minimal:t.minimal||!1,fill:t.fill||!1,onClick:o});return t.placeholder&&(m=e(Tooltip2,{content:(s?s[t.placeholder]:t.placeholder)||"",placement:(s?s[t.position]:t.position)||"auto",children:m})),m},O=({el_conf:t})=>(n[t.data]||[]).map(o=>e(U,{config:t.child||[],data:n,el_data:o,updData:l},x())),T=({el_conf:t})=>{let p=n[t.data]||[];return e(Menu,{className:Classes.ELEVATION_1,children:p.map(o=>e(MenuItem,{icon:o.icon||null,text:o.text||null},x()))})},r=({el_conf:t})=>{let p=n[t.data]||[],[o,m]=Ne();b.exports.useState(),b.exports.useState();const A=ee(),$=o.get("tab"),g=y=>{if(!o.get("tab"))o.append("tab",y);else{let B=Array.from(o);B.forEach(E=>(E[0]==="tab"&&(E[1]=y),E)),o=new URLSearchParams(B)}u(`${A.pathname}?${o}`)};let k={views_admin:[{id:1,element:"block",type:"Row",classes:"fill",child:[{id:2,element:"block",type:"Col",md:12,classes:"",child:[{element:"creator",config:"views_add"}]}]}]};const S=y=>k[y.config];return e(Tabs,{id:x(),className:"fill generator-tab",animate:t.animate||!1,selectedTabId:$||p[0].key,vertical:t.vertical?"vertical":"horizontal",onChange:g,children:p.map(y=>e(Tab,{id:y.key,title:y.text||"",panel:c(C,{children:[t.title?e(D,{md:12,children:e("h3",{className:"bp3-heading",children:y[t.title]+" - "+y.config||""})}):null,e(U,{config:S(y)||[],el_data:i,data:n,updData:l})]})},x()))},t.vertical?"vertical":"horizontal")},d=({el_conf:t})=>e(ie,{config_name:t.config}),N=({el_conf:t})=>({block:e(f,{el_conf:t}),input:e(h,{el_conf:t}),button:e(P,{el_conf:t}),collection:e(O,{el_conf:t}),menu:e(T,{el_conf:t}),tabs:e(r,{el_conf:t}),creator:e(d,{el_conf:t})})[t.element]||c(C,{children:[" \u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 ",t.element," \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D "]});return a&&a.length>0?e(C,{children:a.map(t=>e(N,{el_conf:t},x()))}):e(C,{children:"empty"})};let et={new_ticket:[{id:1,element:"block",type:"Row",classes:"",child:[{id:2,element:"block",type:"Col",md:2,classes:"",child:[{id:3,element:"input",type:"Text",classes:"",title:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",placeholder:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",size:"small",input_type:"Text",value:"text text",disable:!1}]},{id:2,element:"block",type:"Col",md:2,classes:"",child:[{id:3,element:"input",type:"Text",classes:"",title:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",placeholder:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",input_type:"Text",value:"text text",disable:!1}]},{id:4,element:"block",type:"Col",md:2,classes:"",child:[{id:5,element:"button",type:"button",classes:"",text:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",placeholder:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C, \u0441\u043E\u0445\u0440",icon:"refresh",rightIcon:"copy",intent:"success",alignText:"center",fill:!1,disable:!1}]},{id:6,element:"block",type:"Col",md:2,classes:"",child:[{id:5,element:"select",type:"select",classes:"",disable:!1}]}]}],settings:[{id:1,element:"block",type:"Row",classes:"",child:[{id:1,element:"block",type:"Col",md:12,classes:"",styles:"",child:[{id:2,element:"tabs",classes:"",large:!1,data:"menu",title:"text"}]}]}]},tt=[{id:1,text:"Views",placeholder:"Views",linkto:"/page/views",key:"views",config:"views_admin"},{id:2,text:"\u0422\u0438\u043A\u0435\u0442\u044B",placeholder:"\u0422\u0438\u043A\u0435\u0442\u044B",linkto:"/page/tickets",key:"tickets"},{id:3,text:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 asdasd asd asda sd asd \u0444\u044B\u0432\u0444\u044B\u0432 \u0444\u044B\u0432 \u0444\u044B\u0432\u0444\u044B \u0432\u0432 ",placeholder:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 ",linkto:"/page/settings",key:"settings"}];const at=({params:a,loading:n})=>{const[l,i]=b.exports.useState({}),[u,s]=b.exports.useState(!1),[f,h]=b.exports.useState({});return b.exports.useEffect(()=>{if(n&&!u){let P=L(v({},l),{menu:tt});i(P),h(et[a.pagename]),s(!0)}},[n,u]),u?e(U,{config:f,data:l,updData:i}):null};function nt(){const a=V(),[n,l]=b.exports.useState({}),[i,u]=b.exports.useState(!0),s=()=>{u(!0),l(a.pagename),u(!0)};return b.exports.useEffect(()=>{a.pagename!==n&&s()},[a.pagename]),i?e(at,{params:a,loading:i}):e(_,{})}const st=()=>{const a=F(),n=h=>{console.log(h)},l=[{name:"#",selector:h=>h.id,width:"100px"},{name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",selector:h=>h.name,grow:2},{name:"\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",selector:h=>h.created},{name:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",cell:h=>c(C,{children:[e(w,{onClick:()=>s(h.name),type:"primary",ghost:!0,placeholder:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",icon:e(R,{icon:"edit"}),size:"small"}),e(Ae,{placement:"leftBottom",trigger:"click",content:c(C,{children:["\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435: ",e(w,{onClick:()=>n(h),size:"small",type:"primary",children:"\u0414\u0430"})]}),children:e(w,{type:"default",placeholder:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",danger:!0,icon:e(R,{icon:"trash"}),size:"small"})})]}),ignoreRowClick:!0,right:!0}],i=[{id:1,name:"views_form",created:"08.02.2022",config:[]},{id:2,name:"asdasd",created:"08.02.2022",config:[]}],u=h=>{console.log(h)},s=h=>{a(`/settings/blocks/${h}`)};return c(G,{children:[e(D,{md:24,children:e("div",{className:"wrapper-tab",children:e(te,{title:"\u0411\u043B\u043E\u043A\u0438",subTitle:"\u0421\u043F\u0438\u0441\u043E\u043A",ghost:!1,extra:[e(w,{icon:e(R,{icon:"plus"}),type:"primary",ghost:!0,size:"small",onClick:()=>s("new"),children:"\u041D\u043E\u0432\u044B\u0439 \u0431\u043B\u043E\u043A"}),e(w,{icon:e(R,{icon:"sync"}),type:"primary",ghost:!0,size:"small",onClick:()=>{console.log("refresh")},children:" "})]})})}),e(D,{md:24,children:e(Se,{columns:l,data:i,selectableRows:!0,onSelectedRowsChange:u,dense:!0})})]})},ut=()=>{const a=F(),{id:n}=V();let l={id:2,name:"asdasd",created:"08.02.2022",config:[]};const i=()=>{a("/settings/blocks")};b.exports.useEffect(()=>{});const u=s=>{console.log(s)};return c(G,{children:[e(D,{md:24,children:e("div",{className:"wrapper-tab",children:e(te,{title:"\u0411\u043B\u043E\u043A",subTitle:n!=="new"?"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435":"\u041D\u043E\u0432\u044B\u0439",onBack:i})})}),e(D,{md:24,children:e(ie,{config:l.config,onUpdate:u})})]})},q=()=>{const{pagename:a,id:n}=V(),l=F(),i=[{id:1,text:"\u0411\u043B\u043E\u043A\u0438",placeholder:"\u0411\u043B\u043E\u043A\u0438",linkto:"blocks",key:"Blocks",list:e(st,{}),form:e(ut,{})}],u=s=>{l(`/settings/${s}`)};return b.exports.useEffect(()=>{a||l(`/settings/${i[0].linkto}`)},[]),e(ae,{id:x(),className:"fill generator-tab",tabPosition:"left",onChange:u,children:i.map(s=>e(ae.TabPane,{tab:s.text||"",children:e(D,{md:24,children:n?s.form:s.list})},x()))})},lt=()=>c(ne,{children:[e(M,{path:"/",element:e(Ze,{})}),e(M,{path:"/settings",element:e(q,{})}),e(M,{path:"/settings/:pagename",element:e(q,{})}),e(M,{path:"/settings/:pagename/:id",element:e(q,{})}),e(M,{path:"/page/:pagename",element:e(nt,{})}),e(M,{path:"*",element:e(_e,{})})]});Re.add(Pe,Te,Le,Ge,Fe,Oe,W);const rt=()=>{const a=F(),{logined:n,loadingGlobal:l}=H(f=>f.main),i=K(),u=ee(),s=async()=>{await qe("/auth/check").then(()=>{i(j(!0)),u.pathname==="/login"&&a("/")}).catch(f=>{i(j(!1)),a("/login")}).finally(()=>i(ue(!1)))};return b.exports.useEffect(()=>{s()},[]),c(C,{children:[l?e(Xe,{}):null,n?e(We,{children:e(lt,{})}):e(ne,{children:e(M,{path:"login",element:e(Ye,{})})})]})},it=Me({reducer:{main:Ve}});$e.render(e(Ie.StrictMode,{children:e(ze,{children:c(je,{store:it,children:[e(rt,{}),e(Ue,{theme:"dark"})]})})}),document.getElementById("root"));