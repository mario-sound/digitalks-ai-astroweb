# Migración SEO ES/EN

## Intención por página

Investigación exploratoria realizada el 22/11/2026 con consultas de doblaje multilingüe, diálogo de videojuegos y datasets de voz grabados en estudio. Es validación de vocabulario e intención, no estimación de volúmenes ni estudio de ranking. Se revisó la web pública actual y resultados de proveedores que describen sus propios servicios:

- [DigiTalks ES](https://digitalks-ai.com/) y [EN](https://digitalks-ai.com/en/start/): consolidación de la oferta de voces/doblaje.
- [zappmedia: game voice-over](https://www.zappmedia.com/game-voice-over.html): relación entre grabación, diálogo y postproducción.
- [Flaunt Audio: studio speech data](https://flauntaudio.com/datasets/): intención de corpus por encargo, diferenciada de bibliotecas.
- [Molok Studios](https://molokstudios.com/): terminología de localización y postproducción.

| Página | Intención ES | Intención EN |
|---|---|---|
| Home | doblaje con IA, doblaje multilingüe de animación/videojuegos | multilingual AI dubbing for animation and games |
| Post | postproducción de diálogo para videojuegos | game audio post-production, dialogue editing, localization audio post |
| Datos | datasets de voz en estudio, grabación a medida | custom studio voice datasets, voice data recording |

Titles y descripciones son únicos por servicio e idioma. No se reutilizan promesas de AAA, plazos universales o ahorro de la web anterior. No se introducen términos de crowdsourcing en el contenido comercial activo.

## Mapa completo

| Antigua | Destino / estado | Motivo |
|---|---|---|
| `/` | Conservada | Doblaje ES + fusión Voz IA |
| `/en/start/` | Conservada | Doblaje EN |
| `/audio-development/` | Conservada | Nuevo servicio post ES |
| `/en/audio-development-en/` | Conservada | Nuevo servicio post EN |
| `/audio-data-collection/` | Conservada | Datasets estudio ES |
| `/en/audio-data-collection-en/` | Conservada | Datasets estudio EN |
| `/voz-ia/` | 301 `/` | Fusión integral |
| `/en/ia-voice/` | 301 `/en/start/` | Fusión integral EN |
| `/locucionesia/` | 301 `/#voces` | Opciones de voz integradas en producción |
| `/en/voiceoverai/` | 301 `/en/start/#voces` | Equivalente EN |
| `/custom-audio-data-collection/` | 301 `/audio-data-collection/` | Producción custom consolidada |
| `/ots-audio-data-collection/` | 410 en Hostinger | Catálogo retirado sin equivalente. Página informativa local con enlaces a producción a medida |
| `/doblaje-youtube/` | 301 `/#produccion` | Fases de producción de contenido; sin crear oferta YouTube separada |
| `/politica-de-privacidad/` | Conservada | Legal ES |
| `/en/privacy-policy/` | Conservada | Legal EN |
| `/politica-de-cookies-ue/` | Conservada | Legal ES; EN enlaza identificando idioma |

Las reglas 301 están en `content/settings/redirects.json`, Astro (fallback estático) y `.htaccess` (HTTP real). Middleware aplica 301 durante desarrollo. En hosting estático, las páginas HTML de Astro contienen una redirección de navegador; el código HTTP depende de Apache/LiteSpeed y debe verificarse tras despliegue autorizado. No se declara validación de Hostinger sin acceso.

OTS usa `ErrorDocument 410 /ots-audio-data-collection/index.html`, con `noindex` y respuesta 410 configurada en `.htaccess`. No se incluye en sitemap. En Astro local la explicación se sirve con estado 200; no representa el estado final del servidor.

## Controles

Canonicals absolutos, hreflang recíproco ES/EN y x-default en las seis páginas. Un solo H1. Open Graph con recursos locales. JSON-LD WebPage/Service y organización sin reseñas ni acreditaciones inventadas. Sitemap únicamente de páginas activas. Robots y meta noindex preservan modo preview. No publicar la rama ni desactivar preview durante revisión.

Antes del lanzamiento: revisar Search Console e indexación real; confirmar no existen rutas históricas adicionales; probar cada Location/301 y 410 en staging Apache, verificar HTTPS, canonical, recursos, sitemap y ausencia de cadenas. Después: enviar sitemap, monitorizar 404, indexación y rendimiento. Sin publicación en esta tarea.
