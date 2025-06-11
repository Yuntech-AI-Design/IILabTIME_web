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
        class="flex flex-col sm:flex-row sm:items-center gap-2 bg-white p-3 rounded-lg border border-stone-300"
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
          class="px-3 py-1 bg-Ghibli-red text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow"
        >
          刪除
        </button>
      </div>

      <!-- 新增按鈕 -->
      <button
        @click="addSupervisor"
        class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
        :disabled="modelValue.length >= 5"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        新增指導老師
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

.text-Ghibli-green {
  color: #86A579; /* Ghibli-green */
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