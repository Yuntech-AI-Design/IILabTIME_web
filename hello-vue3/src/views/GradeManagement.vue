<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <BallBackground :random="true" :randomColor="true" />
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <h2 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center">
        <AcademicCapIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 實習成績記錄
      </h2>

      <!-- 篩選與操作區域 -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <label class="block text-sm font-medium text-stone-700 mb-1">搜尋姓名</label>
          <input
            v-model="searchName"
            type="text"
            placeholder="輸入學生姓名"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-stone-700 mb-1">成績範圍</label>
          <select
            v-model="scoreFilter"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
          >
            <option value="">全部</option>
            <option value="90-100">90-100</option>
            <option value="80-89">80-89</option>
            <option value="70-79">70-79</option>
            <option value="below-70">低於 70</option>
          </select>
        </div>
        <div class="flex space-x-4">
          <button
            @click="openEditModal"
            class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold shadow-lg hover:bg-Ghibli-yellow hover:text-stone-950 transition-all duration-300 flex items-center"
          >
            <PencilIcon class="w-5 h-5 mr-2" /> 編輯成績
          </button>
          <button
            @click="exportToCSV"
            class="px-6 py-2 bg-Ghibli-green text-white rounded-full font-semibold shadow-lg hover:bg-Ghibli-yellow hover:text-stone-950 transition-all duration-300 flex items-center"
          >
            <DocumentDownloadIcon class="w-5 h-5 mr-2" /> 導出 CSV
          </button>
        </div>
      </div>

      <!-- 成績表格 -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse" role="grid" aria-label="實習成績與時數記錄">
          <thead>
            <tr class="bg-Ghibli-skin text-stone-950">
              <th class="py-3 px-4 font-semibold" scope="col">姓名</th>
              <th class="py-3 px-4 font-semibold" scope="col">實習項目</th>
              <th class="py-3 px-4 font-semibold" scope="col">成績</th>
              <th class="py-3 px-4 font-semibold" scope="col">評語</th>
              <th class="py-3 px-4 font-semibold" scope="col">實習時數</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in filteredRecords"
              :key="index"
              class="border-b border-stone-300 hover:bg-Ghibli-skin/30"
            >
              <td class="py-3 px-4">{{ record.name }}</td>
              <td class="py-3 px-4">{{ record.project }}</td>
              <td class="py-3 px-4">
                <span :class="getScoreClass(record.score)">{{ record.score }}</span>
              </td>
              <td class="py-3 px-4">{{ record.comment || '-' }}</td>
              <td class="py-3 px-4">{{ getStudentHours(record.name) }} 小時</td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="5" class="py-3 px-4 text-center text-gray-500">暫無成績記錄</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 批量編輯成績 Modal -->
    <ModalDialog
      v-if="showEditModal"
      message="編輯所有學生成績"
      pendingAction="edit"
      @confirm="saveEdits"
      @cancel="closeEditModal"
      @close="closeEditModal"
    >
      <div class="max-h-96 overflow-y-auto">
        <div
          v-for="(record, index) in editRecords"
          :key="index"
          class="mb-6 border-b border-stone-300 pb-4"
        >
          <h3 class="text-lg font-semibold text-stone-950 mb-2">{{ record.name }} - {{ record.project }}</h3>
          <div class="mb-2">
            <label class="block text-sm font-medium text-stone-700 mb-1">成績 (0-100)</label>
            <input
              v-model.number="record.score"
              type="number"
              min="0"
              max="100"
              placeholder="輸入成績"
              class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1">評語</label>
            <textarea
              v-model="record.comment"
              placeholder="輸入評語（可選）"
              class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
            ></textarea>
          </div>
        </div>
      </div>
    </ModalDialog>

    <!-- 導出確認 Modal -->
    <ModalDialog
      v-if="showExportModal"
      message="確定要導出成績數據為 CSV 檔案嗎？"
      pendingAction="export"
      @confirm="confirmExport"
      @cancel="showExportModal = false"
      @close="showExportModal = false"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AcademicCapIcon, DocumentDownloadIcon, PencilIcon } from '@heroicons/vue/24/outline';
