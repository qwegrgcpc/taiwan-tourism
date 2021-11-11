<template>
  <div class="main">
    <div class="tabArea">
      <ul class="tabList">
        <li
          v-for="tab in tabList"
          :key="tab.value"
          :class="{ active: search.tab === tab.value }"
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
          <select v-model="search.city" class="input items-center w-full">
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
          <select v-model="search.class" class="input items-center w-full">
            <option value="">請選擇類別</option>
            <option
              v-for="option in option[search.tab]"
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
            type="text"
            class="input items-center w-full"
            placeholder="請輸入關鍵字"
          />
        </div>
      </div>
      <div class="search_btn">搜尋</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [
        { name: "景點", value: "scenicSpot" },
        { name: "旅宿", value: "hotel" },
        { name: "餐飲", value: "restaurant" },
      ],
      search: {
        tab: "scenicSpot",
        city: "台中市",
        class: "",
        keyWord: "",
      },
      option: {
        city: [
          "全部",
          "臺北市",
          "新北市",
          "桃園市",
          "臺中市",
          "臺南市",
          "高雄市",
          "基隆市",
          "新竹市",
          "新竹縣",
          "苗栗縣",
          "彰化縣",
          "南投縣",
          "雲林縣",
          "嘉義縣",
          "嘉義市",
          "屏東縣",
          "宜蘭縣",
          "花蓮縣",
          "臺東縣",
          "金門縣",
          "澎湖縣",
          "連江縣",
        ],
        scenicSpot: [
          "全部",
          "小吃/特產類",
          "文化類",
          "古蹟類",
          "生態類",
          "休閒農業類",
          "自然風景類",
          "其他",
          "國家公園類",
          "國家風景區類",
          "都會公園類",
          "森林遊樂區類",
          "溫泉類",
          "遊憩類",
          "廟宇類",
          "藝術類",
          "體育健身類",
          "觀光工廠類",
          "林場類",
        ],
        hotel: ["全部", "民宿", "一般旅館", "國際觀光旅館", "一般觀光旅館"],
        restaurant: [
          "全部",
          "地方特產",
          "異國料理",
          "其他",
          "中式美食",
          "夜市小吃",
          "甜點冰品",
          "伴手禮",
          "素食",
          "火烤料理",
        ],
      },
    };
  },
  methods: {
    changeTab(tab) {
      this.search.tab = tab;
      this.search.class = "";
    },
  },
};
</script>
<style scoped>
.tabList {
  @apply flex;
}

.tabList > li {
  @apply mr-10 bold_text py-1 px-2;
  @apply text-j-black-500
}

.tabList > .active {
  @apply bold_text z-20 border-j-orange border-b-4;
}

.tabArea::after {
  content: "";
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