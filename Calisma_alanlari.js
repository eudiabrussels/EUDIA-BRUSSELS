/* =========================================================
   EUDİA Brussels — Çalışma Alanları betiği
   Ana sayfadaki bir alana tıklanınca (ör. #alan-3) ilgili kart
   ekrana kaydırılır ve kısa süre vurgulanır.
   ========================================================= */
(() => {
  'use strict';

  function highlightFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const card = document.getElementById(id);
    if (!card || !card.classList.contains('area-card')) return;

    card.classList.add('is-visible');      // animasyon beklemeden görünür yap
    card.classList.remove('is-highlight');
    void card.offsetWidth;                 // animasyonu yeniden başlat
    card.classList.add('is-highlight');
  }

  window.addEventListener('hashchange', highlightFromHash);
  window.addEventListener('load', () => setTimeout(highlightFromHash, 300));
})();
