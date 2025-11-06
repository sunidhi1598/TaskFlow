import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 This is super important for Netlify (keeps routing working)
  base: '/',
  server: {
    port: 3000, // local dev port
  },
})
