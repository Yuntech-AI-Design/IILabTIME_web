<!-- Home.vue -->
<template>
  <div class="home-page">
    <!-- 導航欄 -->
<<<<<<< HEAD
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
=======
    <nav class="bg-white shadow-md fixed w-full z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <img src="/logo.svg" alt="Logo" class="h-8 w-8 mr-2" />
              <span class="text-xl font-bold text-indigo-600">實習管理</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/features" class="text-gray-600 hover:text-indigo-600 transition">功能介紹</router-link>
            <router-link to="/pricing" class="text-gray-600 hover:text-indigo-600 transition">方案價格</router-link>
            <router-link to="/contact" class="text-gray-600 hover:text-indigo-600 transition">聯絡我們</router-link>
            <div v-if="!isLoggedIn">
              <router-link to="/login" class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition">登入</router-link>
            </div>
            <div v-else class="relative">
              <button @click="toggleUserMenu" class="flex items-center">
                <img src="/avatar-placeholder.png" alt="User Avatar" class="h-8 w-8 rounded-full" />
                <span class="ml-2">{{ userName }}</span>
              </button>
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <router-link to="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-indigo-100">儀表板</router-link>
                <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-indigo-100">個人資料</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100">登出</button>
              </div>
            </div>
          </div>
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
        </div>
      </div>
    </nav>

    <!-- 頂部橫幅 -->
<<<<<<< HEAD
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
=======
    <section class="pt-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">實習管理系統</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">一站式實習追蹤、管理與評估平台，讓您的實習經驗更有價值</p>
        <div v-if="!isLoggedIn" class="space-x-4">
          <router-link to="/login" class="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-100 transition shadow-md">使用 Google 登入</router-link>
          <router-link to="/register" class="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:bg-opacity-10 transition">註冊新帳號</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard" class="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-100 transition shadow-md">前往儀表板</router-link>
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
        </div>
      </div>
    </section>

    <!-- 功能介紹 -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
<<<<<<< HEAD
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
=======
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">全方位實習管理功能</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">我們提供完整的實習管理流程，從打卡記錄到成果展示，一切都在掌握之中</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="clock" 
            title="實習打卡系統" 
            desc="便捷記錄實習時間，上傳實習作品，隨時掌握實習進度。支援地理位置驗證，確保打卡真實性。" 
          />
          <FeatureCard 
            icon="trophy" 
            title="競賽與成績管理" 
            desc="提交競賽資料，查看競賽成績，與同儕良性競爭。支援多種競賽類型與評分標準。" 
          />
          <FeatureCard 
            icon="document-text" 
            title="週誌與成果報告" 
            desc="自動彙整實習紀錄，生成週誌與總結報告，省時又方便。支援多種範本與格式輸出。" 
          />
          <FeatureCard 
            icon="chat" 
            title="討論區" 
            desc="與實習同儕交流經驗，分享資源，互相學習成長。支援多媒體內容分享與私人訊息。" 
          />
          <FeatureCard 
            icon="question" 
            title="問題詢問" 
            desc="遇到難題？直接在平台上提問，獲得導師及同學的即時協助。問題可分類與標記，方便搜尋。" 
          />
          <FeatureCard 
            icon="briefcase" 
            title="實習監督與管理" 
            desc="導師可實時監督實習狀況，提供指導，保證實習品質。支援批量管理與評分功能。" 
          />
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
        </div>
      </div>
    </section>

    <!-- 使用流程 -->
<<<<<<< HEAD
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
=======
    <section class="py-20 bg-gray-50 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">簡單易用的實習管理流程</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">只需幾個簡單步驟，即可開始您的實習管理之旅</p>
        </div>
        
        <div class="relative">
          <!-- 左側時間線 -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-400"></div>
          
          <div class="space-y-12">
            <div v-for="(step, index) in steps" :key="index" class="relative">
              <!-- 時間點 -->
              <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">
                {{ index + 1 }}
              </div>
              
              <!-- 內容區塊 -->
              <div class="md:w-1/2 md:pr-10" :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:pl-10 md:pr-0'">
                <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div class="flex items-center mb-2">
                    <div class="md:hidden w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                      {{ index + 1 }}
                    </div>
                    <h4 class="text-xl font-semibold">{{ step.title }}</h4>
                  </div>
                  <p class="text-gray-600">{{ step.desc }}</p>
                </div>
              </div>
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 統計數據 -->
<<<<<<< HEAD
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
=======
    <section class="py-20 px-4 bg-indigo-900 text-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">實習平台成效</h2>
          <p class="text-lg max-w-3xl mx-auto">透過我們的平台，超過數千位學生成功完成實習並獲得寶貴經驗</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem number="500+" label="活躍用戶" description="遍布全台各大專院校" />
          <StatItem number="50+" label="合作企業" description="包含科技、金融、教育等領域" />
          <StatItem number="10,000+" label="實習時數" description="累計提供超過萬小時實習經驗" />
          <StatItem number="100+" label="競賽獲獎" description="學生透過平台參與競賽獲獎數" />
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
        </div>
      </div>
    </section>

