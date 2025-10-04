import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react({
        // Enable React Fast Refresh in development
        fastRefresh: !isProduction
      })
    ],
    
    // Path resolution
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
      }
    },
    
    // Build optimizations
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: isProduction ? false : true,
      minify: isProduction ? 'terser' : false,
      cssMinify: isProduction,
      reportCompressedSize: isProduction,
      chunkSizeWarningLimit: 1000,
      
      // Terser options for better compression
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      } : {},
      
      rollupOptions: {
        output: {
          // Manual chunking for better caching
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            
            // Router
            'router': ['react-router-dom'],
            
            // Large third-party libraries (if any)
            // Add other vendors here as needed
          },
          
          // Naming strategy for chunks
          chunkFileNames: isProduction 
            ? 'js/[name]-[hash].js'
            : 'js/[name].js',
          entryFileNames: isProduction 
            ? 'js/[name]-[hash].js'
            : 'js/[name].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').at(1)
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`
            }
            if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
              return `media/[name]-[hash][extname]`
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          }
        }
      }
    },
    
    // Development server configuration
    server: {
      port: 5173,
      host: true,
      strictPort: false,
      open: true,
      cors: true,
      historyApiFallback: true,
      // Proxy configuration for API calls (if needed)
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3001',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    
    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      open: true,
      cors: true
    },
    
    // Asset handling
    assetsInclude: [
      '**/*.mp4', 
      '**/*.webm', 
      '**/*.ogg', 
      '**/*.wav', 
      '**/*.mp3',
      '**/*.pdf'
    ],
    
    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      preprocessorOptions: {
        // Add global CSS variables if needed
        // scss: {
        //   additionalData: `@import "@/styles/variables.scss";`
        // }
      }
    },
    
    // Performance optimizations
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom'
      ],
      exclude: [
        // Exclude problematic dependencies from pre-bundling
      ]
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify('1.0.0'),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __IS_PRODUCTION__: isProduction
    },
    
    // Experimental features
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { js: `/${filename}` }
        }
        return { relative: true }
      }
    }
  }
})
