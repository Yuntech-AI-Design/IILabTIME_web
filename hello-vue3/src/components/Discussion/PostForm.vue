<template>
  <form @submit.prevent="submitPost" class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">發問</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">標題</label>
        <input
          v-model="newPost.title"
          type="text"
          placeholder="請輸入問題標題"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">內容</label>
        <textarea
          v-model="newPost.content"
          placeholder="請輸入問題內容"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all duration-200"
      >
        發布問題
      </button>
    </div>
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

const emit = defineEmits(['submit-post']);

const newPost = ref({
  title: '',
  content: ''
});

const submitPost = () => {
  if (!newPost.value.title || !newPost.value.content) return;
  emit('submit-post', {
    title: newPost.value.title,
    content: newPost.value.content,
    author: props.currentUser
  });
  newPost.value.title = '';
  newPost.value.content = '';
};
</script>