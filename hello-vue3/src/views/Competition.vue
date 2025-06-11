<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <!-- 標題 -->
      <h2 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center">
        <AcademicCapIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 競賽提報系統
      </h2>

      <!-- 學期選擇 -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <label class="block text-sm font-medium text-stone-700 mb-1">選擇學期</label>
          <select
            v-model="selectedSemester"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
          >
            <option value="113-1">113學年第一學期</option>
            <option value="113-2">113學年第二學期</option>
            <option value="114-1">114學年第一學期</option>
            <option value="114-2">114學年第二學期</option>
          </select>
        </div>
      </div>

      <!-- 錯誤提示（無實習廠商資料） -->
      <div
        v-if="!userProfile.internshipCompany"
        class="bg-Ghibli-red/10 border border-Ghibli-red p-4 rounded-lg text-Ghibli-red text-sm mb-6"
      >
        無法載入實習廠商資料，請檢查個人資料設定！
      </div>

      <!-- 兩欄佈局 -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-10 gap-6"
      >
        <!-- 左欄：競賽表單 -->
        <div class="lg:col-span-4">
          <CompetitionForm
            v-model="formData"
            :semester="selectedSemester"
            class="space-y-4"
          />
        </div>

        <!-- 右欄：參賽者、指導老師、文件上傳 -->
        <div class="lg:col-span-6 space-y-6">
          <Participants
            v-model="formData.participants"
            :default-participant="defaultParticipant"
            class="border border-stone-300 rounded-lg p-4"
          />
          <Supervisors
            v-model="formData.supervisors"
            class="border border-stone-300 rounded-lg p-4"
          />
          <FileUploader
            v-model="formData.proofDocuments"
            class="border border-stone-300 rounded-lg p-4"
          />
          <button
            @click="handleSubmit"
            class="w-full px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center justify-center"
          >
            <ArrowUpTrayIcon class="w-5 h-5 mr-2" /> 提交競賽提報
          </button>
        </div>
      </div>

      <!-- 錯誤/成功模態框 -->
      <teleport to="body">
        <ModalDialog
          v-if="showErrorModal"
          :visible="showErrorModal"
          :message="errorMessage"
          @confirm="showErrorModal = false"
          @cancel="showErrorModal = false"
          @close="showErrorModal = false"
        >
          <div class="flex justify-end">
            <button
              @click="showErrorModal = false"
              class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow"
            >
              確定
            </button>
          </div>
        </ModalDialog>
      </teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { AcademicCapIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import CompetitionForm from '@/components/Competition/CompetitionForm.vue';
import Participants from '@/components/Competition/Participants.vue';
import Supervisors from '@/components/Competition/Supervisors.vue';
import FileUploader from '@/components/Competition/FileUploader.vue';
import ModalDialog from '@/components/Grades/ModalDialog.vue';

defineProps({ headerVisible: { type: Boolean, default: true } });

// 模擬個人資料（導入公司）
const userProfile = {
  internshipCompany: 'Tech Innovate Inc.',
};

// 預設參賽者（模擬申請者）
const defaultParticipant = {
  studentId: 'B11323222',
  department: '資訊管理系',
  name: '劉政廷',
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
  proofDocuments: [],
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
    proofDocuments: [],
  };
  // 顯示成功提示
  errorMessage.value = '競賽提報提交成功！';
  showErrorModal.value = true;
};
</script>

<style scoped>
.home-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>