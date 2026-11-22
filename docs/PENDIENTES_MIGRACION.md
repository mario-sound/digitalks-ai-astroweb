# Pendientes de migración

## Necesitan cuenta/configuración externa

1. Crear o seleccionar repositorio GitHub y propietario; conectar el remoto. No hay sesión GitHub CLI disponible ni se ha creado un repositorio remoto.
2. Autorizar Pages CMS para ese repositorio y probar edición real, guardado, commit, compilación y rollback.
3. Obtener de Sender los IDs públicos reales de cuenta y formularios, correspondencia de grupos, consentimiento, doble opt-in, mensajes de éxito, listas y automatizaciones. Los formularios están bloqueados para evitar envíos falsos. No se puede recuperar esta configuración desde HTML público.
4. Con autorización, enviar un contacto de prueba, verificar recepción, finalidad/consentimiento, confirmación y todas las automatizaciones. No se ha enviado ningún formulario real.
5. Configurar un destino staging HTTPS de Hostinger y credenciales FTPS en GitHub Secrets. Verificar compatibilidad de TLS, renombrado, cabeceras, CSP, rutas y caché. El despliegue está desactivado y no se ha probado contra Hostinger.
6. Autorizar expresamente cualquier futura publicación en el dominio principal. Nada en esta entrega cambia DNS, correo o producción.
7. Confirmar titularidad y configuración de Search Console/medición; actualmente no se carga analítica.

## Revisión de fidelidad y calidad

- Se conservan las 16 páginas públicas descubiertas, 16 MP3 únicos y 13 vídeos YouTube. No hay fallos HTTP en los 309 recursos de la captura inicial. Variantes de imágenes que no se usan se retiraron del paquete; sus URLs originales permanecen inventariadas.
- No se encontró una página de términos enlazada y accesible: se conserva la etiqueta original sin inventar un texto legal.
- La política de cookies original describe WordPress/servicios anteriores. Se conserva para revisión humana, pero debe actualizarse según las tecnologías finales antes de publicar. No se certifica RGPD ni otra conformidad legal.
- No se ejecuta el runtime del constructor. Se conservan las declaraciones públicas de entrada con una implementación nativa de fade/zoom, sus delays limitados y respeto a movimiento reducido; se sustituyen controles, acordeones y carruseles, y se reproduce el tachado visual de los titulares. Los efectos de blur/parallax y tiempos de entrada originales requieren una decisión/revisión adicional si se quiere igualdad temporal exacta. No se oculta contenido sólo por esperar una animación.
- Cabecera/pie y formularios se reconstruyeron como componentes reutilizables. El aviso de formularios pendientes y el consentimiento local introducen diferencias necesarias en la versión de pruebas. No se conserva reCAPTCHA privado; deberá resolverse desde Sender.
- La web original tiene desbordamientos en varios breakpoints. Se limita el desplazamiento horizontal en la réplica; hay que revisar manualmente todas las secciones con textos muy grandes, además de las capturas automáticas.
- Las capturas completas de la web original pueden incluir elementos aún sin animar/cargar por lazy loading. La comparación no es una certificación pixel a pixel. Las diferencias observadas están en COMPARATIVA_VISUAL.md.
- Auditoría básica de accesibilidad y pruebas de comportamiento superadas. Pendientes evaluación completa WCAG 2.2 AA, lectores de pantalla, contraste en cada fondo, ampliación 200/400%, dispositivos iOS/Android reales y navegadores distintos.
- No hay mediciones de campo de Core Web Vitals ni informe Lighthouse completo. Se sirven medios locales optimizados, audios bajo demanda y JavaScript reducido; CSS heredado de la exportación aún puede reducirse de forma controlada.

## Lo que no se inventó

No se generaron nuevas voces, traducciones, fotografías, términos legales, grupos Sender, IDs privados, claves ni resultados de envío. La página inglesa de Audio Data Collection contiene algunos encabezados accesibles en español en el original; se han conservado los publicados. Se añadieron equivalencias SEO entre voz-ia/ia-voice y locucionesia/voiceoverai por correspondencia de contenido, ausentes en el head original. Las páginas sin equivalente traducido ofrecen la portada del otro idioma.
