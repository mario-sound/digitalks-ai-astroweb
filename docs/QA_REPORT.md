# QA — Reposicionamiento B2B DigiTalks

Validación local final: noche del 22 al 23 de noviembre de 2026. Rama `strategy/b2b-repositioning`. No se ha publicado ni enviado ningún formulario real.

## Compilación y contratos

`npm run verify`: Astro check sin errores, warnings ni hints; build estático correcto; **19/19 pruebas** aprobadas. Contratos cubiertos:

- Rutas activas, un H1, metadatos, idioma y traducciones.
- Todos los enlaces internos y anclas; recursos locales HTML, CSS, scripts e imágenes.
- Las 16 demos originales: archivos con SHA-256 conservado, IDs, personajes, idiomas y fuentes. Ambas homes contienen las 16.
- Formularios accesibles con etiquetas y envío desactivado mientras Sender esté sin configurar.
- Menú móvil y Escape; reproducción exclusiva y error de audio; consentimiento persistente; prevención de envío nativo.
- Colecciones CMS y controles comerciales, selección de demos/formulario, configuración operativa y contenido legal conservados.
- Mapa explícito de rutas antiguas, destinos existentes y ausencia de cadenas.
- Ausencia de PDF privados, precios y ofertas excluidas en el HTML comercial.
- Sitemap, robots de preview y barreras del despliegue FTPS sin credenciales/autorización.

Las pruebas del checkpoint visual exigían copy idéntico y todas las páginas antiguas activas. Se sustituyeron por contratos del nuevo encargo, que autoriza reescritura y consolidación. También se retiraron las dos pruebas de FAQ/vídeo de las antiguas páginas comerciales, que ya no ofrecen esos controles; permanecen los contratos de audio, formularios, consentimiento, seguridad y navegación.

## Navegador real

Capturas de las seis páginas comerciales en escritorio **1440×1000**, tableta **834×1112** y móvil **390×844**: 18 vistas. Sin desbordamiento horizontal de documento, un H1 por página, márgenes móviles de al menos 20 px y sin imágenes observadas rotas. Captura SuiteQA cargada (1915 px originales) en las seis vistas ES/EN de post. Archivos: `docs/strategy/screenshots/` y `browser-results.json`.

Revisión visual de composiciones completas mediante `review-desktop.jpg` y `review-mobile.jpg`. Comparaciones con el clon original: `comparison-home.jpg`, `comparison-post.jpg`, `comparison-datasets.jpg`. Los screenshots originales del checkpoint están en `docs/design/before/`.

Acciones comprobadas realmente:

- CTA «Escuchar demos» llega a la galería.
- Barbarian y Ogre reproducen con `readyState=4`; al iniciar Ogre, Barbarian queda pausado. Se pausó el audio al terminar.
- Menú móvil abre, Escape cierra y devuelve el foco al botón.
- Selector ES → English mantiene la página equivalente de postproducción.
- Email inválido activa `validity.typeMismatch`; nombre, empresa y privacidad obligatorios vacíos quedan inválidos. Botón desactivado y ningún script externo cargado con consentimiento necesario. Sin enviar datos.
- Página temporal creada mediante JSON se detectó sin reiniciar Vite. Campos opcionales omitidos/vacíos no rompen el render. Se corrigió un «0» residual de arrays vacíos; fixture retirada y compilación final repetida. Evidencia: `cms-local-check.json`.
- Las seis rutas de consolidación devuelven **301** y Location esperado en el servidor local. Evidencia: `redirect-http-local.json`.

## Accesibilidad y rendimiento

Se comprobó estructura, etiquetas, controles nativos, foco visible, menú con teclado, separación de acciones y responsive. Se ajustó el naranja de pequeñas etiquetas sobre blanco para mejorar contraste. No se declara una certificación WCAG ni una auditoría completa de lector de pantalla.

Sitio estático, sin nuevas dependencias ni suscripciones; tipografías y medios locales, imágenes WebP, reproductores nativos sin autoplay, sin carrusel y sin JavaScript adicional para las nuevas composiciones. No se han medido Core Web Vitals de campo ni ejecutado Lighthouse; no se atribuyen puntuaciones inventadas. El rendimiento de producción debe comprobarse en Hostinger tras lanzamiento autorizado.

## Pendientes externos y condiciones de lanzamiento

1. **Sender:** faltan cuenta/formularios públicos reales. Configurar los seis formularios en Sender con campos, consentimiento, protección antispam y mensajes reales; vincular IDs y validar la carga bajo consentimiento. Hacer una prueba autorizada y comprobar recepción. No hay éxito simulado ni endpoints inventados.
2. **Pages CMS/GitHub:** configuración YAML y contratos locales verificados; falta comprobar el editor conectado y el flujo real de guardado/publicación. No se ha iniciado sesión ni conectado una cuenta.
3. **Hostinger:** verificar `.htaccess`, HTTPS, redirecciones 301 y retirada OTS 410 en staging. El dev server sólo valida 301 por middleware; OTS informativo se sirve localmente con 200. El fallback HTML estático de Astro no equivale a un 301 HTTP.
4. **Medios/afirmaciones:** aprobar difusión de la captura SuiteQA y de sus textos de ejemplo antes de producción; sustituir por fuente original autorizada si se facilita. No se añadieron demos privadas de animación, logos o créditos sin permiso. Dashboard y capacidad semanal no se ofertan.
5. **SEO/legal:** revisar Search Console y rutas históricas adicionales; aprobación de textos legales y tratamientos por responsables. `preview` mantiene noindex y robots bloqueado hasta lanzamiento.

La vista de trabajo puede abrirse en el servidor local existente, http://127.0.0.1:4321/. Para arrancarla en otra sesión: `npm run dev`. No se ha detenido el servidor previo del usuario.

## Documentación entregada

- [Estrategia](WEB_REPOSITIONING_STRATEGY.md)
- [Copy completo ES/EN](WEBSITE_COPY_ES_EN.md)
- [Modelo CMS](CMS_CONTENT_MODEL.md)
- [Migración SEO](SEO_MIGRATION_PLAN.md)
- [Sistema visual](DESIGN_SYSTEM_DIGITALKS.md)
- [Fuentes y afirmaciones](SOURCE_CLAIMS_AUDIT.md)
