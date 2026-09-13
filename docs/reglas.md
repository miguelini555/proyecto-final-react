# Expedición Transiberiana - Reglas del juego

## 1. Descripción general

Expedición Transiberiana es un juego de estrategia por turnos para dos jugadores.
Cada jugador controla una expedición ferroviaria que debe recorrer una ruta inspirada en el Ferrocarril Transiberiano, comenzando en Moscú y avanzando hacia Vladivostok.
Durante la partida, los jugadores deberán administrar sus recursos, decidir qué acciones realizar, responder a eventos y competir por completar la expedición en las mejores condiciones posibles.
El juego no consiste únicamente en avanzar. Cada jugador deberá decidir cuándo avanzar, cuándo buscar recursos, cuándo prepararse y cuándo afectar el recorrido del oponente.


# 2. Jugadores

La partida está diseñada para exactamente dos jugadores:
- Jugador 1.
- Jugador 2.
Cada jugador tendrá una expedición independiente, pero ambos participarán sobre el mismo estado de partida.

Cada jugador tendrá:
- Una posición en el mapa.
- Combustible.
- Suministros.
- Energía.
- Puntuación.
- Acciones disponibles.
- Estado de su expedición.
Los jugadores se identificarán visualmente mediante un color y un tren diferente dentro del mapa.


# 3. Objetivo del juego

El objetivo principal es completar la expedición desde Moscú hasta Vladivostok.
Sin embargo, el jugador también debe administrar correctamente sus recursos y tomar decisiones estratégicas.
Una expedición que avance rápidamente pero se quede sin recursos puede quedar en una situación desfavorable.
El ganador será determinado según las condiciones de finalización establecidas en este documento.


# 4. Mapa

El mapa representa una ruta simplificada del recorrido Transiberiano.
La ruta estará formada por estaciones conectadas.

El recorrido inicial será:
Moscú → Nizhni Nóvgorod → Kazán → Ekaterimburgo → Omsk → Novosibirsk → Krasnoyarsk → Irkutsk → Ulan-Udé → Vladivostok
Cada estación tendrá una posición dentro del mapa.
La posición de una expedición será modificada durante la partida mediante las acciones de los jugadores.


# 5. Recursos iniciales

Cada jugador comenzará la partida con los siguientes valores:
| Recurso | Valor inicial |
|---|---:|
| Combustible | 100 |
| Suministros | 50 |
| Energía | 50 |
| Puntuación | 0 |
| Posición | Moscú |
Los recursos no podrán tener valores negativos.
Si una acción requiere más recursos de los disponibles, la acción será considerada inválida.


# 6. Turnos

La partida será desarrollada por turnos.
El orden inicial será:
1. Jugador 1.
2. Jugador 2.
3. Jugador 1.
4. Jugador 2.
5. Continuar hasta finalizar la partida.
En cada turno solamente el jugador correspondiente podrá realizar una acción principal.

El jugador deberá observar el estado actual de la partida antes de seleccionar su acción.
Después de realizar una acción válida:
1. El backend recibe la acción.
2. El backend valida la acción.
3. El backend modifica el estado de la partida.
4. El backend determina si ocurre un evento.
5. El backend devuelve el nuevo estado.
6. React actualiza la interfaz.
7. El turno pasa al otro jugador.


# 7. Acciones disponibles

En cada turno el jugador podrá seleccionar una acción principal.
Las acciones disponibles serán:
1. Avanzar.
2. Explorar.
3. Prepararse.
4. Bloquear.
Cada acción tendrá consecuencias diferentes.


# 8. Acción: Avanzar

La acción Avanzar permite mover el tren del jugador hacia la siguiente estación.
Para avanzar se requiere:
- Al menos 10 unidades de combustible.
- Al menos 5 unidades de suministros.

Al realizar la acción:
- La posición avanza una estación.
- El combustible disminuye en 10.
- Los suministros disminuyen en 5.
- La puntuación aumenta en 5.

Ejemplo:
Antes:
- Posición: Kazán.
- Combustible: 80.
- Suministros: 30.
- Puntuación: 10.

Después de avanzar:
- Posición: Ekaterimburgo.
- Combustible: 70.
- Suministros: 25.
- Puntuación: 15.


# 9. Acción: Explorar

La acción Explorar permite al jugador buscar recursos en la zona donde se encuentra.
Explorar no mueve al jugador.
La acción consume:
- 5 unidades de energía.
Después de explorar, el backend generará un resultado variable.

Los posibles resultados serán:

### Resultado positivo

El jugador encuentra recursos:
- +15 suministros.
- +10 combustible.

### Resultado neutral

El jugador no encuentra recursos adicionales.

### Resultado negativo

El jugador encuentra una dificultad:
- -10 energía.
El resultado será determinado por el backend.
El jugador deberá recibir visualmente un mensaje indicando qué ocurrió.


# 10. Acción: Prepararse

La acción **Prepararse** permite recuperar energía y organizar los recursos antes de continuar el viaje.
Al utilizarla:
- +15 energía.
- -5 suministros.
- +2 puntos.
La energía no podrá superar el máximo de 50 unidades.
Si el jugador no posee al menos 5 suministros, la acción será inválida.


