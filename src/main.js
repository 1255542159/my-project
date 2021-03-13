import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/store"
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import RightContent from './layout/RightContent'
import tabNav from "./layout/tabNav";
import axios from 'axios';

import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('RightContent', RightContent)
Vue.component('tabNav',tabNav)
Vue.prototype.$axios = axios;

//
//
// router.beforeEach((to,from,next)=>{
//   //如果是登陆界面，则需要放行
//   if (to.path === '/login') {
//     next();
//   }else {
//     //否则检查用户角色
//     login.checkRole().then(resp=>{
//       console.log("resp === >"+resp.data.code)
//       if (resp.data.code === 203) {
//         // window.localStorage.setItem('avatar',resp.data.data.avatar)
//         // window.localStorage.setItem('username',resp.data.data.username)
//         // //成功,判断用户角色
//         // if(!resp.data.data.roles){
//         //   return
//         // }
//         // resp.data.data.roles.forEach(function (item,index){
//         // if(item.id === 1 || item.id === 2 || item.id === 3){
//         //   next();
//         // }else {
//         //   local.href="/login"
//         // }
//         // });
//         next();
//       }else if(resp.data.code === 403){
//         /*权限不足*/
//         next({
//           path:'/login'
//         })
//       } else {
//         next({
//           path:'/login'
//         })
//       }
//     })
//   }
// })
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
