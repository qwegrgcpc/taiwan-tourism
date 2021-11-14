<template>
  <div class="main flex w-full">
    <div class="imgArea"></div>
    <div class="textArea">
      <h4 class="card_title">時光咖啡</h4>
      <p class="card_info">
        蓮池潭，「鳳山八景」之一。荷花滿布潭面，清風吹來夏荷清香。潭畔旁的「龍虎塔」鎮守在此，讓人深感東方神秘色彩的震撼。
      </p>
      <div class="flex mt-3 xl:mt-3">
        <div class="icon">
          <img src="@/assets/images/phone.svg" />
        </div>
        <span>0915-890673</span>
      </div>
      <div class="card_footer">
        <div>
          <div class="icon">
            <img src="@/assets/images/map.svg" />
          </div>
          <span>高雄市</span>
        </div>
        <div>
          <div class="icon cursor-pointer" @click="clickAddFavorite">
            <img v-show="isFavorite" src="@/assets/images/addedJourney.svg" />
            <img v-show="!isFavorite" src="@/assets/images/addJourney.svg" />
          </div>
          <span>加入收藏</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFavorite: false,
    };
  },
  methods: {
    clickAddFavorite() {
      this.isFavorite = !this.isFavorite;
    },
  },
};
</script>
<style scoped>
.main {
  height: 176px;
  @apply overflow-hidden py-2;
}

.imgArea {
  @apply rounded-2xl w-1/3 h-full bg-cover bg-center;
  background-image: url("~@/assets/images/photoRestaurant.jpg");
}

.textArea {
  @apply bg-white w-2/3 h-full px-3 py-2;
}

.card_title {
  @apply text-lg font-bold text-j-black-900 mb-1;
}

.card_info {
  @apply text-base text-j-black-500 h-12 overflow-hidden;
}

.card_footer {
  @apply flex w-full mt-1;
}

.card_footer > div {
  @apply flex flex-1 text-base text-j-black-900 items-center transform;
}

.icon {
  @apply mr-2;
}

@screen lg {
  .main {
    height: 207px;
    @apply mb-6
  }
  .imgArea {
    @apply w-1/2;
  }

  .cardArea {
    @apply w-1/2;
  }

  .card_footer {
    @apply mt-3;
  }
}
</style>