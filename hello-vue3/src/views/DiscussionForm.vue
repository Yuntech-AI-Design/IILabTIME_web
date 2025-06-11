<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <!-- 標題 -->
      <h1 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center justify-center">
        <ChatIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 討論區
      </h1>

      <!-- 發問表單 -->
      <div class="mb-6 border border-stone-300 rounded-lg p-4">
        <PostForm @submit-post="addPost" :current-user="currentUser" />
      </div>

      <!-- 問題列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="border border-stone-300 rounded-lg p-4"
        >
          <PostItem
            :post="post"
            :current-user="currentUser"
            @add-reply="addReply"
            @like-reply="likeReply"
            @reward-reply="rewardReply"
            @revoke-reward="revokeReward"
          />
        </div>
      </div>

      <!-- 無問題提示 -->
      <p v-if="!posts.length" class="text-center text-gray-500 text-sm mt-6">
        目前尚無問題，快來發問吧！
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { ChatIcon } from '@heroicons/vue/24/outline';
import PostForm from '@/components/Discussion/PostForm.vue';
import PostItem from '@/components/Discussion/PostItem.vue';

defineProps({ headerVisible: { type: Boolean, default: true } });

// 模擬當前用戶
const currentUser = ref({
  id: 1,
  name: '王小明'
});

// 問題數據（模擬本地存儲）
const posts = ref([]);

// 提交新問題
const addPost = (newPost) => {
  posts.value.unshift({
    id: Date.now(),
    title: newPost.title,
    content: newPost.content,
    author: newPost.author,
    createdAt: new Date().toISOString(),
    replies: []
  });
};

// 提交回覆
const addReply = (postId, reply) => {
  const post = posts.value.find(p => p.id === postId);
  if (post) {
    post.replies.push({
      id: Date.now(),
      content: reply.content,
      author: reply.author,
      createdAt: new Date().toISOString(),
      likes: 0,
      rewarded: false,
      rewardPoints: 0
    });
  }
};

// 按讚回覆
const likeReply = (postId, replyId) => {
  const post = posts.value.find(p => p.id === postId);
  if (post) {
    const reply = post.replies.find(r => r.id === replyId);
    if (reply) {
      reply.likes += 1;
    }
  }
};

// 獎勵回覆
const rewardReply = (postId, replyId) => {
  const post = posts.value.find(p => p.id === postId);
  if (post && post.author.id === currentUser.value.id) { // 只有發問者可以獎勵
    const reply = post.replies.find(r => r.id === replyId);
    if (reply && !reply.rewarded) {
      reply.rewarded = true;
      reply.rewardPoints = 10; // 獎勵 10 分
    }
  }
};

// 收回獎勵
const revokeReward = (postId, replyId) => {
  const post = posts.value.find(p => p.id === postId);
  if (post && post.author.id === currentUser.value.id) { // 只有發問者可以收回獎勵
    const reply = post.replies.find(r => r.id === replyId);
    if (reply && reply.rewarded) {
      reply.rewarded = false;
      reply.rewardPoints = 0; // 移除獎勵分數
    }
  }
};
</script>

<style scoped>
.home-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>