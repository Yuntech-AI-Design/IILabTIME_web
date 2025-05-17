<template>
  <section class="w-full px-4 py-6">
    <!-- 居中容器，限制寬度 -->
    <div class="max-w-4xl mx-auto">
      <!-- 標題 -->
      <h2 class="text-xl font-semibold text-stone-950 mb-4 flex items-center">
        <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        週誌上傳
      </h2>
      <!-- 後備內容 -->
      <div v-if="!userProfile.internshipCompany" class="text-red-500">
        無法載入實習廠商資料，請檢查個人資料設定！
      </div>
      <!-- 兩欄佈局 -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 左欄：表單欄位 -->
        <div class="bg-white border-4 border-stone-950 rounded-xl p-6 shadow-xl">
          <ReportFields
            :company="userProfile.internshipCompany"
            v-model="formData"
          />
        </div>
        <!-- 右欄：照片上傳與提交按鈕 -->
        <div class="bg-white border-4 border-stone-950 rounded-xl p-6 shadow-xl">
          <PhotoUploader
            v-model="photos"
            @error="showError"
          />
          <button
            @click="handleSubmit"
            class="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:text-stone-950 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            提交週誌
          </button>
        </div>
      </div>
    </div>

    <!-- 簡單錯誤提示 -->
    <div v-if="showErrorModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 border-4 border-stone-950 shadow-xl max-w-sm w-11/12">
        <h3 class="text-lg font-semibold text-stone-950 mb-4">{{ errorMessage }}</h3>
        <button
          @click="showErrorModal = false"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-500 hover:text-stone-950"
        >
          確定
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ReportFields from '@/components/WeeklyReport/ReportForm.vue';
import PhotoUploader from '@/components/WeeklyReport/PhotoUploader.vue';

// 模擬個人資料（導入公司）
const userProfile = {
  internshipCompany: 'Tech Innovate Inc.'
};

// 表單數據
const formData = ref({
  content: '',
  observations: '',
  reflections: '',
  challenges: '',
  solutions: '',
  others: ''
});

const photos = ref([]);

// 錯誤提示狀態
const showErrorModal = ref(false);
const errorMessage = ref('');

// 確認頁面掛載
onMounted(() => {
  console.log('Reports.vue 已掛載，實習廠商：', userProfile.internshipCompany);
});

// 提交週誌
const handleSubmit = () => {
  if (
    formData.value.content === '' ||
    formData.value.observations === '' ||
    formData.value.reflections === '' ||
    formData.value.challenges === '' ||
    formData.value.solutions === ''
  ) {
    showError('請填寫所有必填欄位！');
    return;
  }
  if (photos.value.length !== 4) {
    showError('請上傳正好 4 張照片！');
    return;
  }
  // 模擬提交
  console.log('提交數據：', {
    company: userProfile.internshipCompany,
    ...formData.value,
    photos: photos.value.map(p => p.file)
  });
  // 清空表單
  formData.value = {
    content: '',
    observations: '',
    reflections: '',
    challenges: '',
    solutions: '',
    others: ''
  };
  photos.value = [];
  // 顯示成功提示
  errorMessage.value = '週誌提交成功！';
  showErrorModal.value = true;
};

// 顯示錯誤
const showError = (message) => {
  errorMessage.value = message;
  showErrorModal.value = true;
};
</script>

<style scoped>
.home-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>