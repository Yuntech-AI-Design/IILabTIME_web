<template>
  <div class="checkin-dashboard bg-white font-ZMG min-h-screen relative">
    <!-- 浮動圓球背景 -->
    <div class="ball-background absolute top-0 left-0 w-full h-full overflow-x-clip z-0 pointer-events-none">
      <BallBackground :random="true" :randomColor="true" />
    </div>

    <!-- 子組件 -->
    <HeaderSection :visible="headerVisible" />
    <StatusCard
      :is-checked-in="isCheckedIn"
      :last-check-in="lastCheckIn"
      :last-check-in-timestamp="lastCheckInTimestamp"
      @check-in="checkIn"
      @check-out="checkOut"
    />
    <StatsGrid
      :weekly-hours="weeklyHours"
      :monthly-check-ins="monthlyCheckIns"
      :total-hours="totalHours"
      :header-visible="headerVisible"
    />
    <HistoryTable :check-in-records="checkInRecords" :header-visible="headerVisible" />
    <ModalDialog
      v-if="showModal"
      :message="modalMessage"
      :pending-action="pendingAction"
      @confirm="confirmAction"
      @cancel="cancelModal"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BallBackground from '@/components/Background/BallBackground.vue'
import HeaderSection from '@/components/CheckIn/HeaderSection.vue'
import StatusCard from '@/components/CheckIn/StatusCard.vue'
import StatsGrid from '@/components/CheckIn/StatsGrid.vue'
import HistoryTable from '@/components/CheckIn/HistoryTable.vue'
import ModalDialog from '@/components/CheckIn/ModalDialog.vue'

// 動畫與狀態
const headerVisible = ref(true)
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

const getCurrentTime = () => new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
const getCurrentDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

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
    lastCheckInTimestamp.value = Date.now()
    checkInRecords.value.unshift({ date, checkIn: time, checkOut: null, hours: null })
    monthlyCheckIns.value += 1
  } else if (pendingAction.value === 'checkOut') {
    const time = getCurrentTime()
    const todayRecord = checkInRecords.value[0]
    if (todayRecord && !todayRecord.checkOut) {
      todayRecord.checkOut = time
      const checkInTime = new Date(`${todayRecord.date}T${todayRecord.checkIn}:00`)
      const checkOutTime = new Date(`${todayRecord.date}T${time}:00`)
      if (isNaN(checkInTime) || isNaN(checkOutTime)) {
        todayRecord.hours = '計算錯誤'
      } else {
        const hours = ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2)
        todayRecord.hours = hours
        weeklyHours.value = Number(weeklyHours.value) + Number(hours)
        totalHours.value = Number(totalHours.value) + Number(hours)
      }
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