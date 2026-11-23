# DigiTalks AI · Astro

Versión local rediseñada de las 16 páginas públicas de https://digitalks-ai.com/, en la rama `design/refero-specify`. El clon anterior permanece en `main` (commit `31c290f`). Astro genera HTML estático: el hosting no necesita un servidor Node. No se ha modificado WordPress, DNS, correo ni producción.

## Abrir la web

Necesitas Node 22.19 o superior (recomendado Node 24 LTS). Abre una terminal en esta carpeta y ejecuta:

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:4321/**. La versión inglesa empieza en **/en/start/**. Para detener el servidor, pulsa Control+C.

## Constructor visual local

Mientras ejecutas `npm run dev`, abre **http://127.0.0.1:4321/builder/index.html**.

El constructor permite:

- seleccionar una página o servicio;
- añadir, duplicar, eliminar y reordenar bloques arrastrándolos;
- editar titulares, textos, enlaces e imágenes de los bloques existentes;
- guardar cambios directamente en los JSON de `content/`;
- mostrar la página seleccionada en una vista previa lateral.

El constructor solo está disponible en el servidor de desarrollo. Los cambios deben revisarse y subirse con Git antes de publicar.

Para comprobar exactamente la versión compilada:

```sh
npm run verify
npm run preview
```

`dist/` contiene los archivos que se subirían a Hostinger. No hay backend de WordPress ni dependencia de sus plugins. Las plantillas conservan los fragmentos editoriales y selectores `dt`; el rediseño usa tokens y componentes visuales propios, sin cargar el CSS heredado por página ni ejecutar Elementor/Astra/Polylang/Complianz. Los archivos originales quedan como evidencia y compatibilidad.

## Comparar con el clon anterior

Con el rediseño abierto en 4321, ejecuta en otra terminal:

```sh
npm run compare
```

Abre http://127.0.0.1:4322/ para ver el clon original. Se usa una copia local de su build; si no existe, se reconstruye desde el commit base, sin cambiar de rama ni tocar tu trabajo. Las mismas rutas funcionan en ambos puertos. Control+C detiene cada servidor por separado.

La evaluación visual y las capturas antes/después están en [validación del rediseño](docs/DESIGN_VALIDATION.md). Para cambiar el diseño global: `src/styles/tokens.css` y `src/styles/design.css`; para textos, imágenes y demos: Pages CMS o `content/`. Guardar JSON actualiza la vista de desarrollo.

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

## Reestructuración comercial B2B

Rama `strategy/b2b-repositioning`: tres servicios ES/EN. Home integra Voz IA; Post y Datasets conservan las URLs anteriores. Ver `docs/WEB_REPOSITIONING_STRATEGY.md`, `docs/CMS_CONTENT_MODEL.md`, `docs/SEO_MIGRATION_PLAN.md` y `docs/QA_REPORT.md`. El archivo comercial anterior está en `content/archive`, fuera de las páginas compiladas. `refs/*.pdf` es material privado local e ignorado; nunca copiarlo a `public`.

## Revisión premium

La rama `design/premium-motion-conversion` conserva las tres líneas ES/EN y añade el sistema visual, formularios mínimos y galería original SuiteQA. Guía y pruebas en `docs/QA_REPORT.md`. Comparar con la versión B2B anterior: `npm run compare -- --revision=6d067cc` (4322). Para el clon inicial WordPress: `npm run compare`.
