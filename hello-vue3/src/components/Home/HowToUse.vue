<template>
    <section class="h-[110vh] relative w-full px-[10%] py-[10vh]" ref="sectionRef">
        <div class="flex flex-row items-center justify-between h-full w-full">
            <div class="w-[15%] h-full flex flex-col items-center justify-center text-8xl font-bold text-center opacity-0"
                :class="{ 'animate-fade-in-up-relative': isVisible }" style="animation-delay: 0.5s">
                <span>如</span>
                <span>何</span>
                <span>使</span>
                <span>用</span>
            </div>
            <div class="flex flex-col items-center justify-center h-full w-[80%] gap-5">
                <div :key="item.id" v-for="(item, idx) in howtouseList"
                    class="w-full min-h-[15%] max-h-[20%] flex flex-row items-center justify-center opacity-0"
                    :class="{ 'animate-fade-in-right': isVisible && idx % 2 === 0, 'animate-fade-in-left': isVisible && idx % 2 === 1 }"
                    :style="`animation-delay: ${0.8 + idx * 0.3}s`">
                    <div v-if="idx % 2 == 1" class="relative w-[20%] h-full z-0">
                        <span v-if="idx != 0"
                            class="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-0 bg-black transition-all duration-700"
                            :class="{ 'w-[50%]': isVisible }" :style="`transition-delay: ${1.3 + idx * 0.3}s`"></span>
                        <span v-if="idx != 0"
                            class="absolute left-1/2 top-[-20px] -translate-x-1/2 h-2 w-2 bg-black transition-all duration-700"
                            :class="{ 'h-[calc(50%+1.5rem)]': isVisible }"
                            :style="`transition-delay: ${1.5 + idx * 0.3}s`"></span>
                    </div>
                    <div class="w-[70%] h-full flex flex-row items-center justify-start border-4 border-solid border-stone-950 rounded-xl py-[2%] px-[1%] transition-all duration-500 z-0"
                        :class="{ 'hover:shadow-xl hover:scale-[1.02] z-30': isVisible }">
                        <div class="aspect-square w-auto h-full flex items-center justify-center p-[2.5%]">
                            <span :class="[
                                item.ball_color,
                                'transform transition-all duration-700',
                                { 'animate-pulse-slow-relative': isVisible }
                            ]" class="aspect-square relative rounded-full w-[31px]"></span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-start w-auto h-auto text-2xl font-bold text-center">
                            <div class="w-full h-auto text-start">{{ item.title }}</div>
                            <div class="w-full h-auto text-start text-opacity-0 transition-all duration-500"
                                :class="{ 'text-opacity-100': isVisible }"
                                :style="`transition-delay: ${1.1 + idx * 0.3}s`">{{ item.desc }}</div>
                        </div>
                    </div>
                    <div v-if="idx % 2 == 0" class="relative w-[20%] h-full z-10">
                        <span v-if="idx != 0"
                            class="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-0 bg-black transition-all duration-700 z-10"
                            :class="{ 'w-[50%]': isVisible }" :style="`transition-delay: ${1.3 + idx * 0.3}s`"></span>
                        <span v-if="idx != 0"
                            class="absolute left-1/2 top-[-20px] -translate-x-1/2 h-2 w-2 bg-black transition-all duration-700 z-10"
                            :class="{ 'h-[calc(50%+1.5rem)]': isVisible }"
                            :style="`transition-delay: ${1.5 + idx * 0.3}s`"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'; // Assuming you create this

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });

// How to use list data
const howtouseList = reactive([
    { id: 'htu1', ball_color: "bg-Ghibli-blue", title: '註冊與登入', desc: '使用學校學號或第三方登入，完成快速註冊，並填寫基本資料' },
    { id: 'htu2', ball_color: "bg-Ghibli-red", title: '設定實習計畫', desc: '輸入實習單位與目標，系統將智能匹配學習資源' },
    { id: 'htu3', ball_color: "bg-Ghibli-brown", title: '智能打卡記錄', desc: '透過AI技術記錄實習時間，確保準確性與效率' },
    { id: 'htu4', ball_color: "bg-Ghibli-yellow", title: '提交AI競賽成果', desc: '上傳競賽作品，獲得導師與同學的智能反饋' },
    { id: 'htu5', ball_color: "bg-Ghibli-skin", title: '生成實習報告', desc: '一鍵生成AI分析報告，展示您的實習成果' }
])
</script>

<style scoped>
/* Add component-specific styles if needed */
</style>