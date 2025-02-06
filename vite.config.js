import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; 
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
