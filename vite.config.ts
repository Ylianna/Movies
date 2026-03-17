import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Замените <имя_репозитория> на имя вашего GitHub репозитория
export default defineConfig({
  plugins: [react()],
  base: '/Movies/', // <-- эта строка аналогична "homepage" в CRA
})