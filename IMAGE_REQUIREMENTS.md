# Inventario de imágenes — PRIC HOUSE

Auditoría visual de `index.html`, iniciada el 2026-08-27 como detección y
recomendaciones únicamente. Desde entonces se fueron resolviendo huecos a
medida que aparecieron assets reales (carrusel de logos, foto de "Quiénes
somos", card de Turismo) — cada sección de abajo indica si sigue pendiente
o ya se resolvió, y cuándo.

## Metodología

Se revisaron: todas las etiquetas `<img>` del HTML, el array `HERO_IMAGES` del
JS, el placeholder `.ph` de la vertical Corporativo, y el contenido completo
de la carpeta `imagenes/` (incluyendo archivos que **no** están referenciados
en el HTML). Se abrieron visualmente los archivos relevantes para evaluar
consistencia de producto, no solo nombres de archivo.

## Resumen ejecutivo

| # | Hallazgo | Tipo | Prioridad |
|---|----------|------|-----------|
| IMG-01 | Vertical **Corporativo** — **resuelto 2026-08-27**, se reubicó ahí la foto de equipo que antes estaba en IMG-05 | Resuelto | — |
| IMG-02 | Vertical **Civil** — **resuelto 2026-08-27**, foto nueva + bug de ruta corregido de paso | Resuelto | — |
| IMG-03 | Card "Sector minero" — **resuelto 2026-08-27**, foto nueva + bug de ruta corregido de paso | Resuelto | — |
| IMG-04 | `imagen-hero-2.png` referenciada en ruta rota (degrada bien, pero falta 1 de 6 fotos del hero) | Bug de ruta | Media |
| IMG-05 | Bloque "Quiénes somos" — vuelve a estar sin imagen (ver nota abajo) | Falta | Media |
| IMG-06 | Carrusel de 11 clientes — resuelto, sin tarjetas, tamaños equilibrados, **5 de 11 en color real** (actualizado 2026-09-01) | Resuelto | — |
| IMG-07 | Card "Turismo y hospitality" de Posibles Proyectos — **resuelto 2026-08-27**, imagen reemplazada por una nueva generada a medida | Resuelto | — |
| IMG-08 | Assets sin usar en `imagenes/` (11 archivos) — varios de altísima calidad, hoy desperdiciados | Oportunidad / limpieza | Baja–Media |

**El hallazgo más importante no es una imagen que falta, sino imágenes que ya
existen y no se están usando.** Ver IMG-08: hay fotografía aérea/dron real,
profesional, de un campamento modular a gran escala (contenedores blancos,
mismo lenguaje visual que `vertical-empresas.png`) completamente sin wirear
en el sitio. Varias de esas fotos son candidatas directas para tapar IMG-01
sin necesidad de encargar fotografía nueva.

---

## IMG-01 — RESUELTO (2026-08-27)

**Sección:** Vertical Corporativo (dentro de "Nuestras verticales")
**Uso:** Fondo de card — panel 03/03 "CORPORATIVO"
**Actualización:** se reubicó acá la foto que originalmente se había puesto
en el bloque "Quiénes somos" (ver IMG-05) — tres personas caminando entre
unidades modulares blancas al atardecer, cordillera de fondo. El usuario
pidió moverla porque encajaba mejor con el argumento de Corporativo
("capacidad técnica y estructura corporativa") que con "Quiénes somos".
Reemplaza el placeholder `<div class="ph">Imagen real pendiente</div>` que
tenía el panel. Archivo: `imagenes/corporativo-equipo.jpg` (renombrado desde
`quienes-somos-equipo.jpg` para reflejar su nuevo destino).
**Texto alternativo aplicado:** "Equipo de PRIC HOUSE recorriendo un
campamento modular, capacidad operativa del sistema."
**Prioridad:** Resuelta.

---

## IMG-02 — RESUELTO (2026-08-27)

**Sección:** Vertical Civil (dentro de "Nuestras verticales")
**Uso:** Fondo de card — panel 01/03 "CIVIL"
**Actualización:** el usuario proveyó una foto nueva generada a medida
(misma línea residencial en madera, unidad individual en un jardín con
deck y living exterior). De paso quedó resuelto el bug de ruta original:
se guardó directamente como `imagenes/vertical-civil.jpg` (la ruta que el
HTML ya esperaba) y se eliminó el archivo huérfano que estaba suelto en la
raíz del repo (`./vertical-civil.png`), que ya no hacía falta.
**Optimización aplicada:** el original (PNG, 2.6MB, 1672×941px) se
reconvirtió a JPEG calidad 88 → 405KB, sin pérdida visible.
**Texto alternativo:** se mantuvo el `alt` existente ("Vivienda modular
PRIC HOUSE con revestimiento símil madera instalada en un terreno
particular"), que sigue siendo preciso para la nueva imagen.
**Prioridad:** Resuelta.

---

## IMG-03 — RESUELTO (2026-08-27)

**Sección:** Posibles Proyectos — card 02, "Sector minero"
**Uso:** Foto de la card ("Bases modulares para operaciones mineras en altura")
**Actualización:** el usuario proveyó una foto nueva generada a medida
(conjunto de unidades modulares blancas en un campamento minero de
montaña, camioneta en primer plano, cordillera de fondo) que reemplazó a
`caso-mineria-san-juan.png`. Guardada directamente en la ruta correcta
(`imagenes/caso-mineria-san-juan.png`), lo que de paso corrigió el bug de
ruta que ya estaba anotado (el archivo vivía suelto en la raíz del repo).
Se eliminó el archivo huérfano de la raíz. Dimensiones 1672×941px — 16:9
exacto, coincide con `.media-frame--16-9` que ya usaba esta card. Se
mantuvo el PNG (2.6MB) sin recomprimir, en línea con el resto de las fotos
de esta misma grilla de cards (`caso-vaca-muerta.png`, `caso-turismo-cordoba.png`),
que pesan similar.
**Texto alternativo:** se mantuvo el `alt` existente ("Base modular PRIC
HOUSE en entorno minero de montaña, con vehículos y cordillera de fondo"),
que sigue siendo preciso.
**Prioridad:** Resuelta.

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

**Sección:** Clientes / Validación — bloque "Quiénes somos"
**Uso:** Foto de apoyo del bloque (eyebrow + título + párrafo)
**Historial:** el 2026-08-27 se había agregado acá una foto (tres operarios
caminando entre unidades modulares blancas, atardecer) que el usuario
proveyó generada a medida. Más tarde, el mismo día, se decidió mover esa
foto al panel Corporativo en su lugar (ver IMG-01) porque encajaba mejor
con ese argumento. El contenedor `.quienes-media` que se había creado para
alojarla se quitó del CSS. El bloque "Quiénes somos" volvió a ser solo
texto (eyebrow + título + párrafo), como estaba antes de esa foto.
**Imagen propuesta:** Sigue siendo válida la recomendación original — una
foto de equipo/personas trabajando (no solo edificios). Candidatos ya
existentes sin usar en el repo: `imagenes/imagen 3.png` (interior nocturno
con equipo comiendo/reunido) o `imagenes/ChatGPT Image 14 ago 2026,
11_53_02 a.m. (2).png` (dos operarios caminando junto a unidades
modulares). También puede generarse una nueva con el mismo prompt usado
para la foto de IMG-01/IMG-07 (ver sección "Prompts de generación").
**Relación de aspecto:** 4:5 o 1:1, para un layout centrado como el de
esta sección.
**Prioridad:** Media — es una mejora, no un hueco bloqueante (la sección
funciona bien solo con texto, como confirma su estado actual).

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

| Cliente | Archivo | Altura individual asignada |
|---|---|---|
| Aeropuertos Argentina | `imagenes/logo-aeropuertos-argentina.png` | 54px |
| Tostado Café Club | `imagenes/logo-tostado-cafe-club.png` | 46px |
| Farmacias Red | `imagenes/logo-farmacias-red.png` | 43px |
| CNH Industrial | `imagenes/logo-cnh-industrial.png` | 42px |
| Yenny | `imagenes/logo-yenny.png` | 34px |
| Andrea Nahás | `imagenes/logo-andrea-nahas.png` | 30px |
| Assist Card | `imagenes/logo-assist-card.png` | 29px |
| ShopGallery | `imagenes/logo-shopgallery.png` | 25px |
| Dufry | `imagenes/logo-dufry.png` | 25px |
| Sullair | `imagenes/logo-sullair.png` | 21px |
| EANA | `imagenes/logo-eana.png` | 18px |

**Actualización 2026-09-01 — se quitó la placa clara:** el usuario pidió
sacar el formato de tarjeta y que los logos floten directo sobre el fondo
oscuro. Como los 11 archivos tenían fondo sólido "horneado" (sin canal
alfa — ni el JPG de Aeropuertos ni los 10 PNG de "ChatGPT Image"), esta vez
sí hizo falta quitarles el fondo de verdad, no solo taparlo. Se implementó
con un script propio (`.NET`/`System.Drawing`, sin librerías nuevas): por
cada archivo, se muestrea el color de fondo real desde sus propias
esquinas y se aplica un umbral de distancia de color con degradé suave
(no un corte binario), para que el borde de cada letra quede
antialiaseado en vez de dentado. Se verificó visualmente cada logo
compuesto sobre el `#1A1D1F` real del sitio antes de aplicarlo — sin halos,
sin recortes en detalles finos (el `®` de Farmacias Red y Sullair, la
línea divisoria de EANA, el ícono de Tostado). El JPG de Aeropuertos se
reconvirtió a PNG con alfa (ya no existe como `.jpg`).

**Tamaños individuales por logo:** en vez de una altura uniforme (que
hacía que EANA se viera enorme y Aeropuertos/Tostado casi invisibles, por
lo distintas que son sus proporciones), cada logo tiene su propia altura
en CSS (selector por atributo `img[src$="archivo.png"]`), calculada para
que el *área* renderizada de cada uno sea comparable — ver tabla arriba.
**No se redibujó ni reinterpretó ningún logo** en ningún momento — el
contenido gráfico de cada archivo es el mismo desde que se recibió.

**Pendiente de mejora (no bloqueante):** sigue sin haber compresión PNG
dedicada disponible en este entorno (`pngquant`/`oxipng`) para los 6 logos
que siguen en PNG monocromático. También seguiría siendo ideal reemplazarlos
por SVG vectoriales originales si PRIC los consigue.
**Texto alternativo aplicado:** sin cambios (ver tabla de `alt` de la
versión anterior de esta sección — se mantienen los mismos 11).

**Actualización 2026-09-01 — tamaños más grandes + color real en 5 de 11:**

1. **Tamaños:** se escalaron todas las alturas individuales ~1.6x (ver
   tabla actualizada abajo). De paso se encontró y corrigió un bug: el
   recorte de transparencia dejaba un residuo de alfa muy bajo (2-7%) en
   el fondo de varios archivos, invisible a tamaño chico pero visible como
   un recuadro fantasma al agrandarlos. Se corrigió el muestreo de color
   de fondo (antes tomaba 1 solo píxel de esquina; ahora usa la mediana de
   ~320 píxeles del borde) y se reprocesaron los 11 desde las fuentes
   limpias — verificado que no queda ningún rastro.

2. **Color real:** se investigó si convenía reemplazar los logos generados
   por IA (monocromáticos desde el origen — no eran fotos a color
   desaturadas, así que el `filter:grayscale(0)` en `:hover` no tenía
   nada que revelar) por assets oficiales de cada marca. Se encontraron y
   verificaron **5 de 11** en fuentes confiables:
   - **Sullair** (verde `#007b40`), **Dufry** (rojo `#e00014`),
     **Aeropuertos Argentina** (azul `#002C9F`) y **CNH Industrial**
     (bordó `#a32428`): SVG oficiales de Wikimedia Commons, verificados
     por color de relleno y usados directamente como `.svg` (mejor que
     PNG: nitidez perfecta a cualquier tamaño/densidad de pantalla).
   - **EANA** (azul `#1269b0`/celeste `#37bbed`): PNG con transparencia
     real tomado directo del sitio oficial `eana.com.ar`.
   - Los otros 6 (Assist Card, Yenny, ShopGallery, Farmacias Red, Tostado
     Café Club, Andrea Nahás) no aparecieron con una fuente oficial
     confiable en la búsqueda — quedan igual que antes (PNG monocromático,
     sin color real detrás del hover).
   - El logo de Aeropuertos Argentina real tiene una composición horizontal
     muy distinta a la versión generada por IA (que era casi cuadrada), así
     que su altura individual se recalculó (86px → 54px) para mantener el
     mismo criterio de área visual equivalente.
   - **Nota de verificación:** no había forma de renderizar SVG a imagen en
     este entorno (sin Inkscape/rsvg/Cairo disponibles) para una
     comprobación visual final de los 4 SVG — se verificó por otra vía:
     código fuente de cada archivo (colores de relleno coinciden con los
     colores de marca reales conocidos) y la fuente (Wikimedia Commons,
     confiable). EANA sí se pudo verificar visualmente (PNG).

**Estado final de tamaños (2026-09-01):**

| Cliente | Archivo | Altura |
|---|---|---|
| Aeropuertos Argentina | `imagenes/logo-aeropuertos-argentina.svg` | 54px |
| Tostado Café Club | `imagenes/logo-tostado-cafe-club.png` | 74px |
| Farmacias Red | `imagenes/logo-farmacias-red.png` | 69px |
| CNH Industrial | `imagenes/logo-cnh-industrial.svg` | 67px |
| Yenny | `imagenes/logo-yenny.png` | 54px |
| Andrea Nahás | `imagenes/logo-andrea-nahas.png` | 48px |
| Assist Card | `imagenes/logo-assist-card.png` | 46px |
| ShopGallery | `imagenes/logo-shopgallery.png` | 40px |
| Dufry | `imagenes/logo-dufry.svg` | 40px |
| Sullair | `imagenes/logo-sullair.svg` | 34px |
| EANA | `imagenes/logo-eana.png` | 29px |

**Prioridad:** Resuelta — los 6 logos sin color real quedan como mejora
opcional si PRIC consigue sus marcas oficiales (ver lista arriba).

---

## IMG-07 — RESUELTO (2026-08-27)

**Sección:** Posibles Proyectos — card 03, "Turismo y hospitality"
**Uso:** Foto de la card
**Actualización:** el usuario proveyó una foto nueva generada a medida
(cluster de cabañas con revestimiento de madera oscura y marco negro,
integradas a un entorno de lomas verdes con árboles, luz de atardecer) que
reemplazó a `caso-turismo-cordoba.png` en el mismo archivo/ruta (no hizo
falta tocar el HTML). Dimensiones originales 1672×941px — 16:9 exacto,
coincide con `.media-frame--16-9` que ya usaba esta card. El `alt` existente
("Complejo turístico de viviendas modulares PRIC HOUSE integrado al paisaje
serrano de Córdoba") se revisó y sigue siendo preciso para la nueva imagen,
no se modificó.

**Sobre la pregunta abierta que dejé antes** (¿la línea de madera es un
producto PRIC HOUSE real o no?): al recibir una imagen nueva generada
específicamente en esa misma línea de revestimiento de madera (en vez de
la línea de contenedores blancos que yo había sugerido en el prompt de
IMG-07 original), interpreto que **la línea residencial en madera es la
dirección de diseño confirmada** para Civil/Turismo, y la línea de
contenedores blancos queda para Empresas/Corporativo/Posibles Proyectos
industrial. Vale la pena que el equipo lo confirme explícitamente, pero ya
no lo trato como bloqueante.
**Prioridad:** Resuelta.

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

## Prompts de generación (2026-08-27)

> **Actualización posterior (mismo día):** IMG-07 e IMG-05 ya se resolvieron
> con imágenes generadas a medida que el usuario proveyó directamente (ver
> sus secciones arriba). Los prompts de abajo quedan como referencia del
> criterio usado y por si hace falta variantes adicionales. IMG-01 sigue
> pendiente (puede cubrirse con un asset existente o con el prompt de acá).

Antes de generar nada: **IMG-02, IMG-03 e IMG-04 no necesitan imagen nueva**
— son archivos que ya existen pero están mal ubicados (raíz del repo en vez
de `imagenes/`); ahí lo que corresponde es mover el archivo, no generar.
**IMG-01** e **IMG-05** ya tienen candidatos reales sin usar en el repo
(ver sección IMG-08) que podrían cubrir el hueco sin generar nada. Los
prompts de acá abajo son para cuando se prefiera un asset nuevo y a medida
en vez de reutilizar uno existente, y para **IMG-07**, que es el único caso
donde no hay ningún asset real disponible en el repo.

Estilo base común, extraído de las fotos reales que ya están en `imagenes/`
(`50/100/300 personas.png`, `imagen 1/2/3.png`, `vertical-empresas.png`,
`respaldo-pric-construcciones.png`): fotografía aérea/de drone real (no
render 3D, no ilustración), luz dorada de atardecer/dusk con cielo en
degradé naranja a azul, unidades modulares blancas/gris claro con marco de
puertas y ventanas oscuro, dispuestas en filas ordenadas, paisaje árido con
montañas o mesetas de fondo, caminos de tierra, cercos perimetrales,
camionetas estacionadas, postes de luz. Tono editorial/arquitectónico,
premium, minimalista. Sin texto, sin logos, sin marcas de agua.

### Prompt — IMG-07 (Posibles Proyectos, card "Turismo y hospitality")

Prioridad alta: es la única imagen genuinamente faltante del sitio (ninguna
imagen actual muestra el sistema real de PRIC HOUSE en un uso turístico).

```
Aerial drone photograph, golden-hour lighting, of a small boutique
glamping/lodging complex made of white modular container units with dark
window and door trim, arranged in a loose cluster (not a rigid grid) among
the green rolling hills and sparse native trees of the Sierras de Córdoba,
Argentina. Each unit has a covered wood deck or terrace facing the view.
Gravel paths connect the units, with simple landscaping (native grasses,
stone accents). A small shared common area with outdoor seating is
visible. Warm late-afternoon sunlight, long soft shadows, blue-to-orange
gradient sky. Photographed from a 3/4 elevated drone angle, wide shot
showing the units integrated into the landscape. Professional real-estate
/architectural photography style, sharp focus, high dynamic range,
realistic — not a 3D render, not an illustration. 16:9 aspect ratio.
No people in close-up, no text, no logos, no watermark.
```
Relación de aspecto: 16:9. Resolución: mínimo 1920×1080px.

### Prompt — IMG-01 (panel Corporativo) — opcional, alternativa a reusar asset existente

```
Photograph of the central administrative building of a large-scale modular
camp complex, at dusk/blue hour with warm interior lighting glowing
through large glass windows. The building is constructed from white
modular container units combined into a larger structure with a dark
metal gable roof, glass double-door entrance, and exterior wall-mounted
lighting. In the background, rows of smaller white modular container
units (housing/offices) recede into the arid landscape under a darkening
sky with warm sunset colors on the horizon. A few pickup trucks are
parked nearby. Vertical 4:5 composition, three-quarter elevated angle.
Professional architectural photography, realistic, sharp, high dynamic
range, premium and orderly feel. No people in close-up, no text, no
logos, no watermark.
```
Relación de aspecto: 4:5 o 3:4. Resolución: mínimo 1600×2000px.

### Prompt — IMG-05 (bloque "Quiénes somos") — opcional, alternativa a reusar asset existente

```
Photograph at human eye level, golden-hour lighting, showing two or three
people in casual workwear (no visible logos or branding) walking or
conversing along a gravel path between rows of white modular container
units, in an arid landscape with distant mountains. Warm low sunlight
casting long shadows, some units have illuminated windows. Composition is
candid and natural, not posed for the camera — people mid-stride or in
conversation, seen from a moderate distance, faces not the focus. Square
or 4:5 vertical crop. Professional editorial/architectural photography
style, realistic, warm and premium tone, matching real estate/corporate
photography. No text, no logos, no watermark, no sharp close-up faces.
```
Relación de aspecto: 1:1 o 4:5. Resolución: mínimo 1600×1600px.

---

## No incluido en este inventario

- **`imagenes/reserva-turismo-cordoba-alt.png`**: tercera foto que el
  usuario adjuntó junto con las de IMG-05/IMG-07 (mismo cluster de cabañas
  de madera, pero con una pareja caminando en primer plano). No se usó en
  ningún lado todavía — queda guardada como variante de reserva por si se
  quiere reemplazar la card de Turismo por una versión con personas, o
  usarla en otra sección más adelante.
- **Logo y variantes** (`Logo Pric...`): fuera de alcance explícito de esta
  auditoría (branding).
- **Imágenes ya usadas y correctas**: `logo-pric-house.png`,
  `quienes-somos-pric-house.png`, `vertical-empresas.png`,
  `respaldo-pric-construcciones.png`, `caso-vaca-muerta.png`,
  `imagen-hero-1.png`, `imagen-hero-3/4/5/6.png` — revisadas, sin problemas
  detectados.
