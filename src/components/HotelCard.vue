<template>
  <div class="main">
    <div
      class="imgArea"
      :style="{ backgroundImage: 'url(' + cardData.Picture.PictureUrl1 + ')' }"
    ></div>
    <div class="textArea">
      <h4 class="card_title">{{ cardData.Name }}</h4>
      <div class="flex mt-4 xl:mt-3">
        <div class="icon">
          <img src="@/assets/images/phone.svg" />
        </div>
        <span>{{ cardData.Phone }}</span>
      </div>
      <div class="card_footer">
        <div>
          <div class="icon">
            <img src="@/assets/images/map.svg" />
          </div>
          <span>{{ cardData.City }}</span>
        </div>
        <div @click="clickAddFavorite">
          <div class="icon cursor-pointer">
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
  props: {
    cardData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isFavorite: {
      get() {
        const { ID } = this.cardData
        return !!this.$store.state.favoriteList.find(
          (e) => e.id === ID && e.category === 'hotel'
        )
      },
      set(isFavorite) {
        const item = {
          id: this.cardData.ID,
          category: 'hotel'
        }
        if (isFavorite) {
          this.$store.commit('addFavorite', item)
          return
        }
        this.$store.commit('removeFavorite', item)
      }
    }
  },
  methods: {
    clickAddFavorite() {
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>
<style scoped>
.main {
  height: 373px;
  width: 265px;
  @apply rounded-2xl shadow-md overflow-hidden;
}

.imgArea {
  @apply w-full h-3/5 bg-cover bg-center;
  background-image: url('~@/assets/images/photoScenicSpot.jpg');
}

.textArea {
  @apply bg-white h-2/5 px-5 py-4;
}

.card_title {
  @apply text-lg font-bold text-j-black-900 mb-2;
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
    @apply mt-3;
  }

  .card_footer > div:last-child {
    @apply justify-end;
  }
}
</style>
