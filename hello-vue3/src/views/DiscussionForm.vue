<template>
  <section class="w-full px-4 py-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
    <!-- 居中容器 -->
    <div class="max-w-5xl mx-auto">
      <!-- 標題 -->
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        討論區
      </h1>

      <!-- 發問表單 -->
      <div class="mb-8 animate-slide-in-left">
        <PostForm @submit-post="addPost" :current-user="currentUser" />
      </div>

      <!-- 問題列表 -->
      <div class="space-y-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="animate-slide-in-right"
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
      <p v-if="!posts.length" class="text-center text-gray-500">
        目前尚無問題，快來發問吧！
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import PostForm from '@/components/Discussion/PostForm.vue';
import PostItem from '@/components/Discussion/PostItem.vue';

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
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-in-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-in-out;
}
</style>