<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <h2 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center">
        <DocumentTextIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 打卡歷史記錄
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-Ghibli-skin text-stone-950">
              <th class="py-3 px-4 font-semibold">日期</th>
              <th class="py-3 px-4 font-semibold">上班時間</th>
              <th class="py-3 px-4 font-semibold">下班時間</th>
              <th class="py-3 px-4 font-semibold">時數</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in checkInRecords"
              :key="index"
              class="border-b border-stone-300 hover:bg-Ghibli-skin/30"
            >
              <td class="py-3 px-4">{{ record.date }}</td>
              <td class="py-3 px-4">{{ record.checkIn }}</td>
              <td class="py-3 px-4">{{ record.checkOut || '未打卡' }}</td>
              <td class="py-3 px-4">{{ record.hours || '-' }} 小時</td>
            </tr>
            <tr v-if="checkInRecords.length === 0">
              <td colspan="4" class="py-3 px-4 text-center text-gray-500">暫無打卡記錄</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

defineProps({
  checkInRecords: Array,
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