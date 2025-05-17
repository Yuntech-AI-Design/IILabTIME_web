<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-stone-950 mb-2">指導(推薦)老師 <span class="text-red-500">*</span></h3>
    <div class="space-y-4">
      <div
        v-for="(supervisor, index) in modelValue"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-2"
      >
        <button
          @click="removeSupervisor(index)"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          刪除
        </button>
        <span>{{ index + 1 }}.</span>
        <input
          type="text"
          :value="supervisor.name"
          @input="updateSupervisor(index, 'name', $event.target.value)"
          placeholder="姓名"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[120px]"
        />
        <input
          type="text"
          :value="supervisor.title"
          @input="updateSupervisor(index, 'title', $event.target.value)"
          placeholder="職稱"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[120px]"
        />
        <input
          type="text"
          :value="supervisor.id"
          @input="updateSupervisor(index, 'id', $event.target.value)"
          placeholder="編號"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[150px]"
        />
        <input
          type="text"
          :value="supervisor.department"
          @input="updateSupervisor(index, 'department', $event.target.value)"
          placeholder="系所"
          class="flex-1 px-3 py-2 border border-stone-300 rounded-lg max-w-[150px]"
        />
      </div>
      <button
        @click="addSupervisor"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        :disabled="modelValue.length >= 5"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        新增指導老師
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const addSupervisor = () => {
  if (props.modelValue.length >= 5) return;
  const newSupervisors = [...props.modelValue, { name: '', title: '', id: '', department: '' }];
  emit('update:modelValue', newSupervisors);
};

const removeSupervisor = (index) => {
  const newSupervisors = [...props.modelValue];
  newSupervisors.splice(index, 1);
  emit('update:modelValue', newSupervisors);
};

const updateSupervisor = (index, field, value) => {
  const newSupervisors = [...props.modelValue];
  newSupervisors[index][field] = value;
  emit('update:modelValue', newSupervisors);
};
</script>