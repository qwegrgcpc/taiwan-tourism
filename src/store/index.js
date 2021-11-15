import { createStore } from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'
export default createStore({
  state: {
    searchData: [],
    favoriteList: getItem('favoriteList') || [],
    itineraryList: getItem('itineraryList') || []
  },
  mutations: {
    setSearchData(state, data) {
      state.searchData = data
    },
    addFavorite(state, favorite) {
      state.favoriteList.push(favorite)
      setItem('favoriteList', state.favoriteList)
    },
    removeFavorite(state, item) {
      const { id, category } = item
      const list = state.favoriteList.filter(
        (e) => e.id !== id && e.category !== category
      )
      state.favoriteList = list
      setItem('favoriteList', list)
    },
    addSchedule(state) {
      state.itineraryList.push({
        name: '',
        schedule: []
      })
      setItem('itineraryList', state.itineraryList)
    },
    removeSchedule(state, deleteIndex) {
      const list = state.itineraryList.filter((_, i) => i !== deleteIndex)
      setItem('itineraryList', list)
    }
  },
  actions: {},
  modules: {}
})
