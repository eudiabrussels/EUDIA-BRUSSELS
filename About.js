/* =========================================================
   EUDİA Brussels — Hakkımızda betiği
   "Kurumsal Kimlik" bölümü görününce üç çizgi ve altı yıldız
   sırayla belirir.
   ========================================================= */
(() => {
  'use strict';

  const block = document.querySelector('[data-identity]');
  if (!block) return;

  block.querySelectorAll('.stars svg').forEach((star, i) => {
    star.style.setProperty('--i', String(i));
  });

  const light = () => block.classList.add('is-lit');

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    light();
    return;
  }

  const io = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      light();
      io.disconnect();
    }
  }, { threshold: 0.35 });

  io.observe(block);
})();
