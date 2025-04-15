<template>
    <div class="flex items-center justify-center w-full h-full text-center p-10">
        <router-link :to="router_path" class="font-bold" @click="HandleToggleMenu">{{ router_name
            }}</router-link>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

defineProps({
    router_path: {
        type: String,
        required: true
    },
    router_name: {
        type: String,
        required: true
    }
});

const store = useStore(); // Access the Vuex store
const HandleToggleMenu = () => {
    store.dispatch("HandleMenuState", false); // Dispatch the action to toggle the menu state
};
</script>