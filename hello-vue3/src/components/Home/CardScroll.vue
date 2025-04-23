<template>
  <section class="h-[185vh] relative pt-40">
    <div class="sticky top-0 h-full flex items-start overflow-hidden">
      <div ref="horizontalSlider" class="flex will-change-transform gap-5">
        <div v-for="(color, i) in cardColors" :key="i" class="home-card shrink-[0] rounded-md"
          :class="[color, i % 2 === 0 ? 'w-[666px] h-[999px]' : 'w-[666px] h-[666px]']"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const cardColors = [
  'bg-Ghibli-light-red', 'bg-Ghibli-yellow', 'bg-Ghibli-brown',
  'bg-Ghibli-red', 'bg-Ghibli-skin', 'bg-Ghibli-blue',
  'bg-Ghibli-green', 'bg-Ghibli-light-red', 'bg-Ghibli-yellow'
]

// Horizontal scroll logic
const horizontalSlider = ref(null)
const scrollData = reactive({ totalWidth: 0, visibleWidth: 0, sectionTop: 0, sectionHeight: 3000 }) // Adjust sectionHeight as needed

function updateDimensions() {
  if (!horizontalSlider.value) return
  const section = horizontalSlider.value.closest('section')
  if (!section) return; // Ensure section exists
  scrollData.totalWidth = horizontalSlider.value.scrollWidth
  scrollData.visibleWidth = horizontalSlider.value.parentElement.clientWidth
  scrollData.sectionTop = section.offsetTop
  // Consider dynamic height calculation if needed
  // scrollData.sectionHeight = section.offsetHeight;
}

function handleScroll() {
  if (!horizontalSlider.value) return
  const scrollY = window.scrollY
  // Calculate scroll percentage within the section, considering viewport height
  // Adjust calculation based on how the scroll effect should behave relative to viewport entry/exit
  const scrollInSection = (scrollY - scrollData.sectionTop + window.innerHeight) / scrollData.sectionHeight
  const scrollPercentage = Math.min(Math.max(scrollInSection, 0), 1)

  // Calculate maximum translation percentage
  const maxSlide = scrollData.visibleWidth < scrollData.totalWidth
    ? ((scrollData.totalWidth - scrollData.visibleWidth) / scrollData.totalWidth) * 100
    : 0;

  // Apply easing function (optional, can be removed for linear scroll)
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // Example ease-in-out quadratic

  horizontalSlider.value.style.transform = `translate3d(${-ease(scrollPercentage) * maxSlide}%, 0px, 0px)`
}

onMounted(() => {
  // Use nextTick to ensure DOM is fully rendered before calculating dimensions
  requestAnimationFrame(() => {
    updateDimensions();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateDimensions);
    // Initial call to set position based on load scroll position
    handleScroll();
  });
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateDimensions)
})
</script>