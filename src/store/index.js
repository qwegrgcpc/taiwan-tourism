import { createStore } from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'
export default createStore({
  state: {
    searchData: [],
    favoriteList: getItem('favoriteList') || [],
    itineraryList: getItem('itineraryList') || [],
  },
  mutations: {
    setSearchData(state, data) {
      state.searchData = data
    },
    addFavorite(state, favorite) {
      state.favoriteList.push(favorite)
      setItem('favoriteList', state.favoriteList)
    },
    removeFavorite(state, favorite) {
      const list = state.favoriteList.filter((item) => item !== favorite)
      state.favoriteList = list
      setItem('favoriteList', list)
    }
  },
  actions: {},
  modules: {}
})
