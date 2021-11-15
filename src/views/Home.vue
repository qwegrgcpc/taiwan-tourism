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
        <img
          v-if="searchTab === 'hotel'"
          src="@/assets/images/photoHotel.jpeg"
        />
        <img
          v-else-if="searchTab === 'restaurant'"
          src="@/assets/images/photoRestaurant.jpg"
        />
        <img v-else src="@/assets/images/photoScenicSpot.jpg" />
        <div class="banner_intro">
          <p class="banner_title">{{ bannerInfo[searchTab].title }}</p>
          <p class="banner_subtitle">{{ bannerInfo[searchTab].subTitle }}</p>
        </div>
        <SearchBar v-model:tab="searchTab" class="searchBar" />
      </div>
    </div>
    <div class="contentWrapper">
      <!-- 熱門景點 -->
      <div class="scenicSpotArea w-full overflow-hidden z-10">
        <p class="title xl:text-center mb-6">
          熱門景點<span class="hidden lg:inline ml-10"
            >台灣最夯、最美麗的景點都在這裡</span
          >
        </p>
        <div class="cardGroup lg:justify-center">
          <ScenicSpotCard
            v-for="data in defaultData.scenicSpot"
            :cardData="data"
            :key="data.ID"
          />
        </div>
        <div class="more_btn mt-8 mx-auto">更多</div>
      </div>
      <div class="cardBg"></div>
    </div>
    <!-- 熱門旅宿 -->
    <div class="contentWrapper">
      <div class="hotelArea w-full overflow-hidden">
        <div class="flex items-center mb-5">
          <p class="title">
            熱門旅宿<span class="hidden lg:inline ml-5">旅人最常推的</span>
          </p>
          <div class="more_btn white_btn ml-auto">更多</div>
        </div>
        <div class="cardGroup">
          <HotelCard
            v-for="data in defaultData.hotel"
            :cardData="data"
            :key="data.ID"
          />
        </div>
      </div>
    </div>
    <!-- 熱門餐飲 -->
    <div class="contentWrapper">
      <div class="restaurantArea w-full">
        <div class="flex items-center mb-5">
          <p class="title">
            熱門餐飲<span class="hidden lg:inline ml-5">饕客必吃美食</span>
          </p>
          <div class="more_btn white_btn ml-auto">更多</div>
        </div>
        <div class="restaurantCardGroup">
          <RestaurantCard
            v-for="data in defaultData.restaurant"
            :cardData="data"
            :key="data.ID"
            class="underLine"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ScenicSpotCard from "@/components/ScenicSpotCard.vue";
import HotelCard from "@/components/HotelCard.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import {
  fetchScenicSpotAll,
  fetchRestaurantAll,
  fetchHotelAll,
} from "@/apis/tourism";
export default {
  name: "Home",
  components: {
    SearchBar,
    RestaurantCard,
    HotelCard,
    ScenicSpotCard,
  },
  data() {
    return {
      defaultData: {
        scenicSpot: "",
        hotel: "",
        restaurant: "",
      },
      bannerInfo: {
        scenicSpot: {
          title: "景點快搜",
          subTitle: "在頂溪，找到令你怦然心動的風景",
        },
        hotel: {
          title: "住宿推薦",
          subTitle: "享受一夜好眠，讓出遊心情更加分",
        },
        restaurant: {
          title: "必吃美食",
          subTitle: "匯聚八方好滋味，滿足每個挑剔的味蕾",
        },
      },
      searchTab: "scenicSpot",
    };
  },
  mounted() {
    this.getDefaultData();
  },
  methods: {
    getDefaultData() {
      fetchScenicSpotAll({
        $filter: `City eq '雲林縣' and Picture/PictureUrl3 ne null`,
        $top: 3,
      }).then(({ data }) => {
        this.defaultData.scenicSpot = data;
      });
      fetchHotelAll({
        $filter: `City eq '臺北市' and Grade eq '五星級'`,
        $top: 4,
      }).then(({ data }) => {
        this.defaultData.hotel = data;
      });
      fetchRestaurantAll({
        $filter: `City eq '彰化縣' and Picture/PictureUrl3 ne null and WebsiteUrl ne null`,
        $top: 6,
      }).then(({ data }) => {
        this.defaultData.restaurant = data;
      });
    },
  },
};
</script>
<style scoped>
.wrapper {
  @apply flex mx-auto px-4 mb-10 lg:px-8;
}

.contentWrapper {
  @apply wrapper;
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

.title {
  @apply text-2xl font-bold text-j-black-900 lg:text-4xl;
}

.title::before {
  content: "";
  @apply relative inline-block bg-j-orange w-1 h-5 mr-5;
}

.cardGroup {
  display: -webkit-box;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @apply overflow-x-scroll lg:overflow-hidden lg:flex;
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

.underLine {
  @apply border-b lg:border-none;
}

.underLine:last-child {
  @apply border-none;
}

@screen lg {
  .contentWrapper {
    max-width: 1440px;
    @apply px-20;
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

  .lessBanner > .banner > img,
  .lessBanner > .bannerBg {
    height: 360px;
  }

  .lessBanner > .banner > .searchBar {
    @apply mt-0 top-44;
  }

  .lessBanner > .banner > .banner_intro {
    @apply invisible;
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

  .cardBg {
    height: 320px;
    @apply rounded-2xl mt-24 max-w-7xl left-1/2 -translate-x-1/2;
  }

  .restaurantCardGroup {
    @apply w-full flex flex-wrap;
  }

  .restaurantCardGroup > .main {
    @apply w-1/2;
  }
}
</style>