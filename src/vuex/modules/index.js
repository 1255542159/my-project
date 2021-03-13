
export default {
  state: {
    isCollapse: false,
    userInfo: "",
  },

  mutations: {
    collapse(state, arg) {
      state.isCollapse = !state.isCollapse
    },
    userInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    collapse({ commit }, arg) {
      commit("collapse", arg)
    },
    userInfo({ commit }, data) {
      commit("userInfo", data)
    }
  }
}
