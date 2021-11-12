<template>
  <div class="main">
    <div class="tabArea">
      <ul class="tabList">
        <li
          v-for="tab in tabList"
          :key="tab.value"
          :class="{ active: searchParams.tab === tab.value }"
          @click="changeTab(tab.value)"
        >
          {{ tab.name }}
        </li>
      </ul>
    </div>
    <div class="flex">
      <div class="flex-auto mt-4">
        <p class="bold_text">縣市</p>
        <div class="flex justify-between w-full">
          <select v-model="searchParams.city" class="input items-center w-full">
            <option v-for="city in option.city" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <i class="dropdown_icon">
            <img :src="require(`@/assets/images/dropdown.svg`)" />
          </i>
        </div>
      </div>
      <div class="flex-auto mt-4">
        <p class="bold_text">類別</p>
        <div class="flex justify-between w-full">
          <select
            v-model="searchParams.category"
            class="input items-center w-full"
          >
            <option value="">請選擇類別</option>
            <option
              v-for="option in option[searchParams.tab]"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <i class="dropdown_icon">
            <img :src="require(`@/assets/images/dropdown.svg`)" />
          </i>
        </div>
      </div>
      <div class="flex-auto mt-4">
        <p class="bold_text">關鍵字</p>
        <div class="flex justify-between w-full">
          <input
            v-model="searchParams.keyword"
            type="text"
            class="input items-center w-full"
            placeholder="請輸入關鍵字"
          />
        </div>
      </div>
      <div class="search_btn" @click="search">搜尋</div>
    </div>
  </div>
</template>
<script>
import { option } from '@/assets/json/options.json'
import {
  fetchScenicSpotAll,
  fetchRestaurantAll,
  fetchHotelAll
} from '@/apis/tourism'
export default {
  data() {
    return {
      option,
      tabList: [
        { name: '景點', value: 'scenicSpot' },
        { name: '旅宿', value: 'hotel' },
        { name: '餐飲', value: 'restaurant' }
      ],
      searchParams: {
        tab: 'scenicSpot',
        city: '全部',
        category: '全部',
        keyword: ''
      }
    }
  },
  computed: {
    searchData() {
      return this.$store.state.searchData.filter((_, i) => i < 10)
    },
    apiParams() {
      const { city, category, keyword } = this.searchParams
      let $filter = ''
      const addParams = () => ($filter ? ' and' : '')

      if (city !== '全部') {
        $filter += `City eq '${city}'`
      }

      if (category !== '全部') {
        const ClassEqStr = `Class1 eq '${category}' or Class1 eq '${category}' or Class1 eq '${category}'`
        $filter += `${addParams()} (${ClassEqStr})`
      }

      if (keyword) {
        const keywordStr = (keyword) =>
          ` contains(Name,'${keyword}') or contains(Address ,'${keyword}') or contains(DescriptionDetail,'${keyword}') or contains(Description,'${keyword}')`
        const keywordList = keyword
          .split(' ')
          .reduce(
            (acc, cur, i, arr) =>
              (acc += `${keywordStr(cur)} ${i !== arr.length - 1 ? 'or' : ''}`),
            ''
          )
        $filter += `${addParams()} (${keywordList})`
      }

      return $filter ? { $filter } : {}
    },
    fetchApi() {
      const { tab } = this.searchParams
      if (tab === 'scenicSpot') {
        return fetchScenicSpotAll
      }
      if (tab === 'hotel') {
        return fetchRestaurantAll
      }
      if (tab === 'restaurant') {
        return fetchHotelAll
      }
      return () => {}
    }
  },
  methods: {
    changeTab(tab) {
      this.searchParams.tab = tab
      this.searchParams.class = '全部'
    },
    search() {
      this.loading = true
      this.fetchApi(this.apiParams)
        .then(({ data }) => {
          this.$store.commit('setSearchData', data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.tabList {
  @apply flex;
}

.tabList > li {
  @apply mr-10 bold_text py-1 px-2;
  @apply text-j-black-500;
}

.tabList > .active {
  @apply bold_text z-20 border-j-orange border-b-4;
}

.tabArea::after {
  content: '';
  @apply absolute w-full left-0 transform -translate-y-0.5 h-0.5 bg-j-black-100 block;
}

.main {
  @apply left-20 rounded-2xl bg-white pt-4 pb-6 px-8 shadow-md;
}

.bold_text {
  @apply font-bold text-xl text-j-black-900;
}

.flex > .flex-auto {
  @apply mr-10;
}

.input {
  @apply rounded-lg max-w-xl h-10 border border-gray-300 mt-3 py-1 px-3;
}

.input_text button,
input,
optgroup,
select {
  @apply text-j-black-900;
}

.input_text button,
input,
optgroup,
select,
textarea {
  @apply text-lg font-normal text-gray-500 appearance-none;
}

.search_btn {
  @apply rounded-lg w-20 h-10 text-lg text-white text-center py-1 leading-8 self-end bg-j-orange;
}

.dropdown_icon {
  @apply relative transform -translate-x-7 translate-y-6 z-40;
}
</style>
