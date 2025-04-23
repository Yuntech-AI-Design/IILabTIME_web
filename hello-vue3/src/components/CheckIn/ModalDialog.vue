<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 border-4 border-stone-950 shadow-xl max-w-sm w-full">
      <h3 class="text-xl font-semibold text-stone-950 mb-4 flex items-center">
        <InformationCircleIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> {{ message }}
      </h3>
      <div class="flex justify-end space-x-4">
        <template v-if="pendingAction">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-300 text-stone-950 rounded hover:bg-gray-400"
          >
            取消
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-Ghibli-blue text-white rounded hover:bg-Ghibli-yellow hover:text-stone-950"
          >
            確認
          </button>
        </template>
        <template v-else>
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-Ghibli-blue text-white rounded hover:bg-Ghibli-yellow hover:text-stone-950"
          >
            確定
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  message: String,
  pendingAction: String
})

defineEmits(['confirm', 'cancel', 'close'])
</script>

<style scoped>
/* Tailwind handles modal styling */
</style>