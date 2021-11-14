import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchScenicSpot from '../views/Search/ScenicSpot.vue'
import SearchHotel from '../views/Search/Hotel.vue'
import SearchRestaurant from '../views/Search/Restaurant.vue'
import DetailScenicSpot from '../views/Detail/ScenicSpot.vue'
import DetailHotel from '../views/Detail/Hotel.vue'
import DetailRestaurant from '../views/Detail/Restaurant.vue'
import ItineraryList from '../views/ItineraryList.vue'
import Schedule from '../views/Schedule/Modify.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Search/ScenicSpot',
    name: 'SearchScenicSpot',
    component: SearchScenicSpot
  },
  {
    path: '/Search/Hotel',
    name: 'SearchHotel',
    component: SearchHotel
  },
  {
    path: '/Search/Restaurant',
    name: 'SearchRestaurant',
    component: SearchRestaurant
  },
  {
    path: '/Detail/ScenicSpot/:id',
    name: 'DetailScenicSpot',
    component: DetailScenicSpot
  },
  {
    path: '/Detail/Hotel/:id',
    name: 'DetailHotel',
    component: DetailHotel
  },
  {
    path: '/Detail/Restaurant/:id',
    name: 'DetailRestaurant',
    component: DetailRestaurant
  },
  {
    path: '/ItineraryList',
    name: 'ItineraryList',
    component: ItineraryList
  },
  {
    path: '/Schedule/:id',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/Schedule/Modify/:id',
    name: 'ScheduleModify',
    component: Schedule
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
