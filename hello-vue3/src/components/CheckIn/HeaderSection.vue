<template>
  <section class="w-full h-[20vh] pt-[8vh] px-[5%] relative z-10">
    <div class="flex flex-col items-center justify-center w-full h-full">
      <h1
        class="text-5xl font-bold flex items-center justify-center opacity-0"
        :class="{ 'animate-fade-in-up-relative': visible }"
      >
        <ClockIcon class="w-12 h-12 mr-3 text-Ghibli-yellow" /> 實習打卡頁面
      </h1>
    </div>
  </section>
</template>

<script setup>
import { ClockIcon } from '@heroicons/vue/24/outline'

defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
</script>