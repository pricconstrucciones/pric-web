# Inventario de imágenes — PRIC HOUSE

Auditoría visual de `index.html` realizada el 2026-08-27. Incluye únicamente
detección y recomendaciones — **no se agregó ni se referenció ninguna imagen
nueva en el HTML**. Los cambios de código de esta actualización (email,
WhatsApp, sección "Posibles proyectos") no dependen de nada de lo listado acá.

## Metodología

Se revisaron: todas las etiquetas `<img>` del HTML, el array `HERO_IMAGES` del
JS, el placeholder `.ph` de la vertical Corporativo, y el contenido completo
de la carpeta `imagenes/` (incluyendo archivos que **no** están referenciados
en el HTML). Se abrieron visualmente los archivos relevantes para evaluar
consistencia de producto, no solo nombres de archivo.

## Resumen ejecutivo

| # | Hallazgo | Tipo | Prioridad |
|---|----------|------|-----------|
| IMG-01 | Vertical **Corporativo** sin imagen (placeholder activo) | Falta | Alta |
| IMG-02 | `vertical-civil.png` referenciada en ruta rota (imagen existe, está mal ubicada) | Bug de ruta | Alta |
| IMG-03 | `caso-mineria-san-juan.png` referenciada en ruta rota (ídem) | Bug de ruta | Alta |
| IMG-04 | `imagen-hero-2.png` referenciada en ruta rota (degrada bien, pero falta 1 de 6 fotos del hero) | Bug de ruta | Media |
| IMG-05 | Bloque "Quiénes somos" (sección Validación) sin imagen de apoyo | Mejora | Media |
| IMG-06 | Carrusel de 11 clientes — **resuelto 2026-08-27**, los 11 logos se encontraron y se incorporaron | Resuelto | — |
| IMG-07 | Card "Turismo y hospitality" de Posibles Proyectos: a confirmar línea de producto | A confirmar | Media |
| IMG-08 | Assets sin usar en `imagenes/` (11 archivos) — varios de altísima calidad, hoy desperdiciados | Oportunidad / limpieza | Baja–Media |

**El hallazgo más importante no es una imagen que falta, sino imágenes que ya
existen y no se están usando.** Ver IMG-08: hay fotografía aérea/dron real,
profesional, de un campamento modular a gran escala (contenedores blancos,
mismo lenguaje visual que `vertical-empresas.png`) completamente sin wirear
en el sitio. Varias de esas fotos son candidatas directas para tapar IMG-01
sin necesidad de encargar fotografía nueva.

---

## IMG-01

**Sección:** Vertical Corporativo (dentro de "Nuestras verticales")
**Uso:** Fondo de card — panel 03/03 "CORPORATIVO"
**Imagen actual:** Falta. El HTML tiene un placeholder explícito activo:
`<div class="ph"><span>Imagen real pendiente</span></div>` (el propio código
ya marca este hueco).
**Imagen propuesta:** Dos caminos posibles:
1. **Reusar un asset ya existente y sin usar** (`imagenes/300 personas.png` o
   `imagenes/imagen 3.png`) — ambas son fotografía aérea/interior real de
   altísima calidad de un campamento modular a gran escala, con foco en
   escala/capacidad e instalaciones comunes (comedor, oficinas), lo cual
   comunica muy bien "trayectoria, capacidad técnica" sin necesidad de
   fotografía nueva.
2. Si PRIC prefiere algo más institucional (marca, no proyecto): foto de
   equipo/oficina central de PRIC Construcciones.
