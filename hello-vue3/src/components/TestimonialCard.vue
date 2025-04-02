<template>
  <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
        <img :src="image || '/avatar-placeholder.png'" :alt="name" class="w-full h-full object-cover" />
      </div>
      <div>
        <h4 class="font-bold">{{ name }}</h4>
        <p class="text-gray-600 text-sm">{{ role }}</p>
      </div>
    </div>
    <div class="relative">
      <svg class="absolute -top-3 -left-2 w-8 h-8 text-indigo-200 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p class="text-gray-700 pl-6">{{ quote }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  quote: {
    type: String,
    required: true
  }
})
</script>
  