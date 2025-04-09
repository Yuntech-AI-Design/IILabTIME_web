<!-- App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100 text-gray-900">
    <app-navbar />
    <main class="container mx-auto py-4 flex-grow">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  }
}
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