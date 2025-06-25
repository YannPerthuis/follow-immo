import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'copy-files',
      writeBundle() {
        // Ensure extension directory exists
        mkdirSync('../../dist/extension', { recursive: true });
        copyFileSync('chrome/manifest.json', '../../dist/extension/manifest.json');
        copyFileSync('chrome/popup.html', '../../dist/extension/popup.html');
        copyFileSync('chrome/sidebar.html', '../../dist/extension/sidebar.html');
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'chrome/background.ts'),
        content: resolve(__dirname, 'chrome/content.ts'),
        popup: resolve(__dirname, 'chrome/popup.ts'),
        sidebar: resolve(__dirname, 'chrome/sidebar.ts'),
        inject: resolve(__dirname, 'front-adapters/leboncoin/inject.tsx'),
        'content.css': resolve(__dirname, 'chrome/content.scss'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'es'
      }
    },
    outDir: '../../dist/extension',
    emptyOutDir: true,
    copyPublicDir: false,
    target: 'esnext',
  },
  publicDir: false,
  resolve: {
    alias: {
      '@': resolve(__dirname, '..'),
      '@/ui': resolve(__dirname, '../ui'),
      '@/extension': resolve(__dirname, '.'),
      '@/back-office': resolve(__dirname, '../back-office'),
    },
  },
}); 