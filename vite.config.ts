import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
           target: 'https://interview.optimavaluepro.com',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
    },
  },
})
