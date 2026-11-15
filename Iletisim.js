/* =========================================================
   EUDİA Brussels — İletişim betiği
   "Kopyala" düğmeleri e-posta ve telefonu panoya kopyalar.
   ========================================================= */
(() => {
  'use strict';

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Eski tarayıcılar ve http:// için yedek yöntem
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await copyText(btn.dataset.copy);
        if (window.EUDIA) window.EUDIA.toast(btn.dataset.copied || 'Kopyalandı');
      } catch (err) {
        if (window.EUDIA) window.EUDIA.toast(btn.dataset.copy);
      }
    });
  });
})();
