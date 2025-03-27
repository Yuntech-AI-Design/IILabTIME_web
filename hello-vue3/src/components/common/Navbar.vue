<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="Logo" height="30" class="d-inline-block align-top me-2" />
        實習管理系統
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/dashboard">
              <font-awesome-icon icon="home" /> 儀表板
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/grades">
              <font-awesome-icon icon="graduation-cap" /> 成績管理
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && isAdmin">
            <router-link class="nav-link" to="/supervision">
              <font-awesome-icon icon="briefcase" /> 實習監督
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/check-in">
              <font-awesome-icon icon="calendar-check" /> 實習打卡
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/competition">
              <font-awesome-icon icon="trophy" /> 競賽狀態
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/reports">
              <font-awesome-icon icon="file-alt" /> 報表匯出
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/forum">
              <font-awesome-icon icon="comments" /> 討論區
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/qa">
              <font-awesome-icon icon="question-circle" /> 問題詢問
            </router-link>
          </li>
        </ul>
        
        <ul class="navbar-nav">
          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">
                <font-awesome-icon icon="sign-in-alt" /> 使用 Google 登入
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user" /> {{ currentUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" to="/profile">個人資料</router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="logout">
                    <font-awesome-icon icon="sign-out-alt" /> 登出
                  </a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'MainNavbar',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    const currentUser = computed(() => store.getters['auth/currentUser'])
    const isAdmin = computed(() => {
      const user = store.getters['auth/currentUser']
      return user && user.role === 'admin'
    })
    
    const logout = async () => {
      await store.dispatch('auth/logout')
      router.push('/login')
    }
    
    return {
      isLoggedIn,
      currentUser,
      isAdmin,
      logout
    }
  }
}
</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.85);
}
.navbar-dark .navbar-nav .nav-link:hover {
  color: rgba(255, 255, 255, 1);
}
.dropdown-item:active {
  background-color: #0d6efd;
}
</style>