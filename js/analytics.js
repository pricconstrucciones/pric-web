/* ==========================================================================
   PRIC HOUSE — consentimiento de cookies, analítica y conversiones
   (un único archivo compartido por todas las páginas)

   Principios
   - No se carga NINGUNA herramienta de terceros antes del consentimiento:
       · Analítica  (Google Tag Manager → GA4)  solo con consentimiento de "Medición".
       · Publicidad (Meta Pixel)                solo con consentimiento de "Publicidad".
   - Una sola implementación de eventos: este archivo es la fuente. GA4 los recibe por
     dataLayer + GTM; Meta Pixel los recibe desde acá (NO hay etiquetas de Meta en GTM
     ni listeners de Meta en el HTML, para no duplicar conversiones).
   - Los eventos ocurridos antes de decidir sobre las cookies no se registran.
   - Ningún evento lleva datos personales (nombre, teléfono, email, ubicación, mensaje).

   Eventos (sin cambios respecto de la versión anterior)
     generate_lead   envío válido de un formulario    → GA4 evento clave · Meta Lead
     model_inquiry   «Consultar este modelo»          → GA4 evento clave · Meta Lead (con valor)
     whatsapp_click  cualquier otro enlace a WhatsApp → GA4 secundaria   · Meta Contact
   Detalle de configuración en ANALITICA.md.
   ========================================================================== */
