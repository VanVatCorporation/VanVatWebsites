
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});

// Particle effect for "Học Tập"
function initParticles() {
    const container = document.querySelector('.particle-container .particles');
    const textEl = document.querySelector('.particle-container b');
    if (!container || !textEl) return;

    const particleCount = 8; // fewer particles

    // Get computed color of the "Học Tập" text
    const computedStyle = window.getComputedStyle(textEl);
    const particleColor = computedStyle.color || '#dc2626';

    // Get bounding rect of the text to position particles inside it
    const rect = textEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offsetX = rect.left - containerRect.left;
    const offsetY = rect.top - containerRect.top;

    // Calculate max distance as half the text width
    let maxDistance = rect.width / 2;

    // Helper to create a particle element
    function createParticle() {
        const p = document.createElement('span');
        p.classList.add('particle');
        const size = Math.random() * 4 + 2; // 2px to 6px
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = particleColor;
        // Random start position inside the text bounding box
        const startX = offsetX + Math.random() * rect.width;
        const startY = offsetY + Math.random() * rect.height;
        p.style.left = startX + 'px';
        p.style.top = startY + 'px';
        p.style.setProperty('--start-x', startX + 'px');
        p.style.setProperty('--y-move', (Math.random() * 40 - 20).toFixed(2) + 'px');
        p.style.setProperty('--max-distance', maxDistance + 'px');
        p.style.animationTimingFunction = 'linear';
        return p;
    }

    // Animate a particle with fade in, shoot right, fade out
    function animateParticle(p, delay) {
        // Speed in px per second (adjust for desired speed)
        const speedPxPerSec = 120; // ~120px per second
        // Duration based on maxDistance and speed
        const duration = (maxDistance / speedPxPerSec) * 1000; // in ms

        p.style.animation = 'none';
        // Trigger reflow to restart animation
        void p.offsetWidth;
        p.style.animation = `shootRightFadeInOut ${duration}ms linear forwards`;
        p.style.animationDelay = delay + 'ms';

        // When animation ends, remove and respawn
        p.addEventListener('animationend', () => {
            container.removeChild(p);
            spawnParticle();
        }, { once: true });
    }

    // Spawn a new particle and animate it
    function spawnParticle() {
        const p = createParticle();
        container.appendChild(p);
        animateParticle(p, 0);
    }

    // Initially spawn particles with staggered delays
    for (let i = 0; i < particleCount; i++) {
        const p = createParticle();
        container.appendChild(p);
        animateParticle(p, i * 600);
    }

    // Update maxDistance and restart animations on resize
    function updateMaxDistance() {
        const newRect = textEl.getBoundingClientRect();
        maxDistance = newRect.width / 2;
        const currentParticles = container.querySelectorAll('.particle');
        currentParticles.forEach(p => {
            p.style.setProperty('--max-distance', maxDistance + 'px');
            p.style.animation = 'none';
            void p.offsetWidth;
            const speedPxPerSec = 120;
            const duration = (maxDistance / speedPxPerSec) * 1000;
            p.style.animation = `shootRightFadeInOut ${duration}ms linear forwards`;
            p.style.animationDelay = '0ms';
        });
    }

    window.addEventListener('resize', updateMaxDistance);
}