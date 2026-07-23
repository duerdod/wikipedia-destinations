import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In dev, the edge function runs under wrangler (npm run dev:api on :8788);
    // Vite proxies /api to it so article loading works with HMR.
    proxy: {
      '/api': 'http://localhost:8788',
    },
  },
});
