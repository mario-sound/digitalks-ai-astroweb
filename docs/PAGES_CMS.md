# Edición con Pages CMS

La configuración sigue la documentación oficial: https://pagescms.org/docs/ y https://pagescms.org/docs/configuration/fields/block/. Pages CMS edita archivos de GitHub; no crea un panel /admin en Astro.

## Conectar

1. Crear un repositorio GitHub, preferiblemente privado inicialmente, con estos archivos y la rama `main`. El propietario/cuenta debe decidirse con el titular. No hay remoto configurado en esta entrega.
2. Entrar en https://app.pagescms.org/ con la cuenta GitHub e instalar/autorizar la aplicación sólo para ese repositorio.
3. Seleccionar repositorio y rama. Pages CMS leerá `.pages.yml` en la raíz.
4. Editar un texto de prueba, guardar y revisar el commit/build de GitHub Actions. Esta conexión real todavía no ha sido probada.
5. Mientras se revisa el contenido, trabajar en `develop` si se quiere evitar cambios en la rama de publicación.

## Colecciones y archivos

| Área | Uso |
|---|---|
| Páginas / Servicios / Contenido legal | Rutas, idioma y secciones |
| Demos | Archivo de audio, personaje, idioma, imagen y orden |
| Personajes | Catálogo para organizar y ampliar demos |
| Idiomas | Nombres de idioma, portada y texto de error de audio |
| Navegación | Enlaces y títulos por idioma |
| Configuración general | Logotipo, URL, preview, Sender público, GTM desactivado y verificación Search Console |
| Pie de página | Textos y enlaces originales compartidos |
| Interfaz y consentimiento | Etiquetas de navegación y consentimiento ES/EN |
| Formularios | Campos, textos, estado e ID público real de Sender |
| SEO | Title, descripción, canonical, equivalencias de idioma e imagen OG |

## Editar las páginas originales

En Secciones, abre el bloque por su título. Textos muestra cada fragmento con su etiqueta original; cambia su valor. Imágenes permite subir/sustituir archivos y editar alt. Enlaces permite cambiar destinos; el texto de botones está entre los fragmentos de texto. Fondos está a nivel de página. Puedes reordenar, ocultar y duplicar secciones completas, conservando sus identificadores técnicos. No cambies claves de plantilla o fragmentos: están marcadas como sólo lectura.

Las secciones originales conservan fragmentos de formato separados para no perder negritas, tamaños y saltos. Este editor es estructurado, no una vista WYSIWYG de la web. Para rehacer una distribución se editan las plantillas/CSS con Codex, sin contratar un constructor.

## Crear páginas y demos

- Crear un archivo en Páginas con ID único, título, ruta `/nueva-pagina/`, idioma e ID de SEO. Crear también el registro SEO correspondiente. Usar los bloques de texto, imagen, demo, galería de demos o formulario; no es necesario crear HTML.
- Para conservar una composición original, duplicar una página con sus bloques y dar una ruta/ID/SEO nuevos. La plantilla original necesita sus listas de fragmentos; elegir una plantilla vacía sin esos datos hará que la compilación detecte el contenido incompleto.
- Las galerías nuevas usan el orden de la colección de demos y pueden filtrar idioma. Las posiciones de las demos originales se conservan en la estructura importada para no separar cada audio de su personaje y bandera. Para reordenarlas visualmente se mueven sus tarjetas completas con Codex, o se usa una galería nueva.
- Al sustituir el archivo de una demo en Demos, el reproductor original que la referencia usa el nuevo archivo tras compilar. Las imágenes decorativas originales se gestionan desde la sección de la página; la imagen de Demos sirve para galerías nuevas. Personajes es un catálogo, no una traducción automática ni una sustitución de imágenes en todas las páginas.
- Para añadir un idioma distinto de ES/EN hay que ampliar también `astro.config.mjs`, menús, etiquetas y equivalencias. No basta con añadir un registro al catálogo.
- Nuevos archivos de media deben ser razonables en tamaño: para estas demos bastan MP3 de menos de 2 MB. Las capturas originales recuperadas están documentadas; no subir vídeos grandes al repositorio.

## Formularios

Seleccionar el ID de un formulario existente en la sección. Hasta disponer de datos reales, todos están `unconfigured` y el botón de envío permanece desactivado. `senderAccountId` debe ser el ID **público**, nunca una API key. El formulario configurado se inserta con el SDK oficial y `data-sender-form-id`; sus campos efectivos, consentimiento y automatizaciones deben configurarse y verificarse en Sender. Los campos locales sirven para reproducir la vista pendiente, no sobreescriben automáticamente el editor privado de Sender.

## Límites verificados

La sintaxis YAML y las referencias se prueban localmente. No se ha autorizado ni conectado todavía la app de Pages CMS en GitHub, por lo que no se afirma que el ciclo editar→commit→deploy haya sido probado. Pages CMS no proporciona edición visual libre de CSS/animaciones. El diseño original usa valores CSS fijos; textos mucho más largos requieren revisión móvil después del build.
