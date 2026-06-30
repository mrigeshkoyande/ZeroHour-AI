import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Target modern browsers (Cloud Run serves these)
    target: 'es2020',

    // Output directory
    outDir: 'dist',

    // Source maps only in development (not bundled into production)
    sourcemap: false,

    // Warn if a chunk exceeds 800 KB before gzip
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching:
        // Vendor libraries (rarely change) → separate chunk with long cache TTL
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            return 'vendor-others';
          }
        },
      },
    },

    // Minify with esbuild (fastest, built into Vite)
    minify: 'esbuild',
  },

  // Preview server (for `npm run preview` or local Docker testing)
  preview: {
    port: 8080,
    host: '0.0.0.0',   // Required for Docker container binding
    strictPort: true,
  },

  server: {
    port: 5174,
    host: '0.0.0.0',
    strictPort: false,
  },
})
