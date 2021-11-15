<template>
  <div class="wrap">
    <ul class="flex flex-wrap">
      <li
        class="item"
        v-for="(item, i) in list"
        :key="i"
        @click="$router.push(`/Schedule/Modify/${i}`)"
      >
        <div
          class="absolute top-2 right-2 z-10"
          @click.stop="setDeleteIndex(i)"
        >
          <img class="w-6 h-6" src="@/assets/images/itemClose.svg" />
        </div>
        <div class="m-2.5 aspect-w-3 aspect-h-2">
          <img
            class="w-full h-full object-center object-cover rounded-t-xl"
            :src="item.picture"
          />
        </div>
        <div class="title">{{ item.name }}</div>
      </li>
      <li class="item p-1" @click="addSchedule">
        <img
          class="w-full h-full object-center object-cover rounded-t-xl"
          src="@/assets/images/addJourneyName.svg"
        />
      </li>
    </ul>
    <Dialogs v-show="showDialogs" type="清單" @result="clickDialogs" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { fetchAll } from '@/apis/tourism'
import empty from '@/assets/images/empty.svg'
import { ref } from 'vue'
import { computed } from 'vue'
import Dialogs from '@/components/Dialogs.vue'
import { getItineraryListId } from '@/utils/apiParams'

// import { setItem } from '@/utils/localStorage'
export default {
  components: { Dialogs },
  setup() {
    // const data = [
    //   {
    //     name: "台中一日遊",
    //     schedule: [
    //       {
    //         day: 1,
    //         start: [10, 20],
    //         end: [10, 20],
    //         id: "C1_315080500H_000068",
    //         category: "scenicSpot",
    //       },
    //     ],
    //   },
    //   {
    //     name: "台北一日遊",
    //     schedule: [
    //       {
    //         day: 1,
    //         start: [10, 20],
    //         end: [10, 20],
    //         id: "C4_315080000H_000539",
    //         category: "hotel",
    //       },
    //     ],
    //   },
    //   {
    //     name: "高雄一日遊",
    //     schedule: [
    //       {
    //         day: 1,
    //         start: [10, 20],
    //         end: [10, 20],
    //         id: "C3_315081000H_020111",
    //         category: "restaurant",
    //       },
    //     ],
    //   },
    // ];
    // setItem('itineraryList', data)
    const router = useRouter()
    const store = useStore()
    const itineraryList = computed(() => store.state.itineraryList)
    const params = getItineraryListId(itineraryList.value)

    const list = ref([])
    const showDialogs = ref(false)
    const deleteIndex = ref(null)

    fetchAll(params).then((e) => {
      const result = Object.entries(e).reduce((acc, [category, data]) => {
        const list = data.map((e) => ({
          id: e.ID,
          picture: e.Picture?.PictureUrl1,
          category
        }))
        return acc.concat(list)
      }, [])
      list.value = itineraryList.value.map(({ name, schedule }) => {
        let picture = schedule.length ? null : empty
        if (schedule.length) {
          const { id, category } = schedule[0]
          picture =
            result.find((e) => e.id === id && e.category === category)
              ?.picture || empty
        }

        return {
          name,
          picture
        }
      })
    })
    const lastScheduleIndex = computed(() => itineraryList.value.length - 1)

    const addSchedule = () => {
      const last = itineraryList.value[lastScheduleIndex.value]
      if (last?.schedule.length || lastScheduleIndex.value < 0) {
        store.commit('addSchedule')
      }
      router.push(`/Schedule/Modify/${lastScheduleIndex.value}`)
    }

    const setDeleteIndex = (index) => {
      deleteIndex.value = index
      showDialogs.value = true
    }

    const clickDialogs = (result) => {
      if (result) deleteSchedule()
      showDialogs.value = false
    }

    const deleteSchedule = () => {
      list.value = list.value.filter((_, i) => i !== deleteIndex.value)
      store.commit('removeSchedule', deleteIndex.value)
    }

    return {
      addSchedule,
      setDeleteIndex,
      clickDialogs,
      list,
      showDialogs
    }
  }
}
</script>

<style scoped>
.wrap {
  @apply mx-5;
}
.item {
  @apply w-40 h-40 mb-2 border border-j-black-100 rounded-2xl mx-auto relative;
}
.title {
  @apply px-2.5 text-xl py-1;
}
@screen lg {
  .wrap {
    @apply mx-20;
  }
  .item {
    @apply w-60 h-60 mr-4 mx-0 mb-4;
  }
  .title {
    @apply pt-2.5;
  }
}
</style>
