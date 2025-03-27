import AuthService from '@/services/authservice'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export default {
  namespaced: true,
  state: initialState,
  getters: {
    isLoggedIn: state => state.status.loggedIn,
    currentUser: state => state.user,
    isAdmin: state => state.user && state.user.role === 'admin',
    authStatus: state => state.status
  },
  mutations: {
    LOGIN_SUCCESS(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    LOGIN_FAILURE(state) {
      state.status.loggedIn = false
      state.user = null
    },
    LOGOUT(state) {
      state.status.loggedIn = false
      state.user = null
    },
    REGISTER_SUCCESS(state) {
      state.status.loggedIn = false
    },
    REGISTER_FAILURE(state) {
      state.status.loggedIn = false
    },
    UPDATE_USER_PROFILE(state, user) {
      state.user = { ...state.user, ...user }
    }
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      try {
        dispatch('setLoading', true, { root: true })
        const response = await AuthService.login(email, password)
        const user = response.data.user
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', response.data.token)
        commit('LOGIN_SUCCESS', user)
        return Promise.resolve(user)
      } catch (error) {
        commit('LOGIN_FAILURE')
        dispatch('setError', error.response?.data?.message || '登入失敗，請檢查您的憑證', { root: true })
        return Promise.reject(error)
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    
    async googleLogin({ commit, dispatch }, token) {
      try {
        dispatch('setLoading', true, { root: true })
        const response = await AuthService.googleLogin(token)
        const user = response.data.user
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', response.data.token)
        commit('LOGIN_SUCCESS', user)
        return Promise.resolve(user)
      } catch (error) {
        commit('LOGIN_FAILURE')
        dispatch('setError', error.response?.data?.message || 'Google 登入失敗', { root: true })
        return Promise.reject(error)
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    
    async registerWithGoogle({ dispatch }, userData) {
      try {
        dispatch('setLoading', true, { root: true })
        const response = await AuthService.registerWithGoogle(userData)
        dispatch('setNotification', '註冊成功！', { root: true })
        return Promise.resolve(response.data)
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '使用Google註冊失敗', { root: true })
        return Promise.reject(error)
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    
    logout({ commit }) {
      AuthService.logout()
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      commit('LOGOUT')
    },
    
    async register({ commit, dispatch }, user) {
      try {
        dispatch('setLoading', true, { root: true })
        await AuthService.register(user)
        commit('REGISTER_SUCCESS')
        dispatch('setNotification', '註冊成功！請立即登入。', { root: true })
        return Promise.resolve()
      } catch (error) {
        commit('REGISTER_FAILURE')
        dispatch('setError', error.response?.data?.message || '註冊失敗，請再試一次', { root: true })
        return Promise.reject(error)
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    
    async updateProfile({ commit, dispatch }, userData) {
      try {
        dispatch('setLoading', true, { root: true })
        const response = await AuthService.updateProfile(userData)
        const updatedUser = response.data.user
        localStorage.setItem('user', JSON.stringify(updatedUser))
        commit('UPDATE_USER_PROFILE', updatedUser)
        dispatch('setNotification', '個人資料已更新！', { root: true })
        return Promise.resolve(updatedUser)
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '更新個人資料失敗', { root: true })
        return Promise.reject(error)
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    
    // 刷新令牌
    async refreshToken({ commit }) {
      try {
        const response = await AuthService.refreshToken()
        localStorage.setItem('token', response.data.token)
        return Promise.resolve(response.data)
      } catch (error) {
        commit('LOGOUT')
        return Promise.reject(error)
      }
    }
  }
}