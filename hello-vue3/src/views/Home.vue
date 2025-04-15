<!-- Home.vue -->
<template>
  <div class="home-page bg-white font-ZMG">
    <!-- 頂部橫幅 -->
    <section class="w-full h-[58vh] pt-[8vh] px-[5%]">
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex flex-col items-start justify-between w-[75%] h-full">
          <div 
            class="text-animation text-start relative text-[12.375rem] font-passion tracking-wide leading-none">
            {{ text1 }}
          </div>
          <TypingAnimation :text="text2" className="inline-block w-[0.1em] h-[1em] bg-current ml-[0.1em] align-bottom animate-blink" />
        </div>
        <div class="flex flex-col items-center justify-center w-[25%] h-full">
          <div class="flex flex-row items-start justify-end w-full h-[60%] p-[2%]">
            <div class="flex flex-row items-center justify-start w-full h-auto p-[2%] text-2xl mt-1">
              AI專班實習專用平台 <br>
              一站式實習追蹤、管理與評估平台
            </div>
          </div>
          <div class="flex flex-col items-center justify-center w-full h-[40%]">
            <div v-for="button in buttonList" :key="button.id"
              class="flex flex-row items-center justify-center w-full h-auto p-[2%]">
              <HomeButton :routerLink="button.routerLink" :buttonText="button.buttonText"
                :buttonIcon="button.buttonIcon" :backgroundColor="button.backgroundColor" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Horizontal scroll section -->
    <section class="h-[185vh] relative pt-40">
      <div class="sticky top-0 h-full flex items-start overflow-hidden">
        <div ref="horizontalSlider" class="flex will-change-transform gap-5">
          <div v-for="(color, i) in cardColors" :key="i" class="home-card rounded-md"
            :class="[color, i % 2 === 0 ? 'w-[666px] h-[999px]' : 'w-[666px] h-[666px]']"></div>
        </div>
      </div>
    </section>

    <!-- System functional section -->
    <section class="h-[100vh] relative w-full" id="about" ref="systemFunctionalRef">
      <transition name="fade">
        <div v-show="systemFunctionSectionVisible"
          class="ball-background absolute top-0 left-0 w-full h-full overflow-x-clip">
          <span v-for="(ball, i) in balls" :key="i" class="z-10 absolute rounded-full"
            :class="[ball.bg, ball.animation]" :style="ball.style"></span>
          <span
            class="z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-Ghibli-yellow h-[672px] w-[672px]"
            :class="{ 'animate-pulse-slow-absolute': systemFunctionSectionVisible }"></span>
        </div>
      </transition>

      <div v-show="systemFunctionSectionVisible" class="z-20 absolute top-0 left-0 w-full h-full">
        <!-- Central title -->
        <div :class="{ 'animate-fade-in-up-absolute': systemFunctionSectionVisible }"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-bold opacity-0">
          系統功能
        </div>

        <!-- Left and right feature sections -->
        <div v-for="(side, sIndex) in systemSides" :key="sIndex"
          :class="`flex flex-col items-center justify-center absolute top-0 ${side.position} p-[2%] max-w-[576px] w-auto h-full`">
          <div class="flex flex-col items-center justify-between w-full h-full py-[6%]">
            <div v-for="(item, index) in side.items" :key="item.id"
              :class="{ [`${side.animation}`]: systemFunctionSectionVisible }"
              :style="`animation-delay: ${index * 0.3 + 0.5}s`"
              class="relative flex flex-col items-center justify-center w-auto gap-3 h-1/6 opacity-0">
              <div class="font-bold text-5xl text-center">{{ item.title }}</div>
              <div class="text-center text-xl">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- how to use section -->
    <section class="h-[110vh] relative w-full px-[10%] py-[10vh]" ref="howToUseSectionRef">
      <div class="flex flex-row items-center justify-between h-full w-full">
        <div class="w-[15%] h-full flex flex-col items-center justify-center text-8xl font-bold text-center opacity-0"
          :class="{ 'animate-fade-in-up-relative': howToUseSectionVisible }" style="animation-delay: 0.5s">
          <span>如</span>
          <span>何</span>
          <span>使</span>
          <span>用</span>
        </div>
        <div class="flex flex-col items-center justify-center h-full w-[80%] gap-5">
          <div :key="item.id" v-for="(item, idx) in howtouseList"
            class="w-full min-h-[15%] max-h-[20%] flex flex-row items-center justify-center opacity-0"
            :class="{ 'animate-fade-in-right': howToUseSectionVisible && idx % 2 === 0, 'animate-fade-in-left': howToUseSectionVisible && idx % 2 === 1 }"
            :style="`animation-delay: ${0.8 + idx * 0.3}s`">
            <div v-if="idx % 2 == 1" class="relative w-[20%] h-full z-0">
              <span v-if="idx != 0"
                class="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-0 bg-black transition-all duration-700"
                :class="{ 'w-[50%]': howToUseSectionVisible }" :style="`transition-delay: ${1.3 + idx * 0.3}s`"></span>
              <span v-if="idx != 0"
                class="absolute left-1/2 top-[-20px] -translate-x-1/2 h-2 w-2 bg-black transition-all duration-700"
                :class="{ 'h-[calc(50%+1.5rem)]': howToUseSectionVisible }"
                :style="`transition-delay: ${1.5 + idx * 0.3}s`"></span>
            </div>
            <div
              class="w-[70%] h-full flex flex-row items-center justify-start border-4 border-solid border-stone-950 rounded-xl py-[2%] px-[1%] transition-all duration-500 z-0"
              :class="{ 'hover:shadow-xl hover:scale-[1.02] z-30': howToUseSectionVisible }">
              <div class="aspect-square w-auto h-full flex items-center justify-center p-[2.5%]">
                <span :class="[
                  item.ball_color,
                  'transform transition-all duration-700',
                  { 'animate-pulse-slow-relative': howToUseSectionVisible }
                ]" class="aspect-square relative rounded-full w-[31px]"></span>
              </div>
              <div class="flex flex-col items-center justify-start w-auto h-auto text-2xl font-bold text-center">
                <div class="w-full h-auto text-start">{{ item.title }}</div>
                <div class="w-full h-auto text-start text-opacity-0 transition-all duration-500"
                  :class="{ 'text-opacity-100': howToUseSectionVisible }"
                  :style="`transition-delay: ${1.1 + idx * 0.3}s`">{{ item.desc }}</div>
              </div>
            </div>
            <div v-if="idx % 2 == 0" class="relative w-[20%] h-full z-10">
              <span v-if="idx != 0"
                class="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-0 bg-black transition-all duration-700 z-10"
                :class="{ 'w-[50%]': howToUseSectionVisible }" :style="`transition-delay: ${1.3 + idx * 0.3}s`"></span>
              <span v-if="idx != 0"
                class="absolute left-1/2 top-[-20px] -translate-x-1/2 h-2 w-2 bg-black transition-all duration-700 z-10"
                :class="{ 'h-[calc(50%+1.5rem)]': howToUseSectionVisible }"
                :style="`transition-delay: ${1.5 + idx * 0.3}s`"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-20 px-[10%] bg-white text-stone-950" ref="statsSectionRef">
      <div class="max-w-6xl mx-auto opacity-0" :class="{ 'animate-fade-in-up-relative': statsSectionVisible }">
      <div class="text-center mb-12">
        <h2 class="text-5xl md:text-6xl font-bold mb-4">AI專班成效</h2>
        <p class="text-xl max-w-2xl mx-auto text-gray-700">我們的系統已助力數千名AI學員提升實習成果</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div v-for="(stat, i) in stats" :key="i"
        class="text-center bg-gray-50 p-6 rounded-lg shadow-md opacity-0 transform transition-all duration-500 hover:shadow-xl hover:scale-105"
        :class="{ 'animate-fade-in-up-relative': statsSectionVisible }"
        :style="`animation-delay: ${0.5 + i * 0.2}s`">
        <h3 class="text-5xl font-bold mb-2" :class="stat.textColor">{{ stat.value }}</h3>
        <p class="text-xl font-semibold mt-2">{{ stat.title }}</p>
        <p class="text-base text-gray-600 mt-1">{{ stat.desc }}</p>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TypingAnimation from '@/components/Home/TypingAnimation.vue'
