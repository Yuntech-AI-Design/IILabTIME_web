<template>
  <section class="w-full px-4 py-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
        實習成果報告
      </h1>

      <div class="mb-8 animate-slide-in-left">
        <PlanUpload
          :plan-file="reportData.planFile"
          @update:planFile="reportData.planFile = $event"
          :error-message="errors.planFile"
        />
      </div>

      <div class="mb-8 animate-slide-in-right">
        <AchievementsForm
          v-model:achievements="reportData.achievements"
          :error-message="errors.achievements"
        />
      </div>

      <div class="mb-8 animate-slide-in-left">
        <SuggestionsForm
          v-model:selfReflection="reportData.selfReflection"
          v-model:institutionSuggestions="reportData.institutionSuggestions"
          :error-message-self="errors.selfReflection"
          :error-message-institution="errors.institutionSuggestions"
        />
      </div>

      <div class="mb-8 animate-slide-in-right">
        <FutureGoalsForm
          v-model:futureGoals="reportData.futureGoals"
          :error-message="errors.futureGoals"
        />
      </div>

      <div class="mb-8 animate-slide-in-left">
        <AppendixSection
          :weekly-reports="reportData.weeklyReports"
          @update:weeklyReports="reportData.weeklyReports = $event"
          :error-messages="{ weeklyReports: errors.weeklyReports }"
        />
      </div>

      <div class="flex justify-center space-x-4">
        <button
          @click="exportToPDF"
          class="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all duration-200"
        >
          匯出 PDF
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { reactive } from 'vue';
import PlanUpload from '@/components/InternshipReport/PlanUpload.vue';
import AchievementsForm from '@/components/InternshipReport/AchievementsForm.vue';
import SuggestionsForm from '@/components/InternshipReport/SuggestionsForm.vue';
import FutureGoalsForm from '@/components/InternshipReport/FutureGoalsForm.vue';
import AppendixSection from '@/components/InternshipReport/AppendixSection.vue';

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
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

.animate-fade-in { animation: fade-in 0.5s ease-in-out; }
.animate-slide-in-left { animation: slide-in-left 0.5s ease-in-out; }
.animate-slide-in-right { animation: slide-in-right 0.5s ease-in-out; }
</style>