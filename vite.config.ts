import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // babel({ presets: [reactCompilerPreset()] })
  ],
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"]
  }
})
