# Motion DigiTalks

Tokens en `premium.css`: microinteracción 180 ms; entrada 620 ms; easing cubic-bezier(.2,.7,.2,1); distancia 18 px; stagger reservado 70 ms; parallax 0 px (no se añade); cinta 36 s lineal. `premium.ts` lee los tokens de entrada desde CSS. No se añaden librerías.

Las entradas con IntersectionObserver/WAAPI desplazan y cambian opacidad desde .45 hasta 1, una vez. El HTML permanece visible antes del script y si no se ejecuta. H1 e imágenes no esperan a JavaScript; no se anima altura ni se reserva espacio mediante scripts.

La cinta de especialidades usa dos grupos idénticos decorativos y una lista semántica única. Sólo corre en viewport, con movimiento permitido; pausa por control accesible, hover o foco. Con reduced motion o sin JS se muestra la lista estática. No se cuenta desde cero la cifra 10+: su atribución al equipo siempre está visible.

Las tarjetas responden a hover/foco sin cambiar layout. El flujo REC/POST/QA/Entrega usa barras temporales esquemáticas solapadas y dos barridos breves al entrar en pantalla; no representa métricas en tiempo real. SuiteQA usa imágenes auténticas y profundidad CSS; la ampliación es un diálogo nativo.

`prefers-reduced-motion: reduce` elimina animaciones, transiciones y scroll suave. El listener cancela las entradas en curso si cambia la preferencia. El audio mantiene sus estados y controles funcionales sin animación necesaria. No hay visualizadores de señal simulados.
