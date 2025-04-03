<!-- Home.vue -->
<template>
  <div class="home-page">
    <!-- 頂部橫幅 -->
    <section
      class="relative pt-24 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-center py-24 px-4 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-red-400 to-transparent opacity-50"></div>
      <div class="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-brown-600 to-transparent opacity-50"></div>
      <div class="relative max-w-5xl mx-auto z-10">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">AI專班實習管理系統</h1>
        <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100">專為AI專班設計的實習管理平台，結合智能技術，優化學習與實務經驗。</p>
        <div v-if="!isLoggedIn" class="space-x-4">
          <router-link to="/login"
            class="inline-block bg-white text-pink-600 font-semibold px-8 py-4 rounded-full hover:bg-pink-100 transition shadow-lg">立即登入</router-link>
          <router-link to="/register"
            class="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-pink-600 transition">註冊</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard"
            class="inline-block bg-white text-pink-600 font-semibold px-8 py-4 rounded-full hover:bg-pink-100 transition shadow-lg">進入儀表板</router-link>
        </div>
      </div>
    </section>

    <!-- 功能介紹 -->
    <section class="py-20 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">智能實習管理功能</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">利用AI技術，提供高效、便捷的實習管理體驗。</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute top-0 left-0 w-12 h-12 bg-pink-500 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-pink-600 mb-2">AI打卡分析</h3>
            <p class="text-gray-600">智能識別打卡模式，分析實習時間，提供個性化建議。</p>
          </div>
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute top-0 right-0 w-12 h-12 bg-yellow-400 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-yellow-700 mb-2">競賽成果管理</h3>
            <p class="text-gray-600">提交AI競賽資料，追蹤成績，與同學分享成果。</p>
          </div>
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute bottom-0 left-0 w-12 h-12 bg-brown-600 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-brown-600 mb-2">智能週誌生成</h3>
            <p class="text-gray-600">自動整理實習記錄，生成專業週誌，節省時間。</p>
          </div>
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute bottom-0 right-0 w-12 h-12 bg-blue-400 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-blue-600 mb-2">AI問答支援</h3>
            <p class="text-gray-600">內建AI助手，解答實習問題，提供即時幫助。</p>
          </div>
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute top-0 left-0 w-12 h-12 bg-green-400 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-green-600 mb-2">團隊協作平台</h3>
            <p class="text-gray-600">與AI專班同學合作，分享資源，共同成長。</p>
          </div>
          <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div class="absolute top-0 right-0 w-12 h-12 bg-gray-400 rounded-full opacity-20"></div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">導師智能監控</h3>
            <p class="text-gray-600">導師可透過AI洞察學生進度，提供精準指導。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用流程 -->
    <section class="py-20 px-4 bg-gray-100">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">AI實習管理流程</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">簡單步驟，開啟您的AI實習旅程</p>
        </div>
        <div class="space-y-10">
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col md:flex-row items-center">
            <div
              class="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 mb-4 md:mb-0">
              {{ index + 1 }}
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md flex-1">
              <h4 class="text-xl font-semibold text-gray-800 mb-2"> {{ step.title }}</h4>
              <p class="text-gray-600">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 統計數據 -->
    <section class="py-20 px-4 bg-gradient-to-r from-brown-600 to-brown-500 text-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-black">AI專班成效</h2>
          <p class="text-lg max-w-2xl mx-auto text-gray-100">我們的系統已助力數千名AI學員提升實習成果</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div class="text-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
            <h3 class="text-4xl font-bold text-yellow-300">500+</h3>
            <p class="text-lg font-semibold mt-2 text-black">參與人數</p>
            <p class="text-sm text-gray-100">來自全國頂尖學校</p>
          </div>
          <div class="text-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
            <h3 class="text-4xl font-bold text-pink-300">87%</h3>
            <p class="text-lg font-semibold mt-2 text-black">滿意度</p>
            <p class="text-sm text-gray-100">涵蓋AI相關產業</p>
          </div>
          <div class="text-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
            <h3 class="text-4xl font-bold text-blue-300">50+</h3>
            <p class="text-lg font-semibold mt-2 text-black">實習計畫</p>
            <p class="text-sm text-gray-100">累計AI實務經驗</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)

const steps = [
  { title: '註冊與登入', desc: '使用學校帳號或第三方登入，快速加入AI專班實習系統。' },
  { title: '設定實習計畫', desc: '輸入實習單位與目標，系統將智能匹配學習資源。' },
  { title: '智能打卡記錄', desc: '透過AI技術記錄實習時間，確保準確性與效率。' },
  { title: '提交AI競賽成果', desc: '上傳競賽作品，獲得導師與同學的智能反饋。' },
  { title: '生成實習報告', desc: '一鍵生成AI分析報告，展示您的實習成果。' }
]
</script>

<style scoped>
/* Tailwind 已處理大部分樣式，這裡可保留特定自定義樣式 */
</style>