import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 創建 axios 實例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 響應攔截器
api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    
    // 如果是 401 未授權錯誤並且不是刷新令牌請求，則嘗試刷新令牌
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // 嘗試刷新令牌
        await store.dispatch('auth/refreshToken')
        // 更新令牌並重新嘗試原始請求
        const token = localStorage.getItem('token')
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // 如果刷新令牌失敗，則登出並導航到登錄頁面
        store.dispatch('auth/logout')
        router.push('/login')
        return Promise.reject(refreshError)
      }
    }
    
    // 其他類型的錯誤，直接返回
    return Promise.reject(error)
  }
)

export default api