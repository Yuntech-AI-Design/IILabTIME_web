<!-- src/components/AppNavbar.vue -->
<template>
  <nav
    class="bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-md shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" class="font-bold text-xl text-white"
              >AI專班實習管理系統</router-link
            >
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                to="/dashboard"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600"
              >
                儀錶板
              </router-link>
              <router-link
                to="/check-in"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600"
              >
                實習打卡
              </router-link>
              <router-link
                to="/profile"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600"
              >
                個人資料
              </router-link>
              <router-link
                to="/intershipform"
                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-amber-200 transition-colors duration-200"
                active-class="bg-indigo-600"
              >
                實習資料填寫
              </router-link>
            </div>
          </div>
        </div>
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-200"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                "
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          to="/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600"
        >
          儀錶板
        </router-link>
        <router-link
          to="/check-in"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600"
        >
          實習打卡
        </router-link>
        <router-link
          to="/profile"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-200 hover:bg-indigo-600"
          active-class="bg-indigo-600"
        >
          個人資料
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
};
</script>
