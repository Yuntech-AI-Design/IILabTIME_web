import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(targetRef, options = { threshold: 0.1 }) {
    const isVisible = ref(false);
    let observer = null;

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                // Optional: Stop observing after the first intersection
                // if (observer && targetRef.value) {
                //   observer.unobserve(targetRef.value);
                // }
            } else {
                // Optional: Set back to false if you want the animation to reset when out of view
                // isVisible.value = false;
            }
        });
    };

    onMounted(() => {
        // Ensure the target element is available
        if (targetRef.value) {
            observer = new IntersectionObserver(callback, options);
            observer.observe(targetRef.value);
        } else {
            console.warn("IntersectionObserver target is not available on mount:", targetRef);
        }
    });

    onUnmounted(() => {
        if (observer) {
            if (targetRef.value) {
                // Check if still observing before unobserving
                try {
                    observer.unobserve(targetRef.value);
                } catch (e) {
                    // Ignore errors if element is already gone
                }
            }
            observer.disconnect();
        }
    });

    return { isVisible };
}