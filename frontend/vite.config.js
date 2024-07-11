import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist-ssr',
  },
  ssr: {
    noExternal: /react-helmet-async/
  }
});
