<template>
  <div class="wrap">
    <ul class="flex flex-wrap">
      <li
        class="item"
        v-for="item in list"
        :key="item.index"
        @click="$router.push(`/Schedule/Modify/${item.index}`)"
      >
        <div
          class="absolute top-2 right-2 z-10"
          @click.stop="setDeleteIndex(item.index)"
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
import { ref, computed } from 'vue'
import { fetchAll } from '@/apis/tourism'
import { getItineraryListId } from '@/utils/apiParams'
import empty from '@/assets/images/empty.svg'
import Dialogs from '@/components/Dialogs.vue'

// import { setItem } from '@/utils/localStorage'
export default {
  components: { Dialogs },
  setup() {
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
      list.value = itineraryList.value.map(({ name, schedule, index }) => {
        let picture = schedule.length ? null : empty
        if (schedule.length) {
          const { id, category } = schedule[0]
          picture =
            result.find((e) => e.id === id && e.category === category)
              ?.picture || empty
        }

        return {
          index,
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
      const { index } = itineraryList.value[lastScheduleIndex.value]
      router.push(`/Schedule/Modify/${index}`)
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
      list.value = list.value.filter(({ index }) => index !== deleteIndex.value)
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
