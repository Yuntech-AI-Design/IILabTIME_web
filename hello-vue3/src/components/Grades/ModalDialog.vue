<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
    @click.self="emitClose"
  >
    <div
      class="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl transform transition-all duration-300 animate-fade-in"
    >
      <!-- 標題 -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-stone-950">{{ message }}</h3>
        <button @click="emitClose" class="text-stone-500 hover:text-stone-950" aria-label="關閉">
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- 內容插槽 -->
      <div class="mb-6">
        <slot />
      </div>

      <!-- 按鈕 -->
      <div class="flex justify-end space-x-4">
        <button
          @click="emitCancel"
          class="px-4 py-2 bg-stone-200 text-stone-950 rounded-lg font-semibold hover:bg-stone-300 transition-all"
        >
          取消
        </button>
        <button
          @click="emitConfirm"
          class="px-4 py-2 bg-Ghibli-blue text-white rounded-lg font-semibold hover:bg-Ghibli-yellow transition-all"
        >
          確認儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { XIcon } from '@heroicons/vue/24/outline';

// 定義接收的 props，無需指定變數名
defineProps({
  message: { type: String, required: true },
  visible: { type: Boolean, default: false }
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

function emitConfirm() { emit('confirm'); }
function emitCancel()  { emit('cancel'); }
function emitClose()   { emit('close'); }
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95) }
  to   { opacity: 1; transform: scale(1) }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
