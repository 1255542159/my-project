import Vue from "vue"
import Vuex from "vuex"
import layout from "./modules/index"
Vue.use(Vuex)

const store = new Vuex.Store({

  getters: {
    isCollapse: state => state.layout.isCollapse,
    userInfo: state => state.layout.userInfo,
  },
  modules: {
    layout
  }
})

export default store
