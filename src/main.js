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
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('RightContent', RightContent)
Vue.component('tabNav',tabNav)
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
