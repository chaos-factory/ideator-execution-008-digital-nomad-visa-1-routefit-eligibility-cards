import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ideator-exec-008-routefit-eligibility-cards/',
  build: {
    outDir: 'dist',
  },
})
