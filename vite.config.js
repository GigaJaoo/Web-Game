import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Game/',  // ← Confirma o nome do repositório
  build: {
    outDir: 'dist',
  },
})