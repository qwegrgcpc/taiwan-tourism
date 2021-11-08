import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Search/ScenicSpot',
    name: 'SearchScenicSpot',
    component: Home
  },
  {
    path: '/Search/Hotel',
    name: 'SearchHotel',
    component: Home
  },
  {
    path: '/Search/Restaurant',
    name: 'SearchRestaurant',
    component: Home
  },
  {
    path: '/Detail/ScenicSpot/:id',
    name: 'DetailScenicSpot',
    component: Home
  },
  {
    path: '/Detail/Hotel/:id',
    name: 'DetailHotel',
    component: Home
  },
  {
    path: '/Detail/Restaurant/:id',
    name: 'DetailRestaurant',
    component: Home
  },
  {
    path: '/ItineraryList',
    name: 'ItineraryList',
    component: Home
  },
  {
    path: '/Schedule/:id',
    name: 'Schedule',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
