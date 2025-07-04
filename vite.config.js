import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,   // 👈 Use polling to detect file changes
    },
    hmr: {
      overlay: true,      // 👈 Show error overlay on failure
    },
  },
})