<<<<<<< HEAD
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
=======
    <!-- 評價 -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">用戶評價</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">聽聽其他用戶怎麼說</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="陳同學" 
            role="資訊工程系" 
            image="/testimonial-1.jpg"
            quote="實習管理系統幫助我有效地記錄實習經驗，自動生成的週誌讓我省下大量時間，更能專注於實習本身的學習。"
          />
          <TestimonialCard 
            name="林教授" 
            role="企管系教授" 
            image="/testimonial-2.jpg"
            quote="作為指導老師，這個系統讓我能夠輕鬆地監督多位學生的實習進度，提供即時反饋，大大提升了實習的教學品質。"
          />
          <TestimonialCard 
            name="王經理" 
            role="科技公司實習負責人" 
            image="/testimonial-3.jpg"
            quote="透過這個平台，我們能夠更系統性地評估實習生的表現，也為實習生提供更具結構性的學習環境。"
          />
        </div>
      </div>
    </section>

    <!-- 常見問題 -->
    <section class="py-20 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">常見問題</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">我們整理了使用者最常詢問的問題</p>
        </div>
        
        <div class="space-y-6">
          <FaqItem 
            question="系統是否支援行動裝置使用？" 
            answer="是的，我們的系統完全支援響應式設計，您可以在手機、平板或電腦上使用所有功能，隨時隨地管理您的實習。"
          />
          <FaqItem 
            question="如何計算實習時數？" 
            answer="系統會根據您的打卡記錄自動計算實習時數，您也可以手動調整或補登時數，所有記錄都需要由導師審核確認。"
          />
          <FaqItem 
            question="導師如何查看學生的實習進度？" 
            answer="導師登入後可以在「學生管理」頁面查看所有指導學生的實習進度、週誌提交情況和實習成果，並提供評語和評分。"
          />
          <FaqItem 
            question="如何匯出實習報告？" 
            answer="在「報告管理」頁面，您可以選擇需要的時間範圍和內容類型，系統會自動為您生成PDF或Word格式的實習報告。"
          />
          <FaqItem 
            question="系統支援哪些登入方式？" 
            answer="我們支援Google、Facebook帳號登入，也可以使用學校提供的帳號或自行註冊的電子郵件帳號登入。"
          />
        </div>
      </div>
    </section>

    <!-- 號召行動 -->
    <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-20 px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">準備好開始您的實習旅程了嗎？</h2>
        <p class="text-lg md:text-xl mb-8">加入我們，讓實習管理變得更加簡單高效！</p>
        <div class="space-x-4">
          <div v-if="!isLoggedIn">
            <router-link to="/login" class="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:bg-indigo-100 transition shadow-md">立即開始免費試用</router-link>
            <router-link to="/demo" class="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:bg-opacity-10 transition mt-4 md:mt-0 md:ml-4">申請系統展示</router-link>
          </div>
          <div v-else>
            <router-link to="/dashboard" class="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:bg-indigo-100 transition shadow-md">前往儀表板</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 頁尾 -->
    <footer class="bg-gray-800 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-xl font-bold mb-4">實習管理系統</h3>
            <p class="text-gray-400">提供完整的實習生命週期管理，從實習申請到成果評估，一站式解決方案。</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">快速連結</h3>
            <ul class="space-y-2">
              <li><router-link to="/features" class="text-gray-400 hover:text-white transition">功能介紹</router-link></li>
              <li><router-link to="/pricing" class="text-gray-400 hover:text-white transition">方案價格</router-link></li>
              <li><router-link to="/contact" class="text-gray-400 hover:text-white transition">聯絡我們</router-link></li>
              <li><router-link to="/blog" class="text-gray-400 hover:text-white transition">實習部落格</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">資源</h3>
            <ul class="space-y-2">
              <li><router-link to="/guide" class="text-gray-400 hover:text-white transition">使用指南</router-link></li>
              <li><router-link to="/faq" class="text-gray-400 hover:text-white transition">常見問題</router-link></li>
              <li><router-link to="/support" class="text-gray-400 hover:text-white transition">技術支援</router-link></li>
              <li><router-link to="/api" class="text-gray-400 hover:text-white transition">API 文件</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">聯絡資訊</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-center"><span class="mr-2">📧</span> info@internship-system.com</li>
              <li class="flex items-center"><span class="mr-2">📞</span> (02) 2345-6789</li>
              <li class="flex items-center"><span class="mr-2">📍</span> 台北市信義區信義路五段7號</li>
            </ul>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-white transition"><span class="sr-only">Facebook</span>fb</a>
              <a href="#" class="text-gray-400 hover:text-white transition"><span class="sr-only">Instagram</span>ig</a>
              <a href="#" class="text-gray-400 hover:text-white transition"><span class="sr-only">LinkedIn</span>in</a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8 mt-8 text-center">
          <p class="text-gray-400">&copy; {{ new Date().getFullYear() }} 實習管理系統. 保留所有權利.</p>
        </div>
      </div>
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
    </footer>
  </div>
