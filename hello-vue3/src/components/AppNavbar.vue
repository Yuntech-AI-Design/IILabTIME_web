<!-- src/components/AppNavbar.vue -->
<template>
  <nav class="sticky top-0 w-full h-20 font-ZMG font-bold z-50 ">
    <div class="flex items-center justify-center w-full h-full px-[5%]">
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex items-center justify-center h-full w-[5%]">
          <img class=" h-10 w-auto" :src="logo" alt="logo" />
        </div>
        <div class="flex items-center justify-center h-full w-[90%] text-center text-4xl pb-1">
          <router-link to="/" class="font-bold" :class="{'hidden': menuState}">實習管理系統</router-link>
        </div>
        <div class="flex items-center justify-center h-full w-[5%]">
          <div @click="HandleToggleMenu" class="grid gap-1 items-center w-10 h-10 cursor-pointer">
            <div class="w-10 h-[0.150rem] bg-black transition-all duration-300 origin-center"
              :class="{ 'rotate-45 translate-y-[15px]': menuState }"></div>
            <div class="w-10 h-[0.150rem] bg-black transition-all duration-300"
              :class="{ 'opacity-0': menuState }"></div>
            <div class="w-10 h-[0.150rem] bg-black transition-all duration-300 origin-center"
              :class="{ '-rotate-45 -translate-y-[15px]': menuState }"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <transition enter-active-class="transition-opacity duration-700 ease-in-out"
    leave-active-class="transition-opacity duration-700 ease-in-out" enter-from-class="opacity-0"
    leave-to-class="opacity-0">
    <div v-if="menuState === true"
      class="fixed z-30 pt-[10vh] h-[100vh] inset-x-0 flex items-center justify-center w-full bg-white overflow-hidden font-ZMG"
      @wheel.prevent @touchmove.prevent @scroll.prevent>
      <div class="flex-col items-center justify-center px-[10%] h-full w-full text-6xl overflow-auto">
        <div :key="router.key" v-for="router in routerList" class="flex-col items-center justify-center">
          <MenuItem :router_path="router.path" :router_name="router.name" />
        </div>
      </div>
    </div>
  </transition>
  <!-- <nav class="bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-md shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" class="font-bold text-xl text-white">AI專班實習管理系統</router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/dashboard"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600">
                儀錶板
              </router-link>
              <router-link to="/check-in"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600">
                實習打卡
              </router-link>
              <router-link to="/profile"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600">
                個人資料
              </router-link>
              <router-link to="/intershipform"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600">
                實習資料填寫
              </router-link>
            </div>
          </div>
        </div>
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-200">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
                " />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600">
          儀錶板
        </router-link>
        <router-link to="/check-in"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600">
          實習打卡
        </router-link>
        <router-link to="/profile"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600">
          個人資料
        </router-link>
      </div>
    </div>
  </nav> -->
</template>

<script setup name="AppNavbar">
import logo from "@/assets/logo.png"; // Adjust the path to your logo image
import { computed, reactive } from "vue"; // Import computed from Vue
import { useStore } from "vuex";
import MenuItem from "./NavBar/MenuItem.vue";

const store = useStore(); // Access the Vuex store
const menuState = computed(() => store.getters.getMenuState);
const HandleToggleMenu = () => {
  store.dispatch("HandleMenuState", !menuState.value); // Dispatch the action to toggle the menu state
};
const routerList = reactive([
  { key: 1, name: "首頁", path: "/" },
  { key: 2, name: "管理系統", path: "/dashboard" },
  { key: 3, name: "實習打卡", path: "/check-in" },
  { key: 4, name: "個人資料", path: "/profile" },
  // { key: 5, name: "實習資料填寫", path: "/intershipform" },
]);
</script>
