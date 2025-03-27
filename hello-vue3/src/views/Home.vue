<script setup>
import { ref } from 'vue';

// Define the isLoggedIn reactive property
const isLoggedIn = ref(false);
// You might want to check the user's login status here
// For example: isLoggedIn.value = localStorage.getItem('token') != null;
</script>

<template>
  <div class="home-page">
    <!-- 頂部橫幅 -->
    <section class="hero-section py-5 bg-primary text-white text-center">
      <div class="container">
        <h1 class="display-4 fw-bold mb-4">實習管理系統</h1>
        <p class="lead mb-4">一站式實習追蹤、管理與評估平台</p>
        <div v-if="!isLoggedIn">
          <router-link to="/login" class="btn btn-lg btn-light me-3">使用 Google 登入</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard" class="btn btn-lg btn-light">前往儀表板</router-link>
        </div>
      </div>
    </section>
    
    <!-- 功能介紹 -->
    <section class="features-section py-5">
      <div class="container">
        <h2 class="text-center mb-5">系統功能</h2>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <h5 class="card-title">實習打卡系統</h5>
                <p class="card-text">便捷記錄實習時間，上傳實習作品，隨時掌握實習進度。</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-trophy"></i>
                </div>
                <h5 class="card-title">競賽與成績管理</h5>
                <p class="card-text">提交競賽資料，查看競賽成績，與同儕良性競爭。</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-file-alt"></i>
                </div>
                <h5 class="card-title">週誌與成果報告</h5>
                <p class="card-text">自動彙整實習紀錄，生成週誌與總結報告，省時又方便。</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-comments"></i>
                </div>
                <h5 class="card-title">討論區</h5>
                <p class="card-text">與實習同儕交流經驗，分享資源，互相學習成長。</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-question-circle"></i>
                </div>
                <h5 class="card-title">問題詢問</h5>
                <p class="card-text">遇到難題？直接在平台上提問，獲得導師及同學的即時協助。</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto">
                  <i class="fas fa-briefcase"></i>
                </div>
                <h5 class="card-title">實習監督與管理</h5>
                <p class="card-text">導師可實時監督實習狀況，提供指導，保證實習品質。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 使用流程 -->
    <section class="workflow-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">如何使用</h2>
        
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>1. 註冊帳號</h4>
                  <p>使用電子郵件或 Google 帳號完成快速註冊，填寫基本資料。</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>2. 填寫實習資訊</h4>
                  <p>登記實習單位、時間、指導老師等基本實習資訊。</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>3. 開始實習打卡</h4>
                  <p>每次實習時打卡記錄，系統自動計算實習時數。</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>4. 上傳實習作品</h4>
                  <p>定期上傳實習成果，分享您的學習與進步。</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>5. 提交競賽資料</h4>
                  <p>參與校內外競賽，透過系統提交相關資料。</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker bg-primary"></div>
                <div class="timeline-content">
                  <h4>6. 匯出成果報告</h4>
                  <p>實習結束後，一鍵匯出完整的實習成果報告。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 統計數據 -->
    <section class="stats-section py-5">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-md-3">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-primary">500+</h2>
              <p class="lead">活躍用戶</p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-primary">50+</h2>
              <p class="lead">合作企業</p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-primary">10,000+</h2>
              <p class="lead">實習時數</p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-primary">100+</h2>
              <p class="lead">競賽獲獎</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 號召行動 -->
    <section class="cta-section py-5 bg-primary text-white text-center">
      <div class="container">
        <h2 class="mb-4">準備好開始您的實習旅程了嗎？</h2>
        <p class="lead mb-4">加入我們，讓實習管理變得更加簡單高效！</p>
        <div v-if="!isLoggedIn">
          <router-link to="/login" class="btn btn-lg btn-light">使用 Google 登入</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard" class="btn btn-lg btn-light">前往儀表板</router-link>
        </div>
      </div>
    </section>
  </div>
</template>