<template>
  <div v-if="reports.length" class="mt-4">
    <h3 class="text-xl font-semibold text-gray-700 mb-2">實習時數圖表</h3>
    <canvas ref="hoursChart" class="w-full max-w-lg mx-auto shadow-sm"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  reports: {
    type: Array,
    required: true
  }
});

const hoursChart = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = hoursChart.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.reports.map(report => `第${report.week}週`),
      datasets: [{
        label: '實習時數',
        data: props.reports.map(report => report.hours || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: '時數' } },
        x: { title: { display: true, text: '週次' } }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
canvas {
  height: 400px;
}
</style>