
/* ================================================================
   CYCLING WORDS
================================================================ */
const words = [
    'illiterate', 'uneducated', 'left behind', 'without books',
    'in the dark', 'uninformed', 'without stories', 'without knowledge',
];
let currentIndex = 0;
const wrap = document.getElementById('cyclingWrap');

function cycleWord() {
    const current = wrap.querySelector('.cycling-word');
    if (!current) return;
    current.classList.add('exiting');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        current.remove();
        const next = document.createElement('span');
        next.className = 'cycling-word';
        next.textContent = words[currentIndex];
        wrap.appendChild(next);
    }, 260);
}
setInterval(cycleWord, 2400);

/* ================================================================
   FIREFLY PARTICLE ENGINE
   A reusable class. Each particle has:
     - position (x, y) relative to canvas
     - velocity that starts mostly upward with chaotic drift
     - a random wobble frequency so they meander like real fireflies
     - a pulse cycle (bright/dim blink)
     - size and lifespan
================================================================ */
class FireflySystem {
    constructor(canvas, opts = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.opts = Object.assign({
            maxParticles: 28,
            spawnRate: 0.4,        // avg new particles per frame
            originX: () => canvas.width / 2,
            originY: () => canvas.height * 0.85,
            spreadX: 60,
            baseSpeed: 0.5,
            colors: ['#f5c842', '#ffd84d', '#ffe680', '#ffcc00', '#fff5a0'],
            minSize: 1.5,
            maxSize: 3.5,
            lifespan: 120,         // frames
            gravity: -0.012,       // negative = floats up
            wobbleAmp: 0.6,
            wobbleFreq: 0.04,
        }, opts);
        this.running = false;
        this.raf = null;
    }

    spawn() {
        const o = this.opts;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9; // mostly upward, wide spread
        const speed = o.baseSpeed + Math.random() * 1.0;
        this.particles.push({
            x: o.originX() + (Math.random() - 0.5) * o.spreadX,
            y: o.originY() + (Math.random() - 0.5) * 20,
            vx: Math.cos(angle) * speed * 0.4,
            vy: Math.sin(angle) * speed,
            ax: 0, ay: o.gravity,
            size: o.minSize + Math.random() * (o.maxSize - o.minSize),
            color: o.colors[Math.floor(Math.random() * o.colors.length)],
            life: 0,
            maxLife: o.lifespan * (0.6 + Math.random() * 0.8),
            wobbleOffset: Math.random() * Math.PI * 2,
            wobbleAmp: o.wobbleAmp * (0.5 + Math.random()),
            wobbleFreq: o.wobbleFreq * (0.7 + Math.random() * 0.6),
            // blink: firefly pulse  (slower than heartbeat)
            blinkOffset: Math.random() * Math.PI * 2,
            blinkFreq: 0.025 + Math.random() * 0.03,
            blinkMin: 0.15,
        });
    }

    step() {
        const o = this.opts;
        // maybe spawn
        if (Math.random() < o.spawnRate && this.particles.length < o.maxParticles) {
            this.spawn();
        }
        // update + remove dead
        this.particles = this.particles.filter(p => p.life < p.maxLife);
        for (const p of this.particles) {
            // wobble in x
            p.vx += Math.sin(p.life * p.wobbleFreq + p.wobbleOffset) * p.wobbleAmp * 0.08;
            // dampen x drift so they don't fly sideways forever
            p.vx *= 0.97;
            p.vy += p.ay;
            p.x += p.vx;
            p.y += p.vy;
            p.life++;
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const p of this.particles) {
            const t = p.life / p.maxLife;
            // fade in quickly, linger, then fade out
            const fade = t < 0.1 ? t / 0.1 : t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1;
            // firefly blink
            const blink = p.blinkMin + (1 - p.blinkMin) *
                (0.5 + 0.5 * Math.sin(p.life * p.blinkFreq * Math.PI * 2 + p.blinkOffset));
            const alpha = fade * blink;

            // outer soft glow
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
            grad.addColorStop(0, hexAlpha(p.color, alpha * 0.9));
            grad.addColorStop(0.4, hexAlpha(p.color, alpha * 0.35));
            grad.addColorStop(1, hexAlpha(p.color, 0));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // bright core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = hexAlpha('#ffffff', alpha * 0.85);
            ctx.fill();
        }
    }

