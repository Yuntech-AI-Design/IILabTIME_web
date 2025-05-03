<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 text-center shadow-xl opacity-0"
        :class="{ 'animate-fade-in-up-relative': headerVisible }"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-semibold text-stone-950 flex items-center justify-center mb-2">
          <ClockIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 本週時數
        </h3>
        <p class="text-4xl font-bold text-Ghibli-blue">{{ weeklyHours }} 小時</p>
      </div>
      <div
        class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 text-center shadow-xl opacity-0"
        :class="{ 'animate-fade-in-up-relative': headerVisible }"
        style="animation-delay: 0.4s"
      >
        <h3 class="text-2xl font-semibold text-stone-950 flex items-center justify-center mb-2">
          <CheckCircleIcon class="w-7 h-7 mr-2 text-Ghibli-green" /> 本月打卡
        </h3>
        <p class="text-4xl font-bold text-Ghibli-green">{{ monthlyCheckIns }} 次</p>
      </div>
      <div
        class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 text-center shadow-xl opacity-0"
        :class="{ 'animate-fade-in-up-relative': headerVisible }"
        style="animation-delay: 0.6s"
      >
        <h3 class="text-2xl font-semibold text-stone-950 flex items-center justify-center mb-2">
          <ChartBarIcon class="w-7 h-7 mr-2 text-Ghibli-yellow" /> 總時數
        </h3>
        <p class="text-4xl font-bold text-Ghibli-yellow">{{ totalHours }} 小時</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ClockIcon, CheckCircleIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps({
  weeklyHours: Number,
  monthlyCheckIns: Number,
  totalHours: Number,
  headerVisible: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.home-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>