(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{409:function(t,e,n){var content=n(430);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(88).default)("16552b61",content,!0,{sourceMap:!1})},429:function(t,e,n){"use strict";n(409)},430:function(t,e,n){var l=n(87)(!1);l.push([t.i,".el-icon-back{font-size:50px;color:#000}",""]),t.exports=l},449:function(t,e,n){"use strict";n.r(e);var l=n(2),o=(n(17),{data:function(){return{meals:[],loading:null,id:null}},methods:{startLoading:function(){this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},stopLoading:function(){this.loading.close()},fetchTable:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.startLoading(),e.next=3,t.$fire.database.ref("tables/".concat(t.id)).get();case 3:n=e.sent,t.meals=n.val().data||[],t.stopLoading();case 6:case"end":return e.stop()}}),e)})))()}},created:function(){this.id=this.$route.params.id,this.fetchTable()}}),r=(n(429),n(51)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("nuxt-link",{attrs:{to:"/tables"}},[n("i",{staticClass:"el-icon-back"})])],1),t._v(" "),n("div",{staticClass:"d-flex justify-content-center mt-3"},[n("h3",[t._v("Table "+t._s(+t.id+1))])]),t._v(" "),n("el-table",{staticClass:"my-3",staticStyle:{width:"100%"},attrs:{data:t.meals,border:"","show-summary":""}},[n("el-table-column",{attrs:{prop:"name",label:"Name"}}),t._v(" "),n("el-table-column",{attrs:{prop:"quantity",label:"Quantity"}}),t._v(" "),n("el-table-column",{attrs:{prop:"price",label:"Price"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);