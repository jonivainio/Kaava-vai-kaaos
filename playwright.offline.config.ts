import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  testMatch: "offline.spec.ts",
  workers: 1,
  outputDir: "test-results-offline",
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:4173/Kaava-vai-kaaos/",
    headless: true,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: "node e2e/static-server.mjs",
    url: "http://127.0.0.1:4173/Kaava-vai-kaaos/",
    reuseExistingServer: false,
  },
});
