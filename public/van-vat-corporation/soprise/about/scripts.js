
// ── Navbar scroll shadow
(function () {
    var nav = document.getElementById('main-nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
})();

// ── Mobile hamburger
(function () {
    var btn = document.getElementById('hamburger-btn');
    var menu = document.getElementById('mobile-menu');
    var icon = btn.querySelector('i');

    btn.addEventListener('click', function () {
        var isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        btn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.style.display = 'none';
            icon.className = 'fas fa-bars';
            btn.setAttribute('aria-expanded', 'false');
        });
    });
})();

// ── Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        var navHeight = document.getElementById('main-nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
    });
});

// ── Scroll reveal (Intersection Observer)
(function () {
    var elements = document.querySelectorAll('.reveal');
    if (!window.IntersectionObserver) {
        elements.forEach(function (el) { el.classList.add('visible'); });
        return;
    }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(function (el) { observer.observe(el); });
})();