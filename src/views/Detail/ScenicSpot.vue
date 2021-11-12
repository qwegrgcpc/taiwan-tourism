<template>
  <div class="wrap">
    <div class="header">
      <div class="title">{{ detailInfo.Name }}</div>
      <div class="location">
        <img src="@/assets/images/map.svg" />{{ detailInfo.City }}
      </div>
      <div class="favorite">
        <img src="@/assets/images/addJourneyBig.svg" />加入收藏
      </div>
      <div class="desc">{{ detailInfo.Description }}</div>
    </div>
    <div class="images">
      <div class="main_img">
        <img class="img" :src="detailInfo.Picture.PictureUrl1" />
      </div>
      <div class="side_img">
        <img class="img" :src="detailInfo.Picture.PictureUrl1" />
      </div>
      <div class="side_img">
        <img class="img" :src="detailInfo.Picture.PictureUrl1" />
      </div>
      <div class="side_img">
        <img class="img" :src="detailInfo.Picture.PictureUrl1" />
      </div>
    </div>
    {{ detailInfo }}
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { fetchScenicSpotAll } from '@/apis/tourism'
import { ref } from 'vue'
import { filterCity } from '@/utils/filter'
export default {
  name: 'Detail',
  setup() {
    const { id } = useRoute().params
    const detailInfo = ref({
      Name: null,
      City: null,
      Description: null,
      DescriptionDetail: null,
      Picture: {
        PictureUrl1: null,
        PictureUrl2: null,
        PictureUrl3: null
      }
    })

    fetchScenicSpotAll({
      $filter: `ID eq '${id}'`
    }).then(({ data }) => {
      data[0].City = filterCity(data[0].ZipCode)
      console.log(data[0].City)
      detailInfo.value = data[0]
    })

    return {
      detailInfo
    }
  }
}
</script>

<style scoped>
.wrap {
  @apply flex flex-col mx-5;
}
.header {
  @apply grid py-3 grid-cols-3;
  grid-template-areas:
    'title title title'
    'location location favorite'
    'desc desc desc';
}
.title {
  grid-area: title;
  @apply text-3xl font-bold;
}
.location {
  grid-area: location;
}
.favorite {
  @apply justify-end;
  grid-area: favorite;
}
.location > img {
  @apply mr-3;
}
.favorite > img {
  @apply mr-2;
}
.location > img,
.favorite > img {
  @apply w-5;
}
.location,
.favorite {
  @apply flex text-base py-2;
}
.desc {
  @apply text-j-black-500 tracking-wide leading-6;
  grid-area: desc;
}
.images {
  @apply w-full grid grid-rows-3 grid-cols-12 gap-5;
}
.main_img {
  @apply row-span-3 col-span-9;
}
.side_img {
  @apply col-span-3 aspect-w-8 aspect-h-5;
}
.img {
  @apply w-full h-full object-center object-cover rounded-2xl;
}

@screen lg {
  .wrap {
    @apply items-center mx-auto;
    max-width: 1280px;
  }
  .header {
    grid-template-columns: auto 1fr 64px;
    grid-template-areas:
      'title location favorite'
      'desc desc favorite';
  }
  .title {
    @apply mr-11;
  }
  .desc {
    @apply w-9/12 pt-3;
  }
  .favorite > img {
    @apply w-10;
  }
  .favorite {
    @apply flex-col justify-end items-center py-0;
  }
}
</style>
