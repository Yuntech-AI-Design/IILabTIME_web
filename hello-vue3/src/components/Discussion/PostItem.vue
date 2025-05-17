<template>
  <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
    <!-- 問題詳情 -->
    <div class="mb-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
      <p class="text-gray-600 mt-2">{{ post.content }}</p>
      <div class="mt-2 text-sm text-gray-500">
        發問者：{{ post.author.name }} | 發問時間：{{ formatDate(post.createdAt) }}
      </div>
    </div>

    <!-- 回覆表單 -->
    <ReplyForm
      @submit-reply="submitReply"
      :current-user="currentUser"
      class="mb-4"
    />

    <!-- 回覆列表 -->
    <div v-if="post.replies.length" class="space-y-4">
      <div
        v-for="reply in post.replies"
        :key="reply.id"
        class="animate-fade-in"
      >
        <ReplyItem
          :reply="reply"
          :post-author-id="post.author.id"
          :current-user="currentUser"
          @like-reply="likeReply"
          @reward-reply="rewardReply"
          @revoke-reward="revokeReward"
        />
      </div>
    </div>
    <p v-else class="text-gray-500 text-sm">
      尚未有回覆，快來留言吧！
    </p>
  </div>
</template>

<script setup>
import ReplyForm from '@/components/Discussion/ReplyForm.vue';
import ReplyItem from '@/components/Discussion/ReplyItem.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-reply', 'like-reply', 'reward-reply', 'revoke-reward']);

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const submitReply = (reply) => {
  emit('add-reply', props.post.id, reply);
};

const likeReply = (replyId) => {
  emit('like-reply', props.post.id, replyId);
};

const rewardReply = (replyId) => {
  emit('reward-reply', props.post.id, replyId);
};

const revokeReward = (replyId) => {
  emit('revoke-reward', props.post.id, replyId);
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}
</style>