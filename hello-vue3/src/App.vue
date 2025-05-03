<!-- App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen bg-white text-gray-900">
    <app-navbar />
    <main class="w-full mx-auto flex-grow">
      <LoadingSpinner v-if="isLoading" />
      <router-view v-if="!isLoading" />
    </main>
    <app-footer />
  </div>
</template>

<script setup name="App">
import { useStore } from 'vuex';
import { computed } from 'vue';
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const store = useStore()
const isLoading = computed(() => store.getters.isLoading)
</script>

<style>
#app {
  font-family: 'Noto Sans TC', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 0.95rem;
}
</style>