# DigiTalks AI · Astro

Primera réplica local de las 16 páginas públicas descubiertas de https://digitalks-ai.com/. Astro genera HTML estático: el hosting no necesita un servidor Node. No se ha modificado WordPress, DNS, correo ni producción.

## Abrir la web

Necesitas Node 22.19 o superior (recomendado Node 24 LTS). Abre una terminal en esta carpeta y ejecuta:

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:4321/**. La versión inglesa empieza en **/en/start/**. Para detener el servidor, pulsa Control+C.

Para comprobar exactamente la versión compilada:

```sh
npm run verify
npm run preview
```

`dist/` contiene los archivos que se subirían a Hostinger. No hay backend de WordPress ni dependencia de sus plugins. El proyecto conserva selectores y estilos visuales exportados, adaptados a prefijos `dt`, para aproximarse al original; no instala ni ejecuta Elementor/Astra/Polylang/Complianz. Los estilos originales se conservan como evidencia de auditoría, sin cargar scripts originales.

## Qué está listo

- 16 rutas originales, español/inglés, contenidos, imágenes, navegación y páginas legales públicas.
- 16 demos MP3 únicas, controles nativos accesibles, sin autoplay, pausa entre reproductores y mensajes de error.
- 13 vídeos públicos de YouTube recuperados; sólo se insertan al pulsar reproducir y aceptar servicios opcionales.
- Formularios con campos/textos recuperados. **Envío bloqueado** hasta configurar y verificar Sender.
- Contenido JSON editable, `.pages.yml`, SEO por página, hreflang, sitemap, robots y 404.
- GitHub Actions para verificar/compilar y despliegue FTPS separado, desactivado por defecto.
- Pruebas de compilación, enlaces/medios, accesibilidad básica y comportamiento. Capturas y evidencias en `docs/`.

## Qué necesita acceso externo

El repositorio Git local está inicializado. No se creó un repositorio remoto ni se conectaron cuentas GitHub, Pages CMS, Sender o Hostinger. Consulta [pendientes](docs/PENDIENTES_MIGRACION.md), [guía CMS](docs/PAGES_CMS.md) y [publicación](docs/INSTALACION_PUBLICACION.md).

La configuración general tiene `preview: true`: bloquea indexación. No cambies ese valor para una demo temporal. No hay analítica activa. Los textos legales originales se conservan para revisión humana; no se garantiza conformidad legal ni WCAG completa.

## Organización

- `src/components/`: cabecera, pie, bloques, formularios y reproductores reutilizables.
- `src/lib/`: lectura tipada de contenido y renderizado seguro.
- `src/templates/`: estructura visual importada, sin textos editoriales incrustados; CSS local por página.
- `src/styles/site.css`: comportamiento visual propio y ajustes de migración.
- `content/`: páginas, servicios, legales, demos, personajes, idiomas, formularios, SEO y configuración.
- `public/media/`: medios originales utilizados y versiones WebP optimizadas.
- `scripts/*.test.mjs`: comprobaciones reproducibles; `npm run verify` ejecuta todo.
- `docs/original/`: captura y evidencia pública; **no se publica dentro de dist**.

Los scripts de auditoría/importación son herramientas de una sola migración: no forman parte del build. No los vuelvas a ejecutar sobre contenido editado: pueden sobrescribirlo. Trabaja con Git antes de cualquier reimportación. Los datos originales de CSS deben archivarse antes de retirar cachés; las herramientas de importación son auxiliares, no un sincronizador automático con WordPress.
