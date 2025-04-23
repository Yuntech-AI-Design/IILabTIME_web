import anime from 'animejs/lib/anime.es.js';

// Export name changed for clarity, alias added for compatibility
export const typeWriterLoop = {
  mounted(el, binding) {
    // --- Options ---
    const options = {
      typeStartDelay: binding.value?.typeStartDelay || 1000,
      jumpDelay: binding.value?.jumpDelay || 80,
      deleteStartDelay: binding.value?.deleteStartDelay || 1000,
      deleteDelay: binding.value?.deleteDelay || 50,
      loopEndDelay: binding.value?.loopEndDelay || 1500,
      cursorBlinkSpeed: binding.value?.cursorBlinkSpeed || 500,
      ...binding.value
    };

    const text = el.textContent?.trim() || '';
    if (!text) return;

    // --- Setup DOM ---
    el.innerHTML = ''; // Clear existing content
    const wrapper = document.createElement('span');
    wrapper.classList.add(
      'type-animation-wrapper', 'relative', 'inline-block',
      'whitespace-nowrap', 'align-bottom' // Ensure vertical alignment
    );
    const lettersContainer = document.createElement('span');
    lettersContainer.className = 'letters';
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add(
      'cursor', 'absolute', 'top-0', 'left-0', 'w-0.5', // Tailwind width (adjust if needed)
      'bg-current', // Use text color
      'opacity-100', // Start visible
      'h-[1em]' // Height relative to font size
    );
    cursorSpan.style.left = '0px'; // Initial static position

    text.split('').forEach(char => {
      const letterSpan = document.createElement('span');
      // Add classes for styling and animation targeting
      letterSpan.classList.add('letter', 'inline-block', 'opacity-0');
      // Use innerHTML for spaces (&nbsp;)
      letterSpan.innerHTML = char === ' ' ? '&nbsp;' : char;
      lettersContainer.appendChild(letterSpan);
    });

    wrapper.appendChild(lettersContainer);
    wrapper.appendChild(cursorSpan);
    el.appendChild(wrapper);

    const letters = Array.from(el.querySelectorAll('.letter'));
    const cursor = el.querySelector('.cursor'); // Use this variable consistently
    let letterPositions = [];
    // let loopCounter = 0; // For debugging

    // --- Calculate Positions ---
    // Calculates the x-coordinate for the cursor after each letter
    const calculatePositions = () => {
      // console.log(`Loop ${loopCounter}: Calculating positions...`);
      // Temporarily make letters visible but positioned absolutely off-screen
      // to measure width without causing layout shifts or visual flicker.
      letters.forEach(l => {
        l.style.visibility = 'hidden'; // Keep space but don't show
        l.style.position = 'absolute'; // Take out of flow for measurement
        l.style.opacity = '1'; // Ensure it's measurable if opacity affects it
      });

      letterPositions = letters.map((_, i) => {
        // Calculate cumulative width up to letter i
        return letters.slice(0, i + 1).reduce((sum, cur) => sum + cur.offsetWidth, 0);
      });
      letterPositions.unshift(0); // Add position before the first letter (index 0)

      // Reset letter styles before animation starts
      letters.forEach(l => {
        l.style.visibility = ''; // Back to default visibility
        l.style.position = ''; // Back to default positioning (inline-block)
        l.style.opacity = '0'; // Reset opacity for animation start
      });

      // Set wrapper min-width to prevent shrinking during deletion
      const totalWidth = letterPositions[letterPositions.length - 1];
      // Add a small buffer (e.g., 2px) for cursor or spacing
      wrapper.style.minWidth = `${totalWidth + 2}px`;
      // console.log(`Loop ${loopCounter}: Positions calculated:`, letterPositions);
    };

    // --- Cursor Blink Animation ---
    const blink = anime({
      targets: cursor,
      opacity: [1, 0], // Blink between opaque and transparent
      duration: options.cursorBlinkSpeed,
      easing: 'steps(2)', // Simple on/off blink
      loop: true,
      autoplay: false // Start paused, will be controlled by timeline
    });

    // --- Main Timeline ---
    const timeline = anime.timeline({
      loop: true,
      autoplay: true, // Timeline plays automatically
    });

    // --- Timeline Steps ---
    timeline
      // 1. Preparation (Runs at the start of each loop)
      .add({
        duration: 1, // Minimal duration just to run callbacks
        begin: () => {
          // loopCounter++; // Increment loop counter for debugging
          // console.log(`--- Loop ${loopCounter} Start ---`);
          calculatePositions(); // Recalculate positions each loop

          // Explicitly reset letter opacities using anime.set for reliability
          anime.set(letters, { opacity: 0 });

          // Reset cursor state: position at start, fully opaque
          anime.set(cursor, {
            left: `${letterPositions[0]}px`,
            opacity: 1
          });
          blink.pause(); // Ensure blink is paused
          blink.seek(0); // Reset blink animation to the beginning (opacity 1)
          // console.log(`Loop ${loopCounter}: Initial cursor pos: ${cursor.style.left}`);
        }
      })
      // 2. Initial delay (cursor blinks)
      .add({
        duration: options.typeStartDelay,
        begin: () => {
          // console.log(`Loop ${loopCounter}: Start Delay Begin - Start Blink`);
          blink.play(); // Start blinking during the delay
        },
        // No specific action needed on complete here
      })
      // 3. Typing animation
      .add({
        targets: letters,
        opacity: [0, 1], // Animate opacity from 0 to 1
        duration: 50, // Duration for each letter to appear
        delay: anime.stagger(options.jumpDelay), // Delay between each letter starting
        easing: 'linear',
        begin: () => {
          // console.log(`Loop ${loopCounter}: Typing Begin - Pause Blink`);
          blink.pause(); // Stop blinking
          blink.seek(0); // Reset to solid state (opacity 1)
          anime.set(cursor, { opacity: 1 }); // Ensure cursor is solid
        },
        update: (anim) => {
          // Find the index of the *last* letter whose animation has *started*
          const lastAnimatingIndex = anim.animations
            .filter(a => a.property === 'opacity' && letters.includes(a.animatable.target))
            .reduce((max, a) => (a.progress > 0 ? Math.max(max, letters.indexOf(a.animatable.target)) : max), -1);

          // Position cursor *after* the last animating letter
          // If index is -1 (before first letter starts), use position 0
          const targetCursorPos = letterPositions[lastAnimatingIndex + 1] ?? letterPositions[0];
          cursor.style.left = `${targetCursorPos}px`;
        },
        complete: () => {
          // console.log(`Loop ${loopCounter}: Typing Complete - Play Blink`);
          // Ensure cursor is exactly at the end position after typing finishes
          cursor.style.left = `${letterPositions[letterPositions.length - 1]}px`;
          blink.play(); // Start blinking again
        }
      })
      // 4. Delay before deleting (cursor blinks)
      .add({
        duration: options.deleteStartDelay,
        begin: () => {
          // console.log(`Loop ${loopCounter}: Delete Delay Begin - Blink Playing`);
          // Blink should already be playing from the previous step's complete callback
        },
      })
      // 5. Deleting animation
      .add({
        targets: letters,
        opacity: [1, 0], // Animate opacity from 1 to 0
        duration: 100, // Duration for each letter to disappear
        // Stagger deletion in reverse order (last letter first)
        delay: anime.stagger(options.deleteDelay, { direction: 'reverse' }),
        easing: 'linear',
        begin: () => {
          // console.log(`Loop ${loopCounter}: Deleting Begin - Pause Blink`);
          blink.pause(); // Stop blinking
          blink.seek(0); // Reset to solid state (opacity 1)
          anime.set(cursor, { opacity: 1 }); // Ensure cursor is solid
          // Cursor should start at the end position before deletion begins
          cursor.style.left = `${letterPositions[letterPositions.length - 1]}px`;
        },
        update: (anim) => {
           // Find the index of the *last* letter that is still somewhat visible (opacity > 0)
           // As letters disappear from the end, this index will decrease.
           const lastVisibleIndex = anim.animations
             .filter(a => a.property === 'opacity' && letters.includes(a.animatable.target))
             // Use a small threshold to account for floating point values near 0
             .reduce((max, a) => (a.currentValue > 0.01 ? Math.max(max, letters.indexOf(a.animatable.target)) : max), -1);

           // Position cursor *after* the last visible letter
           // If index is -1 (all letters hidden), use position 0
           const targetCursorPos = letterPositions[lastVisibleIndex + 1] ?? letterPositions[0];
           cursor.style.left = `${targetCursorPos}px`;
        },
        complete: () => {
          // console.log(`Loop ${loopCounter}: Deleting Complete - Play Blink`);
          // Ensure cursor is exactly at the start position after deletion finishes
          cursor.style.left = `${letterPositions[0]}px`;
          blink.play(); // Start blinking again
        }
      })
      // 6. Delay before loop restarts (cursor blinks)
      .add({
        duration: options.loopEndDelay,
        begin: () => {
          // console.log(`Loop ${loopCounter}: Loop End Delay Begin - Blink Playing`);
          // Blink should already be playing
        },
        complete: () => {
          // console.log(`Loop ${loopCounter}: Loop End Delay Complete - Loop will restart`);
        }
      });

    // --- Store and Cleanup ---
    el.__vueTypeAnimation = { timeline, blink, calculatePositions };
    calculatePositions(); // Initial calculation after DOM setup

    // Optional: Recalculate on resize using ResizeObserver (more efficient)
    // const resizeObserver = new ResizeObserver(() => {
    //   // Check if animation objects still exist before calculating
    //   if (el.__vueTypeAnimation) {
    //      el.__vueTypeAnimation.calculatePositions();
    //      // May need to briefly pause/reset/resume timeline if resize happens mid-animation
    //      // For simplicity, this example just recalculates positions.
    //   }
    // });
    // resizeObserver.observe(wrapper); // Observe the wrapper element for size changes
    // el.__vueTypeAnimation.resizeObserver = resizeObserver; // Store for cleanup
  },

  unmounted(el) {
    if (el.__vueTypeAnimation) {
      const { timeline, blink } = el.__vueTypeAnimation;
      // if (resizeObserver) {
      //   resizeObserver.disconnect(); // Stop observing
      // }
      timeline.pause(); // Pause the main timeline
      blink.pause(); // Pause the blink animation
      // Remove animations associated with the elements to prevent memory leaks
      anime.remove(el.querySelectorAll('.letter'));
      anime.remove(el.querySelector('.cursor'));
      delete el.__vueTypeAnimation; // Remove stored data
      // console.log("Typewriter animation cleaned up.");
      // Optional: Clean up added DOM elements if the directive element itself isn't removed
      // el.innerHTML = '';
    }
  }
};

// Add alias for backward compatibility if needed
export const typeWriter = typeWriterLoop;
