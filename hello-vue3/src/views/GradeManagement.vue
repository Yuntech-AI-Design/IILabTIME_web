<template>
  <section class="w-full px-[10%] py-6 relative z-10">
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
            @click="openBatchEditModal"
            class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold shadow-lg hover:bg-Ghibli-yellow hover:text-stone-950 transition-all duration-300 flex items-center"
          >
            <PencilIcon class="w-5 h-5 mr-2" /> 批量編輯
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
              <th class="py-3 px-4 font-semibold" scope="col">操作</th>
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
              <td class="py-3 px-4">
                <button
                  @click="openSingleEditModal(record, index)"
                  class="px-3 py-1 bg-Ghibli-blue text-white rounded-lg hover:bg-Ghibli-yellow hover:text-stone-950 transition-all duration-300"
                >
                  編輯
                </button>
              </td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="6" class="py-3 px-4 text-center text-gray-500">暫無成績記錄</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 單一學生編輯 Modal -->
    <ModalDialog
      :visible="showSingleEditModal"
      :message="`編輯學生 ${editRecord?.name} 的成績和評語`"
      pendingAction="edit"
      @confirm="saveSingleEdit"
      @cancel="closeSingleEditModal"
      @close="closeSingleEditModal"
    >
      <div class="mb-2">
        <label class="block text-sm font-medium text-stone-700 mb-1">成績 (0-100)</label>
        <input
          v-model.number="editRecord.score"
          type="number"
          min="0"
          max="100"
          placeholder="輸入成績"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
          required
          aria-required="true"
          @input="validateSingleScore"
        />
        <p v-if="singleError.score" class="text-Ghibli-red text-sm mt-1">{{ singleError.score }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1">評語</label>
        <textarea
          v-model="editRecord.comment"
          placeholder="輸入評語（可選）"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Ghibli-blue"
        ></textarea>
      </div>
    </ModalDialog>

    <!-- 批量編輯 Modal -->
    <ModalDialog
      :visible="showBatchEditModal"
      message="批量編輯學生成績和評語"
      pendingAction="edit"
      @confirm="saveBatchEdit"
      @cancel="closeBatchEditModal"
      @close="closeBatchEditModal"
    >
      <div class="max-h-96 overflow-y-auto">
        <div
          v-for="(record, index) in batchEditRecords"
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
              @input="validateBatchScore(index)"
            />
            <p v-if="batchErrors[index]?.score" class="text-Ghibli-red text-sm mt-1">{{ batchErrors[index].score }}</p>
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
      :visible="showExportModal"
      message="確定要導出成績數據為 CSV 檔案嗎？"
      pendingAction="export"
      @confirm="confirmExport"
      @cancel="closeExportModal"
      @close="closeExportModal"
    >
      <p class="text-stone-700">成績數據將以 CSV 格式下載，包含姓名、實習項目、成績、評語和實習時數。</p>
    </ModalDialog>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { AcademicCapIcon, DocumentDownloadIcon, PencilIcon } from '@heroicons/vue/24/outline';
import ModalDialog from '@/components/CheckIn/ModalDialog.vue';

// 定義 props
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

// 模擬學生實習時數（實際應用中應從 API 獲取）
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

// 組件初始化檢查
onMounted(() => {
  console.log('GradeManagement mounted, showExportModal:', showExportModal.value);
  showExportModal.value = false; // 強制重置導出彈窗狀態
  console.log('Initial gradeRecords:', gradeRecords.value);
});

// 單一學生編輯狀態
const showSingleEditModal = ref(false);
const editRecord = ref(null);
const singleError = ref({ score: '' });

// 開啟單一學生編輯
const openSingleEditModal = (record, index) => {
  console.log('Opening single edit modal for:', record.name, 'index:', index);
  editRecord.value = {
    name: record.name,
    project: record.project,
    score: record.score ?? '',
    comment: record.comment ?? '',
    index
  };
  singleError.value = { score: '' };
  showSingleEditModal.value = true;
};

// 驗證單一學生成績
// eslint-disable-next-line no-unused-vars
const validateSingleScore = () => {
  const score = editRecord.value.score;
  console.log('Validating single score:', score);
  if (score === '' || score === null) {
    singleError.value.score = '請輸入成績';
  } else if (isNaN(score) || score < 0 || score > 100) {
    singleError.value.score = '成績必須在 0-100 之間';
  } else {
    singleError.value.score = '';
  }
};

// 儲存單一學生編輯
const saveSingleEdit = async () => {
  console.log('Saving single edit:', editRecord.value);
  if (editRecord.value.score === '' || editRecord.value.score === null) {
    singleError.value.score = '請輸入成績';
    alert('請輸入有效成績！');
    return;
  }
  if (isNaN(editRecord.value.score) || editRecord.value.score < 0 || editRecord.value.score > 100) {
    singleError.value.score = '成績必須在 0-100 之間';
    alert('成績必須在 0-100 之間！');
    return;
  }

  if (!confirm('確定要儲存成績和評語修改嗎？')) {
    return;
  }

  gradeRecords.value[editRecord.value.index] = {
    name: editRecord.value.name,
    project: editRecord.value.project,
    score: Number(editRecord.value.score),
    comment: editRecord.value.comment ? editRecord.value.comment.trim() : ''
  };

  console.log('Updated gradeRecords:', gradeRecords.value);

  // TODO: 與後端 API 同步單筆記錄
  /*
  try {
    await fetch(`/api/grades/${editRecord.value.name}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: gradeRecords.value[editRecord.value.index].score,
        comment: gradeRecords.value[editRecord.value.index].comment
      })
    });
  } catch (error) {
    alert('儲存失敗，請稍後再試！');
    return;
  }
  */

  closeSingleEditModal();
};

// 關閉單一學生編輯
const closeSingleEditModal = () => {
  console.log('Closing single edit modal');
  showSingleEditModal.value = false;
  editRecord.value = null;
  singleError.value = { score: '' };
};

// 批量編輯狀態
const showBatchEditModal = ref(false);
const batchEditRecords = ref([]);
const batchErrors = ref([]);

// 開啟批量編輯
const openBatchEditModal = () => {
  console.log('Opening batch edit modal');
  batchEditRecords.value = gradeRecords.value.map(record => ({
    name: record.name,
    project: record.project,
    score: record.score ?? '',
    comment: record.comment ?? ''
  }));
  batchErrors.value = [];
  showBatchEditModal.value = true;
};

// 驗證批量編輯成績
// eslint-disable-next-line no-unused-vars
const validateBatchScore = (index) => {
  const score = batchEditRecords.value[index].score;
  console.log('Validating batch score:', score, 'index:', index);
  if (score === '' || score === null) {
    batchErrors.value[index] = { score: '請輸入成績' };
  } else if (isNaN(score) || score < 0 || score > 100) {
    batchErrors.value[index] = { score: '成績必須在 0-100 之間' };
  } else {
    batchErrors.value[index] = null;
  }
};

// 儲存批量編輯
const saveBatchEdit = async () => {
  console.log('Saving batch edit:', batchEditRecords.value);
  for (let i = 0; i < batchEditRecords.value.length; i++) {
    const record = batchEditRecords.value[i];
    if (record.score === '' || record.score === null) {
      batchErrors.value[i] = { score: '請輸入成績' };
      alert(`請為 ${record.name} 輸入有效成績！`);
      return;
    }
    if (isNaN(record.score) || record.score < 0 || record.score > 100) {
      batchErrors.value[i] = { score: '成績必須在 0-100 之間' };
      alert(`學生 ${record.name} 的成績必須在 0-100 之間！`);
      return;
    }
  }

  if (!confirm('確定要儲存所有成績和評語修改嗎？')) {
    return;
  }

  gradeRecords.value = batchEditRecords.value.map(record => ({
    name: record.name,
    project: record.project,
    score: Number(record.score),
    comment: record.comment ? record.comment.trim() : ''
  }));

  console.log('Updated gradeRecords:', gradeRecords.value);

  // TODO: 與後端 API 同步
  /*
  try {
    await fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gradeRecords.value)
    });
  } catch (error) {
    alert('儲存失敗，請稍後再試！');
    return;
  }
  */

  closeBatchEditModal();
};

// 關閉批量編輯
const closeBatchEditModal = () => {
  console.log('Closing batch edit modal');
  showBatchEditModal.value = false;
  batchEditRecords.value = [];
  batchErrors.value = [];
};

// 導出 CSV
const showExportModal = ref(false);

const exportToCSV = () => {
  console.log('Opening export modal');
  showExportModal.value = true;
};

const closeExportModal = () => {
  console.log('Closing export modal');
  showExportModal.value = false;
};

const confirmExport = () => {
  console.log('Exporting to CSV');
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

  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'internship_grades.csv';
  link.click();
  URL.revokeObjectURL(link.href);

  closeExportModal();
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