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
          class="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-300"
        >
          <span class="text-Ghibli-brown">
            {{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)
          </span>
          <button
            @click="removeFile(index)"
            class="px-3 py-1 bg-Ghibli-red text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow"
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

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64544C; /* Ghibli-brown */
  margin-bottom: 0.25rem;
}

.form-input-file {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #6C96A3; /* Ghibli-blue */
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #64544C; /* Ghibli-brown */
}

.form-input-file:focus {
  box-shadow: 0 0 0 2px #EDB422; /* Ghibli-yellow */
}

.text-Ghibli-green {
  color: #86A579; /* Ghibli-green */
}

.text-Ghibli-brown {
  color: #64544C; /* Ghibli-brown */
}

.bg-Ghibli-red {
  background-color: #B73239; /* Ghibli-red */
}

.bg-Ghibli-yellow:hover {
  background-color: #EDB422; /* Ghibli-yellow */
}
</style>