<template>
    <div class="border-b border-gray-200 pb-4">
      <button 
        @click="isOpen = !isOpen" 
        class="flex justify-between items-center w-full text-left font-semibold py-4 focus:outline-none"
      >
        <span class="text-lg">{{ question }}</span>
        <svg 
          class="w-5 h-5 text-indigo-600 transform transition-transform duration-200" 
          :class="{ 'rotate-180': isOpen }"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <div 
        v-show="isOpen" 
        class="pb-4 text-gray-600"
      >
        <p>{{ answer }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  defineProps({
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  })
  
  const isOpen = ref(false)
  </script>