# UnikeGroup - CLAUDE.md

## Stack
- **Nuxt 4.0.1** (Vue 3.5.18) — SPA (`ssr: false`)
- **Tailwind CSS 6.14.0** con config custom (`tailwind.config.js`)
- **Pinia 3.0.3** — state management
- **Supabase** — PostgreSQL + Storage (buckets de imágenes)
- **Vercel Static** — deploy con pre-rendering dinámico
- **@nuxtjs/seo** — sitemap, meta tags, canonical URLs
- **@nuxt/image** — optimización WebP, responsive (6 breakpoints)
- **@nuxt/icon** — Material Symbols (Iconify)
- **@nuxt/fonts** — Montserrat (300-800)

## Arquitectura multi-marca

3 marcas en un solo codebase + 1 externa:
- **Waterplast** — tanques de agua (`/waterplast`)
- **Rohermet** — construcción (`/rohermet`)
- **Unike Group** (default) — corporativo (`/`)
- **Murallón** — pinturas (dominio externo `https://www.murallon.com.ar`, abre en nueva pestaña)

### Detección de marca
- `useBrand()` composable lee la ruta actual
- `/waterplast*` → waterplast
- `/rohermet*` → rohermet
- Todo lo demás (incluido `/`) → default (Unike Group)
- `data-brand` en `#__nuxt` activa CSS variables por marca

### Layouts
- `default.vue` → DefaultHeader + DefaultFooter (Unike Group)
- `waterplast.vue` → WaterplastHeader + DefaultFooter
- `rohermet.vue` → RohermetHeader + DefaultFooter

### Colores por marca (CSS variables en `main.css`)
| Marca | Primary | Secondary | Terciary |
|-------|---------|-----------|----------|
| Waterplast | #005CB9 | #279ece | #212C54 |
| Rohermet | #385976 | #88A4B3 | #1E2E46 |
| Unike (default) | #37AEDD | #1473A3 | #26418C |

Tailwind usa `var(--brand-*)` → los colores `primary`, `secondary`, `terciary` son dinámicos.

## Estructura de archivos

```
app/
├── assets/css/main.css        — variables de marca, estilos globales
├── components/
│   ├── default/               — Header, Footer, Main, Section, Drawer (Unike)
│   ├── unike/                 — Hero, Historia, Define, MarcasCards, Capacidad, MediosContacto
│   ├── contacto/              — Hero, RedDistribuidores
│   ├── waterplast/            — Header, Drawer, Hero, Muestra, Sobre, categoria/, producto/
│   ├── rohermet/              — Header, Drawer, Hero, CarouselProductos, Pilares, categoria/, producto/
│   ├── heading/               — H1, H2, H3
│   ├── button/                — Primary, Secondary
│   ├── blog/                  — Card, CardDestacada
│   ├── skeleton/              — SkeletonLoader, SkeletonCard, SkeletonCategoryCarousel, SkeletonOpinionCarousel
│   ├── carousel/              — Static
│   ├── faq/                   — Accordion
│   ├── opinion/               — Card
│   ├── producto/              — Modelo
│   ├── Blog.vue               — carousel de blog posts
│   ├── Distribuidores.vue     — mapa Google Maps + filtros cascada
│   ├── FAQs.vue               — sección FAQ
│   ├── FilterDropdown.vue     — dropdown con búsqueda
│   └── Opiniones.vue          — carousel de opiniones
├── composables/
│   ├── useBrand.js            — detección de marca
│   ├── useBlog.js             — fetch blogs
│   ├── useDistribuidores.js   — CRUD distribuidores
│   ├── useDebounce.js         — utilidad debounce
│   ├── useHomeScroll.js       — scroll por hash (usado en waterplast home)
│   ├── useOptimizedQueries.js — field mappings, paginación
│   ├── usePassiveListeners.js — listeners optimizados
│   ├── usePreloadData.js      — precarga en app mount
│   ├── useSeoMeta.js          — meta tags por marca
│   ├── useSupabaseCache.js    — cache localStorage + IndexedDB con TTL
│   ├── producto.js            — fetch genérico de producto
│   ├── waterplast/            — useCategorias, useProductos, useSubcategorias, useOpiniones, useImagenesDestacadas
│   └── rohermet/              — useCategorias, useProductos, useImagenesDestacadas
├── constants/
│   └── ROUTE_NAMES.js         — rutas centralizadas, contacto, redes sociales
├── layouts/                   — default, waterplast, rohermet
├── pages/
│   ├── index.vue              — home Unike Group (layout default)
│   ├── contacto/index.vue     — página de contacto (layout default)
│   ├── distribuidores/index.vue
│   ├── blog/index.vue
│   ├── blog/[slug].vue
│   ├── waterplast/index.vue
│   ├── waterplast/[categoria]/index.vue
│   ├── waterplast/[categoria]/[producto].vue
│   ├── rohermet/index.vue
│   ├── rohermet/[categoria]/index.vue
│   └── rohermet/[categoria]/[producto].vue
├── plugins/
│   └── lazy-offscreen-images.js — lazy load con IntersectionObserver
├── shared/
│   ├── menu.js                — secciones del footer
│   ├── waterplast/menu.js     — nav waterplast
│   ├── rohermet/menu.js       — nav rohermet
│   └── unike/menu.js          — nav unike
├── stores/                    — Pinia stores (ver nota sobre duplicación)
│   ├── storeBlog.js
│   ├── storeCategorias.js
│   ├── storeDistribuidores.js
│   ├── storeImagenesDestacadas.js
│   ├── storeOpiniones.js
│   └── storeProductos.js
├── app.vue                    — root, setea data-brand, precarga datos
└── error.vue                  — página 404 (usa UnikeMarcasCards)
server/
├── middleware/
│   ├── cache-headers.js       — cache por tipo de recurso
│   └── payload-optimization.js
└── routes/api/
    └── sitemap-routes.js      — sitemap dinámico desde Supabase
```

