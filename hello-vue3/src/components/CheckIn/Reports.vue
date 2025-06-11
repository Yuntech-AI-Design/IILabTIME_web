<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <!-- 標題 -->
      <h2 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center">
        <DocumentTextIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 週誌上傳
      </h2>

      <!-- 後備內容 -->
      <div
        v-if="!userProfile.internshipCompany"
        class="bg-Ghibli-red/10 border border-Ghibli-red p-4 rounded-lg text-Ghibli-red text-sm mb-6"
      >
        無法載入實習廠商資料，請檢查個人資料設定！
      </div>

      <!-- 兩欄佈局 -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 左欄：表單欄位 -->
        <div class="border border-stone-300 rounded-lg p-4">
          <ReportFields
            :company="userProfile.internshipCompany"
            v-model="formData"
            class="space-y-4"
          />
        </div>
        <!-- 右欄：照片上傳與提交按鈕 -->
        <div class="border border-stone-300 rounded-lg p-4">
          <PhotoUploader
            v-model="photos"
            @error="showError"
            class="mb-4"
          />
          <button
            @click="handleSubmit"
            class="w-full px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center justify-center"
          >
            <ArrowUpTrayIcon class="w-5 h-5 mr-2" /> 提交週誌
          </button>
        </div>
      </div>

      <!-- 錯誤/成功模態框 -->
      <teleport to="body">
        <ModalDialog
          v-if="showErrorModal"
          :message="errorMessage"
          @close="showErrorModal = false"
        />
      </teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DocumentTextIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import ReportFields from '@/components/WeeklyReport/ReportForm.vue'
import PhotoUploader from '@/components/WeeklyReport/PhotoUploader.vue'
import ModalDialog from '@/components/CheckIn/ModalDialog.vue'

defineProps({
  headerVisible: { type: Boolean, default: true }
})

const emit = defineEmits(['loaded', 'submit-success'])

const userProfile = {
  internshipCompany: 'Tech Innovate Inc.'
}

const formData = ref({
  content: '',
  observations: '',
  reflections: '',
  challenges: '',
  solutions: '',
  others: ''
})

const photos = ref([])

const showErrorModal = ref(false)
const errorMessage = ref('')

onMounted(() => {
  console.log('Reports.vue 已掛載，實習廠商：', userProfile.internshipCompany)
  emit('loaded')
})

const handleSubmit = () => {
  if (
    formData.value.content === '' ||
    formData.value.observations === '' ||
    formData.value.reflections === '' ||
    formData.value.challenges === '' ||
    formData.value.solutions === ''
  ) {
    showError('請填寫所有必填欄位！')
    return
  }
  if (photos.value.length !== 4) {
    showError('請上傳正好 4 張照片！')
    return
  }
  console.log('提交數據：', {
    company: userProfile.internshipCompany,
    ...formData.value,
    photos: photos.value.map(p => p.file)
  })
  formData.value = {
    content: '',
    observations: '',
    reflections: '',
    challenges: '',
    solutions: '',
    others: ''
  }
  photos.value = []
  errorMessage.value = '週誌提交成功！'
  showErrorModal.value = true
  emit('submit-success')
}

const showError = (message) => {
  errorMessage.value = message
  showErrorModal.value = true
}
</script>

<style scoped>
.home-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>