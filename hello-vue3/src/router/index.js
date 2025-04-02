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
    meta: { requiresAuth: false }
  },
  {
    path: '/grades',
    name: 'GradeManagement',
    component: GradeManagement,
    meta: { requiresAuth: false }
  },
  {
    path: '/supervision',
    name: 'InternshipSupervision',
    component: InternshipSupervision,
    meta: { requiresAuth: false, adminOnly: false }
  },
  {
    path: '/check-in',
    name: 'CheckIn',
    component: CheckIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/competition',
    name: 'Competition',
    component: Competition,
    meta: { requiresAuth: false }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: false }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum,
    meta: { requiresAuth: false}
  },
  {
    path: '/qa',
    name: 'QA',
    component: QA,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 每次導航時滾動到頁面頂部
    return { top: 0 }
  }
})

// 導航守衛
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = store.getters['auth/isLoggedIn']
//   const isAdmin = store.getters['auth/isAdmin']
  
//   // 需要登入的路由
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isLoggedIn) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else if (to.matched.some(record => record.meta.adminOnly) && !isAdmin) {
//       // 僅管理員可訪問
//       next({ path: '/dashboard' })
//     } else {
//       next()
//     }
//   }
//   // 僅訪客可見的路由（如登入頁）
//   else if (to.matched.some(record => record.meta.guestOnly) && isLoggedIn) {
//     next({ path: '/dashboard' })
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV === 'development') {
    next(); // ✅ 跳過登入檢查
  } else {
    const isLoggedIn = store.getters['auth/isLoggedIn']
    const isAdmin = store.getters['auth/isAdmin']

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLoggedIn) {
        next({ path: '/login', query: { redirect: to.fullPath } })
      } else if (to.matched.some(record => record.meta.adminOnly) && !isAdmin) {
        next({ path: '/dashboard' })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.guestOnly) && isLoggedIn) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  }
});
// 在開發模式下跳過登入檢查

export default router