import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Game/',
  build: {
    outDir: '../dist',  // ← Build para fora da pasta
  },
})