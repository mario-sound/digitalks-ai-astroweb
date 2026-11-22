# Comparativa visual

Se visitaron las 16 páginas de la auditoría en escritorio 1440×1000 y móvil 390×844. `screenshots/original-<id>-<modo>.jpg` y `astro-<id>-<modo>.jpg` son capturas completas. `comparison-desktop-1…4.jpg` y `comparison-mobile-1…4.jpg` reúnen los primeros viewports, original a la izquierda y Astro a la derecha. `RESULTADOS_NAVEGADOR.json` conserva medidas e imágenes rotas observadas en la primera pasada.

La comparación detectó y permitió corregir:

- Orden de las hojas de estilo: los estilos inline de Astra deben preceder a los de la página, no sobrescribirlos al final. Esto alteraba el color de botones y tipografía legal.
- Diferencia entre páginas con marco de 1200px y páginas de constructor a ancho completo. Se repusieron ambos comportamientos.
- Estilos globales que coloreaban el menú móvil; se sustituyeron con reglas específicas de la cabecera nativa.
- Metadatos de demos, comilla extra en Old_Man_enUS y controles nativos de reproducción.
- Anclas de FAQ con diferencias de mayúsculas; interacción local de acordeones y carruseles.
- Campos ocultos y encabezados de formularios, recuperados para reproducir la organización original.

Se conservan el negro/blanco, amarillo/naranja, Poppins/Bebas Neue/Playfair/Space Mono, imágenes originales (con versiones WebP de fotografías grandes), secuencia de secciones y textos. Las portadas ES/EN y los titulares de servicios se aproximan visualmente a sus originales.

Diferencias deliberadas de esta versión: formularios con envío desactivado y aviso de conexión pendiente; consentimiento local en lugar del plugin original; vídeos bloqueados hasta acción y consentimiento; entradas nativas que aproximan las declaraciones originales, sin blur/parallax del runtime anterior; carruseles por scroll con controles y sin autoplay. No se afirma una réplica temporal exacta ni igualdad pixel a pixel. El original contiene efectos de aparición y contenido lazy que puede verse vacío en una captura tomada inmediatamente después de navegar.

Las capturas iniciales también registraron desbordamiento horizontal en varias páginas originales, especialmente móviles. La réplica limita ese desplazamiento y conserva la estructura. Revisar manualmente la composición de las secciones con titulares grandes tras cualquier cambio editorial. Todas las páginas tienen una revisión inicial de escritorio/móvil; la aprobación estética final corresponde al titular.

## Pasada final

Tras las correcciones se volvieron a visitar las 16 páginas en ambos tamaños: 32 vistas de Astro sin imágenes rotas observadas ni desbordamiento horizontal de documento. Evidencia: RESULTADOS_NAVEGADOR_FINAL.json. El menú móvil se abrió, el selector llevó a /en/start/ y una FAQ se desplegó en navegador real. Las capturas Astro y hojas de contacto se actualizaron con esa pasada.
