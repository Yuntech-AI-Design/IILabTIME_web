<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-stone-950 mb-2">證明文件</h3>
    <label class="block text-sm font-medium text-stone-700 mb-1">請上傳競賽證明文件，以利審查進行。</label>
    <input
      type="file"
      multiple
      accept=".pdf,.jpg,.png,.gif"
      @change="handleFileUpload"
      class="w-full px-3 py-2 border border-stone-300 rounded-lg"
    />
    <p class="text-sm text-stone-600">未選擇任何檔案 (請上傳相關文件檔案)</p>
    <p class="text-sm text-stone-600">檔案大小請先經過適度壓縮，系統接受最大檔案大小為 2MB，且系統只接受 PDF, JPG, PNG, GIF 等四種格式之檔案。</p>
    <div v-if="modelValue.length" class="space-y-2">
      <div
        v-for="(file, index) in modelValue"
        :key="index"
        class="flex items-center space-x-2"
      >
        <span>{{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)</span>
        <button
          @click="removeFile(index)"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          移除
        </button>
      </div>
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

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  const maxSize = 2 * 1024 * 1024; // 2MB
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`${file.name} 檔案大小超過 2MB！`);
      return false;
    }
    return true;
  });
  emit('update:modelValue', validFiles);
};

const removeFile = (index) => {
  const newFiles = [...props.modelValue];
  newFiles.splice(index, 1);
  emit('update:modelValue', newFiles);
};
</script>