**Arquitectura / producto:** Si se usa la opción 1: complejo modular de
decenas de unidades tipo contenedor blanco, edificio central de usos
comunes, en entorno industrial/desértico, escala grande (+50 unidades).
**Encuadre:** Aérea / dron, vista general del conjunto (ya cumplido por las
opciones propuestas).
**Relación de aspecto:** El panel no tiene `aspect-ratio` fijo — el
`.media-frame` cubre absolutamente un contenedor de `min-height:560px`
(3 columnas ≈420px de ancho en desktop, ancho completo apilado en mobile).
Subir en una relación cercana a **4:5 o 3:4** para que el `object-fit:cover`
no recorte mal ni en desktop ni en mobile.
**Resolución recomendada:** mínimo 1600×2000px (o el archivo original si es
mayor).
**Tratamiento visual:** Ya coincide con el resto del sitio: fotografía real,
tonos cálidos de atardecer/dusk, paisaje árido, misma familia visual que
`vertical-empresas.png` y `respaldo-pric-construcciones.png`.
**Texto alternativo propuesto:** "Campamento modular PRIC HOUSE de gran
escala, vista aérea, mostrando la capacidad técnica del sistema."
**Prioridad:** Alta (es el único hueco visual explícito y visible del sitio).

---

## IMG-02

