# Analítica y conversiones — PRIC HOUSE

El sitio carga **solo Google Tag Manager** desde `js/analytics.js` (incluido en el `<head>` de cada página). GA4, Meta Pixel y las conversiones de Google Ads se configuran **dentro de GTM**, nunca pegando sus códigos en el HTML, para no duplicar mediciones.

## Datos pendientes

| Dato | Dónde va | Estado |
| --- | --- | --- |
| ID del contenedor de GTM (`GTM-XXXXXXX`) | `js/analytics.js`, constante `GTM_ID` | Pendiente |
| ID de medición de GA4 (`G-XXXXXXXXXX`) | Etiqueta "Configuración de Google" en GTM | Pendiente |
| ID de Meta Pixel | Etiqueta de Meta Pixel en GTM | Pendiente |
| Conversiones de Google Ads (ID + etiqueta) | Etiquetas de conversión de Ads en GTM, o importación desde GA4 | Pendiente |

Mientras `GTM_ID` esté vacío no se carga ningún script externo; los eventos igual se registran en `window.dataLayer` (sirve para probar).

## Eventos (dataLayer)

Una acción del usuario genera **un solo evento**. Ningún evento lleva nombre, teléfono, email, ubicación ni el texto del mensaje.

| Evento | Cuándo se dispara | Parámetros | Uso sugerido |
| --- | --- | --- | --- |
| `generate_lead` | Envío válido de un formulario (abre WhatsApp con el mensaje armado) | `form_id` (`home_contacto`, `civil_cotizacion`, `empresas_propuesta`), `page_type` y el valor del selector del formulario: `interest`, `model_interest` + `land_status`, o `project_type` | **Conversión principal.** GA4: evento clave. Meta: `Lead`. Ads: conversión principal "Formulario" |
| `model_inquiry` | Clic en "Consultar este modelo" (Civil) o "Consultar configuración" (Empresas) | `model_family`, `model_name`, `value` (precio publicado), `currency` (`USD`), `cta_location`, `page_type` | **Conversión principal.** GA4: evento clave con valor. Meta: `Contact` con `value`/`currency`. Ads: conversión principal "Consulta de modelo" |
| `whatsapp_click` | Clic en cualquier otro botón o enlace de WhatsApp (nav, CTA, aplicaciones, footer…) | `cta_location` (sección), `cta_text`, `page_type` | **Conversión secundaria.** Meta: `Contact`. Ads: secundaria (observación), para no inflar la puja |

Un clic en "Consultar este modelo" solo dispara `model_inquiry`: no se cuenta también como `whatsapp_click`.

## Configuración sugerida en GTM

1. Variables de capa de datos: `form_id`, `interest`, `model_interest`, `land_status`, `project_type`, `model_family`, `model_name`, `value`, `currency`, `cta_location`, `cta_text`, `page_type`.
2. Activadores de "Evento personalizado": `generate_lead`, `model_inquiry`, `whatsapp_click`.
3. Etiqueta "Configuración de Google" (GA4) en todas las páginas.
4. Etiquetas "Evento de GA4" para los tres eventos, con sus parámetros.
5. Meta Pixel: `PageView` en todas las páginas; `Lead` con `generate_lead`; `Contact` con `model_inquiry` (pasando `value` y `currency`) y con `whatsapp_click`.
6. En GA4, marcar `generate_lead` y `model_inquiry` como eventos clave e importarlos a Google Ads como conversiones principales; `whatsapp_click` como secundaria.
7. Probar con el modo Vista previa de GTM sobre una URL de preview (`*.pric-web.pages.dev`) antes de publicar el contenedor.

## Consideraciones

- El formulario no envía datos a un servidor: el "lead" real se concreta en la conversación de WhatsApp. `generate_lead` mide la intención declarada (formulario completo y válido), no un mensaje efectivamente enviado.
- Si se agrega un banner de consentimiento de cookies, conectar Consent Mode de Google en GTM antes de las etiquetas de GA4, Ads y Meta.
