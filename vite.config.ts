import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React and React DOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Framer Motion
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Icons
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize chunk size
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify with esbuild (default, faster than terser)
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';"
    }
  }
})
