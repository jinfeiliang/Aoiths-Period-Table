import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
           tailwindcss()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['0aeffaf9-e100-48f9-a87d-8a9d571e1a0a-00-32xtvmpz4adyo.kirk.replit.dev']
  }
})
