<!-- Home.vue -->
<template>
  <div class="home-page">
    <!-- 導航欄 -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <img src="/ai-logo.svg" alt="AI Logo" class="h-10 w-10 mr-3" />
              <span class="text-2xl font-bold text-indigo-700">AI專班實習</span>
            </router-link>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/features" class="text-gray-700 hover:text-indigo-600 font-medium transition">功能</router-link>
            <router-link to="/pricing" class="text-gray-700 hover:text-indigo-600 font-medium transition">方案</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-indigo-600 font-medium transition">聯絡</router-link>
            <div v-if="!isLoggedIn">
              <router-link to="/login" class="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">登入</router-link>
            </div>
            <div v-else class="relative">
              <button @click="toggleUserMenu" class="flex items-center focus:outline-none">
                <img src="/ai-avatar.png" alt="User Avatar" class="h-9 w-9 rounded-full border-2 border-indigo-200" />
                <span class="ml-2 text-gray-700 font-medium">{{ userName }}</span>
              </button>
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 z-10">
                <router-link to="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">儀表板</router-link>
                <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">個人資料</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">登出</button>
              </div>
            </div>
          </div>
          <!-- 手機端漢堡選單 -->
          <div class="md:hidden flex items-center">
            <button @click="toggleMobileMenu" class="text-gray-700 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- 手機端選單 -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
        <div class="px-4 py-2 space-y-2">
          <router-link to="/features" class="block text-gray-700 hover:text-indigo-600">功能</router-link>
          <router-link to="/pricing" class="block text-gray-700 hover:text-indigo-600">方案</router-link>
          <router-link to="/contact" class="block text-gray-700 hover:text-indigo-600">聯絡</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">登入</router-link>
          <div v-else>
            <router-link to="/dashboard" class="block text-gray-700 hover:text-indigo-600">儀表板</router-link>
            <router-link to="/profile" class="block text-gray-700 hover:text-indigo-600">個人資料</router-link>
            <button @click="logout" class="block w-full text-left text-gray-700 hover:text-indigo-600">登出</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 頂部橫幅 -->
    <section class="pt-24 bg-gradient-to-r from-indigo-700 to-blue-500 text-white text-center py-24 px-4">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">AI專班實習管理系統</h1>
        <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">專為AI專班設計的實習管理平台，結合智能技術，優化學習與實務經驗。</p>
        <div v-if="!isLoggedIn" class="space-x-4">
          <router-link to="/login" class="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-full hover:bg-indigo-100 transition shadow-lg">立即登入</router-link>
          <router-link to="/register" class="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-indigo-700 transition">註冊</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard" class="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-full hover:bg-indigo-100 transition shadow-lg">進入儀表板</router-link>
        </div>
      </div>
    </section>

    <!-- 功能介紹 -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">智能實習管理功能</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">利用AI技術，提供高效、便捷的實習管理體驗。</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">AI打卡分析</h3>
            <p class="text-gray-600">智能識別打卡模式，分析實習時間，提供個性化建議。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">競賽成果管理</h3>
            <p class="text-gray-600">提交AI競賽資料，追蹤成績，與同學分享成果。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">智能週誌生成</h3>
            <p class="text-gray-600">自動整理實習記錄，生成專業週誌，節省時間。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">AI問答支援</h3>
            <p class="text-gray-600">內建AI助手，解答實習問題，提供即時幫助。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">團隊協作平台</h3>
            <p class="text-gray-600">與AI專班同學合作，分享資源，共同成長。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">導師智能監控</h3>
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
            <div class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 mb-4 md:mb-0">
              {{ index + 1 }}
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md flex-1">
              <h4 class="text-xl font-semibold text-gray-800 mb-2">{{ step.title }}</h4>
              <p class="text-gray-600">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 統計數據 -->
    <section class="py-20 px-4 bg-indigo-800 text-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">AI專班成效</h2>
          <p class="text-lg max-w-2xl mx-auto">我們的系統已助力數千名AI學員提升實習成果</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <h3 class="text-4xl font-bold">1,000+</h3>
            <p class="text-lg font-semibold mt-2">AI學員</p>
            <p class="text-sm text-gray-200">來自全國頂尖學校</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold">30+</h3>
            <p class="text-lg font-semibold mt-2">合作企業</p>
            <p class="text-sm text-gray-200">涵蓋AI相關產業</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold">5,000+</h3>
            <p class="text-lg font-semibold mt-2">實習時數</p>
            <p class="text-sm text-gray-200">累計AI實務經驗</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-bold">50+</h3>
            <p class="text-lg font-semibold mt-2">競賽獎項</p>
            <p class="text-sm text-gray-200">AI專班學生榮譽</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 頁尾 -->
    <footer class="bg-gray-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-xl font-bold mb-4">AI專班實習系統</h3>
            <p class="text-gray-400">專為AI專班打造的智能管理平台，提升實習效率與成果。</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">快速連結</h3>
            <ul class="space-y-2">
              <li><router-link to="/features" class="text-gray-400 hover:text-indigo-300 transition">功能</router-link></li>
              <li><router-link to="/pricing" class="text-gray-400 hover:text-indigo-300 transition">方案</router-link></li>
              <li><router-link to="/contact" class="text-gray-400 hover:text-indigo-300 transition">聯絡</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">資源</h3>
            <ul class="space-y-2">
              <li><router-link to="/guide" class="text-gray-400 hover:text-indigo-300 transition">使用指南</router-link></li>
              <li><router-link to="/faq" class="text-gray-400 hover:text-indigo-300 transition">常見問題</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">聯絡我們</h3>
            <ul class="space-y-2 text-gray-400">
              <li>📧 ai-internship@system.com</li>
              <li>📞 (02) 9876-5432</li>
              <li>📍 台北市中正區AI路100號</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-6 text-center">
          <p class="text-gray-400">© {{ new Date().getFullYear() }} AI專班實習管理系統. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
const userName = ref('陳智能')
const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)

const steps = [
  { title: '註冊與登入', desc: '使用學校帳號或第三方登入，快速加入AI專班實習系統。' },
  { title: '設定實習計畫', desc: '輸入實習單位與目標，系統將智能匹配學習資源。' },
  { title: '智能打卡記錄', desc: '透過AI技術記錄實習時間，確保準確性與效率。' },
  { title: '提交AI競賽成果', desc: '上傳競賽作品，獲得導師與同學的智能反饋。' },
  { title: '生成實習報告', desc: '一鍵生成AI分析報告，展示您的實習成果。' }
]

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logout = () => {
  isLoggedIn.value = false
  userMenuOpen.value = false
  mobileMenuOpen.value = false
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式，這裡可保留特定自定義樣式 */
</style>