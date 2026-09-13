import express from "express";

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

const puerto = 3000;

app.use(express.json());

const partidas: Partida[] = [];

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

app.listen(puerto, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${puerto}`
    );
});