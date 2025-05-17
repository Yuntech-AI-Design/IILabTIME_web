<template>
  <nav class="sticky top-0 w-full h-20 font-ZMG font-bold z-50 bg-white shadow-md">
    <div class="flex items-center justify-center w-full h-full px-[5%]">
      <div class="flex items-center justify-between w-full h-full">
        <!-- Logo -->
        <div class="flex items-center justify-center h-full w-[5%]">
          <img class="h-10 w-auto" :src="logo" alt="logo" />
        </div>
        <!-- 標題 -->
        <div class="flex items-center justify-center h-full text-center text-4xl pb-1">
          <router-link to="/" class="font-bold" :class="{ 'hidden': menuState }">實習管理系統</router-link>
        </div>
        <!-- 選單按鈕 -->
        <div class="flex items-center justify-center h-full w-[5%]">
          <div @click="HandleToggleMenu" class="grid gap-1 items-center w-10 h-10 cursor-pointer">
            <div
              class="w-10 h-[0.150rem] bg-black transition-all duration-300 origin-center"
              :class="{ 'rotate-45 translate-y-[15px]': menuState }"
            ></div>
            <div
              class="w-10 h-[0.150rem] bg-black transition-all duration-300"
              :class="{ 'opacity-0': menuState }"
            ></div>
            <div
              class="w-10 h-[0.150rem] bg-black transition-all duration-300 origin-center"
              :class="{ '-rotate-45 -translate-y-[15px]': menuState }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- 選單展開（側邊欄） -->
  <transition
    enter-active-class="transform transition-transform duration-500 ease-in-out"
    leave-active-class="transform transition-transform duration-500 ease-in-out"
    enter-from-class="translate-x-full"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="menuState === true"
      class="fixed top-0 right-0 z-50 w-3/4 max-w-xs h-full bg-gradient-to-b from-gray-50/80 to-gray-200/80 backdrop-blur-md shadow-lg rounded-l-lg overflow-y-auto font-ZMG"
    >
      <!-- 關閉按鈕 -->
      <div class="flex justify-end p-4">
        <button @click="HandleToggleMenu" class="text-gray-600 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- 選單項 -->
      <div class="flex flex-col items-center justify-center gap-4 py-6">
        <div
          v-for="router in routerList"
          :key="router.key"
          class="w-full text-center"
        >
          <MenuItem
            :router_path="router.path"
            :router_name="router.name"
            class="text-2xl sm:text-xl text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 py-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  </transition>

  <!-- 背景遮罩 -->
  <transition
    enter-active-class="transition-opacity duration-500 ease-in-out"
    leave-active-class="transition-opacity duration-500 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="menuState === true"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      @click="HandleToggleMenu"
    ></div>
  </transition>
</template>

<script setup name="AppNavbar">
import logo from "@/assets/logo.png"; // Adjust the path to your logo image
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import MenuItem from "./NavBar/MenuItem.vue";

const store = useStore();
const menuState = computed(() => store.getters.getMenuState);
const HandleToggleMenu = () => {
  store.dispatch("HandleMenuState", !menuState.value);
};

const routerList = reactive([
  { key: 1, name: '首頁', path: '/' },
  { key: 2, name: '管理系統', path: '/dashboard' },
  { key: 3, name: '實習打卡', path: '/check-in' },
  { key: 4, name: '個人資料', path: '/profile' },
  { key: 5, name: '實習成績', path: '/grades' },
  { key: 6, name: '週誌上傳', path: '/reports' },
  { key: 7, name: '競賽上傳', path: '/competition' },
  { key: 8, name: '討論區', path: '/discussion' }
]);
</script>