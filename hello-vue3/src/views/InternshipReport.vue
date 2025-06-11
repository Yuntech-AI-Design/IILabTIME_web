<template>
  <section class="w-full px-[10%] py-6 relative z-10">
    <div
      class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
      :class="{ 'animate-fade-in-up-relative': headerVisible }"
      style="animation-delay: 0.8s"
    >
      <!-- 標題 -->
      <h1 class="text-2xl font-semibold text-stone-950 mb-6 flex items-center justify-center">
        <DocumentReportIcon class="w-7 h-7 mr-2 text-Ghibli-blue" /> 實習成果報告
      </h1>

      <!-- 報告區塊 -->
      <div class="space-y-6">
        <div class="border border-stone-300 rounded-lg p-4">
          <PlanUpload
            :plan-file="reportData.planFile"
            @update:planFile="reportData.planFile = $event"
            :error-message="errors.planFile"
          />
        </div>

        <div class="border border-stone-300 rounded-lg p-4">
          <AchievementsForm
            v-model:achievements="reportData.achievements"
            :error-message="errors.achievements"
          />
        </div>

        <div class="border border-stone-300 rounded-lg p-4">
          <SuggestionsForm
            v-model:selfReflection="reportData.selfReflection"
            v-model:institutionSuggestions="reportData.institutionSuggestions"
            :error-message-self="errors.selfReflection"
            :error-message-institution="errors.institutionSuggestions"
          />
        </div>

        <div class="border border-stone-300 rounded-lg p-4">
          <FutureGoalsForm
            v-model:futureGoals="reportData.futureGoals"
            :error-message="errors.futureGoals"
          />
        </div>

        <div class="border border-stone-300 rounded-lg p-4">
          <AppendixSection
            :weekly-reports="reportData.weeklyReports"
            @update:weeklyReports="reportData.weeklyReports = $event"
            :error-messages="{ weeklyReports: errors.weeklyReports }"
          />
        </div>

        <div class="flex justify-center">
          <button
            @click="exportToPDF"
            class="px-6 py-2 bg-Ghibli-blue text-white rounded-full font-semibold hover:bg-Ghibli-yellow flex items-center"
          >
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" /> 匯出 PDF
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { reactive } from 'vue';
import { DocumentReportIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import PlanUpload from '@/components/InternshipReport/PlanUpload.vue';
import AchievementsForm from '@/components/InternshipReport/AchievementsForm.vue';
import SuggestionsForm from '@/components/InternshipReport/SuggestionsForm.vue';
import FutureGoalsForm from '@/components/InternshipReport/FutureGoalsForm.vue';
import AppendixSection from '@/components/InternshipReport/AppendixSection.vue';

defineProps({ headerVisible: { type: Boolean, default: true } });

const reportData = reactive({
  planFile: null,
  achievements: '',
  selfReflection: '',
  institutionSuggestions: '',
  futureGoals: '',
  weeklyReports: [],
  mediaFiles: [],
  contractFile: null,
  resumeCn: null,
  resumeEn: null
});

const errors = reactive({
  planFile: '',
  achievements: '',
  selfReflection: '',
  institutionSuggestions: '',
  futureGoals: '',
  weeklyReports: '',
  mediaFiles: '',
  contractFile: '',
  resumeCn: '',
  resumeEn: ''
});
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