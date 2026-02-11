const container = document.getElementById('relatedItemsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (container && prevBtn && nextBtn) {
  const scrollAmount = 320; // Width of card + gap

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  // Mouse wheel scrolling
  container.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY > 0 ? scrollAmount : -scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    { passive: false },
  );

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else if (e.key === 'ArrowRight') {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  });

  // Optional: Make container focusable for keyboard
  container.setAttribute('tabindex', '0');
}
