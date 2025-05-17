<template>
  <form @submit.prevent="submitReply" class="bg-gray-50 rounded-lg p-4">
    <textarea
      v-model="newReply.content"
      placeholder="請輸入您的回覆"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[80px]"
      required
    ></textarea>
    <button
      type="submit"
      class="mt-2 px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
    >
      提交回覆
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['submit-reply']);

const newReply = ref({
  content: ''
});

const submitReply = () => {
  if (!newReply.value.content) return;
  emit('submit-reply', {
    content: newReply.value.content,
    author: props.currentUser
  });
  newReply.value.content = '';
};
</script>