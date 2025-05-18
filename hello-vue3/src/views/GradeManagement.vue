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

      <!-- 篩選與操作區 -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <label class="block text-sm font-medium text-stone-700 mb-1">搜尋姓名</label>
          <input
            v-model.trim="searchName"
            type="text"
            placeholder="輸入學生姓名"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-stone-700 mb-1">成績範圍</label>
          <select
            v-model="scoreFilter"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
          >
            <option value="">全部</option>
            <option value="90-100">90-100</option>
            <option value="80-89">80-89</option>
            <option value="70-79">70-79</option>
            <option value="below-70">低於 70</option>
          </select>
        </div>
        <div class="flex items-end space-x-4">
          <button @click="clearFilters" class="px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 flex items-center">
            <XIcon class="w-5 h-5 mr-2" /> 清除篩選
          </button>
          <button @click="openBatchEditModal" class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center">
            <PencilIcon class="w-5 h-5 mr-2" /> 批量編輯
          </button>
          <!-- 匯出CSV按鈕 -->
          <button @click="exportCSV" class="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 flex items-center">
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" /> 匯出CSV
          </button>
        </div>
      </div>

      <!-- 成績表格 -->
      <div class="overflow-x-auto rounded-lg border border-stone-300">
        <table class="w-full text-left border-collapse" role="grid">
          <thead>
            <tr class="bg-Ghibli-skin text-stone-950">
              <th class="py-3 px-4 font-semibold text-sm">姓名</th>
              <th class="py-3 px-4 font-semibold text-sm">實習項目</th>
              <th class="py-3 px-4 font-semibold text-sm">成績</th>
              <th class="py-3 px-4 font-semibold text-sm">評語</th>
              <th class="py-3 px-4 font-semibold text-sm">實習時數</th>
              <th class="py-3 px-4 font-semibold text-sm">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(r, idx) in filteredRecords"
              :key="r.id"
              class="border-b border-stone-200 hover:bg-Ghibli-skin/30"
            >
              <td class="py-3 px-4 text-sm">{{ r.name }}</td>
              <td class="py-3 px-4 text-sm">{{ r.project }}</td>
              <td class="py-3 px-4 text-sm">
                <span :class="getScoreClass(r.score)">{{ r.score }}</span>
              </td>
              <td class="py-3 px-4 text-sm">{{ r.comment || '−' }}</td>
              <td class="py-3 px-4 text-sm">{{ getHours(r.name) }} 小時</td>
              <td class="py-3 px-4">
                <button
                  @click="openSingleEditModal(r, idx)"
                  class="px-3 py-1 bg-Ghibli-blue text-white rounded-lg text-sm hover:bg-Ghibli-yellow"
                >
                  編輯
                </button>
              </td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="6" class="py-4 px-4 text-center text-gray-500 text-sm">暫無成績記錄</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 單一編輯 Modal (Teleport 到 body) -->
    <teleport to="body">
      <ModalDialog
        v-if="showSingleEditModal"
        :visible="showSingleEditModal"
        :message="`編輯學生 ${editRecord.name} 的成績和評語`"
        @confirm="saveSingleEdit"
        @cancel="closeSingleEditModal"
        @close="closeSingleEditModal"
      >
        <div class="mb-4">
          <label class="block text-sm font-medium text-stone-700 mb-1">成績 (0-100)</label>
          <input
            v-model.number="editRecord.score"
            type="number" min="0" max="100"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
            @input="validateSingleScore"
          />
          <p v-if="singleError.score" class="text-Ghibli-red text-sm mt-1">{{ singleError.score }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1">評語 (最多200字)</label>
          <textarea
            v-model="editRecord.comment"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue resize-none"
            maxlength="200"
          ></textarea>
        </div>
      </ModalDialog>
    </teleport>

    <!-- 批量編輯 Modal (Teleport 到 body) -->
    <teleport to="body">
      <ModalDialog
        v-if="showBatchEditModal"
        :visible="showBatchEditModal"
        message="批量編輯學生成績和評語"
        @confirm="saveBatchEdit"
        @cancel="closeBatchEditModal"
        @close="closeBatchEditModal"
      >
        <div class="max-h-96 overflow-y-auto pr-2">
          <div
            v-for="(r, i) in batchEditRecords"
            :key="r.id"
            class="mb-6 border-b border-stone-300 pb-4"
          >
            <h3 class="text-lg font-semibold text-stone-950 mb-2">{{ r.name }} - {{ r.project }}</h3>
            <div class="mb-2">
              <label class="block text-sm font-medium text-stone-700 mb-1">成績 (0-100)</label>
              <input
                v-model.number="r.score"
                type="number" min="0" max="100"
                class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue"
                @input="validateBatchScore(i)"
              />
              <p v-if="batchErrors[i]?.score" class="text-Ghibli-red text-sm mt-1">{{ batchErrors[i].score }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-1">評語 (最多200字)</label>
              <textarea
                v-model="r.comment"
                class="w-full px-4 py-2	border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue resize-none"
                maxlength="200"
              ></textarea>
            </div>
          </div>
        </div>
      </ModalDialog>
    </teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AcademicCapIcon, PencilIcon, XIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import ModalDialog from '@/components/Grades/ModalDialog.vue';

defineProps({ headerVisible: { type: Boolean, default: true } });

// 資料
const gradeRecords = ref([
  { id: '1', name: '張偉', project: 'AI 模型開發', score: 92, comment: '表現出色' },
  { id: '2', name: '李娜', project: '數據分析', score: 85, comment: '需加強創新' },
  { id: '3', name: '王芳', project: '前端開發', score: 78, comment: '細節需改進' },
  { id: '4', name: '陳明', project: '後端系統', score: 65, comment: '需更專注' }
]);
const studentHours = ref([
  { name: '張偉', hours: 120 },
  { name: '李娜', hours: 95 },
  { name: '王芳', hours: 80 },
  { name: '陳明', hours: 60 }
]);

// 計算
const getHours = name => studentHours.value.find(s => s.name === name)?.hours || 0;
const searchName = ref('');
const scoreFilter = ref('');
const clearFilters = () => { searchName.value = ''; scoreFilter.value = ''; };

const filteredRecords = computed(() =>
  gradeRecords.value.filter(r => {
    const byName = r.name.includes(searchName.value.trim());
    let byScore = true;
    if (scoreFilter.value) {
      if (scoreFilter.value === 'below-70') byScore = r.score < 70;
      else {
        const [min, max] = scoreFilter.value.split('-').map(Number);
        byScore = r.score >= min && r.score <= max;
      }
    }
    return byName && byScore;
  })
);

const getScoreClass = score =>
  score >= 90 ? 'text-Ghibli-green font-bold' :
  score >= 80 ? 'text-Ghibli-blue' :
  score >= 70 ? 'text-Ghibli-yellow' :
  'text-Ghibli-red';

// 匯出 CSV
function exportCSV() {
  const headers = ['姓名', '實習項目', '成績', '評語', '實習時數'];
  const rows = filteredRecords.value.map(r => [
    r.name, r.project, r.score, r.comment || '', getHours(r.name)
  ]);
  const csvContent = [headers, ...rows]
    .map(e => e.map(v => `"${v}"`).join(','))
    .join('\n');
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'student_grades.csv';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 單一編輯
const showSingleEditModal = ref(false);
const editRecord = ref({ name: '', project: '', score: 0, comment: '', index: -1 });
const singleError = ref({ score: '' });
function openSingleEditModal(r, idx) {
  editRecord.value = { ...r, index: idx };
  singleError.value = { score: '' };
  showSingleEditModal.value = true;
}
function validateSingleScore() {
  const s = editRecord.value.score;
  singleError.value.score =
    s === ''     ? '請輸入成績' :
    isNaN(s)||s<0||s>100 ? '成績必須在 0-100 之間' : '';
}
function saveSingleEdit() {
  validateSingleScore();
  if (singleError.value.score) return;
  if (!confirm('確定要儲存？')) return;
  const i = editRecord.value.index;
  gradeRecords.value[i] = { ...gradeRecords.value[i], score: Number(editRecord.value.score), comment: editRecord.value.comment.trim() };
  showSingleEditModal.value = false;
}
function closeSingleEditModal() { showSingleEditModal.value = false; }

// 批量編輯
const showBatchEditModal = ref(false);
const batchEditRecords = ref([]);
const batchErrors = ref([]);
function openBatchEditModal() { batchEditRecords.value = gradeRecords.value.map(r => ({ ...r })); batchErrors.value = []; showBatchEditModal.value = true; }
function validateBatchScore(i) { const s = batchEditRecords.value[i].score; batchErrors.value[i] = s === '' ? { score: '請輸入成績' } : isNaN(s)||s<0||s>100 ? { score: '成績必須在 0-100 之間' } : null; }
function saveBatchEdit() { batchEditRecords.value.forEach((_, i) => validateBatchScore(i)); if (batchErrors.value.some(e => e)) return; if (!confirm('確定要儲存所有？')) return; gradeRecords.value = batchEditRecords.value.map(r => ({ ...r, score: Number(r.score), comment: r.comment.trim() })); showBatchEditModal.value = false; }
function closeBatchEditModal() { showBatchEditModal.value = false; }
</script>

<style scoped>
.home-card { transition: transform 0.3s, box-shadow 0.3s; }
.home-card:hover { transform: scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
table { min-width: 100% }
th, td { white-space: nowrap }
@media (max-width: 640px) { th, td { font-size: 0.75rem; padding: 0.5rem } }
</style>