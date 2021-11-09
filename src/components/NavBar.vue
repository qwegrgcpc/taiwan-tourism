<template>
  <nav class="nav" :class="{ active: isSmallerLg && isOpen }">
    <div class="nav_area">
      <div class="vertical-center">
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
      <div v-show="showMenuList" class="flex lg:w-auto w-full justify-center">
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
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    menuIcon() {
      return this.isOpen ? "menuClose" : "menu";
    },
    isSmallerLg() {
      return this.$breakpoint.isSmaller('lg');
    },
    showMenuList() {
      return !this.isSmallerLg || (this.isSmallerLg && this.isOpen) 
    },
  },
};
</script>

<style scoped>
.vertical-center {
  display: flex;
  align-items: center;
}
.nav {
  @apply sticky top-0 bg-white w-full;
}
.nav.active {
  @apply fixed h-full;
}
.nav_area {
  @apply flex justify-between px-5 flex-wrap;
}
.search_btn {
  @apply text-xl flex justify-center text-j-black-900 font-bold mt-10 border-b-2 divide-j-black-100;
}
.itinerary_btn {
  @apply rounded-full text-xl text-white bg-j-black-900 py-2 px-5 mt-12;
}

@screen lg {
  .nav {
    @apply px-10 sticky top-0;
  }
  .nav_area {
    @apply px-10 h-24;
  }
  .menu_list {
    @apply flex lg:flex-row flex-col items-center;
  }
  .search_btn {
    @apply text-j-blue-300 mr-10 vertical-center mt-0 border-0;
  }
  .itinerary_btn {
    @apply mt-0;
  }
}
</style>
