<template>
  <div>
    <label class="block text-sm font-medium text-stone-700 mb-1">上傳照片（最多 4 張） <span class="text-red-500">*</span></label>
    <input
      type="file"
      multiple
      accept="image/*"
      @change="handleFileUpload"
      class="w-full px-3 py-2 border border-stone-300 rounded-lg"
      aria-required="true"
    />
    <p class="text-sm text-stone-600 mt-1">已選擇 {{ modelValue.length }} 張照片</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap gird-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="(photo, index) in modelValue"
        :key="photo.id"
        class="relative w-full"
      >
        <img
          :src="photo.preview"
          alt="預覽照片"
          class="w-full h-32 object-cover rounded-lg border border-stone-300 cursor-pointer"
          @click="openModal(index)"
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

    <!-- 模態框 -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg p-4 max-w-3xl w-full">
        <div class="relative">
          <img
            :src="modelValue[selectedIndex].preview"
            alt="放大照片"
            class="w-full max-h-[80vh] object-contain"
          />
          <button
            @click="closeModal"
            class="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="關閉模態框"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// 定義屬性
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

// 定義事件
const emit = defineEmits(['update:modelValue', 'error']);

// 模態框狀態
const showModal = ref(false);
const selectedIndex = ref(0);

// 生成唯一 ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 處理檔案上傳
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  const currentPhotos = [...props.modelValue];
  
  // 檢查總數是否超過 4 張
  if (currentPhotos.length + files.length > 4) {
    emit('error', '最多只能上傳 4 張照片！');
    event.target.value = '';
    return;
  }

  // 建立新照片陣列
  const newPhotos = files.map(file => ({
    id: generateId(),
    file,
    preview: URL.createObjectURL(file)
  }));

  // 合併現有照片和新照片
  const updatedPhotos = [...currentPhotos, ...newPhotos];
  emit('update:modelValue', updatedPhotos);
  
  // 清理輸入欄位
  event.target.value = '';
};

// 移除照片
const removePhoto = (index) => {
  const newPhotos = [...props.modelValue];
  const removedPhoto = newPhotos.splice(index, 1)[0];
  // 釋放預覽 URL
  URL.revokeObjectURL(removedPhoto.preview);
  emit('update:modelValue', newPhotos);
};

// 開啟模態框
const openModal = (index) => {
  selectedIndex.value = index;
  showModal.value = true;
};

// 關閉模態框
const closeModal = () => {
  showModal.value = false;
};

// 組件掛載時
onMounted(() => {
  console.log('PhotoUploader.vue 已掛載');
});

// 組件卸載時清理所有預覽 URL
onUnmounted(() => {
  props.modelValue.forEach(photo => {
    URL.revokeObjectURL(photo.preview);
  });
});
</script>