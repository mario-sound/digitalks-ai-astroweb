# Sistema visual DigiTalks

## Dirección y archivos

Estudio audiovisual editorial: mensaje claro, voces reales en primer plano y contraste entre superficies negras, blancas y grises. Se conserva el logotipo, Poppins, Bebas Neue, Playfair Display, Space Mono, amarillo y naranja. Referencia de ritmo/geometría: https://styles.refero.design/style/fa8ecd97-5052-4909-a4b4-50419ad9d00a . No se importan recursos gráficos, familias o colores de Specify.

- `src/styles/tokens.css`: fundamentos de marca y medidas globales.
- `src/styles/design.css`: componentes y reglas responsive; no selectores de IDs de página.
- `src/lib/presentation.ts`: adaptación de estructuras existentes en compilación. Retira tamaños/posiciones fijos y espaciadores, conserva texto, enlaces, medios y controles; agrupa titulares fragmentados y reconoce columnas, tarjetas y demos.
- `EditorialHero.astro`: mensaje original, acciones editables y demo destacada real.
- `Section.astro`, Header, Footer, AudioPlayer y ContactForm mantienen los componentes compartidos.
- JSON estático importado por Vite: cambios editoriales locales se actualizan al guardar. No hay dependencia de Node en el hosting final.

Las plantillas originales y su CSS permanecen en el repositorio para trazabilidad/compatibilidad. Las páginas rediseñadas no cargan las hojas exportadas del constructor. El parser sólo se usa al compilar; no se envía al navegador. No se añaden dependencias.

## Fundamentos

| Grupo | Valores |
|---|---|
| Marca | Amarillo #F7D84C / #FFD113; naranja #DA6331 |
| Superficies | #111213 oscura, #1C1D1E elevada, #FFFFFF clara, #F5F5F3 suave |
| Texto | #151515 sobre claro; #F5F5F2 sobre oscuro; secundarios #5A5B59 / #B9BAB5 |
| Familias | Poppins principal; Bebas Neue editorial; Playfair expresiva; Space Mono técnica |
| Espaciado | Unidad de 8; 16, 24, 32, 40, 48, 64, 80, 96 y 120 px |
| Contenedor | Máximo 1200 px; lectura 68 caracteres aprox.; gutter fluido 20–48 px |
| Secciones | Separación fluida 56–96 px |
| Radios | Tarjetas 16 px, campos 10 px, botones 40 px |
| Elevación | Sombra de contacto y ambiente discreta; líneas finas de separación |
| Responsive | 1100 px navegación compacta; 767 px columnas apiladas; titulares fluidos |

Los titulares comerciales conservan sus palabras y énfasis. Se ajustan tamaños, interlineado, tracking y anchura. Sobre blanco, el amarillo sirve como subrayado/superficie para mantener legibilidad; sobre oscuro puede ser texto protagonista. No se convierte toda la web en tarjetas: conviven historias de texto, composiciones de imagen, bandas, galerías y formularios.

## Edición en Pages CMS

Se conservan todas las colecciones y campos anteriores. Cada bloque migrado añade opciones de presentación:

- `surface`: light, soft, dark o brand.
- `layout`: flow, split, cards, demos, logos, statement o hero.
- `artwork`: imagen de apoyo o fondo existente; opcional.
- `actions`: botones destacados con texto/destino; opcionales.
- `featuredDemos`: IDs existentes en la colección de demos; opcionales en hero.

Las listas originales de textos/imágenes/enlaces siguen siendo la fuente de edición. El nuevo hero deriva su texto de esos mismos fragmentos, sin una copia comercial hardcodeada. Las acciones de la home reutilizan textos/enlaces que ya existían en la página; se muestran también al principio para facilitar acceso. La selección de demos usa los archivos y personajes existentes. Los demás bloques y nuevas páginas mantienen compatibilidad; campos visuales ausentes usan flujo claro y no deben provocar errores.

Para nuevas páginas, se pueden usar bloques de texto, imagen, demo, galería o formulario. Para reutilizar una composición compleja, duplicar la página o sección existente conservando sus claves. CMS no es un editor de CSS libre ni una vista WYSIWYG. Su conexión externa sigue pendiente de autorización en GitHub.

## Componentes y accesibilidad

Botones con mínimo 48 px de altura y foco visible; campos con 16 px, etiquetas y validaciones originales. Nombres de demos legibles sobre superficie oscura. Audio nativo con progreso, volumen según dispositivo, teclado, error, sin autoplay y pausa entre instancias. El reproductor del hero reutiliza el componente existente y precarga sólo metadatos para mostrar duración; las demás demos mantienen carga bajo demanda. Menú móvil con estado, Escape y desplazamiento si no cabe. FAQs y carruseles conservan los manejadores existentes.

Movimiento breve y respeto a prefers-reduced-motion, sin librerías nuevas. No se necesita animación para descubrir contenido. Imágenes con ajuste proporcional; se permite encuadrar retratos/fondos sin deformarlos. Los archivos originales no cambian. Las capturas finales y comprobaciones se documentan separadamente; no se afirma conformidad WCAG completa.

## Integraciones y alcance

Sender conserva exactamente configuración, campos y bloqueo existentes. No se envían formularios reales ni se inventan listas/automatizaciones. SEO, idiomas, rutas, robots y sitemap se mantienen. No se publica ni se cambia producción. La validación externa de Pages CMS, Sender y Hostinger sigue pendiente.

## Reposicionamiento B2B

El contenido comercial usa ahora `CommercialSection.astro` y `commercial.css`; la adaptación de plantillas permanece únicamente para el contenido legal y como referencia histórica. `EditorialHero` pertenece al checkpoint visual anterior, no a las nuevas páginas comerciales.

Tres composiciones: home creativa con personaje original y galería de 16 demos; post operacional con secuencia EDIT/POST/QC, flujo solapado y captura real SuiteQA; datasets claro y preciso con idiomas y parámetros acordables. Las secciones alternan blanco, gris, negro y un cierre amarillo. Tarjetas sólo donde ayudan a comparar; procesos y servicios usan líneas y numeración discretas.

Hero en Poppins con tamaño fluido 42–70 px; secciones 32–48 px, cuerpo 15–18 px. Mono para etiquetas técnicas y Bebas para pasos/idiomas. Contenedor 1200 px, espacios 8 px, secciones 56–96 px, radios 10/16 px y botones píldora. En móvil se apilan hero/formulario y demos; las demos multilingües conservan todos los reproductores visibles. No hay carrusel ni animación nueva. Los reproductores nativos permiten teclado, volumen y búsqueda; sólo uno reproduce a la vez.

Las capturas de herramientas se muestran completas con pie y acceso al tamaño original. No se recrean pantallas ni instalaciones. Todo el copy comercial, imágenes, listas, CTAs, orden de demos y selección de formulario proviene de JSON editable. El código sólo define composición y comportamiento.
