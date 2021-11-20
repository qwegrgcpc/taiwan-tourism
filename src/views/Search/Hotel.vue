<template>
  <div class="contentWrapper">
    <div class="hotelArea w-full overflow-hidden">
      <div class="flex items-center mb-5">
        <p class="title">
          熱門旅宿
          <span class="hidden lg:inline ml-5">旅人最常推的</span>
        </p>
      </div>
      <div class="cardGroup">
        <HotelCard
          v-for="data in itmes"
          :cardData="data"
          :key="data.ID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HotelCard from '@/components/HotelCard.vue'
export default {
  components: {
    HotelCard
  },
  computed: {
    itmes() {
      return this.$store.state.searchData
    }
  }
}
</script>

<style scoped>
.contentWrapper {
  @apply flex mx-auto px-4 mb-10 lg:px-8;
}
.title {
  @apply text-2xl font-bold text-j-black-900 lg:text-4xl;
}
.title::before {
  content: '';
  @apply relative inline-block bg-j-orange w-1 h-5 mr-5;
}
.subtitle {
  @apply hidden ml-10;
}
.cardGroup > div {
  @apply mx-5 mb-10;
}

@screen lg {
  .contentWrapper {
    max-width: 1440px;
    @apply px-20;
  }
  .scenicSpotArea > .title::before {
    content: '';
    @apply absolute bg-j-orange w-1.5 h-7 transform translate-x-40 translate-y-1;
  }
  .subtitle {
    @apply text-lg text-j-black-500 font-medium align-middle leading-5 inline;
  }
  .scenicSpotArea {
    @apply px-10 mt-24;
  }
  .cardGroup {
    @apply flex flex-wrap;
  }
}
</style>
