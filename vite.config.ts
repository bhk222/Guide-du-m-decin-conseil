import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      // Required for SharedArrayBuffer (WASM multi-threading) and WebGPU
      // 'credentialless' allows cross-origin requests (HuggingFace CDN) unlike 'require-corp'
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  plugins: [
    react(),
    // Serve .onnx files with proper MIME type and caching headers
    {
      name: 'onnx-model-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.onnx')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    exclude: ['@huggingface/transformers'],
  },
});
