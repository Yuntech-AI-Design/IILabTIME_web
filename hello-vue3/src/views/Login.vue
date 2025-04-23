<template>
  <div class="login-page bg-white font-ZMG min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white border-4 border-stone-950 rounded-xl shadow-xl overflow-hidden relative z-10">
      <div class="py-6 px-8 border-b-4 border-stone-950">
        <h4 class="text-3xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
            class="bi bi-person-circle mr-3 text-Ghibli-yellow" viewBox="0 0 16 16">
            <path d="M11 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 1 0 0 14A7 7 0 0 0 8 1z" />
          </svg>
          登入系統
        </h4>
      </div>
      <div class="p-8">
        <div v-if="error"
          class="bg-Ghibli-light-red text-Ghibli-red border-2 border-Ghibli-red p-4 rounded-xl mb-6 font-semibold text-center">
          {{ error }}
        </div>

        <div class="text-center mb-8">
          <img src="@/assets/logo.png" alt="Logo" class="h-24 mx-auto mb-4 drop-shadow-lg" />
          <h5 class="text-2xl font-bold text-stone-950 mb-1">實習管理系統</h5>
          <p class=" text-base">請使用您的 Google 帳號登入系統</p>
        </div>

        <button v-allCharBounce @click="handleGoogleLogin"
          class="w-full bg-Ghibli-red hover:bg-Ghibli-yellow hover:text-Ghibli-red text-xl font-bold py-4 rounded-xl flex items-center justify-center gap-3  shadow-lg transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-google"
            viewBox="0 0 16 16">
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          使用 Google 帳號登入
        </button>

        <p class="text-center text-base mt-8">
          登入即表示您同意我們的
          <a href="#" class="text-Ghibli-blue underline font-semibold" @click.prevent="showTerms">服務條款</a>
          和
          <a href="#" class="text-Ghibli-blue underline font-semibold" @click.prevent="showPrivacy">隱私政策</a>
        </p>

        <div v-if="loading" class="text-center mt-8">
          <div class="w-8 h-8 border-4 border-Ghibli-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="mt-3 text-Ghibli-brown">正在處理您的登入請求，請稍候...</p>
        </div>
      </div>
    </div>

    <!-- Ball background -->
    <div class="absolute inset-0 w-full h-full overflow-x-clip z-0 pointer-events-none">
      <span class="absolute bg-Ghibli-blue rounded-full opacity-30"
        style="top: 10%; left: 5%; width: 180px; height: 180px;"></span>
      <span class="absolute bg-Ghibli-yellow rounded-full opacity-20"
        style="top: 60%; left: 70%; width: 220px; height: 220px;"></span>
      <span class="absolute bg-Ghibli-red rounded-full opacity-20"
        style="top: 80%; left: 20%; width: 120px; height: 120px;"></span>
      <span class="absolute bg-Ghibli-green rounded-full opacity-20"
        style="top: 30%; left: 80%; width: 90px; height: 90px;"></span>
    </div>

    <!-- Modal - 服務條款 -->
    <div v-if="showTermsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white border-4 border-stone-950 p-8 rounded-2xl max-w-lg w-full shadow-2xl">
        <h5 class="text-2xl font-bold mb-4 text-Ghibli-blue">服務條款</h5>
        <p class="text-base text-stone-950">
          歡迎使用實習管理系統！以下條款規定了您使用本系統的權利和限制。
        </p>
        <button
          class="mt-8 bg-Ghibli-yellow hover:bg-Ghibli-blue hover:text-white text-Ghibli-brown font-bold px-6 py-2 rounded-xl border-2 border-stone-950 transition-all duration-200"
          @click="closeTerms">
          關閉
        </button>
      </div>
    </div>

    <!-- Modal - 隱私政策 -->
    <div v-if="showPrivacyModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white border-4 border-stone-950 p-8 rounded-2xl max-w-lg w-full shadow-2xl">
        <h5 class="text-2xl font-bold mb-4 text-Ghibli-blue">隱私政策</h5>
        <p class="text-base text-stone-950">
          本系統會收集您的基本資料以提供服務。我們重視您的隱私，並將嚴格保護您的個人資訊。
        </p>
        <button
          class="mt-8 bg-Ghibli-yellow hover:bg-Ghibli-blue hover:text-white text-Ghibli-brown font-bold px-6 py-2 rounded-xl border-2 border-stone-950 transition-all duration-200"
          @click="closePrivacy">
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
/* Ghibli custom colors (for reference, should be defined in Tailwind config)
.bg-Ghibli-blue { background-color: #3B82F6; }
.bg-Ghibli-yellow { background-color: #E4B584; }
.bg-Ghibli-red { background-color: #E57373; }
.bg-Ghibli-green { background-color: #81C784; }
.bg-Ghibli-brown { background-color: #64544C; }
.bg-Ghibli-light-red { background-color: #FDE8E8; }
.text-Ghibli-blue { color: #3B82F6; }
.text-Ghibli-yellow { color: #E4B584; }
.text-Ghibli-red { color: #E57373; }
.text-Ghibli-green { color: #81C784; }
.text-Ghibli-brown { color: #64544C; }
.text-Ghibli-light-red { color: #FDE8E8; }
.font-ZMG { font-family: 'Zen Maru Gothic', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif; }
*/
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}
</style>
