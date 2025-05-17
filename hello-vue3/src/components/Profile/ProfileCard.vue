<template>
  <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 flex flex-col items-center">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">個人資訊</h2>
    <!-- 頭像 -->
    <div class="mb-6 relative group">
      <img
        :src="profile.avatar || defaultAvatar"
        alt="頭像"
        class="w-24 h-24 rounded-full object-cover border-2 border-gray-200 transition-transform duration-300 group-hover:scale-105"
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
        class="mt-2 w-full px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
      >
        上傳頭像
      </button>
    </div>

    <!-- 個人資訊 -->
    <transition
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <div v-if="!isEditing" class="w-full space-y-6">
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
          class="w-full px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
        >
          編輯資料
        </button>
      </div>
    </transition>

    <!-- 編輯模式 -->
    <transition
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <form v-if="isEditing" @submit.prevent="saveProfile" class="w-full space-y-6">
        <div>
          <label class="text-sm font-medium text-gray-600">姓名</label>
          <input
            v-model="editableProfile.name"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">電子郵件</label>
          <input
            v-model="editableProfile.email"
            type="email"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">電話</label>
          <input
            v-model="editableProfile.phone"
            type="tel"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">部門</label>
          <input
            v-model="editableProfile.department"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
        </div>
        <div class="flex space-x-2">
          <button
            type="submit"
            class="flex-1 px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
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
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  defaultAvatar: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:profile', 'show-success']);

const isEditing = ref(false);
const editableProfile = reactive({ ...props.profile });
const avatarInput = ref(null);

watch(() => props.profile, (newProfile) => {
  Object.assign(editableProfile, newProfile);
});

const uploadAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editableProfile.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  emit('update:profile', { ...editableProfile });
  emit('show-success');
  isEditing.value = false;
};

const cancelEdit = () => {
  Object.assign(editableProfile, props.profile);
  isEditing.value = false;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-in-out;
}
</style>