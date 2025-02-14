import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:  process.env.PORT || 3000, // Use process.env.PORT if it's available
    host: '0.0.0.0', // Ensure Vite binds to all network interfaces
    allowedHosts: ['storytime-frontend-ijypj.onrender.com'], // add your host here
  },
})
