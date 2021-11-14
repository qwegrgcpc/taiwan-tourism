<template>
  <div class="wrap">
    <ul class="flex flex-wrap">
      <li class="item" v-for="i in 5" :key="i" @click="$router.push('/Schedule/test')">
        <div class="m-2.5 aspect-w-3 aspect-h-2">
          <img
            class="w-full h-full object-center object-cover rounded-t-xl"
            src="https://www.eastcoast-nsa.gov.tw/image/419/640x480"
          />
        </div>
        <div class="title">台中一日遊</div>
      </li>
      <li class="item p-1">
        <img
          class="w-full h-full object-center object-cover rounded-t-xl"
          src="@/assets/images/addJourneyName.svg"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
  @apply mx-5;
}
.item {
  @apply w-40 h-40 mb-2 border border-j-black-100 rounded-2xl mx-auto;
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
