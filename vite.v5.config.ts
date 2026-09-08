import { defineConfig } from 'vite';
export default defineConfig({ build: { outDir: 'dist/v5', emptyOutDir: true, lib: { entry: 'src/game/v5/index.ts', formats: ['es'], fileName: () => 'index.js' }, minify: false } });
