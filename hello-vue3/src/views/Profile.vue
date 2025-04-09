<!-- src/views/Profile.vue -->
<template>
  <div class="container mx-auto px-4 py-6 min-h-screen bg-gray-100">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">個人資料頁面</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 個人資料卡片（左側） -->
      <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">個人資訊</h2>
        <!-- 頭像 -->
        <div class="mb-4">
          <img
            :src="profile.avatar || defaultAvatar"
            alt="頭像"
            class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <input
            type="file"
            ref="avatarInput"
            @change="uploadAvatar"
            accept="image/*"
            class="hidden"
          />
          <button
            @click="$refs.avatarInput.click()"
            class="mt-2 w-full px-4 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-all duration-200"
          >
            上傳頭像
          </button>
        </div>

        <!-- 個人資訊 -->
        <div v-if="!isEditing" class="w-full space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">姓名</label>
            <p class="text-base text-gray-800 leading-relaxed">{{ profile.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">電子郵件</label>
            <p class="text-base text-gray-800 leading-relaxed">{{ profile.email }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">電話</label>
            <p class="text-base text-gray-800 leading-relaxed">{{ profile.phone || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">部門</label>
            <p class="text-base text-gray-800 leading-relaxed">{{ profile.department || '未提供' }}</p>
          </div>
          <button
            @click="isEditing = true"
            class="w-full px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            編輯資料
          </button>
        </div>

        <!-- 編輯模式 -->
        <form v-else @submit.prevent="saveProfile" class="w-full space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">姓名</label>
            <input
              v-model="editableProfile.name"
              type="text"
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
              required
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">電子郵件</label>
            <input
              v-model="editableProfile.email"
              type="email"
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
              required
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">電話</label>
            <input
              v-model="editableProfile.phone"
              type="tel"
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">部門</label>
            <input
              v-model="editableProfile.department"
              type="text"
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            />
          </div>
          <div class="flex space-x-2">
            <button
              type="submit"
              class="flex-1 px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-all duration-200"
            >
              保存
            </button>
            <button
              @click="cancelEdit"
              type="button"
              class="flex-1 px-4 py-1.5 bg-gray-300 text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-400 transition-all duration-200"
            >
              取消
            </button>
          </div>
        </form>
      </div>

      <!-- 實習單位資料卡片（右側） -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">實習單位資料</h2>
        <div class="space-y-4 text-base">
          <div>
            <label class="text-sm font-medium text-gray-600">單位名稱</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.internshipCompany || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">公司地址</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.companyAddress || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">實習地址</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.internshipAddress || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">負責人</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.responsiblePerson || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">聯絡人</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.contactPerson || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">電話</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.contactPhone || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">統一編號</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.taxId || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">產業類型</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.industryType || '未提供' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">實習期間</label>
            <p class="text-gray-800 leading-relaxed">
              {{ internship.startDate && internship.endDate ? `${internship.startDate} 至 ${internship.endDate}` : '未提供' }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">實習內容</label>
            <p class="text-gray-800 leading-relaxed">{{ internship.internshipContent || '未提供' }}</p>
          </div>
        </div>
        <router-link
          to="/internship-form"
          class="mt-4 block w-full text-center px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all duration-200"
        >
          編輯實習資料
        </router-link>
      </div>
    </div>

    <!-- 成功訊息提示 -->
    <div
      v-if="showSuccess"
      class="fixed bottom-2 right-2 bg-green-100 border border-green-300 text-green-800 p-2 rounded-lg shadow-md text-sm"
    >
      個人資料已成功更新！
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ProfilePage',
  setup() {
    const defaultAvatar = 'https://via.placeholder.com/150?text=頭像'
    const profile = reactive({
      name: '王小明',
      email: 'xiaoming@example.com',
      phone: '0912-345-678',
      department: '資訊部門',
      avatar: null
    })
    const internship = reactive({
      internshipCompany: '資訊整合實驗室',
      companyAddress: '雲林縣斗六市大學路三段123號',
      internshipAddress: '雲林縣斗六市大學路三段123號',
      responsiblePerson: '李負責',
      contactPerson: '黃登揚教授',
      contactPhone: '05-5342601',
      taxId: '12345678',
      industryType: '資訊技術',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      internshipContent: '參與AI模型開發與資料分析'
    })
    const editableProfile = reactive({ ...profile })
    const isEditing = ref(false)
    const showSuccess = ref(false)
    const avatarInput = ref(null)

    const uploadAvatar = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profile.avatar = e.target.result
          editableProfile.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const saveProfile = () => {
      Object.assign(profile, editableProfile)
      isEditing.value = false
      showSuccess.value = true
      setTimeout(() => {
        showSuccess.value = false
      }, 3000)
    }

    const cancelEdit = () => {
      Object.assign(editableProfile, profile)
      isEditing.value = false
    }

    return {
      profile,
      internship,
      editableProfile,
      isEditing,
      showSuccess,
      defaultAvatar,
      avatarInput,
      uploadAvatar,
      saveProfile,
      cancelEdit
    }
  }
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式 */
</style>