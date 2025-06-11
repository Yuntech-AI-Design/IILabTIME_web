<template>
  <transition
    enter-active-class="animate-toast-in"
    leave-active-class="animate-toast-out"
  >
    <div
      v-if="show"
      class="fixed top-4 right-4 bg-Ghibli-green text-white border border-Ghibli-green/50 p-3 rounded-lg text-sm"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
@keyframes toast-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}

.animate-toast-in {
  animation: toast-in 0.5s ease-in-out;
}

.animate-toast-out {
  animation: toast-out 0.5s ease-in-out;
}
</style>