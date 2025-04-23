<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard bg-white font-ZMG min-h-screen">
    <!-- 頂部標題 -->
    <section class="w-full h-[30vh] pt-[8vh] px-[5%] relative">
      <div class="flex flex-col items-center justify-center w-full h-full">
        <h1 class="text-6xl font-bold  flex items-center justify-center opacity-0"
            :class="{ 'animate-fade-in-up-relative': headerVisible }">
          <UserCircleIcon class="w-12 h-12 mr-3 text-Ghibli-yellow" /> 您好，{{ currentUser?.name || "訪客" }}
        </h1>
      </div>
    </section>

    <!-- 系統通知 -->
    <section class="w-full px-[10%] py-6 relative z-20">
      <div class="flex items-center p-6 bg-white border-4 border-stone-950 rounded-xl shadow-lg max-w-3xl mx-auto opacity-0"
           :class="{ 'animate-fade-in-right': notificationVisible }">
        <InformationCircleIcon class="w-8 h-8 mr-3 text-Ghibli-blue" />
        <div class="text-xl font-semibold text-stone-950">
          請注意：本週的實習報告應在週五前提交。
        </div>
      </div>
    </section>

    <!-- 主要內容 -->
    <section class="w-full px-[10%] py-12 relative" ref="mainContentRef">
      <div class="ball-background absolute top-0 left-0 w-full h-full overflow-x-clip z-0">
        <span v-for="(ball, i) in balls" :key="i" class="z-10 absolute rounded-full"
              :class="[ball.bg, ball.animation]" :style="ball.style"></span>
        <!-- <span class="z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-Ghibli-yellow h-[672px] w-[672px]"
              :class="{ 'animate-pulse-slow-absolute': mainContentVisible }"></span> -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 z-20 relative">
        <!-- 左側：實習進度摘要與最近活動 -->
        <div class="md:col-span-8">
          <!-- 實習進度摘要 -->
          <div class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
               :class="{ 'animate-fade-in-up-relative': mainContentVisible }">
            <h5 class="text-4xl font-bold mb-6 flex items-center">
              <ChartBarIcon class="w-8 h-8 mr-3 text-Ghibli-red" /> 實習進度摘要
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="(item, index) in progressItems" :key="index"
                   class="flex items-center p-4 rounded-lg shadow-lg bg-white hover:scale-105 transition-all duration-300"
                   :class="{ 'animate-fade-in-up-relative': mainContentVisible }"
                   :style="`animation-delay: ${0.3 + index * 0.2}s`">
                <component :is="item.icon" :class="item.bgColor" class="w-12 h-12 p-3 text-white rounded-full mr-4" />
                <div>
                  <h6 class="text-lg font-semibold text-stone-950">{{ item.title }}</h6>
                  <h3 class="text-2xl font-bold" :class="item.textColor">{{ item.value }}</h3>
                </div>
              </div>
            </div>
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="(chart, idx) in progressCharts" :key="idx"
                   class="flex flex-col items-center opacity-0"
                   :class="{ 'animate-fade-in-up-relative': mainContentVisible }"
                   :style="`animation-delay: ${0.7 + idx * 0.3}s`">
                <h6 class="text-lg font-semibold text-stone-950 mb-3">{{ chart.title }}</h6>
                <div v-if="chart.data && chart.data.datasets" class="w-40 h-40">
                  <Doughnut :data="chart.data" :options="chartOptions" />
                </div>
                <p class="text-sm text-stone-950 mt-2">{{ chart.progress }}% 完成</p>
              </div>
            </div>
          </div>

          <!-- 最近活動 -->
          <div class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 mt-8 shadow-xl opacity-0"
               :class="{ 'animate-fade-in-up-relative': mainContentVisible }" style="animation-delay: 0.5s">
            <div class="flex justify-between items-center mb-6">
              <h5 class="text-4xl font-bold flex items-center">
                <ClockIcon class="w-8 h-8 mr-3 text-Ghibli-red" /> 最近活動
              </h5>
              <router-link to="/activities" class="text-lg hover:underline">查看全部</router-link>
            </div>
            <ul class="divide-y divide-stone-950">
              <li v-for="(activity, index) in recentActivities" :key="activity.id"
                  class="py-4 flex items-center opacity-0"
                  :class="{ 'animate-fade-in-left': mainContentVisible }"
                  :style="`animation-delay: ${0.7 + index * 0.2}s`">
                <component :is="activity.icon" class="w-12 h-12 p-3 text-white rounded-full mr-4"
                           :class="activity.bgColor" />
                <div class="flex-1">
                  <h6 class="text-lg font-semibold text-stone-950">{{ activity.title }}</h6>
                  <p class="text-sm text-stone-950">{{ activity.time }}</p>
                  <div class="w-full bg-Ghibli-light-red rounded-full h-2 mt-2">
                    <div :class="activity.progressClass" class="h-2 rounded-full"
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
          <div class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 mb-8 shadow-xl opacity-0"
               :class="{ 'animate-fade-in-right': mainContentVisible }">
            <h5 class="text-4xl font-bold mb-6 flex items-center">
              <LightningBoltIcon class="w-8 h-8 mr-3 text-Ghibli-red" /> 快速操作
            </h5>
            <div class="grid gap-4">
              <router-link v-for="(action, index) in quickActions" :key="index" :to="action.to"
                           class="flex items-center px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 opacity-0"
                           :class="{ 'animate-fade-in-right': mainContentVisible }"
                           :style="`animation-delay: ${0.3 + index * 0.2}s`">
                <component :is="action.icon" class="w-6 h-6 mr-3" />
                <span class="text-lg font-semibold">{{ action.text }}</span>
              </router-link>
            </div>
          </div>

          <!-- 即將到來的活動 -->
          <!-- <div class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 mb-8 shadow-xl opacity-0"
               :class="{ 'animate-fade-in-right': mainContentVisible }" style="animation-delay: 0.3s">
            <h5 class="text-4xl font-bold mb-6 flex items-center">
              <CalendarIcon class="w-8 h-8 mr-3 text-Ghibli-red" /> 即將到來的活動
            </h5>
            <ul class="divide-y divide-stone-950">
              <li v-for="(event, index) in upcomingEvents" :key="event.id"
                  class="py-4 flex items-center opacity-0"
                  :class="{ 'animate-fade-in-right': mainContentVisible }"
                  :style="`animation-delay: ${0.5 + index * 0.2}s`">
                <ClockIcon class="w-6 h-6 mr-3 text-Ghibli-blue" />
                <div>
                  <h6 class="text-lg font-semibold text-stone-950">{{ event.title }}</h6>
                  <p class="text-sm text-stone-950">
                    {{ event.date }} ({{ event.daysRemaining }} 天後)
                  </p>
                </div>
              </li>
            </ul>
          </div> -->

          <!-- 競賽排行榜 -->
          <div class="home-card bg-white border-4 border-stone-950 rounded-xl p-8 shadow-xl opacity-0"
               :class="{ 'animate-fade-in-right': mainContentVisible }" style="animation-delay: 0.5s">
            <h5 class="text-4xl font-bold mb-6 flex items-center">
              <TrophyIcon class="w-8 h-8 mr-3 text-Ghibli-red" /> 實習競賽排行
            </h5>
            <ul class="divide-y divide-stone-950">
              <li v-for="(rank, index) in rankings" :key="rank.id"
                  class="py-4 flex justify-between items-center opacity-0"
                  :class="{ 'animate-fade-in-right': mainContentVisible }"
                  :style="`animation-delay: ${0.7 + index * 0.2}s`">
                <div class="flex items-center">
                  <span class="bg-Ghibli-blue text-white rounded-full px-3 py-1 text-sm mr-3"
                        :class="{ 'bg-Ghibli-yellow': rank.isCurrentUser }">
                    {{ rank.position }}
                  </span>
                  <span class="text-lg text-stone-950">{{ rank.name }}</span>
                  <span v-if="rank.isCurrentUser" class="ml-2 text-sm text-stone-950">(您)</span>
                </div>
                <div class="flex items-center">
                  <span class="bg-Ghibli-yellow text-stone-950 rounded-full px-3 py-1 text-sm mr-3"
                        :class="{ 'bg-Ghibli-blue text-white': rank.isCurrentUser }">
                    {{ rank.score }} 分
                  </span>
                  <!-- <div v-if="getRankChartData(rank).datasets" class="w-20 h-10">
                    <Bar :data="getRankChartData(rank)" :options="rankChartOptions" />
                  </div> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
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
  TrophyIcon,
} from "@heroicons/vue/24/outline";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useStore();
const currentUser = computed(() => store.getters["auth/currentUser"] || { name: "開發者測試帳號" });

