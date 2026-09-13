import express from "express";

const app = express();

const puerto = 3000;

app.get("/api/saludo", (_solicitud, respuesta) => {
    respuesta.send("Hola desde Express y Node.js");
});

app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});