import { defineConfig } from "@playwright/test";

export default defineConfig({

    testDir: "./tests",

    use: {
        baseURL: "http://localhost:5173",
        headless: true
    },

    reporter: "html",

    webServer: [
        {
            command: "npm run dev -- --host 127.0.0.1",
            url: "http://127.0.0.1:5173",
            reuseExistingServer: true
        },
        {
            command: "cd backend && npm run dev",
            url: "http://localhost:3000/api/saludo",
            reuseExistingServer: true
        }
    ]
});