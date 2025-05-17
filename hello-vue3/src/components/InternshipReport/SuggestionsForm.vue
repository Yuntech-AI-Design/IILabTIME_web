<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">參、建議事項</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-lg font-medium text-gray-700 mb-2">一、對自我和課程的檢視</label>
        <textarea
          :value="selfReflection"
          @input="emit('update:selfReflection', $event.target.value)"
          class="w-full border p-4 rounded-lg shadow-sm"
          placeholder="請輸入自我檢視（字數 500 字以上）"
          rows="6"
        />
        <p v-if="errorMessageSelf" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessageSelf }}</p>
      </div>
      <div>
        <label class="block text-lg font-medium text-gray-700 mb-2">二、給學弟妹與機構的建議</label>
        <textarea
          :value="institutionSuggestions"
          @input="emit('update:institutionSuggestions', $event.target.value)"
          class="w-full border p-4 rounded-lg shadow-sm"
          placeholder="請輸入建議（字數 500 字以上）"
          rows="6"
        />
        <p v-if="errorMessageInstitution" class="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">{{ errorMessageInstitution }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  selfReflection,
  institutionSuggestions,
  errorMessageSelf,
  errorMessageInstitution
} = defineProps({
  selfReflection: String,
  institutionSuggestions: String,
  errorMessageSelf: String,
  errorMessageInstitution: String
});
const emit = defineEmits([
  'update:selfReflection',
  'update:institutionSuggestions'
]);
</script>