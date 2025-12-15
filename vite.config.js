import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //new

export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    port: 3000,
  }
})
