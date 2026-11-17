# Propuestas posteriores al lanzamiento — PRIC HOUSE

Mejoras que **no impiden empezar las campañas**. Ninguna está implementada: requieren aprobación y, en varios casos, información comercial que hoy no está confirmada (ver `PENDIENTES.md`). No se crearon páginas nuevas ni se publicó información pendiente.

## Resumen y prioridad sugerida

| # | Propuesta | Impacto | Esfuerzo | Depende de |
| --- | --- | --- | --- | --- |
| 1 | Contenido de Empresas en el HTML inicial | Alto (SEO, redes, IA) | Medio (½–1 día) | Nada |
| 2 | Nuevas preguntas frecuentes de Civil | Medio | Bajo | Respuestas validadas |
| 3 | Mejor exposición de características, precios y condiciones | Alto (conversión) | Medio | Fichas técnicas y condiciones |
| 4 | Páginas individuales por modelo | Alto (SEO y anuncios por modelo) | Alto | Fotos, planos y fichas por modelo |
| 5 | Contenido SEO informativo (guías) | Alto a mediano plazo | Continuo | Revisión comercial de cada nota |
| 6 | Pendientes técnicos menores | Bajo | Bajo | — |

---

## 1. Contenido de Empresas en el HTML inicial

**Situación.** En `/empresas/`, las aplicaciones (gastronomía, deportes, turismo) y las 16 configuraciones con precios se generan con JavaScript a partir de `APLICACIONES` y `PRODUCT_FAMILIES`. En el HTML que entrega el servidor esos textos y precios **no existen** (verificado en la preview). Google ejecuta JavaScript y los indexa, pero:

- otros buscadores, las vistas previas de WhatsApp y redes, y los asistentes de IA que leen la web pueden no verlos;
- quien navega sin JavaScript solo ve el aviso del `<noscript>`.

**Opciones.**

| Opción | Cómo | A favor | En contra |
| --- | --- | --- | --- |
| A. Pre-renderizado en el build (recomendada) | Un script de Node (`scripts/prerender.mjs`) lee los datos de un `empresas/data.json`, escribe el HTML de los bloques dentro de `empresas/index.html` y Cloudflare Pages lo ejecuta como comando de build. El JS actual solo maneja los selectores. | Una sola fuente de datos; HTML completo para todos los lectores; sin librerías | Agrega un paso de build a Pages (hoy no hay) |
| B. HTML estático escrito a mano | Copiar los bloques al HTML y dejar que el JS solo cambie pestañas | Sin build | Precios y textos duplicados: riesgo de que se contradigan |
| C. Dejar como está | — | Sin trabajo | Depende de que cada lector ejecute JS |

**Recomendación:** opción A. Mantiene el principio actual de "una sola fuente de datos" y resuelve también los datos estructurados (hoy se generan en el navegador).

## 2. Nuevas preguntas frecuentes de Civil (borradores)

Preguntas que suelen frenar la decisión y que hoy no responde el sitio. **Las respuestas son borradores para validar con el área comercial; no se publican tal cual.** Lo que está entre corchetes requiere confirmación.

1. **¿Qué tiene que tener mi terreno?** Acceso para el camión de traslado y espacio para maniobrar; terreno [nivelado / con base]. Lo evaluamos al preparar la propuesta. *[Confirmar requisitos mínimos]*
2. **¿Qué base o fundación necesita la casa?** *[Confirmar: platea, pilotes, quién la ejecuta y si está incluida]*
3. **¿Incluye las conexiones de agua, luz, gas y cloacas?** *[Confirmar alcance; hoy el sitio no lo promete]*
4. **¿Necesito permisos municipales?** *[Confirmar si PRIC HOUSE asesora o gestiona; varía según el municipio]*
5. **¿Qué diferencia hay entre Standard y Deluxe?** Respuesta a partir de una ficha comparativa (ver propuesta 3).
6. **¿Puedo ampliar la casa más adelante?** El sistema modular admite sumar módulos o una galería. *[Confirmar condiciones técnicas]*
7. **¿Qué garantía tiene?** *[Confirmar plazos y alcance]*
8. **¿Puedo ver una casa antes de decidir?** *[Si se confirma: showroom de Villa Allende, dirección y horarios]*
9. **¿Los precios incluyen IVA, flete e instalación?** *[Confirmar; hoy la FAQ dice que flete e instalación se cotizan según la ubicación]*
10. **¿Cómo funciona la seña y el cronograma de pagos?** *[Con las condiciones de facilidad de pago]*

