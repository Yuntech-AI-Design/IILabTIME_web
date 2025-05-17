<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl transform transition-all duration-300 scale-95 animate-fade-in"
    >
      <!-- 標題 -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-stone-950">{{ message }}</h3>
        <button
          @click="$emit('close')"
          class="text-stone-500 hover:text-stone-950 transition-colors"
          aria-label="關閉彈窗"
        >
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
          @click="$emit('cancel')"
          class="px-4 py-2 bg-stone-200 text-stone-950 rounded-lg font-semibold hover:bg-stone-300 transition-all duration-300"
        >
          取消
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-Ghibli-blue text-white rounded-lg font-semibold hover:bg-Ghibli-yellow hover:text-stone-950 transition-all duration-300"
          :class="{ 'bg-Ghibli-green': pendingAction === 'export' }"
        >
          {{ pendingAction === 'edit' ? '確認儲存' : '確認導出' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/24/outline';

defineProps({
  message: {
    type: String,
    required: true
  },
  pendingAction: {
    type: String,
    default: 'edit'
  },
  visible: {
    type: Boolean,
    default: false
  }
});

defineEmits(['confirm', 'cancel', 'close']);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>