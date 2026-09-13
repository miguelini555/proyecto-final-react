# Investigación técnica

## 1. Introducción

Durante el desarrollo de **Expedición Transiberiana** se investigaron diferentes aspectos técnicos necesarios para completar el proyecto.
La investigación se concentró principalmente en:
- Pruebas End-to-End (E2E).
- GitHub Actions.
- Linting del código.
- Publicación de la aplicación.
- Integración entre frontend y backend.
- Ejecución de las pruebas localmente y en GitHub Actions.
Estas tecnologías y procesos son necesarios para comprobar que la aplicación funciona correctamente no solamente durante el desarrollo, sino también en un entorno publicado.


# 2. Investigación sobre pruebas E2E

## 2.1 ¿Qué son las pruebas E2E?

Las pruebas End-to-End permiten comprobar el funcionamiento de una aplicación desde el punto de vista del usuario.
En lugar de probar solamente una función o componente individual, una prueba E2E puede realizar un flujo completo:
```text
Abrir aplicación
       ↓
Iniciar partida
       ↓
Interactuar con el juego
       ↓
Enviar una jugada
       ↓
Comunicación con Express
       ↓
Actualizar la partida
       ↓
Comprobar resultado
