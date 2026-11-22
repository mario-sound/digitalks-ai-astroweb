# Modelo de contenido en Pages CMS

## Edición cotidiana

Páginas contiene las dos homes; Servicios contiene postproducción y datasets ES/EN. Cada archivo indica ruta, idioma y registro SEO. No modificar IDs/rutas sin actualizar traducción y redirecciones.

Las secciones comerciales son una lista de bloques reordenable. Cada bloque incluye título, texto, fondo, elementos breves, botones y campos opcionales según el tipo. El selector `kind` determina composición: hero, sectores, servicios, proceso, flujo, SuiteQA, idiomas, especificaciones, demos y contacto. Se puede ocultar un bloque con `enabled: false`.

- Hero: título, introducción, botones, imagen o tres pasos técnicos.
- Sectores/servicios/proceso: lista de títulos y descripciones; no fragmentos HTML.
- SuiteQA: captura, alt, pie y nota. Subir únicamente imágenes autorizadas sin datos de proyectos.
- Demos: IDs en orden. La colección Demos permite editar MP3, idioma y referencia de personaje. El título y retrato se editan una sola vez en Personajes y se comparten entre idiomas. Los primeros seis son personajes; los grupos multilingües comparten ID de personaje. No cambiar asociaciones sin revisar el audio.
- Contacto: título, explicación, ID del formulario y email directo.
- Formularios: seis registros (tres servicios por dos idiomas), etiquetas, campos, opciones, obligatoriedad, botón, aviso y selección por ID. Configuración real Sender separada en General (IDs públicos, nunca claves). Mientras no está configurado, se muestra formulario accesible desactivado y email.
- SEO: title, descripción, canonical, alternates e imagen. Editar ES/EN en pareja.
- Navegación, pie e interfaz: archivos separados con claves ES/EN.
- Legal conserva el modelo heredado para evitar alterar textos legales sin revisión.

Los archivos anteriores están en `content/archive/` como referencia reversible, fuera de las colecciones activas y sin exportarse al sitio. No constituyen una segunda fuente editorial.

## Flujo de publicación

Pages CMS guarda JSON y medios en Git. El flujo de GitHub compila y verifica la rama; publicación FTPS sigue desactivada y protegida. Conectar repositorio/Pages CMS y credenciales reales queda pendiente del propietario. La configuración YAML se valida localmente; no se ha iniciado sesión en el servicio externo.

Para ver cambios localmente: `npm run dev`, abrir http://localhost:4321/. Los JSON usan importaciones observadas por Vite y se recargan al guardar. `npm run verify` comprueba tipos, compilación y contratos de medios, enlaces y SEO.

El nombre de archivo usa `{fields.id}.json` para mantener IDs estables aunque cambie el título. Referencias de configuración verificadas: [Filename](https://pagescms.org/docs/configuration/content/filename/), [Block](https://pagescms.org/docs/configuration/fields/block/), [List](https://pagescms.org/docs/configuration/content/list/).

La selección de demos, personajes y formularios usa [referencias nativas a colecciones](https://pagescms.org/docs/configuration/fields/reference/), con etiquetas legibles e IDs estables. Las demos son una lista reordenable de referencias; no es necesario escribir identificadores para añadir una demo existente. El registro de prueba local con campos vacíos está en `docs/strategy/cms-local-check.json`.
