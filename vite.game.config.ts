import { defineConfig } from "vite";
export default defineConfig({
  publicDir: false,
  build: {
    outDir: "dist/game",
    lib: {
      entry: "src/game/index.ts",
      formats: ["es"],
      fileName: "kaava-game",
    },
  },
});
