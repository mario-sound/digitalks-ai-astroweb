# SuiteQA: extracción del PowerPoint y revisión

Fuente local: `refs/DigiTalks_Game_Audio_Post_Production_v13.pptx`. Se leyó como archivo ZIP; se extrajeron los bytes de `ppt/media/` sin renderizar diapositivas. Las relaciones XML permiten identificar qué imagen usa cada diapositiva. No se alteró el PowerPoint.

## Inventario

**10 archivos de imagen; 10 hashes SHA-256 distintos; 0 duplicados idénticos.** No se eliminó ninguna imagen por similitud visual. Los PNG originales se conservan íntegros en `refs/suiteqa-extracted-originals/`, fuera de Git y de la compilación. El manifiesto completo local conserva texto y relaciones; el manifiesto compartible `extraction-manifest.json` sólo incluye metadatos, hashes y números de diapositiva.

| Archivo interno | Resolución | Diapositiva / sección | Revisión y destino |
|---|---|---|---|
| image13.png | 1915 × 912 | 3 / QA Suite | Vista de revisión. Integra preview local; contiene guion, nombres en el texto e IDs. Derechos/procedencia pendientes antes de publicar |
| image8.png | 1919 × 898 | 3 / QA Suite | Vista REC. Nombre de operador, IDs y texto de trabajo: conservar en privado hasta revisar autorización |
| image1.png | 931 × 812 | 3 / QA Suite | Administración de usuarios. Nombres, emails personales, roles y fechas: excluida de `public` y de la galería |
| image2.png | 1916 × 910 | 4 / Client Dashboard | Proyecto, operador y métricas de producción. No se confirma anonimización; sólo archivo privado. La diapositiva identifica el dashboard como en desarrollo y con datos de ejemplo |
| image3.png | 966 × 761 | 5 / Production Reports | Informe con título genérico y contadores. Sin lista de usuarios/emails visible. Preview local; no se presenta como acceso de cliente disponible. Confirmar autorización del informe |

Los otros cinco recursos son gráficos/elementos de la presentación, no nuevas capturas de SuiteQA: image6.png (824 × 824), image7.png (4 × 616), image9.png e image10.png (2048 × 445 cada uno), image11.png (1672 × 941). Están conservados en los originales; no se usan como capturas ni se publican créditos/logos.

## Optimización

Copias públicas de revisión local en `public/images/suiteqa/`:

- `qa-review.webp`: 1915 × 912, 67 232 bytes frente a 228 182 del PNG.
- `production-report.webp`: 966 × 761, 21 048 bytes frente a 65 587 del PNG.

WebP **lossless**, sin cambiar dimensiones. Comparación de los buffers RGBA decodificados con Sharp: idénticos para ambas imágenes. Reducción conjunta aproximada del 70% en bytes. Las otras tres copias WebP se guardan en `refs/suiteqa-web-review/` para revisión privada y no entran en `dist`.

## Integración y publicación

Sólo las páginas Post ES/EN reciben la galería. Composición superpuesta en escritorio, apilada en móvil, lightbox con teclado, Escape, retorno del foco, ajuste a pantalla y tamaño original con desplazamiento. Las imágenes son las capturas reales sin filtros, reconstrucciones, recortes ni overlays incorporados a los archivos. Marcos, rótulos y profundidad pertenecen al HTML/CSS.

Todas las capturas incorporadas siguen con `review: pending`. El modo preview muestra un aviso explícito. `scripts/check-publication.mjs` bloquea un build con `preview:false` mientras haya capturas pendientes con recurso asignado. Este control no sustituye revisar los datos y los permisos; no se han aprobado automáticamente ni publicado.

## Pages CMS

En Servicios → Post ES o EN → SuiteQA → Capturas originales: añadir, reordenar, sustituir imagen, editar título/alt/pie, ocultar (`enabled`), marcar estado interno/en desarrollo y registrar aprobación. Fuente de medios dedicada `suiteqa` apunta a `public/images/suiteqa/`; los originales privados no aparecen en el selector. No subir pantallas con usuarios o datos de clientes sin anonimización y autorización. Mantener ES/EN alineados. La conexión externa de Pages CMS sigue pendiente de verificar.

## Reproducción de la extracción

`scripts/extract-pptx-media.py` utiliza ZIP/XML estándar y Pillow para leer dimensiones. Se ejecutó con Python/Pillow del runtime local ya disponible, sin instalar paquetes. El script conserva sólo una copia por hash idéntico y documenta las relaciones de todos los recursos, incluso si un archivo se referencia desde varias diapositivas.