**Sección:** Vertical Civil (dentro de "Nuestras verticales")
**Uso:** Fondo de card — panel 01/03 "CIVIL"
**Imagen actual:** **Existe pero está mal referenciada.** El HTML apunta a
`./imagenes/vertical-civil.png`, que no existe en esa carpeta — el archivo
real está suelto en la raíz del repo (`./vertical-civil.png`). Resultado:
ícono de imagen rota en producción. Confirmé visualmente el archivo de la
raíz: es una foto real y correcta (unidad modular revestida en madera,
estilo residencial/tiny-house, coherente con "Civil").
**Imagen propuesta:** No hace falta una imagen nueva — mover/copiar el
archivo existente de la raíz a `imagenes/vertical-civil.png` (o corregir la
ruta en el `<img>`) resuelve el problema por completo.
**Arquitectura / producto:** Unidad modular individual, revestimiento símil
madera, entorno residencial/jardín.
**Encuadre:** Fotografía arquitectónica exterior, vista 3/4, cámara a nivel
humano (ya cumplido por el archivo existente).
**Relación de aspecto:** Igual que IMG-01 (sin `aspect-ratio` fijo, cubre el
panel; el archivo actual funciona bien en 4:5/3:4).
**Resolución recomendada:** La del archivo actual es adecuada.
**Tratamiento visual:** Ya correcto — no requiere cambios, solo la ruta.
**Texto alternativo:** El `alt` actual ("Vivienda modular PRIC HOUSE con
revestimiento símil madera instalada en un terreno particular") es preciso
y no necesita cambios.
**Prioridad:** Alta — es un bug visible en el sitio en vivo hoy mismo, no
una decisión de contenido. No lo corregí en este pase porque no fue pedido
explícitamente; avisen si quieren que lo resuelva.

---

## IMG-03

**Sección:** Posibles Proyectos — card 02, "Sector minero"
**Uso:** Foto de la card (antes "Base modular... entorno minero de San Juan")
**Imagen actual:** Mismo problema que IMG-02: `./imagenes/caso-mineria-san-juan.png`
no existe en `imagenes/`; el archivo real está en la raíz del repo
(`./caso-mineria-san-juan.png`). Confirmé visualmente: es una foto real y
coherente (contenedores blancos en entorno de montaña árida), consistente
con el resto de la línea "industrial" del sitio.
**Imagen propuesta:** Igual que IMG-02 — mover/copiar el archivo existente,
no hace falta fotografía nueva.
**Arquitectura / producto:** Conjunto de ~10 unidades modulares blancas,
entorno de cordillera/montaña árida.
**Encuadre:** Aérea/dron, vista general (ya cumplido).
**Relación de aspecto:** 16:9 (`media-frame--16-9`, ya usado en esta card).
**Resolución recomendada:** La del archivo actual (ya es de alta resolución).
**Tratamiento visual:** Correcto, sin cambios.
**Texto alternativo:** El `alt` actual es preciso, sin cambios necesarios.
**Prioridad:** Alta — mismo motivo que IMG-02, bug visible hoy.

---

## IMG-04

**Sección:** Hero (fondo rotativo)
**Uso:** Una de las 6 fotos que rotan cada 7s de fondo del hero
**Imagen actual:** `./imagenes/imagen-hero-2.png` no existe en `imagenes/`;
el archivo real está en la raíz (`./imagen-hero-2.png`). A diferencia de
IMG-02/03, esto **no se ve roto en pantalla**: el JS precarga las 6 imágenes
y descarta silenciosamente las que fallan (`onerror`), así que el hero sigue
funcionando con las 5 restantes — pero el sitio muestra menos variedad de la
diseñada.
**Imagen propuesta:** Igual que los anteriores, mover/copiar el archivo
existente. No hace falta fotografía nueva.
**Arquitectura / producto / encuadre:** No pude confirmar el contenido visual
de este archivo específico en esta auditoría (no llegué a abrirlo), pero por
el patrón del resto de `imagen-hero-*` debería ser una foto aérea/panorámica
de la línea industrial (contenedores blancos).
**Relación de aspecto:** Ancha, tipo 16:9 o más panorámica — se usa como
`background-size:cover` a pantalla completa.
**Resolución recomendada:** Mínimo 2400×1350px (fondo full-bleed, debe verse
nítido en pantallas grandes).
**Tratamiento visual:** Debe respetar el Ken Burns sutil ya aplicado por CSS
(zoom sin paneo agresivo) — esto es automático vía CSS, no depende del
archivo.
**Texto alternativo:** No aplica (es `background-image` puramente
decorativo, sin `<img>`/`alt`).
**Prioridad:** Media (degrada bien, pero conviene corregirlo).

---

## IMG-05

**Sección:** Clientes / Validación — bloque nuevo "Quiénes somos" (agregado
en la actualización anterior)
**Uso:** Actualmente es solo texto (eyebrow + título + párrafo), sin imagen
de apoyo, a diferencia de casi todas las demás secciones del sitio.
**Imagen actual:** No existe ninguna en este bloque específico (nunca la
tuvo — es contenido nuevo).
**Imagen propuesta:** Una foto de equipo/personas trabajando (no solo
edificios), para reforzar el mensaje "20 años de experiencia, puestos al
servicio de soluciones reales". Candidato ya existente sin usar:
`imagenes/imagen 3.png` (interior nocturno con equipo comiendo/reunido) o
`imagenes/ChatGPT Image 14 ago 2026, 11_53_02 a.m. (2).png` (dos operarios
caminando junto a unidades modulares).
**Arquitectura / producto:** Personas + unidades modulares en un mismo
encuadre (para transmitir "equipo", no solo "producto").
**Encuadre:** Vista a nivel humano, con personas visibles (distinto al resto
del sitio, que es mayormente aéreo/arquitectónico puro).
**Relación de aspecto:** 4:5 o 1:1, para funcionar bien en un layout
centrado como el de esta sección.
**Resolución recomendada:** 1600×2000px o similar.
**Tratamiento visual:** Mismos tonos cálidos/dusk del resto del sitio.
**Texto alternativo propuesto:** "Equipo PRIC HOUSE trabajando junto a
unidades modulares en obra."
**Prioridad:** Media — es una mejora, no un hueco preexistente (la sección
es nueva y nunca tuvo imagen prevista en el diseño original).

---

## IMG-06 — RESUELTO (2026-08-27)

**Sección:** Clientes / Validación — carrusel de logos (`.marquee` /
`.cliente-item`)
**Uso:** Logotipos de clientes/referencias corporativas, en loop continuo
**Actualización:** el 2026-08-27 se encontraron los 11 logos reales en
`C:\Users\Win11\Desktop\clientes\` y se incorporaron al carrusel. Ya no
falta ninguno.

**Hallazgo importante:** el cliente que la lista original nombraba
"Andreani" en realidad corresponde al archivo `ChatGPT Image ... (7).png`,
cuyo logo dice **"Andrea Nahás"** — un nombre distinto (no es la empresa de
logística). Se usó el nombre que figura en el archivo. Vale la pena que
PRIC confirme cuál es el nombre comercial correcto antes de publicar.

**Estado final — 11 clientes, todos con logo real:**

| Cliente | Archivo | Formato original | Fondo |
|---|---|---|---|
| Aeropuertos Argentina | `imagenes/logo-aeropuertos-argentina.jpg` | JPG, ya venía en gris/mono | Blanco sólido |
| Assist Card | `imagenes/logo-assist-card.png` | PNG (ChatGPT Image), recortado y redimensionado | Gris claro sólido (~#F3F3F3) |
| CNH Industrial | `imagenes/logo-cnh-industrial.png` | ídem | ídem |
| Yenny | `imagenes/logo-yenny.png` | ídem | ídem |
| ShopGallery | `imagenes/logo-shopgallery.png` | ídem | ídem |
| Sullair | `imagenes/logo-sullair.png` | ídem | ídem |
| Andrea Nahás | `imagenes/logo-andrea-nahas.png` | ídem (antes nombrado "Andreani" en el pedido) | ídem |
| Dufry | `imagenes/logo-dufry.png` | ídem | ídem |
| Farmacias Red | `imagenes/logo-farmacias-red.png` | ídem | ídem |
| EANA | `imagenes/logo-eana.png` | ídem | ídem |
| Tostado Café Club | `imagenes/logo-tostado-cafe-club.png` | ídem | ídem |

**Cómo se resolvió el problema del fondo:** los 10 archivos "ChatGPT Image"
son PNG sin canal alfa (RGB sólido, fondo gris clarito ~#F3F3F3) y el JPG de
Aeropuertos tiene fondo blanco — ninguno es transparente. En vez de editar
los píxeles del logo (riesgo de halos/artefactos al recortar el fondo a
mano), cada `.cliente-item` ahora es una placa clara (`background:#F3F3F3`,
mismo criterio que el componente `.logo-plate` que ya usa el header para el
isotipo de PRIC HOUSE), y el logo se apoya arriba sin deformarse
(`object-fit:contain`). El color de la placa se sacó por muestreo directo
de los píxeles de fondo de los propios archivos, así que el borde no se nota.
**No se redibujó ni reinterpretó ningún logo** — el contenido gráfico de
cada archivo quedó intacto; solo se recortó el margen en blanco sobrante
alrededor (con .NET/`System.Drawing`, no a mano) y se redimensionó
proporcionalmente a 240px de alto.

