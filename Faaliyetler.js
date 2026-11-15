/* =========================================================
   EUDIA Brussels — Faaliyetler betiği
   1) Etkinlik tarihi geçtiyse etiketi "Tamamlandı" yapar.
   2) Ziyaret kartlarında "Devamını oku" düğmesi.
   3) #ziyaret-adı ile gelindiğinde ilgili kartı açar.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. Etkinlik durumu ---------- */
  const now = Date.now();
  document.querySelectorAll('[data-event-date]').forEach((card) => {
    const date = Date.parse(card.dataset.eventDate);
    const badge = card.querySelector('[data-status]');
    if (!badge || Number.isNaN(date)) return;
    // Etkinlik başladıktan 3 saat sonra "tamamlandı" sayılır
    const past = now > date + 3 * 60 * 60 * 1000;
    badge.textContent = past ? badge.dataset.past : badge.dataset.upcoming;
    badge.classList.toggle('is-past', past);
  });

  /* ---------- 2. Devamını oku ---------- */
  function setOpen(visit, open) {
    const btn = visit.querySelector('.visit__toggle');
    visit.classList.toggle('is-open', open);
    if (!btn) return;
    btn.setAttribute('aria-expanded', String(open));
    btn.firstChild.textContent = (open ? btn.dataset.less : btn.dataset.more) + ' ';
  }

  document.querySelectorAll('.visit__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const visit = btn.closest('.visit');
      setOpen(visit, !visit.classList.contains('is-open'));
    });
  });

  /* ---------- 3. Bağlantı ile gelindiğinde kartı aç ---------- */
  function openFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const visit = document.getElementById(id);
    if (visit && visit.classList.contains('visit')) {
      visit.classList.add('is-visible');
      setOpen(visit, true);
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
