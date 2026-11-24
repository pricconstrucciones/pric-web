# Analítica, consentimiento y conversiones — PRIC HOUSE

Todo vive en un único archivo, `js/analytics.js`, incluido en el `<head>` de cada página (Home, Civil, Empresas, Privacidad y 404). Es la **única implementación** de eventos y de consentimiento.

## Cómo funciona

| Pieza | Qué hace |
| --- | --- |
| **Aviso de cookies** | Aparece en la primera visita y se recuerda 12 meses. Opciones: *Aceptar todas*, *Rechazar* o *Elegir cuáles* (Medición / Publicidad). Se puede cambiar desde «Configurar cookies» en el pie de cada página. |
| **Medición** (Google) | Solo con consentimiento de *Medición*: se carga Google Tag Manager, que envía los eventos a GA4. |
| **Publicidad** (Meta) | Solo con consentimiento de *Publicidad*: se instala el Pixel de Meta (`1963379867965591`). |
| **Antes de decidir** | No se carga ningún script de Google ni de Meta, no se crean cookies de terceros y los clics no se registran. |
| **Retirar el consentimiento** | Se borran las cookies `_ga*`, `_gid`, `_gcl*`, `_fbp`, `_fbc` y se recarga la página. |
| **Solo en el sitio real** | Los scripts de terceros se cargan **solo en `prichouse.com`**. En previews (`*.pages.dev`) y en local no se envía nada a GA4 ni a Meta, para no ensuciar los datos de campaña. Para probar a propósito, abrir la página con `?ph-test=1`. |

**Los eventos de Meta NO están en GTM.** El contenedor de GTM solo tiene GA4. Si se agregan etiquetas de Meta en GTM, cada conversión se contaría dos veces.

## Eventos

Una acción = **un** evento por herramienta. Ningún evento lleva nombre, teléfono, email, ubicación ni el texto del mensaje.

| Evento | Cuándo | Parámetros (GA4) | GA4 | Meta |
| --- | --- | --- | --- | --- |
| `generate_lead` | Envío válido de un formulario (abre WhatsApp con el mensaje armado) | `page_type`, `form_id`, y según el formulario: `interest`, `model_interest` + `land_status`, `project_type` | **Evento clave** | `Lead` |
| `model_inquiry` | «Consultar este modelo» (Civil) / «Consultar configuración» (Empresas) | `page_type`, `model_family`, `model_name`, `value`, `currency`, `cta_location` | **Evento clave** (con valor) | `Lead` con `value` y `currency` |
| `whatsapp_click` | Cualquier otro enlace a WhatsApp | `page_type`, `cta_location`, `cta_text` | Conversión **secundaria** (observación) | `Contact` |

Además, el Pixel registra `PageView` en cada página y `ViewContent` en Civil y en Empresas (solo con consentimiento de Publicidad).

Un clic en un modelo dispara solo `model_inquiry` (no además `whatsapp_click`). Un formulario inválido no dispara nada.

`page_type` vale `home`, `civil`, `empresas`, `privacidad` o `404`.

## Datos que faltan

| Dato | Dónde va | Estado |
| --- | --- | --- |
| ID del contenedor de GTM (`GTM-XXXXXXX`) | `js/analytics.js`, constante `GTM_ID` | **Pendiente.** Con el ID vacío, GA4 no se carga. |
| ID de medición de GA4 (`G-XXXXXXXXXX`) | Variable `Const - GA4 ID` del contenedor de GTM | **Pendiente.** |
| Pixel de Meta | `js/analytics.js`, constante `META_PIXEL_ID` | Cargado: `1963379867965591` (dato entregado por PRIC HOUSE). Falta verificarlo en Events Manager. |
| Acceso a Google Analytics y Tag Manager | Cuenta de PRIC HOUSE | **Pendiente.** No se crearon propiedades ni contenedores. |

## Poner en marcha GA4 (cuando haya acceso)

1. Crear la propiedad GA4 y un flujo web para `prichouse.com`; copiar el ID `G-…`.
2. Crear un contenedor web de GTM para `prichouse.com`; copiar el ID `GTM-…` y pegarlo en `GTM_ID`.
3. En GTM: **Administrar → Importar contenedor** → `gtm/contenedor-prichouse.json` → *Existente → Default Workspace* → *Combinar → Sobrescribir*.
4. Editar la variable `Const - GA4 ID` con el ID `G-…`. El contenedor trae la etiqueta de Google, tres etiquetas de evento GA4 (con sus parámetros) y los tres activadores.
5. En **Configuración de la etiqueta** de Google: activar *Consent Mode* (las señales ya las envía el sitio). Las etiquetas de GA4 deben exigir `analytics_storage`.
6. **Vista previa de GTM** sobre una página de prueba con `?ph-test=1` (por ejemplo `https://desarrollo-claude.pric-web.pages.dev/?ph-test=1`): aceptar las cookies y comprobar que cada acción dispara una sola etiqueta.
7. Publicar el contenedor.
8. En GA4, cuando cada evento haya llegado al menos una vez (**Administrar → Eventos**): marcar `generate_lead` y `model_inquiry` como **eventos clave**. `whatsapp_click`: evaluar como conversión secundaria. Registrar `model_name`, `cta_location` y `page_type` como dimensiones personalizadas.
9. Considerar la medición **activa solo después** de verlo en GA4 → *Informes en tiempo real*, no antes.

## Validar el Pixel de Meta

1. Instalar **Meta Pixel Helper** en Chrome y abrir `https://prichouse.com/` (producción, o una página de prueba con `?ph-test=1`).
2. Antes de aceptar cookies, el Helper **no debe detectar ningún píxel**.
3. Aceptar *Publicidad*: debe aparecer el Pixel `1963379867965591` con `PageView`; en Civil y Empresas, también `ViewContent`.
4. Probar un clic en «Consultar este modelo» (`Lead` con valor), un botón de WhatsApp (`Contact`) y un formulario completo (`Lead`). Cada acción debe verse **una sola vez**.
5. En **Events Manager → Probar eventos** confirmar que llegan y que no figuran duplicados.

## Pruebas automáticas realizadas (en un navegador real, sin enviar datos a terceros)

56 comprobaciones sobre el aviso, el consentimiento y los eventos (Home, Civil, Empresas, Privacidad y 404), entre ellas: ningún pedido a Meta/Google antes de decidir, un evento por acción, ningún dato personal en los eventos, retiro del consentimiento con borrado de cookies, orden de las señales de Consent Mode (`default` → `update` → `gtm.js`) y bloqueo de terceros fuera de `prichouse.com`.

## Notas

- El formulario no envía datos a un servidor: el contacto real se concreta en WhatsApp. `generate_lead` mide la intención declarada (formulario completo y válido), no un mensaje efectivamente enviado.
- El Pixel base de Meta es el código oficial; el archivo `pixel-prichouse.html` entregado no se pega en las páginas: su contenido (código base, `ViewContent`, `Contact` y `Lead`) está integrado y condicionado al consentimiento en `js/analytics.js`.
