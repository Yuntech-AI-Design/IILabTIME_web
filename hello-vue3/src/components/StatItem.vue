<template>
    <div class="text-center p-6 rounded-lg bg-indigo-800 bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition">
      <div class="text-4xl md:text-5xl font-bold mb-2">{{ number }}</div>
      <div class="text-xl md:text-2xl font-medium mb-1">{{ label }}</div>
      <div v-if="description" class="text-indigo-200 text-sm">{{ description }}</div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    number: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  })
  </script>