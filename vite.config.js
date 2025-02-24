import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:  process.env.PORT || 3000, // Use process.env.PORT if it's available
    host: true, // Ensure Vite binds to all network interfaces
  },
  preview: {
    allowedHosts: ['storytime-frontend-iypj.onrender.com']
  }
})
