# QA — DigiTalks premium, conversión y SuiteQA

Validación final local: 23/11/2026. Rama `design/premium-motion-conversion`, derivada de `strategy/b2b-repositioning` en `6d067cc`. No se ha publicado ni enviado ningún formulario real.

## Línea base y resultado

Antes de modificar: `npm run verify`, 19/19 pruebas, captura nueva de las seis páginas en tres tamaños (`premium/before/`). Resultado final: **Astro check sin errores/warnings/hints, build estático correcto y 29/29 pruebas aprobadas**. Log: `premium/validation.log`.

Se conservan las 19 pruebas anteriores, actualizando únicamente la ubicación del email de conversión desde el cierre del formulario al footer por petición explícita del usuario. Se añade cobertura para formulario mínimo, navegación sin Contacto, estructura y copy autorizado, banner/atribución/pausa, fallback sin JS, reduced motion, controles de audio, capturas, medio CMS dedicado y barrera de aprobación. Los cambios de tono están registrados en `premium/editorial-revisions.json`; las rutas, H1, secciones, IDs y archivos de audio siguen protegidos.

## Contratos comprobados

- Seis páginas comerciales ES/EN, tres legales conservadas, un H1, metadatos, canonical/hreflang, anclas, enlaces, scripts, imágenes y CSS locales.
- Las 16 demos conservan SHA-256, IDs, idiomas, personajes y fuentes; están accesibles en ambas homes. El HTML conserva controles nativos de fallback, sin autoplay.
- Sólo email obligatorio; descripción opcional, privacidad plegada y sin casilla genérica/marketing automático. Sender sin IDs y envío bloqueado.
- Menú móvil/Escape, consentimiento persistente, prevención de envío y exclusión entre audios.
- Diez logos originales del bloque de experiencia, con atribución a roles previos del equipo y alternativa estática.
- Galería SuiteQA en Post ES/EN, capturas con dimensiones originales, estado de desarrollo visible y build fuera de preview bloqueado mientras falte aprobación.
- CMS: campos, referencias y medios locales; legales/configuración general conservados.
- Sitemap/robots de preview, redirecciones existentes y protección FTPS.

## Navegador real

18 vistas finales: escritorio 1440×1000, tableta 834×1112 y móvil 390×844. Sin overflow horizontal de documento, un H1, email como único campo obligatorio y privacidad inicialmente plegada. Evidencias en `premium/after/`, `premium/browser-results.json`, hojas de revisión y comparaciones. Se visitaron las imágenes de carga diferida antes de las capturas finales de la home para incluir todos los personajes y logos.

Acciones observadas:

- Barbarian y Ogre reproducen con readyState=4. Al iniciar Ogre, Barbarian queda pausado; se pausó audio al acabar.
- El formulario marca email inválido y muestra error; al corregirlo, elimina aria-invalid y oculta el error. Descripción abre y el foco por teclado llega al textarea. Sin envíos.
- Menú móvil muestra tres servicios, abre y cierra con Escape. EN → Español mantiene la página equivalente Post.
- Banner pausa mediante control, aria-pressed=true y animation-play-state=paused. La cifra 10+ mantiene atribución al equipo.
- Respuesta al cursor del hero observada con variables de inclinación/desplazamiento distintas de cero; limitada a puntero fino y desactivada con reduced motion.
- SuiteQA abre la imagen real en diálogo, Escape cierra y devuelve foco al enlace. En móvil, «Original size» conserva 1915 px y permite scroll dentro de un área visible de 344 px. Captura en `suiteqa/lightbox-mobile.jpg`.
- No se observaron errores/warnings en consola en las sesiones de prueba consultadas.

## Extracción y privacidad de SuiteQA

10 imágenes incrustadas, 10 hashes distintos, 0 duplicados idénticos. Extracción directa ZIP, sin capturas de diapositivas. Originales fuera de public/Git. Dos WebP lossless de QA/informe para preview: 1915×912 y 966×761; buffers RGBA idénticos a los PNG extraídos. Administración, REC y dashboard permanecen privados por datos visibles o procedencia pendiente. Ver [revisión](suiteqa/EXTRACTION_AND_REVIEW.md).

