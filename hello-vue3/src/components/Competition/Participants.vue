<template>
  <div class="card">
    <h3 class="card-title">
      參賽者 <span class="text-Ghibli-light-red">*</span>
    </h3>
    <div class="space-y-4">
      <div
        v-for="(participant, index) in modelValue"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-lg border border-Ghibli-blue/20"
      >
        <span class="text-Ghibli-brown font-medium w-8">{{ index + 1 }}.</span>
        <input
          type="text"
          :value="participant.studentId"
          @input="updateParticipant(index, 'studentId', $event.target.value)"
          placeholder="學號"
          class="form-input flex-1 max-w-[150px]"
          :disabled="index === 0"
        />
        <input
          type="text"
          :value="participant.department"
          @input="updateParticipant(index, 'department', $event.target.value)"
          placeholder="系所"
          class="form-input flex-1 max-w-[150px]"
          :disabled="index === 0"
        />
        <input
          type="text"
          :value="participant.name"
          @input="updateParticipant(index, 'name', $event.target.value)"
          placeholder="姓名"
          class="form-input flex-1 max-w-[150px]"
          :disabled="index === 0"
        />
        <button
          @click="removeParticipant(index)"
          class="px-3 py-1 bg-Ghibli-light-red text-white rounded-lg hover:bg-Ghibli-red transition-colors disabled:bg-Ghibli-light-red/50 disabled:cursor-not-allowed"
          :disabled="index === 0"
        >
          刪除
        </button>
      </div>
      <button
        @click="addParticipant"
        class="px-4 py-2 bg-Ghibli-blue text-white rounded-lg hover:bg-Ghibli-blue/80 transition-colors flex items-center"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        新增參賽者
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  defaultParticipant: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const addParticipant = () => {
  const newParticipants = [
    ...props.modelValue,
    { studentId: '', department: '', name: '' },
  ];
  emit('update:modelValue', newParticipants);
};

const removeParticipant = (index) => {
  if (index === 0) return; // 禁止刪除預設參賽者
  const newParticipants = [...props.modelValue];
  newParticipants.splice(index, 1);
  emit('update:modelValue', newParticipants);
};

const updateParticipant = (index, field, value) => {
  const newParticipants = [...props.modelValue];
  newParticipants[index][field] = value;
  emit('update:modelValue', newParticipants);
};
</script>

<style scoped>
.card {
  @apply bg-Ghibli-skin p-6 rounded-lg shadow-md border border-Ghibli-blue/20;
}

.card-title {
  @apply text-lg font-semibold text-Ghibli-brown mb-4 border-b border-Ghibli-blue/30 pb-2;
}

.form-input {
  @apply w-full px-3 py-2 border border-Ghibli-blue/50 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-Ghibli-yellow text-Ghibli-brown placeholder:text-Ghibli-brown/50 disabled:bg-Ghibli-blue/10 disabled:cursor-not-allowed;
}
</style>