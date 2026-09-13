# 🚂 Expedición Transiberiana

## Descripción

**Expedición Transiberiana** es un juego estratégico de dos jugadores desarrollado como proyecto final de la materia de Certificación React.

El juego está inspirado en el recorrido del Ferrocarril Transiberiano. Los jugadores deben avanzar desde **Moscú hasta Vladivostok**, administrando recursos y tomando decisiones estratégicas durante la expedición.
El proyecto utiliza una arquitectura **Frontend + Backend**, donde React se comunica con un servidor Express mediante peticiones HTTP utilizando `fetch`.

---

## 🎮 Objetivo del juego
El objetivo es llegar primero a **Vladivostok**, atravesando las diferentes estaciones de la ruta.

Los jugadores deben administrar:
- ⛽ Combustible
- 🍱 Suministros
- ⚡ Energía
- ⭐ Puntos
Durante la partida pueden elegir diferentes acciones que afectan sus recursos, posición y puntuación.
También existen eventos variables durante la exploración y la posibilidad de bloquear temporalmente al jugador contrario.

---

## 🗺️ Ruta del juego

La expedición está formada por las siguientes estaciones:
1. Moscú
2. Nizhni Nóvgorod
3. Kazán
4. Ekaterimburgo
5. Omsk
6. Novosibirsk
7. Krasnoyarsk
8. Irkutsk
9. Ulan-Udé
10. Vladivostok
El jugador que alcanza Vladivostok completa la expedición y gana la partida.

---

## ⚔️ Acciones disponibles

### 🚂 Avanzar
Permite avanzar una estación.

**Costo:**
- ⛽ 10 de combustible
- 🍱 5 de suministros

**Recompensa:**
- ⭐ 5 puntos

---

### 🔎 Explorar
Permite explorar la zona sin avanzar.

**Costo:**
- ⚡ 5 de energía
El resultado depende de un evento aleatorio generado en el backend.

Puede producir:
- Ganancia de suministros y combustible.
- Exploración sin encontrar recursos.
- Pérdida adicional de energía.

---

### ⛺ Prepararse
Permite recuperar energía.

**Costo:**
- 🍱 5 suministros

**Recompensa:*
- ⚡ Hasta 15 de energía
- ⭐ 2 puntos
La energía máxima es de 50.

---

### 🚧 Bloquear
Permite bloquear temporalmente al jugador contrario.

**Costo:**
- ⚡ 20 de energía
- 🍱 10 suministros

**Recompensa:**
- ⭐ 5 puntos
El jugador bloqueado pierde su siguiente turno si intenta avanzar.

---

## 🧠 Arquitectura
El proyecto está dividido en un frontend desarrollado con React y un backend desarrollado con Express.

```text
┌───────────────────────────────┐
│       React + TypeScript      │
│                               │
│          App.tsx              │
│          App.css              │
└───────────────┬───────────────┘
                │
                │ fetch
                │ HTTP + JSON
                ▼
┌───────────────────────────────┐
│      Express + TypeScript     │
│                               │
│          server.ts            │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Lógica del juego        │
│                               │
│   servicios/juego.ts          │
└───────────────────────────────┘
```

La lógica importante de las jugadas se encuentra en el backend. El frontend se encarga de representar el estado del juego y enviar las acciones del jugador mediante `fetch`.
Esto permite que las validaciones importantes no dependan únicamente del navegador.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express
- TypeScript

### Pruebas
- Playwright
- Pruebas E2E

### Automatización
- GitHub Actions

### Despliegue
- Render

---

## 📁 Estructura del proyecto
```text
proyecto-final-react/
│
├── .github/
│   └── workflows/
│       ├── lint.yml
│       ├── e2e.yml
│       └── deploy.yml
│
├── backend/
│   ├── src/
│   │   ├── servicios/
│   │   │   └── juego.ts
│   │   ├── server.ts
│   │   └── tipos.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── introduccion.md
│   ├── reglas.md
│   ├── api.md
│   ├── decisiones.md
│   └── investigacion.md
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── tipos.ts
│
├── tests/
│   └── juego.spec.ts
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🔌 API
El backend proporciona los siguientes endpoints:

### Crear una partida
```http
POST /api/partidas
```
Crea una nueva partida con los dos jugadores y su estado inicial.

---

### Obtener una partida
```http
GET /api/partidas/:id
```
Obtiene el estado actual de una partida.

---

### Obtener historial
```http
GET /api/partidas/:id/historial
```
Obtiene el historial de jugadas realizadas durante la partida.

---

### Realizar una jugada
```http
POST /api/partidas/:id/jugada
```
Recibe el jugador y la acción que desea realizar.

Ejemplo:
```json
{
    "jugadorId": 1,
    "accion": "avanzar"
}
```

Las acciones disponibles son:
```text
avanzar
explorar
prepararse
bloquear
```
El backend valida el turno, los recursos disponibles, el estado de la partida y las reglas correspondientes antes de aceptar una jugada.

---

## 🌐 Comunicación Frontend - Backend
La comunicación entre React y Express se realiza mediante `fetch`.

Ejemplo de creación de una partida:
```ts
const respuesta = await fetch("/api/partidas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({})
});

