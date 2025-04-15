<!-- src/components/AppFooter.vue -->
<template>
  <footer class="bg-gradient-to-r bg-white text-black text-sm border-t border-t-stone-500 border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-4 flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p>© 2025 AI專班實習管理系統。版權所有。</p>
        </div>
        <div class="flex space-x-6">
          <a href="#" :class="`hover:${randomColor1} transition-colors duration-200`">隱私政策</a>
          <a href="#" :class="`hover:${randomColor2} transition-colors duration-200`">使用條款</a>
          <a href="#" :class="`hover:${randomColor3} transition-colors duration-200`">聯絡我們</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup name="AppFooter">
import { ref } from 'vue';

const colorList = [
  'text-Ghibli-blue',
  'text-Ghibli-green',
  'text-Ghibli-red',
  'text-Ghibli-yellow',
  'text-Ghibli-brown',
  'text-Ghibli-skin',
  'text-Ghibli-light-red',
];

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle the colors and pick the first three
const shuffledColors = shuffleArray(colorList);
const randomColor1 = ref(shuffledColors[0]);
const randomColor2 = ref(shuffledColors[1]);
const randomColor3 = ref(shuffledColors[2]);

</script>