<template>
  <div class="wrap">
    <div>
      <div class="schedule">
        <div class="schedule_name">
          <input
            class="w-full h-10 rounded-lg py-2 px-3"
            type="text"
            placeholder="請輸入行程名稱"
          />
        </div>
        <ul class="flex h-10">
          <li class="py-2 pl-5 px-1 text-lg lg:px-2">DAY</li>
          <li class="page_itme">
            <button class="page_btn active">1</button>
          </li>
          <li class="page_itme">
            <button class="page_btn">2</button>
          </li>
          <li class="page_itme">
            <button class="page_btn">2</button>
          </li>
          <li class="page_itme">
            <button class="page_btn">2</button>
          </li>
          <li class="page_itme">
            <button class="page_btn">
              <img src="@/assets/images/addDay.svg" />
            </button>
          </li>
        </ul>
        <div class="items">
          <div class="flex justify-between mb-2">
            <span class="self-end text-base">時間</span>
            <div class="flex py-5">
              <img class="w-7 mr-3" src="@/assets/images/removeJourney.svg" />
              <span class="text-lg font-light">刪除此日行程</span>
            </div>
          </div>
          <ul class="content">
            <li v-for="i in 5" :key="i" class="item">
              <div class="time_area">
                <div class="time mb-1">
                  <input class="input_num" type="number" />
                  :
                  <input class="input_num" type="number" />
                </div>
                <div class="time">
                  <input class="input_num" type="number" />
                  :
                  <input class="input_num" type="number" />
                </div>
              </div>
              <div class="info">
                <div class="absolute top-2 right-2 z-10">
                  <img class="w-5 h-5" src="@/assets/images/itemClose.svg" />
                </div>
                <div class="w-20 h-20">
                  <img
                    class="img"
                    src="https://www.eastcoast-nsa.gov.tw/image/419/640x480"
                    alt=""
                  />
                </div>
                <div class="pl-2.5 flex flex-col justify-between">
                  <div class="text-base font-bold">台北米粉湯</div>
                  <div class="flex text-base font-light">
                    <img
                      class="mr-2.5"
                      src="@/assets/images/phone.svg"
                    />0912-890673
                  </div>
                  <div class="flex text-base font-light">
                    <img
                      class="mr-2.5"
                      src="@/assets/images/map.svg"
                    />台北市左營區
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="flex justify-end pb-5 lg:hidden">
            <button class="back">返回</button>
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
        <li v-for="i in 30" :key="i" class="favorite_card">
          <div class="absolute top-2 right-2 z-10">
            <img class="w-6 h-6" src="@/assets/images/itemClose.svg" />
          </div>
          <div class="aspect-w-3 aspect-h-2">
            <img
              class="w-full h-full object-center object-cover rounded-t-2xl"
              src="https://www.eastcoast-nsa.gov.tw/image/419/640x480"
            />
          </div>
          <div class="favorite_info">
            <div class="favorite_name">台北米粉湯</div>
            <div class="favorite_location">
              <img class="w-4" src="@/assets/images/map.svg" />
              台北市左營區蓮潭
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="go_top">TOP</div>
  </div>
</template>

<script>
export default {};
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
