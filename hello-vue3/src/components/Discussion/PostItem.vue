<template>
  <div class="bg-white border border-stone-300 rounded-lg p-4">
    <!-- 內容詳情 -->
    <div class="mb-4">
      <h3 class="text-xl font-bold text-Ghibli-brown">{{ post.title }}</h3>
      <p class="text-Ghibli-blue mt-2">{{ post.content }}</p>
      <div class="mt-2 text-sm text-gray-600">
        發問者：{{ post.author.name }} | 時間：{{ formatDate(post.createdAt) }}
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
    required: true,
    validator: (post) => {
      return (
        'id' in post &&
        'title' in post &&
        'content' in post &&
        'createdAt' in post &&
        'replies' in post &&
        Array.isArray(post.replies) &&
        'author' in post &&
        typeof post.author === 'object' &&
        'id' in post.author &&
        'name' in post.author
      );
    }
  },
  currentUser: {
    type: Object,
    required: true,
    validator: (user) => {
      return 'id' in user && 'name' in user;
    }
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