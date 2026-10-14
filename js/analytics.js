/* ==========================================================================
   PRIC HOUSE — analítica y conversiones (compartido por todas las páginas)

   - Carga Google Tag Manager SOLO si GTM_ID tiene un ID válido. GA4 y Meta
     Pixel se configuran dentro de GTM (no se instalan acá) para evitar
     instalaciones duplicadas.
   - Empuja eventos al dataLayer. Una acción = un evento:
       generate_lead   formulario válido que abre WhatsApp     (conversión principal)
       model_inquiry   "Consultar este modelo/configuración"   (conversión principal)
       whatsapp_click  cualquier otro botón/enlace de WhatsApp (conversión secundaria)
   - No se envían datos personales (nombre, teléfono, email, mensaje).
   Detalle de configuración en ANALITICA.md.
   ========================================================================== */
(function () {
  'use strict';

  // TODO: completar con el ID real del contenedor (formato GTM-XXXXXXX).
  var GTM_ID = '';

  var w = window;
  w.dataLayer = w.dataLayer || [];

  if (/^GTM-[A-Z0-9]+$/.test(GTM_ID)) {
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  function pageType() {
    var p = location.pathname;
    if (p.indexOf('/civil') === 0) return 'civil';
    if (p.indexOf('/empresas') === 0) return 'empresas';
    if (p === '/' || p === '/index.html') return 'home';
    return 'otra';
  }

  // Zona de la página desde donde se hizo clic (nav, footer o id de la sección).
  function ctaLocation(el) {
    if (el.closest('.mobile-menu')) return 'menu_mobile';
    if (el.closest('nav')) return 'nav';
    if (el.closest('footer')) return 'footer';
    var sec = el.closest('section[id], section[class]');
    if (!sec) return 'otra';
    return sec.id || sec.className.split(' ')[0];
  }

  function cleanText(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  }

  // API pública para los scripts de cada página (formularios).
  w.pricTrack = function (event, params) {
    var data = { event: event, page_type: pageType() };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) data[k] = params[k];
    w.dataLayer.push(data);
  };

  // Clics: un único listener delegado (cubre también las cards que se generan por JS).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var isWa = href.indexOf('wa.me/') !== -1 || a.hasAttribute('data-wa-link');

    if (a.getAttribute('data-track') === 'model_inquiry') {
      var value = Number(a.getAttribute('data-model-value'));
      var params = {
        model_family: a.getAttribute('data-model-family') || '',
        model_name: a.getAttribute('data-model-name') || '',
        cta_location: ctaLocation(a),
      };
      if (value > 0) { params.value = value; params.currency = 'USD'; }
      w.pricTrack('model_inquiry', params);
      return; // no se cuenta además como whatsapp_click
    }
    if (isWa) {
      w.pricTrack('whatsapp_click', { cta_location: ctaLocation(a), cta_text: cleanText(a) });
    }
  }, true);
})();
