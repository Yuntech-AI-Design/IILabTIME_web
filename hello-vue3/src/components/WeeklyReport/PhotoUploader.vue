<template>
  <div>
    <label class="block text-sm font-medium text-stone-700 mb-1">上傳照片（需 4 張） <span class="text-red-500">*</span></label>
    <input
      type="file"
      multiple
      accept="image/*"
      @change="handleFileUpload"
      class="w-full px-3 py-2 border border-stone-300 rounded-lg"
      required
      aria-required="true"
    />
    <p class="text-sm text-stone-600 mt-1">已選擇 {{ modelValue.length }} 張照片</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="(photo, index) in modelValue"
        :key="index"
        class="relative w-full"
      >
        <img
          :src="photo.preview"
          alt="預覽照片"
          class="w-full h-32 object-cover rounded-lg border border-stone-300"
        />
        <button
          @click="removePhoto(index)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          aria-label="移除照片"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'error']);

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 4) {
    emit('error', '最多只能上傳 4 張照片！');
    event.target.value = '';
    return;
  }
  const newPhotos = files.map(file => ({
    file,
    preview: URL.createObjectURL(file)
  }));
  emit('update:modelValue', newPhotos);
};

const removePhoto = (index) => {
  const newPhotos = [...props.modelValue];
  newPhotos.splice(index, 1);
  emit('update:modelValue', newPhotos);
};

// 確認組件掛載
onMounted(() => {
  console.log('PhotoUploader.vue 已掛載');
});
</script>