const datos = await respuesta.json();
```

Para realizar una jugada:
```ts
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
```
El backend devuelve el nuevo estado de la partida en formato JSON.

---

## 💻 Instalación

### Requisitos
Se requiere tener instalado:

- Node.js
- npm
- Git

---

### Instalar dependencias del frontend
Desde la raíz del proyecto:

```bash
npm install
```

---

### Instalar dependencias del backend

```bash
cd backend
npm install
cd ..
```

---

## ▶️ Ejecución en desarrollo

### Frontend

Desde la raíz:
```bash
npm run dev
```
El frontend se ejecuta mediante Vite.

### Backend
En otra terminal:
```bash
cd backend
npm run dev
```
El servidor Express se ejecuta en el puerto 3000 durante el desarrollo.

---

## 🏗️ Compilación
Para compilar frontend y backend:
```bash
npm run build:all
```
También se puede compilar cada parte individualmente:

```bash
npm run build
```

```bash
npm run build:backend
```

---

## 🚀 Ejecución en producción
Después de realizar la compilación:

```bash
npm run start
```
Express sirve el backend y también los archivos compilados del frontend.
El puerto utilizado por el servidor se obtiene mediante la variable de entorno `PORT`. Si esta variable no está definida, se utiliza el puerto 3000 localmente.

---

## 🧪 Pruebas E2E
Las pruebas End-to-End fueron desarrolladas utilizando **Playwright**.
Las pruebas verifican el funcionamiento completo de la aplicación desde la perspectiva del usuario y también comprueban la comunicación con el backend.
Actualmente existen **9 pruebas E2E**:

1. La aplicación inicia correctamente.
2. Se puede iniciar una partida.
3. Se puede avanzar y cambiar el turno.
4. Se puede explorar y obtener un evento.
5. Se puede preparar y recuperar energía.
6. Se puede bloquear al jugador contrario.
7. La partida puede llegar hasta Vladivostok.
8. Se puede iniciar una nueva expedición después de terminar.
9. El backend rechaza una jugada fuera de turno.

---

## ▶️ Ejecutar pruebas E2E
Para ejecutar las pruebas:
```bash
npm run test:e2e
```
Las pruebas se ejecutan en modo headless.

Para ejecutar las pruebas mostrando el navegador:
```bash
npx playwright test --headed
```

Para visualizar el reporte HTML generado por Playwright:
```bash
npx playwright show-report
```

---

## 🧪 Validación del backend
Uno de los casos E2E verifica directamente una regla importante del backend.
Se intenta realizar una jugada como el Jugador 2 cuando el turno pertenece al Jugador 1.

El backend debe responder:
```text
HTTP 400
```

con:
```json
{
    "correcto": false,
    "mensaje": "No es el turno de este jugador"
}
```
Esto demuestra que las reglas importantes del juego son validadas en el servidor y no solamente en React.

---

## 🔎 Linting
El proyecto utiliza ESLint para comprobar la calidad del código.

### Frontend
```bash
npm run lint
```

### Backend
```bash
cd backend
npm run lint
```

---

## ⚙️ GitHub Actions
El proyecto utiliza GitHub Actions para automatizar diferentes procesos.

### Lint
El workflow de lint comprueba:
- ESLint del frontend.
- ESLint del backend.

Archivo:
```text
.github/workflows/lint.yml
```

### E2E

El workflow ejecuta las pruebas de Playwright en un entorno automatizado.
Archivo:
```text
.github/workflows/e2e.yml
```

### Deploy
El workflow de despliegue activa el despliegue del proyecto en Render mediante un Deploy Hook.
Archivo:
```text
.github/workflows/deploy.yml
```

---

## 🌍 Despliegue
La aplicación está publicada utilizando Render.

### Aplicación publicada

[Expedición Transiberiana en Render](https://proyecto-final-react-9pnh.onrender.com)

El servicio utiliza:
```text
Build:
npm ci && npm run build:all
```

```text
Start:
npm run start
```
El backend utiliza el puerto proporcionado por la variable de entorno `PORT` de Render.

---

## 📚 Documentación

La documentación adicional del proyecto se encuentra en la carpeta `docs`.

```text
docs/
├── introduccion.md
├── reglas.md
├── api.md
├── decisiones.md
└── investigacion.md
```

Los documentos contienen información adicional sobre:
- Introducción y contexto del proyecto.
- Reglas del juego.
- API y endpoints.
- Decisiones de diseño e implementación.
- Investigación relacionada con E2E y publicación.

---

## ⚠️ Consideraciones y limitaciones

La aplicación utiliza almacenamiento en memoria para las partidas.
Esto significa que las partidas no se mantienen permanentemente después de reiniciar el servidor.

El proyecto está orientado a demostrar:
- Desarrollo frontend con React y TypeScript.
- Desarrollo backend con Express y TypeScript.
- Comunicación mediante API REST.
- Validación de reglas en servidor.
- Automatización mediante GitHub Actions.
- Pruebas End-to-End.
- Publicación de una aplicación web completa.

---

## 👨‍💻 Proyecto académico
**Proyecto:** Expedición Transiberiana
**Materia:** Certificación
**Tecnologías principales:** React, TypeScript, Express, Playwright y GitHub Actions.
---
