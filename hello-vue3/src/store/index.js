import { createStore } from 'vuex'
import auth from './modules/auth'
import grades from './modules/grades'
import internship from './modules/internship'
import checkIn from './modules/checkIn'
import competition from './modules/competition'
import reports from './modules/reports'
import forum from './modules/forum'
import qa from './modules/qa'

export default createStore({
  modules: {
    auth,
    grades,
    internship,
    checkIn,
    competition,
    reports,
    forum,
    qa
  },
  // 全局狀態
  state: {
    loading: false,
    error: null,
    notification: null,
    menuState: false,
    loginState: false,
  },
  getters: {
    isLoading: state => state.loading,
    getError: state => state.error,
    getNotification: state => state.notification,
    getMenuState: state => state.menuState,
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_NOTIFICATION(state, notification) {
      state.notification = notification
    },
    CLEAR_NOTIFICATION(state) {
      state.notification = null
    },
    SET_MENU_STATE(state, bool) {
      state.menuState = bool
    }
  },
  actions: {
    HandleMenuState({ commit }, bool) {
      commit('SET_MENU_STATE', bool)
    },
    setLoading({ commit }, status) {
      commit('SET_LOADING', status)
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error)
      // 5秒後自動清除錯誤
      setTimeout(() => {
        commit('CLEAR_ERROR')
      }, 5000)
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    setNotification({ commit }, notification) {
      commit('SET_NOTIFICATION', notification)
      // 5秒後自動清除通知
      setTimeout(() => {
        commit('CLEAR_NOTIFICATION')
      }, 5000)
    },
    clearNotification({ commit }) {
      commit('CLEAR_NOTIFICATION')
    }
  }
})