<template>
  <div>
    <Detail
      :detailiID="id"
      :info="detailInfo"
      category="restaurant"
      categoryStr="餐飲"
    />
  </div>
</template>

<script>
import Detail from '@/components/Detail.vue'
import { useRoute } from 'vue-router'
import { fetchRestaurantAll } from '@/apis/tourism'
import { ref } from 'vue'
import { filterCity } from '@/utils/filter'
export default {
  name: 'DetailScenicSpot',
  components: {
    Detail
  },
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
        PictureUrl3: null,
        PictureDescription1: null,
        PictureDescription2: null,
        PictureDescription3: null
      },
      OpenTime: null,
      Phone: null,
      Address: null
    })

    fetchRestaurantAll({
      $filter: `ID eq '${id}'`
    }).then(({ data }) => {
      if (data.length) {
        data[0].City =
          data[0].City ||
          filterCity(data[0].ZipCode) ||
          data[0].Address.slice(0, 3)
        detailInfo.value = data[0]
      }
    })

    return {
      detailInfo,
      id
    }
  }
}
</script>
