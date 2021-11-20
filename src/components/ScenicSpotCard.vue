<template>
  <div class="main" @click="$router.push(`/Detail/ScenicSpot/${cardData.ID}`)">
    <div
      class="imgArea"
      :style="{ backgroundImage: 'url(' + cardData.Picture.PictureUrl1 + ')' }"
    ></div>
    <div class="textArea">
      <h4 class="card_title">{{ cardData.Name }}</h4>
      <p class="card_info">
        {{ cardData.DescriptionDetail }}
      </p>
      <div class="card_footer">
        <div>
          <div class="icon">
            <img src="@/assets/images/map.svg" />
          </div>
          <span>{{ cardData.City }}</span>
        </div>
        <div @click.stop="clickAddFavorite">
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
          (e) => e.id === ID && e.category === 'scenicSpot'
        )
      },
      set(isFavorite) {
        const item = {
          id: this.cardData.ID,
          category: 'scenicSpot'
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
  height: 320px;
  width: 260px;
  @apply rounded-2xl shadow-md overflow-hidden;
}

.imgArea {
  @apply w-full h-1/2 bg-cover bg-center z-20;
  background-image: url('~@/assets/images/photoScenicSpot.jpg');
}

.textArea {
  @apply bg-white h-1/2 px-5 py-4 z-20;
}

.card_title {
  @apply text-lg font-bold text-j-black-900 mb-2 truncate;
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
    height: 383px;
    width: 340px;
  }
  .card_title {
    @apply mb-4;
  }

  .card_footer {
    @apply mt-10;
  }

  .card_footer > div:last-child {
    @apply justify-end;
  }
}
</style>