## Supabase

### Tablas
| Tabla | Marca | Nota |
|-------|-------|------|
| `waterplast-categorias` | Waterplast | orden, slug, imágenes, iconos |
| `waterplast-productos` | Waterplast | estado, slug, categoria_id (FK), specs, galería |
| `waterplast-productos-caracteristicas-adicionales` | Waterplast | producto_id (FK), orden |
| `waterplast-opiniones` | Waterplast | estado, imagen |
| `waterplast-imagenes-destacadas` | Waterplast | estado, orden, 3 tamaños |
| `waterplast-distribuidores` | Compartida | campo `vende` (array) filtra por marca |
| `rohermet-categorias` | Rohermet | misma estructura que waterplast |
| `rohermet-productos` | Rohermet | incluye galería de imágenes |
| `blog` | Compartida | campo `creado_por` filtra por marca |

### Storage Buckets
`waterplast-productos`, `waterplast-categorias`, `waterplast-opiniones`, `waterplast-imagenes-destacadas`, `waterplast-productos-caracteristicas`, `rohermet-productos`, `rohermet-categorias`, `blog`

### Patrón de URL de imágenes
```
{SUPABASE_URL}/storage/v1/object/public/{bucket}/{path}
```
Cada store/composable tiene funciones `get*ImageUrl()` que resuelven paths relativos a URLs completas.

## Cache
- `useSupabaseCache()`: localStorage (< 100KB) + IndexedDB (> 100KB)
- TTLs: categorías 1min, productos 1min, blog 6min, opiniones 12min, distribuidores 24min, imágenes destacadas 24min
- `usePreloadData()`: precarga categorías, imágenes destacadas, blog y distribuidores en `app.vue` mount

## Tailwind config
- **Breakpoints**: sm 480px, md 768px, lg 1080px, xl 1280px, xxl 1440px
- **Colores**: primary/secondary/terciary (CSS vars), dark #010101, error #F03A36, gray.light/mid/blue/dark
- **Gradients**: `primary-gradient` (180deg primary→terciary), `gradient-hero` (0deg transparent→primary)
- **Shadows**: `shadow-1` (sutil)

## Patrones y convenciones

### Componentes
- Hero gradient: `<span class="bg-gradient-hero absolute top-0">` como primer hijo de `<DefaultMain>`, se ancla a `#__nuxt` (tiene `position: relative`)
- `DefaultMain` NO debe tener `position: relative` (rompe el hero en otras páginas)
- Tab buttons activos: `!bg-terciary`, inactivos: `!bg-transparent !border-2 !border-terciary !text-terciary`
- "Somos Unike Group" dropdown oculta la marca actual usando `isWaterplast`/`isRohermet` de `useBrand()`
- Drawers waterplast/rohermet: panel 1 (menu) → panel 2 (Productos) → panel 3 (Somos Unike Group)
- `UnikeMarcasCards`: componente reutilizable con 3 marcas (Waterplast, Rohermet, Murallón). Prop `showTitle` (default true). Murallón usa `external: true` y abre `https://www.murallon.com.ar` en nueva pestaña

### Rutas
- `ROUTES_NAMES.HOME` = `/` (home Unike Group)
- `ROUTES_NAMES.WATERPLAST.HOME` = `/waterplast` (home Waterplast)
- `ROUTES_NAMES.ROHERMET.HOME` = `/rohermet` (home Rohermet)
- `ROUTES_NAMES.UNIKE.MURALLON` = `https://www.murallon.com.ar` (URL externa, links abren en nueva pestaña)
- Links a Waterplast en dropdowns/drawers usan `WATERPLAST.HOME`, no `HOME`

### Data fetching
- Composables y stores siguen el mismo patrón: `loading` ref, `error` ref, `data` ref, `readonly()` en return
- Fetch con cache check primero → Supabase query → formatear URLs → guardar cache
- Todos los fetches usan `useSupabaseClient()` y `useRuntimeConfig()`

### SEO
- `useSeoMeta()` genera meta tags dinámicos por marca
- Sitemap generado en build desde Supabase (categorías, productos, blogs)
- Pre-rendering de rutas dinámicas via hook `nitro:config`

### Imágenes
- Múltiples tamaños por entidad (_s, _m, _l, _xl o chica, mediana, grande)
- `@nuxt/image` con formato WebP y quality 75
- Plugin `lazy-offscreen-images.js` para lazy load con `data-src`
- Imágenes estáticas en `/public/images/` (unike, marcas, capacidad, logos, etc.)

## Variables de entorno
```
SUPABASE_URL=
SUPABASE_KEY=
GOOGLE_MAPS_API_KEY=
```

## Reglas del proyecto
- Links de Distribuidores y Blog van a páginas absolutas (`/distribuidores`, `/blog`), nunca anchor scrolls
- Color de texto `text-dark` para títulos en páginas Unike (no `text-primary`)
- Idioma UI: español. Idioma código: inglés. Comentarios en español.
- Commit solo cuando se pida explícitamente
- Murallón: links activos a `https://www.murallon.com.ar`, siempre con `target="_blank"` y `rel="noopener noreferrer"`

## Bugs conocidos
- `app/stores/storeProductos.js:203`: typo `waterplast-produtos` (portugués) → debería ser `waterplast-productos`
- `app/stores/storeProductos.js`: `currentProducto` se usa en el return pero nunca se declara como `ref()` en el setup del store

## Nota: duplicación stores/composables
Existen 6 Pinia stores en `app/stores/` que duplican la lógica de los composables en `app/composables/`. Ambos implementan fetch + cache + URL formatting. Evaluar consolidar en uno solo.
