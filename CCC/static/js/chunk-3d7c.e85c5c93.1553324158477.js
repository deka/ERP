(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3d7c"],{"12k2":function(e,t,n){"use strict";var a=n("EOiI");n.n(a).a},EOiI:function(e,t,n){},"gDS+":function(e,t,n){e.exports={default:n("oh+g"),__esModule:!0}},mMdc:function(e,t,n){"use strict";n.r(t);var a=n("4d7F"),r=n.n(a),i=n("gDS+"),o=n.n(i),s=n("6HaC"),l=n("moiu"),p={name:"NewApprovalProcess",components:{MyEmp:n("1ZjH").a},data:function(){return{stepHandler:"",handlerName:"",empcontrol:!1,categorys:[],validRules:{step:[{required:!0,message:"请输入流程步骤",trigger:"blur"}],handlerName:[{required:!0,message:"请选择步骤处理人",trigger:"blue"}]},moreaction:"",loading:!1,list2:[],regions:[],repositories:[],props:{value:"id",label:"regionName",children:"regionListVos"},personalForm:{region:[]},personalrules:{is_effective:[{required:!0,message:"请选择启用状态",trigger:"change"}],process_name:[{required:!0,message:"请输入流程名称",trigger:"blur"}],type:[{required:!0,message:"请选择单据类型",trigger:"change"}],region:[{required:!0,message:"请选择区域",trigger:"change"}]}}},created:function(){this.getnationlist()},methods:{getnationlist:function(){var e=this;Object(s.h)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))}),Object(l.t)().then(function(t){200===t.data.ret&&(e.categorys=t.data.data.content)})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handlechange4:function(e){var t=this,n=e[e.length-1];this.personalForm.effect_region=n,Object(s.i)(n).then(function(e){console.log(e),200===e.data.ret?t.repositories=e.data.data.content.list:t.$notify.error({title:"错误",message:"出错了",offset:100})})},restAllForm:function(){this.personalForm={}},handlesave:function(){var e=this;console.log(this.personalForm);var t=o()(this.$refs.editable.getRecords());console.log(t),this.$refs.personalForm.validate(function(n){if(!n)return e.$notify.error({title:"错误",message:"信息未填完整",offset:100}),!1;e.$refs.editable.validate(function(n){n&&Object(l.e)(e.personalForm,t).then(function(t){console.log(t),200===t.data.ret?(e.$notify({title:"成功",message:"保存成功",type:"success",offset:100}),e.restAllForm(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields(),e.$refs.editable.clear()):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})})})},handlecancel:function(){this.$router.go(-1);this.$store.dispatch("delView",{path:"/BasicSettings/NewApprovalProcess",name:"NewApprovalProcess",fullPath:"/BasicSettings/NewApprovalProcess",title:"NewApprovalProcess"}).then(function(e){e.visitedViews})},handlechoose:function(){this.empcontrol=!0},fuzhi:function(e){e.row.handlerName=this.handlerName},personName:function(e){this.handlerName=e.personName,this.stepHandler=e.id},chuli:function(e){e.row.handlerName=this.handlerName,e.row.stepHandler=this.stepHandler},postJSON:function(e){return new r.a(function(e){setTimeout(function(){e("保存成功")},300)})},selectEvent:function(e,t){console.log(e),console.log(t)},insertEvent:function(e){var t=this,n=this.$refs.editable.insertAt({money:0},e);this.$nextTick(function(){return t.$refs.editable.setActiveCell(n,"handlerName")})},currentChangeEvent:function(e,t){console.log(e)}}},c=(n("12k2"),n("KHd+")),d=Object(c.a)(p,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ERP-container"},[n("div",{staticClass:"app-container"},[n("h2",{ref:"geren",staticClass:"form-name"},[e._v("基本信息")]),e._v(" "),n("div",{staticClass:"container"},[n("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,inline:!0,"status-icon":"","label-position":"top","label-width":"300px"}},[n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.process_name"),prop:"process_name"}},[n("el-input",{attrs:{placeholder:"请输入流程名称",clearable:""},model:{value:e.personalForm.process_name,callback:function(t){e.$set(e.personalForm,"process_name",t)},expression:"personalForm.process_name"}})],1),e._v(" "),n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.is_effective"),prop:"is_effective"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择启用状态"},model:{value:e.personalForm.is_effective,callback:function(t){e.$set(e.personalForm,"is_effective",t)},expression:"personalForm.is_effective"}},[n("el-option",{attrs:{label:"active",value:"1"}}),e._v(" "),n("el-option",{attrs:{label:"dead",value:"2"}})],1)],1),e._v(" "),n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.type3"),prop:"type"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择单据类型",filterable:""},model:{value:e.personalForm.type,callback:function(t){e.$set(e.personalForm,"type",t)},expression:"personalForm.type"}},e._l(e.categorys,function(e,t){return n("el-option",{key:t,attrs:{value:e.id,label:e.categoryName}})}))],1),e._v(" "),n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.is_message")}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.personalForm.is_message,callback:function(t){e.$set(e.personalForm,"is_message",t)},expression:"personalForm.is_message"}},[n("el-option",{attrs:{label:"发送",value:"1"}}),e._v(" "),n("el-option",{attrs:{label:"不发送",value:"2"}})],1)],1),e._v(" "),n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.effect_region"),prop:"region"}},[n("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.regions,props:e.props,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.personalForm.region,callback:function(t){e.$set(e.personalForm,"region",t)},expression:"personalForm.region"}})],1),e._v(" "),n("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.effect_repository")}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择门店"},model:{value:e.personalForm.effect_repository,callback:function(t){e.$set(e.personalForm,"effect_repository",t)},expression:"personalForm.effect_repository"}},e._l(e.repositories,function(e,t){return n("el-option",{key:t,attrs:{label:e.repositoryName,value:e.id}})}))],1)],1)],1),e._v(" "),n("h2",{ref:"fuzhu",staticClass:"form-name"},[e._v("审批流程步骤")]),e._v(" "),n("div",{staticClass:"buttons",staticStyle:{"margin-top":"50px"}},[n("el-button",{attrs:{type:"success"},on:{click:function(t){e.insertEvent(-1)}}},[e._v("添加")]),e._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.$refs.editable.removeSelecteds()}}},[e._v("删除")])],1),e._v(" "),n("div",{staticClass:"container"},[n("el-editable",{ref:"editable",staticClass:"click-table1",staticStyle:{width:"100%"},attrs:{data:e.list2,"edit-config":{showIcon:!1,showStatus:!0},"edit-rules":e.validRules,stripe:"",border:"",size:"medium"},on:{select:e.selectEvent,"current-change":e.currentChangeEvent}},[n("el-editable-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),n("el-editable-column",{attrs:{"edit-render":{name:"ElInputNumber",attrs:{min:1,max:5e3}},label:"流程步骤",prop:"step",align:"center",width:"150px"}}),e._v(" "),n("el-editable-column",{attrs:{"edit-render":{name:"ElInput"},prop:"description",align:"center",label:"步骤描述",width:"500px"}}),e._v(" "),n("el-editable-column",{attrs:{"edit-render":{name:"ElInputNumber",attrs:{min:0}},prop:"money",align:"center",label:"流转条件",width:"400px"}}),e._v(" "),n("el-editable-column",{attrs:{"edit-render":{type:"default"},prop:"handlerName",align:"center",label:"步骤处理人","min-width":"500px"},scopedSlots:e._u([{key:"edit",fn:function(t){return[n("input",{staticClass:"editable-custom_input",on:{focus:e.handlechoose}}),e._v(" "),n("my-emp",{attrs:{control:e.empcontrol},on:{"update:control":function(t){e.empcontrol=t},personName:e.personName,chuli:function(n){e.chuli(t)}}})]}}])})],1)],1),e._v(" "),n("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v("保存")]),e._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v("取消")])],1)])])},[],!1,null,"3c18adfc",null);d.options.__file="NewApprovalProcess.vue";t.default=d.exports},moiu:function(e,t,n){"use strict";n.d(t,"t",function(){return r}),n.d(t,"p",function(){return i}),n.d(t,"h",function(){return o}),n.d(t,"c",function(){return s}),n.d(t,"u",function(){return l}),n.d(t,"n",function(){return p}),n.d(t,"b",function(){return c}),n.d(t,"y",function(){return d}),n.d(t,"k",function(){return u}),n.d(t,"r",function(){return f}),n.d(t,"f",function(){return m}),n.d(t,"x",function(){return v}),n.d(t,"j",function(){return g}),n.d(t,"o",function(){return h}),n.d(t,"l",function(){return y}),n.d(t,"e",function(){return _}),n.d(t,"d",function(){return b}),n.d(t,"q",function(){return N}),n.d(t,"s",function(){return w}),n.d(t,"g",function(){return S}),n.d(t,"w",function(){return E}),n.d(t,"m",function(){return O}),n.d(t,"a",function(){return x}),n.d(t,"v",function(){return P}),n.d(t,"i",function(){return F});var a=n("t3Un");function r(){return Object(a.a)({url:"/erp/NumberingRules/searchcategory",method:"post"})}function i(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/erp/NumberingRules/search",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(a.a)({url:"/erp/NumberingRules/delete",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(a.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(a.a)({url:"/erp/NumberingRules/update",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/erp/messageModel/modellist",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(a.a)({url:"/erp/messageModel/addmodel",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("modelid",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.modelName&&null!==e.modelName&&void 0!==e.modelName&&t.append("modelname",e.modelName),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(a.a)({url:"/erp/messageModel/updatemodel",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(a.a)({url:"/erp/messageModel/deletemodel",method:"post",data:t})}function f(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/erp/measurement/search",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.category&&null!==e.category&&void 0!==e.category&&t.append("category",e.category),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),Object(a.a)({url:"/erp/measurement/create",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.categoryName&&null!==e.categoryName&&void 0!==e.categoryName&&t.append("categoryname",e.categoryName),Object(a.a)({url:"/erp/measurement/update",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(a.a)({url:"/erp/measurement/delete",method:"post",data:t})}function h(){return Object(a.a)({url:"/erp/parameter/search",method:"post"})}function y(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("isEffective",e.isEffective),Object(a.a)({url:"/erp/parameter/effective",method:"post",data:t})}function _(e,t){var n=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&n.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&n.append("type",e.type),""!==e.is_message&&null!==e.is_message&&void 0!==e.is_message&&n.append("is_message",e.is_message),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&n.append("is_effective",e.is_effective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&n.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&n.append("effect_repository",e.effect_repository),""!==e.country_id&&null!==e.country_id&&void 0!==e.country_id&&n.append("country_id",e.country_id),""!==t&&null!==t&&void 0!==t&&n.append("detailJson",t),Object(a.a)({url:"/erp/approvalProcess/create",method:"post",data:n})}function b(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(a.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function N(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("id",e),Object(a.a)({url:"/erp/approvalProcess/searchDetail",method:"post",data:t})}function w(e){var t=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&t.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&t.append("is_effective",e.is_effective),t.append("pagesize",e.pagesize),t.append("pagenum",e.pagenum),Object(a.a)({url:"/erp/approvalProcess/search",method:"post",data:t})}function S(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(a.a)({url:"/erp/approvalProcess/delete",method:"post",data:t})}function E(e,t){var n=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&n.append("id",e.id),""!==e.processName&&null!==e.processName&&void 0!==e.processName&&n.append("process_name",e.processName),""!==e.type&&null!==e.type&&void 0!==e.type&&n.append("type",e.type),""!==e.isMessage&&null!==e.isMessage&&void 0!==e.isMessage&&n.append("is_message",e.isMessage),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&n.append("is_effective",e.isEffective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&n.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&n.append("effect_repository",e.effect_repository),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&n.append("country_id",e.countryId),""!==t&&null!==t&&void 0!==t&&n.append("detailJson",t),Object(a.a)({url:"/erp/approvalProcess/update",method:"post",data:n})}function O(){return Object(a.a)({url:"/erp/country/getdeptlist",method:"post"})}function x(e){var t=new URLSearchParams;return""!==e.deptno&&null!==e.deptno&&void 0!==e.deptno&&t.append("deptno",e.deptno),""!==e.deptname&&null!==e.deptname&&void 0!==e.deptname&&t.append("deptname",e.deptname),Object(a.a)({url:"/erp/country/adddept",method:"post",data:t})}function P(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("deptid",e.id),""!==e.deptNo&&null!==e.deptNo&&void 0!==e.deptNo&&t.append("deptno",e.deptNo),""!==e.deptName&&null!==e.deptName&&void 0!==e.deptName&&t.append("deptname",e.deptName),Object(a.a)({url:"/erp/country/updatedept",method:"post",data:t})}function F(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(a.a)({url:"/erp/country/deletedept",method:"post",data:t})}},"oh+g":function(e,t,n){var a=n("WEpk"),r=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}}}]);