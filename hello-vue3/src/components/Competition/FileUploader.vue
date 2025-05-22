<template>
  <div class="card">
    <h3 class="card-title">證明文件</h3>
    <div class="space-y-4">
      <!-- 上傳提示 -->
      <label class="form-label">請上傳競賽證明文件，以利審查進行。</label>

      <!-- 檔案輸入 -->
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.png,.gif"
        @change="handleFileUpload"
        class="form-input-file"
      />

      <!-- 提示文字 -->
      <p v-if="!modelValue.length" class="text-sm text-Ghibli-green">
        未選擇任何檔案 (請上傳相關文件檔案)
      </p>
      <p class="text-sm text-Ghibli-green">
        檔案大小請先經過適度壓縮，系統接受最大檔案大小為 2MB，且僅接受 PDF、JPG、PNG、GIF 格式。
      </p>

      <!-- 檔案列表 -->
      <div v-if="modelValue.length" class="space-y-2">
        <div
          v-for="(file, index) in modelValue"
          :key="index"
          class="flex items-center justify-between bg-white p-2 rounded-lg border border-Ghibli-blue/20"
        >
          <span class="text-Ghibli-brown">
            {{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)
          </span>
          <button
            @click="removeFile(index)"
            class="px-3 py-1 bg-Ghibli-light-red text-white rounded-lg hover:bg-Ghibli-red transition-colors"
          >
            移除
          </button>
        </div>
      </div>
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

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  const maxSize = 2 * 1024 * 1024; // 2MB
  const validFiles = files.filter((file) => {
    if (file.size > maxSize) {
      alert(`${file.name} 檔案大小超過 2MB！`);
      return false;
    }
    return true;
  });
  emit('update:modelValue', [...props.modelValue, ...validFiles]); // 追加新檔案
};

const removeFile = (index) => {
  const newFiles = [...props.modelValue];
  newFiles.splice(index, 1);
  emit('update:modelValue', newFiles);
};
</script>

<style scoped>
.card {
  @apply bg-Ghibli-skin p-6 rounded-lg shadow-md border border-Ghibli-blue/20;
}

.card-title {
  @apply text-lg font-semibold text-Ghibli-brown mb-4 border-b border-Ghibli-blue/30 pb-2;
}

.form-label {
  @apply block text-sm font-medium text-Ghibli-brown mb-1;
}

.form-input-file {
  @apply w-full px-3 py-2 border border-Ghibli-blue/50 rounded-lg bg-white text-Ghibli-brown file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-Ghibli-blue file:text-white file:cursor-pointer hover:file:bg-Ghibli-blue/80 focus:outline-none focus:ring-2 focus:ring-Ghibli-yellow;
}
</style>