</template>
<<<<<<< HEAD

<script setup>
import { ref } from 'vue'
<<<<<<< HEAD

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
=======
import FeatureCard from '@/components/FeatureCard.vue'
import StatItem from '@/components/StatItem.vue'
import TestimonialCard from '@/components/TestimonialCard.vue'
import FaqItem from '@/components/FaqItem.vue'

const isLoggedIn = ref(false)
const userName = ref('王小明')
const userMenuOpen = ref(false)

const steps = [
  { title: '註冊帳號', desc: '使用電子郵件、Google 或 Facebook 帳號完成快速註冊，填寫基本資料。系統支援學校單一登入整合。' },
  { title: '填寫實習資訊', desc: '登記實習單位、時間、指導老師等基本實習資訊。支援多種實習類型與時間模式。' },
  { title: '開始實習打卡', desc: '每次實習時打卡記錄，系統自動計算實習時數。支援地理位置驗證與照片上傳功能。' },
  { title: '上傳實習作品', desc: '定期上傳實習成果，分享您的學習與進步。支援各種檔案格式與多媒體內容。' },
  { title: '提交競賽資料', desc: '參與校內外競賽，透過系統提交相關資料。支援團隊協作與多人共同編輯功能。' },
  { title: '匯出成果報告', desc: '實習結束後，一鍵匯出完整的實習成果報告。支援多種報告範本與自訂格式。' }
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
]

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

<<<<<<< HEAD
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logout = () => {
  isLoggedIn.value = false
  userMenuOpen.value = false
  mobileMenuOpen.value = false
=======
const logout = () => {
  isLoggedIn.value = false
  userMenuOpen.value = false
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
}
</script>

<style scoped>
<<<<<<< HEAD
/* Tailwind 已處理大部分樣式，這裡可保留特定自定義樣式 */
=======
/* 任何額外的樣式可以在這裡添加 */
>>>>>>> 6fdf5629 (:art: 新增 Tailwind CSS 支援，重構樣式與元件設計)
=======
<style scoped>
/* 漸層區塊背景 */
.hero-section,
.cta-section {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

/* 行動呼籲按鈕 */
.btn-light {
  background-color: white;
  color: #6366f1;
  border: 2px solid #6366f1;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
}

.btn-light:hover {
  background-color: #6366f1;
  color: white;
}

/* 卡片樣式統一 */
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}

/* icon 圓背景美化 */
.feature-icon {
  width: 64px;
  height: 64px;
  font-size: 1.4rem;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* timeline 樣式 */
.timeline {
  position: relative;
  margin-left: 1rem;
  border-left: 2px solid #dee2e6;
  padding-left: 1.5rem;
}
.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}
.timeline-marker {
  position: absolute;
  left: -1.2rem;
  top: 0.2rem;
  width: 14px;
  height: 14px;
  background: #6366f1;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #e0e7ff;
}
.timeline-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
}

/* stat 數字 */
.stat-item h2 {
  color: #4f46e5;
  font-size: 2.5rem;
  font-weight: bold;
}
.stat-item p {
  font-size: 1rem;
  color: #6c757d;
}

>>>>>>> origin/main
</style>