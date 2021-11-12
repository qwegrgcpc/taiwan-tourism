<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">{{ detailInfo.Name }}</div>
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
    <div class="intro">
      <div class="content">
        <div class="content_title">景點介紹</div>
        <div class="content_desc">{{ detailInfo.DescriptionDetail }}</div>
      </div>
      <div class="info">
        <div class="info_title">景點資訊</div>
        <div class="info_item">
          <div class="info_label">開放時間</div>
          <div class="info_text">{{ detailInfo.OpenTime }}</div>
        </div>
        <div class="info_item">
          <div class="info_label">聯絡電話</div>
          <div class="info_text">{{ detailInfo.Phone }}</div>
        </div>
        <div class="info_item">
          <div class="info_label">地址</div>
          <div class="info_text">{{ detailInfo.Address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { fetchScenicSpotAll } from "@/apis/tourism";
import { ref } from "vue";
import { filterCity } from "@/utils/filter";
export default {
  name: "Detail",
  setup() {
    const { id } = useRoute().params;
    const detailInfo = ref({
      Name: null,
      City: null,
      Description: null,
      DescriptionDetail: null,
      Picture: {
        PictureUrl1: null,
        PictureUrl2: null,
        PictureUrl3: null,
      },
      OpenTime: null,
      Phone: null,
      Address: null,
    });

    fetchScenicSpotAll({
      $filter: `ID eq '${id}'`,
    }).then(({ data }) => {
      data[0].City = filterCity(data[0].ZipCode);
      console.log(data[0].City);
      detailInfo.value = data[0];
    });

    return {
      detailInfo,
    };
  },
};
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
    "title title title"
    "location location favorite"
    "desc desc desc";
}
.header_title {
  grid-area: title;
  @apply title;
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
}
.content {
  @apply mx-5;
}
.content_title {
  @apply title mb-2;
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
  content: "";
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
@screen lg {
  .wrap {
    @apply items-center mx-auto;
    max-width: 1280px;
  }
  .header {
    grid-template-columns: auto 1fr 64px;
    grid-template-areas:
      "title location favorite"
      "desc desc favorite";
  }
  .header_title {
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
  .images {
    @apply grid-cols-12 gap-5;
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
    @apply col-span-8;
  }
  .info {
    @apply col-span-4;
  }
  .info {
    @apply pt-5 pb-10 rounded-2xl;
  }
}
</style>
