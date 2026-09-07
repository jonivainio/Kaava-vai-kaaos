import { defineConfig } from "vite";
export default defineConfig({
  build: {
    outDir: "dist/campaign",
    copyPublicDir: false,
    lib: {
      entry: "src/campaign/index.ts",
      formats: ["es"],
      fileName: "kaava-campaign",
    },
  },
});
