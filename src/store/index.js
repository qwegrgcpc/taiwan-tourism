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
        (e) => !(e.id === id && e.category === category)
      )
      state.favoriteList = list
      setItem('favoriteList', list)
    },
    addSchedule(state) {
      state.itineraryList.push({
        index: Date.now(),
        name: '',
        schedule: []
      })
      setItem('itineraryList', state.itineraryList)
    },
    removeSchedule(state, deleteIndex) {
      const list = state.itineraryList.filter((e) => e.index !== deleteIndex)
      state.itineraryList = list
      setItem('itineraryList', list)
    },
    updateSchedule(state, { index, item }) {
      state.itineraryList.find((item) => item.index === index).schedule = item
      setItem('itineraryList', state.itineraryList)
    },
    updateScheduleName(state, { index, name }) {
      state.itineraryList.find((item) => item.index === index).name = name
      setItem('itineraryList', state.itineraryList)
    }
  },
  actions: {},
  modules: {}
})
