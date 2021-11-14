<template>
  <div class="main">
    <div class="imgArea"></div>
    <div class="textArea">
      <h4 class="card_title">鳳山79背包客 眷村親子民宿</h4>
      <div class="flex mt-4 xl:mt-3">
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
  height: 373px;
  width: 265px;
  @apply rounded-2xl shadow-md overflow-hidden;
}

.imgArea {
  @apply w-full h-3/5 bg-cover bg-center z-20;
  background-image: url("~@/assets/images/photoScenicSpot.jpg");
}

.textArea {
  @apply bg-white h-2/5 px-5 py-4 z-20;
}

.card_title {
  @apply text-lg font-bold text-j-black-900 mb-2;
}

.card_info {
  @apply text-base text-j-black-500 h-12 overflow-hidden;
}

.card_footer {
  @apply flex w-full mt-5;
}

.card_footer > div {
  @apply flex flex-1 text-base text-j-black-900 items-center transform;
}

.icon {
  @apply mr-2;
}

@screen lg {
  .main {
    width: 300px;
  }
  .imgArea {
    @apply h-2/3;
  }

  .cardArea {
    @apply h-1/3;
  }

  .card_footer {
    @apply mt-3
  }

  .card_footer > div:last-child {
    @apply justify-end;
  }
}
</style>