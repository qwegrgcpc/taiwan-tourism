<template>
  <div class="home">
    <template v-for="i in 10" :key="i">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
