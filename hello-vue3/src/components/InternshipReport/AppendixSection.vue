<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">伍、附錄</h2>
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">一、實習工作紀錄</h3>
        <input
          type="file"
          @change="handleWeeklyReportsUpload"
          accept="application/json"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
        />
        <p v-if="errorMessages.weeklyReports" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessages.weeklyReports }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weeklyReports: {
    type: Array,
    default: () => []
  },
  errorMessages: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:weeklyReports']);

function handleWeeklyReportsUpload(event) {
  const file = event.target.files[0];
  if (file && file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        emit('update:weeklyReports', JSON.parse(e.target.result));
      } catch {
        emit('update:weeklyReports', []);
      }
    };
    reader.readAsText(file);
  } else {
    emit('update:weeklyReports', []);
  }
}
</script>