<template>
  <div class=" relative min-h-screen overflow-hidden bg-white font-ZMG flex items-center justify-center">
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
          class="w-full text-xl font-bold py-4 rounded-xl flex items-center justify-center gap-3  shadow-lg transition-all duration-200">
          <font-awesome-icon :icon="['fab', 'fa-google']" />
          <div>
            使用 Google 帳號登入
          </div>
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

<script setup name="LoginPage">

const handleGoogleLogin = () => {
  console.log(process.env.VUE_APP_API_URL + '/oauth2/authorization/google');
  window.location.href = process.env.VUE_APP_API_URL + "/oauth2/authorization/google";
};

</script>

<style scoped>

.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>