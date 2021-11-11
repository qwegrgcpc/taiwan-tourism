<template>
  <div class="home flex items-center flex-col">
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-state"
          >
            縣市
          </label>
          <div class="relative">
            <select
              v-model="selectedCity"
              class="
                block
                appearance-none
                w-full
                bg-gray-200
                border border-gray-200
                text-gray-700
                py-3
                px-4
                pr-8
                rounded
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-state"
            >
              <option v-for="city in cityList" :key="city">{{ city }}</option>
            </select>
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                text-gray-700
              "
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-state"
          >
            類別
          </label>
          <div class="relative">
            <select
              v-model="selectedClass"
              class="
                block
                appearance-none
                w-full
                bg-gray-200
                border border-gray-200
                text-gray-700
                py-3
                px-4
                pr-8
                rounded
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-state"
            >
              <option v-for="item in classList" :key="item">{{ item }}</option>
            </select>
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                text-gray-700
              "
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-zip"
          >
            關鍵字
          </label>
          <input
            v-model="inputKeyword"
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-gray-200
              rounded
              py-3
              px-4
              leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
            id="grid-zip"
            type="text"
            placeholder="關鍵字"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
          <button
            class="
              py-2
              px-4
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="button"
            @click="search"
          >
            <div v-show="loading" class="animate-spin h-5 w-5 mr-3">
              <img src="@/assets/images/addDay.svg" />
            </div>
            <span v-show="!loading"> 搜索 </span>
          </button>
        </div>
        <div class="w-full md:w-2/3 px-3 mt-6 mb-6 md:mb-0">
          <h2>
            {{ ScenicSpotApiParams }}
          </h2>
        </div>
      </div>
    </form>
    <div>
      <div v-for="item in data" :key="item.ID">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import cityList from '@/assets/json/taiwan_districts.json'
import { fetchScenicSpotAll } from '@/apis/tourism'
export default {
  name: 'Home',
  data() {
    return {
      cityList: ['全部', ...cityList.map((e) => e.name)],
      classList: [
        '全部',
        '小吃/特產類',
        '文化類',
        '古蹟類',
        '生態類',
        '休閒農業類',
        '自然風景類',
        '其他',
        '國家公園類',
        '國家風景區類',
        '都會公園類',
        '森林遊樂區類',
        '溫泉類',
        '遊憩類',
        '廟宇類',
        '藝術類',
        '體育健身類',
        '觀光工廠類',
        '林場類'
      ],
      selectedCity: '全部',
      selectedClass: '全部',
      inputKeyword: '',
      data: [],
      loading: false
    }
  },
  computed: {
    ScenicSpotApiParams() {
      const { selectedCity, selectedClass, inputKeyword } = this
      let $filter = ''
      const addParams = () => ($filter ? ' and' : '')

      if (selectedCity !== '全部') {
        $filter += `City eq '${selectedCity}'`
      }

      if (selectedClass !== '全部') {
        const ClassEqStr = `Class1 eq '${selectedClass}' or Class1 eq '${selectedClass}' or Class1 eq '${selectedClass}'`
        $filter += `${addParams()} (${ClassEqStr})`
      }

      if (inputKeyword) {
        const keywordStr = (keyword) =>
          ` contains(Name,'${keyword}') or contains(Address ,'${keyword}')  or contains(DescriptionDetail,'${keyword}') or contains(Description,'${keyword}')`
        const keywordList = inputKeyword
          .split(' ')
          .reduce(
            (acc, cur, i, arr) =>
              (acc += `${keywordStr(cur)} ${i !== arr.length - 1 ? 'or' : ''}`),
            ''
          )
        $filter += `${addParams()} (${keywordList})`
      }

      return $filter ? { $filter } : {}
    }
  },
  mounted() {
    console.log(this.cityList)
  },
  methods: {
    search() {
      this.loading = true
      fetchScenicSpotAll(this.ScenicSpotApiParams)
        .then(({ data }) => {
          this.data = data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
