# DigiTalks: estrategia B2B

## Auditoría y decisiones

Se parte del clon estático Astro, del sistema DigiTalks/Specify y de las 16 rutas de origen. El checkpoint visual anterior es `efaea52`; el origen WordPress importado está documentado en `docs/original/`. Se revisaron ambas presentaciones locales (13 y 11 páginas), el HTML ES/EN, las 16 demos y la integración Sender. Los PDF privados quedan fuera de Git, `public` y la compilación.

La oferta anterior repartía doblaje, creación de voces, locuciones y captación de datos entre páginas redundantes. La nueva arquitectura mantiene tres líneas, cada una con comprador, problema y conversión propios.

| Línea | Comprador | Problema | Valor | Conversión |
|---|---|---|---|---|
| Doblaje multilingüe con IA | Productoras, distribuidoras, propietarios de IP, desarrolladoras y publishers | Llevar catálogos y diálogos a otros territorios con una inversión viable | Producción coordinada, métodos humanos/IA según personaje, fases completas o parciales | Presupuesto con idiomas, volumen y contenido |
| Game audio post-production | Estudios de grabación, videojuegos, publishers, proveedores de localización | Picos, lotes tardíos, más idiomas y capacidad interna insuficiente | Equipo externo, procesamiento según especificación, grabación y post solapadas, contexto con SuiteQA | Revisión de archivos, servicios, especificación y fecha |
| Studio voice datasets | ASR, TTS, I+D y proveedores de datos | Necesidad de voz consistente bajo requisitos específicos | Grabación supervisada en estudio, talento nativo, QC y entrega organizada | Presupuesto con idiomas, perfiles, horas, uso y requisitos |

## Arquitectura

Seis páginas comerciales: tres servicios en ES/EN. Home absorbe Voz IA. Se mantienen `/audio-development/`, `/audio-data-collection/` y equivalentes EN para conservar continuidad. Menú de cuatro entradas más idioma: Doblaje, Post, Datasets, Contacto. El logo enlaza a la home del idioma. Las tres páginas acaban en formularios específicos y contacto directo por email.

La home diferencia distribución y continuidad de personajes en animación de volumen e integración en localización para juegos. Las demos son evidencia audible, accesible sin carrusel. Todas las 16 siguen disponibles en ambas versiones. Las categorías se limitan a personajes y ejemplos multilingües. No se atribuyen a proyectos de animación sin evidencia.

Post explica servicio principal, solapamiento operativo, SuiteQA interno, modalidades y complementos separados. Datasets abandona OTS y captación masiva: se produce un corpus nuevo por encargo, principalmente FIGS y catalán; disponibilidad y especificación se acuerdan por proyecto.

## Confianza y límites

No se publican precios, destinatarios privados, cifras de capacidad, logotipos de clientes ni créditos AAA. El dashboard de cliente no se ofrece. SuiteQA se muestra mediante captura auténtica de la diapositiva 3, sin la ventana de administración de usuarios. La presentación de doblaje informa el catálogo de fases y métodos; sus ejemplos audiovisuales adicionales no se incorporan sin medios y permiso.

La estrategia no promete ROI, disponibilidad universal de idiomas, voces siempre exclusivas ni anotación de datasets. Los derechos y el consentimiento se pactan por proyecto.

## Conversión y operación

Sender conserva su adaptador oficial y su control de consentimiento. Como no hay IDs reales configurados, los envíos permanecen desactivados con aviso y enlace de email. No se han enviado datos de prueba. Activación y recepción real requieren acceso a Sender y una prueba autorizada. La edición cotidiana se hace en Pages CMS sobre bloques comerciales; GitHub/Hostinger no se han conectado ni publicado durante este trabajo.
