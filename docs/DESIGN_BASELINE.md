# Base visual de DigiTalks

Punto de partida: commit `31c290f`, rama original `main`. El 22 de noviembre de 2026 se creó `design/refero-specify` desde un árbol limpio. El servidor local existente en 4321 pertenece al usuario y se conserva.

## Arquitectura revisada

Astro 5 estático y TypeScript. PageLayout prepara SEO, fuentes locales, navegación, consentimiento y scripts comunes. Section reutiliza plantillas HTML con fragmentos JSON; AudioPlayer y ContactForm comparten su renderizador. Dieciséis rutas se generan desde content/pages, services y legal. ES e inglés mantienen rutas diferentes y equivalencias en SEO. El CSS de la clonación combina hojas exportadas por página con site.css. Las declaraciones específicas y valores fijos heredados dificultan cambiar jerarquías sin afectar al resto.

Pages CMS dispone de 12 colecciones/archivos para páginas, servicios, demos, personajes, idiomas, menús, configuración, pie, interfaz, formularios, SEO y contenido legal. No existe conexión real verificada con GitHub/Pages CMS todavía. Los fragmentos comerciales, archivos multimedia y SEO son datos, no código de componentes.

Hay 16 MP3 únicos, 13 vídeos de YouTube y 31 formularios de origen. Los audios conservan controles nativos, teclado, carga bajo demanda y pausa mutua. Sender está desactivado y sin IDs privados: no se puede verificar envío, recepción ni automatizaciones. GTM está preparado pero desactivado en preview. Se conservan los scripts locales de menú, consentimiento, FAQs, carrusel, vídeo y entradas respetando movimiento reducido.

## Identidad que se conserva

- Logotipo original blanco/amarillo, sin cambios de geometría ni composición.
- Amarillo: la exportación usa `#F8D849`, `#FFD113` y el ajuste del clon `#F7D84C`. Naranja: `#D56437`, `#DA6331` y `#DD6A34`. Negro, blanco y grises completan la paleta. Se consolidará la jerarquía con los valores existentes, sin colores protagonistas nuevos.
- Poppins en mensajes y cuerpo; Bebas Neue para carácter editorial y carteles; Playfair Display en contrastes expresivos; Space Mono en detalles técnicos. Pesos originales disponibles en fuentes locales.
- Bárbaro, ogro, NPC, pirata, soldado, niño, anciano y niña multilingües. Cabras, dinosaurio y demás recursos de las páginas de servicios se conservan. No se añaden imágenes genéricas ni recursos de Specify.
- Mensaje comercial, personalidad directa, textos ES/EN, todos los audios y sus asociaciones, URLs, enlaces y metadatos.

## Problemas observados

Titulares y espaciados heterogéneos; algunas secciones tienen texto sobredimensionado o muy estrecho. El primer viewport de la home presenta el mensaje sobre un fondo muy dominante y no permite escuchar enseguida. Los formularios heredan estilos inconsistentes y los nombres de demos necesitan más contraste. La base editable funciona, aunque los fragmentos originales requieren agrupación visual clara.

## Referencia y propuesta

Se revisaron DESIGN.md, CSS Variables, Design Tokens y la previsualización de la referencia: https://styles.refero.design/style/fa8ecd97-5052-4909-a4b4-50419ad9d00a . Sus principios útiles son la alternancia de superficies, contenedor de 1200 px, unidad de 8 px, separación de 80 px, tarjetas de 16 px, botones píldora y sombras discretas. Sus propias notas distinguen mediciones de interpretaciones; no se considera un componente fuente exacto. No se adoptan Inter, violeta, ilustraciones, textos o logotipos de Specify.

Dirección: estudio audiovisual editorial con tecnología de voz. Hero oscuro, mensaje dominante, personajes y audio visibles; contenidos claros con ritmo y anchos legibles; demos en tarjetas amplias; historias de servicios con composiciones variadas; formularios y navegación coherentes. Tokens en pocos archivos, sin dependencias nuevas. Se preservan los datos originales y se añaden únicamente opciones visuales editables cuando son necesarias.

## Comparación y aceptación

Capturas previas en docs/design/before, a 1440×1000, 834×1112 y 390×844. La versión compilada previa se guardará localmente y podrá abrirse en 4322. La nueva versión seguirá en 4321. Las cuatro preguntas de aceptación se comprobarán por identidad, mejora visual, regresiones funcionales y compatibilidad editorial. Producción no se modifica ni se publica.
