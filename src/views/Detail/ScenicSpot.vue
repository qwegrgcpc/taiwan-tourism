<template>
  <div>
    <Detail
      :detailiID="id"
      :info="detailInfo"
      category="scenicSpot"
      categoryStr="景點"
    />
  </div>
</template>

<script>
import Detail from '@/components/Detail.vue'
import { useRoute } from 'vue-router'
import { fetchScenicSpotAll } from '@/apis/tourism'
import { ref } from 'vue'
import { filterCity } from '@/utils/filter'
import empty from '@/assets/images/empty.svg'
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
        PictureUrl1: empty,
        PictureUrl2: empty,
        PictureUrl3: empty,
        PictureDescription1: null,
        PictureDescription2: null,
        PictureDescription3: null
      },
      OpenTime: null,
      Phone: null,
      Address: null
    })

    fetchScenicSpotAll({
      $filter: `ID eq '${id}'`
    }).then(({ data }) => {
      if (data.length) {
        data[0].City = filterCity(data[0].ZipCode)
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
