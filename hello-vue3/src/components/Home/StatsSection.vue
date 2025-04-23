<template>
    <section class="py-20 px-[10%] bg-white text-stone-950" ref="sectionRef">
        <div class="max-w-6xl mx-auto opacity-0" :class="{ 'animate-fade-in-up-relative': isVisible }">
            <div class="text-center mb-12">
                <h2 class="text-5xl md:text-6xl font-bold mb-4">AI專班成效</h2>
                <p class="text-xl max-w-2xl mx-auto text-gray-700">我們的系統已助力數千名AI學員提升實習成果</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div v-for="(stat, i) in stats" :key="i"
                    class="text-center bg-gray-50 p-6 rounded-lg shadow-md opacity-0 transform transition-all duration-500 hover:shadow-xl hover:scale-105"
                    :class="{ 'animate-fade-in-up-relative': isVisible }" :style="`animation-delay: ${0.5 + i * 0.2}s`">
                    <h3 class="text-5xl font-bold mb-2" :class="stat.textColor">{{ displayValues[i] }}</h3>
                    <p class="text-xl font-semibold mt-2">{{ stat.title }}</p>
                    <p class="text-base text-gray-600 mt-1">{{ stat.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.9 });

// Stats data
const stats = [
    { value: 500, suffix: '+', title: '參與人數', desc: '來自全國頂尖學校', textColor: 'text-yellow-300' },
    { value: 87, suffix: '%', title: '滿意度', desc: '涵蓋AI相關產業', textColor: 'text-pink-300' },
    { value: 50, suffix: '+', title: '實習計畫', desc: '累計AI實務經驗', textColor: 'text-blue-300' }
]

// 用於顯示動畫數字
const displayValues = ref(stats.map(() => '0'))

function animateValue(idx, start, end, duration, suffix = '') {
    const startTime = performance.now()
    function update(now) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = Math.floor(start + (end - start) * progress)
        displayValues.value[idx] = current + suffix
        if (progress < 1) {
            requestAnimationFrame(update)
        } else {
            displayValues.value[idx] = end + suffix
        }
    }
    requestAnimationFrame(update)
}

watch(isVisible, (visible) => {
    if (visible) {
        stats.forEach((stat, idx) => {
            animateValue(idx, 0, stat.value, 4200, stat.suffix || '')
        })
    }
})
</script>