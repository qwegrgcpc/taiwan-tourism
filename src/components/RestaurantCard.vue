<template>
  <div class="main flex w-full">
    <div
      class="imgArea"
      :style="{ backgroundImage: 'url(' + cardData.Picture.PictureUrl1 + ')' }"
    ></div>
    <div class="textArea">
      <h4 class="card_title">{{ cardData.Name }}</h4>
      <p class="card_info xl:mt-4">
        {{ cardData.Description }}
      </p>
      <div class="flex mt-3 xl:mt-3">
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
          (e) => e.id === ID && e.category === 'restaurant'
        )
      },
      set(isFavorite) {
        const item = {
          id: this.cardData.ID,
          category: 'restaurant'
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
  height: 176px;
  @apply overflow-hidden py-2;
}

.imgArea {
  @apply rounded-2xl w-1/3 h-full bg-cover bg-center;
  background-image: url('~@/assets/images/photoRestaurant.jpg');
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
    @apply mb-6;
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
