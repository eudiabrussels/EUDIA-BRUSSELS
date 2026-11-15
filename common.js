/* =========================================================
   EUDIA Brussels — Ortak betik (tüm sayfalarda yüklenir)
   ========================================================= */

/*
 * "Bize Katılın" düğmeleri için Google Form bağlantısı.
 * Form hazır olduğunda tırnakların arasına yapıştırmanız yeterli, örneğin:
 *   const JOIN_FORM_URL = 'https://forms.gle/xxxxxxxx';
 * Boş kaldığı sürece düğmeler hiçbir şey yapmaz.
 */
const JOIN_FORM_URL = '';

(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------- Bildirim (toast) — diğer sayfa betikleri de kullanır ---------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2400);
  }
  window.EUDIA = { toast, reduceMotion };

  /* ---------- Üst menü: kaydırınca küçülme + yukarı çık düğmesi ---------- */
  const header = $('[data-header]');
  const backTop = $('[data-back-to-top]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (backTop) backTop.classList.toggle('is-visible', y > 640);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobil menü ---------- */
  const toggle = $('.menu-toggle');
  const nav = $('#site-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', nav).forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Kaydırınca beliren öğeler ---------- */
  // data-stagger: çocuk öğelere sırayla gecikme verir
  $$('[data-stagger]').forEach((group) => {
    const step = Number(group.dataset.stagger) || 90;
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--d', `${i * step}ms`);
    });
  });

  const revealItems = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach((el) => io.observe(el));
  }

  /* ---------- Fotoğraflar: dosya yoksa yer tutucu göster ---------- */
  $$('[data-photo]').forEach((box) => {
    const img = $('img', box);
    if (!img) {
      box.classList.add('is-missing');
      return;
    }
    const fail = () => {
      box.classList.add('is-missing');
      img.remove();
    };
    const ok = () => box.classList.add('is-loaded');

    if (img.complete) {
      if (img.naturalWidth > 0) ok(); else fail();
    } else {
      img.addEventListener('load', ok, { once: true });
      img.addEventListener('error', fail, { once: true });
    }
  });

  /* ---------- "Bize Katılın" düğmeleri ---------- */
  $$('[data-join]').forEach((btn) => {
    if (JOIN_FORM_URL) {
      btn.setAttribute('href', JOIN_FORM_URL);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    } else {
      btn.addEventListener('click', (e) => e.preventDefault());
    }
  });

  /* ---------- Alt bilgideki yıl ---------- */
  $$('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
