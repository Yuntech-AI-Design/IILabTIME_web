<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard container mx-auto px-4 py-6 min-h-screen bg-gray-100">
    <h1 class="mb-8 text-3xl font-bold text-gray-800 flex items-center justify-center">
      <UserCircleIcon class="w-8 h-8 mr-2 text-indigo-600" /> 您好，{{
        currentUser?.name || "訪客"
      }}
    </h1>

    <!-- 系統通知 -->
    <div class="flex items-center p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 shadow-md">
      <InformationCircleIcon class="w-6 h-6 mr-2 flex-shrink-0" />
      <div>請注意：本週的實習報告應在週五前提交。</div>
    </div>

    <!-- 主要內容 -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- 左側：實習進度摘要與最近活動 -->
      <div class="md:col-span-8">
        <!-- 實習進度摘要 -->
        <div class="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
          <h5 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <ChartBarIcon class="w-6 h-6 mr-2 text-indigo-500" /> 實習進度摘要
          </h5>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center p-2 rounded-lg hover:bg-gray-50 transition">
              <ClockIcon class="w-10 h-10 p-2 bg-blue-500 text-white rounded-full mr-3" />
              <div>
                <h6 class="text-sm font-medium text-gray-600">累計實習時數</h6>
                <h3 class="text-xl font-bold text-gray-800">
                  {{ totalHours }} 小時
                </h3>
              </div>
            </div>
            <div class="flex items-center p-2 rounded-lg hover:bg-gray-50 transition">
              <CheckCircleIcon class="w-10 h-10 p-2 bg-green-500 text-white rounded-full mr-3" />
              <div>
                <h6 class="text-sm font-medium text-gray-600">打卡次數</h6>
                <h3 class="text-xl font-bold text-gray-800">
                  {{ checkInCount }} 次
                </h3>
              </div>
            </div>
            <div class="flex items-center p-2 rounded-lg hover:bg-gray-50 transition">
              <ArrowUpTrayIcon class="w-10 h-10 p-2 bg-yellow-500 text-white rounded-full mr-3" />
              <div>
                <h6 class="text-sm font-medium text-gray-600">作品上傳</h6>
                <h3 class="text-xl font-bold text-gray-800">
                  {{ uploadCount }} 份
                </h3>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h6 class="text-sm font-medium text-gray-600 mb-2 text-center">
                本週實習進度
              </h6>
              <!-- 修正圓餅圖 -->
              <div class="w-32 h-32 mx-auto">
                <Doughnut :data="weeklyProgressData" :options="chartOptions" />
              </div>
              <p class="text-xs text-gray-500 text-center mt-2">
                {{ weeklyProgress }}% 完成
              </p>
            </div>
            <div>
              <h6 class="text-sm font-medium text-gray-600 mb-2 text-center">
                總實習進度
              </h6>
              <!-- 修正圓餅圖 -->
              <div class="w-32 h-32 mx-auto">
                <Doughnut :data="totalProgressData" :options="chartOptions" />
              </div>
              <p class="text-xs text-gray-500 text-center mt-2">
                {{ totalProgress }}% 完成
              </p>
            </div>
          </div>
        </div>

        <!-- 最近活動 -->
        <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-semibold text-gray-800 flex items-center">
              <ClockIcon class="w-6 h-6 mr-2 text-indigo-500" /> 最近活動
            </h5>
            <router-link to="/activities" class="text-sm text-blue-600 hover:underline">查看全部</router-link>
          </div>
          <ul class="divide-y divide-gray-200">
            <li v-for="activity in recentActivities" :key="activity.id" class="py-3 flex items-center">
              <component :is="activity.icon" class="w-10 h-10 p-2 text-white rounded-full mr-3"
                :class="activity.bgColor" />
              <div class="flex-1">
                <h6 class="text-sm font-medium text-gray-800">
                  {{ activity.title }}
                </h6>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div :class="activity.progressClass" class="h-1.5 rounded-full"
                    :style="{ width: activity.progress + '%' }"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右側：快速操作與其他資訊 -->
      <div class="md:col-span-4">
        <!-- 快速操作 -->
        <div class="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
          <h5 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <LightningBoltIcon class="w-6 h-6 mr-2 text-indigo-500" /> 快速操作
          </h5>
          <div class="grid gap-3">
            <router-link to="/check-in"
              class="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-600 transition">
              <CheckCircleIcon class="w-5 h-5 mr-2" /> 實習打卡
            </router-link>
            <router-link to="/reports"
              class="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
              <DocumentArrowDownIcon class="w-5 h-5 mr-2" /> 匯出週誌
            </router-link>
            <router-link to="/forum"
              class="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
              <ChatBubbleLeftIcon class="w-5 h-5 mr-2" /> 進入討論區
            </router-link>
            <router-link to="/qa"
              class="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
              <QuestionMarkCircleIcon class="w-5 h-5 mr-2" /> 提問問題
            </router-link>
          </div>
        </div>

        <!-- 即將到來的活動 -->
        <div class="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
          <h5 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CalendarIcon class="w-6 h-6 mr-2 text-indigo-500" /> 即將到來的活動
          </h5>
          <ul class="divide-y divide-gray-200">
            <li v-for="event in upcomingEvents" :key="event.id" class="py-3 flex items-center">
              <ClockIcon class="w-5 h-5 mr-2 text-gray-500" />
              <div>
                <h6 class="text-sm font-medium text-gray-800">
                  {{ event.title }}
                </h6>
                <p class="text-xs text-gray-500">
                  {{ event.date }} ({{ event.daysRemaining }} 天後)
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 競賽排行榜 -->
        <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h5 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrophyIcon class="w-6 h-6 mr-2 text-indigo-500" /> 實習競賽排行
          </h5>
          <ul class="divide-y divide-gray-200">
            <li v-for="rank in rankings" :key="rank.id" class="py-3 flex justify-between items-center"
              :class="{ 'bg-gray-50': rank.isCurrentUser }">
              <div class="flex items-center">
                <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2"
                  :class="{ 'bg-green-500': rank.isCurrentUser }">
                  {{ rank.position }}
                </span>
                <span class="text-sm text-gray-800">{{ rank.name }}</span>
                <span v-if="rank.isCurrentUser" class="ml-1 text-xs text-gray-500">(您)</span>
              </div>
              <div class="flex items-center">
                <span class="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs mr-2"
                  :class="{ 'bg-blue-500 text-white': rank.isCurrentUser }">
                  {{ rank.score }} 分
                </span>
                <!-- 修正長條圖 -->
                <div class="w-16 h-8">
                  <Bar :data="getRankChartData(rank)" :options="rankChartOptions" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Doughnut, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {
  UserCircleIcon,
  InformationCircleIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon,
  LightningBoltIcon,
  DocumentArrowDownIcon,
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'

// 註冊 Chart.js 組件
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const store = useStore();
const currentUser = computed(
  () => store.getters["auth/currentUser"] || { name: "開發者測試帳號" }
);

// 實習數據
const totalHours = ref(120);
const checkInCount = ref(35);
const uploadCount = ref(12);
const weeklyProgress = ref(65);
const totalProgress = ref(40);

// Doughnut 圖表數據
const weeklyProgressData = computed(() => ({
  labels: ["完成", "剩餘"],
  datasets: [
    {
      data: [weeklyProgress.value, 100 - weeklyProgress.value],
      backgroundColor: ["#3B82F6", "#E5E7EB"],
      borderWidth: 0,
    },
  ],
}));

const totalProgressData = computed(() => ({
  labels: ["完成", "剩餘"],
  datasets: [
    {
      data: [totalProgress.value, 100 - totalProgress.value],
      backgroundColor: ["#10B981", "#E5E7EB"],
      borderWidth: 0,
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
});

// 最近活動
const recentActivities = ref([
  {
    id: 1,
    title: "實習打卡",
    time: "今天 09:30 - 實習時數：4小時",
    icon: CheckCircleIcon,
    bgColor: "bg-blue-500",
    progress: 100,
    progressClass: "bg-blue-500",
  },
  {
    id: 2,
    title: "上傳作品",
    time: "昨天 15:45 - Web 應用程式原型設計",
    icon: ArrowUpTrayIcon,
    bgColor: "bg-yellow-500",
    progress: 100,
    progressClass: "bg-yellow-500",
  },
  {
    id: 3,
    title: "討論區回覆",
    time: "2天前 - 回覆了「關於 UI 設計的問題」",
    icon: ChatBubbleLeftIcon,
    bgColor: "bg-cyan-500",
    progress: 100,
    progressClass: "bg-cyan-500",
  },
  {
    id: 4,
    title: "競賽報名",
    time: "3天前 - 報名「校內網頁設計競賽」",
    icon: TrophyIcon,
    bgColor: "bg-green-500",
    progress: 50,
    progressClass: "bg-green-500",
  },
]);

// 即將到來的活動
const upcomingEvents = ref([
  {
    id: 1,
    title: "週五實習週誌截止",
    date: "2025-03-29",
    daysRemaining: calculateDaysRemaining("2025-03-29"),
  },
  {
    id: 2,
    title: "網頁設計競賽截止",
    date: "2025-04-05",
    daysRemaining: calculateDaysRemaining("2025-04-05"),
  },
  {
    id: 3,
    title: "期中實習評估",
    date: "2025-04-15",
    daysRemaining: calculateDaysRemaining("2025-04-15"),
  },
]);

// 競賽排行榜
const rankings = ref([
  { id: 1, position: 1, name: "王小明", score: 150, isCurrentUser: false },
  { id: 2, position: 2, name: "李小華", score: 145, isCurrentUser: false },
  { id: 3, position: 3, name: "張小龍", score: 142, isCurrentUser: false },
  {
    id: 4,
    position: 5,
    name: currentUser.value.name,
    score: 135,
    isCurrentUser: true,
  },
]);

// 柱狀圖數據與配置
const rankChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: { display: false },
    y: { display: false, max: 150 },
  },
});

const getRankChartData = (rank) => ({
  labels: [rank.name],
  datasets: [
    {
      data: [rank.score],
      backgroundColor: rank.isCurrentUser ? "#3B82F6" : "#D1D5DB",
      borderWidth: 0,
    },
  ],
});

// 計算剩餘天數
function calculateDaysRemaining(date) {
  const today = new Date();
  const eventDate = new Date(date);
  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
}
</script>

<style scoped>
/* Tailwind 已處理大部分樣式 */
</style>
