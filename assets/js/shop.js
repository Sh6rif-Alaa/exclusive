const openBtn = document.getElementById('openFilters');
const closeBtn = document.getElementById('closeFilters');
const drawer = document.getElementById('filtersDrawer');
const overlay = document.getElementById('filtersOverlay');

function openDrawer() {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    openBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
}

function closeDrawer() {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    openBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
}

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});