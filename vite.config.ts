import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2000,
    outDir: 'build',
  },
  define: {
    global: 'globalThis',
  },
  plugins: [react(), svgr(), tailwindcss()],
  preview: {
    port: 3001,
  },
  server: {
    open: true,
    port: 3000,
  },
});
