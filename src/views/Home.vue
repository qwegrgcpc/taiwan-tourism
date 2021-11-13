<template>
  <div class="home">
    <div class="wrapper">
      <SearchBar class="searchBar" />
      <div class="img">
        <img class="bg" :src="require(`@/assets/images/bg.svg`)" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
  },
};
</script>
<style scoped>
.wrapper {
  @apply flex justify-end mx-auto px-20;
}

.img {
  /* background-color: blue;  */
  width: 990px;
  height: 340px;
  z-index: 3;
}

.bg {
  /* font-size: 20px; */
  width: 340px;
  height: 990px;
  position: absolute;
  z-index: 2;
  @apply text-lg;
}
.searchBar {
  position: absolute;
  top: 170px;
  width: 938px;
  height: 175px;
  z-index: 5;
}
</style>