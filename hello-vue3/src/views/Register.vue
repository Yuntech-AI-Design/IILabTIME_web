<template>
    <div class="register-page">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">註冊帳號</h4>
            </div>
            <div class="card-body">
              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>
              
              <div class="text-center mb-4">
                <img src="@/assets/logo.png" alt="Logo" height="80" class="mb-3">
                <h5>實習管理系統</h5>
                <p class="text-muted">請使用您的Google帳號註冊系統</p>
              </div>
              
              <div class="my-4">
                <div class="alert alert-info" role="alert">
                  <i class="fas fa-info-circle me-2"></i>
                  <strong>注意:</strong> 本系統僅接受使用Google帳號註冊。註冊後，您將需要填寫額外的學生資訊。
                </div>
              </div>
              
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-lg btn-danger d-flex justify-content-center align-items-center" @click="handleGoogleLogin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-google me-2" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                  </svg>
                  使用 Google 帳號註冊
                </button>
              </div>
              
              <div class="mt-4 text-center">
                <p class="text-muted">註冊即表示您同意我們的<a href="#" @click.prevent="showTerms">服務條款</a>和<a href="#" @click.prevent="showPrivacy">隱私政策</a></p>
              </div>
              
              <div class="mt-3 text-center">
                已經有帳號？ <router-link to="/login">立即登入</router-link>
              </div>
              
              <div v-if="loading" class="text-center mt-3">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">處理中...</span>
                </div>
                <p class="mt-2">正在處理您的註冊請求，請稍候...</p>
              </div>
            </div>
          </div>
          
          <!-- Google登入後的額外資料表單 -->
          <div v-if="showAdditionalInfo" class="card shadow mt-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">補充資料</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitAdditionalInfo">
                <div class="mb-3">
                  <label for="studentId" class="form-label">學號 <span class="text-danger">*</span></label>
                  <input 
                    v-model="additionalInfo.studentId"
                    type="text" 
                    class="form-control" 
                    id="studentId" 
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="department" class="form-label">科系 <span class="text-danger">*</span></label>
                  <input 
                    v-model="additionalInfo.department"
                    type="text" 
                    class="form-control" 
                    id="department" 
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="phone" class="form-label">電話號碼 <span class="text-danger">*</span></label>
                  <input 
                    v-model="additionalInfo.phone"
                    type="tel" 
                    class="form-control" 
                    id="phone" 
                    required
                  >
                  <div class="form-text">請輸入有效的台灣手機號碼 (例如: 0912345678)</div>
                </div>
                
                <div class="mb-3 form-check">
                  <input 
                    v-model="additionalInfo.agreeTerms" 
                    type="checkbox" 
                    class="form-check-input" 
                    id="agreeTerms" 
                    required
                  >
                  <label class="form-check-label" for="agreeTerms">
                    我同意所有的<a href="#" @click.prevent="showTerms">服務條款</a>和<a href="#" @click.prevent="showPrivacy">隱私政策</a>
                  </label>
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="additionalInfoLoading">
                    <span v-if="additionalInfoLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {{ additionalInfoLoading ? '提交中...' : '完成註冊' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 服務條款彈窗 -->
      <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true" ref="termsModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="termsModalLabel">服務條款</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h6>使用條款</h6>
              <p>歡迎使用實習管理系統！以下條款規定了您使用本系統的權利和限制。</p>
              <!-- 此處添加更多條款內容 -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 隱私政策彈窗 -->
      <div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true" ref="privacyModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="privacyModalLabel">隱私政策</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h6>個人資料收集與使用</h6>
              <p>本系統會收集您的基本資料以提供服務。我們重視您的隱私，並將嚴格保護您的個人資訊。</p>
              <!-- 此處添加更多隱私政策內容 -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { Modal } from 'bootstrap'
  
  export default {
    name: 'Register',
    setup() {
      const store = useStore()
      const router = useRouter()
      
      const termsModal = ref(null)
      const privacyModal = ref(null)
      
      const user = ref({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        department: '',
        phone: '',
        agreeTerms: false
      })
      
      const loading = computed(() => store.getters['isLoading'])
      const error = computed(() => store.getters['getError'])
      const submitted = ref(false)
      
      // 表單驗證計算屬性
      const validEmail = computed(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(user.value.email)
      })
      
      const validPassword = computed(() => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        return passwordRegex.test(user.value.password)
      })
      
      const passwordsMatch = computed(() => {
        return user.value.password === user.value.confirmPassword
      })
      
      const validPhone = computed(() => {
        const phoneRegex = /^09\d{8}$/ // 台灣手機號碼格式
        return phoneRegex.test(user.value.phone)
      })
      
      onMounted(() => {
        // 初始化 Bootstrap Modal
        if (termsModal.value) {
          termsModal.value = new Modal(document.getElementById('termsModal'))
        }
        
        if (privacyModal.value) {
          privacyModal.value = new Modal(document.getElementById('privacyModal'))
        }
        
        // 載入 Google API
        loadGoogleAPI()
      })
      
      const loadGoogleAPI = () => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        
        script.onload = initGoogleButton
      }
      
      const initGoogleButton = () => {
        window.google?.accounts.id.initialize({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback
        })
      }
      
      const handleGoogleCallback = async (response) => {
        try {
          await store.dispatch('auth/googleLogin', response.credential)
          router.push('/dashboard')
        } catch (error) {
          console.error('Google 登入失敗:', error)
        }
      }
      
      const handleGoogleLogin = () => {
        window.google?.accounts.id.prompt()
      }
      
      const showTerms = () => {
        termsModal.value.show()
      }
      
      const showPrivacy = () => {
        privacyModal.value.show()
      }
      
      const handleRegister = async () => {
        submitted.value = true
        
        // 表單驗證
        if (!user.value.name || !validEmail.value || !validPassword.value || 
            !passwordsMatch.value || !user.value.studentId || 
            !user.value.department || !validPhone.value || !user.value.agreeTerms) {
          return
        }
        
        // 準備要發送的用戶數據
        const userData = {
          name: user.value.name,
          email: user.value.email,
          password: user.value.password,
          password_confirmation: user.value.confirmPassword,
          student_id: user.value.studentId,
          department: user.value.department,
          phone: user.value.phone
        }
        
        try {
          await store.dispatch('auth/register', userData)
          router.push('/login')
        } catch (error) {
          console.error('註冊失敗:', error)
        }
      }
      
      return {
        user,
        loading,
        error,
        submitted,
        validEmail,
        validPassword,
        passwordsMatch,
        validPhone,
        termsModal,
        privacyModal,
        handleRegister,
        handleGoogleLogin,
        showTerms,
        showPrivacy
      }
    }
  }
  </script>
  
  <style scoped>
  .register-page {
    padding: 2rem 0;
  }
  .card {
    border: none;
    border-radius: 0.5rem;
  }
  .card-header {
    border-radius: 0.5rem 0.5rem 0 0 !important;
  }
  </style>