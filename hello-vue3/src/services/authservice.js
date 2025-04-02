import api from './api'
/* eslint-disable no-unused-vars */
class AuthService {
  // Google 登入
  googleLogin(credential) {
    return api.post('/auth/google-login', {
      credential
    })
  }
  
  // 使用Google註冊
  registerWithGoogle(userData) {
    return api.post('/auth/google-register', userData)
  }
  
  // 登出
  logout() {
    // 可以做後端登出請求，取決於您的後端實現
    // return api.post('/auth/logout')
  }
  
  // 刷新令牌
  refreshToken() {
    return api.post('/auth/refresh-token')
  }
  
  // 更新用戶個人資料
  updateProfile(userData) {
    return api.put('/auth/profile', userData)
  }
  
  // 獲取當前用戶資料
  getCurrentUser() {
    return api.get('/auth/me')
  }
  
  // 忘記密碼
  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email })
  }
  
  // 重設密碼
  resetPassword(token, password, password_confirmation) {
    return api.post('/auth/reset-password', {
      token,
      password,
      password_confirmation
    })
  }
}
/* eslint-disable no-unused-vars */