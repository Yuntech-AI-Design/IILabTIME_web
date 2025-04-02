<template>
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100 flex flex-col h-full">
      <div class="mb-4 p-3 rounded-full bg-indigo-100 text-indigo-600 w-14 h-14 flex items-center justify-center">
        <component :is="iconComponent" class="w-7 h-7" />
      </div>
      <h3 class="text-xl font-bold mb-3">{{ title }}</h3>
      <p class="text-gray-600 flex-grow">{{ desc }}</p>
      <div class="mt-4">
        <router-link to="/features" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
          了解更多
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  defineProps({
    icon: String,
    title: String,
    desc: String
  })
  
  const iconComponent = computed(() => {
    // 這裡可以根據 icon 返回不同的 SVG，如果想這樣做的話
    return {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      `
    }
  })
  </script>
  
  