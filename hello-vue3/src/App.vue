<template>
  <div id="app" class="d-flex flex-column min-vh-100 bg-light text-dark">
    <Navbar />
    <main class="container py-4 flex-fill">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

/* 全站字體設定 */
#app {
  font-family: 'Noto Sans TC', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 通用樣式變更 */
body {
  background-color: #f8f9fa;
  color: #212529;
  font-size: 0.95rem;
}

/* 主區塊彈性與留白 */
main {
  flex: 1;
}

/* 導覽列美化 */
.navbar {
  background: linear-gradient(to right, #6366f1cc, #8b5cf6cc);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* nav-link 改為亮白，hover 有動態感 */
.navbar .nav-link {
  color: #ffffff !important;
  font-weight: 500;
  transition: color 0.2s ease;
}
.navbar .nav-link:hover {
  color: #ffe082 !important;
}

/* Footer 美化 */
footer {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  color: #6c757d;
  font-size: 0.9rem;
  border-top: 1px solid #dee2e6;
  padding: 1rem 0;
}
footer a {
  color: #6c757d;
}
footer a:hover {
  color: #4f46e5;
}

/* 卡片統一美感 */
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

/* 按鈕樣式升級 */
.btn-primary {
  background-color: #6366f1;
  border: none;
}
.btn-primary:hover {
  background-color: #4f46e5;
}
.btn-outline-primary {
  border-color: #6366f1;
  color: #6366f1;
}
.btn-outline-primary:hover {
  background-color: #6366f1;
  color: white;
}
</style>