    tick() {
        this.step();
        this.draw();
        if (this.running) this.raf = requestAnimationFrame(() => this.tick());
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.tick();
    }

    stop() {
        this.running = false;
        if (this.raf) cancelAnimationFrame(this.raf);
    }

    burst(n = 22) {
        for (let i = 0; i < n; i++) this.spawn();
    }
}

function hexAlpha(hex, a) {
    // convert #rrggbb to rgba(r,g,b,a)
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

/* ================================================================
   1. BOOK FIREFLIES — rise from the open pages continuously
================================================================ */
(function () {
    const canvas = document.getElementById('bookCanvas');
    const scene = canvas.parentElement;

    function resize() {
        canvas.width = scene.offsetWidth;
        canvas.height = scene.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const sys = new FireflySystem(canvas, {
        maxParticles: 22,
        spawnRate: 0.35,
        originX: () => canvas.width / 2,
        originY: () => canvas.height * 0.78,   // from the book pages
        spreadX: 80,
        baseSpeed: 0.7,
        gravity: -0.018,
        wobbleAmp: 0.9,
        lifespan: 100,
        minSize: 1.4,
        maxSize: 3.2,
    });
    sys.start();
})();

/* ================================================================
   2. QUOTE FIREFLIES — float up through / around the glow text
================================================================ */
(function () {
    const canvas = document.getElementById('quoteCanvas');

    function resize() {
        const w = Math.min(600, window.innerWidth);
        canvas.width = w;
        canvas.height = 200;
    }
    resize();
    window.addEventListener('resize', resize);

    const sys = new FireflySystem(canvas, {
        maxParticles: 18,
        spawnRate: 0.22,
        originX: () => canvas.width / 2,
        originY: () => canvas.height * 0.92,
        spreadX: canvas.width * 0.7,
        baseSpeed: 0.45,
        gravity: -0.010,
        wobbleAmp: 1.2,
        wobbleFreq: 0.035,
        lifespan: 150,
        minSize: 1.0,
        maxSize: 2.4,
        colors: ['#f5c842', '#ffd84d', '#ffe680', '#fff5a0', '#ffcc00'],
    });
    sys.start();
})();

/* ================================================================
   3. BUTTON FIREFLIES — burst on hover, calm on leave
================================================================ */
(function () {
    const canvas = document.getElementById('btnCanvas');
    const btn = document.getElementById('btnStart');
    const wrap = btn.parentElement;

    function resize() {
        canvas.width = 280;
        canvas.height = 120;
    }
    resize();

    const sys = new FireflySystem(canvas, {
        maxParticles: 40,
        spawnRate: 0,             // only on hover
        originX: () => canvas.width / 2,
        originY: () => canvas.height * 0.65,
        spreadX: 90,
        baseSpeed: 1.1,
        gravity: -0.025,
        wobbleAmp: 1.4,
        wobbleFreq: 0.05,
        lifespan: 80,
        minSize: 1.2,
        maxSize: 3.0,
        colors: ['#f5c842', '#ffd84d', '#ffe680', '#ffcc00', '#ffffff'],
    });
    sys.start();

    btn.addEventListener('mouseenter', () => {
        sys.opts.spawnRate = 0.7;
        sys.burst(14);
    });
    btn.addEventListener('mouseleave', () => {
        sys.opts.spawnRate = 0;
    });
    // touch support
    btn.addEventListener('touchstart', () => {
        sys.opts.spawnRate = 0.7;
        sys.burst(14);
        setTimeout(() => { sys.opts.spawnRate = 0; }, 900);
    }, { passive: true });
})();