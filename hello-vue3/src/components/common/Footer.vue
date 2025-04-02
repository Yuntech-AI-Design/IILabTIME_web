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
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  color: #6c757d;
  font-size: 0.95rem;
  border-top: 1px solid #dee2e6;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
}

footer a {
  color: #6c757d;
  transition: all 0.2s ease;
}

footer a:hover {
  color: #4f46e5; /* indigo */
  text-decoration: underline;
}
@media (max-width: 768px) {
  footer .text-md-end {
    text-align: center !important;
    margin-top: 1rem;
  }
}

  </style>