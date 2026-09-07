import { defineConfig } from "vitest/config";
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) =>
          id.includes("node_modules") ? "vendor" : undefined,
      },
    },
  },
  test: { include: ["tests/**/*.test.ts"] },
});
