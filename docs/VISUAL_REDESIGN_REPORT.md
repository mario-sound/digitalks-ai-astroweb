# DigiTalks — rediseño premium y revisión visual

Base: `6d067cc`, rama anterior `strategy/b2b-repositioning`. Trabajo en `design/premium-motion-conversion`, sin reset ni publicación. Línea base verificada: 19 pruebas, 18 capturas nuevas en `premium/before/`.

## Decisiones

- La composición editorial Specify mantiene contenedor, fondos alternos y píldoras. Se revisaron en navegador [Deepdub Home](https://deepdub.ai/), [LSP](https://deepdub.ai/solution/language-service-providers) y [Specify](https://styles.refero.design/style/fa8ecd97-5052-4909-a4b4-50419ad9d00a). Se observaron hero, franjas en movimiento y composiciones de medios al desplazarse, sin importar código, imágenes o marcas de esas referencias.
- Hero DigiTalks con personajes existentes superpuestos, geometrías CSS originales y respuesta sutil al cursor. Los héroes de post/datasets tienen gradientes, planos y arcos técnicos, con entrada ambiental breve.
- Títulos de sección en Bebas Neue con peso fuerte, tracking más cerrado y acentos naranja/amarillo, siguiendo los comentarios y capturas de la web original. H1 conserva el mensaje principal en Poppins; no se altera la arquitectura.
- Experiencia 10+ atribuida al equipo. A petición expresa posterior del usuario, la cinta usa los diez logos originales con atribución de experiencia previa, sustituyendo especialidades visibles como opción predeterminada. No se rotulan como clientes directos.
- Formularios compactos: email obligatorio y descripción opcional; privacidad plegada, estado de integración discreto y email en footer. Sender permanece desactivado.
- Demos: controles accesibles de reproducción/pausa, progreso real, tiempo y mute sobre audio HTML nativo de fallback. Fichas con nombre/idioma en una fila y códigos `esES`. Las 16 demos y sus hashes permanecen iguales.
- SuiteQA: galería de capturas originales extraídas del PPTX, superposición en escritorio y apilado móvil, diálogo con ajuste/tamaño original, Escape y retorno del foco. Dos WebP lossless mantienen resolución y píxeles. Tres pantallas con información sensible/operativa quedan privadas. Ver [extracción y revisión](suiteqa/EXTRACTION_AND_REVIEW.md).

## Componentes y edición

`ExperienceBanner.astro`, `ScreenshotGallery.astro`, `premium.css`, `premium.ts` y helper `headline.ts`. Se aprovechan CommercialSection, AudioPlayer, ContactForm, Header y Footer. No hay dependencias nuevas. Textos, énfasis, logos, atribución, imágenes, capturas, orden, formularios y etiquetas son JSON de Pages CMS. La conexión remota no se ha probado.

## Evidencias

18 capturas finales en `premium/after/`, con medidas en `premium/browser-results.json`. Composiciones completas en `premium/review-desktop.jpg` y `premium/review-mobile.jpg`. Las imágenes de carga diferida se visitaron en navegador antes de las capturas finales de la home; los placeholders durante carga no se tratan como medios inexistentes.

| Servicio | Antes/después |
|---|---|
| Home | [Comparación](premium/comparison-home.jpg) |
| Post | [Comparación](premium/comparison-post.jpg) |
| Datasets | [Comparación](premium/comparison-datasets.jpg) |

Para comparar la versión B2B anterior como web local: `npm run compare -- --revision=6d067cc` abre un servidor en 4322. El snapshot de ese commit se preparó y compiló correctamente. El script no cambia la rama de trabajo. La versión nueva se abre con `npm run dev` en 4321. Detener comparación con Ctrl+C.

## Límites

Sin despliegue. Sender, editor CMS conectado, Hostinger 301/410 y aprobación de capturas siguen pendientes. Lighthouse no está instalado y no se añaden puntuaciones. Reduced motion se comprueba mediante contratos CSS y simulación unitaria; no se cambió la preferencia del sistema operativo. No se declara auditoría WCAG completa ni incremento de conversión medido.

## Últimos comentarios aplicados

La cinta pasa a logos originales; privacidad plegada y aviso técnico discreto, sin repetición del email dentro del cierre. Fichas de audio con metadatos en fila y códigos de idioma con prefijo pequeño. Titulares con peso fuerte y tracking cerrado. Se refinan hero técnico/datasets, hover de personajes y tono de copy según comentarios. Las capturas finales sustituyen las provisionales anteriores. El informe de QA registra 29 pruebas finales sin fallos.
