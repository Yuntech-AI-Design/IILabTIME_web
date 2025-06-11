<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <!-- 標題 -->
      <h1 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center justify-center">
        <UserIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 個人資料頁面
      </h1>

      <!-- 兩欄佈局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 左欄：個人資料卡片 -->
        <div>
          <ProfileCard
            :profile="profile"
            :default-avatar="defaultAvatar"
            @update:profile="updateProfile"
            @show-success="showSuccessMessage"
            class="border border-stone-300 rounded-lg p-4"
          />
        </div>

        <!-- 右欄：實習單位資料卡片 -->
        <div>
          <InternshipCard
            :internship="internship"
            @update:internship="updateInternship"
            @show-success="showSuccessMessage"
            class="border border-stone-300 rounded-lg p-4"
          />
        </div>
      </div>

      <!-- 成功提示模態框 -->
      <teleport to="body">
        <ModalDialog
          v-if="showSuccess"
          :visible="showSuccess"
          message="資料已成功更新！"
          @confirm="showSuccess = false"
          @cancel="showSuccess = false"
          @close="showSuccess = false"
        >
          <div class="flex justify-end">
            <button
              @click="showSuccess = false"
              class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow"
            >
              確定
            </button>
          </div>
        </ModalDialog>
      </teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UserIcon } from '@heroicons/vue/24/outline';
import ProfileCard from '@/components/Profile/ProfileCard.vue';
import InternshipCard from '@/components/Profile/InternshipCard.vue';
import ModalDialog from '@/components/Grades/ModalDialog.vue';

defineProps({ headerVisible: { type: Boolean, default: true } });

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
};
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