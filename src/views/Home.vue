<template>
  <div class="home">
    <div class="wrapper justify-end">
      <!-- banner背景色塊 -->
      <div class="bannerBg">
        <div class="w-1/12 mr-3"></div>
        <div class="w-2/12 mr-3"></div>
        <div class="w-3/12"></div>
      </div>
      <!-- banner(含searchBar) -->
      <div class="banner">
        <img :src="bannerImg" />
        <div class="banner_intro">
          <p class="banner_title">{{ bannerInfo[searchTab].title }}</p>
          <p class="banner_subtitle">{{ bannerInfo[searchTab].subTitle }}</p>
        </div>
        <SearchBar v-model:tab="searchTab" class="searchBar" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    SearchBar
  },
  data() {
    return {
      bannerInfo: {
        scenicSpot: {
          title: '景點快搜',
          subTitle: '在頂溪，找到令你怦然心動的風景'
        },
        hotel: {
          title: '住宿推薦',
          subTitle: '享受一夜好眠，讓出遊心情更加分'
        },
        restaurant: {
          title: '必吃美食',
          subTitle: '匯聚八方好滋味，滿足每個挑剔的味蕾'
        }
      },
      searchTab: 'scenicSpot'
    }
  },
  computed: {
    bannerImg() {
      if (this.searchTab === 'scenicSpot') {
        return require('@/assets/images/photoScenicSpot.jpg')
      }
      if (this.searchTab === 'hotel') {
        return require('@/assets/images/photoHotel.jpeg')
      }
      if (this.searchTab === 'restaurant') {
        return require('@/assets/images/photoRestaurant.jpg')
      }
      return require('@/assets/images/empty.svg')
    }
  }
}
</script>
<style scoped>
.wrapper {
  @apply flex mx-auto px-4 mb-10 lg:px-8 relative;
}

.banner {
  @apply w-full z-10;
}

.banner > img {
  @apply h-60 w-full object-cover lg:w-8/12 lg:ml-auto;
}

.banner_intro {
  @apply h-20 p-3 bg-j-black-900 relative transform -translate-y-20 opacity-80;
}

.banner_title {
  @apply text-xl text-white lg:text-4xl lg:font-bold lg:text-j-black-900;
}

.banner_subtitle {
  @apply text-sm text-white lg:text-2xl lg:text-j-black-500;
}

.bannerBg {
  @apply absolute right-0 flex justify-end h-64 w-full lg:mt-10;
}

.bannerBg > div {
  @apply bg-j-blue-100 h-full;
}

.searchBar {
  @apply relative z-40 text-lg w-full -mt-12;
}

@screen lg {
  .wrapper {
    max-width: 1440px;
  }
  

  .bannerBg {
    max-width: 1440px;
  }

  .bannerBg,
  .banner > img {
    height: 640px;
  }

  .banner_intro {
    @apply absolute bg-none mt-24 opacity-100 bg-opacity-0;
    top: 240px;
  }

  .searchBar {
    @apply absolute z-40 text-lg mt-24 w-1/2;
    top: 368px;
  }
}
</style>
