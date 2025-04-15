<template>
    <div class="relative text-[12.375rem] font-passion tracking-wide leading-none">
        {{ displayedText }}<span
            class=""
            :class="className"
            v-show="showCursor"
        ></span>
    </div>
</template>

<script setup name="TypingAnimation">
import { ref, computed, defineProps, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        default: ''
    },
    loopDelay: { // Delay before restarting the loop
        type: Number,
        default: 2000 // ms
    },
    deleteDelay: { // Delay before starting deletion
        type: Number,
        default: 1500 // ms
    }
});

const currentIndex = ref(0);
const isDeleting = ref(false);
const showCursor = ref(true); // Control cursor visibility
let timeoutId = null;

// Use computed property for displayed text based on current index
const displayedText = computed(() => props.text.substring(0, currentIndex.value));

// Define delay ranges
const typingDelayRange = { min: 900, max: 1100 }; // Adjusted typing speed
const deletingDelayRange = { min: 80, max: 100 };

// Helper function to get random delay
const getRandomDelay = (range) => {
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

const animateText = () => {
    clearTimeout(timeoutId); // Clear previous timeout
    showCursor.value = true; // Ensure cursor is visible during animation steps

    const currentDelayRange = isDeleting.value ? deletingDelayRange : typingDelayRange;
    let delay = getRandomDelay(currentDelayRange);

    if (!isDeleting.value) {
        // Typing phase
        if (currentIndex.value < props.text.length) {
            currentIndex.value++;
            timeoutId = setTimeout(animateText, delay);
        } else {
            // Typing complete, pause before deleting
            delay = props.deleteDelay;
            timeoutId = setTimeout(() => {
                isDeleting.value = true;
                animateText(); // Start deleting
            }, delay);
        }
    } else {
        // Deleting phase
        if (currentIndex.value > 0) {
            currentIndex.value--;
            timeoutId = setTimeout(animateText, delay);
        } else {
            // Deleting complete, pause before restarting
            showCursor.value = false; // Optionally hide cursor during loop delay
            delay = props.loopDelay;
            timeoutId = setTimeout(() => {
                isDeleting.value = false;
                // currentIndex is already 0
                animateText(); // Start typing again
            }, delay);
        }
    }
};

onMounted(() => {
    animateText(); // Start the animation cycle
});

onUnmounted(() => {
    // Clear timeout on component unmount to prevent memory leaks
    clearTimeout(timeoutId);
});

</script>

<!-- No <style> block needed if using Tailwind exclusively -->
<!-- Make sure to define the 'blink' animation in your tailwind.config.js -->
<!--
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        blink: 'blink 0.7s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
-->