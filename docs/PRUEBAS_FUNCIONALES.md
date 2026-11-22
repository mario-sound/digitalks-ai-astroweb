# Pruebas funcionales

## Reproducir

`npm ci` y `npm run verify`. La verificación usa el checker oficial de Astro (incluye componentes `.astro`), compilación estática y pruebas Node. No hace peticiones externas ni envía formularios.

Resultado local: 0 errores/avisos del checker, 16 páginas + 404 generadas y 15 pruebas superadas. Los resultados de navegador y audio se guardan en los JSON de esta carpeta.

| Comprobación | Evidencia / alcance |
|---|---|
| Rutas y contenido | 16 rutas de sitemap/enlaces presentes; un H1 por página, sin tokens de plantilla pendientes |
| Enlaces internos | Ficheros y anclas comprobados en todo el HTML compilado; corregida diferencia collapse/Collapse de las FAQ originales |
| Medios y CSS | Todas las referencias de imagen/audio/scripts/CSS de las páginas encuentran un archivo local |
| Idiomas y SEO | lang, title, description, canonical, alternates, sitemap y noindex de preview |
| Audio | 16 MP3 analizados con ffprobe; codec, duración, canales, sample rate y bitrate en AUDIO_VALIDACION.json |
| Reproducción real | Barbarian y Ogre arrancaron en el navegador, readyState 4, sin error; iniciar Ogre pausó Barbarian. REPRODUCCION_NAVEGADOR.json |
| Reproductor | Controles nativos, sin autoplay; test de pausa mutua y error de carga |
| Menú | Test abre/cierra y Escape; apertura real del menú móvil y cambio a /en/start/ en navegador |
| Consentimiento | Test de bloqueo inicial, persistencia, reapertura y carga de vídeo sólo tras acción+consentimiento |
| FAQ | Espacio abre; Escape cierra el panel |
| Formularios | Botones desactivados, sin hidden fields de WordPress; evento submit se cancela, campos y etiquetas accesibles |
| Despliegue | FTPS rechaza secretos ausentes y producción sin autorización antes de abrir conexión |
| CMS | YAML parsea y contiene las áreas requeridas; la conexión con Pages CMS no se ha probado |
| Accesibilidad básica | main, navegación etiquetada, skip link, alt, labels y controles de menú |
| Consola | Sin errores/avisos capturados en portada/demos al reproducir; no sustituye instrumentación exhaustiva de todas las sesiones |
| Visual | 16 páginas visitadas en 1440×1000 y 390×844, originales y Astro; 64 capturas comparativas y una pasada final de 32 vistas Astro sin imágenes rotas ni desbordamiento horizontal observado |

## Límites

Los tests de comportamiento usan un DOM simulado para probar los manejadores y no sustituyen la reproducción real. ffprobe comprueba todos los archivos, mientras que la reproducción nativa se comprobó directamente en dos demos. No se han probado todas las demos en cada dispositivo. Las capturas comprueban elementos presentes y geometría, pero el lazy loading original puede no completar imágenes alejadas del viewport.

No se verificaron: envíos reales, emails/automatizaciones Sender, autorización de Pages CMS, ejecución GitHub Actions remota, FTPS Hostinger, TLS/cabeceras Apache en destino, analítica/Search Console, checkout de un repositorio remoto, WCAG completa ni métricas de campo de rendimiento.
