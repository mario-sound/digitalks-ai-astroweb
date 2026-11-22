# Instalación y publicación

## Local

Node 22.19+; recomendado 24 LTS. `npm ci`, `npm run dev`, abrir http://127.0.0.1:4321/. `npm run verify` revisa tipos/componentes, genera `dist/` y ejecuta pruebas. `npm run preview` sirve la salida estática.

El equipo de esta migración tenía Node 22.13 y la verificación pasó. Una dependencia indirecta de Astro declara 22.19+, por lo que se recomienda actualizar Node para el trabajo futuro y CI usa Node 24. No se ha cambiado Node del equipo.

## GitHub

Git está inicializado localmente con commits por hitos. No hay remoto, credenciales ni organización GitHub seleccionada. Crear el repositorio sin README inicial y subir este proyecto; después crear `develop` desde `main` en GitHub o enviar la rama local preparada. Nunca subir `.env`, contraseñas ni claves de Sender.

`site.yml` verifica pushes en main/develop y PRs; guarda `dist/` como artefacto 14 días. El flujo de compilación no necesita credenciales de servicios. No se ha ejecutado en GitHub todavía.

## Hostinger: empezar en staging

Hostinger sólo necesita archivos estáticos: no arrancar Node ni WordPress. Usar una web/subdominio de prueba independiente, con HTTPS ya configurado por el titular, y un directorio FTP dedicado. La subida no debe apuntar al directorio WordPress actual. No se ha tocado DNS, hPanel, SSL ni correo.

Preparar los entornos GitHub `hostinger-staging` y, sólo después de autorización explícita, `hostinger-production`. Proteger el entorno de producción con revisores requeridos. Definir estos **secrets del entorno**, nunca en el código:

- `HOSTINGER_FTP_HOST`: hostname con certificado TLS válido, no una IP incompatible con el certificado.
- `HOSTINGER_FTP_USER` y `HOSTINGER_FTP_PASSWORD`.
- `HOSTINGER_FTP_DIR`: directorio remoto existente y dedicado; confirmar la ruta exacta en hPanel.

Variables del repositorio:

- `HOSTINGER_DEPLOY_ENABLED=true` activa la publicación después de una verificación correcta en main. Por defecto, al no existir la variable, no se publica.
- `HOSTINGER_DEPLOY_TARGET=staging` para las primeras pruebas.
- `HOSTINGER_PRODUCTION_AUTHORIZED=true` sólo tras aprobar el cambio a producción, y usando target `production`. El script exige también revisar `preview` antes de permitirlo.

El flujo descarga el artefacto del mismo commit verificado; usa FTPS explícito, puerto 21, certificado verificado y canal de datos cifrado. Los activos se suben antes del HTML. Cada archivo se carga temporalmente y se renombra. No borra archivos remotos. No equivale a un despliegue atómico de toda la web: una interrupción puede dejar una versión mixta, por lo que la primera prueba debe hacerse en staging. No hay fallback a FTP sin cifrar. Compatibilidad FTPS y renombrado del servidor pendientes de comprobar con credenciales reales.

La configuración `.htaccess` incluye HTTPS, 404, cabeceras y caché. El preview de Astro no aplica reglas Apache/LiteSpeed: hay que verificarlas en staging. La CSP de Sender se debe ajustar según los dominios reales que use su embed, sin abrirla indiscriminadamente.

## Flujo editorial final

Pages CMS guarda un commit → GitHub Actions verifica/compila → guarda artefacto → el despliegue, si está habilitado, lo sube a Hostinger. No hay que usar terminal para cada cambio editorial una vez que se hayan conectado y probado los servicios. Ese ciclo completo permanece pendiente de verificación externa.

## Revertir

Guardar una copia del sitio y la configuración antes del primer despliegue. Para revertir contenido/código, revertir el commit problemático en GitHub y dejar que se genere/despliegue el nuevo artefacto, o restaurar un artefacto de una versión verificada. No borrar medios antiguos durante el despliegue: permiten que el HTML anterior siga encontrándolos. Al conservarse ficheros antiguos, retirar una URL requiere planificar su 301/410; borrar un JSON no elimina automáticamente esa ruta del servidor.

## Antes de producción

Revisión visual humana, prueba autorizada de Sender/consentimiento/automatizaciones, compatibilidad móvil real y comprobación de cabeceras/HTTPS. Revisar los textos legales. Confirmar URL canónica definitiva. Desactivar `preview` sólo en el cambio autorizado; comprobar robots y sitemap. Configurar/verificar Search Console con la propiedad real y decidir la medición existente. No se ha añadido analítica automática ni se han inventado identificadores de propiedad. Las rutas públicas actuales se conservan, por lo que no se requieren 301 de contenido en esta primera versión; las variantes históricas no descubiertas necesitan revisión con Search Console/logs del titular.

## Medición preparada, desactivada

Se conservó el identificador público observado `GTM-P7ZDX8XW` en Configuración general. `analyticsEnabled` es false y el código no carga GTM mientras `preview` sea true; además exige aceptar servicios opcionales. Antes de activarlo, revisar el contenido privado del contenedor y sus destinos/consentimientos con su titular. Cambiar a sólo necesarias recarga la página para evitar nuevas cargas, pero la retirada/borrado de cookies de cada proveedor y las señales de Consent Mode requieren validar el contenedor real. No se garantiza que sus etiquetas/automatizaciones actuales estén verificadas. La CSP admite sólo los destinos indicados y debe probarse. Search Console tiene un campo para el token real de verificación, vacío por no encontrarse en el HTML público; no se ha modificado ninguna propiedad de Google. Documentación: https://support.google.com/tagmanager/answer/14842164.
