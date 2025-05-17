<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">貳、實習成果及心得</h2>
    <textarea
      :value="achievements"
      @input="$emit('update:achievements', $event.target.value)"
      class="w-full border p-4 rounded-lg shadow-sm"
      placeholder="請輸入實習成果（字數 1200 字以上）"
      rows="8"
    />
    <p v-if="errorMessage" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
defineProps({
  achievements: String,
  errorMessage: String
});
</script>