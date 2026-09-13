# Expedición Transiberiana

## 1. Introducción

Expedición Transiberiana es un juego web de estrategia por turnos para dos jugadores, ambientado en el recorrido del Ferrocarril Transiberiano a través de Rusia.
Cada jugador controla una expedición ferroviaria que comienza su recorrido en Moscú y tiene como objetivo avanzar hacia Vladivostok. Durante la partida, los jugadores deberán administrar sus recursos, tomar decisiones estratégicas y enfrentarse a diferentes situaciones que pueden facilitar o dificultar su recorrido.
El juego busca representar de manera sencilla y visual los desafíos de realizar una larga expedición ferroviaria a través de Siberia, utilizando el recorrido, los recursos y los eventos de la partida como elementos principales de la experiencia.
El proyecto será desarrollado como una aplicación web utilizando React y TypeScript para el frontend y Express y TypeScript para el backend.


## 2. Propósito del proyecto

El propósito del proyecto es desarrollar un juego web interactivo que permita demostrar el funcionamiento completo de una aplicación desarrollada con React, TypeScript y Express.
La aplicación debe permitir que una acción realizada por un jugador modifique el estado de la partida, que React represente visualmente ese nuevo estado y que el frontend se comunique con el backend mediante solicitudes HTTP.
El backend tendrá una participación real en el funcionamiento de la partida. No se utilizará únicamente como un servidor para entregar la página, sino que participará en el procesamiento de las acciones y en la administración del estado de la partida.

De esta manera, el proyecto permitirá aplicar los conceptos estudiados durante el curso, especialmente:
- Componentes de React.
- TypeScript.
- Estado mediante `useState`.
- Eventos y funciones manejadoras.
- Renderizado condicional.
- Representación de listas mediante `map()` y `key`.
- Comunicación mediante `fetch`.
- API HTTP REST.
- Comunicación mediante JSON.
- Backend desarrollado con Express.
- Pruebas end-to-end.
- GitHub Actions.
- Publicación de la aplicación.


## 3. Experiencia de juego

La partida comienza con dos jugadores y una ruta ferroviaria que representa el recorrido desde Moscú hasta Vladivostok.
Cada jugador tendrá una expedición representada dentro del escenario de juego. Los jugadores podrán observar su posición, sus recursos, el estado de la partida, los eventos activos y la información relacionada con su oponente.
La partida se desarrollará por turnos. En cada turno, el jugador podrá seleccionar una acción disponible. Dependiendo de la acción elegida, el estado de la partida podrá cambiar.
Las acciones tendrán consecuencias diferentes. Por esta razón, los jugadores deberán decidir qué acción realizar de acuerdo con su posición, sus recursos, el estado de la partida y la situación del oponente.
El sistema mostrará visualmente los cambios producidos después de cada acción.


## 4. Jugadores

El juego contará con dos jugadores.
Los jugadores competirán dentro de una misma partida y afectarán un estado compartido.
Cada jugador tendrá su propia expedición y determinados recursos que deberán administrar durante el recorrido.
Los jugadores podrán interactuar indirectamente mediante acciones que afecten el desarrollo de la partida y el avance del oponente.


## 5. Objetivo

El objetivo principal es completar la expedición a través de la ruta Transiberiana y alcanzar Vladivostok.
Sin embargo, avanzar no será la única consideración del juego. Los jugadores deberán administrar sus recursos y tomar decisiones estratégicas durante el recorrido.
La puntuación y las condiciones utilizadas para determinar al ganador serán definidas durante la etapa de diseño de las reglas del juego.


## 6. Elementos principales

La partida contará con los siguientes elementos principales:

### 6.1. Mapa

El escenario principal será un mapa simplificado del recorrido del Ferrocarril Transiberiano.
El recorrido comenzará en:
Moscú
y finalizará en:
Vladivostok
Entre ambos puntos existirán diferentes estaciones o posiciones que representarán el avance de las expediciones.

### 6.2. Expediciones

Cada jugador controlará una expedición representada visualmente por un tren.
Los trenes cambiarán de posición durante la partida como consecuencia de las acciones realizadas.

### 6.3. Recursos

Los jugadores deberán administrar diferentes recursos durante la expedición.
Entre los recursos considerados inicialmente se encuentran:
- Combustible.
- Suministros.
- Energía.
- Recursos generales.
- Puntuación.
La cantidad y funcionamiento definitivo de cada recurso se establecerá en el documento de reglas del juego.

### 6.4. Eventos

Durante una partida podrán aparecer diferentes eventos que modifiquen las condiciones del recorrido.
Algunos eventos podrán beneficiar al jugador, mientras que otros podrán representar dificultades para su expedición.
Los eventos permitirán que diferentes partidas puedan presentar situaciones distintas.


## 7. Decisiones del jugador

El jugador no deberá limitarse a presionar repetidamente un único botón.
Durante su turno tendrá que elegir entre diferentes acciones que tendrán consecuencias distintas.
Inicialmente se consideran las siguientes acciones:
- Avanzar: permite desplazarse por la ruta, pero consume recursos.
- Explorar: permite buscar recursos o enfrentarse a un evento.
- Prepararse: permite administrar determinados recursos antes de continuar.
- Bloquear: permite afectar temporalmente el avance del oponente.
Estas acciones serán refinadas y definidas completamente en `docs/reglas.md`.
La intención es que el jugador tenga que evaluar la situación actual antes de tomar una decisión.


