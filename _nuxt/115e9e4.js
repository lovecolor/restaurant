(window.webpackJsonp=window.webpackJsonp||[]).push([[12,6,7,8],{388:function(t,e,r){var content=r(394);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(88).default)("58778860",content,!0,{sourceMap:!1})},391:function(t,e,r){var content=r(397);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(88).default)("447b5994",content,!0,{sourceMap:!1})},393:function(t,e,r){"use strict";r(388)},394:function(t,e,r){var n=r(87)(!1);n.push([t.i,".table-card{width:100%;height:300px;display:flex;align-items:center;justify-content:center}.table-text{font-size:50px;font-weight:700}.table-un-delivered{background:#f56c6c}.table-delivered{background:#67c23a}.table-focus{border:5px solid red}",""]),t.exports=n},395:function(t,e,r){"use strict";r.r(e);var n={props:["tables","focus"],methods:{handleClickTable:function(table){this.$emit("clickTable",table)}}},c=(r(393),r(51)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{staticClass:"p-3",attrs:{gutter:20}},t._l(t.tables,(function(table,e){return r("el-col",{key:table.id||e,attrs:{span:8,xs:24}},[r("div",{on:{click:function(r){return t.handleClickTable(e)}}},[r("el-card",{class:["table-card mb-3",{"table-delivered":!!table.data&&!!table.delivered&&table.delivered},{"table-un-delivered":!!table.data&&!table.delivered},{"table-focus":e===t.focus}],attrs:{"body-style":{padding:"0px"}}},[r("span",{staticClass:"table-text"},[t._v("\n          "+t._s(table.id||e+1)+"\n        ")])])],1)])})),1)}),[],!1,null,null,null);e.default=component.exports},396:function(t,e,r){"use strict";r(391)},397:function(t,e,r){var n=r(87)(!1);n.push([t.i,'.time{font-size:13px;color:#999}.bottom{margin-top:13px;line-height:12px}.button{padding:0;float:right}.image{width:100%;-o-object-fit:cover;object-fit:cover;height:300px;display:block}.clearfix:after,.clearfix:before{display:table;content:""}.clearfix:after{clear:both}',""]),t.exports=n},398:function(t,e,r){"use strict";r.r(e);var n={props:["product"],methods:{handleClickProduct:function(){this.$emit("pickProduct",this.product)}}},c=(r(396),r(51)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:t.handleClickProduct}},[r("el-col",{staticClass:"mb-3",attrs:{span:8,xs:24}},[r("el-card",{attrs:{"body-style":{padding:"0px"}}},[r("img",{staticClass:"image",attrs:{src:t.product.src}}),t._v(" "),r("div",{staticStyle:{padding:"14px"}},[r("span",[t._v(t._s(t.product.name))]),t._v(" "),r("div",{staticClass:"bottom clearfix"},[r("span",{staticClass:"time"},[t._v(t._s(t.product.price)+" đồng")])])])])],1)],1)}),[],!1,null,null,null);e.default=component.exports},400:function(t,e,r){"use strict";r.r(e);var n={props:["products"],methods:{handlePickProduct:function(t){this.$emit("pickProduct",t)}}},c=r(51),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{attrs:{gutter:20}},t._l(t.products,(function(e,n){return r("product-item",{key:n,attrs:{product:e},on:{pickProduct:t.handlePickProduct}})})),1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProductItem:r(398).default})},410:function(t,e,r){var content=r(433);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(88).default)("1b7833da",content,!0,{sourceMap:!1})},431:function(t,e,r){"use strict";var n=r(3),c=r(92).find,o=r(182),l="find",d=!0;l in[]&&Array(1).find((function(){d=!1})),n({target:"Array",proto:!0,forced:d},{find:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}}),o(l)},432:function(t,e,r){"use strict";r(410)},433:function(t,e,r){var n=r(87)(!1);n.push([t.i,".el-header{background:#409eff}.el-message-box{min-width:350px}",""]),t.exports=n},450:function(t,e,r){"use strict";r.r(e);r(41),r(52),r(89),r(42),r(90);var n=r(2),c=r(39),o=(r(17),r(431),r(10),r(53),r(398)),l=r(395);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={components:{ProductItem:o.default,Tables:l.default},name:"IndexPage",data:function(){return{products:[],loading:null,productPicking:null,cart:[]}},beforeDestroy:function(){localStorage.setItem("cart",JSON.stringify(this.cart))},methods:{goToTables:function(){this.$router.push("/tables")},goToCart:function(){this.$router.push("/cart")},pickProduct:function(t){var e=this;this.$prompt("Please input quantity","Quantity",{confirmButtonText:"OK",cancelButtonText:"Cancel",inputPattern:/^[1-9]\d*$/,inputValue:1,inputErrorMessage:"Invalid Quantity"}).then((function(r){var n=r.value,c=e.cart.find((function(e){return e.id===t.id}));c?(c.quantity+=n,c.price+=n*t.price):e.cart.push(f(f({},t),{},{quantity:n,price:t.price*n})),e.$message({showClose:!0,type:"success",message:"Success"})}))},startLoading:function(){this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},stopLoading:function(){this.loading.close()},fetchProducts:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.startLoading(),e.next=3,t.$fire.database.ref("products").get();case 3:r=e.sent,n=r.val(),t.products=Object.keys(n).reduce((function(t,e){return t.push(f(f({},n[e]),{},{id:e})),t}),[]),t.stopLoading();case 7:case"end":return e.stop()}}),e)})))()},getCart:function(){this.cart=JSON.parse(localStorage.getItem("cart"))||[]}},created:function(){this.fetchProducts(),this.getCart()}},v=(r(432),r(51)),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-container",[r("el-header",{staticClass:"d-flex align-items-center justify-content-between"},[r("el-button",{attrs:{icon:"el-icon-office-building"},on:{click:t.goToTables}}),r("el-badge",{attrs:{value:t.cart.length}},[r("el-button",{attrs:{icon:"el-icon-shopping-cart-2"},on:{click:t.goToCart}})],1)],1),t._v(" "),r("el-main",[r("div",{staticClass:"d-flex justify-content-center mb-1"},[r("h3",[t._v("MENU")])]),t._v(" "),r("product-list",{attrs:{products:t.products},on:{pickProduct:t.pickProduct}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProductList:r(400).default})}}]);