import HomeButton from '@/components/Home/HomeButton.vue'
import { ref, onMounted, onUnmounted, reactive } from 'vue'

// Basic data
const text1 = 'AI專班實習'
const text2 = '管理系統'

const buttonList = [
  { id: "2", routerLink: "/home/#about", buttonText: "關於我們", buttonIcon: ['fas', 'info-circle'], backgroundColor: "bg-Ghibli-green" },
  { id: "1", routerLink: "/login", buttonText: "Google 登入", buttonIcon: ['fab', 'google-plus'], backgroundColor: "bg-Ghibli-blue" }
]

const cardColors = [
  'bg-Ghibli-light-red', 'bg-Ghibli-yellow', 'bg-Ghibli-brown',
  'bg-Ghibli-red', 'bg-Ghibli-skin', 'bg-Ghibli-blue',
  'bg-Ghibli-green', 'bg-Ghibli-light-red', 'bg-Ghibli-yellow'
]

// System function section refs and state
const systemFunctionSectionVisible = ref(false)
const systemFunctionalRef = ref(null)

// Animated balls data
const balls = [
  { bg: 'bg-Ghibli-blue', animation: 'animate-float', style: 'top: 69%; left: 32%; height: 211px; width: 211px;' },
  { bg: 'bg-Ghibli-red', animation: 'animate-float-delay-1', style: 'top: 63%; left: 55%; height: 124px; width: 124px;' },
  { bg: 'bg-Ghibli-light-red', animation: 'animate-float-delay-2', style: 'top: 46%; left: 67.7%; height: 85px; width: 85px;' },
  { bg: 'bg-Ghibli-skin', animation: 'animate-float-delay-3', style: 'top: 16%; left: 63%; height: 85px; width: 85px;' },
  { bg: 'bg-Ghibli-green', animation: 'animate-float-delay-4', style: 'top: 0%; left: 0%; height: 323px; width: 323px;' },
  { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-1', style: 'top: -5%; left: 32%; height: 158px; width: 158px;' },
  { bg: 'bg-Ghibli-blue', animation: 'animate-float-delay-2', style: 'top: -7%; left: 70%; height: 132px; width: 132px;' },
  { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-3', style: 'top: 50%; left: 85%; height: 532px; width: 532px;' }
]

// System features data
const systemSides = [
  {
    position: 'left-1',
    animation: 'animate-fade-in-left',
    items: [
      { id: 'lsf1', title: '週誌與成果報告', desc: '自動彙整實習紀錄，生成週誌與總結報告，省時又方便。' },
      { id: 'lsf2', title: '競賽與成績管理', desc: '提交競賽資料，查看競賽成績，與同儕良性競爭。' },
      { id: 'lsf3', title: '實習監督與管理', desc: '導師可實時監督實習狀況，提供指導，保證實習品質。' }
    ]
  },
  {
    position: 'right-1',
    animation: 'animate-fade-in-right',
    items: [
      { id: 'rsf1', title: '實習打卡系統', desc: '便捷記錄實習時間，上傳實習作品，隨時掌握實習進度。' },
      { id: 'rsf2', title: '問題詢問', desc: '遇到難題？直接在平台上提問，獲得導師及同學的即時協助。' },
      { id: 'rsf3', title: '討論區', desc: '與實習同儕交流經驗，分享資源，互相學習成長。' }
    ]
  }
]

// How to use section refs and state
const howToUseSectionVisible = ref(false)
const howToUseSectionRef = ref(null)

// How to use list data
const howtouseList = reactive([
  { id: 'htu1', ball_color: "bg-Ghibli-blue", title: '註冊與登入', desc: '使用學校學號或第三方登入，完成快速註冊，並填寫基本資料' },
  { id: 'htu2', ball_color: "bg-Ghibli-red", title: '設定實習計畫', desc: '輸入實習單位與目標，系統將智能匹配學習資源' },
  { id: 'htu3', ball_color: "bg-Ghibli-brown", title: '智能打卡記錄', desc: '透過AI技術記錄實習時間，確保準確性與效率' },
  { id: 'htu4', ball_color: "bg-Ghibli-yellow", title: '提交AI競賽成果', desc: '上傳競賽作品，獲得導師與同學的智能反饋' },
  { id: 'htu5', ball_color: "bg-Ghibli-skin", title: '生成實習報告', desc: '一鍵生成AI分析報告，展示您的實習成果' }
])

const statsSectionVisible = ref(false)
const statsSectionRef = ref(null)
// Stats data
const stats = [
  { value: '500+', title: '參與人數', desc: '來自全國頂尖學校', textColor: 'text-yellow-300' },
  { value: '87%', title: '滿意度', desc: '涵蓋AI相關產業', textColor: 'text-pink-300' },
  { value: '50+', title: '實習計畫', desc: '累計AI實務經驗', textColor: 'text-blue-300' }
]

// Horizontal scroll logic
const horizontalSlider = ref(null)
const scrollData = reactive({ totalWidth: 0, visibleWidth: 0, sectionTop: 0, sectionHeight: 3000 })

function updateDimensions() {
  if (!horizontalSlider.value) return
  const section = horizontalSlider.value.closest('section')
  if (!section) return; // Ensure section exists
  scrollData.totalWidth = horizontalSlider.value.scrollWidth
  scrollData.visibleWidth = horizontalSlider.value.parentElement.clientWidth
  scrollData.sectionTop = section.offsetTop
}

function handleScroll() {
  if (!horizontalSlider.value) return
  const scrollY = window.scrollY
  // Calculate scroll percentage within the section, considering viewport height
  const scrollInSection = (scrollY - scrollData.sectionTop + window.innerHeight) / scrollData.sectionHeight
  const scrollPercentage = Math.min(Math.max(scrollInSection, 0), 1)
  // Calculate maximum translation percentage
  const maxSlide = scrollData.visibleWidth < scrollData.totalWidth
    ? ((scrollData.totalWidth - scrollData.visibleWidth) / scrollData.totalWidth) * 100
    : 0;
  // Apply easing function
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  horizontalSlider.value.style.transform = `translate3d(${-ease(scrollPercentage) * maxSlide}%, 0px, 0px)`
}

// Intersection Observer setup
let systemObserver = null;
let howToUseObserver = null;
let statsObserver = null;

const createObserver = (targetRef, visibilityRef) => {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(([entry]) => {
    visibilityRef.value = entry.isIntersecting;
    // Optional: Unobserve after first intersection if animation should only run once
    // if (entry.isIntersecting) {
    //   observer.unobserve(entry.target);
    // }
  }, observerOptions);

  if (targetRef.value) {
    observer.observe(targetRef.value);
  }
  return observer;
};

onMounted(() => {
  updateDimensions() // Initial calculation
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateDimensions)

  // Setup observers
  systemObserver = createObserver(systemFunctionalRef, systemFunctionSectionVisible);
  howToUseObserver = createObserver(howToUseSectionRef, howToUseSectionVisible);
  statsObserver = createObserver(statsSectionRef, statsSectionVisible);
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateDimensions)

  // Cleanup observers
  if (systemObserver) {
    if (systemFunctionalRef.value) systemObserver.unobserve(systemFunctionalRef.value);
    systemObserver.disconnect();
  }
  if (howToUseObserver) {
    if (howToUseSectionRef.value) howToUseObserver.unobserve(howToUseSectionRef.value);
    howToUseObserver.disconnect();
  }
  if (statsObserver) {
    if (statsSectionRef.value) statsObserver.unobserve(statsSectionRef.value);
    statsObserver.disconnect();
  }
})
</script>
