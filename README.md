# RedWork — Frontend (V2)

Sitio completo de RedWork en Next.js (App Router) + TypeScript + Tailwind CSS v4.
Convive con `../V1`, que queda intacta como referencia de copy y datos.

## Arrancar

```bash
npm install
npm run dev
```

`npm run build` genera la versión de producción. Ojo: si el servidor de
desarrollo está corriendo, `build` sobrescribe `.next` y lo rompe; para y
vuelve a levantar `dev` después de compilar.

## Estructura

```
app/                     Rutas (una carpeta = una URL real, sin anclas)
  page.tsx               Home
  servicios/             Listado + [categoria] dinámica (SEO local)
  buscar/                Resultados del buscador (noindex)
  como-funciona/ profesionales/ planes/
  trabajos-realizados/   Galería filtrable por categoría y zona
  blog/ blog/[slug]/     Índice y post con Article schema
  nosotros/ faq/ contacto/
  terminos/ privacidad/  Placeholders legales honestos (noindex)
  robots.ts sitemap.ts   SEO técnico generado desde los datos
components/
  ui/                    Button, Card, Tabs, Icon, Spotlight, Primitivos
                         (Container, Section, SectionHeading, Badge,
                         FotoPendiente)
  layout/                Navbar (con menú Comunidad), Footer, Logo, MarcaR
  home/WidgetTracking    Demo animada de geolocalización (CSS puro)
  BuscadorServicios      Buscador (cliente) → /buscar?q=&zona=
  FormularioContacto     Formulario (cliente), pendiente de endpoint
lib/
  types.ts               Forma esperada de las respuestas de la API
  mock/                  Datos de ejemplo con esa misma forma
  data/index.ts          ÚNICO punto de acceso a datos (async)
  site.ts                Contacto, navegación, URL base
```

## Conectar la API real

Los componentes no importan nunca de `lib/mock`. Piden datos a las funciones
de `lib/data/index.ts`, que ya son `async`. Al conectar el backend:

1. Ajusta `lib/types.ts` al contrato real que definan con backend.
2. Cambia el cuerpo de cada función de `lib/data/index.ts` por un `fetch`.
3. Ningún componente ni página necesita tocarse.

Pendientes de endpoint: búsqueda (`/buscar`), envío del formulario de
contacto (`FormularioContacto`), y el feed real del widget de tracking.

## Sistema de diseño

Todos los tokens viven en `app/globals.css`, dentro de `@theme`
(Tailwind v4 configura el tema desde CSS, no hay `tailwind.config.ts`).

| Token | Valor | Uso |
|---|---|---|
| `--color-brand` | `#e4571e` | **Placeholder.** Naranja de marca. La V1 usaba `#e7711f`; confirmar el oficial. |
| `--color-brand-ink` | `#b03e10` | Texto pequeño en naranja (el de marca no llega a 4.5:1 sobre la crema). |
| `--color-navy` | `#1f3d5c` | Confianza / tracking |
| `--color-bg` | `#f7f4ec` | Papel |
| `--color-surface` | `#ede7d6` | Tarjetas y bloques alternos |
| `--color-ink` | `#211f1b` | Texto |
| `--color-verde` | `#3d7a54` | Solo verificado / activo |

Tipografía: **Archivo** (display, 700–900) + **Inter** (texto), vía
`next/font/google`.

**Esquina cortada:** utilidades `rw-cut`, `rw-cut-sm` y `rw-cut-lg`. Como
`clip-path` recorta el `outline` del foco, esos elementos usan un anillo
interior de dos capas (definido en `globals.css`). No repetir el gesto en
todo: se reserva para botones, tarjetas con jerarquía y bloques destacados.

## Reglas de contenido

- **Nunca** fotos ni testimonios generados por IA. Los huecos de imagen usan
  `<FotoPendiente>`, que se ve y se anuncia como pendiente.
- Los perfiles y trabajos de ejemplo van etiquetados como "Datos de ejemplo"
  en la interfaz.
