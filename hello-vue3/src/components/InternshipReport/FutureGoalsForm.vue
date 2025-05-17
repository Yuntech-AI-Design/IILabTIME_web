<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">肆、實習後之未來期許、生涯規劃及目標</h2>
    <textarea
      :value="futureGoals"
      @input="$emit('update:futureGoals', $event.target.value)"
      class="w-full border p-4 rounded-lg shadow-sm"
      placeholder="請輸入未來期許、生涯規劃（字數 1200 字以上）"
      rows="8"
    />
    <p v-if="errorMessage" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
defineProps({
  futureGoals: String,
  errorMessage: String
});
</script>