<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import { fetchScenicSpotAll } from '@/apis/tourism'
export default {
  name: 'Home',
  components: {
    NavBar
  },
  mounted() {
    // example
    fetchScenicSpotAll({ $top: 30 }).then(({ data }) => {
      console.log(data)
    })
  }
}
</script>