import ModalDialog from '@/components/CheckIn/ModalDialog.vue';
import BallBackground from '@/components/Background/BallBackground.vue';

defineProps({
  headerVisible: {
    type: Boolean,
    default: true
  }
});

// 模擬成績數據（實際應用中應從 API 獲取）
const gradeRecords = ref([
  { name: '張偉', project: 'AI 模型開發', score: 92, comment: '表現出色，積極參與' },
  { name: '李娜', project: '數據分析', score: 85, comment: '認真負責，需加強創新' },
  { name: '王芳', project: '前端開發', score: 78, comment: '穩定進步，細節需改進' },
  { name: '陳明', project: '後端系統', score: 65, comment: '需更專注於任務' }
]);

// 模擬學生實習時數（實際應用中應從 API 獲取，類似 HistoryTable.vue 的 checkInRecords）
const studentHours = ref([
  { name: '張偉', hours: 120 },
  { name: '李娜', hours: 95 },
  { name: '王芳', hours: 80 },
  { name: '陳明', hours: 60 },
  { name: '劉洋', hours: 0 },
  { name: '趙靜', hours: 0 }
]);

// 獲取學生實習時數
const getStudentHours = (name) => {
  const student = studentHours.value.find(s => s.name === name);
  return student ? student.hours : 0;
};

// 篩選狀態
const searchName = ref('');
const scoreFilter = ref('');

// 計算過濾後的記錄
const filteredRecords = computed(() => {
  return gradeRecords.value.filter(record => {
    const matchesName = record.name.toLowerCase().includes(searchName.value.toLowerCase());
    let matchesScore = true;

    if (scoreFilter.value !== '') {
      if (scoreFilter.value === '90-100') matchesScore = record.score >= 90;
      else if (scoreFilter.value === '80-89') matchesScore = record.score >= 80 && record.score < 90;
      else if (scoreFilter.value === '70-79') matchesScore = record.score >= 70 && record.score < 80;
      else if (scoreFilter.value === 'below-70') matchesScore = record.score < 70;
    }

    return matchesName && matchesScore;
  });
});

// 根據成績返回樣式類
const getScoreClass = score => {
  if (score >= 90) return 'text-Ghibli-green font-bold';
  if (score >= 80) return 'text-Ghibli-blue';
  if (score >= 70) return 'text-Ghibli-yellow';
  return 'text-Ghibli-red';
};

// 批量編輯狀態
const showEditModal = ref(false);
const editRecords = ref([]);

const openEditModal = () => {
  editRecords.value = gradeRecords.value.map(record => ({
    name: record.name,
    project: record.project,
    score: record.score,
    comment: record.comment
  }));
  showEditModal.value = true;
};

const saveEdits = () => {
  for (const record of editRecords.value) {
    if (record.score === null || record.score < 0 || record.score > 100) {
      alert(`學生 ${record.name} 的成績必須在 0-100 之間！`);
      return;
    }
  }
  gradeRecords.value = editRecords.value.map(record => ({
    name: record.name,
    project: record.project,
    score: record.score,
    comment: record.comment
  }));
  closeEditModal();
};

const closeEditModal = () => {
  showEditModal.value = false;
  editRecords.value = [];
};

// 導出 CSV 相關
const showExportModal = ref(false);

const exportToCSV = () => {
  showExportModal.value = true;
};

const confirmExport = () => {
  const headers = ['姓名', '實習項目', '成績', '評語', '實習時數'];
  const rows = gradeRecords.value.map(record => [
    `"${record.name}"`,
    `"${record.project}"`,
    record.score,
    `"${record.comment || '-'}"`,
    getStudentHours(record.name)
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // 使用 UTF-8 with BOM 避免中文亂碼
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'internship_grades.csv';
  link.click();
  URL.revokeObjectURL(link.href);

  showExportModal.value = false;
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