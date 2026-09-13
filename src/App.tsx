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

        const datos = await respuesta.json();

        if (datos.correcto) {
            setHistorial(datos.historial);
        }
    }

    async function iniciarPartida() {

        const respuesta = await fetch("/api/partidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        const datos = await respuesta.json();

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

    async function realizarJugada(accion: string) {

        if (partida === null) {
            return;
        }

        const respuesta = await fetch(
            `/api/partidas/${partida.id}/jugada`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jugadorId: turno,
                    accion: accion
                })
            }
        );

        const datos = await respuesta.json();

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
            datos.partida.estado === "terminada"
        ) {

            setPantalla("resultado");
        }
    }

    async function avanzar() {
        await realizarJugada("avanzar");
    }

    async function explorar() {
        await realizarJugada("explorar");
    }

    async function prepararse() {
        await realizarJugada("prepararse");
    }

    async function bloquear() {
        await realizarJugada("bloquear");
    }

    if (pantalla === "inicio") {

        return (
            <div className="pantalla-inicio">

                <div className="contenido-inicio">

                    <h1>
                        Expedición Transiberiana
                    </h1>

                    <p>
                        Una aventura ferroviaria desde
                        Moscú hasta Vladivostok.
                    </p>

                    <button onClick={iniciarPartida}>
                        INICIAR EXPEDICIÓN
                    </button>

                </div>

            </div>
        );
    }

    if (
        pantalla === "resultado" &&
        partida !== null
    ) {

        const ganador = jugadores.find(
            (jugador) =>
                jugador.id === partida.ganador
        );

        return (
            <div className="pantalla-resultado">

                <div className="contenido-resultado">

                    <h1>
                        ¡EXPEDICIÓN COMPLETADA!
                    </h1>

                    <h2>
                        🏆 {ganador?.nombre} ha ganado
                    </h2>

                    <p>
                        El ganador llegó hasta Vladivostok.
                    </p>

                    {ganador && (
                        <div className="resultado-jugador">

                            <p>
                                Estación:{" "}
                                {estaciones[ganador.posicion]}
                            </p>

                            <p>
                                Puntos:{" "}
                                {ganador.puntos}
                            </p>

                            <p>
                                Combustible:{" "}
                                {ganador.combustible}
                            </p>

                            <p>
                                Suministros:{" "}
                                {ganador.suministros}
                            </p>

                            <p>
                                Energía:{" "}
                                {ganador.energia}
                            </p>

                        </div>
                    )}

                    <p className="mensaje-final">
                        {partida.evento}
                    </p>

                    <section className="historial-resultado">

                        <h2>
                            Historial de jugadas
                        </h2>

                        {historial.length === 0 ? (

                            <p>
                                No se registraron jugadas.
                            </p>

                        ) : (

                            <div className="lista-historial-resultado">

                                {historial.map(
                                    (jugada, indice) => (

                                        <div
                                            className="jugada-resultado"
                                            key={indice}
                                        >

                                            <strong>
                                                Jugador{" "}
                                                {jugada.jugadorId}
                                            </strong>

                                            <span>
                                                {" → "}
                                                {jugada.accion.toUpperCase()}
                                            </span>

                                            <p>
                                                {jugada.mensaje}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </section>

                    <button onClick={iniciarPartida}>
                        NUEVA EXPEDICIÓN
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="pantalla-juego">

            <header className="encabezado-juego">

                <h1>
                    Expedición Transiberiana
                </h1>

                <p>
                    De Moscú a Vladivostok
                </p>

            </header>

            <main className="tablero">

                <section className="panel-jugadores">

                    {jugadores.map((jugador) => (

                        <div
                            className="panel-jugador"
                            key={jugador.id}
                        >

                            <h2>
                                {jugador.nombre}
                            </h2>

                            <p>
                                Estación:{" "}
                                {estaciones[jugador.posicion]}
                            </p>

                            <p>
                                Combustible:{" "}
                                {jugador.combustible}
                            </p>

                            <p>
                                Suministros:{" "}
                                {jugador.suministros}
                            </p>

                            <p>
                                Energía:{" "}
                                {jugador.energia}
                            </p>

                            <p>
                                Puntos:{" "}
                                {jugador.puntos}
                            </p>

                        </div>

                    ))}

                </section>

                <section className="zona-ruta">

                    <h2>
                        Ruta Transiberiana
                    </h2>

                    <div className="ruta">

                        {estaciones.map(
                            (estacion, indice) => (

                                <div
                                    className="estacion"
                                    key={estacion}
                                >

                                    <div className="estacion-punto">

                                        {jugadores.map(
                                            (jugador) =>
                                                jugador.posicion ===
                                                indice ? (

                                                    <span
                                                        key={
                                                            jugador.id
                                                        }
                                                    >
                                                        {jugador.id === 1
                                                            ? "🐻"
                                                            : "🐯"}
                                                    </span>

                                                ) : null
                                        )}

                                    </div>

                                    <div className="estacion-nombre">

                                        {indice + 1}.{" "}
                                        {estacion}

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </section>

            </main>

            <section className="panel-turno">

                <h2>
                    Turno del Jugador {turno}
                </h2>

                <div className="acciones">

                    <button onClick={avanzar}>
                        AVANZAR
                    </button>

                    <button onClick={explorar}>
                        EXPLORAR
                    </button>

                    <button onClick={prepararse}>
                        PREPARARSE
                    </button>

                    <button onClick={bloquear}>
                        BLOQUEAR
                    </button>

                </div>

            </section>

            <section className="panel-evento">

                <h2>
                    Evento
                </h2>

                <p>
                    {partida?.evento}
                </p>

                {mensaje && (
                    <p className="mensaje-jugada">
                        {mensaje}
                    </p>
                )}

            </section>

        </div>
    );
}

export default App;