<template>
  <div class="dashboard container mx-auto px-4 py-6">
    <h1 class="mb-4 text-2xl font-bold text-gray-800">您好，{{ currentUser?.name || '訪客' }}</h1>

    <!-- 系統通知 -->
    <div class="flex items-center p-4 mb-4 bg-blue-100 border border-blue-300 rounded-lg text-blue-800" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="flex-shrink-0 mr-2" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
      <div>
        請注意：本週的實習報告應在週五前提交。
      </div>
    </div>

    <!-- 實習進度摘要 -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
      <div class="md:col-span-8">
        <div class="bg-white shadow-md rounded-lg mb-6">
          <div class="bg-white border-b border-gray-200 px-4 py-3">
            <h5 class="text-lg font-semibold text-gray-800 m-0">實習進度摘要</h5>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-clock"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-600 mb-0">累計實習時數</h6>
                  <h3 class="text-xl font-bold text-gray-800 mb-0">120 小時</h3>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-600 mb-0">打卡次數</h6>
                  <h3 class="text-xl font-bold text-gray-800 mb-0">35 次</h3>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-file-upload"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-600 mb-0">作品上傳</h6>
                  <h3 class="text-xl font-bold text-gray-800 mb-0">12 份</h3>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <h6 class="text-sm font-medium text-gray-600">本週實習進度</h6>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: 65%;"></div>
              </div>
            </div>

            <div class="mt-4">
              <h6 class="text-sm font-medium text-gray-600">總實習進度</h6>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-green-500 h-2.5 rounded-full" style="width: 40%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近活動 -->
        <div class="bg-white shadow-md rounded-lg">
          <div class="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h5 class="text-lg font-semibold text-gray-800 m-0">最近活動</h5>
            <button class="text-sm text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-50">查看全部</button>
          </div>
          <div class="p-0">
            <ul class="divide-y divide-gray-200">
              <li class="py-3 px-4 flex">
                <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-800 mb-1">實習打卡</h6>
                  <p class="text-xs text-gray-500 mb-0">今天 09:30 - 實習時數：4小時</p>
                </div>
              </li>
              <li class="py-3 px-4 flex">
                <div class="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-file-upload"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-800 mb-1">上傳作品</h6>
                  <p class="text-xs text-gray-500 mb-0">昨天 15:45 - Web 應用程式原型設計</p>
                </div>
              </li>
              <li class="py-3 px-4 flex">
                <div class="w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-comments"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-800 mb-1">討論區回覆</h6>
                  <p class="text-xs text-gray-500 mb-0">2天前 - 回覆了「關於 UI 設計的問題」</p>
                </div>
              </li>
              <li class="py-3 px-4 flex">
                <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-trophy"></i>
                </div>
                <div>
                  <h6 class="text-sm font-medium text-gray-800 mb-1">競賽報名</h6>
                  <p class="text-xs text-gray-500 mb-0">3天前 - 報名「校內網頁設計競賽」</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="md:col-span-4">
        <!-- 快速操作 -->
        <div class="bg-white shadow-md rounded-lg mb-6">
          <div class="bg-white border-b border-gray-200 px-4 py-3">
            <h5 class="text-lg font-semibold text-gray-800 m-0">快速操作</h5>
          </div>
          <div class="p-4 grid gap-2">
            <router-link to="/check-in" class="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">
              <i class="fas fa-calendar-check mr-2"></i> 實習打卡
            </router-link>
            <router-link to="/reports" class="block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-center">
              <i class="fas fa-file-export mr-2"></i> 匯出週誌
            </router-link>
            <router-link to="/forum" class="block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-center">
              <i class="fas fa-comments mr-2"></i> 進入討論區
            </router-link>
            <router-link to="/qa" class="block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-center">
              <i class="fas fa-question-circle mr-2"></i> 提問問題
            </router-link>
          </div>
        </div>

        <!-- 即將到來的活動 -->
        <div class="bg-white shadow-md rounded-lg mb-6">
          <div class="bg-white border-b border-gray-200 px-4 py-3">
            <h5 class="text-lg font-semibold text-gray-800 m-0">即將到來的活動</h5>
          </div>
          <div class="p-0">
            <ul class="divide-y divide-gray-200">
              <li class="py-3 px-4">
                <h6 class="text-sm font-medium text-gray-800 mb-1">週五實習週誌截止</h6>
                <p class="text-xs text-gray-500 mb-0">2025-03-29</p>
              </li>
              <li class="py-3 px-4">
                <h6 class="text-sm font-medium text-gray-800 mb-1">網頁設計競賽截止</h6>
                <p class="text-xs text-gray-500 mb-0">2025-04-05</p>
              </li>
              <li class="py-3 px-4">
                <h6 class="text-sm font-medium text-gray-800 mb-1">期中實習評估</h6>
                <p class="text-xs text-gray-500 mb-0">2025-04-15</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 競賽排行榜 -->
        <div class="bg-white shadow-md rounded-lg">
          <div class="bg-white border-b border-gray-200 px-4 py-3">
            <h5 class="text-lg font-semibold text-gray-800 m-0">實習競賽排行</h5>
          </div>
          <div class="p-0">
            <ul class="divide-y divide-gray-200">
              <li class="py-3 px-4 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">1</span>
                  <span class="text-sm text-gray-800">王小明</span>
                </div>
                <span class="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">150 分</span>
              </li>
              <li class="py-3 px-4 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">2</span>
                  <span class="text-sm text-gray-800">李小華</span>
                </div>
                <span class="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">145 分</span>
              </li>
              <li class="py-3 px-4 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">3</span>
                  <span class="text-sm text-gray-800">張小龍</span>
                </div>
                <span class="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">142 分</span>
              </li>
              <li class="py-3 px-4 flex justify-between items-center bg-gray-100">
                <div class="flex items-center">
                  <span class="bg-green-500 text-white rounded-full px-2 py-1 text-xs mr-2">5</span>
                  <span class="text-sm text-gray-800">{{ currentUser.name }} (您)</span>
                </div>
                <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">135 分</span>
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
    
    const currentUser = computed(() => store.getters['auth/currentUser'] || { name: '開發者測試帳號' })

    return {
      currentUser
    }
  }
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式，這裡僅保留必要的自定義樣式 */
</style>