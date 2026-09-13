import { test, expect } from "@playwright/test";

test("1. la aplicación inicia correctamente", async ({ page }) => {

    await page.goto("/");

    await expect(
        page.getByRole("heading", {
            name: "Expedición Transiberiana",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            "Una aventura ferroviaria desde Moscú hasta Vladivostok."
        )
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "INICIAR EXPEDICIÓN",
            exact: true
        })
    ).toBeVisible();
});


test("2. se puede iniciar una partida correctamente", async ({ page }) => {

    await page.goto("/");

    const respuesta = page.waitForResponse(
        (respuesta) =>
            respuesta.url().includes("/api/partidas") &&
            respuesta.request().method() === "POST"
    );

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await respuesta;

    await expect(
        page.getByRole("heading", {
            name: "Jugador 1",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Jugador 2",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Ruta Transiberiana",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 1",
            exact: true
        })
    ).toBeVisible();
});


test("3. se puede avanzar y cambia el turno", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await expect(
        page.getByText("Estación: Moscú").first()
    ).toBeVisible();

    const respuesta = page.waitForResponse(
        (respuesta) =>
            respuesta.url().includes("/api/partidas/") &&
            respuesta.url().includes("/jugada") &&
            respuesta.request().method() === "POST"
    );

    await page.getByRole("button", {
        name: "AVANZAR",
        exact: true
    }).click();

    await respuesta;

    await expect(
        page.getByText("Estación: Nizhni Nóvgorod").first()
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 2",
            exact: true
        })
    ).toBeVisible();
});


test("4. se puede explorar y obtener un evento", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await page.getByRole("button", {
        name: "EXPLORAR",
        exact: true
    }).click();

    await expect(
        page.locator(".mensaje-jugada")
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 2",
            exact: true
        })
    ).toBeVisible();
});


test("5. se puede preparar y recuperar energía", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await page.getByRole("button", {
        name: "PREPARARSE",
        exact: true
    }).click();

    await expect(
        page.locator(".mensaje-jugada")
    ).toBeVisible();

    await expect(
        page.getByText("Energía: 50").first()
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 2",
            exact: true
        })
    ).toBeVisible();
});


test("6. se puede bloquear al jugador contrario", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await page.getByRole("button", {
        name: "BLOQUEAR",
        exact: true
    }).click();

    await expect(
        page.locator(".mensaje-jugada")
    ).toContainText("bloqueó al Jugador 2");

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 2",
            exact: true
        })
    ).toBeVisible();

    await page.getByRole("button", {
        name: "AVANZAR",
        exact: true
    }).click();

    await expect(
        page.locator(".mensaje-jugada")
    ).toContainText("estaba bloqueado");

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 1",
            exact: true
        })
    ).toBeVisible();
});


test("7. la partida puede llegar hasta Vladivostok", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    for (let i = 0; i < 8; i++) {

        await page.getByRole("button", {
            name: "AVANZAR",
            exact: true
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Turno del Jugador 2",
                exact: true
            })
        ).toBeVisible();

        await page.getByRole("button", {
            name: "AVANZAR",
            exact: true
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Turno del Jugador 1",
                exact: true
            })
        ).toBeVisible();
    }

    await page.getByRole("button", {
        name: "AVANZAR",
        exact: true
    }).click();

    await expect(
        page.getByRole("heading", {
            name: "¡EXPEDICIÓN COMPLETADA!",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText("Historial de jugadas", {
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "NUEVA EXPEDICIÓN",
            exact: true
        })
    ).toBeVisible();
});


test("8. se puede iniciar una nueva expedición después de terminar", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    for (let i = 0; i < 8; i++) {

        await page.getByRole("button", {
            name: "AVANZAR",
            exact: true
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Turno del Jugador 2",
                exact: true
            })
        ).toBeVisible();

        await page.getByRole("button", {
            name: "AVANZAR",
            exact: true
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Turno del Jugador 1",
                exact: true
            })
        ).toBeVisible();
    }

    await page.getByRole("button", {
        name: "AVANZAR",
        exact: true
    }).click();

    await expect(
        page.getByRole("heading", {
            name: "¡EXPEDICIÓN COMPLETADA!",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText("Historial de jugadas", {
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "NUEVA EXPEDICIÓN",
            exact: true
        })
    ).toBeVisible();

    await page.getByRole("button", {
        name: "NUEVA EXPEDICIÓN",
        exact: true
    }).click();

    await expect(
        page.getByRole("heading", {
            name: "Jugador 1",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Jugador 2",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 1",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText("Estación: Moscú").first()
    ).toBeVisible();
});


test("9. el backend rechaza una jugada fuera de turno", async ({ page }) => {

    await page.goto("/");

    await page.getByRole("button", {
        name: "INICIAR EXPEDICIÓN",
        exact: true
    }).click();

    await expect(
        page.getByRole("heading", {
            name: "Turno del Jugador 1",
            exact: true
        })
    ).toBeVisible();

    /*
     * La partida acaba de comenzar y el turno pertenece
     * al Jugador 1.
     *
     * Intentamos realizar una jugada como Jugador 2.
     *
     * Esta petición llega directamente al endpoint real
     * de Express.
     */

    const partida = await page.evaluate(() => {

        return fetch("/api/partidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        }).then(
            (respuesta) => respuesta.json()
        );
    });

    const respuesta = await page.request.post(
        `/api/partidas/${partida.partida.id}/jugada`,
        {
            data: {
                jugadorId: 2,
                accion: "avanzar"
            }
        }
    );

    expect(respuesta.status()).toBe(400);

    const datos = await respuesta.json();

    expect(datos.correcto).toBe(false);

    expect(datos.mensaje).toBe(
        "No es el turno de este jugador"
    );
});