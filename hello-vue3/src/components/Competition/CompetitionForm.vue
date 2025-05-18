<template>
  <div class="space-y-4">
    <!-- 競賽類別 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">競賽類別 <span class="text-red-500">*</span></label>
      <select
        :value="modelValue.competitionType"
        @change="updateField('competitionType', $event.target.value)"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
      >
        <option value="">請選擇競賽類別</option>
        <option value="國際性">國際性</option>
        <option value="全國性">全國性</option>
        <option value="地區性">地區性</option>
        <option value="教育部">教育部</option>
        <option value="校內競賽">校內競賽</option>
      </select>
      <!-- 競賽類別條件提示 -->
      <div v-if="modelValue.competitionType === '國際性'" class="text-sm text-gray-600 mt-1">
        1. 國際競賽不含大陸、港澳地區，需至少三個國家以上參賽。<br>
        2. 國外競賽係在他國(不含大陸港澳)舉辦之競賽。
      </div>
      <div v-if="modelValue.competitionType === '教育部'" class="text-sm text-gray-600 mt-1">
        以教育部名義舉辦之專業技(藝)能競賽。
      </div>
    </div>

    <!-- 得獎獎次 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">得獎獎次</label>
      <input
        type="text"
        :value="modelValue.awardRank"
        @input="updateField('awardRank', $event.target.value)"
        placeholder="請填寫「第X名」或佳作"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
      />
    </div>

    <!-- 參與競賽名稱 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">參與競賽名稱 <span class="text-red-500">*</span></label>
      <input
        type="text"
        :value="modelValue.competitionName"
        @input="updateField('competitionName', $event.target.value)"
        placeholder="請輸入競賽名稱"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
        required
      />
    </div>

    <!-- 競賽性質 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">競賽性質 <span class="text-red-500">*</span></label>
      <select
        :value="modelValue.competitionNature"
        @change="updateField('competitionNature', $event.target.value)"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
      >
        <option value="個人獎項">個人獎項</option>
        <option value="團體獎項">團體獎項</option>
      </select>
    </div>

    <!-- 競賽參與程度 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">競賽參與程度 <span class="text-red-500">*</span></label>
      <select
        :value="modelValue.participationLevel"
        @change="updateField('participationLevel', $event.target.value)"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
      >
        <option value="">請選擇參與程度</option>
        <option value="參賽">參賽</option>
        <option value="入圍">入圍</option>
        <option value="獲獎">獲獎</option>
      </select>
    </div>

    <!-- 作品名稱或競賽項目 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">作品名稱或競賽項目 <span class="text-red-500">*</span></label>
      <input
        type="text"
        :value="modelValue.projectName"
        @input="updateField('projectName', $event.target.value)"
        placeholder="請輸入作品名稱或競賽項目"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
        required
      />
    </div>

    <!-- 參賽組數或件數 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">參賽組數或件數 <span class="text-red-500">*</span></label>
      <input
        type="text"
        :value="modelValue.totalEntries"
        @input="updateField('totalEntries', $event.target.value)"
        placeholder="共多少競爭對手參賽"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
        required
      />
    </div>

    <!-- 活動主辦單位 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">活動主辦單位 <span class="text-red-500">*</span></label>
      <input
        type="text"
        :value="modelValue.hostOrganization"
        @input="updateField('hostOrganization', $event.target.value)"
        placeholder="請輸入主辦單位"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
        required
      />
    </div>

    <!-- 活動起迄日期 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">活動起迄日期 <span class="text-red-500">*</span></label>
      <div class="flex items-center space-x-2">
        <input
          type="date"
          :value="modelValue.startDate"
          @input="updateField('startDate', $event.target.value)"
          class="flex-1 max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
          required
        />
        <span>~</span>
        <input
          type="date"
          :value="modelValue.endDate"
          @input="updateField('endDate', $event.target.value)"
          class="flex-1 max-w-full px-3 py-2 border border-stone-300 rounded-lg box-border"
          required
        />
      </div>
    </div>

    <!-- 作品內容摘要 -->
    <div>
      <label class="block text-sm font-medium text-stone-700 mb-1">作品內容摘要 <span class="text-red-500">*</span></label>
      <textarea
        :value="modelValue.summary"
        @input="updateField('summary', $event.target.value)"
        placeholder="請簡要條例說明，文限200字"
        class="w-full max-w-full px-3 py-2 border border-stone-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px] box-border"
        maxlength="200"
        required
      ></textarea>
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