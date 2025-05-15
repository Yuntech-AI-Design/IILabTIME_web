<template>
    <div class=" relative min-h-screen overflow-hidden bg-white font-ZMG flex items-center justify-center">
        <div class="w-full max-w-md bg-white border-4 border-stone-950 rounded-xl shadow-xl overflow-hidden relative z-10">
            <div class="py-6 px-8 border-b-4 border-stone-950">
                <h4 class="text-3xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-person-check-fill mr-3 text-Ghibli-green" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    登入成功
                </h4>
            </div>
            <div class="p-8">
                <div class="text-center mb-8">
                    <img src="@/assets/logo.png" alt="Logo" class="h-24 mx-auto mb-4 drop-shadow-lg" />
                    <h5 class="text-2xl font-bold text-stone-950 mb-1">實習管理系統</h5>
                </div>

                <div class="text-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-check-circle-fill mx-auto mb-4 text-Ghibli-green" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <h2 class="text-3xl font-bold text-Ghibli-green mb-2">登入成功！</h2>
                    <p class="text-lg text-stone-700">歡迎回來，您現在可以開始使用系統功能。</p>
                    <p v-if="countdown > 0" class="text-sm text-stone-500 mt-4">將在 {{ countdown }} 秒後自動跳轉至主頁面...</p>
                </div>

                <button @click="goToDashboard"
                    class="w-full text-xl font-bold py-4 rounded-xl flex items-center justify-center gap-3 bg-Ghibli-blue text-white hover:bg-Ghibli-dark-blue shadow-lg transition-all duration-200">
                    立即前往主頁
                </button>
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
    </div>
</template>

<script setup name="LoginSuccessPage">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // Assuming you are using Vue Router

const router = useRouter();
const countdown = ref(5); // Countdown in seconds
let timer = null;

const goToDashboard = () => {
    if (timer) clearInterval(timer);
    // Replace '/' with your actual dashboard/home route if different
    router.push('/'); 
};

onMounted(() => {
    timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            goToDashboard();
        }
    }, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

</script>

<style scoped>
/* Styles from the original component can be kept if they apply to the overall page structure. */
/* The .fa-google style is removed as the Google login button is no longer present. */
</style>
