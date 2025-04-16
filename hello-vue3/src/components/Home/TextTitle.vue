<template>
          <div 
            class="text-animation text-start relative text-[12.375rem] font-passion tracking-wide leading-none">
            {{ text }}
          </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    text: {
        type: String,
        required: true,
    },
})
</script>