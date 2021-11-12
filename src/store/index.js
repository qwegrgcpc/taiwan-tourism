import { createStore } from 'vuex'

export default createStore({
  state: {
    searchData: []
  },
  mutations: {
    setSearchData(state,data) {
      state.searchData = data
    }
  },
  actions: {},
  modules: {}
})
