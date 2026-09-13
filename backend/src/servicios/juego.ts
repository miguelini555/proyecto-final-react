import type { Partida, Jugada } from "../tipos.js";

export function crearPartida(id: string): Partida {
    return {
        id: id,
        jugadores: [
            {
                id: 1,
                nombre: "Jugador 1",
                posicion: 0,
                combustible: 100,
                suministros: 50,
                energia: 50,
                puntos: 0
            },
            {
                id: 2,
                nombre: "Jugador 2",
                posicion: 0,
                combustible: 100,
                suministros: 50,
                energia: 50,
                puntos: 0
            }
        ],
        turno: 1,
        estado: "jugando",
        ganador: null,
        evento: "La expedición está lista para comenzar.",
        jugadorBloqueado: 0,
        historial: []
    };
}

export function agregarJugada(
    partida: Partida,
    jugadorId: number,
    accion: string,
    mensaje: string
): void {

    const jugada: Jugada = {
        jugadorId: jugadorId,
        accion: accion,
        mensaje: mensaje
    };

    partida.historial.push(jugada);
}

export function avanzarJugador(
    partida: Partida,
    jugadorId: number
): string {

    const jugador = partida.jugadores.find(
        (jugador) => jugador.id === jugadorId
    );

    if (!jugador) {
        return "Jugador no encontrado";
    }

    if (partida.turno !== jugadorId) {
        return "No es el turno de este jugador";
    }

    if (partida.jugadorBloqueado === jugadorId) {

        partida.jugadorBloqueado = 0;

        partida.turno =
            partida.turno === 1 ? 2 : 1;

        partida.evento =
            `${jugador.nombre} estaba bloqueado y perdió su turno.`;

        return partida.evento;
    }

    if (jugador.combustible < 10) {
        return "No tienes suficiente combustible";
    }

    if (jugador.suministros < 5) {
        return "No tienes suficientes suministros";
    }

    if (jugador.posicion >= 9) {
        return "Ya estás en Vladivostok";
    }

    jugador.posicion =
        jugador.posicion + 1;

    jugador.combustible =
        jugador.combustible - 10;

    jugador.suministros =
        jugador.suministros - 5;

    jugador.puntos =
        jugador.puntos + 5;

    if (jugador.posicion === 9) {

        jugador.puntos =
            jugador.puntos + 50;

        partida.estado =
            "terminada";

        partida.ganador =
            jugador.id;

        partida.evento =
            `${jugador.nombre} llegó a Vladivostok y ganó la partida.`;

        return partida.evento;
    }

    partida.evento =
        `${jugador.nombre} avanzó a la siguiente estación.`;

    partida.turno =
        partida.turno === 1 ? 2 : 1;

    return partida.evento;
}

export function explorarJugador(
    partida: Partida,
    jugadorId: number
): string {

    const jugador = partida.jugadores.find(
        (jugador) => jugador.id === jugadorId
    );

    if (!jugador) {
        return "Jugador no encontrado";
    }

    if (partida.turno !== jugadorId) {
        return "No es el turno de este jugador";
    }

    if (jugador.energia < 5) {
        return "No tienes suficiente energía";
    }

    jugador.energia =
        jugador.energia - 5;

    const resultado =
        Math.floor(Math.random() * 3);

    if (resultado === 0) {

        jugador.suministros = Math.min(
            jugador.suministros + 15,
            100
        );

        jugador.combustible = Math.min(
            jugador.combustible + 10,
            100
        );

        jugador.puntos =
            jugador.puntos + 3;

        partida.evento =
            `${jugador.nombre} encontró una estación de suministros. ` +
            "Ganó 15 suministros y 10 de combustible.";

    } else if (resultado === 1) {

        jugador.puntos =
            jugador.puntos + 1;

        partida.evento =
            `${jugador.nombre} exploró la zona, ` +
            "pero no encontró recursos.";

    } else {

        jugador.energia = Math.max(
            jugador.energia - 10,
            0
        );

        partida.evento =
            `${jugador.nombre} encontró un terreno peligroso. ` +
            "Perdió 10 de energía.";
    }

    partida.turno =
        partida.turno === 1 ? 2 : 1;

    return partida.evento;
}

export function prepararseJugador(
    partida: Partida,
    jugadorId: number
): string {

    const jugador = partida.jugadores.find(
        (jugador) => jugador.id === jugadorId
    );

    if (!jugador) {
        return "Jugador no encontrado";
    }

    if (partida.turno !== jugadorId) {
        return "No es el turno de este jugador";
    }

    if (jugador.suministros < 5) {
        return "No tienes suficientes suministros";
    }

    jugador.energia = Math.min(
        jugador.energia + 15,
        50
    );

    jugador.suministros =
        jugador.suministros - 5;

    jugador.puntos =
        jugador.puntos + 2;

    partida.evento =
        `${jugador.nombre} se preparó para continuar la expedición. ` +
        "Ganó energía y 2 puntos.";

    partida.turno =
        partida.turno === 1 ? 2 : 1;

    return partida.evento;
}

export function bloquearJugador(
    partida: Partida,
    jugadorId: number
): string {

    const jugador = partida.jugadores.find(
        (jugador) => jugador.id === jugadorId
    );

    if (!jugador) {
        return "Jugador no encontrado";
    }

    if (partida.turno !== jugadorId) {
        return "No es el turno de este jugador";
    }

    if (jugador.energia < 20) {
        return "No tienes suficiente energía";
    }

    if (jugador.suministros < 10) {
        return "No tienes suficientes suministros";
    }

    jugador.energia =
        jugador.energia - 20;

    jugador.suministros =
        jugador.suministros - 10;

    jugador.puntos =
        jugador.puntos + 5;

    const jugadorObjetivo =
        jugadorId === 1 ? 2 : 1;

    partida.jugadorBloqueado =
        jugadorObjetivo;

    partida.evento =
        `${jugador.nombre} bloqueó al Jugador ` +
        `${jugadorObjetivo}.`;

    partida.turno =
        partida.turno === 1 ? 2 : 1;

    return partida.evento;
}