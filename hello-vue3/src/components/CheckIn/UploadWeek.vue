<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-center opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
    >
      <div class="mb-6 md:mb-0">
        <h2 class="text-2xl font-semibold text-stone-950 flex items-center">
          <ArrowUpTrayIcon class="w-8 h-8 mr-2 text-Ghibli-blue" /> 當前狀態
        </h2>
        <p class="text-xl text-stone-700 mt-2">
          您本週
          <span :class="isUploadWeek ? 'text-Ghibli-green' : 'text-Ghibli-red'">
            {{ isUploadWeek ? '已完成上傳進度' : '尚未上傳進度' }}
          </span>
        </p>
        <p class="text-base text-stone-400 mt-1 flex items-center">
          <CalendarIcon class="w-5 h-5 mr-1" /> 最後上傳：{{ lastUploadWeek || '無記錄' }}
        </p>
      </div>
      <div class="flex space-x-4">
        <button
          @click="$emit('check-in')"
          :disabled="isUploadWeek"
          class="px-8 py-4 bg-Ghibli-green text-white rounded-2xl font-semibold shadow-lg hover:bg-Ghibli-yellow hover:text-stone-950 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center text-xl"
        >
          <ArrowUpCircleIcon class="w-6 h-6 mr-2" /> 上傳週誌心得
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CalendarIcon, ArrowUpCircleIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'

defineProps({
  isUploadWeek: Boolean,
  lastUploadWeek: String,
  lastUploadWeekTimestamp: Number,
  headerVisible: {
    type: Boolean,
    default: true
  }
})

// defineEmits(['check-in', 'check-out'])
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