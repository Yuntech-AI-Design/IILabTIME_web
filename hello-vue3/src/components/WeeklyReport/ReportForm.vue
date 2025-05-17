<template>
  <div class="space-y-4">
    <!-- 後備內容 -->
    <div v-if="!company" class="text-red-500">
      無法載入實習廠商資料，請檢查屬性傳遞！
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">實習廠商</label>
      <input
        :value="company"
        type="text"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-100"
        disabled
        aria-disabled="true"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">實習內容 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.content"
        @input="updateField('content', $event.target.value)"
        placeholder="輸入實習內容"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        required
        aria-required="true"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">實習觀察紀錄 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.observations"
        @input="updateField('observations', $event.target.value)"
        placeholder="輸入實習觀察紀錄"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        required
        aria-required="true"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">實習心得與反思 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.reflections"
        @input="updateField('reflections', $event.target.value)"
        placeholder="輸入實習心得與反思"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        required
        aria-required="true"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">實習所遇到的困難 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.challenges"
        @input="updateField('challenges', $event.target.value)"
        placeholder="輸入實習所遇到的困難"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        required
        aria-required="true"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">解決方法 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.solutions"
        @input="updateField('solutions', $event.target.value)"
        placeholder="輸入解決方法"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        required
        aria-required="true"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">其他事項</label>
      <textarea
        :value="modelValue.others"
        @input="updateField('others', $event.target.value)"
        placeholder="輸入其他事項（選填）"
        class="w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  company: {
    type: String,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']); // ✅ 修正點在這裡！

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};

onMounted(() => {
  console.log('ReportFields.vue 已掛載，接收到的實習廠商：', props.company);
});
</script>