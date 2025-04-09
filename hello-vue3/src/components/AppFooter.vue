<!-- src/components/AppFooter.vue -->
<template>
    <footer class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-sm border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4 flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p>© 2025 AI專班實習管理系統。版權所有。</p>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-200">隱私政策</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-200">使用條款</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-200">聯絡我們</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter' // 確保使用 'AppFooter' 而不是 'Footer'
  }
  </script>