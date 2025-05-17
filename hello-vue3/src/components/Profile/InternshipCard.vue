<template>
  <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">實習單位資料</h2>
    <div class="space-y-6 text-base">
      <div>
        <label class="text-sm font-medium text-gray-600">單位名稱</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.internshipCompany || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">公司地址</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.companyAddress || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">實習地址</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.internshipAddress || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">負責人</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.responsiblePerson || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">聯絡人</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.contactPerson || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">電話</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.contactPhone || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">統一編號</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.taxId || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">產業類型</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.industryType || '未提供' }}</p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">實習期間</label>
        <p class="text-gray-800 leading-relaxed">
          {{ internship.startDate && internship.endDate ? `${internship.startDate} 至 ${internship.endDate}` : '未提供' }}
        </p>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">實習內容</label>
        <p class="text-gray-800 leading-relaxed">{{ internship.internshipContent || '未提供' }}</p>
      </div>
    </div>
    <router-link
      to="/internship-form"
      class="mt-6 block w-full text-center px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
    >
      編輯實習資料
    </router-link>
  </div>
</template>

<script setup>
// 直接使用 defineProps 聲明，避免未使用變數錯誤
defineProps({
  internship: {
    type: Object,
    required: true
  }
});
</script>