## 8. Estado de la partida

La aplicación deberá conservar y representar diferentes tipos de información relacionada con la partida.
Entre los estados principales considerados se encuentran:
- Posición de cada expedición.
- Recursos de cada jugador.
- Suministros.
- Energía.
- Turno actual.
- Eventos activos.
- Puntuación.
- Estado de finalización de la partida.
- Ganador.
Estos estados estarán relacionados entre sí. Por ejemplo, una acción de avance puede modificar la posición de una expedición y, al mismo tiempo, disminuir sus recursos.
React será responsable de representar visualmente el estado actual de la partida y actualizar la interfaz cuando este cambie.


## 9. Interacción entre jugadores

Los dos jugadores participarán dentro de una misma partida y sus decisiones podrán afectar el estado compartido.
La interacción podrá producirse mediante acciones que modifiquen las condiciones del recorrido o dificulten el avance del oponente.
El objetivo de esta interacción es que los jugadores no realicen dos recorridos completamente independientes, sino que exista competencia por las condiciones de la misma partida.


## 10. Papel de React

React será responsable de la interfaz y de la interacción con los jugadores.
Entre sus responsabilidades estarán:
- Mostrar la pantalla inicial.
- Mostrar las instrucciones.
- Representar el mapa.
- Mostrar las expediciones.
- Mostrar los recursos de cada jugador.
- Mostrar el turno actual.
- Mostrar los eventos.
- Recibir las acciones del jugador.
- Actualizar el estado visual de la partida.
- Mostrar mensajes de acciones válidas e inválidas.
- Mostrar el resultado de la partida.
El frontend utilizará TypeScript para definir los datos y la lógica relacionada con la interfaz.


## 11. Papel de Express

Express será responsable de la parte del servidor relacionada con la partida.
El backend tendrá participación directa en el funcionamiento del juego.
Entre sus responsabilidades estarán:

- Crear partidas.
- Administrar información de los jugadores.
- Recibir acciones realizadas por los jugadores.
- Validar acciones.
- Procesar cambios importantes de la partida.
- Generar o administrar eventos.
- Calcular resultados cuando corresponda.
- Entregar el estado de la partida al frontend.
La lógica crítica de la partida no estará únicamente dentro del navegador.


## 12. Comunicación entre frontend y backend
React y Express se comunicarán mediante una API HTTP REST.
La comunicación utilizará:
- Solicitudes HTTP.
- `fetch` desde el frontend.
- JSON como formato de entrada.
- JSON como formato de salida.
El frontend enviará las acciones realizadas por los jugadores al backend y recibirá como respuesta información actualizada de la partida.
La definición detallada de los endpoints, métodos HTTP, datos enviados y respuestas será documentada posteriormente en:
`docs/api.md`


## 13. Finalización de la partida

La partida tendrá un estado inicial, un desarrollo por turnos y una condición de finalización.
La partida terminará cuando se cumpla la condición de victoria definida en las reglas.
Al finalizar, la aplicación mostrará una sección de resultado donde los jugadores podrán conocer:
- El ganador.
- La puntuación.
- El estado final de las expediciones.
- Los principales resultados de la partida.
También se contemplarán situaciones en las que una acción no sea válida o cuando la partida ya haya terminado.


## 14. Variabilidad

Las partidas no deberán ser exactamente iguales.
Para conseguirlo, se utilizarán elementos variables como eventos, recursos o situaciones que puedan aparecer durante el recorrido.
Esto permitirá que los jugadores tengan que adaptarse a las condiciones de cada partida y tomar decisiones diferentes.
La implementación concreta de la variabilidad será definida en `docs/reglas.md`.


## 15. Interfaz

La aplicación utilizará una interfaz propia desarrollada mediante React y CSS.
La pantalla principal estará organizada alrededor del escenario de la expedición e incluirá información de los jugadores, el mapa, recursos, controles y mensajes importantes.
La interfaz deberá permitir que el jugador comprenda el estado de la partida sin necesidad de utilizar la consola del navegador.
Los cambios importantes, errores, turnos, recursos, eventos y resultados deberán mostrarse visualmente.


## 16. Alcance inicial

La primera versión del proyecto tendrá como objetivo implementar una partida completa y funcional para dos jugadores.
El proyecto se desarrollará progresivamente:
1. Definición de las reglas.
2. Diseño de la interfaz.
3. Definición del estado de la partida.
4. Implementación del frontend con React y TypeScript.
5. Implementación del backend con Express y TypeScript.
6. Comunicación mediante API REST y `fetch`.
7. Integración de la lógica de la partida.
8. Pruebas end-to-end.
9. Configuración de GitHub Actions.
10. Publicación de la aplicación.
11. Documentación y preparación de la defensa.


## 17. Resultado esperado

Al finalizar el proyecto se espera contar con un juego web funcional en el que dos jugadores puedan participar en una expedición ferroviaria por la ruta Transiberiana.
La aplicación deberá integrar interfaz, estado, interacción, reglas, comunicación con el backend y procesamiento de la partida.
El proyecto deberá poder ejecutarse, probarse y utilizarse mediante una aplicación publicada, permitiendo demostrar durante la defensa el funcionamiento completo del sistema.
