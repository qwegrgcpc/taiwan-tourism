<template>
  <nav class="menu">
    <div class="logo">
      <img
        class="lg:h-10 h-7"
        src="@/assets/images/logo.svg"
        alt="台灣哪裡趣"
      />
    </div>
    <div class="block lg:hidden">
      <button class="py-2" @click="isOpen = !isOpen">
        <img class="h-5" :src="require(`@/assets/images/${menuIcon}.svg`)" />
      </button>
    </div>
    <div class="flex lg:w-auto w-full justify-center">
      <ul class="menu_list">
        <li class="search_btn">
          <router-link to="/">景點 </router-link>
        </li>
        <li class="search_btn">
          <router-link to="/">旅宿</router-link>
        </li>
        <li class="search_btn">
          <router-link to="/">餐飲</router-link>
        </li>
        <li class="itinerary_btn">
          <router-link class="vertical-center" to="/">
            <i><img src="@/assets/images/journey.svg" /></i> 自訂行程
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    menuIcon() {
      return this.isOpen ? 'menuClose' : 'menu'
    }
  }
}
</script>

<style scoped>
.vertical-center {
  display: flex;
  align-items: center;
}
.menu {
  @apply flex justify-between items-center px-5 flex-wrap bg-white fixed w-full h-full;
}

.itinerary_btn {
  @apply rounded-full text-xl text-white bg-j-black-900 py-2 px-5;
}

@screen lg {
  .menu {
    @apply px-10 h-24 sticky top-0;
  }
  .menu_list {
    @apply lg:flex-row;
  }
  .menu_list {
    @apply flex lg:flex-row flex-col items-center;
  }
  .search_btn {
    @apply text-xl text-j-blue-300 font-bold mr-10 vertical-center;
  }
}
</style>
