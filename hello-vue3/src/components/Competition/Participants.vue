<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-stone-950 mb-2">參賽者 <span class="text-red-500">*</span></h3>
    <div class="space-y-4">
      <div
        v-for="(participant, index) in modelValue"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-2"
      >
        <button
          @click="removeParticipant(index)"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          :disabled="index === 0"
        >
          刪除
        </button>
        <span>{{ index + 1 }}.</span>
        <input
          type="text"
          :value="participant.studentId"
          @input="updateParticipant(index, 'studentId', $event.target.value)"
          placeholder="學號"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[150px]"
          :disabled="index === 0"
        />
        <input
          type="text"
          :value="participant.department"
          @input="updateParticipant(index, 'department', $event.target.value)"
          placeholder="系所"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[150px]"
          :disabled="index === 0"
        />
        <input
          type="text"
          :value="participant.name"
          @input="updateParticipant(index, 'name', $event.target.value)"
          placeholder="姓名"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[150px]"
          :disabled="index === 0"
        />
      </div>
      <button
        @click="addParticipant"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
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
    required: true
  },
  defaultParticipant: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const addParticipant = () => {
  const newParticipants = [...props.modelValue, { studentId: '', department: '', name: '' }];
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