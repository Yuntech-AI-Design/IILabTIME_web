<template>
  <div class="card">
    <h3 class="card-title">
      參賽者 <span class="text-Ghibli-light-red">*</span>
    </h3>
    <div class="space-y-4">
      <div
        v-for="(participant, index) in modelValue"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-lg border border-stone-300"
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
          class="px-3 py-1 bg-Ghibli-red text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow disabled:bg-gray-300 disabled:cursor-not-allowed"
          :disabled="index === 0"
        >
          刪除
        </button>
      </div>
      <button
        @click="addParticipant"
        class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        新增參賽者
      </button>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';

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
  background-color: #ffffff;
  padding: 1.5rem;
  border: 1px solid #6C96A3; /* Ghibli-blue */
  border-radius: 0.5rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #64544C; /* Ghibli-brown */
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(108, 150, 163, 0.3); /* Ghibli-blue/30 */
  padding-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #6C96A3; /* Ghibli-blue */
  border-radius: 0.375rem;
  background-color: #ffffff;
  outline: none;
  color: #64544C; /* Ghibli-brown */
}

.form-input:focus {
  box-shadow: 0 0 0 2px #EDB422; /* Ghibli-yellow */
}

.form-input::placeholder {
  color: rgba(100, 84, 76, 0.5); /* Ghibli-brown/50 */
}

.form-input:disabled {
  background-color: rgba(108, 150, 163, 0.1); /* Ghibli-blue/10 */
  cursor: not-allowed;
}

.text-Ghibli-light-red {
  color: #E45C5F; /* Ghibli-light-red */
}

.text-Ghibli-brown {
  color: #64544C; /* Ghibli-brown */
}

.bg-Ghibli-blue {
  background-color: #6C96A3; /* Ghibli-blue */
}

.bg-Ghibli-red {
  background-color: #B73239; /* Ghibli-red */
}

.bg-Ghibli-yellow:hover {
  background-color: #EDB422; /* Ghibli-yellow */
}
</style>