<template>
  <div class="login-page">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">登入系統</h4>
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>

            <div class="text-center mb-4">
              <img
                src="@/assets/logo.png"
                alt="Logo"
                height="80"
                class="mb-3"
              />
              <h5>實習管理系統</h5>
              <p class="text-muted">請使用您的Google帳號登入系統</p>
            </div>

            <div class="d-grid gap-2">
              <button
                type="button"
                class="btn btn-lg btn-danger d-flex justify-content-center align-items-center"
                @click="handleGoogleLogin"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-google me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                  />
                </svg>
                使用 Google 帳號登入
              </button>
            </div>

            <div class="mt-4 text-center">
              <p class="text-muted">
                登入即表示您同意我們的<a href="#" @click.prevent="showTerms"
                  >服務條款</a
                >和<a href="#" @click.prevent="showPrivacy">隱私政策</a>
              </p>
            </div>

            <div v-if="loading" class="text-center mt-3">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">登入中...</span>
              </div>
              <p class="mt-2">正在處理您的登入請求，請稍候...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服務條款彈窗 -->
    <div
      class="modal fade"
      id="termsModal"
      tabindex="-1"
      aria-labelledby="termsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="termsModalLabel">服務條款</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>使用條款</h6>
            <p>
              歡迎使用實習管理系統！以下條款規定了您使用本系統的權利和限制。
            </p>
            <!-- 此處添加更多條款內容 -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 隱私政策彈窗 -->
    <div
      class="modal fade"
      id="privacyModal"
      tabindex="-1"
      aria-labelledby="privacyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="privacyModalLabel">隱私政策</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6>個人資料收集與使用</h6>
            <p>
              本系統會收集您的基本資料以提供服務。我們重視您的隱私，並將嚴格保護您的個人資訊。
            </p>
            <!-- 此處添加更多隱私政策內容 -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Modal } from "bootstrap";

export default {
  name: "LoginPage", // 使用多詞組件名稱以符合ESLint規則
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const termsModal = ref(null);
    const privacyModal = ref(null);

    const loading = computed(() => store.getters["isLoading"]);
    const error = computed(() => store.getters["getError"]);

    onMounted(() => {
      // 初始化 Bootstrap Modal
      termsModal.value = new Modal(document.getElementById("termsModal"));
      privacyModal.value = new Modal(document.getElementById("privacyModal"));

      // 載入 Google API
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
          "582345753246-7t608asp5rp7dvcmfk4fv6b06p8g7gt7.apps.googleusercontent.com", // 使用您提供的客戶端ID
        callback: handleGoogleCallback,
      });
    };

    const handleGoogleCallback = async (response) => {
      try {
        await store.dispatch("auth/googleLogin", response.credential);

        // 如果有重定向路徑，則導航到該路徑，否則到儀表板
        const redirectPath = route.query.redirect || "/dashboard";
        router.push(redirectPath);
      } catch (error) {
        console.error("Google 登入失敗:", error);
      }
    };

    const handleGoogleLogin = () => {
      // 設定Google登入配置
      const googleConfig = {
        client_id:
          "582345753246-7t608asp5rp7dvcmfk4fv6b06p8g7gt7.apps.googleusercontent.com",
        scope: "email profile",
        prompt: "select_account",
      };

      // 打開彈窗
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
      termsModal.value.show();
    };

    const showPrivacy = () => {
      privacyModal.value.show();
    };

    return {
      loading,
      error,
      handleGoogleLogin,
      showTerms,
      showPrivacy,
    };
  },
};
</script>

<style scoped>
.login-page {
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