# 11. Acción: Bloquear

La acción **Bloquear** permite afectar temporalmente al oponente.
Para utilizarla se requieren:
- 20 unidades de energía.
- Al menos 10 suministros.

Cuando un jugador realiza un bloqueo válido:
- El oponente recibe un estado de bloqueo.
- El oponente no podrá utilizar la acción `Avanzar` durante su siguiente turno.
- El jugador que realizó el bloqueo pierde 20 de energía.
- El jugador obtiene 5 puntos.
El bloqueo no modifica directamente la posición del oponente.
El bloqueo solamente afecta su siguiente acción.
Una vez que el oponente pierde su turno afectado, el bloqueo desaparece.


# 12. Acciones inválidas

El sistema deberá detectar y mostrar acciones inválidas.
Una acción será inválida cuando no pueda realizarse de acuerdo con las reglas.

Ejemplos:

### Intentar avanzar sin combustible

Si el jugador tiene menos de 10 unidades de combustible:
> "No puedes avanzar: necesitas al menos 10 unidades de combustible."

### Intentar avanzar sin suministros

Si el jugador tiene menos de 5 suministros:
> "No puedes avanzar: necesitas al menos 5 suministros."

### Intentar explorar sin energía

Si el jugador tiene menos de 5 unidades de energía:
> "No puedes explorar: necesitas al menos 5 unidades de energía."

### Intentar prepararse sin suministros

Si el jugador tiene menos de 5 suministros:
> "No puedes prepararte: necesitas al menos 5 suministros."

### Intentar bloquear sin recursos

Si no tiene los recursos necesarios:
> "No puedes bloquear: necesitas 20 de energía y 10 suministros."

### Intentar jugar fuera de turno

Si un jugador intenta realizar una acción cuando no es su turno:
> "No es tu turno."

### Intentar avanzar después de Vladivostok

Si la expedición ya llegó a Vladivostok:
> "La expedición ya llegó a su destino."

Todas estas validaciones deberán ser realizadas por el backend.


# 13. Eventos

Para que las partidas tengan variabilidad, durante el juego podrán aparecer eventos.
Los eventos serán generados o administrados por el backend.

Los eventos podrán modificar los recursos, las condiciones del recorrido o las acciones disponibles.

Los eventos iniciales serán:

## 13.1. Tormenta de nieve

Efecto:

- -10 combustible.
- -5 energía.
Mensaje:
> "Una tormenta de nieve dificulta el recorrido."


## 13.2. Estación de suministros

Efecto:
- +15 suministros.
Mensaje:
> "Encontraste una estación de suministros."


## 13.3. Retraso ferroviario

Efecto:
- La expedición no podrá avanzar durante el siguiente turno.
Mensaje:
> "Un retraso ferroviario impide continuar temporalmente."


## 13.4. Descubrimiento de combustible

Efecto:
- +20 combustible.
Mensaje:
> "Encontraste una reserva de combustible."


## 13.5. Terreno difícil

Efecto:
- -10 energía.
- -5 suministros.
Mensaje:
> "El terreno dificulta el recorrido."


## 13.6. Buena condición climática

Efecto:
- +5 energía.
- +5 puntos.
Mensaje:
> "Las buenas condiciones facilitan la expedición."


# 14. Variabilidad de las partidas

Los eventos serán determinados de forma variable por el backend.
Por esta razón, dos partidas no necesariamente tendrán los mismos eventos ni en el mismo orden.
Los jugadores deberán adaptar sus decisiones al estado generado durante cada partida.
La variabilidad podrá modificar:
- Recursos.
- Energía.
- Combustible.
- Suministros.
- Posibilidad de avanzar.
- Puntuación.
- Condiciones del turno.


# 15. Estados principales

El juego deberá mantener como mínimo los siguientes estados:

## Estado de la partida

Indica si la partida está:
- Esperando jugadores.
- En progreso.
- Finalizada.

## Turno

Indica cuál de los dos jugadores puede realizar una acción.

## Posición

Indica la estación actual de cada expedición.

## Combustible

Representa la cantidad de combustible disponible.

## Suministros

Representa los suministros disponibles.

## Energía

Representa la energía disponible para determinadas acciones.

## Puntuación

Representa los puntos obtenidos durante la partida.

## Bloqueo

Indica si un jugador está afectado por un bloqueo.

## Evento

Representa el último evento ocurrido durante la partida.

## Ganador

Indica qué jugador ganó cuando la partida termina.


# 16. Límites de los recursos

Los recursos tendrán los siguientes límites:
| Recurso | Mínimo | Máximo |
|---|---:|---:|
| Combustible | 0 | 100 |
| Suministros | 0 | 100 |
| Energía | 0 | 50 |
| Puntuación | 0 | Sin límite establecido |
Cuando un evento o acción intente aumentar un recurso por encima de su máximo, el valor se ajustará al máximo permitido.

Ejemplo:
Si un jugador tiene 45 de energía y obtiene +15:
```text
45 + 15 = 60

