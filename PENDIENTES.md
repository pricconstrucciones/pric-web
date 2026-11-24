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
- **Imagen para compartir de Urbanizaciones**: ya está lista en `/imagenes/og/prichouse-urbanizaciones.jpg` (1200 × 630, la foto de la tarjeta de Urbanizaciones). Usarla en `og:image` y `twitter:image` cuando exista la página.
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

## Analítica, privacidad e imagen para compartir (rama `feature/analitica-privacidad-og`)

| Tema | Estado | Qué hace falta |
| --- | --- | --- |
| **Accesos a Google** | No se crearon propiedades ni contenedores | Acceso a Google Analytics y a Tag Manager (o crearlos con la cuenta de PRIC HOUSE); luego, `GTM_ID` en `js/analytics.js` y el ID `G-…` en el contenedor. Ver `ANALITICA.md`. |
| **Política de privacidad** (`/privacidad/`) | Creada con el texto completo del PDF y **con los datos del responsable completos**: PRIC CONSTRUCCIONES SAS, CUIT 30-71648270-3, Pablo Cabrera 781, Villa Allende, Córdoba. Sigue con aviso de «pendiente de validación legal», `noindex` y fuera del `sitemap.xml` | Que la revise el asesor legal o el contador. Al validarla: quitar el aviso y el `noindex` (marcados `PENDIENTE-LEGAL` en el código) y sumarla al sitemap. |
| **Explicación de cookies** | Se agregó un párrafo que **no está en el PDF** y describe el aviso real (solo se activan si se aceptan; se cambia desde «Configurar cookies») | Validación legal junto con el resto del texto. |
| **Coincidencia con el funcionamiento real** | Revisada: los formularios solo arman el mensaje de WhatsApp y no guardan datos en un servidor; las cookies de Meta y Google se activan solo con consentimiento | Confirmar con el asesor que la política cubre eso y a los proveedores reales (por ejemplo, la agencia que gestiona la comunicación). |
| **Datos de contacto** | `info@prichouse.com` y WhatsApp `+54 9 351 214-2900`, los mismos que ya figuran en el sitio | Confirmar que son los definitivos. |
| **Dominio de la imagen para compartir** | `og:image` usa `https://www.prichouse.com/…` (como se pidió), mientras que el canonical y el sitemap usan `https://prichouse.com/…` | Elegir un único dominio principal y redirigir el otro (ver «SEO — tareas fuera del código»). Hoy ambos sirven la misma página, así que la imagen carga igual. |
| **Pixel de Meta** | Instalado condicionado al consentimiento; ID `1963379867965591` | Verificar con Pixel Helper y Events Manager una vez publicado (pasos en `ANALITICA.md`). |
