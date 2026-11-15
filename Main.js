/* =========================================================
   EUDİA Brussels — Ana sayfa betiği
   Logo, fare hareketine göre hafifçe eğilir (3B etkisi).
   ========================================================= */
(() => {
  'use strict';

  const hero = document.querySelector('.hero');
  const logo = document.querySelector('.hero__logo');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (!hero || !logo || reduceMotion || !finePointer) return;

  let frame = null;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      logo.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    if (frame) cancelAnimationFrame(frame);
    logo.style.transform = '';
  });
})();
