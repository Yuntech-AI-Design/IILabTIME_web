/* eslint-disable vue/multi-word-component-names */

<template>
    <footer class="bg-light py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0">© {{ currentYear }} 實習管理系統. 保留所有權利.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="text-decoration-none me-3">使用條款</a>
            <a href="#" class="text-decoration-none me-3">隱私政策</a>
            <a href="#" class="text-decoration-none">聯絡我們</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'PageFooter',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    color: #495057;
  }
  footer a {
    color: #495057;
  }
  footer a:hover {
    color: #0d6efd;
  }
  </style>