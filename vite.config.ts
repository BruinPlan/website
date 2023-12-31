import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'frontend/public'),
  plugins: [react()],
  build: {
    cssCodeSplit: true
  }
})
