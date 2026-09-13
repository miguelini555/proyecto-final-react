# Decisiones técnicas del proyecto

## 1. Introducción

Para desarrollar Expedición Transiberiana se eligieron tecnologías y herramientas que permiten construir una aplicación web interactiva, mantener separadas las responsabilidades del frontend y backend y cumplir con los requisitos del proyecto.
Las principales decisiones fueron utilizar React + TypeScript para el frontend, Express + TypeScript para el backend, `useState` para manejar el estado de la interfaz, `fetch` para la comunicación con el servidor y CSS propio para el diseño.
La intención es mantener una estructura sencilla, entendible y fácil de explicar durante la defensa del proyecto.


## 2. Elección de React

Se eligió React para desarrollar el frontend porque el juego necesita actualizar constantemente la interfaz dependiendo de las acciones de los jugadores.
Durante una partida pueden cambiar:
- La posición de cada jugador.
- El turno actual.
- Los recursos disponibles.
- El puntaje.
- Los eventos de la partida.
- Los mensajes mostrados al jugador.
- El estado de la partida.
- El ganador.
React permite representar estos cambios en la interfaz a partir del estado actual de la aplicación.

Además, React fue utilizado durante las clases, por lo que permite aplicar conceptos trabajados en el curso como:
- Componentes.
- `useState`.
- Eventos como `onClick`.
- Renderizado condicional.
- `map()` para mostrar información.
- Manejo de datos mediante TypeScript.
Por esta razón se decidió utilizar React sin agregar librerías externas de interfaz.


## 3. Elección de TypeScript

Se utiliza TypeScript tanto en el frontend como en el backend.
La principal razón es que permite definir con mayor claridad la estructura de los datos utilizados por el juego.

Por ejemplo, una partida puede manejar información como:
- Identificador.
- Jugadores.
- Turno.
- Posiciones.
- Recursos.
- Puntajes.
- Eventos.
- Estado de la partida.
- Ganador.
Al definir estos datos mediante tipos e interfaces se reduce la posibilidad de utilizar información incorrecta dentro del programa.
También permite mantener una estructura similar entre el frontend y el backend, especialmente en los datos enviados y recibidos mediante JSON.


## 4. Elección de Express

Se eligió Express para construir el backend porque el proyecto necesita un servidor que reciba las acciones realizadas desde React y procese la lógica principal de la partida.
Express permite crear las rutas necesarias para la API REST.
Las principales rutas definidas son:
- `POST /api/partidas`
- `GET /api/partidas/:id`
- `POST /api/partidas/:id/jugada`
- `GET /api/partidas/:id/historial`
El backend no solamente recibe información, sino que también participa en la lógica del juego.

Por ejemplo, cuando un jugador intenta avanzar, el backend debe comprobar:
1. Que sea el turno del jugador.
2. Que la partida todavía esté activa.
3. Que tenga suficientes recursos.
4. Que pueda realizar la acción.
5. Actualizar los recursos.
6. Actualizar su posición.
7. Procesar el evento correspondiente.
8. Comprobar si terminó la partida.
9. Determinar el resultado cuando corresponda.
De esta manera, la lógica importante del juego no queda únicamente en el navegador.


## 5. Elección de `useState`

Se decidió utilizar `useState` para manejar el estado visual de la aplicación React.
El juego necesita actualizar información después de cada jugada. Por ejemplo:
```ts
const [partida, setPartida] = useState<Partida | null>(null);
