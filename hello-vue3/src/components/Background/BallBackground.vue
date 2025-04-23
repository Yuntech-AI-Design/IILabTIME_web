<template>
    <!-- 浮動圓球背景 -->
    <span v-for="(ball, i) in balls" :key="i" class="z-0 absolute rounded-full" :class="[ball.bg, ball.animation]"
        :style="ball.style"></span>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps({
    balls: {
        type: Array,
        default: () => [
            { bg: 'bg-Ghibli-blue', animation: 'animate-float', style: 'top: 69%; left: 32%; height: 211px; width: 211px;' },
            { bg: 'bg-Ghibli-red', animation: 'animate-float-delay-1', style: 'top: 63%; left: 55%; height: 124px; width: 124px;' },
            { bg: 'bg-Ghibli-light-red', animation: 'animate-float-delay-2', style: 'top: 46%; left: 67.7%; height: 85px; width: 85px;' },
            { bg: 'bg-Ghibli-skin', animation: 'animate-float-delay-3', style: 'top: 16%; left: 63%; height: 85px; width: 85px;' },
            { bg: 'bg-Ghibli-green', animation: 'animate-float-delay-4', style: 'top: 0%; left: 0%; height: 323px; width: 323px;' },
            { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-1', style: 'top: -5%; left: 32%; height: 158px; width: 158px;' },
            { bg: 'bg-Ghibli-blue', animation: 'animate-float-delay-2', style: 'top: -7%; left: 70%; height: 132px; width: 132px;' },
            { bg: 'bg-Ghibli-brown', animation: 'animate-float-delay-3', style: 'top: 50%; left: 85%; height: 532px; width: 532px;' }
        ],
    },
    random: {
        type: Boolean,
        default: false,
    },
    randomColor:{
        type: Boolean,
        default: false,
    }
})

const colorList = [
    'bg-Ghibli-blue',
    'bg-Ghibli-red',
    'bg-Ghibli-light-red',
    'bg-Ghibli-skin',
    'bg-Ghibli-green',
    'bg-Ghibli-brown',
    'bg-Ghibli-yellow',
];

const balls = computed(() => {
    if (props.random) {
        // const randomTop = Math.random() * 100
        // const randomLeft = Math.random() * 100
        return props.balls.map((ball, idx) => {
            const randomSize = Math.random() * 300 + 50;
            const randomColor = idx && props.randomColor ? colorList[idx] : undefined;
            return {
                ...ball,
                bg: randomColor ?? ball.bg,
                style: `top: ${Math.random() * 70}%; left: ${Math.random() * 100}%; height: ${randomSize}px; width: ${randomSize}px;`
            };
        });
    }
    return props.balls;
});

</script>