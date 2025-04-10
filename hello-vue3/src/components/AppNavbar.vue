<!-- src/components/AppNavbar.vue -->
<template>
  <nav class="fixed mt-[100px] top-0 w-full h-[100px] font-ZMG font-bold z-50 bg-white">
    <div class="flex items-center justify-center w-full h-full px-[10%]">
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex items-center justify-center h-full w-[5%]">
          <img class="h-[48px] w-auto" :src="logo" alt="logo" />
        </div>
        <div class="flex items-center justify-center h-full w-[90%] text-center text-5xl">
          <router-link to="/" class="font-bold">實習管理系統</router-link>
        </div>
        <div class="flex items-center justify-center h-full w-[5%]">
          <div @click="toggle_menu =! toggle_menu" class="grid gap-[6px] items-center w-[48px] h-[48px] cursor-pointer">
            <div class="w-[48px] h-[6px] bg-black transition-all duration-300 origin-center"
           :class="{ 'rotate-45 translate-y-[18px]': toggle_menu }"></div>
            <div class="w-[48px] h-[6px] bg-black transition-all duration-300"
           :class="{ 'opacity-0': toggle_menu }"></div>
            <div class="w-[48px] h-[6px] bg-black transition-all duration-300 origin-center"
           :class="{ '-rotate-45 -translate-y-[18px]': toggle_menu }"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <transition
    enter-active-class="duration-500 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-400 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-show="toggle_menu"
      class="fixed z-30 top-[100px] h-[calc(100vh-100px)] inset-x-0 flex items-center justify-center w-full bg-white overflow-hidden font-ZMG"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      >
      <div class="flex-col items-center justify-center px-[10%] py-[5%] h-full w-full text-7xl overflow-auto">
        <div class="flex-col items-center justify-center">
          <div class="flex items-center justify-center w-full h-full text-center p-10">
            <router-link to="/" class="font-bold" @click="toggle_menu = false">首頁</router-link>
          </div>
          <div class="flex items-center justify-center w-full h-full text-center p-10">
            <router-link to="/" class="font-bold" @click="toggle_menu = false">AI專班實習管理系統</router-link>
          </div>
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
import { ref } from "vue"; // Importing Vue's ref for reactivity
import logo from "@/assets/logo.png"; // Adjust the path to your logo image
const toggle_menu = ref(false); // State for mobile menu toggle
// const ToggleMenu = () => {
//   // Function to toggle the mobile menu state
//   toggle_menu.value = !toggle_menu.value;
// };
// return { mobileMenuOpen, logo }
</script>