- Los textos legales no se rellenan con plantillas: `/terminos` y
  `/privacidad` dicen explícitamente que están en preparación.

## SEO y motores de IA

- `metadata` única por ruta, con `canonical`.
- JSON-LD: `Organization` (layout), `WebSite` + SearchAction (home),
  `Service` + `BreadcrumbList` (categorías), `HowTo` (cómo funciona),
  `FAQPage` (faq), `Article` + `BreadcrumbList` (posts), `ItemList` de
  ofertas (planes).
- `robots.ts` y `sitemap.ts` se generan desde los mismos datos.
- `/buscar` va `noindex` para no generar duplicados por parámetros.

## Interacción (hover, foco, spotlight)

Todo vive en `app/globals.css` como utilidades reutilizables, derivadas de
las variables de color del tema (`--rw-brand-rgb`, `--rw-navy-rgb`), nunca
de hex sueltos:

| Utilidad | Qué hace |
|---|---|
| `rw-spotlight` | Resplandor radial que sigue al cursor dentro de la tarjeta. Necesita `data-spotlight` y un `<Spotlight>` como contenedor. |
| `rw-spotlight-navy` | Variante del resplandor para tarjetas sobre azul. |
| `rw-elevar` | Levantamiento de 2px + sombra al hover. |
| `rw-icono` | Marca un icono para que escale con el hover del contenedor. |
| `rw-brillo` | Escalado 1.02 + resplandor exterior; lo aplica `<Button>` solo. |
| `rw-subraya` | Subrayado que crece de izquierda a derecha. |

`components/ui/Spotlight.tsx` escucha `pointermove` en el contenedor, cachea
las medidas (se recalculan al entrar el cursor, al hacer scroll y al
redimensionar) y escribe `--mouse-x` / `--mouse-y` en cada `[data-spotlight]`
dentro de un `requestAnimationFrame`. No se activa en punteros táctiles ni
con `prefers-reduced-motion: reduce`, y sin JavaScript la página se ve igual
—el resplandor nace en opacidad 0.

## Marca

`components/layout/MarcaR.tsx` es el isotipo: la R construida como red de
nodos, vectorizada a partir de la referencia. **Es una reconstrucción en
SVG, no el archivo original**: si dejas el logo oficial en `web/public/`,
se sustituye ahí y en `app/icon.svg` (favicon).

## Espaciado de secciones

`<Section>` recibe el espaciado por prop (`cabecera`, `continuacion`,
`normal`, `compacto`, `ninguno`), no por `className`. Pasar `py-*` suelto
choca con el del propio componente y gana el que Tailwind ordene después:
de ahí salían los huecos grandes entre secciones.

## Despliegue en Vercel

El repositorio contiene `V1/` (archivo) y `web/` (este proyecto), así que en
Vercel hay que poner **Root Directory = `web`**. Sin eso, el build no
encuentra el `package.json`.

La URL base se resuelve sola: si no defines nada, cada despliegue usa su
propia URL de Vercel para canonicals, sitemap y JSON-LD, en vez de apuntar a
un dominio que todavía no existe. Cuando el dominio definitivo esté listo,
define `NEXT_PUBLIC_SITE_URL` en las variables de entorno del proyecto.

## Responsive

Verificado sin desbordes horizontales en 375 (móvil), 768 (tablet), 1024 y
1440 px, en las 17 rutas.

- El nav horizontal aparece desde `lg` (1024px); "Contacto" se suma desde
  `xl`, porque entre 1024 y 1279 la barra no tiene aire para él.
- El menú móvil arranca a 6.75rem (2.75 de cinta + 4 de cabecera). Si
  cambias la altura de la cinta, ajusta ese `top`.
- Los campos de formulario van a 16px: por debajo de eso iOS hace zoom
  automático al enfocarlos.
- Los filtros de la galería se deslizan horizontalmente en móvil en vez de
  envolverse; apilados ocupaban ~700px antes del primer resultado.
- Nada de texto dentro de `<svg>`: escala con el ancho del contenedor y se
  descuadra entre móvil y tablet.