**Pendiente de mejora (no bloqueante):** los archivos siguen pesando entre
77KB y 485KB cada uno — bastante para logos simples, porque no había
ImageMagick/`sharp` disponibles en este entorno para optimizar la
compresión (solo se pudo recortar y redimensionar con las herramientas de
.NET ya instaladas en Windows). Con una herramienta de compresión PNG
dedicada (`pngquant`, `oxipng`, TinyPNG, etc.) estos mismos archivos
deberían bajar a ~5-20KB cada uno sin pérdida visible. También sería ideal
reemplazarlos por versiones SVG vectoriales originales de cada marca si
PRIC las tiene, para nitidez perfecta a cualquier tamaño/densidad de
pantalla.
**Texto alternativo aplicado:** `alt="Logo Aeropuertos Argentina"`,
`alt="Logo Assist Card"`, `alt="Logo CNH Industrial"`, `alt="Logo Yenny"`,
`alt="Logo ShopGallery"`, `alt="Logo Sullair"`, `alt="Logo Andrea Nahás"`,
`alt="Logo Dufry"`, `alt="Logo Farmacias Red"`, `alt="Logo EANA"`,
`alt="Logo Tostado Café Club"` (solo en el set accesible; la copia
`aria-hidden="true"` que sostiene el loop visual usa `alt=""` a propósito).
**Prioridad:** Resuelta — queda como mejora opcional la compresión/vectores.

---

## IMG-07 — atención especial (pedida en el punto 7 del pedido)

