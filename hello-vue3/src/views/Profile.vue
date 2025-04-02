<template>
  <div class="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">個人資料頁面</h1>

    <!-- 個人資料卡片 -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center md:items-start">
        <!-- 頭像 -->
        <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            :src="profile.avatar || defaultAvatar"
            alt="頭像"
            class="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
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
            class="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all duration-300"
          >
            上傳新頭像
          </button>
        </div>

        <!-- 個人資訊 -->
        <div class="w-full">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">個人資訊</h2>
          <div v-if="!isEditing" class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-600">姓名</label>
              <p class="text-lg text-gray-800">{{ profile.name }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">電子郵件</label>
              <p class="text-lg text-gray-800">{{ profile.email }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">電話</label>
              <p class="text-lg text-gray-800">{{ profile.phone || '未提供' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">部門</label>
              <p class="text-lg text-gray-800">{{ profile.department || '未提供' }}</p>
            </div>
            <button
              @click="isEditing = true"
              class="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              編輯資料
            </button>
          </div>

          <!-- 編輯模式 -->
          <form v-else @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-600">姓名</label>
              <input
                v-model="editableProfile.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">電子郵件</label>
              <input
                v-model="editableProfile.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">電話</label>
              <input
                v-model="editableProfile.phone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">部門</label>
              <input
                v-model="editableProfile.department"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="flex space-x-4">
              <button
                type="submit"
                class="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
              >
                保存
              </button>
              <button
                @click="cancelEdit"
                type="button"
                class="px-6 py-2 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 成功訊息提示 -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg shadow-md"
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
    // 預設頭像
    const defaultAvatar = 'https://via.placeholder.com/150?text=頭像'

    // 用戶資料
    const profile = reactive({
      name: '王小明',
      email: 'xiaoming@example.com',
      phone: '0912-345-678',
      department: '資訊部門',
      avatar: null
    })

    // 編輯模式的資料副本
    const editableProfile = reactive({ ...profile })
    const isEditing = ref(false)
    const showSuccess = ref(false)

    // 上傳頭像
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

    // 保存資料
    const saveProfile = () => {
      Object.assign(profile, editableProfile)
      isEditing.value = false
      showSuccess.value = true
      setTimeout(() => {
        showSuccess.value = false
      }, 3000) // 3秒後隱藏成功訊息
    }

    // 取消編輯
    const cancelEdit = () => {
      Object.assign(editableProfile, profile) // 恢復原始資料
      isEditing.value = false
    }

    return {
      profile,
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
/* Tailwind 已處理大部分樣式，這裡可保留特定自定義樣式 */
</style>