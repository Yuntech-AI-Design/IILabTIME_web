<!-- src/views/InternshipForm.vue -->
<template>
    <div class="internship-form container mx-auto py-8 px-4">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">實習資料填寫</h1>
      <form @submit.prevent="submitForm" class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 學校名稱 -->
          <div>
            <label for="university" class="block text-gray-700 font-semibold mb-1 text-sm">學校名稱</label>
            <input
              id="university"
              v-model="form.university"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="例如：國立雲林科技大學"
              required
            />
          </div>
  
          <!-- 研究所/系所 -->
          <div>
            <label for="department" class="block text-gray-700 font-semibold mb-1 text-sm">研究所/系所</label>
            <input
              id="department"
              v-model="form.department"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="例如：人工智慧技優專班"
              required
            />
          </div>
  
          <!-- 學生姓名 -->
          <div>
            <label for="studentName" class="block text-gray-700 font-semibold mb-1 text-sm">學生姓名</label>
            <input
              id="studentName"
              v-model="form.studentName"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="請輸入您的姓名"
              required
            />
          </div>
  
          <!-- 實習單位名稱 -->
          <div>
            <label for="internshipCompany" class="block text-gray-700 font-semibold mb-1 text-sm">實習單位名稱</label>
            <select
              id="internshipCompany"
              v-model="form.internshipCompany"
              @change="updateDefaultValues"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
              required
            >
              <option value="" disabled selected>請選擇</option>
              <option value="資訊整合實驗室">資訊整合實驗室</option>
              <option value="智慧應用創新實驗室">智慧應用創新實驗室</option>
              <option value="智慧晶片研究中心">智慧晶片研究中心</option>
              <option value="AI實驗室">AI實驗室</option>
              <option value="大樹國際文化企業股份有限公司">大樹國際文化企業股份有限公司</option>
              <option value="誠得科技股份有限公司">誠得科技股份有限公司</option>
            </select>
          </div>
  
          <!-- 公司地址 -->
          <div>
            <label for="companyAddress" class="block text-gray-700 font-semibold mb-1 text-sm">公司地址</label>
            <input
              id="companyAddress"
              v-model="form.companyAddress"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="請輸入公司地址"
              required
            />
          </div>
  
          <!-- 實習地址 -->
          <div>
            <label for="internshipAddress" class="block text-gray-700 font-semibold mb-1 text-sm">實習地址</label>
            <input
              id="internshipAddress"
              v-model="form.internshipAddress"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="請輸入實習地址"
              required
            />
          </div>
  
          <!-- 負責人 -->
          <div>
            <label for="responsiblePerson" class="block text-gray-700 font-semibold mb-1 text-sm">負責人</label>
            <input
              id="responsiblePerson"
              v-model="form.responsiblePerson"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="請輸入負責人姓名"
              required
            />
          </div>
  
          <!-- 聯絡人（領航導師） -->
          <div>
            <label for="contactPerson" class="block text-gray-700 font-semibold mb-1 text-sm">聯絡人（領航導師）</label>
            <select
              id="contactPerson"
              v-model="form.contactPerson"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
              required
            >
              <option value="" disabled selected>請選擇</option>
              <option value="黃登揚教授">黃登揚教授</option>
              <option value="張榮昇教授">張榮昇教授</option>
              <option value="王斯弘教授">王斯弘教授</option>
              <option value="黃昭義教授">黃昭義教授</option>
              <option value="潘得龍教授">潘得龍教授</option>
            </select>
          </div>
  
          <!-- 聯絡電話 -->
          <div>
            <label for="contactPhone" class="block text-gray-700 font-semibold mb-1 text-sm">聯絡電話</label>
            <input
              id="contactPhone"
              v-model="form.contactPhone"
              type="tel"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="例如：05-12345678"
              required
            />
          </div>
  
          <!-- 統一編號 -->
          <div>
            <label for="taxId" class="block text-gray-700 font-semibold mb-1 text-sm">統一編號</label>
            <input
              id="taxId"
              v-model="form.taxId"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="例如：12345678"
              required
            />
          </div>
  
          <!-- 產業類型 -->
          <div>
            <label for="industryType" class="block text-gray-700 font-semibold mb-1 text-sm">產業類型</label>
            <select
              id="industryType"
              v-model="form.industryType"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
              required
            >
              <option value="" disabled selected>請選擇</option>
              <option value="資訊技術">資訊技術</option>
              <option value="人工智慧">人工智慧</option>
              <option value="半導體">半導體</option>
              <option value="文化創意">文化創意</option>
              <option value="其他">其他</option>
            </select>
          </div>
  
          <!-- 實習期間 -->
          <div class="md:col-span-2">
            <label for="internshipPeriod" class="block text-gray-700 font-semibold mb-1 text-sm">實習期間</label>
            <div class="flex flex-col sm:flex-row sm:space-x-4">
              <input
                v-model="form.startDate"
                type="date"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
              <span class="self-center my-2 sm:my-0">至</span>
              <input
                v-model="form.endDate"
                type="date"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
            </div>
          </div>
  
          <!-- 實習內容 -->
          <div class="md:col-span-2">
            <label for="internshipContent" class="block text-gray-700 font-semibold mb-1 text-sm">實習內容</label>
            <textarea
              id="internshipContent"
              v-model="form.internshipContent"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              rows="3"
              placeholder="請簡述您的實習內容"
              required
            ></textarea>
          </div>
        </div>
  
        <!-- 提交按鈕 -->
        <div class="text-center mt-6">
          <button
            type="submit"
            class="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-700 transition text-sm"
          >
            提交實習資料
          </button>
        </div>
      </form>
  
      <!-- 提交成功提示 -->
      <div v-if="submitted" class="mt-4 text-center text-green-600 text-sm">實習資料已成功提交！</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // 表單資料
  const form = ref({
    university: '國立雲林科技大學',
    department: '人工智慧技優專班',
    studentName: '',
    internshipCompany: '',
    companyAddress: '雲林縣斗六市大學路三段123號',
    internshipAddress: '雲林縣斗六市大學路三段123號',
    responsiblePerson: '',
    contactPerson: '',
    contactPhone: '',
    taxId: '',
    industryType: '',
    startDate: '',
    endDate: '',
    internshipContent: ''
  })
  
  // 提交狀態
  const submitted = ref(false)
  const router = useRouter()
  
  // 更新預設值
  const updateDefaultValues = () => {
    if (form.value.internshipCompany.includes('實驗室') || form.value.internshipCompany === 'AI實驗室') {
      form.value.companyAddress = '雲林縣斗六市大學路三段123號'
      form.value.internshipAddress = '雲林縣斗六市大學路三段123號'
    } else {
      form.value.companyAddress = ''
      form.value.internshipAddress = ''
    }
  }
  
  // 提交表單
  const submitForm = () => {
    console.log('提交的實習資料：', form.value)
    submitted.value = true
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
  </script>
  
  <style scoped>
  .internship-form {
    max-width: 1000px;
    margin: 0 auto;
  }
  </style>