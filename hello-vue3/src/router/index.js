import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// 首頁和身份驗證相關頁面
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

// 懶加載其他頁面
const Dashboard = () => import('../views/Dashboard.vue')
const GradeManagement = () => import('../views/GradeManagement.vue')
const InternshipSupervision = () => import('../views/InternshipSupervision.vue')
const CheckIn = () => import('../views/CheckIn.vue')
const Competition = () => import('../views/Competition.vue')
const Reports = () => import('../views/Reports.vue')
const Forum = () => import('../views/Forum.vue')
const QA = () => import('../views/QA.vue')
const Profile = () => import('../views/Profile.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/grades',
    name: 'GradeManagement',
    component: GradeManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/supervision',
    name: 'InternshipSupervision',
    component: InternshipSupervision,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: '/check-in',
    name: 'CheckIn',
    component: CheckIn,
    meta: { requiresAuth: true }
  },
  {
    path: '/competition',
    name: 'Competition',
    component: Competition,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum,
    meta: { requiresAuth: true }
  },
  {
    path: '/qa',
    name: 'QA',
    component: QA,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 每次導航時滾動到頁面頂部
    return { top: 0 }
  }
})

// 導航守衛
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn']
  const isAdmin = store.getters['auth/isAdmin']
  
  // 需要登入的路由
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.adminOnly) && !isAdmin) {
      // 僅管理員可訪問
      next({ path: '/dashboard' })
    } else {
      next()
    }
  }
  // 僅訪客可見的路由（如登入頁）
  else if (to.matched.some(record => record.meta.guestOnly) && isLoggedIn) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router