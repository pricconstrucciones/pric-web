# Pendientes de validación — PRIC HOUSE

Información que el sitio **no publica** hasta tener confirmación. Ningún texto visible usa marcadores como "[A completar]".

| Tema | Estado en el sitio | Qué hace falta |
| --- | --- | --- |
| IDs de GTM, GA4, Meta Pixel y conversiones de Google Ads | `js/analytics.js` con `GTM_ID` vacío; ver `ANALITICA.md` | Los IDs reales |
| Plazo de entrega | Civil ya no muestra "90 días": la FAQ dice que el plazo depende del modelo, la ubicación y el terreno, y se informa en la propuesta (comentario `PENDIENTE DE VALIDACIÓN COMERCIAL` en `civil/index.html`) | Plazo confirmado y desde cuándo se cuenta (firma, seña, permisos, terreno listo…) |
| Alcance del servicio llave en mano | Se retiró "Llave en mano real" y "lista para habitar"; el sitio habla de selección, traslado e instalación coordinados | Confirmar qué incluye: fundaciones/platea, conexiones de agua, luz, gas y cloacas, permisos municipales, flete, instalación |
| Flete e instalación | Civil aclara que se cotizan según la ubicación y las condiciones del terreno | Confirmar si los precios publicados incluyen o no flete e instalación |
| Facilidad de pago | Se retiraron los 4 bloques "[A completar]"; queda el texto general y el CTA a WhatsApp | Qué incluye y qué no el monto, plazos, cuotas, seña o anticipo |
| Precios vigentes en USD | Se muestran los 16 precios cargados (Viviendas y SUM) | Confirmar que siguen vigentes y si llevan alguna aclaración (IVA, validez, tipo de cambio) |
| Showroom de Villa Allende | No aparece en el sitio | Dirección y horarios, si se quiere publicar (y para el Schema de la organización) |
| Destino de Urbanizaciones (antes Corporativo) y de PRIC Construcciones | Ver propuesta abajo | Definir los destinos definitivos |

## Urbanizaciones y PRIC Construcciones — solución provisoria

Las verticales se llaman **Civil y Turismo** (`/civil/`), **Emprendimientos y Empresas** (`/empresas/`) y **Urbanizaciones** (antes Corporativo). `/corporativo/` no tiene página y el dominio `pricconstrucciones.com` no responde.

- **Urbanizaciones**: el panel y el link del pie de la home llevan a las aplicaciones ilustrativas de la home (`#experiencia`: campamentos, bases y complejos). Comentario `PROVISORIO` en `index.html`.
- **PRIC Construcciones**: "Conocer PRIC Construcciones" y los links del pie llevan a la sección Respaldo de la home (`/#respaldo`). Comentario `PROVISORIO` en `empresas/index.html`.

Opciones para el destino definitivo:

1. **Página `/urbanizaciones/` dentro de prichouse.com**, con el mismo sistema que Civil y Empresas: escala, etapas, casos y formulario propio. Mejor opción para SEO y campañas.
2. **Página institucional de PRIC Construcciones** (`/pric-construcciones/` o un sitio propio; hay un borrador local "PRIC Construcciones — Soluciones Urbanísticas Modulares") para trayectoria, obras y clientes.
3. Mientras tanto, mantener los destinos provisorios actuales.

## SEO — tareas fuera del código (panel de Cloudflare / Google)

Estas configuraciones no se pueden hacer desde el repositorio y no se tocaron:

1. **Redirección de `www.prichouse.com` a `prichouse.com`** (301). Hoy `www` sirve la misma página con estado 200. Se configura en Cloudflare con una regla de redirección (Rules → Redirect Rules o Bulk Redirects). El canonical de cada página ya apunta a `https://prichouse.com/…`, así que mientras tanto los buscadores consolidan igual.
2. **Google Search Console**: verificar `prichouse.com` (registro DNS TXT) y enviar `https://prichouse.com/sitemap.xml` después de publicar.
3. **Ofuscación de emails de Cloudflare** (Scrape Shield): reemplaza `info@prichouse.com` por un script en producción. Funciona, pero agrega un script extra y el email no se ve sin JavaScript. Evaluar desactivarla.
4. **Precios en los datos estructurados**: los productos de Civil y Empresas publican en Schema.org los mismos precios visibles en las tarjetas. Si los precios cambian, se actualizan solos (se generan desde las tarjetas y desde `PRODUCT_FAMILIES`).
