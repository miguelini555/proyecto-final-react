import { useState } from "react";
import "./App.css";
import type { Jugador } from "./tipos";

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

    const [jugadores, setJugadores] = useState<Jugador[]>([
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
    ]);

    const [turno, setTurno] = useState(1);
    const [jugadorBloqueado, setJugadorBloqueado] = useState(0);

    function avanzar() {
        setJugadores((jugadoresActuales) =>
            jugadoresActuales.map((jugador) => {
                if (jugador.id === turno) {
                    if (jugador.id === jugadorBloqueado) {
                        return jugador;
                    }
                    if (jugador.combustible < 10) {
                        return jugador;
                    }

                    if (jugador.suministros < 5) {
                        return jugador;
                    }

                    if (jugador.posicion >= estaciones.length - 1) {
                        return jugador;
                    }

                    return {
                        ...jugador,
                        posicion: jugador.posicion + 1,
                        combustible: jugador.combustible - 10,
                        suministros: jugador.suministros - 5,
                        puntos: jugador.puntos + 5
                    };
                }

                return jugador;
            })
        );

        setTurno(turno === 1 ? 2 : 1);
    }

    function explorar() {
      setJugadores((jugadoresActuales) =>
          jugadoresActuales.map((jugador) => {
              if (jugador.id === turno) {

                  if (jugador.energia < 5) {
                      return jugador;
                  }

                  return {
                      ...jugador,
                      energia: jugador.energia - 5,
                      suministros: jugador.suministros + 15,
                      combustible: jugador.combustible + 10
                  };
              }

              return jugador;
          })
      );

      setTurno(turno === 1 ? 2 : 1);
    }

    function prepararse() {
      setJugadores((jugadoresActuales) =>
          jugadoresActuales.map((jugador) => {
              if (jugador.id === turno) {

                  if (jugador.suministros < 5) {
                      return jugador;
                  }

                  return {
                      ...jugador,
                      energia: Math.min(jugador.energia + 15, 50),
                      suministros: jugador.suministros - 5,
                      puntos: jugador.puntos + 2
                  };
              }

              return jugador;
          })
      );

      setTurno(turno === 1 ? 2 : 1);
    }

    function bloquear() {
      setJugadores((jugadoresActuales) =>
          jugadoresActuales.map((jugador) => {
              if (jugador.id === turno) {

                  if (jugador.energia < 20) {
                      return jugador;
                  }

                  if (jugador.suministros < 10) {
                      return jugador;
                  }

                  return {
                      ...jugador,
                      energia: jugador.energia - 20,
                      suministros: jugador.suministros - 10,
                      puntos: jugador.puntos + 5
                  };
              }

              return jugador;
          })
      );

      setJugadorBloqueado(turno === 1 ? 2 : 1);

      setTurno(turno === 1 ? 2 : 1);
    }

    if (pantalla === "inicio") {
        return (
            <div className="pantalla-inicio">
                <div className="contenido-inicio">
                    <h1>Expedición Transiberiana</h1>

                    <p>
                        Una aventura ferroviaria desde Moscú hasta Vladivostok.
                    </p>

                    <button onClick={() => setPantalla("juego")}>
                        INICIAR EXPEDICIÓN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pantalla-juego">

            <header className="encabezado-juego">
                <h1>Expedición Transiberiana</h1>
                <p>De Moscú a Vladivostok</p>
            </header>

            <main className="tablero">

                <section className="panel-jugadores">

                    {jugadores.map((jugador) => (
                        <div className="panel-jugador" key={jugador.id}>

                            <h2>{jugador.nombre}</h2>

                            <p>
                                Estación: {estaciones[jugador.posicion]}
                            </p>

                            <p>
                                Combustible: {jugador.combustible}
                            </p>

                            <p>
                                Suministros: {jugador.suministros}
                            </p>

                            <p>
                                Energía: {jugador.energia}
                            </p>

                            <p>
                                Puntos: {jugador.puntos}
                            </p>

                        </div>
                    ))}

                </section>

                <section className="zona-ruta">

                    <h2>Ruta Transiberiana</h2>

                    <div className="ruta">

                        {estaciones.map((estacion, indice) => (
                            <div className="estacion" key={estacion}>

                                <div className="estacion-punto">
                                    {jugadores.map((jugador) =>
                                        jugador.posicion === indice ? (
                                            <span key={jugador.id}>
                                                {jugador.id === 1 ? "🔴" : "🔵"}
                                            </span>
                                        ) : null
                                    )}
                                </div>

                                <div className="estacion-nombre">
                                    {indice + 1}. {estacion}
                                </div>

                            </div>
                        ))}

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

                <h2>Evento</h2>

                <p>
                    La expedición está esperando su próxima decisión.
                </p>

            </section>

        </div>
    );
}

export default App;