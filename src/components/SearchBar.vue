<template>
  <div class="main">
    <div class="tabArea">
      <ul class="flex">
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
    <div class="tabContent">
      <div class="inputArea">
        <div>
          <p>縣市</p>
          <div>
            <select v-model="searchParams.city" class="input">
              <option v-for="city in option.city" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
            <i class="dropdown_icon">
              <img :src="require(`@/assets/images/dropdown.svg`)" />
            </i>
          </div>
        </div>
        <div>
          <p>類別</p>
          <div>
            <select v-model="searchParams.category" class="input">
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
        <div>
          <p>關鍵字</p>
          <div>
            <input
              v-model="searchParams.keyword"
              type="text"
              class="input"
              placeholder="請輸入關鍵字"
            />
          </div>
        </div>
      </div>
      <div class="searchArea">
        <div class="search_btn" @click="search">搜尋</div>
      </div>
    </div>
  </div>
</template>
<script>
import { option } from "@/assets/json/options.json";
import {
  fetchScenicSpotAll,
  fetchRestaurantAll,
  fetchHotelAll,
} from "@/apis/tourism";
export default {
  data() {
    return {
      option,
      tabList: [
        { name: "景點", value: "scenicSpot" },
        { name: "旅宿", value: "hotel" },
        { name: "餐飲", value: "restaurant" },
      ],
      searchParams: {
        tab: "scenicSpot",
        city: "全部",
        category: "全部",
        keyword: "",
      },
    };
  },
  computed: {
    searchData() {
      return this.$store.state.searchData.filter((_, i) => i < 10);
    },
    apiParams() {
      const { city, category, keyword } = this.searchParams;
      let $filter = "";
      const addParams = () => ($filter ? " and" : "");

      if (city !== "全部") {
        $filter += `City eq '${city}'`;
      }

      if (category !== "全部") {
        const ClassEqStr = `Class1 eq '${category}' or Class1 eq '${category}' or Class1 eq '${category}'`;
        $filter += `${addParams()} (${ClassEqStr})`;
      }

      if (keyword) {
        const keywordStr = (keyword) =>
          ` contains(Name,'${keyword}') or contains(Address ,'${keyword}') or contains(DescriptionDetail,'${keyword}') or contains(Description,'${keyword}')`;
        const keywordList = keyword
          .split(" ")
          .reduce(
            (acc, cur, i, arr) =>
              (acc += `${keywordStr(cur)} ${i !== arr.length - 1 ? "or" : ""}`),
            ""
          );
        $filter += `${addParams()} (${keywordList})`;
      }

      return $filter ? { $filter } : {};
    },
    fetchApi() {
      const { tab } = this.searchParams;
      if (tab === "scenicSpot") {
        return fetchScenicSpotAll;
      }
      if (tab === "hotel") {
        return fetchRestaurantAll;
      }
      if (tab === "restaurant") {
        return fetchHotelAll;
      }
      return () => {};
    },
  },
  methods: {
    changeTab(tab) {
      this.searchParams.tab = tab;
      this.searchParams.class = "全部";
    },
    search() {
      this.loading = true;
      this.fetchApi(this.apiParams)
        .then(({ data }) => {
          this.$store.commit("setSearchData", data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.main {
  @apply bg-white pt-4 pb-6 max-w-full;
}

.flex > li {
  @apply mr-10 bold_text py-1 px-2 cursor-pointer;
  @apply text-j-black-500;
}

.flex > .active {
  @apply bold_text z-20 border-j-orange border-b-4;
}

.tabArea {
  @apply ml-8;
}

.tabArea::after {
  content: "";
  @apply absolute w-full -left-2 transform -translate-y-0.5 h-0.5 bg-j-black-100 block;
}

.bold_text {
  @apply font-bold text-xl text-j-black-900;
}

.inputArea {
  @apply flex-auto;
}

.inputArea > div {
  @apply mt-4 w-full flex;
}

.inputArea > div > p {
  @apply bold_text w-20 self-center;
}

.inputArea > div > div {
  @apply flex flex-auto;
}

.searchArea {
  @apply mt-4;
}

.input {
  @apply bg-white rounded-lg h-10 border border-gray-300 py-1 px-3 cursor-pointer items-center w-full;
}

.input_text button,
input,
optgroup,
select,
textarea {
  @apply text-lg text-gray-500 appearance-none;
}

.search_btn {
  @apply rounded-lg w-full h-10 text-lg text-white text-center py-1 leading-8 self-end bg-j-orange cursor-pointer;
}

.dropdown_icon {
  @apply absolute right-0 transform -translate-x-4 translate-y-4 z-40;
}

@screen lg {
  .main {
    @apply shadow-md rounded-2xl px-8;
  }

  .tabArea {
    @apply ml-0;
  }

  .tabArea::after {
    @apply left-0;
  }

  .tabContent {
    @apply flex;
  }

  .inputArea {
    @apply flex;
  }

  .inputArea > div {
    @apply w-1/3 flex-wrap;
  }

  .inputArea > div > p {
    @apply w-full;
  }

  .inputArea > div > div {
    @apply w-full;
  }

  .input {
    @apply mt-3;
  }

  .searchArea {
    @apply mt-auto pr-0;
  }

  .search_btn {
    @apply w-20 ml-4;
  }

  .dropdown_icon{
    @apply relative -translate-x-6 translate-y-6
  }
}
</style>
