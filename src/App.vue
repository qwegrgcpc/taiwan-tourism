<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import {
  // fetchScenicSpotAll,
  // fetchRestaurantAll,
  // fetchHotelAll
} from '@/apis/tourism'
export default {
  name: 'Home',
  components: {
    NavBar
  },
  mounted() {
    // example
    // fetchScenicSpotAll({ }).then(({ data }) => {
    //   console.log(data)
    // })
    // fetchRestaurantAll({ $top: 10 }).then(({ data }) => {
    //   console.log(data)
    // })
    // fetchHotelAll({ $top: 10 }).then(({ data }) => {
    //   console.log(data)
    // })
  }
}
</script>