(function () {
  'use strict';

  // TODO: completar con el ID real del contenedor de GTM (formato GTM-XXXXXXX). Vacío = GA4 no se carga.
  var GTM_ID = '';
  // Píxel de Meta de PRIC HOUSE (Events Manager).
  var META_PIXEL_ID = '1963379867965591';

  // Las herramientas de terceros solo se cargan en el sitio real. En previews (*.pages.dev) y en local no se envía
  // nada a GA4 ni a Meta, para no contaminar los datos de campaña. Para probar a propósito (Pixel Helper, Vista
  // previa de GTM) abrir la página con ?ph-test=1 (queda activo en esa pestaña).
  var PROD_HOST = /^(www\.)?prichouse\.com$/;
  function thirdPartyAllowed() {
    if (PROD_HOST.test(location.hostname)) return true;
    try {
      if (/[?&]ph-test=1(&|$)/.test(location.search)) w.sessionStorage.setItem('ph_test', '1');
      return w.sessionStorage.getItem('ph_test') === '1';
    } catch (e) { return false; }
  }

  var STORE_KEY = 'ph_consent_v1';
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // se vuelve a preguntar a los 12 meses

  var w = window, d = document;
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }

  var state = { decided: false, analytics: false, marketing: false };
  var loaded = { gtm: false, meta: false };

  /* ------------------------------ almacenamiento ------------------------------ */
  function readStored() {
    try {
      var v = JSON.parse(w.localStorage.getItem(STORE_KEY));
      if (v && typeof v.analytics === 'boolean' && typeof v.marketing === 'boolean' && v.ts && (Date.now() - v.ts) < MAX_AGE_MS) return v;
    } catch (e) { /* almacenamiento bloqueado: se decide en cada visita */ }
    return null;
  }
  function writeStored(c) {
    try { w.localStorage.setItem(STORE_KEY, JSON.stringify({ analytics: c.analytics, marketing: c.marketing, ts: Date.now() })); } catch (e) { /* ignorar */ }
  }

  /* --------------------------------- contexto --------------------------------- */
  function pageType() {
    var forced = d.documentElement.getAttribute('data-page'); // p. ej. 404.html
    if (forced) return forced;
    var p = location.pathname;
    if (p.indexOf('/civil') === 0) return 'civil';
    if (p.indexOf('/empresas') === 0) return 'empresas';
    if (p.indexOf('/privacidad') === 0) return 'privacidad';
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
  function cleanText(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80); }

  /* ---------------------------- Google (GTM → GA4) ---------------------------- */
  function loadGoogle() {
    if (loaded.gtm || !thirdPartyAllowed()) return;
    loaded.gtm = true;
    if (!/^GTM-[A-Z0-9]+$/.test(GTM_ID)) return; // sin ID: los eventos quedan en dataLayer, sin scripts externos
    // Consent Mode v2: valores por defecto denegados y, enseguida, lo que eligió la persona.
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: state.marketing ? 'granted' : 'denied'
    });
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    d.head.appendChild(s);
  }

  /* --------------------------------- Meta Pixel -------------------------------- */
  function loadMeta() {
    if (loaded.meta || !thirdPartyAllowed()) return;
    loaded.meta = true;
    // Código base oficial de Meta (se omite si ya existe un fbq, p. ej. en pruebas).
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(w, d, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    w.fbq('init', META_PIXEL_ID);
    w.fbq('track', 'PageView');
    var p = pageType();
    if (p === 'civil') w.fbq('track', 'ViewContent', { content_name: 'Civil y Turismo', content_category: 'vertical' });
    else if (p === 'empresas') w.fbq('track', 'ViewContent', { content_name: 'Emprendimientos y Empresas', content_category: 'vertical' });
  }
  function metaTrack(event, data) {
    if (!loaded.meta || typeof w.fbq !== 'function') return;
    if (event === 'generate_lead') {
      w.fbq('track', 'Lead', { content_name: data.form_id || 'formulario', content_category: data.page_type });
    } else if (event === 'model_inquiry') {
      var lead = { content_name: data.model_name || 'modelo', content_category: data.model_family || '' };
      if (data.value > 0) { lead.value = data.value; lead.currency = data.currency || 'USD'; }
      w.fbq('track', 'Lead', lead);
    } else if (event === 'whatsapp_click') {
      w.fbq('track', 'Contact', { content_name: 'WhatsApp', content_category: data.cta_location || '' });
    }
  }

  /* ------------------------- API de eventos (fuente única) ------------------------- */
  w.pricTrack = function (event, params) {
    var data = { event: event, page_type: pageType() };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) data[k] = params[k];
    if (state.analytics) w.dataLayer.push(data);   // GA4, vía GTM
    if (state.marketing) metaTrack(event, data);   // Meta Pixel
  };

  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var isWa = href.indexOf('wa.me/') !== -1 || a.hasAttribute('data-wa-link');

    if (a.getAttribute('data-track') === 'model_inquiry') {
      var value = Number(a.getAttribute('data-model-value'));
      var params = {
        model_family: a.getAttribute('data-model-family') || '',
        model_name: a.getAttribute('data-model-name') || '',
        cta_location: ctaLocation(a)
      };
      if (value > 0) { params.value = value; params.currency = 'USD'; }
      w.pricTrack('model_inquiry', params);
      return; // no se cuenta además como whatsapp_click
    }
    if (isWa) w.pricTrack('whatsapp_click', { cta_location: ctaLocation(a), cta_text: cleanText(a) });
  }, true);

  /* --------------------------- aplicar / retirar consentimiento --------------------------- */
  function clearCookies() {
    var host = location.hostname, parts = host.split('.'), roots = [host, '.' + host];
    if (parts.length > 2) roots.push('.' + parts.slice(-2).join('.'));
    d.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (/^(_ga|_gid|_gat|_gcl|_fbp|_fbc|_gac)/.test(n)) {
        roots.forEach(function (dom) { d.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + dom; });
        d.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }

  function apply(choice, persist) {
    var before = { analytics: state.analytics, marketing: state.marketing };
    state.decided = true; state.analytics = !!choice.analytics; state.marketing = !!choice.marketing;
    if (persist) writeStored(state);
    var withdrew = (before.analytics && !state.analytics) || (before.marketing && !state.marketing);
    if (withdrew) { clearCookies(); if (loaded.gtm || loaded.meta) { location.reload(); return; } }
    if (state.analytics) loadGoogle();
    if (state.marketing) loadMeta();
  }

  /* ------------------------------------ interfaz ------------------------------------ */
  var CSS = '' +
    '#ph-consent{position:fixed;left:16px;bottom:16px;z-index:2147483000;width:min(460px,calc(100vw - 32px));box-sizing:border-box;background:#111315;color:#EFEAE2;border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:16px 18px;font:400 14px/1.5 Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;box-shadow:0 16px 40px rgba(0,0,0,.4)}' +
    '#ph-consent *{box-sizing:border-box}' +
    '#ph-consent [hidden]{display:none!important}' +
    '#ph-consent h2{margin:0 0 4px;font:600 15px/1.3 "Space Grotesk",Inter,system-ui,sans-serif;color:#fff;letter-spacing:-.01em}' +
    '#ph-consent p{margin:0 0 12px;color:rgba(239,234,226,.82);font-size:13px;line-height:1.45}' +
    '#ph-consent a{color:#E39A6E;text-decoration:underline;text-underline-offset:2px}' +
    '#ph-consent .ph-row{display:flex;flex-wrap:wrap;gap:10px}' +
    '#ph-consent button{font:600 13px/1 Inter,system-ui,sans-serif;letter-spacing:.04em;min-height:44px;padding:0 18px;border-radius:999px;cursor:pointer;flex:1 1 auto;border:1px solid rgba(255,255,255,.5);background:transparent;color:#fff}' +
    '#ph-consent button:hover{border-color:#fff;background:rgba(255,255,255,.08)}' +
    '#ph-consent button.ph-ok{background:#A85A2E;border-color:#A85A2E;color:#fff}' +
    '#ph-consent button.ph-ok:hover{background:#8f4c26;border-color:#8f4c26}' +
    '#ph-consent button.ph-link{flex:0 0 100%;border:0;background:none;min-height:36px;padding:0;color:#E39A6E;text-decoration:underline;text-underline-offset:2px;font-weight:500;letter-spacing:0}' +
    '#ph-consent button:focus-visible,#ph-consent a:focus-visible,#ph-consent input:focus-visible{outline:2px solid #fff;outline-offset:3px}' +
    '#ph-consent .ph-opts{display:none;margin:0 0 14px;border-top:1px solid rgba(255,255,255,.14)}' +
    '#ph-consent.ph-open .ph-opts{display:block}' +
    '#ph-consent.ph-open .ph-simple{display:none}' +
    '#ph-consent label{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.14);cursor:pointer}' +
    '#ph-consent input[type=checkbox]{flex:0 0 20px;width:20px;height:20px;margin:2px 0 0;accent-color:#C96B37}' +
    '#ph-consent label b{display:block;color:#fff;font-weight:600}' +
    '#ph-consent label span{color:rgba(239,234,226,.72);font-size:13px}' +
    '@media (max-width:520px){#ph-consent{left:12px;right:12px;bottom:12px;width:auto;padding:14px 16px}#ph-consent button{min-height:44px}}';

  var box = null;
  function buildBanner() {
    if (box) return box;
    var st = d.createElement('style'); st.id = 'ph-consent-css'; st.textContent = CSS; d.head.appendChild(st);
    box = d.createElement('div');
    box.id = 'ph-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-labelledby', 'ph-consent-title');
    box.innerHTML =
      '<h2 id="ph-consent-title">Tu privacidad</h2>' +
      '<p>Usamos cookies de medición y publicidad para mejorar la web y nuestros anuncios. Más información en la <a href="/privacidad/">Política de privacidad</a>.</p>' +
      '<div class="ph-opts">' +
        '<label><input type="checkbox" id="ph-c-analytics"><div><b>Medición</b><span>Google Analytics: cuántas personas visitan la web y qué secciones usan.</span></div></label>' +
        '<label><input type="checkbox" id="ph-c-marketing"><div><b>Publicidad</b><span>Meta Pixel: medir el resultado de nuestros anuncios en Facebook e Instagram.</span></div></label>' +
      '</div>' +
      '<div class="ph-row ph-simple"><button type="button" class="ph-ok" data-ph="all">Aceptar todas</button><button type="button" data-ph="none">Rechazar</button><button type="button" class="ph-link" data-ph="custom">Elegir cuáles</button></div>' +
      '<div class="ph-row ph-custom" hidden><button type="button" class="ph-ok" data-ph="save">Guardar preferencias</button><button type="button" data-ph="none">Rechazar todas</button></div>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-ph]');
      if (!b) return;
      var act = b.getAttribute('data-ph');
      if (act === 'all') { apply({ analytics: true, marketing: true }, true); hide(); }
      else if (act === 'none') { apply({ analytics: false, marketing: false }, true); hide(); }
      else if (act === 'save') { apply({ analytics: d.getElementById('ph-c-analytics').checked, marketing: d.getElementById('ph-c-marketing').checked }, true); hide(); }
      else if (act === 'custom') { box.classList.add('ph-open'); box.querySelector('.ph-custom').hidden = false; d.getElementById('ph-c-analytics').focus(); }
    });
    d.body.appendChild(box);
    return box;
  }
  function show(expanded) {
    buildBanner();
    d.getElementById('ph-c-analytics').checked = state.analytics;
    d.getElementById('ph-c-marketing').checked = state.marketing;
    box.hidden = false;
    if (expanded) { box.classList.add('ph-open'); box.querySelector('.ph-custom').hidden = false; d.getElementById('ph-c-analytics').focus(); }
    else { box.classList.remove('ph-open'); box.querySelector('.ph-custom').hidden = true; }
  }
  function hide() { if (box) box.hidden = true; }

  // «Configurar cookies» (pie de página): vuelve a abrir las preferencias en cualquier momento.
  d.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!t) return;
    e.preventDefault();
    show(true);
  });
  w.pricCookies = { open: function () { show(true); }, state: function () { return { analytics: state.analytics, marketing: state.marketing, decided: state.decided }; } };

  function init() {
    var stored = readStored();
    if (stored) apply(stored, false);
    else show(false);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
