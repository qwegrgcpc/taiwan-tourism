<template>
  <div class="wrap">
    <div>
      <div class="schedule">
        <div class="schedule_name">
          <input
            v-model="scheduleName"
            class="w-full h-10 rounded-lg py-2 px-3"
            type="text"
            placeholder="請輸入行程名稱"
          />
        </div>
        <ul class="flex h-10">
          <li class="py-2 pl-5 px-1 text-lg lg:px-2">DAY</li>
          <li
            v-for="day in scheduleDayItems"
            :key="day + 'day'"
            class="page_itme"
          >
            <button
              class="page_btn"
              :class="{ active: day === currentDay }"
              @click="changeDay(day)"
            >
              {{ day }}
            </button>
          </li>
          <li v-show="scheduleDayItems.length < 5" class="page_itme">
            <button class="page_btn" @click="addScheduleDay">
              <img src="@/assets/images/addDay.svg" />
            </button>
          </li>
        </ul>
        <div class="items">
          <div class="flex justify-between mb-2">
            <span class="self-end text-base">時間</span>
            <div
              class="flex py-5"
              @click="openDialogs('todaySchedule', currentDay)"
            >
              <img class="w-7 mr-3" src="@/assets/images/removeJourney.svg" />
              <span class="text-lg font-light">刪除此日行程</span>
            </div>
          </div>
          <ul class="content">
            <li
              v-for="item in todayScheduleDetailItems"
              :key="item.timestamp"
              class="item"
            >
              <div class="time_area">
                <div class="time mb-1">
                  <input
                    v-model="item.start.h"
                    class="input_num"
                    type="text"
                    @keypress="keyLock($event, item.start.h)"
                    @keyup="updateScheduleItem"
                  />
                  :
                  <input
                    v-model="item.start.m"
                    class="input_num"
                    type="text"
                    @keypress="keyLock($event, item.start.m)"
                    @keyup="updateScheduleItem"
                  />
                </div>
                <div class="time">
                  <input
                    v-model="item.end.h"
                    class="input_num"
                    type="text"
                    @keypress="keyLock($event, item.end.h)"
                    @keyup="updateScheduleItem"
                  />
                  :
                  <input
                    v-model="item.end.m"
                    class="input_num"
                    type="text"
                    @keypress="keyLock($event, item.end.m)"
                    @keyup="updateScheduleItem"
                  />
                </div>
              </div>
              <div class="info">
                <div
                  class="absolute top-2 right-2 z-10"
                  @click.stop="removeScheduleItem(item.timestamp)"
                >
                  <img class="w-5 h-5" src="@/assets/images/itemClose.svg" />
                </div>
                <div class="w-20 h-20">
                  <img class="img" :src="item.picture" />
                </div>
                <div class="pl-2.5 flex flex-col justify-between">
                  <div class="text-base font-bold">{{ item.name }}</div>
                  <div class="flex text-base font-light">
                    <img class="mr-2.5" src="@/assets/images/phone.svg" />
                    {{ item.phone }}
                  </div>
                  <div class="flex text-base font-light">
                    <img class="mr-2.5" src="@/assets/images/map.svg" />
                    {{ item.area }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="flex justify-end pb-5 lg:hidden">
            <button class="back" @click="$router.push('/ItineraryList')">
              返回
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="favorite_area">
      <div class="filter_area">
        <div class="filter_item">
          <div class="text-xl font-bold mb-3">縣市</div>
          <select class="filter_select">
            <option>全部</option>
            <option>台北</option>
            <option>台中</option>
          </select>
        </div>
        <div class="filter_item">
          <div class="text-xl font-bold mb-3">類型</div>
          <select class="filter_select">
            <option>全部</option>
            <option>景點</option>
            <option>旅宿</option>
            <option>餐飲</option>
          </select>
        </div>
      </div>
      <ul class="favorite_cards">
        <li
          v-for="item in favoriteDetailItems"
          :key="item.id"
          class="favorite_card"
          @click="addScheduleItem(item)"
        >
          <div
            class="absolute top-2 right-2 z-10"
            @click.stop="openDialogs('favoriteItem', item)"
          >
            <img class="w-6 h-6" src="@/assets/images/itemClose.svg" />
          </div>
          <div class="aspect-w-3 aspect-h-2">
            <img
              class="w-full h-full object-center object-cover rounded-t-2xl"
              :src="item.picture"
            />
          </div>
          <div class="favorite_info">
            <div class="favorite_name">{{ item.name }}</div>
            <div class="favorite_location">
              <img class="w-4" src="@/assets/images/map.svg" />
              {{ item.area }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="go_top">TOP</div>
    <Dialogs
      v-show="showDialogs"
      :type="dialogsConfig.str"
      @result="clickDialogs"
    />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { fetchAll } from '@/apis/tourism'
import { getItemsId } from '@/utils/apiParams'
import { filterArea } from '@/utils/filter'
import Dialogs from '@/components/Dialogs.vue'
import empty from '@/assets/images/empty.svg'

export default {
  components: {
    Dialogs
  },
  setup() {
    const index = +useRoute().params.index
    const store = useStore()
    const showDialogs = ref(false)
    const scheduleDetailItems = ref([])
    const favoriteDetailItems = ref([])
    const currentDay = ref(1)
    const dialogsConfig = ref({
      str: '日行程',
      type: 'todaySchedule',
      params: null
    })
    const scheduleItems = computed(() =>
      store.state.itineraryList.find((item) => item.index === index)
    )
    const favoriteItems = computed(() => store.state.favoriteList)
    const scheduleDayItems = ref([
      ...scheduleItems.value.schedule.reduce(
        (acc, { day }) => acc.add(day),
        new Set([1])
      )
    ])
    const todayScheduleDetailItems = computed(() =>
      scheduleDetailItems.value.filter(({ day }) => day === currentDay.value)
    )
    const forLocalStorageScheduleItems = computed(() =>
      scheduleDetailItems.value.map(
        ({ id, category, timestamp, day, start, end }) => ({
          id,
          category,
          timestamp,
          day,
          start,
          end
        })
      )
    )
    const scheduleName = computed({
      get() {
        return scheduleItems.value.name
      },
      set(name) {
        store.commit('updateScheduleName', { index, name })
      }
    })
    const scheduleParams = getItemsId(scheduleItems.value.schedule)
    const favoriteItemsParams = getItemsId(favoriteItems.value)
    const allParams = mixinParams(scheduleParams, favoriteItemsParams)

    fetchAll(allParams).then((e) => {
      const result = Object.entries(e).reduce((acc, [category, data]) => {
        const list = data.map((e) => ({
          id: e.ID,
          name: e.Name,
          picture: e.Picture?.PictureUrl1,
          area: filterArea(e.ZipCode),
          phone: e.Phone,
          category
        }))
        return acc.concat(list)
      }, [])
      scheduleDetailItems.value = getScheduleDetail(
        scheduleItems.value.schedule,
        result
      )
      favoriteDetailItems.value = getFavoriteDetail(favoriteItems.value, result)
    })

    function mixinParams(a, b) {
      const result = {}
      const str = (a, b) => (a ? `${a} ${b ? 'or' : b} ${b}` : b)
      result.scenicSpot = str(a.scenicSpot, b.scenicSpot)
      result.restaurant = str(a.restaurant, b.restaurant)
      result.hotel = str(a.hotel, b.hotel)
      return result
    }

    function getScheduleDetail(scheduleItems, detailItems) {
      return scheduleItems.map(
        ({ id, category, day, start, end, timestamp }) => {
          const detail = detailItems.find(
            (e) => e.id === id && e.category === category
          )

          return {
            id,
            category,
            day,
            start,
            end,
            timestamp,
            picture: detail.picture || empty,
            area: detail.area,
            name: detail.name,
            phone: detail.phone
          }
        }
      )
    }

    function getFavoriteDetail(favoriteItems, detailItems) {
      return favoriteItems.map(({ id, category }) => {
        const detail = detailItems.find(
          (e) => e.id === id && e.category === category
        )

        return {
          id,
          category,
          picture: detail.picture || empty,
          area: detail.area,
          name: detail.name,
          phone: detail.phone
        }
      })
    }

    const addScheduleDay = () => {
      const items = scheduleDayItems.value
      const lastDay = items.length + 1
      if (items.length !== 5) {
        scheduleDayItems.value = [...items, lastDay]
        changeDay(lastDay)
      }
    }

    const removeTodaySchedule = (currentDay) => {
      scheduleDetailItems.value = scheduleDetailItems.value.filter(
        ({ day }) => day !== currentDay
      )
      updateScheduleItem()
    }

    const changeDay = (day) => {
      currentDay.value = day
    }

    const addScheduleItem = ({ id, category }) => {
      const detail = favoriteDetailItems.value.find(
        (e) => e.id === id && e.category === category
      )

      scheduleDetailItems.value.push({
        ...detail,
        day: currentDay.value,
        start: { h: '00', m: '00' },
        end: { h: '00', m: '00' },
        timestamp: Date.now()
      })

      updateScheduleItem()
    }

    const removeScheduleItem = (timestamp) => {
      scheduleDetailItems.value = scheduleDetailItems.value.filter(
        (e) => e.timestamp !== timestamp
      )
      updateScheduleItem()
    }

    const updateScheduleItem = () => {
      store.commit('updateSchedule', {
        index,
        item: forLocalStorageScheduleItems
      })
    }

    const removeFavoriteItem = (params) => {
      const { id, category } = params
      favoriteDetailItems.value = favoriteDetailItems.value.filter(
        (e) => !(e.id === id && e.category === category)
      )
      store.commit('removeFavorite', { id, category })
    }

    const keyLock = (event, value) => {
      if (!(event.keyCode >= 48 && event.keyCode <= 57) || value.length > 1) {
        event.preventDefault()
      }
    }

    const openDialogs = (type, params) => {
      let config
      if (type === 'todaySchedule') {
        config = {
          str: '日行程',
          type: 'todaySchedule',
          params
        }
      }
      if (type === 'favoriteItem') {
        config = {
          str: '項目',
          type: 'favoriteItem',
          params
        }
      }
      dialogsConfig.value = config
      showDialogs.value = true
    }

    const clickDialogs = (result) => {
      const { type, params } = dialogsConfig.value
      if (type === 'todaySchedule' && result) {
        removeTodaySchedule(params)
      }
      if (type === 'favoriteItem' && result) {
        removeFavoriteItem(params)
      }
      showDialogs.value = false
    }

    return {
      scheduleName,
      currentDay,
      showDialogs,
      scheduleDayItems,
      todayScheduleDetailItems,
      favoriteDetailItems,
      addScheduleDay,
      removeTodaySchedule,
      changeDay,
      addScheduleItem,
      removeScheduleItem,
      updateScheduleItem,
      keyLock,
      clickDialogs,
      dialogsConfig,
      openDialogs
    }
  }
}
</script>

<style scoped>
.schedule {
  @apply bg-j-black-25 pb-5;
}
.schedule_name {
  @apply w-full p-5;
}
.page_itme {
  @apply w-15 h-10 mr-px;
}
.page_btn {
  @apply bg-j-black-200 border-j-black-100 border-t border-l border-r text-xl rounded-t-lg w-full h-full grid justify-center items-center;
}
.page_btn.active {
  @apply bg-j-black-75;
}
.items {
  @apply bg-j-black-75 mx-0.5 border-j-black-100 border-l border-r border-b  rounded-xl px-5;
}
.item {
  @apply flex max-w-full mb-1;
}
.time_area {
  @apply w-17 min-w-min flex flex-col justify-center;
}
.time {
  @apply flex bg-white justify-center items-center border border-j-black-100 rounded;
}
.input_num {
  @apply w-5 h-9;
}
.info {
  @apply flex flex-1 h-25 bg-white ml-2.5 p-2.5 relative;
}
.img {
  @apply w-full h-full object-center object-cover;
}
.content {
  @apply pb-3;
}
.back {
  @apply px-5 py-2 border border-j-black-900 rounded-full text-xl;
}
.favorite_area {
  @apply p-5;
}
.favorite_cards {
  @apply grid grid-flow-row-dense grid-cols-2;
}
.favorite_card {
  @apply w-40 mb-3 relative justify-self-center;
}
.favorite_info {
  @apply px-2 pt-2 pb-3 border-r border-l border-b rounded-b-2xl;
}
.favorite_name {
  @apply text-sm font-bold pb-1;
}
.favorite_location {
  @apply flex text-xs text-j-black-500;
}
.go_top {
  @apply fixed left-5 bottom-5 z-20 w-15 h-15 rounded-full flex justify-center items-center text-white;
  background: #00000059 0% 0% no-repeat padding-box;
}
.filter_area {
  @apply hidden;
}
@screen lg {
  .wrap {
    @apply grid grid-cols-3 mx-10 mb-10;
  }
  .schedule {
    @apply col-span-1 px-10 py-5;
  }
  .schedule_name {
    @apply px-0;
  }
  .favorite_area {
    @apply col-span-2 pr-0 pt-0;
  }
  .filter_area {
    @apply flex mb-6;
  }
  .filter_item {
    @apply w-40 mr-5;
  }
  .filter_select {
    @apply w-full py-2 px-3 border border-j-black-100 rounded-lg;
  }
  .favorite_cards {
    @apply grid-cols-5;
  }
  .favorite_card {
    @apply justify-self-start;
  }
  .go_top {
    @apply hidden;
  }
}
</style>
