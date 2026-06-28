import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// If deploying to GitHub Pages at username.github.io/portfolio, set base to '/portfolio/'.
// For a user site (username.github.io) or Vercel, leave base as '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
