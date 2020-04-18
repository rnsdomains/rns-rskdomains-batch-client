(this["webpackJsonprns-rskdomains-batch-client"]=this["webpackJsonprns-rskdomains-batch-client"]||[]).push([[0],{172:function(e,t,n){e.exports=n(401)},191:function(e,t){},214:function(e,t){},216:function(e,t){},283:function(e,t){},401:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(41),i=n.n(l),o=n(14),s=Object(o.b)()((function(){return r.a.createElement("nav",{className:"navbar navbar-expand-md navbar-light bg-light fixed-top"},r.a.createElement("div",{className:"container"},r.a.createElement("span",{className:"navbar-brand"},r.a.createElement("img",{src:"assets/img/logo.svg",className:"logo",alt:"logo"})),r.a.createElement("h3",null,".rsk domains batch"),r.a.createElement("small",null,"RSK Mainnet")))})),c=n(403),u=n(404),m=function(){return r.a.createElement("footer",null,r.a.createElement("div",{className:"footer-top"},r.a.createElement(c.a,null,r.a.createElement(u.a,null,r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("img",{src:"assets/img/powered_by_iov.svg",className:"img-fluid powered_by",alt:"powered_by"})),r.a.createElement("div",{className:"col-lg-4"},r.a.createElement("span",{className:"footer-title mb-3"},"What is RNS?"),r.a.createElement("p",{className:"mb-5"},"RIF Name Service provides an architecture which enables the identification of blockchain addresses by human-readable names.")),r.a.createElement("div",{className:"col-lg-3"}),r.a.createElement("div",{className:"col-lg-3"}),r.a.createElement("div",{className:"col-lg-2"},r.a.createElement("a",{href:"https://gitter.im/rsksmart/rif-name-service",target:"_blank",rel:"noopener noreferrer"},"Gitter"),r.a.createElement("a",{href:"https://rsksamrt.github.io/rif.rns/tools/subdomain-batch",target:"_blank",rel:"noopener noreferrer"},"Docs"),r.a.createElement("a",{href:"https://github.com/rnsdomains/rns-subdomain-batch",target:"_blank",rel:"noopener noreferrer"},"Issues"))))))},d=n(167),h=n(15),f=n.n(h),b=n(28),p=n(20),v=n(21),E=n(23),g=n(22),y=n(10),C=n(24),w=n(36),O=n(407),k=n(405),j=n(92),S=n.n(j),A=n(37),N=n.n(A),R=new N.a("https://public-node.rsk.co"),I=new R.eth.Contract([{constant:!0,inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"available",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}],"0x45d3e4fb311982a06ba52359d44cb4f5980e0ef1");function x(){return(x=Object(w.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",I.methods.available(R.utils.sha3(t)).call());case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P={error:null,validating:!1,unconfirmedLabels:null,confirmed:0},T=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(g.a)(t).call(this,e))).state=P,n.handleUploadFile=n.handleUploadFile.bind(Object(y.a)(n)),n.error=n.error.bind(Object(y.a)(n)),n.confirm=n.confirm.bind(Object(y.a)(n)),n}return Object(C.a)(t,e),Object(v.a)(t,[{key:"handleUploadFile",value:function(e){var t=this;this.setState(Object(b.a)({},P,{validating:!0}));for(var n=[],a=0;a<e.length;a+=1)n.push(e[a][0]);for(var r=0;r<n.length;r+=1){var l=n[r];if(l.length<5)return void this.error("Invalid domain: ".concat(l,". Domains must have a minimum length of 5 characters."));if(!(l.length>=5)||!l.match(/^[0-9a-z]+$/))return void this.error("Invalid domain: ".concat(l,". Domains must be combination of 0-9 a-z."))}for(var i=[],o=function(e){i.push(function(e){return x.apply(this,arguments)}(n[e]).then((function(a){a||t.error("Domain not available: ".concat(n[e],". Please remove it from the list."))})))},s=0;s<n.length;s+=1)o(s);Promise.all(i).then((function(){t.setState({validating:!1,unconfirmedLabels:n})}))}},{key:"error",value:function(e){this.setState({error:e})}},{key:"confirm",value:function(){var e=this.state.unconfirmedLabels,t=this.props.labelsAvailable;this.setState({confirmed:e.length}),t(e)}},{key:"render",value:function(){var e,t=this.state,n=t.error,a=t.validating,l=t.unconfirmedLabels,i=t.confirmed;if(n)e=r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{variant:"danger"},n),r.a.createElement(S.a,{onFileLoaded:this.handleUploadFile}));else if(0!==i||a||l)if(0===i&&a&&!l)e=r.a.createElement("p",null,"Labels are valid, checking availability...");else if(0===i&&!a&&l)e=r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Labels are valid and available!"),r.a.createElement("ul",null,l.map((function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement(k.a,{onClick:this.confirm},"Confirm"));else{if(!l||0===i)throw new Error("Unhandled state.");e=r.a.createElement("p",null,"Confirmed domains to register: ",i)}else e=r.a.createElement(S.a,{onFileLoaded:this.handleUploadFile});return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Upload ",r.a.createElement("code",null,"csv")," file with one column containing the labels to register. Ensure not to use .rsk at the end, lower cases, and no spaces."),e)}}]),t}(a.Component),D=Object(o.b)((function(e){return{labels:e.app.labels}}),(function(e){return{labelsAvailable:function(t){return e(function(e){return{type:"LABELS_AVAILABLE",labels:e}}(t))}}}))(T),F=n(406),L=new N.a("https://public-node.rsk.co"),_=new L.eth.Contract([{constant:!0,inputs:[{internalType:"string",name:"name",type:"string"},{internalType:"uint256",name:"expires",type:"uint256"},{internalType:"uint256",name:"duration",type:"uint256"}],name:"price",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}],"0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61");function B(){return(B=Object(w.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",_.methods.price("",0,t).call());case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(g.a)(t).call(this,e))).state={durationInput:1,duration:0,price:null,costOfOne:null,totalRif:null},n.handleDurationChange=n.handleDurationChange.bind(Object(y.a)(n)),n.setDuration=n.setDuration.bind(Object(y.a)(n)),n.confirm=n.confirm.bind(Object(y.a)(n)),n}return Object(C.a)(t,e),Object(v.a)(t,[{key:"handleDurationChange",value:function(e){this.setState({durationInput:e.target.value})}},{key:"setDuration",value:function(e){var t=this;e.preventDefault();var n=Number(this.state.durationInput);this.setState({duration:n});var a=this.props.labels;(function(e){return B.apply(this,arguments)})(n).then((function(e){var n=L.utils.toBN("1000000000000000000"),r=L.utils.toBN(e),l=r.mul(L.utils.toBN(a.length)).div(n),i=L.utils.toBN("60000000"),o=L.utils.toBN("6800000"),s=L.utils.toBN(Math.ceil(a.length/250)),c=L.utils.toBN(Math.ceil(a.length/35)),u=L.utils.toBN(i.mul(o).mul(s.add(c)));t.setState({costOfOne:e,price:{rif:l,rbtc:u},totalRif:r})}))}},{key:"confirm",value:function(){var e=this.props.confirmPrice,t=this.state,n=t.duration,a=t.costOfOne,r=t.totalRif;e(L.utils.toBN(n),L.utils.toBN(a),r)}},{key:"render",value:function(){var e=this.props,t=e.labels,n=e.confirmedPrice,a=this.state,l=a.duration,i=a.durationInput,o=a.price;if(!t)return null;if(0===l)return r.a.createElement(F.a,{onSubmit:this.setDuration},r.a.createElement(F.a.Group,null,r.a.createElement(F.a.Label,null,"For how long do you want to register the domains?"),r.a.createElement(F.a.Control,{onChange:this.handleDurationChange,value:i,type:"number",min:1}),r.a.createElement(k.a,{type:"submit"},"Confirm")));if(l>0&&!o)return r.a.createElement("p",null,"Calculating price...");if(l>0&&o)return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Price: ",o.rif.toString()," RIF Tokens + ~",o.rbtc.toString()," RBTC (wei)"),!n&&r.a.createElement(k.a,{onClick:this.confirm},"Confirm"));throw new Error("Unhandled state.")}}]),t}(a.Component),U=Object(o.b)((function(e){var t=e.app;return{labels:t.labels,confirmedPrice:t.confirmedPrice}}),(function(e){return{confirmPrice:function(t,n,a){return e(function(e,t,n){return{type:"CONFIRM_PRICE",duration:e,cost:t,totalRif:n}}(t,n,a))}}}))(M),W=n(168),H=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(g.a)(t).call(this,e))).state={address:"",error:null},n.handleChangeAddress=n.handleChangeAddress.bind(Object(y.a)(n)),n.confirm=n.confirm.bind(Object(y.a)(n)),n}return Object(C.a)(t,e),Object(v.a)(t,[{key:"handleChangeAddress",value:function(e){var t=e.target.value;Object(W.isValidChecksumAddress)(t,"30")?this.setState({address:t,error:null}):this.setState({error:"Invalid address"})}},{key:"confirm",value:function(e){e.preventDefault(),(0,this.props.confirmAddress)(this.state.address)}},{key:"render",value:function(){var e=this.props,t=e.labels,n=e.confirmedPrice,a=e.ownerAddress,l=this.state,i=l.address,o=l.error;return t&&n?a?r.a.createElement("p",null,"Owner address: ",a):r.a.createElement(F.a,{onSubmit:this.confirm},r.a.createElement(F.a.Group,null,r.a.createElement(F.a.Label,null,"Address to own the domains"),r.a.createElement(F.a.Control,{type:"text",onChange:this.handleChangeAddress}),o&&r.a.createElement(F.a.Label,{style:{color:"red"}},o),r.a.createElement(k.a,{type:"submit",disabled:!i||o},"Confirm"))):null}}]),t}(a.Component),z=Object(o.b)((function(e){var t=e.app;return{labels:t.labels,confirmedPrice:t.confirmedPrice,ownerAddress:t.ownerAddress}}),(function(e){return{confirmAddress:function(t){return e({type:"CONFIRM_ADDRESS",ownerAddress:t})}}}))(H),G=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(g.a)(t).call(this,e))).state={tx:null,confirmed:!1,error:null},n.commit=n.commit.bind(Object(y.a)(n)),n}return Object(C.a)(t,e),Object(v.a)(t,[{key:"commit",value:function(){var e=this,t=this.props,n=t.method,a=t.success,r=t.sender;n.send({from:r}).on("transactionHash",(function(t){e.setState({tx:t});var n=setInterval((function(){window.ethereum.sendAsync({method:"eth_getTransactionByHash",params:[t]},(function(t,r){t?e.setState({error:t}):r&&r.result&&r.result.blockNumber&&(e.setState({confirmed:!0}),a(),clearInterval(n))}))}),2e3)})).catch((function(t){return e.setState({error:t})}))}},{key:"render",value:function(){var e=this.props,t=e.from,n=e.to,a=this.state,l=a.tx,i=a.confirmed,o=a.error;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("label",null,"From ",t," to ",n)),r.a.createElement(d.a,null,r.a.createElement(k.a,{onClick:this.commit,disabled:!!l},"Sign"))),l&&r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("a",{href:"".concat("https://explorer.rsk.co/tx/").concat(l),target:"_blank",rel:"noopener noreferrer"},l))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,o,i?r.a.createElement("p",null,"Confirmed!"):r.a.createElement("p",null,"Waiting for confirmations...")))))}}]),t}(a.Component),V=n(64),$=new N.a("https://public-node.rsk.co"),J=new $.eth.Contract([{constant:!0,inputs:[{internalType:"bytes32",name:"label",type:"bytes32"},{internalType:"address",name:"nameOwner",type:"address"},{internalType:"bytes32",name:"secret",type:"bytes32"}],name:"makeCommitment",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],payable:!1,stateMutability:"pure",type:"function"},{constant:!0,inputs:[{internalType:"bytes32",name:"commitment",type:"bytes32"}],name:"canReveal",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}],"0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61");function Y(){return(Y=Object(w.a)(f.a.mark((function e(t,n,a){var r,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=[],l=0;l<t.length;l+=1)r.push(J.methods.makeCommitment($.utils.sha3(t[l]),n,a[l]).call());return e.abrupt("return",Promise.all(r));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(e,t){for(var n=[],a=0;a<e.length;a+=t)n.push(e.slice(a,a+t));return n}function q(e,t,n,a){if(e.length!==n.length)throw new Error("Invalid amount of secrets");for(var r=0;r<e.length;r+=1)if(!e[r].length>0||!e[r].match(/^[0-9a-z]+$/))throw new Error("Invalid label: ".concat(e[r]));if(!$.utils.isAddress(t))throw new Error("Invalid owner");for(var l=0;l<n.length;l+=1)if(!$.utils.isHexStrict(n[l])||66!==n[l].length)throw new Error("Invalid secret: ".concat(n[l]));if(!$.utils.isBN(a))throw new Error("Invalid duration")}function Q(){return(Q=Object(w.a)(f.a.mark((function e(t){var n,a,r,l,i,o,s=arguments;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=s.length>1&&void 0!==s[1]?s[1]:5e3,a=s.length>2&&void 0!==s[2]?s[2]:12e4,r=[],l=Number(new Date)+a,i=0;i<t.length;i+=1)r.push(t[i][t[i].length-1]);return o=function e(t,a){for(var i=[],o=0;o<r.length;o+=1)i.push(J.methods.canReveal(r[o]).call());Promise.all(i).then((function(r){r.every((function(e){return e}))?t(r):Number(new Date)<l?setTimeout(e,n,t,a):a(new Error("Polling timeout"))}))},e.abrupt("return",new Promise(o));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(e,t,n,a){var r=t.toLowerCase().slice(2),l=n.slice(2),i=$.utils.padLeft($.utils.numberToHex(a).slice(2),64,"0"),o=$.utils.asciiToHex(e).slice(2);return"".concat("0xc2c414c8").concat(r).concat(l).concat(i).concat(o)}function Z(e,t,n,a,r){for(var l=[],i=0;i<e.length;i+=1)l.push(X(e[i],t,n[i],a));var o="0x".concat(V.encode([r,l]).toString("hex"));return{size:e.length,data:o}}var ee=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(g.a)(t).call(this,e))).state={makingCommitments:!1,chunkedCommitments:null,chunkedDatas:null,from:null,startedPolling:!1,canReveal:!1,batch:null,rif:null},n.createCommitments=n.createCommitments.bind(Object(y.a)(n)),n.enableWallet=n.enableWallet.bind(Object(y.a)(n)),n}return Object(C.a)(t,e),Object(v.a)(t,[{key:"createCommitments",value:function(){var e=this,t=this.props,n=t.labels,a=t.ownerAddress,r=t.duration,l=t.ready,i=t.cost;if(n){for(var o=function(e){for(var t=[],n=0;n<e;n+=1)t.push($.utils.randomHex(32));return t}(n.length),s=K(n,30),c=K(o,30),u=[],m=0;m<s.length;m+=1)q(s[m],a.toLowerCase(),c[m],r),u.push(Z(s[m],a.toLowerCase(),c[m],r,i));this.setState({chunkedDatas:u}),function(e,t,n){return Y.apply(this,arguments)}(n,a.toLowerCase(),o).then((function(t){var n=K(t,250);l(n.length,u.length),e.setState({chunkedCommitments:n})}))}}},{key:"enableWallet",value:function(){var e=this;window.ethereum.enable().then((function(t){return e.setState({from:t[0]})}));var t=new N.a(window.web3),n=new t.eth.Contract([{constant:!1,inputs:[{internalType:"bytes32[]",name:"commitments",type:"bytes32[]"}],name:"batchCommit",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"}],"0x2beb2819e110b34c802c761e737470760af2057f"),a=new t.eth.Contract([{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"},{name:"_data",type:"bytes"}],name:"transferAndCall",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"}],"0x2acc95758f8b5f583470ba265eb685a8f45fc9d5");this.setState({batch:n,rif:a})}},{key:"shouldComponentUpdate",value:function(e,t){var n=this,a=e.missingCommitmentConfirmations,r=t.canReveal,l=t.startedPolling;0!==a||r||l||function(e){return Q.apply(this,arguments)}(this.state.chunkedCommitments,5e3,12e5).then((function(){return n.setState({canReveal:!0,startedPolling:!0})}));return!0}},{key:"render",value:function(){var e=this.props,t=e.labels,n=e.confirmedPrice,a=e.ownerAddress,l=e.missingCommitmentConfirmations,i=e.missingRegisterConfirmations,o=e.commitmentSuccess,s=e.registerSuccess,u=e.cost,m=this.state,d=m.chunkedCommitments,h=m.chunkedDatas,f=m.from,b=m.canReveal,p=m.batch,v=m.rif;if(!t||!n||!a)return null;if(d&&h){if(f){if(f&&d)return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Wallet address: ",f),r.a.createElement(c.a,null,d.map((function(e,n){return r.a.createElement(G,{key:n,from:250*n+1,to:250*(n+1)>=t.length?t.length:250*(n+1),sender:f,method:p.methods.batchCommit(e),success:o})}))),0===l&&!b&&r.a.createElement("p",null,"Polling until committed... this can take more than a minute."),0===l&&b&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Ready! Time to register!"),r.a.createElement(c.a,null,h.map((function(e,n){return r.a.createElement(G,{key:n,from:30*n+1,to:30*(n+1)>=t.length?t.length:30*(n+1),sender:f,method:v.methods.transferAndCall("0x2beb2819e110b34c802c761e737470760af2057f",u.mul($.utils.toBN(e.size)),e.data),success:s})})))),0===i&&r.a.createElement(O.a,{variant:"success"},"Success! Thanks for registering."));throw new Error("Unhandled state.")}return r.a.createElement(k.a,{onClick:this.enableWallet},"Enable wallet")}return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Prepare transactions transactions"),r.a.createElement(k.a,{onClick:this.createCommitments},"Prepare"))}}]),t}(a.Component),te=Object(o.b)((function(e){var t=e.app;return{labels:t.labels,confirmedPrice:t.confirmedPrice,duration:t.duration,cost:t.cost,ownerAddress:t.ownerAddress,missingCommitmentConfirmations:t.missingCommitmentConfirmations,missingRegisterConfirmations:t.missingRegisterConfirmations}}),(function(e){return{ready:function(t,n){return e(function(e,t){return{type:"READY",commitmentAmount:e,registerAmount:t}}(t,n))},commitmentSuccess:function(){return e({type:"SUCCESS_COMMITMENT"})},registerSuccess:function(){return e({type:"SUCCES_REGISTER"})}}}))(ee),ne=function(){return r.a.createElement(c.a,{style:{textAlign:"center"}},r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("h3",null,"Choose domains"),r.a.createElement(D,null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("hr",null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("h3",null,"Calculate price"),r.a.createElement(U,null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("hr",null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("h3",null,"Choose owner"),r.a.createElement(z,null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("hr",null))),r.a.createElement(u.a,null,r.a.createElement(d.a,null,r.a.createElement("h3",null,"Execute registration"),r.a.createElement(te,null))))},ae=Object(o.b)()((function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s,null),r.a.createElement(ne,null),r.a.createElement(m,null))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var re=n(27),le=(n(400),{labels:null,confirmedPrice:!1,duration:0,cost:null,totalRif:null,ownerAddress:null,missingCommitmentConfirmations:-1,missingRegisterConfirmations:-1}),ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LABELS_AVAILABLE":return Object(b.a)({},e,{labels:t.labels});case"CONFIRM_PRICE":return Object(b.a)({},e,{confirmedPrice:!0,duration:t.duration,cost:t.cost,totalRif:t.totalRif});case"CONFIRM_ADDRESS":return Object(b.a)({},e,{ownerAddress:t.ownerAddress});case"READY":return Object(b.a)({},e,{missingCommitmentConfirmations:t.commitmentAmount,missingRegisterConfirmations:t.registerAmount});case"SUCCESS_COMMITMENT":return Object(b.a)({},e,{missingCommitmentConfirmations:e.missingCommitmentConfirmations-1});default:return e}},oe=[];var se,ce=Object(re.e)(Object(re.c)({app:ie}),se,Object(re.d)(re.a.apply(void 0,oe)));i.a.render(r.a.createElement(o.a,{store:ce},r.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[172,1,2]]]);
//# sourceMappingURL=main.349310d6.chunk.js.map