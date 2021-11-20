<template>
  <div>
    <div class="contentWrapper">
      <!-- 熱門景點 -->
      <div class="scenicSpotArea w-full overflow-hidden z-10">
        <p class="title xl:text-center mb-6">
          熱門景點
          <span class="hidden lg:inline ml-10">
            台灣最夯、最美麗的景點都在這裡
          </span>
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
            熱門旅宿
            <span class="hidden lg:inline ml-5">旅人最常推的</span>
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
import ScenicSpotCard from '@/components/ScenicSpotCard.vue'
import HotelCard from '@/components/HotelCard.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import {
  fetchScenicSpotAll,
  fetchRestaurantAll,
  fetchHotelAll
} from '@/apis/tourism'
export default {
  name: 'SearchIndex',
  components: {
    RestaurantCard,
    HotelCard,
    ScenicSpotCard
  },
  data() {
    return {
      defaultData: {
        scenicSpot: '',
        hotel: '',
        restaurant: ''
      }
    }
  },
  mounted() {
    this.getDefaultData()
  },
  methods: {
    getDefaultData() {
      fetchScenicSpotAll({
        $filter: `City eq '雲林縣' and Picture/PictureUrl3 ne null`,
        $top: 3
      }).then(({ data }) => {
        this.defaultData.scenicSpot = data
      })
      fetchHotelAll({
        $filter: `City eq '臺北市' and Grade eq '五星級'`,
        $top: 4
      }).then(({ data }) => {
        this.defaultData.hotel = data
      })
      fetchRestaurantAll({
        $filter: `City eq '彰化縣' and Picture/PictureUrl3 ne null and WebsiteUrl ne null`,
        $top: 6
      }).then(({ data }) => {
        this.defaultData.restaurant = data
      })
    }
  }
}
</script>
<style scoped>
.contentWrapper {
  @apply flex mx-auto px-4 mb-10 lg:px-8 relative;
}
.title {
  @apply text-2xl font-bold text-j-black-900 lg:text-4xl;
}

.title::before {
  content: '';
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

  .title > span {
    @apply text-lg text-j-black-500 font-medium align-middle leading-5;
  }

  .scenicSpotArea {
    @apply px-10 mt-24;
  }

  .scenicSpotArea > .title::before {
    content: '';
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