## Accesibilidad y rendimiento

HTML estático, contenido visible antes de scripts, etiquetas, foco visible, controls nativos, diálogo nativo, pausar movimiento y media query reduced motion. La rama reducida se ejecuta en prueba unitaria; CSS verifica eliminación de animación/scroll suave. No se cambió la preferencia del SO ni se afirma haber emulado esa preferencia en navegador. No se declara certificación WCAG completa.

Sin dependencias ni suscripciones nuevas. Lighthouse no está instalado; no se inventan puntuaciones ni Core Web Vitals. El parallax continuo de scroll no se usa. Las entradas usan transform/opacity y el seguimiento del puntero se limita a requestAnimationFrame. Las imágenes nuevas mantienen dimensiones intrínsecas y se optimizan sin pérdida.

## Pendientes externos

1. Sender: cuenta/IDs reales, diseño y campos del embed, finalidad separada de marketing, protección antispam, estados reales de carga/error/éxito, doble envío, prueba autorizada y comprobación de recepción. Nada de esto se simula como operativo.
2. Pages CMS/GitHub: esquema validado localmente, conexión y guardado real sin verificar.
3. Hostinger: HTTPS y reglas HTTP 301/410 pendientes de staging. El fallback HTML de Astro no demuestra un 301 en hosting. Las seis redirecciones locales ya verificadas en la fase anterior se conservan; no se encontró página antigua de contacto en el inventario para retirar.
4. Capturas: aprobación de difusión y procedencia de los textos/estadísticas antes de producción; el build de publicación está bloqueado por esos estados pendientes.
5. SEO/legal: revisión de Search Console y backlinks históricos no accesibles, tratamiento de datos por responsables. Modo preview sigue bloqueando indexación.

## Revisar y comparar

Servidor existente del usuario: http://127.0.0.1:4321/. Para iniciarlo en otra sesión: `npm run dev`. No se ha detenido el servidor previo.

Comparación con el B2B anterior: `npm run compare -- --revision=6d067cc` en 4322; snapshot preparado y compilado. No cambia la rama. Comparaciones de imágenes: `premium/comparison-home.jpg`, `comparison-post.jpg`, `comparison-datasets.jpg`.

Documentación: [informe visual](VISUAL_REDESIGN_REPORT.md), [motion](MOTION_DESIGN_SYSTEM.md), [conversión](CONVERSION_OPTIMIZATION.md), [Sender](FORM_INTEGRATION_STATUS.md), [CMS](CMS_CONTENT_MODEL.md), [SEO](SEO_MIGRATION_PLAN.md), [copy](WEBSITE_COPY_ES_EN.md), [fuentes](SOURCE_CLAIMS_AUDIT.md).


## Ajustes de revisión — 23/11/2026

Aplicados los ocho comentarios: sin botón de pausa ni atribución adicional bajo logos; nuevo copy de demos ES/EN; footer compacto compartido con enlaces legales y consentimiento conservados; sin aviso visual de preview ni botones superpuestos en capturas; dashboard original image2 como segunda captura SuiteQA; informe image3 en modalidades de colaboración. Gestión de imágenes desde Pages CMS conservada en ambos bloques.

Verificación: `npm run verify` completado, Astro sin errores y 30/30 pruebas. Navegador local a 390, 535 y 1440 px: sin desbordamiento horizontal en móvil; footer de ~172 px a 390/535; apertura/cierre real del dashboard y del informe en sus diálogos independientes y retorno de foco. Informe en columna derecha en escritorio y debajo de modalidades en móvil. Evidencia en `docs/review-cleanup/`. Dashboard WebP sin pérdida: 1916×910 y RGBA idéntico al PNG original.

No se publicó en producción. Retirar el aviso de la interfaz no cambia `review: pending` ni el bloqueo de compilación para publicación.
