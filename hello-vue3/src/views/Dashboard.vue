<template>
    <div class="dashboard">
      <h1 class="mb-4">您好，{{ currentUser.name }}</h1>
      
      <!-- 系統通知 -->
      <div class="alert alert-info d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        <div>
          請注意：本週的實習報告應在週五前提交。
        </div>
      </div>
      
      <!-- 實習進度摘要 -->
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">實習進度摘要</h5>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="stat-icon bg-primary text-white rounded-circle me-3">
                      <i class="fas fa-clock"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">累計實習時數</h6>
                      <h3 class="mb-0">120 小時</h3>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="stat-icon bg-success text-white rounded-circle me-3">
                      <i class="fas fa-calendar-check"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">打卡次數</h6>
                      <h3 class="mb-0">35 次</h3>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="stat-icon bg-warning text-white rounded-circle me-3">
                      <i class="fas fa-file-upload"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">作品上傳</h6>
                      <h3 class="mb-0">12 份</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4">
                <h6>本週實習進度</h6>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                </div>
              </div>
              
              <div class="mt-4">
                <h6>總實習進度</h6>
                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 最近活動 -->
          <div class="card shadow-sm">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">最近活動</h5>
              <button class="btn btn-sm btn-outline-primary">查看全部</button>
            </div>
            <div class="card-body p-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-3">
                  <div class="d-flex">
                    <div class="activity-icon bg-primary text-white rounded-circle me-3">
                      <i class="fas fa-calendar-check"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">實習打卡</h6>
                      <p class="mb-0 text-muted">今天 09:30 - 實習時數：4小時</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item py-3">
                  <div class="d-flex">
                    <div class="activity-icon bg-warning text-white rounded-circle me-3">
                      <i class="fas fa-file-upload"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">上傳作品</h6>
                      <p class="mb-0 text-muted">昨天 15:45 - Web 應用程式原型設計</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item py-3">
                  <div class="d-flex">
                    <div class="activity-icon bg-info text-white rounded-circle me-3">
                      <i class="fas fa-comments"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">討論區回覆</h6>
                      <p class="mb-0 text-muted">2天前 - 回覆了「關於 UI 設計的問題」</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item py-3">
                  <div class="d-flex">
                    <div class="activity-icon bg-success text-white rounded-circle me-3">
                      <i class="fas fa-trophy"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">競賽報名</h6>
                      <p class="mb-0 text-muted">3天前 - 報名「校內網頁設計競賽」</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <!-- 快速操作 -->
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">快速操作</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <router-link to="/check-in" class="btn btn-primary">
                  <i class="fas fa-calendar-check me-2"></i> 實習打卡
                </router-link>
                <router-link to="/reports" class="btn btn-outline-primary">
                  <i class="fas fa-file-export me-2"></i> 匯出週誌
                </router-link>
                <router-link to="/forum" class="btn btn-outline-primary">
                  <i class="fas fa-comments me-2"></i> 進入討論區
                </router-link>
                <router-link to="/qa" class="btn btn-outline-primary">
                  <i class="fas fa-question-circle me-2"></i> 提問問題
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- 即將到來的活動 -->
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">即將到來的活動</h5>
            </div>
            <div class="card-body p-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-3">
                  <h6 class="mb-1">週五實習週誌截止</h6>
                  <p class="mb-0 text-muted">2025-03-29</p>
                </li>
                <li class="list-group-item py-3">
                  <h6 class="mb-1">網頁設計競賽截止</h6>
                  <p class="mb-0 text-muted">2025-04-05</p>
                </li>
                <li class="list-group-item py-3">
                  <h6 class="mb-1">期中實習評估</h6>
                  <p class="mb-0 text-muted">2025-04-15</p>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- 競賽排行榜 -->
          <div class="card shadow-sm">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">實習競賽排行</h5>
            </div>
            <div class="card-body p-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-3 d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary rounded-pill me-2">1</span>
                    <span>王小明</span>
                  </div>
                  <span class="badge bg-light text-dark">150 分</span>
                </li>
                <li class="list-group-item py-3 d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary rounded-pill me-2">2</span>
                    <span>李小華</span>
                  </div>
                  <span class="badge bg-light text-dark">145 分</span>
                </li>
                <li class="list-group-item py-3 d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary rounded-pill me-2">3</span>
                    <span>張小龍</span>
                  </div>
                  <span class="badge bg-light text-dark">142 分</span>
                </li>
                <li class="list-group-item py-3 d-flex justify-content-between align-items-center bg-light">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-success rounded-pill me-2">5</span>
                    <span>{{ currentUser.name }} (您)</span>
                  </div>
                  <span class="badge bg-primary text-white">135 分</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'Dashboard',
    setup() {
      const store = useStore()
      
      const currentUser = computed(() => store.getters['auth/currentUser'])
      
      return {
        currentUser
      }
    }
  }
  </script>
  
  <style scoped>
  .stat-icon, .activity-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  
  .card {
    border: none;
    border-radius: 0.5rem;
  }
  
  .card-header {
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .progress {
    height: 10px;
    border-radius: 5px;
  }
  
  .progress-bar {
    border-radius: 5px;
  }
  
  .list-group-item {
    border-left: none;
    border-right: none;
  }
  </style>