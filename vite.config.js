import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // ← Path relativo (funciona em qualquer lugar)
  build: {
    outDir: 'dist',
  },
})