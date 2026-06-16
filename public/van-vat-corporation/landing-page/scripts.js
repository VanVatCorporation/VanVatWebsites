// Offset navbar top when maintenance banner is visible
function updateNavTop() {
    const banner = document.getElementById('maintenance-banner');
    const nav = document.getElementById('main-nav');
    if (!banner || !nav) return;
    if (banner.classList.contains('dismissed')) {
        nav.style.top = '0';
    } else {
        nav.style.top = banner.offsetHeight + 'px';
    }
}
updateNavTop();
// Re-run when banner is dismissed
document.querySelector('#maintenance-banner button')?.addEventListener('click', () => {
    setTimeout(updateNavTop, 450);
});
window.addEventListener('resize', updateNavTop);