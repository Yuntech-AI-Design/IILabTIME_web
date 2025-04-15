<template>
    <div
        :class="`${backgroundColor}`"
        class="flex flex-row items-center justify-center h-20 w-[80%] rounded-2xl button-container"
        @mouseenter="animateText"
        @mouseleave="resetAnimation"
    >
        <router-link
            class="flex flex-row items-center justify-between h-full w-full rounded-3xl font-medium text-3xl py-[4%] px-[13%]"
            :to="routerLink"
        >
            <div class="text-container">
                <span v-for="(char, index) in buttonText.split('')" :key="index" class="char">{{
                    char
                }}</span>
            </div>
            <font-awesome-icon class="h icon" :icon="buttonIcon" />
        </router-link>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import { RouterLink } from 'vue-router';

defineProps({
    routerLink: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        default: 'login with Google',
    },
    buttonIcon: {
        type: [Array, String],
        default: () => ['fab', 'google'],
    },
    backgroundColor: {
        type: String,
        default: 'bg-blue-500',
    },
});

const animation = ref(null);

const animateText = (event) => {
    // 選取當前組件的 .char 和 .icon 元素
    const chars = event.currentTarget.querySelectorAll('.text-container .char');
    const icon = event.currentTarget.querySelector('.icon');

    if (animation.value) animation.value.pause();

    animation.value = anime({
        targets: [...chars, icon], // 將文字和圖標都作為動畫目標
        translateY: [
            { value: -10, duration: 200 },
            { value: 10, duration: 200 },
            { value: 0, duration: 300 },
        ],
        scale: [
            { value: 1, duration: 200 },
        ],
        delay: anime.stagger(50, { from: 'first' }), // 從第一個元素開始，包含圖標
        easing: 'easeOutQuad',
    });
};

const resetAnimation = (event) => {
    // 重置當前組件的 .char 和 .icon 元素
    const chars = event.currentTarget.querySelectorAll('.text-container .char');
    const icon = event.currentTarget.querySelector('.icon');

    if (animation.value) {
        animation.value.pause();
        anime({
            targets: [...chars, icon],
            translateY: 0,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad',
        });
    }
};
</script>

<style scoped>
.char {
    display: inline-block;
}
.icon {
    display: inline-block; /* 確保圖標可以應用動畫 */
}
</style>