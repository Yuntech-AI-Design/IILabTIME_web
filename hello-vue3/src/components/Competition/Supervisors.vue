<template>
  <div class="card">
    <h3 class="card-title">
      指導(推薦)老師 <span class="text-Ghibli-light-red">*</span>
    </h3>
    <div class="space-y-4">
      <!-- 提示文字 -->
      <p v-if="modelValue.length >= 5" class="text-sm text-Ghibli-green">
        已達指導老師上限 (最多 5 位)
      </p>

      <!-- 老師列表 -->
      <div
        v-for="(supervisor, index) in modelValue"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-lg border border-Ghibli-blue/20"
      >
        <span class="text-Ghibli-brown font-medium w-8">{{ index + 1 }}.</span>
        <input
          type="text"
          :value="supervisor.name"
          @input="updateSupervisor(index, 'name', $event.target.value)"
          placeholder="姓名"
          class="form-input flex-1 max-w-[150px]"
        />
        <input
          type="text"
          :value="supervisor.id"
          @input="updateSupervisor(index, 'id', $event.target.value)"
          placeholder="編號"
          class="form-input flex-1 max-w-[150px]"
        />
        <input
          type="text"
          :value="supervisor.department"
          @input="updateSupervisor(index, 'department', $event.target.value)"
          placeholder="系所"
          class="form-input flex-1 max-w-[150px]"
        />
        <input
          type="text"
          :value="supervisor.title"
          @input="updateSupervisor(index, 'title', $event.target.value)"
          placeholder="職稱"
          class="form-input flex-1 max-w-[150px]"
        />
        <button
          @click="removeSupervisor(index)"
          class="px-3 py-1 bg-Ghibli-light-red text-white rounded-lg hover:bg-Ghibli-red transition-colors"
        >
          刪除
        </button>
      </div>

      <!-- 新增按鈕 -->
      <button
        @click="addSupervisor"
        class="px-4 py-2 bg-Ghibli-blue text-white rounded-lg hover:bg-Ghibli-blue/80 transition-colors flex items-center disabled:bg-Ghibli-blue/50 disabled:cursor-not-allowed"
        :disabled="modelValue.length >= 5"
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
        新增指導老師
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
});

const emit = defineEmits(['update:modelValue']);

const addSupervisor = () => {
  if (props.modelValue.length >= 5) return;
  const newSupervisors = [
    ...props.modelValue,
    { name: '', id: '', department: '', title: '' },
  ];
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

<style scoped>
.card {
  @apply bg-Ghibli-skin p-6 rounded-lg shadow-md border border-Ghibli-blue/20;
}

.card-title {
  @apply text-lg font-semibold text-Ghibli-brown mb-4 border-b border-Ghibli-blue/30 pb-2;
}

.form-input {
  @apply w-full px-3 py-2 border border-Ghibli-blue/50 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-Ghibli-yellow text-Ghibli-brown placeholder:text-Ghibli-brown/50;
}
</style>