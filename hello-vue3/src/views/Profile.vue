<template>
  <section class="w-full px-4 py-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
    <!-- 居中容器 -->
    <div class="max-w-5xl mx-auto">
      <!-- 標題 -->
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        個人資料頁面
      </h1>

      <!-- 兩欄佈局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <!-- 左欄：個人資料卡片 -->
        <div class="animate-slide-in-left">
          <ProfileCard
            :profile="profile"
            :default-avatar="defaultAvatar"
            @update:profile="updateProfile"
            @show-success="showSuccessMessage"
          />
        </div>

        <!-- 右欄：實習單位資料卡片 -->
        <div class="animate-slide-in-right">
          <InternshipCard
            :internship="internship"
            @update:internship="updateInternship"
            @show-success="showSuccessMessage"
          />
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <SuccessToast :show="showSuccess" message="資料已成功更新！" />
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ProfileCard from '@/components/Profile/ProfileCard.vue';
import InternshipCard from '@/components/Profile/InternshipCard.vue';
import SuccessToast from '@/components/Profile/SuccessToast.vue';

// 模擬個人資料
const defaultAvatar = 'https://via.placeholder.com/150?text=頭像';
const profile = reactive({
  name: '王小明',
  email: 'xiaoming@example.com',
  phone: '0912-345-678',
  department: '資訊部門',
  avatar: null
});
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
});

const showSuccess = ref(false);

const updateProfile = (newProfile) => {
  Object.assign(profile, newProfile);
};

const updateInternship = (newInternship) => {
  Object.assign(internship, newInternship);
};

const showSuccessMessage = () => {
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};
</script>

<style scoped>
/* 定義動畫 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-in-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-in-out;
}
</style>