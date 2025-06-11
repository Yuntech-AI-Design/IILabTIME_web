<template>
  <form @submit.prevent="submitPost" class="bg-white border border-stone-300 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-Ghibli-brown mb-4">發問</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1">標題<span class="text-Ghibli-light-red">*</span></label>
        <input
          v-model="newPost.title"
          type="text"
          placeholder="請輸入問題標題"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1">內容<span class="text-Ghibli-light-red">*</span></label>
        <textarea
          v-model="newPost.content"
          placeholder="請輸入問題內容"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue resize-none min-h-[100px]"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
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