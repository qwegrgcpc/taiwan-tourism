<template>
  <div class="main">
    <div class="imgArea"></div>
    <div class="textArea">
      <h4 class="card_title">蓮池潭風景區</h4>
      <p class="card_info">
        蓮池潭，「鳳山八景」之一。荷花滿布潭面，清風吹來夏荷清香。潭畔旁的「龍虎塔」鎮守在此，讓人深感東方神秘色彩的震撼。
      </p>
      <div class="iconArea">
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
  height: 320px;
  width: 260px;
  @apply rounded-2xl shadow-md overflow-hidden mr-9;
}

.imgArea {
  @apply w-full h-1/2 bg-cover bg-center z-20;
  background-image: url("~@/assets/images/photoScenicSpot.jpg");
}

.textArea {
  @apply bg-white h-1/2 px-5 py-4 z-20;
}

.card_title {
  @apply text-lg font-bold text-j-black-900 mb-2;
}

.card_info {
  @apply text-base text-j-black-500 h-12 overflow-hidden;
}

.iconArea {
  @apply flex w-full mt-5;
}

.iconArea > div {
  @apply flex flex-1 text-base text-j-black-900 items-center transform;
}

.icon {
  @apply mr-2;
}

@screen lg {
  .main {
    height: 383px;
    width: 340px;
  }
  .card_title {
    @apply mb-4;
  }

  .iconArea {
    @apply mt-10;
  }

  .iconArea > div:last-child {
    @apply justify-end;
  }
}
</style>