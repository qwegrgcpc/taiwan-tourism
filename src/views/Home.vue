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
        <img src="@/assets/images/photoScenicSpot.jpg" />
        <div class="banner_intro">
          <p class="banner_title">景點快搜</p>
          <p class="banner_subtitle">在頂溪，找到令你怦然心動的風景</p>
        </div>
        <SearchBar class="searchBar" />
      </div>
    </div>
    <div class="contenrWrapper">
      <!-- 熱門景點 -->
      <div class="scenicSpotArea w-full overflow-hidden z-10">
        <p class="title xl:text-center sm:mb-6">
          熱門景點<span class="invisible lg:visible ml-10"
            >台灣最夯、最美麗的景點都在這裡</span
          >
        </p>
        <div class="cardGroup lg:justify-center">
          <ScenicSpotCard v-for="i in 3" :key="'ScenicSpotCard' + i" />
        </div>
        <div class="more_btn mt-8 mx-auto">更多</div>
      </div>
      <div class="cardBg"></div>
    </div>
    <div class="contenrWrapper">
      <div class="hotelArea w-full overflow-hidden">
        <div class="flex items-center mb-5">
          <p class="title">
            熱門旅宿<span class="invisible lg:visible ml-5"
              >台灣最夯、最美麗的景點都在這裡</span
            >
          </p>
          <div class="more_btn white_btn ml-auto">更多</div>
        </div>
        <div class="cardGroup">
          <HotelCard v-for="i in 4" :key="'HotelCard' + i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ScenicSpotCard from "@/components/ScenicSpotCard.vue";
import HotelCard from "@/components/HotelCard.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
    HotelCard,
    ScenicSpotCard,
  },
};
</script>
<style scoped>
.wrapper {
  @apply flex mx-auto px-4 mb-10;
}

.contenrWrapper {
  @apply wrapper;
}

.banner {
  @apply w-full z-10;
}

.banner > img {
  @apply h-60 w-full object-cover;
}

.banner_intro {
  @apply h-20 p-3 bg-j-black-900 relative transform -translate-y-20 opacity-80;
}

.banner_title {
  @apply text-xl text-white;
}

.banner_subtitle {
  @apply text-sm text-white;
}

.bannerBg {
  @apply absolute right-0 flex justify-end h-64 w-full;
}

.bannerBg > div {
  @apply bg-j-blue-100 h-full;
}

.searchBar {
  @apply relative z-40 text-lg w-full -mt-12;
}

.title {
  @apply text-2xl font-bold text-j-black-900;
}

.title::before {
  content: "";
  @apply relative inline-block bg-j-orange w-1 h-5 mr-5;
}

.cardGroup {
  display: -webkit-box;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @apply overflow-x-scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.cardGroup::-webkit-scrollbar {
  display: none;
}

.cardGroup > div {
  @apply mr-9;
}

.cardGroup div:last-child {
  @apply mr-0;
}

.cardBg {
  height: 260px;
  @apply z-0 absolute bg-j-blue-100 w-full transform -translate-x-4 translate-y-44;
}

.more_btn {
  @apply w-20 h-10 bg-j-black-900 leading-10 text-white text-xl rounded-3xl text-center cursor-pointer;
}

.white_btn {
  @apply bg-white text-j-black-900 border border-j-black-900;
}

@screen lg {
  .wrapper {
    @apply px-8;
  }

  .contenrWrapper {
    max-width: 1440px;
    @apply px-20;
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

  .bannerBg {
    height: 640px;
    @apply mt-10;
  }

  .title {
    @apply text-4xl;
  }

  .title > span {
    @apply text-lg text-j-black-500 font-medium align-middle leading-5;
  }

  .scenicSpotArea {
    @apply px-10 mt-24;
  }

  .scenicSpotArea > .title::before {
    content: "";
    @apply absolute bg-j-orange w-1.5 h-7 transform translate-x-40 translate-y-1;
  }

  .cardGroup {
    @apply overflow-hidden flex;
  }

  .cardBg {
    height: 320px;
    @apply rounded-2xl mt-24 max-w-7xl left-1/2 -translate-x-1/2;
  }
}
</style>