**Sección:** Posibles Proyectos — card 03, "Turismo y hospitality"
**Uso:** Foto de la card
**Imagen actual:** Existe (`caso-turismo-cordoba.png`) y carga correctamente
(no es un bug de ruta). Al revisarla junto al resto de las fotos del sitio
encontré algo que vale la pena que el equipo confirme: **el sitio parece
mostrar dos líneas de producto visualmente distintas** —
1. Una línea "industrial": unidades contenedor blancas/metálicas (usada en
   `vertical-empresas.png`, `caso-vaca-muerta.png`, `caso-mineria-san-juan.png`,
   y en los assets sin usar de IMG-08).
2. Una línea "residencial": revestimiento en madera oscura, marco negro,
   estética tipo tiny-house/glamping (usada en `vertical-civil.png` y en
   `caso-turismo-cordoba.png`).

Si ambas son líneas de producto reales de PRIC HOUSE (residencial vs.
industrial), esto es completamente coherente y no hay que tocar nada — de
hecho refuerza bien la idea de "un mismo sistema, distintas aplicaciones".
Si en cambio la línea de madera **no** es un producto PRIC HOUSE real
(por ejemplo, si es una imagen de stock/referencia), conviene reemplazarla
antes de publicar, porque el copy nuevo de esta card ya no dice "caso real"
pero sigue implicando que es el sistema PRIC HOUSE aplicado a turismo.
**Imagen propuesta (si hace falta reemplazo):** La misma línea de
contenedores blancos que el resto del sitio, en una configuración/entorno
de tipo turístico (cabañas agrupadas, parque, zona de estar exterior).
**Prioridad:** Media — es una pregunta de contenido/verificación, no un bug
técnico.

---

## IMG-08

**Sección:** N/A — archivos en `imagenes/` que no están referenciados en
ningún lado del HTML.
**Imagen actual:** 11 archivos sin usar:
`100 personas.png`, `300 personas.png`, `50 personas.png`,
`ChatGPT Image 14 ago 2026, 11_53_02 a.m. (2).png`,
`ChatGPT Image 14 ago 2026, 11_53_03 a.m. (4).png`,
`ChatGPT Image 14 ago 2026, 11_53_15 a.m. (3).png`,
`ChatGPT Image 14 ago 2026, 11_53_15 a.m. (4).png`,
`ChatGPT Image 14 ago 2026, 11_53_16 a.m. (5).png`,
`ChatGPT Image 24 jun 2026, 09_44_17.png`,
`imagen 1.png`, `imagen 2.png`, `imagen 3.png`.
Además hay 2 variantes de logo sin usar (`Logo Pric negro transparente.png`,
`Logo Pric transparente.png`, `Logo pric.jpeg`) que no toqué por estar fuera
de alcance (branding/logo).
**Hallazgo:** De las que abrí (`50/100/300 personas.png`, `imagen 1/2/3.png`,
una de las `ChatGPT Image...`), **todas son fotografía real de alta calidad**
del mismo campamento modular industrial a gran escala — aéreas, interiores
de comedor/oficina, y tomas a nivel de calle con personal caminando. Son
justamente el tipo de imagen que faltaría para IMG-01 e IMG-05.
**Recomendación:** No es necesario encargar fotografía nueva para tapar los
huecos actuales — conviene primero decidir cuáles de estos 11 archivos usar
(ver IMG-01/IMG-05) y, del resto, evaluar si conservarlos como banco de
imágenes de respaldo o quitarlos del repo para no confundir a futuros
colaboradores.
**Prioridad:** Baja–Media (oportunidad de aprovechamiento / prolijidad del
repo, no bloquea nada).

---

## No incluido en este inventario

- **Logo y variantes** (`Logo Pric...`): fuera de alcance explícito de esta
  auditoría (branding).
- **Imágenes ya usadas y correctas**: `logo-pric-house.png`,
  `quienes-somos-pric-house.png`, `vertical-empresas.png`,
  `respaldo-pric-construcciones.png`, `caso-vaca-muerta.png`,
  `imagen-hero-1.png`, `imagen-hero-3/4/5/6.png` — revisadas, sin problemas
  detectados.
