import express from "express";

const app = express();

app.get("/saludo", (_req, res) => {
    res.send("Hola desde el servidor");
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});