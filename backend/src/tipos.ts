export type Jugador = {
    id: number;
    nombre: string;
    posicion: number;
    combustible: number;
    suministros: number;
    energia: number;
    puntos: number;
};

export type Jugada = {
    jugadorId: number;
    accion: string;
    mensaje: string;
};

export type Partida = {
    id: string;
    jugadores: Jugador[];
    turno: number;
    estado: string;
    ganador: number | null;
    evento: string;
    jugadorBloqueado: number;
    historial: Jugada[];
};