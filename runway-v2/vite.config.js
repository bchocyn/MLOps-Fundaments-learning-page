import { defineConfig } from 'vite';

export default defineConfig({
  // Repo name as base path for GitHub Pages deployment
  // If you fork this, change to your repo name (e.g. '/your-repo-name/')
  base: '/MLOps-Fundaments-learning-page/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: true,
  },
});