Al publicarlas, el `FAQPage` de Schema.org se actualiza solo (se genera desde la FAQ visible).

## 3. Mejor exposición de características, precios y condiciones

Hoy las tarjetas muestran nombre, una descripción corta y el precio. Para decidir, el cliente necesita comparar y saber qué incluye el precio.

- **Comparativa Standard vs. Deluxe** debajo de las tarjetas: una tabla con revestimiento exterior, paneles, piso, carpinterías, cocina, baño y terminaciones. Hoy solo está documentado el 37 m² Deluxe (2 dormitorios, cocina en L, baño completo, revestimiento símil madera, paneles de 50 mm, piso SPC, carpinterías de aluminio). **Falta la ficha de Standard y de los modelos de 74 m².**
- **Leyenda de precios** junto a "Valores expresados en USD": qué incluye (módulo, flete, instalación, IVA), vigencia y forma de pago. *[Requiere condiciones confirmadas]*
- **Bloque "Qué incluye / qué no incluye"** cerca del formulario, alineado con el alcance del llave en mano cuando se confirme.
- **Ficha técnica descargable (PDF)** por modelo, útil para enviar por WhatsApp después de la consulta.
- **Planos** de cada modelo (37 y 74 m²): es el contenido que más ayuda a imaginar la casa y el que más se comparte.

## 4. Páginas individuales por modelo

Una página por modelo permite anuncios que llevan directo al modelo, URLs compartibles y posicionamiento por búsquedas específicas ("casa modular 2 dormitorios 37 m²").

- **Estructura de URLs sugerida:** `/civil/modelos/37-standard/`, `/civil/modelos/37-deluxe/`, `/civil/modelos/74-standard/`, `/civil/modelos/74-deluxe/` (las variantes con galería, como opción dentro de cada página). Para Empresas: `/empresas/configuraciones/sum-37/`, `/empresas/configuraciones/sum-74/`.
- **Contenido de cada página:** galería (exterior, interior, planta), plano, ficha técnica, precio y variantes, qué incluye, plazo estimado, preguntas frecuentes del modelo, formulario o WhatsApp con el modelo precargado, y Schema.org `Product` propio.
- **Requiere:** fotos y planos propios por modelo y fichas técnicas. Sugerencia: empezar por el **37 m² Deluxe**, que es el que más información tiene.
- Las tarjetas actuales enlazarían a cada página ("Ver modelo") manteniendo el botón de consulta.

## 5. Contenido SEO informativo

Guías en una sección `/guias/`, enlazadas desde Civil y Empresas. Cada nota responde una búsqueda real y termina con un llamado a la acción. **Cada texto debe validarse comercialmente antes de publicarse**, sobre todo cuando menciona precios, plazos o normativa.

| Guía | Búsqueda objetivo | Enlaza a |
| --- | --- | --- |
| ¿Cuánto cuesta una casa modular en Argentina? Qué incluye el precio | casa modular precio, casas modulares precios | Civil · modelos |
| Casa modular vs. construcción tradicional: tiempos, costos y diferencias | casa modular o construcción tradicional | Civil |
| Cómo preparar el terreno para una casa modular | terreno casa modular, base casa modular | Civil · FAQ |
| Permisos para instalar una casa modular en Córdoba | permiso casa modular Córdoba | Civil |
| Casas modulares para renta temporaria: cómo empezar con pocas unidades | casas modulares para alquilar, cabañas modulares | Emprendimientos · turismo |
| Glamping y cabañas modulares en viñedos y bodegas | glamping modular, cabañas en viñedos | Emprendimientos · turismo |
| SUM y cantinas modulares para clubes y complejos de pádel | SUM modular, cantina modular club | Emprendimientos · deportes |
| Cafetería modular: cómo abrir un local sin obra tradicional | cafetería modular, local modular | Emprendimientos · gastronomía |

## 6. Pendientes técnicos menores

- **Imágenes sin uso:** 72 MB de originales que ninguna página referencia (PNG del hero anterior, campamentos, borradores "ChatGPT Image…"). Borrarlos cuando las versiones WebP estén confirmadas en producción.
- **Logos de clientes:** algunos PNG pesan 50–80 KB; se pueden recomprimir sin cambiar su aspecto.
- **Consentimiento de cookies:** si se agregan Meta Pixel y Google Ads, evaluar un banner de consentimiento con Consent Mode de Google.
- **Páginas pendientes de definición:** Urbanizaciones y PRIC Construcciones (ver opciones en `PENDIENTES.md`).
