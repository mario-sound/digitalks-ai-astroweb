# Medios recuperados y optimización

Se descargaron 309 recursos públicos (CSS, fuentes, imágenes, GIF y MP3), sin errores HTTP. Se conservaron 137 archivos de medios en uso, 37.1 MB en total; el mayor ocupa 6,3 MB. El paquete estático completo ocupa aproximadamente 54 MB.

Las fotografías PNG/JPEG grandes se convirtieron a WebP con anchura máxima 1600 y calidad 90; se deduplicaron contenidos idénticos. No se generaron imágenes nuevas. Se mantuvieron los GIF originales para conservar sus animaciones. Los 16 MP3 originales se conservaron sin transcodificar; ffprobe confirmó duraciones de 10,8 a 39,5 segundos y bitrates aproximados de 133 a 320 kbps. La carga es bajo demanda (preload none), sin autoplay.

No hay ningún fichero próximo al límite de 100 MB de GitHub. Esto no verifica las cuotas particulares de una cuenta de Pages CMS o GitHub; no se ha conectado ninguna. Para grabaciones largas o vídeo futuro debe evaluarse alojamiento de medios antes de subirlos al repositorio.

Las variantes de resolución y CSS descargadas que no se utilizan se retiraron de public. La columna Current served file del inventario señala el archivo utilizado, el CSS archivado o una variante cuya URL original queda conservada. original/asset-map.json mantiene la trazabilidad. Las fuentes se sirven localmente, sin peticiones a Google Fonts desde las páginas.

Hay 31 formularios en las páginas fuente, documentados por instancia, y 13 widgets públicos de YouTube recuperados desde data-settings. Los vídeos siguen en YouTube y no se descargaron: se usa su ID real en el embed de privacidad mejorada tras consentimiento/acción.
