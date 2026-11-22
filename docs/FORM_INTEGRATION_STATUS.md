# Formularios y Sender

**Estado: sin configurar y sin enviar pruebas reales.** `senderEnabled:false`, cuenta vacía, los seis IDs vacíos. El botón continúa desactivado, cualquier submit nativo se cancela y se muestra email alternativo. No existe endpoint añadido, backend, clave pública ni éxito simulado.

El adaptador conserva el mecanismo oficial: contenedor `sender-form-field` + `data-sender-form-id` y `universal.js`, sujeto al consentimiento externo. La UI compacta local se sustituirá por el embed real cuando haya configuración válida; no se afirma que las dos interfaces tengan automáticamente el mismo estilo o campos. Ajustar diseño y validarlo en Sender es un paso necesario de activación.

Documentación oficial revisada:

- [Crear formularios](https://www.sender.net/help/lead-capture/creating-signup-forms/): formulario embebido con email y controles de protección.
- [Campos](https://www.sender.net/help/lead-capture/form-field-types-and-configuration/): email y campo personalizado de texto opcional. Confirmar soporte/longitud del mensaje y presentación expandible en la cuenta real; no prometer textarea propio si el embed no lo permite.
- [Diseño](https://www.sender.net/help/lead-capture/customizing-form-design/): tipografía, controles, espaciados y vista de éxito.
- [Diagnóstico del embed](https://www.sender.net/help/lead-capture/form-troubleshooting/): SDK oficial y contenedor.
- [Grupos/listas](https://www.sender.net/help/lead-capture/connecting-forms-to-lists/): Sender almacena datos en perfiles/grupos. Separar consultas de marketing; no activar campañas ni automatizaciones comerciales para este flujo.

La política local vigente contempla atender consultas mediante medidas precontractuales o interés legítimo según su naturaleza, y trata el marketing por separado. Referencia sobre información por capas: [guía AEPD](https://www.aepd.es/guias/guia-modelo-clausula-informativa.pdf). La eliminación de la casilla genérica no sustituye revisar el tratamiento con el responsable.

Antes de activar: crear los seis formularios con email obligatorio y texto opcional; configurar finalidad, destinatarios, antispam y conservación; vincular IDs públicos; comprobar consentimiento externo, autocompletado, móvil, estados reales de carga/error/éxito y prevención de doble envío del embed; realizar un envío autorizado y verificar recepción. No se han probado los estados de red de una integración que aún no existe.
