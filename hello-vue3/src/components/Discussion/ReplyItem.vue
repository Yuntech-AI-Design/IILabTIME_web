<template>
  <div class="bg-Ghibli-skin/10 border-l-4 border-Ghibli-blue rounded-lg p-4">
    <p class="text-Ghibli-brown">{{ reply.content }}</p>
    <div class="mt-2 text-sm text-gray-500">
      回覆者：{{ reply.author.name }} | 回覆時間：{{ formatDate(reply.createdAt) }}
    </div>
    <div class="mt-2 flex items-center space-x-4">
      <!-- 按讚 -->
      <button
        @click="likeReply"
        class="flex items-center space-x-1 text-gray-600 hover:text-Ghibli-blue transition-all duration-200"
      >
        <ThumbUpIcon class="w-5 h-5" />
        <span>{{ reply.likes }}</span>
      </button>
      <!-- 獎勵/收回獎勵 -->
      <button
        v-if="postAuthorId === currentUser.id && !reply.rewarded"
        @click="rewardReply"
        class="px-3 py-1 bg-Ghibli-green text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
      >
        獎勵
      </button>
      <button
        v-if="postAuthorId === currentUser.id && reply.rewarded"
        @click="revokeReward"
        class="px-3 py-1 bg-Ghibli-red text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
      >
        收回獎勵
      </button>
      <span
        v-if="reply.rewarded"
        class="px-3 py-1 bg-Ghibli-green/10 text-Ghibli-green rounded-full text-sm flex items-center space-x-1"
      >
        <CheckIcon class="w-4 h-4" />
        <span>已獎勵 +{{ reply.rewardPoints }} 分</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, CheckIcon } from '@heroicons/vue/24/outline';

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