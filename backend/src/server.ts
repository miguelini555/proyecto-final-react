import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import {
    crearPartida,
    agregarJugada,
    avanzarJugador,
    explorarJugador,
    prepararseJugador,
    bloquearJugador
} from "./servicios/juego.js";

import type { Partida } from "./tipos.js";

const app = express();

const puerto =
    Number(process.env.PORT) || 3000;

app.use(express.json());

const partidas: Partida[] = [];

/*
 * Obtener la ubicación actual del archivo compilado.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Ubicación del frontend compilado.
 */

const rutaFrontend = path.join(
    __dirname,
    "../../dist"
);

/*
 * API
 */

app.get("/api/saludo", (_solicitud, respuesta) => {

    respuesta.send(
        "Hola desde Express y Node.js"
    );
});

app.post("/api/partidas", (_solicitud, respuesta) => {

    const id =
        String(partidas.length + 1);

    const partida =
        crearPartida(id);

    partidas.push(partida);

    respuesta.json({
        correcto: true,
        partida: partida
    });
});

app.get("/api/partidas/:id", (solicitud, respuesta) => {

    const partida =
        partidas.find(
            (partida) =>
                partida.id === solicitud.params.id
        );

    if (!partida) {

        respuesta.status(404).json({
            correcto: false,
            mensaje: "Partida no encontrada"
        });

        return;
    }

    respuesta.json({
        correcto: true,
        partida: partida
    });
});

app.get(
    "/api/partidas/:id/historial",
    (solicitud, respuesta) => {

        const partida =
            partidas.find(
                (partida) =>
                    partida.id === solicitud.params.id
            );

        if (!partida) {

            respuesta.status(404).json({
                correcto: false,
                mensaje: "Partida no encontrada"
            });

            return;
        }

        respuesta.json({
            correcto: true,
            historial: partida.historial
        });
    }
);

app.post(
    "/api/partidas/:id/jugada",
    (solicitud, respuesta) => {

        const partida =
            partidas.find(
                (partida) =>
                    partida.id === solicitud.params.id
            );

        if (!partida) {

            respuesta.status(404).json({
                correcto: false,
                mensaje: "Partida no encontrada"
            });

            return;
        }

        if (partida.estado === "terminada") {

            respuesta.status(400).json({
                correcto: false,
                mensaje: "La partida ya terminó",
                partida: partida
            });

            return;
        }

        const jugadorId =
            solicitud.body.jugadorId;

        const accion =
            solicitud.body.accion;

        if (
            accion !== "avanzar" &&
            accion !== "explorar" &&
            accion !== "prepararse" &&
            accion !== "bloquear"
        ) {

            respuesta.status(400).json({
                correcto: false,
                mensaje: "Acción no válida",
                partida: partida
            });

            return;
        }

        let mensaje: string;

        if (accion === "avanzar") {

            mensaje =
                avanzarJugador(
                    partida,
                    jugadorId
                );

        } else if (accion === "explorar") {

            mensaje =
                explorarJugador(
                    partida,
                    jugadorId
                );

        } else if (accion === "prepararse") {

            mensaje =
                prepararseJugador(
                    partida,
                    jugadorId
                );

        } else {

            mensaje =
                bloquearJugador(
                    partida,
                    jugadorId
                );
        }

        if (
            mensaje === "Jugador no encontrado" ||
            mensaje === "No es el turno de este jugador" ||
            mensaje === "No tienes suficiente combustible" ||
            mensaje === "No tienes suficientes suministros" ||
            mensaje === "No tienes suficiente energía" ||
            mensaje === "Ya estás en Vladivostok"
        ) {

            respuesta.status(400).json({
                correcto: false,
                mensaje: mensaje,
                partida: partida
            });

            return;
        }

        agregarJugada(
            partida,
            jugadorId,
            accion,
            mensaje
        );

        respuesta.json({
            correcto: true,
            mensaje: mensaje,
            partida: partida
        });
    }
);

/*
 * Servir el frontend compilado.
 */

app.use(
    express.static(rutaFrontend)
);

/*
 * Fallback para React.
 *
 * Si la ruta no corresponde a la API ni a
 * un archivo estático, enviamos index.html.
 *
 * Usamos app.use() porque estamos trabajando
 * con Express 5 y evitamos app.get("*").
 */

app.use(
    (_solicitud, respuesta) => {

        respuesta.sendFile(
            path.join(
                rutaFrontend,
                "index.html"
            )
        );
    }
);

/*
 * Puerto del servidor.
 *
 * Render proporciona PORT mediante una
 * variable de entorno. Si trabajamos
 * localmente, usamos el puerto 3000.
 */

app.listen(
    puerto,
    "0.0.0.0",
    () => {

        console.log(
            `Servidor ejecutándose en el puerto ${puerto}`
        );
    }
);