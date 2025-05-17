<template>
  <div class="bg-gray-50 border-l-4 border-blue-500 rounded-lg p-4">
    <p class="text-gray-800">{{ reply.content }}</p>
    <div class="mt-2 text-sm text-gray-500">
      回覆者：{{ reply.author.name }} | 回覆時間：{{ formatDate(reply.createdAt) }}
    </div>
    <div class="mt-2 flex items-center space-x-4">
      <!-- 按讚 -->
      <button
        @click="likeReply"
        class="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <span>{{ reply.likes }}</span>
      </button>
      <!-- 獎勵/收回獎勵 -->
      <button
        v-if="postAuthorId === currentUser.id && !reply.rewarded"
        @click="rewardReply"
        class="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-all duration-200"
      >
        獎勵
      </button>
      <button
        v-if="postAuthorId === currentUser.id && reply.rewarded"
        @click="revokeReward"
        class="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-all duration-200"
      >
        收回獎勵
      </button>
      <span
        v-if="reply.rewarded"
        class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center space-x-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>已獎勵 +{{ reply.rewardPoints }} 分</span>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reply: {
    type: Object,
    required: true
  },
  postAuthorId: {
    type: Number,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['like-reply', 'reward-reply', 'revoke-reward']);

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

const likeReply = () => {
  emit('like-reply', props.reply.id);
};

const rewardReply = () => {
  emit('reward-reply', props.reply.id);
};

const revokeReward = () => {
  emit('revoke-reward', props.reply.id);
};
</script>