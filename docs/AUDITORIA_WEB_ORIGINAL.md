# Auditoría de DigiTalks AI

Fecha de captura: 2026-11-22T21:29:08.764Z. Auditoría de solo lectura: GET a páginas, sitemap, CSS y medios; navegación real de la portada en escritorio y móvil. No se enviaron formularios ni se modificó producción.

## Cobertura

Se recorrió robots.txt, sitemap_index.xml, page-sitemap.xml y los enlaces internos encontrados, incluidos hreflang y enlaces legales. Se recuperaron 16 páginas y 309 recursos. No equivale a descubrir páginas privadas, huérfanas sin sitemap ni enlaces, o campañas no públicas. La lista exacta está en INVENTARIO_URLS.csv; el HTML original y metadatos están en original/.

- [Doblaje, Localización y Voces IA | Home ES - Digitalks AI](https://digitalks-ai.com/) — es; 4 formularios.
- [Política de cookies (UE) - Digitalks AI](https://digitalks-ai.com/politica-de-cookies-ue/) — es; 0 formularios.
- [Audio Data Collection y Voice Datasets para IA | Digitalks AI](https://digitalks-ai.com/audio-data-collection/) — es; 0 formularios.
- [Audio Data Collection & Voice Datasets for AI | Digitalks AI](https://digitalks-ai.com/en/audio-data-collection-en/) — en; 0 formularios.
- [Custom Audio Development & Automation Tools | Digitalks AI](https://digitalks-ai.com/en/audio-development-en/) — en; 4 formularios.
- [Desarrollo en audio y automatización de procesos | Digitalks AI](https://digitalks-ai.com/audio-development/) — es; 4 formularios.
- [Custom Audio Data Collection & Voice Datasets Premium | Digitalks AI](https://digitalks-ai.com/custom-audio-data-collection/) — es; 1 formularios.
- [OTS Audio Data Collection: Off-the-Shelf Voice Datasets | Digitalks AI](https://digitalks-ai.com/ots-audio-data-collection/) — es; 4 formularios.
- [Doblaje de vídeos de YouTube con IA | Digitalks AI](https://digitalks-ai.com/doblaje-youtube/) — es; 4 formularios.
- [Locuciones profesionales y voces con IA en español | Digitalks AI](https://digitalks-ai.com/voz-ia/) — es; 2 formularios.
- [AI Voice Overs & Professional AI Voice Company | Digitalks AI](https://digitalks-ai.com/en/ia-voice/) — en; 2 formularios.
- [Locuciones con IA profesional en español | Digitalks AI](https://digitalks-ai.com/locucionesia/) — es; 1 formularios.
- [AI Voiceovers That Sound Human & Expressive | Digitalks AI](https://digitalks-ai.com/en/voiceoverai/) — en; 1 formularios.
- [Privacy Policy - Digitalks AI](https://digitalks-ai.com/en/privacy-policy/) — en; 0 formularios.
- [Dubbing, Localization and Voice AI | Home EN - Digitalks AI](https://digitalks-ai.com/en/start/) — en; 4 formularios.
- [Política de privacidad - Digitalks AI](https://digitalks-ai.com/politica-de-privacidad/) — es; 0 formularios.

## Diseño observado

Cabecera negra con logotipo blanco/amarillo y menú horizontal; menú desplegable móvil y selector ES/EN. Poppins para texto, Bebas Neue para titulares, también Space Mono y Playfair Display en recursos. Paleta de negro, blanco, amarillo y naranja. Portada con formas geométricas oscuras, franja amarilla diagonal, titulares grandes, secciones de creación/generación de voces, grabación tradicional, personajes, idiomas, modelo híbrido, localización, bugs, experiencia y captación por email. Las capturas de referencia están en screenshots/.

Se observan contenedores flex, fondos con imágenes, tarjetas, formularios repetidos, audio nativo y CSS propio de los reproductores. El sitio original usa Astra/Elementor, Polylang, Complianz, MailOptin y scripts de Google. La réplica será estática sin ejecutar esos sistemas ni llamar a WordPress. Las animaciones de aparición, blur y sticky requieren sustitución por interacciones locales. Algunas secciones están ocultas por breakpoint en el original: se conservará el contenido.

## Interacciones y plataformas

Calendly: https://calendly.com/audio-digitalks-ai/llamada-de-15-minutos. Los enlaces externos observados se conservan. Las demos no hacen autoplay. Formularios POST de Elementor; no se observa una configuración pública de Sender verificable. El consentimiento original es Complianz. Se conservarán los textos legales para revisión humana.

## Incidencias originales

Una fuente Old_Man_enUS.mp3 tenía una comilla sobrante y src sin comillas de apertura: se normaliza la sintaxis y se comprueba el archivo público. Hay múltiples H1 en algunas páginas y ausencia de H1 en doblaje-youtube. El pie contiene etiquetas de cookies/términos sin enlace; la página de cookies existe en sitemap. No se encontró una página pública de términos enlazada. La portada inglesa no es una traducción garantizada sección por sección: se conserva su contenido publicado.

## Límites

No son recuperables desde la web pública: listas/grupos de Sender, credenciales, automatizaciones, doble opt-in, notificaciones, datos de suscriptores, configuración de hosting/DNS, propiedad de Search Console ni ramas/repositorio GitHub. No se pueden validar emails ni automatizaciones sin acceso y prueba autorizada. No se afirma conformidad legal ni WCAG completa.
