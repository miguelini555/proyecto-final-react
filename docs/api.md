# API REST - Expedición Transiberiana

## 1. Introducción

La API de Expedición Transiberiana permite la comunicación entre el frontend desarrollado con React y TypeScript y el backend desarrollado con Express y TypeScript.
El frontend utilizará la función nativa `fetch` para enviar solicitudes HTTP al backend.
Toda la comunicación entre React y Express utilizará JSON como formato de entrada y salida.
El backend será responsable de procesar las acciones importantes de la partida, validar las jugadas y mantener el estado de la partida.
La API estará disponible bajo la misma aplicación y dominio que el frontend.


# 2. Arquitectura de comunicación

La comunicación seguirá el siguiente flujo:
```text
┌─────────────────────┐
│       React         │
│    TypeScript       │
└──────────┬──────────┘
           │
           │ fetch()
           │ HTTP + JSON
           ▼
┌─────────────────────┐
│       Express       │
│    TypeScript      │
└──────────┬──────────┘
           │
           │ Procesa
           │ valida
           │ actualiza
           ▼
┌─────────────────────┐
│ Estado de partida   │
│               	  │
│ Jugadores           │
│ Posiciones          │
│ Recursos            │
│ Turno               │
│ Eventos             │
│ Puntuaciones        │
└──────────┬──────────┘
           │
           │ JSON
           ▼
┌─────────────────────┐
│       React         │
│ Actualiza interfaz  │
└─────────────────────┘
