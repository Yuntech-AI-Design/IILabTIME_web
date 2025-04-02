<template>
  <div class="login-page min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-blue-600 text-white py-4 px-6">
        <h4 class="text-lg font-semibold">登入系統</h4>
      </div>
      <div class="p-6">
        <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">
          {{ error }}
        </div>

        <div class="text-center mb-6">
          <img src="@/assets/logo.png" alt="Logo" class="h-20 mx-auto mb-3" />
          <h5 class="text-xl font-semibold">實習管理系統</h5>
          <p class="text-gray-500 text-sm">請使用您的 Google 帳號登入系統</p>
        </div>

        <button
          @click="handleGoogleLogin"
          class="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
            />
          </svg>
          使用 Google 帳號登入
        </button>

        <p class="text-center text-sm text-gray-500 mt-6">
          登入即表示您同意我們的
          <a href="#" class="text-blue-600 underline" @click.prevent="showTerms"
            >服務條款</a
          >
          和
          <a href="#" class="text-blue-600 underline" @click.prevent="showPrivacy"
            >隱私政策</a
          >
        </p>

        <div v-if="loading" class="text-center mt-6">
          <div class="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="mt-2 text-gray-500">正在處理您的登入請求，請稍候...</p>
        </div>
      </div>
    </div>

    <!-- Tailwind Modal - 服務條款 -->
    <div v-if="showTermsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
        <h5 class="text-lg font-semibold mb-2">服務條款</h5>
        <p class="text-sm text-gray-700">
          歡迎使用實習管理系統！以下條款規定了您使用本系統的權利和限制。
        </p>
        <button class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" @click="closeTerms">
          關閉
        </button>
      </div>
    </div>

    <!-- Tailwind Modal - 隱私政策 -->
    <div v-if="showPrivacyModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
        <h5 class="text-lg font-semibold mb-2">隱私政策</h5>
        <p class="text-sm text-gray-700">
          本系統會收集您的基本資料以提供服務。我們重視您的隱私，並將嚴格保護您的個人資訊。
        </p>
        <button class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" @click="closePrivacy">
          關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const showTermsModal = ref(false);
    const showPrivacyModal = ref(false);

    const loading = computed(() => store.getters["isLoading"]);
    const error = computed(() => store.getters["getError"]);

    onMounted(() => {
      loadGoogleAPI();
    });

    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initGoogleButton;
    };

    const initGoogleButton = () => {
      window.google?.accounts.id.initialize({
        client_id:
          "582345753246-7t608asp5rp7dvcmfk4fv6b06p8g7gt7.apps.googleusercontent.com",
        callback: handleGoogleCallback,
      });
    };

    const handleGoogleCallback = async (response) => {
      try {
        await store.dispatch("auth/googleLogin", response.credential);
        const redirectPath = route.query.redirect || "/dashboard";
        router.push(redirectPath);
      } catch (error) {
        console.error("Google 登入失敗:", error);
      }
    };

    const handleGoogleLogin = () => {
      const googleConfig = {
        client_id:
          "582345753246-7t608asp5rp7dvcmfk4fv6b06p8g7gt7.apps.googleusercontent.com",
        scope: "email profile",
        prompt: "select_account",
      };

      window.open(
        `https://accounts.google.com/o/oauth2/auth?client_id=${
          googleConfig.client_id
        }&redirect_uri=${encodeURIComponent(
          window.location.origin + "/auth/google/callback"
        )}&response_type=code&scope=${googleConfig.scope}&prompt=${
          googleConfig.prompt
        }`,
        "google-login",
        "width=500,height=600"
      );
    };

    const showTerms = () => {
      showTermsModal.value = true;
    };

    const showPrivacy = () => {
      showPrivacyModal.value = true;
    };

    const closeTerms = () => {
      showTermsModal.value = false;
    };

    const closePrivacy = () => {
      showPrivacyModal.value = false;
    };

    return {
      loading,
      error,
      handleGoogleLogin,
      showTerms,
      showPrivacy,
      closeTerms,
      closePrivacy,
      showTermsModal,
      showPrivacyModal,
    };
  },
};
</script>

<style scoped>
/* No custom styles needed – all handled via Tailwind */
</style>