// Internship data
const totalHours = ref(120);
const checkInCount = ref(35);
const uploadCount = ref(12);
const weeklyProgress = ref(65);
const totalProgress = ref(40);

// Intersection Observer refs and state
const headerVisible = ref(true); // Header is visible by default
const notificationVisible = ref(true); // Notification is visible by default
const mainContentVisible = ref(false);
const mainContentRef = ref(null);

// Animated balls data (same as Home.vue)
const balls = [
  { bg: 'bg-Ghibli-blue', animation: 'animate-float', style: 'top: 69%; left: 32%; height: 211px; width: 211px;' },
  { bg: 'bg-Ghibli-red', animation: 'animate-float-delay-1', style: 'top: 63%; left: 55%; height: 124px; width: 124px;' },
  { bg: 'bg-Ghibli-light-red', animation: 'animate-float-delay-2', style: 'top: 46%; left: 67.7%; height: 85px; width: 85px;' },
  { bg: 'bg-Ghibli-skin', animation: 'animate-float-delay-3', style: 'top: 16%; left: 63%; height: 85px; width: 85px;' },
  { bg: 'bg-Ghibli-green', animation: 'animate-float-delay-4', style: 'top: 0%; left: 0%; height: 323px; width: 323px;' },
  { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-1', style: 'top: -5%; left: 32%; height: 158px; width: 158px;' },
  { bg: 'bg-Ghibli-blue', animation: 'animate-float-delay-2', style: 'top: -7%; left: 70%; height: 132px; width: 132px;' },
  { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-3', style: 'top: 50%; left: 85%; height: 532px; width: 532px;' }
];

// randomize ball positions
for (let i = 0; i < balls.length; i++) {
  const randomTop = Math.random() * 100;
  const randomLeft = Math.random() * 100;
  console.log(randomTop, randomLeft);
  const randomSize = Math.random() * 200 + 50; // Random size between 50px and 250px
  balls[i].style = `top: ${randomTop}%; left: ${randomLeft}%; height: ${randomSize}px; width: ${randomSize}px;`;
}

// Progress items data
const progressItems = [
  { title: "本週實習時數", value: `${totalHours.value} 小時`, icon: ClockIcon, textColor: "text-Ghibli-blue", bgColor: "bg-Ghibli-blue" },
  { title: "打卡次數", value: `${checkInCount.value} 次`, icon: CheckCircleIcon, textColor: "text-Ghibli-green", bgColor: "bg-Ghibli-green" },
  { title: "作品上傳", value: `${uploadCount.value} 份`, icon: ArrowUpTrayIcon, textColor: "text-Ghibli-yellow", bgColor: "bg-Ghibli-yellow" },
];

// Doughnut chart data with safeguards
const weeklyProgressData = computed(() => ({
  labels: ["完成", "剩餘"],
  datasets: [
    {
      data: [weeklyProgress.value || 0, 100 - (weeklyProgress.value || 0)],
      backgroundColor: ["#64544C", "#E5E7EB"],
      borderWidth: 0,
    },
  ],
}));

const totalProgressData = computed(() => ({
  labels: ["完成", "剩餘"],
  datasets: [
    {
      data: [totalProgress.value || 0, 100 - (totalProgress.value || 0)],
      backgroundColor: ["#E4B584", "#E5E7EB"],
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

// Progress charts data
const progressCharts = computed(() => [
  { title: "本週實習進度", data: weeklyProgressData.value, progress: weeklyProgress.value || 0 },
  { title: "總實習進度", data: totalProgressData.value, progress: totalProgress.value || 0 },
]);

// Quick actions data
const quickActions = [
  { to: "/check-in", text: "實習打卡", icon: CheckCircleIcon },
  { to: "/grade", text: "成績管理", icon: CheckCircleIcon },
  { to: "/reports", text: "匯出週誌", icon: DocumentArrowDownIcon },
  { to: "/forum", text: "進入討論區", icon: ChatBubbleLeftIcon },
  // { to: "/qa", text: "提問問題", icon: QuestionMarkCircleIcon },
];

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    title: "實習打卡",
    time: "今天 09:30 - 實習時數：4小時",
    icon: CheckCircleIcon,
    bgColor: "bg-Ghibli-blue",
    progress: 100,
    progressClass: "bg-Ghibli-blue",
  },
  {
    id: 2,
    title: "上傳作品",
    time: "昨天 15:45 - Web 應用程式原型設計",
    icon: ArrowUpTrayIcon,
    bgColor: "bg-Ghibli-yellow",
    progress: 100,
    progressClass: "bg-Ghibli-yellow",
  },
  // {
  //   id: 3,
  //   title: "討論區回覆",
  //   time: "2天前 - 回覆了「關於 UI 設計的問題」",
  //   icon: ChatBubbleLeftIcon,
  //   bgColor: "bg-Ghibli-red",
  //   progress: 100,
  //   progressClass: "bg-Ghibli-red",
  // },
  {
    id: 4,
    title: "競賽報名",
    time: "3天前 - 報名「校內網頁設計競賽」",
    icon: TrophyIcon,
    bgColor: "bg-Ghibli-green",
    progress: 50,
    progressClass: "bg-Ghibli-green",
  },
]);

// // Upcoming events
// const upcomingEvents = ref([
//   {
//     id: 1,
//     title: "週五實習週誌截止",
//     date: "2025-03-29",
//     daysRemaining: calculateDaysRemaining("2025-03-29"),
//   },
//   {
//     id: 2,
//     title: "網頁設計競賽截止",
//     date: "2025-04-05",
//     daysRemaining: calculateDaysRemaining("2025-04-05"),
//   },
//   {
//     id: 3,
//     title: "期中實習評估",
//     date: "2025-04-15",
//     daysRemaining: calculateDaysRemaining("2025-04-15"),
//   },
// ]);

// Competition rankings with default value
const rankings = ref([
  { id: 1, position: 1, name: "王小明", score: 150, isCurrentUser: false },
  { id: 2, position: 2, name: "李小華", score: 145, isCurrentUser: false },
  { id: 3, position: 3, name: "張小龍", score: 142, isCurrentUser: false },
  { id: 3, position: 3, name: "張小龍", score: 142, isCurrentUser: false },
  { id: 3, position: 3, name: "張小龍", score: 142, isCurrentUser: false },
  {
    id: 4,
    position: 5,
    name: currentUser.value.name,
    score: 135,
    isCurrentUser: true,
  },
]);

// // Bar chart options
// const rankChartOptions = ref({
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: { legend: { display: false }, tooltip: { enabled: false } },
//   scales: {
//     x: { display: false },
//     y: { display: false, max: 150 },
//   },
// });

// const getRankChartData = (rank) => {
//   // Safeguard against undefined rank or score
//   if (!rank || typeof rank.score !== 'number') {
//     return {
//       labels: ['無數據'],
//       datasets: [
//         {
//           data: [0],
//           backgroundColor: '#D1D5DB',
//           borderWidth: 0,
//         },
//       ],
//     };
//   }
//   return {
//     labels: [rank.name || '未知'],
//     datasets: [
//       {
//         data: [rank.score],
//         backgroundColor: rank.isCurrentUser ? '#3B82F6' : '#D1D5DB',
//         borderWidth: 0,
//       },
//     ],
//   };
// };

// // Calculate remaining days
// function calculateDaysRemaining(date) {
//   const today = new Date();
//   const eventDate = new Date(date);
//   const diffTime = eventDate - today;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays >= 0 ? diffDays : 0;
// }

// Intersection Observer setup
let mainContentObserver = null;

const createObserver = (targetRef, visibilityRef) => {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(([entry]) => {
    visibilityRef.value = entry.isIntersecting;
  }, observerOptions);

  if (targetRef.value) {
    observer.observe(targetRef.value);
  }
  return observer;
};

onMounted(() => {
  mainContentObserver = createObserver(mainContentRef, mainContentVisible);
});

onUnmounted(() => {
  if (mainContentObserver) {
    if (mainContentRef.value) mainContentObserver.unobserve(mainContentRef.value);
    mainContentObserver.disconnect();
  }
});
</script>

<style scoped>
/* Card styling */
.home-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.home-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>