<template>
    <section class="h-[100vh] relative w-full" id="about" ref="sectionRef">
        <transition name="fade">
            <div v-show="isVisible" class="ball-background absolute top-0 left-0 w-full h-full overflow-x-clip">
                <span v-for="(ball, i) in balls" :key="i" class="z-10 absolute rounded-full"
                    :class="[ball.bg, ball.animation]" :style="ball.style"></span>
                <span
                    class="z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-Ghibli-yellow h-[672px] w-[672px]"
                    :class="{ 'animate-pulse-slow-absolute': isVisible }"></span>
            </div>
        </transition>

        <div v-show="isVisible" class="z-20 absolute top-0 left-0 w-full h-full">
            <!-- Central title -->
            <div :class="{ 'animate-fade-in-up-absolute': isVisible }"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-bold opacity-0">
                系統功能
            </div>

            <!-- Left and right feature sections -->
            <div v-for="(side, sIndex) in systemSides" :key="sIndex"
                :class="`flex flex-col items-center justify-center absolute top-0 ${side.position} p-[2%] max-w-[576px] w-auto h-full`">
                <div class="flex flex-col items-center justify-between w-full h-full py-[6%]">
                    <div v-for="(item, index) in side.items" :key="item.id"
                        :class="{ [`${side.animation}`]: isVisible }" :style="`animation-delay: ${index * 0.3 + 0.5}s`"
                        class="relative flex flex-col items-center justify-center w-auto gap-3 h-1/6 opacity-0">
                        <div class="font-bold text-5xl text-center">{{ item.title }}</div>
                        <div class="text-center text-xl">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'; // Assuming you create this

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });

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
</script>

<style scoped>
/* Add component-specific styles if needed */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Ensure animation classes are defined globally or here */
</style>