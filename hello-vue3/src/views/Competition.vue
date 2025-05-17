<template>
  <section class="w-full px-4 py-6">
    <!-- 居中容器，增加寬度 -->
    <div class="max-w-5xl mx-auto">
      <!-- 標題 -->
      <h2 class="text-xl font-semibold text-stone-950 mb-4 flex items-center">
        <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        競賽提報系統
      </h2>
      <!-- 學期選擇 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-stone-700 mb-1">選擇學期</label>
        <select
          v-model="selectedSemester"
          class="w-full px-3 py-2 border border-stone-300 rounded-lg"
        >
          <option value="113-1">113學年第一學期</option>
          <option value="113-2">113學年第二學期</option>
        </select>
      </div>
      <!-- 後備內容 -->
      <div v-if="!userProfile.internshipCompany" class="text-red-500">
        無法載入實習廠商資料，請檢查個人資料設定！
      </div>
      <!-- 兩欄佈局，調整右欄寬度 -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左欄：競賽表單 -->
        <div class="bg-white border-4 border-stone-950 rounded-xl p-6 shadow-xl lg:col-span-1">
          <CompetitionForm
            v-model="formData"
            :semester="selectedSemester"
          />
        </div>
        <!-- 右欄：參賽者與文件上傳 -->
        <div class="bg-white border-4 border-stone-950 rounded-xl p-6 shadow-xl lg:col-span-2">
          <Participants
            v-model="formData.participants"
            :default-participant="defaultParticipant"
          />
          <Supervisors v-model="formData.supervisors" />
          <FileUploader v-model="formData.proofDocuments" />
          <button
            @click="handleSubmit"
            class="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:text-stone-950 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            提交競賽提報
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
import CompetitionForm from '@/components/Competition/CompetitionForm.vue';
import Participants from '@/components/Competition/Participants.vue';
import Supervisors from '@/components/Competition/Supervisors.vue';
import FileUploader from '@/components/Competition/FileUploader.vue';

// 模擬個人資料（導入公司）
const userProfile = {
  internshipCompany: 'Tech Innovate Inc.'
};

// 預設參賽者（模擬申請者）
const defaultParticipant = {
  studentId: 'B11323222',
  department: '資訊管理系',
  name: '劉政廷'
};

// 學期選擇
const selectedSemester = ref('2025-1');

// 表單數據
const formData = ref({
  competitionType: '',
  awardRank: '',
  competitionName: '',
  competitionNature: '個人獎項',
  participationLevel: '',
  supervisors: [],
  participants: [defaultParticipant],
  projectName: '',
  totalEntries: '',
  hostOrganization: '',
  startDate: '',
  endDate: '',
  summary: '',
  proofDocuments: []
});

// 錯誤提示狀態
const showErrorModal = ref(false);
const errorMessage = ref('');

// 確認頁面掛載
onMounted(() => {
  console.log('CompetitionReport.vue 已掛載，實習廠商：', userProfile.internshipCompany);
});

// 提交表單
const handleSubmit = () => {
  // 驗證必填欄位
  if (
    !formData.value.competitionType ||
    !formData.value.competitionName ||
    !formData.value.competitionNature ||
    !formData.value.participationLevel ||
    !formData.value.supervisors.length ||
    !formData.value.participants.length ||
    !formData.value.projectName ||
    !formData.value.totalEntries ||
    !formData.value.hostOrganization ||
    !formData.value.startDate ||
    !formData.value.endDate ||
    !formData.value.summary
  ) {
    errorMessage.value = '請填寫所有必填欄位！';
    showErrorModal.value = true;
    return;
  }
  // 模擬提交
  console.log('提交數據：', formData.value);
  // 清空表單
  formData.value = {
    competitionType: '',
    awardRank: '',
    competitionName: '',
    competitionNature: '個人獎項',
    participationLevel: '',
    supervisors: [],
    participants: [defaultParticipant],
    projectName: '',
    totalEntries: '',
    hostOrganization: '',
    startDate: '',
    endDate: '',
    summary: '',
    proofDocuments: []
  };
  // 顯示成功提示
  errorMessage.value = '競賽提報提交成功！';
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