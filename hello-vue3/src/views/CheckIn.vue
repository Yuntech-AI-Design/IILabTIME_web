<template>
  <div class="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">實習打卡頁面</h1>

    <!-- 狀態與按鈕 -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-center md:text-left mb-4 md:mb-0">
          <h2 class="text-xl font-semibold text-gray-700">當前狀態</h2>
          <p class="text-gray-500">您今天 {{ isCheckedIn ? '已實習上線打卡' : '尚未打卡' }}</p>
          <p class="text-sm text-gray-400 mt-1">最後打卡：{{ lastCheckIn || '無記錄' }}</p>
        </div>
        <div class="flex space-x-4">
          <button 
            @click="checkIn" 
            :disabled="isCheckedIn" 
            class="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            實習上線打卡
          </button>
          <button 
            @click="checkOut" 
            :disabled="!isCheckedIn" 
            class="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            實習下線打卡
          </button>
        </div>
      </div>
    </div>

    <!-- 打卡統計 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-700">本週時數</h3>
        <p class="text-2xl font-bold text-gray-800">{{ weeklyHours }} 小時</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-700">本月打卡</h3>
        <p class="text-2xl font-bold text-gray-800">{{ monthlyCheckIns }} 次</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-700">總時數</h3>
        <p class="text-2xl font-bold text-gray-800">{{ totalHours }} 小時</p>
      </div>
    </div>

    <!-- 打卡紀錄 -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">打卡歷史記錄</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-200 text-gray-700">
              <th class="py-3 px-4 font-semibold">日期</th>
              <th class="py-3 px-4 font-semibold">上班時間</th>
              <th class="py-3 px-4 font-semibold">下班時間</th>
              <th class="py-3 px-4 font-semibold">時數</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in checkInRecords" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-3 px-4">{{ record.date }}</td>
              <td class="py-3 px-4">{{ record.checkIn }}</td>
              <td class="py-3 px-4">{{ record.checkOut || '未打卡' }}</td>
              <td class="py-3 px-4">{{ record.hours || '-' }} 小時</td>
            </tr>
            <tr v-if="checkInRecords.length === 0">
              <td colspan="4" class="py-3 px-4 text-center text-gray-500">暫無打卡記錄</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 彈窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ modalMessage }}</h3>
        <div class="flex justify-end space-x-4">
          <template v-if="pendingAction">
            <button @click="cancelModal" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              取消
            </button>
            <button @click="confirmAction" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              確認
            </button>
          </template>
          <template v-else>
            <button @click="showModal = false" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              確定
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCheckedIn = ref(false)
const lastCheckIn = ref('')
const lastCheckInTimestamp = ref(null)
const weeklyHours = ref(16)
const monthlyCheckIns = ref(8)
const totalHours = ref(120)
const checkInRecords = ref([])

const showModal = ref(false)
const modalMessage = ref('')
const pendingAction = ref(null)

const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const getCurrentDate = () => new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })

// const canCheckOut = computed(() => {
//   if (!lastCheckInTimestamp.value) return false
//   const now = Date.now()
//   const diffInSeconds = (now - lastCheckInTimestamp.value) / 1000
//   return diffInSeconds >= 60
// })

const checkIn = () => {
  modalMessage.value = '確定要進行實習上線打卡嗎？'
  pendingAction.value = 'checkIn'
  showModal.value = true
}

const checkOut = () => {
  if (!lastCheckInTimestamp.value) return

  const now = Date.now()
  const diffInSeconds = Math.floor((now - lastCheckInTimestamp.value) / 1000)

  if (diffInSeconds < 60) {
    const remaining = 60 - diffInSeconds
    modalMessage.value = `實習上線打卡後需等待 1 分鐘才能下線打卡！\n（還需等待 ${remaining} 秒）`
    pendingAction.value = null
    showModal.value = true
  } else {
    modalMessage.value = '確定要進行實習下線打卡嗎？'
    pendingAction.value = 'checkOut'
    showModal.value = true
  }
}

const confirmAction = () => {
  if (pendingAction.value === 'checkIn') {
    const time = getCurrentTime()
    const date = getCurrentDate()
    isCheckedIn.value = true
    lastCheckIn.value = `${date} ${time}`
    lastCheckInTimestamp.value = Date.now() // ✅ 改這裡：用 timestamp 而不是 new Date()
    checkInRecords.value.unshift({ date, checkIn: time, checkOut: null, hours: null })
    monthlyCheckIns.value += 1
  } else if (pendingAction.value === 'checkOut') {
    const time = getCurrentTime()
    const todayRecord = checkInRecords.value[0]
    if (todayRecord && !todayRecord.checkOut) {
      todayRecord.checkOut = time
      const checkInTime = new Date(`${todayRecord.date} ${todayRecord.checkIn}`)
      const checkOutTime = new Date(`${todayRecord.date} ${time}`)
      const hours = ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2)
      todayRecord.hours = hours
      weeklyHours.value += parseFloat(hours)
      totalHours.value += parseFloat(hours)
    }
    isCheckedIn.value = false
    lastCheckInTimestamp.value = null
  }
  showModal.value = false
  pendingAction.value = null
}

const cancelModal = () => {
  showModal.value = false
  pendingAction.value = null
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式 */
</style>
