<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">{{ info.Name }}</div>
      <div class="location">
        <img src="@/assets/images/map.svg" />{{ info.City }}
      </div>
      <div class="left_side">
        <a
          class="fast_search"
          target="_blank"
          :href="`https://www.google.com/search?q=${info.Name}`"
        >
          <img src="@/assets/images/googleBig.svg" />
          快速搜索
        </a>
        <div class="favorite" @click="clickAddFavorite">
          <img v-show="isFavorite" src="@/assets/images/addedJourneyBig.svg" />
          <img v-show="!isFavorite" src="@/assets/images/addJourneyBig.svg" />
          加入收藏
        </div>
      </div>
      <div class="desc">
        <template v-if="info.DescriptionDetail">
          {{ info.Description }}
        </template>
      </div>
    </div>
    <div class="images">
      <div class="main_img">
        <img
          class="img"
          v-src="info.Picture.PictureUrl1"
          :alt="info.Picture.PictureDescription1"
        />
      </div>
      <div class="side_img">
        <img
          class="img"
          v-src="info.Picture.PictureUrl1"
          :alt="info.Picture.PictureDescription1"
        />
      </div>
      <div class="side_img">
        <img
          class="img"
          v-src="info.Picture.PictureUrl2"
          :alt="info.Picture.PictureDescription1"
        />
      </div>
      <div class="side_img">
        <img
          class="img"
          v-src="info.Picture.PictureUrl3"
          :alt="info.Picture.PictureDescription1"
        />
      </div>
    </div>
    <div class="intro">
      <div class="lg:col-span-8">
        <div class="content">
          <div class="content_title">{{ categoryStr }}介紹</div>
          <div class="content_subtitle">
            {{ info.Picture.PictureDescription1 }}
          </div>
          <div class="content_desc">
            {{ info.DescriptionDetail || info.Description }}
          </div>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="info">
          <div class="info_title">{{ categoryStr }}資訊</div>
          <div class="info_item">
            <div class="info_label">開放時間</div>
            <div class="info_text">{{ info.OpenTime }}</div>
          </div>
          <div class="info_item">
            <div class="info_label">聯絡電話</div>
            <div class="info_text">{{ info.Phone }}</div>
          </div>
          <div class="info_item">
            <div class="info_label">地址</div>
            <div class="info_text">{{ info.Address }}</div>
          </div>
          <div class="info_map">
            <iframe
              v-if="info.Position.PositionLat && info.Position.PositionLon"
              :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${info.Position.PositionLat}!3d${info.Position.PositionLon}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd03748c065726588!2z${coordinate}!5e0!3m2!1sen!2szh-tw`"
              class="w-full"
              height="200"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Detail',
  props: ['detailiID', 'info', 'category', 'categoryStr'],
  setup(props) {
    const store = useStore()
    const isFavorite = computed(() => {
      return !!store.state.favoriteList.find(
        (e) => e.id === props.detailiID && e.category === props.category
      )
    })

    const clickAddFavorite = () => {
      const item = {
        id: props.detailiID,
        category: props.category
      }
      if (isFavorite.value) {
        store.commit('removeFavorite', item)
        return
      }
      store.commit('addFavorite', item)
    }
    const coordinate = computed(() => {
      const { PositionLat: x, PositionLon: y } = props.info.Position
      if (x && y) {
        return window.btoa(`${x},${y}`)
      }
      return ''
    })
    return {
      isFavorite,
      coordinate,
      clickAddFavorite
    }
  }
}
</script>

<style scoped>
.title {
  @apply text-3xl font-bold text-j-black-900;
}
.wrap {
  @apply flex flex-col;
}
.header {
  @apply grid py-3 grid-cols-3 mx-5;
  grid-template-areas:
    'title title title'
    'location left_side left_side'
    'desc desc desc';
}
.header_title {
  grid-area: title;
  @apply title;
}
.location {
  grid-area: location;
}
.left_side {
  grid-area: left_side;
  @apply flex justify-end;
}
.fast_search {
  @apply mr-2;
}
.favorite {
  @apply justify-end;
}
.location > img {
  @apply mr-3;
}
.favorite > img,
.fast_search > img {
  @apply mr-2;
}
.location > img,
.favorite > img,
.fast_search > img {
  @apply w-5;
}
.location,
.favorite,
.fast_search {
  @apply flex text-base py-2;
}
.desc {
  @apply text-j-black-500 tracking-wide leading-6;
  grid-area: desc;
}
.images {
  @apply w-full grid grid-rows-3 grid-cols-3 gap-2 mb-10 px-5;
}
.main_img {
  @apply row-span-3 col-span-3;
}
.side_img {
  @apply col-span-1 aspect-w-8 aspect-h-5;
}
.img {
  @apply w-full h-full object-center object-cover rounded-lg;
  aspect-ratio: 8 / 5;
}
.content {
  @apply mx-5;
}
.content_title {
  @apply title mb-2;
}
.content_subtitle {
  @apply text-j-blue-200 text-lg font-bold;
}
.content_desc {
  @apply text-j-black-900 leading-8 mb-10;
}
.info {
  @apply bg-j-black-50 py-10;
}
.info_title {
  @apply title mx-11 mb-3;
}
.info_title::before {
  @apply bg-j-orange;
  position: relative;
  display: inline-block;
  content: '';
  left: -20px;
  width: 4px;
  height: 22px;
}
.info_item {
  @apply mx-11 mb-3;
}
.info_label {
  @apply text-j-black-500 text-sm;
}
.info_text {
  @apply text-j-black-900 text-lg font-bold;
}
.info_map {
  @apply px-5;
}
@screen lg {
  .wrap {
    @apply items-center mx-auto;
    max-width: 1280px;
  }
  .header {
    @apply mx-0 pt-3 pb-10 w-full;
    grid-template-columns: auto 1fr 144px;
    grid-template-areas:
      'title location left_side'
      'desc desc left_side';
  }
  .header_title {
    @apply mr-11;
  }
  .desc {
    @apply w-9/12 pt-3;
  }
  .left_side {
    white-space: nowrap;
  }
  .fast_search {
    @apply mr-4;
  }
  .favorite > img,
  .fast_search > img {
    @apply w-10;
  }
  .favorite,
  .fast_search {
    @apply flex-col justify-end items-center py-0;
  }
  .images {
    @apply grid-cols-12 gap-5 px-0;
  }
  .main_img {
    @apply col-span-9;
  }
  .side_img {
    @apply col-span-3;
  }
  .img {
    @apply rounded-2xl;
  }
  .intro {
    @apply grid py-3 grid-cols-12 gap-14;
  }
  .content {
    @apply mx-0;
  }
  .content_subtitle {
    @apply mb-3 pt-2;
  }
  .info {
    @apply pt-5 pb-10 rounded-2xl bg-white border border-j-black-100;
  }
  .info_map {
    @apply px-10;
  }
}
</style>
