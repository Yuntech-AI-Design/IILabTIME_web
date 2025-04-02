<template>
  <div class="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">參與競賽回報</h1>

    <!-- 回報表單 -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <form @submit.prevent="submitReport" class="space-y-6">
        <!-- 競賽名稱 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">競賽名稱</label>
          <input
            v-model="form.competitionName"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="例如：2025全國論文競賽"
            required
          />
        </div>

        <!-- 參與級別 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">參與競賽區域類型</label>
          <select
            v-model="form.type"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>請選擇</option>
            <option value="paper">國際性</option>
            <option value="seminar">全國性</option>
            <option value="seminar">區域性</option>
            <option value="seminar">全校性</option>
          </select>
        </div>
        
        <!-- 參與類型 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">參與類型</label>
          <select
            v-model="form.type"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>請選擇</option>
            <option value="paper">競賽參與</option>
            <option value="seminar">研討會參與</option>
            <option value="seminar">論文發表</option>
          </select>
        </div>

        <!-- 日期 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">活動日期</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- 說明 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">參與說明</label>
          <textarea
            v-model="form.description"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="請簡述您的參與內容或成果"
            required
          ></textarea>
        </div>

        <!-- 檔案上傳 -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">相關證明檔案</label>
          <div
            class="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-indigo-500 transition-all duration-300"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.png"
              class="hidden"
            />
            <p class="text-gray-500">拖曳檔案至此，或</p>
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              選擇檔案
            </button>
            <p v-if="files.length" class="mt-2 text-sm text-gray-600">
              已選擇 {{ files.length }} 個檔案
            </p>
            <ul v-if="files.length" class="mt-2 text-left text-sm text-gray-700">
              <li v-for="(file, index) in files" :key="index" class="flex items-center justify-between">
                {{ file.name }}
                <button
                  @click="removeFile(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  移除
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 提交按鈕 -->
        <div class="flex space-x-4">
          <button
            type="submit"
            class="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '提交中...' : '提交回報' }}
          </button>
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition-all duration-300"
          >
            重置
          </button>
        </div>
      </form>
    </div>

    <!-- 成功訊息提示 -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg shadow-md"
    >
      回報已成功提交！
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'CompetitionReportPage',
  setup() {
    // 表單資料
    const form = reactive({
      competitionName: '',
      type: '',
      date: '',
      description: ''
    })

    // 檔案管理
    const files = ref([])
    const fileInput = ref(null)
    const isSubmitting = ref(false)
    const showSuccess = ref(false)

    // 處理檔案選擇
    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files)
      files.value = [...files.value, ...selectedFiles]
    }

    // 處理拖曳上傳
    const handleDrop = (event) => {
      const droppedFiles = Array.from(event.dataTransfer.files)
      files.value = [...files.value, ...droppedFiles]
    }

    // 移除檔案
    const removeFile = (index) => {
      files.value.splice(index, 1)
    }

    // 提交表單
    const submitReport = () => {
      if (files.value.length === 0) {
        alert('請至少上傳一個證明檔案！')
        return
      }

      isSubmitting.value = true
      // 模擬 API 提交
      setTimeout(() => {
        console.log('提交資料:', { ...form, files: files.value })
        isSubmitting.value = false
        showSuccess.value = true
        resetForm()
        setTimeout(() => {
          showSuccess.value = false
        }, 3000) // 3秒後隱藏成功訊息
      }, 1000) // 模擬 1 秒延遲
    }

    // 重置表單
    const resetForm = () => {
      form.competitionName = ''
      form.type = ''
      form.date = ''
      form.description = ''
      files.value = []
      if (fileInput.value) fileInput.value.value = ''
    }

    return {
      form,
      files,
      fileInput,
      isSubmitting,
      showSuccess,
      handleFileChange,
      handleDrop,
      removeFile,
      submitReport,
      resetForm
    }
  }
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式，這裡可保留特定自定義樣式 */
</style>