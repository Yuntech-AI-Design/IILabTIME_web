import anime from 'animejs/lib/anime.es.js';

// Animation configuration
const bounceAnimation = {
    translateY: [
        { value: -10, duration: 200 },
        { value: 10, duration: 200 },
        { value: 0, duration: 300 },

    ],
    // Optional scale effect removed for performance
    // scale: [
    //     { value: 1, duration: 200 },
    // ],
    // Staggering might need adjustment depending on how many leaf nodes are found
    delay: anime.stagger(50, { from: 'first' }), // Stagger from the first element
    easing: 'easeOutQuad',
};
// Reset animation configuration
const resetAnimationConfig = {
    translateY: 0,
    // scale: 1, // Reset scale if it were used
    duration: 200,
    easing: 'easeOutQuad',
    delay: 0, // Ensure reset happens immediately
};

// Store node-specific handlers and nodes in a WeakMap associated with the root element
const nodeHandlersMap = new WeakMap();

export const CharBounce = {
    mounted(el) {
        // Find all leaf nodes within the element initially
        const leafNodes = [];
        const findLeafNodes = (element) => {
            // Consider elements with no children or specific classes like 'icon' as leaf nodes
            if (element.children.length === 0 || element.classList.contains("icon")) {
                leafNodes.push(element);
            } else {
                Array.from(element.children).forEach(findLeafNodes);
            }
        };
        findLeafNodes(el);

        const handlersForEl = []; // Array to store handlers for this specific element's leaf nodes
        const nodesToReplace = [];

        leafNodes.forEach(node => {
            console.log(node)
            if (node.textContent.trim() != '') {
                const text = node.textContent;
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (/\S/.test(char)) { // Check if the character is non-whitespace
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.display = 'inline-block'; // Necessary for transforms

                        // Define handlers specific to this character span
                        const mouseoverHandler = () => {
                            anime.remove(span); // Stop existing animation
                            anime({ targets: span, ...bounceAnimation });
                        };
                        const mouseoutHandler = () => {
                            anime.remove(span); // Stop existing animation
                            anime({ targets: span, ...resetAnimationConfig });
                        };

                        // Add listeners directly to the character span
                        span.addEventListener('mouseover', mouseoverHandler);
                        span.addEventListener('mouseout', mouseoutHandler);

                        // Store the span and its handlers for cleanup
                        handlersForEl.push({ node: span, mouseoverHandler, mouseoutHandler });
                        fragment.appendChild(span);
                    } else {
                        // Append whitespace as a text node
                        fragment.appendChild(document.createTextNode(char));
                    }
                }
                // Mark the original node for replacement with the fragment
                nodesToReplace.push({ original: node, replacement: fragment });
            } else {
                // Apply initial styles if needed (e.g., display: inline-block)
                const style = window.getComputedStyle(node);
                if (style.display === 'inline') {
                    node.style.display = 'inline-block'; // Necessary for transforms
                }

                // Define handlers specific to this node
                const mouseoverHandler = () => {
                    anime.remove(node); // Stop existing animation on this node
                    anime({
                        targets: node,
                        ...bounceAnimation
                    });
                };
                const mouseoutHandler = () => {
                    anime.remove(node); // Stop existing animation on this node
                    anime({
                        targets: node,
                        ...resetAnimationConfig
                    });
                };

                // Add listeners directly to the leaf node
                node.addEventListener('mouseover', mouseoverHandler);
                node.addEventListener('mouseout', mouseoutHandler);

                // Store the node and its handlers for cleanup
                handlersForEl.push({ node, mouseoverHandler, mouseoutHandler });
            }
        });
        nodesToReplace.forEach(({ original, replacement }) => {
            console.log(original, replacement)
            original.innerText = ''; // Clear the original node's content
            original.appendChild(replacement); // Append the new fragment
        });

        // Store the array of handlers associated with the root element
        if (handlersForEl.length > 0) {
            console.log(handlersForEl)
            nodeHandlersMap.set(el, handlersForEl);
        }
    },
    beforeUnmount(el) {
        const handlersForEl = nodeHandlersMap.get(el);
        if (handlersForEl) {
            handlersForEl.forEach(({ node, mouseoverHandler, mouseoutHandler }) => {
                // Remove event listeners
                node.removeEventListener('mouseover', mouseoverHandler);
                node.removeEventListener('mouseout', mouseoutHandler);

                // Stop any ongoing animations
                anime.remove(node);

                // Optional: Reset styles instantly on unmount
                // It might be better to let CSS handle the final state
                // anime({
                //     targets: node,
                //     translateY: 0,
                //     // scale: 1, // if scale was used
                //     duration: 0
                // });
            });
            nodeHandlersMap.delete(el); // Clean up the WeakMap entry
        }
        // No need to find leaf nodes again or apply batch resets here
    },
};

// How to register it globally in your main.js/main.ts:
/*
import { createApp } from 'vue';
import App from './App.vue';
import { CharBounce } from './directives/AllCharBounce'; // Adjust path as needed

const app = createApp(App);
app.directive('char-bounce', CharBounce); // Register directive globally
app.mount('#app');
*/

// How to use it in a component template:
/*
<template>
  <button v-char-bounce>
    <span>H</span>
    <span>o</span>
    <span>v</span>
    <span>e</span>
    <span>r</span>
    <span> </span>
    <span>M</span>
    <span>e</span>
    <i class="icon">🚀</i> <!-- This icon is a leaf node -->
  </button>

  <p v-char-bounce style="cursor: pointer;">
    <span>A</span>
    <span>n</span>
    <span>y</span>
    <span> </span> <!-- This space span is a leaf node -->
    <span>T</span>
    <span>a</span>
    <span>g</span>
    <span>s</span>
    <span> with <span>Nested</span> Elements</span> <!-- Only "Nested" will animate -->
  </p>
</template>

<style>
/* Optional: Ensure leaf nodes are display: inline-block if needed for transforms */
/* [v-char-bounce] span, [v-char-bounce] i { */
/*   display: inline-block; */
/* } */

/* Add any specific styling for icons or elements */
/* .icon { */
/*   margin-left: 5px; */
/* } */
// </style>
// */
