import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Game/Web%20Game/',
  build: {
    outDir: 'dist',
  },
})