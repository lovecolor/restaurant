(window.webpackJsonp=window.webpackJsonp||[]).push([[13,6,7],{391:function(t,e,r){var content=r(397);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(88).default)("447b5994",content,!0,{sourceMap:!1})},396:function(t,e,r){"use strict";r(391)},397:function(t,e,r){var n=r(87)(!1);n.push([t.i,'.time{font-size:13px;color:#999}.bottom{margin-top:13px;line-height:12px}.button{padding:0;float:right}.image{width:100%;-o-object-fit:cover;object-fit:cover;height:300px;display:block}.clearfix:after,.clearfix:before{display:table;content:""}.clearfix:after{clear:both}',""]),t.exports=n},398:function(t,e,r){"use strict";r.r(e);var n={props:["product"],methods:{handleClickProduct:function(){this.$emit("pickProduct",this.product)}}},o=(r(396),r(51)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:t.handleClickProduct}},[r("el-col",{staticClass:"mb-3",attrs:{span:8,xs:24}},[r("el-card",{attrs:{"body-style":{padding:"0px"}}},[r("img",{staticClass:"image",attrs:{src:t.product.src}}),t._v(" "),r("div",{staticStyle:{padding:"14px"}},[r("span",[t._v(t._s(t.product.name))]),t._v(" "),r("div",{staticClass:"bottom clearfix"},[r("span",{staticClass:"time"},[t._v(t._s(t.product.price)+" đồng")])])])])],1)],1)}),[],!1,null,null,null);e.default=component.exports},400:function(t,e,r){"use strict";r.r(e);var n={props:["products"],methods:{handlePickProduct:function(t){this.$emit("pickProduct",t)}}},o=r(51),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{attrs:{gutter:20}},t._l(t.products,(function(e,n){return r("product-item",{key:n,attrs:{product:e},on:{pickProduct:t.handlePickProduct}})})),1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProductItem:r(398).default})},405:function(t,e,r){var content=r(418);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(88).default)("387b7350",content,!0,{sourceMap:!1})},417:function(t,e,r){"use strict";r(405)},418:function(t,e,r){var n=r(87)(!1);n.push([t.i,".el-icon-back{font-size:50px;font-weight:700}.form-change-product{position:fixed;top:50%;z-index:1000;left:50%;transform:translateX(-50%) translateY(-50%);background:#fff;border:1px solid #d3d3d3;padding:1rem}",""]),t.exports=n},445:function(t,e,r){"use strict";r.r(e);var n=r(39),o=r(2);r(17),r(10),r(53),r(41),r(52),r(89),r(42),r(90);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={data:function(){return{products:[],showFormChangeProduct:!1,loading:null,newProductData:{name:"",price:0,src:""}}},methods:{handleChangeProduct:function(){this.$fire.database.ref("products/".concat(this.newProductData.id)).set(this.newProductData),this.showFormChangeProduct=!1},startLoading:function(){this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},stopLoading:function(){this.loading.close()},changeProduct:function(t){this.newProductData=t,this.showFormChangeProduct=!0},fetchProducts:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.startLoading(),e.next=3,t.$fire.database.ref("products").get();case 3:r=e.sent,n=r.val(),t.products=Object.keys(n).reduce((function(t,e){return t.push(l(l({},n[e]),{},{id:e})),t}),[]),t.stopLoading();case 7:case"end":return e.stop()}}),e)})))()}},created:function(){this.fetchProducts()}},f=(r(417),r(51)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-container",[r("el-header",{staticClass:"d-flex justify-content-between align-items-center"},[r("nuxt-link",{attrs:{to:"/"}},[r("i",{staticClass:"el-icon-back"})]),r("nuxt-link",{attrs:{to:"/products/new"}},[r("el-button",[t._v("NEW")])],1)],1),t._v(" "),r("el-main",[r("product-list",{attrs:{products:t.products},on:{pickProduct:t.changeProduct}})],1),t._v(" "),t.showFormChangeProduct?r("el-form",{staticClass:"form-change-product"},[r("el-input",{staticClass:"mb-3",attrs:{placeholder:"Name"},model:{value:t.newProductData.name,callback:function(e){t.$set(t.newProductData,"name",e)},expression:"newProductData.name"}}),t._v(" "),r("el-input",{staticClass:"mb-3",attrs:{placeholder:"Image"},model:{value:t.newProductData.src,callback:function(e){t.$set(t.newProductData,"src",e)},expression:"newProductData.src"}}),t._v(" "),r("el-input",{staticClass:"mb-3",attrs:{placeholder:"Price"},model:{value:t.newProductData.price,callback:function(e){t.$set(t.newProductData,"price",e)},expression:"newProductData.price"}}),t._v(" "),r("div",{staticClass:"d-flex justify-content-center"},[r("el-button",{attrs:{type:"primary"},on:{click:t.handleChangeProduct}},[t._v("CHANGE")])],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProductList:r(400).default})}}]);