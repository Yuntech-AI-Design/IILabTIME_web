<template>
  <div class="space-y-6 p-6 max-w-3xl mx-auto">
    <!-- 競賽基本資訊卡片 -->
    <div class="card">
      <h2 class="card-title">競賽基本資訊</h2>
      <div class="space-y-4">
        <!-- 競賽類別 -->
        <div>
          <label class="form-label">競賽類別 <span class="text-red">*</span></label>
          <select
            :value="modelValue.competitionType"
            @change="updateField('competitionType', $event.target.value)"
            class="form-input"
          >
            <option value="">請選擇競賽類別</option>
            <option value="國際性">國際性</option>
            <option value="全國性">全國性</option>
            <option value="地區性">地區性</option>
            <option value="教育部">教育部</option>
            <option value="校內競賽">校內競賽</option>
          </select>
          <div v-if="modelValue.competitionType === '國際性'" class="form-hint">
            1. 國際競賽不含大陸、港澳地區，需至少三個國家以上參賽。<br>
            2. 國外競賽係在他國(不含大陸港澳)舉辦之競賽。
          </div>
          <div v-if="modelValue.competitionType === '教育部'" class="form-hint">
            以教育部名義舉辦之專業技(藝)能競賽。
          </div>
        </div>

        <!-- 參與競賽名稱 -->
        <div>
          <label class="form-label">參與競賽名稱 <span class="text-red">*</span></label>
          <input
            type="text"
            :value="modelValue.competitionName"
            @input="updateField('competitionName', $event.target.value)"
            placeholder="請輸入競賽名稱"
            class="form-input"
            required
          />
        </div>

        <!-- 競賽性質 -->
        <div>
          <label class="form-label">競賽性質 <span class="text-red">*</span></label>
          <select
            :value="modelValue.competitionNature"
            @change="updateField('competitionNature', $event.target.value)"
            class="form-input"
          >
            <option value="個人獎項">個人獎項</option>
            <option value="團體獎項">團體獎項</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 得獎與作品資訊卡片 -->
    <div class="card">
      <h2 class="card-title">得獎與作品資訊</h2>
      <div class="space-y-4">
        <!-- 得獎獎次 -->
        <div>
          <label class="form-label">得獎獎次</label>
          <input
            type="text"
            :value="modelValue.awardRank"
            @input="updateField('awardRank', $event.target.value)"
            placeholder="請填寫「第X名」或佳作"
            class="form-input"
          />
        </div>

        <!-- 競賽參與程度 -->
        <div>
          <label class="form-label">競賽參與程度 <span class="text-red">*</span></label>
          <select
            :value="modelValue.participationLevel"
            @change="updateField('participationLevel', $event.target.value)"
            class="form-input"
          >
            <option value="">請選擇參與程度</option>
            <option value="參賽">參賽</option>
            <option value="入圍">入圍</option>
            <option value="獲獎">獲獎</option>
          </select>
        </div>

        <!-- 作品名稱或競賽項目 -->
        <div>
          <label class="form-label">作品名稱或競賽項目 <span class="text-red">*</span></label>
          <input
            type="text"
            :value="modelValue.projectName"
            @input="updateField('projectName', $event.target.value)"
            placeholder="請輸入作品名稱或競賽項目"
            class="form-input"
            required
          />
        </div>

        <!-- 作品內容摘要 -->
        <div>
          <label class="form-label">作品內容摘要 <span class="text-red">*</span></label>
          <textarea
            :value="modelValue.summary"
            @input="updateField('summary', $event.target.value)"
            placeholder="請簡要條例說明，文限200字"
            class="form-input min-h-[120px] resize-none"
            maxlength="200"
            required
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 活動詳情卡片 -->
    <div class="card">
      <h2 class="card-title">活動詳情</h2>
      <div class="space-y-4">
        <!-- 參賽組數或件數 -->
        <div>
          <label class="form-label">參賽組數或件數 <span class="text-red">*</span></label>
          <input
            type="text"
            :value="modelValue.totalEntries"
            @input="updateField('totalEntries', $event.target.value)"
            placeholder="共多少競爭對手參賽"
            class="form-input"
            required
          />
        </div>

        <!-- 活動主辦單位 -->
        <div>
          <label class="form-label">活動主辦單位 <span class="text-red">*</span></label>
          <input
            type="text"
            :value="modelValue.hostOrganization"
            @input="updateField('hostOrganization', $event.target.value)"
            placeholder="請輸入主辦單位"
            class="form-input"
            required
          />
        </div>

        <!-- 活動起迄日期 -->
        <div>
          <label class="form-label">活動起迄日期 <span class="text-red">*</span></label>
          <div class="flex items-center space-x-2">
            <input
              type="date"
              :value="modelValue.startDate"
              @input="updateField('startDate', $event.target.value)"
              class="form-input flex-1"
              required
            />
            <span class="text-primary">~</span>
            <input
              type="date"
              :value="modelValue.endDate"
              @input="updateField('endDate', $event.target.value)"
              class="form-input flex-1"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  semester: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};
</script>

<style scoped>
.card {
  background-color: #E4B584; /* Ghibli-skin */
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(108, 150, 163, 0.2); /* Ghibli-blue/20 */
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

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(108, 150, 163, 0.5); /* Ghibli-blue/50 */
  border-radius: 0.375rem;
  background-color: #ffffff;
  outline: none;
  color: #64544C; /* Ghibli-brown */
}

.form-input:focus {
  box-shadow: 0 0 0 2px #EDB422; /* Ghibli-yellow */
}

.form-input::placeholder {
  color: rgba(100, 84, 76, 0.5); /* Ghibli-brown/50 */
}

.form-hint {
  font-size: 0.875rem;
  color: #86A579; /* Ghibli-green */
  margin-top: 0.25rem;
}

.text-Ghibli-light-red {
  color: #E45C5F; /* Ghibli-light-red */
}
</style>