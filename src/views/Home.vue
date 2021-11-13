<template>
  <div class="home">
    <div class="wrapper">
      <div class="bg">
        <div class="w-1/12 mr-3"></div>
        <div class="w-2/12 mr-3"></div>
        <div class="w-3/12"></div>
      </div>
      <div class="banner">
        <img src="@/assets/images/photoScenicSpot.jpg" />
        <div class="banner_intro">
          <p class="banner_title">景點快搜</p>
          <p class="banner_subtitle">在頂溪，找到令你怦然心動的風景</p>
        </div>
        <SearchBar v-if="true" class="searchBar" />
      </div>
    </div>
  </div>
</template>

<script>
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
  @apply flex justify-end mx-auto px-4;
}

.banner {
  @apply w-full z-10;
}

.banner > img {
  @apply h-60 w-full object-cover;
}

.banner_intro {
  @apply h-20 p-3 w-full bg-j-black-900 relative transform -translate-y-20 opacity-80;
}

.banner_title {
  @apply text-xl text-white;
}

.banner_subtitle {
  @apply text-sm text-white;
}

.bg {
  @apply absolute right-0 flex justify-end h-64 w-full;
}

.bg > div {
  @apply bg-j-blue-100 h-full;
}

.searchBar {
  @apply absolute z-40 text-lg w-full -mt-12;
}

@screen lg {
  .wrapper {
    @apply px-8;
  }

  .banner > img {
    height: 640px;
    @apply w-8/12 ml-auto;
  }

  .banner_intro {
    @apply absolute bg-none mt-24 opacity-100 bg-opacity-0;
    top: 240px;
  }

  .banner_title {
    @apply text-4xl font-bold text-j-black-900;
  }

  .banner_subtitle {
    @apply text-2xl text-j-black-500;
  }

  .searchBar {
    @apply absolute z-40 text-lg mt-24 w-1/2;
    top: 368px;
  }

  .bg{
    height: 640px;
    @apply mt-10
  }
}
</style>