import { useState } from "react";
import "./App.css";
import type { Jugador } from "./tipos";

type Jugada = {
    jugadorId: number;
    accion: string;
    mensaje: string;
};

type Partida = {
    id: string;
    jugadores: Jugador[];
    turno: number;
    estado: string;
    ganador: number | null;
    evento: string;
    jugadorBloqueado: number;
    historial: Jugada[];
};

const estaciones = [
    "Moscú",
    "Nizhni Nóvgorod",
    "Kazán",
    "Ekaterimburgo",
    "Omsk",
    "Novosibirsk",
    "Krasnoyarsk",
    "Irkutsk",
    "Ulan-Udé",
    "Vladivostok"
];

function App() {
    const [pantalla, setPantalla] = useState("inicio");
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [turno, setTurno] = useState(1);
    const [partida, setPartida] = useState<Partida | null>(null);
    const [mensaje, setMensaje] = useState("");
    const [historial, setHistorial] = useState<Jugada[]>([]);

    async function cargarHistorial(id: string) {
        const respuesta = await fetch(
            `/api/partidas/${id}/historial`
        );
        const datos =
            await respuesta.json();
        if (datos.correcto) {
            setHistorial(datos.historial);
        }
    }

    async function iniciarPartida() {
        const respuesta =
            await fetch("/api/partidas", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({})
            });
        const datos =
            await respuesta.json();
        setPartida(datos.partida);
        setJugadores(
            datos.partida.jugadores
        );
        setTurno(
            datos.partida.turno
        );
        setMensaje("");
        setHistorial([]);
        setPantalla("juego");
    }

    async function realizarJugada(
        accion: string
    ) {
        if (partida === null) {
            return;
        }
        const respuesta =
            await fetch(
                `/api/partidas/${partida.id}/jugada`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        jugadorId: turno,
                        accion: accion
                    })
                }
            );
        const datos =
            await respuesta.json();
        setMensaje(
            datos.mensaje
        );
        if (!datos.correcto) {
            if (datos.partida) {
                setPartida(
                    datos.partida
                );
                setJugadores(
                    datos.partida.jugadores
                );
                setTurno(
                    datos.partida.turno
                );
            }
            return;
        }
        setPartida(
            datos.partida
        );
        setJugadores(
            datos.partida.jugadores
        );
        setTurno(
            datos.partida.turno
        );
        await cargarHistorial(
            datos.partida.id
        );
        if (
            datos.partida.estado ===
            "terminada"
        ) {
            setPantalla(
                "resultado"
            );
        }
    }

    async function avanzar() {
        await realizarJugada(
            "avanzar"
        );
    }

    async function explorar() {
        await realizarJugada(
            "explorar"
        );
    }

    async function prepararse() {
        await realizarJugada(
            "prepararse"
        );
    }

    async function bloquear() {
        await realizarJugada(
            "bloquear"
        );
    }

    
    if (pantalla === "inicio") {
        return (
            <div className="pantalla-inicio">
                <div className="decoracion-tren">
                    🚂 ━━━━━━━━━━━━━━━━━ 🚂
                </div>
                <div className="contenido-inicio">
                    <div className="titulo-icono">
                        🐻 🐯
                    </div>
                    <h1>
                        Expedición
                        <span>
                            Transiberiana
                        </span>
                    </h1>

                    <p className="subtitulo-inicio">
                        Una aventura ferroviaria
                        desde Moscú hasta
                        Vladivostok.
                    </p>

                    <button
                        className="boton-inicio"
                        onClick={
                            iniciarPartida
                        }
                    >
                        🚂 INICIAR EXPEDICIÓN
                    </button>
                </div>
            </div>
        );
    }

    if (
        pantalla === "resultado" &&
        partida !== null
    ) {
        const ganador =
            jugadores.find(
                (jugador) =>
                    jugador.id ===
                    partida.ganador
            );
        return (
            <div className="pantalla-resultado">
                <div className="contenido-resultado">
                    <div className="trofeo">
                        🏆
                    </div>

                    <h1>
                        ¡EXPEDICIÓN
                        <span>
                            COMPLETADA!
                        </span>
                    </h1>

                    <h2>
                        🏆 {ganador?.nombre}
                        {" "}ha ganado
                    </h2>

                    <p className="resultado-descripcion">
                        🚂 El viaje ha llegado
                        hasta Vladivostok.
                    </p>

                    {ganador && (
                        <div className="resultado-jugador">
                            <div className="resultado-personaje">
                                {ganador.id === 1
                                    ? "🐻"
                                    : "🐯"}
                            </div>

                            <h3>
                                {ganador.nombre}
                            </h3>

                            <p>
                                📍 Estación:{" "}
                                {
                                    estaciones[
                                        ganador.posicion
                                    ]
                                }
                            </p>

                            <div className="resultado-recursos">
                                <span>
                                    ⭐{" "}
                                    {ganador.puntos}
                                </span>

                                <span>
                                    ⛽{" "}
                                    {ganador.combustible}
                                </span>

                                <span>
                                    🍱{" "}
                                    {ganador.suministros}
                                </span>

                                <span>
                                    ⚡{" "}
                                    {ganador.energia}
                                </span>
                            </div>
                        </div>
                    )}

                    <p className="mensaje-final">
                        📢 {partida.evento}
                    </p>

                    <section className="historial-resultado">
                        <h2>
                            📜 Historial de jugadas
                        </h2>

                        {historial.length === 0 ? (
                            <p>
                                No se registraron
                                jugadas.
                            </p>
                        ) : (

                            <div className="lista-historial-resultado">
                                {historial.map(
                                    (
                                        jugada,
                                        indice
                                    ) => (

                                        <div
                                            className="jugada-resultado"
                                            key={indice}
                                        >
                                            <strong>
                                                {jugada.jugadorId === 1
                                                    ? "🐻"
                                                    : "🐯"}{" "}
                                                Jugador{" "}
                                                {
                                                    jugada.jugadorId
                                                }
                                            </strong>

                                            <span>
                                                {" → "}
                                                {
                                                    jugada.accion
                                                        .toUpperCase()
                                                }
                                            </span>

                                            <p>
                                                {
                                                    jugada.mensaje
                                                }
                                            </p>
                                        </div>
                                    )
                                )}

                            </div>
                        )}
                    </section>

                    <button
                        className="boton-principal"
                        onClick={
                            iniciarPartida
                        }
                    >
                        🚂 NUEVA EXPEDICIÓN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pantalla-juego">
            <header className="encabezado-juego">
                <div>
                    <p className="encabezado-pequeno">
                        🚂 RUTA DEL
                        FERROCARRIL
                    </p>

                    <h1>
                        Expedición
                        Transiberiana
                    </h1>

                    <p>
                        Moscú → Vladivostok
                    </p>
                </div>

                <div className="estado-turno">
                    <span>
                        🎯 TURNO
                    </span>

                    <strong>
                        {turno === 1
                            ? "🐻 JUGADOR 1"
                            : "🐯 JUGADOR 2"}
                    </strong>
                </div>
            </header>

            <main className="tablero">
                <section className="panel-jugadores">
                    {jugadores.map(
                        (jugador) => (
                            <div
                                className={
                                    `panel-jugador ${
                                        jugador.id ===
                                        turno
                                            ? "jugador-activo"
                                            : ""
                                    }`
                                }
                                key={jugador.id}
                            >
                                <div className="jugador-cabecera">
                                    <div className="personaje">
                                        {jugador.id === 1
                                            ? "🐻"
                                            : "🐯"}
                                    </div>

                                    <div>
                                        <h2>
                                            {
                                                jugador.nombre
                                            }
                                        </h2>

                                        <span className="estado-jugador">
                                            {jugador.id ===
                                            turno
                                                ? "🎯 Tu turno"
                                                : "⏳ Esperando"}
                                        </span>
                                    </div>
                                </div>

                                <div className="estacion-actual">
                                    <span>
                                        📍
                                    </span>

                                    <div>
                                        <small>
                                            ESTACIÓN
                                        </small>

                                        <strong>
                                            {
                                                estaciones[
                                                    jugador.posicion
                                                ]
                                            }
                                        </strong>
                                    </div>
                                </div>

                                <div className="recursos">
                                    <div className="recurso">
                                        <span className="recurso-icono">
                                            ⛽
                                        </span>

                                        <div>
                                            <small>
                                                Combustible
                                            </small>

                                            <strong>
                                                {
                                                    jugador.combustible
                                                }
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="recurso">
                                        <span className="recurso-icono">
                                            🍱
                                        </span>

                                        <div>
                                            <small>
                                                Suministros
                                            </small>

                                            <strong>
                                                {
                                                    jugador.suministros
                                                }
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="recurso">
                                        <span className="recurso-icono">
                                            ⚡
                                        </span>

                                        <div>
                                            <small>
                                                Energía
                                            </small>

                                            <strong>
                                                {
                                                    jugador.energia
                                                }
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="recurso">
                                        <span className="recurso-icono">
                                            ⭐
                                        </span>

                                        <div>
                                            <small>
                                                Puntos
                                            </small>

                                            <strong>
                                                {
                                                    jugador.puntos
                                                }
                                            </strong>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </section>

                <section className="zona-ruta">
                    <div className="titulo-ruta">
                        <div>
                            <span>
                                🗺️ MAPA DE EXPEDICIÓN
                            </span>

                            <h2>
                                Ruta Transiberiana
                            </h2>
                        </div>

                        <div className="tren-icono">
                            🚂
                        </div>
                    </div>

                    <div className="ruta">
                        <div className="linea-ferroviaria"></div>
                        {estaciones.map(
                            (
                                estacion,
                                indice
                            ) => (
                                <div
                                    className={
                                        `estacion ${
                                            jugadores.some(
                                                (jugador) =>
                                                    jugador.posicion ===
                                                    indice
                                            )
                                                ? "estacion-activa"
                                                : ""
                                        }`
                                    }
                                    key={
                                        estacion
                                    }
                                >
                                    <div className="estacion-punto">
                                        {jugadores.map(
                                            (
                                                jugador
                                            ) =>
                                                jugador.posicion ===
                                                indice ? (

                                                    <span
                                                        className={
                                                            `personaje-ruta personaje-${
                                                                jugador.id
                                                            }`
                                                        }
                                                        key={
                                                            jugador.id
                                                        }
                                                    >
                                                        {jugador.id ===
                                                        1
                                                            ? "🐻"
                                                            : "🐯"}
                                                    </span>

                                                ) : null
                                        )}
                                        <div className="punto-estacion">
                                            🚉
                                        </div>

                                    </div>

                                    <div className="estacion-nombre">
                                        <span>
                                            {indice + 1}
                                        </span>

                                        <strong>
                                            {estacion}
                                        </strong>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="leyenda-ruta">
                        <span>
                            🐻 Jugador 1
                        </span>

                        <span>
                            🐯 Jugador 2
                        </span>

                        <span>
                            🚉 Estación
                        </span>

                    </div>
                </section>
            </main>

            <section className="panel-control">
                <div className="titulo-control">
                    <div>
                        <span>
                            🎮 CONTROLES
                        </span>

                        <h2>
                            Turno del{" "}
                            {turno === 1
                                ? "🐻 Jugador 1"
                                : "🐯 Jugador 2"}
                        </h2>
                    </div>

                    <div className="indicador-turno">
                        🔥 EN JUEGO
                    </div>
                </div>

                <div className="acciones">
                    <button
                        className="accion-avanzar"
                        onClick={avanzar}
                    >
                        <span>🚂</span>
                        <strong>
                            AVANZAR
                        </strong>
                        <small>
                            ⛽ 10 · 🍱 5
                        </small>
                    </button>

                    <button
                        className="accion-explorar"
                        onClick={explorar}
                    >
                        <span>🔎</span>
                        <strong>
                            EXPLORAR
                        </strong>
                        <small>
                            ⚡ 5
                        </small>
                    </button>

                    <button
                        className="accion-preparar"
                        onClick={
                            prepararse
                        }
                    >
                        <span>⛺</span>
                        <strong>
                            PREPARARSE
                        </strong>
                        <small>
                            🍱 5 · ⚡ +15
                        </small>
                    </button>

                    <button
                        className="accion-bloquear"
                        onClick={
                            bloquear
                        }
                    >
                        <span>🚧</span>
                        <strong>
                            BLOQUEAR
                        </strong>
                        <small>
                            ⚡ 20 · 🍱 10
                        </small>
                    </button>
                </div>
            </section>

            <section className="panel-evento">
                <div className="evento-icono">
                    📢
                </div>

                <div>

                    <span>
                        EVENTO DE LA EXPEDICIÓN
                    </span>

                    <p>
                        {partida?.evento}
                    </p>

                    {mensaje && (

                        <p className="mensaje-jugada">
                            🎲 {mensaje}
                        </p>

                    )}
                </div>
            </section>
        </div>
    );
}

export default App;