<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">壹、實習計畫書</h2>
    <input
      type="file"
      @change="onFileChange"
      accept="application/pdf"
      class="w-full border px-3 py-2 rounded-lg shadow-sm"
    />
    <p v-if="errorMessage" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessage }}</p>
    <p v-if="planFile" class="text-gray-600 text-sm mt-2">已上傳：{{ planFile.name }}</p>
  </div>
</template>

<script setup>
const { planFile, errorMessage } = defineProps({
  planFile: File,
  errorMessage: String
});
const emit = defineEmits(['update:planFile']);

function onFileChange(e) {
  const file = e.target.files[0] || null;
  emit('update:planFile', file);
}
</script>