import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname.includes('/assets/')) {
          return new URLSearchParams({ w: '800', format: 'webp', quality: '75' });
        }
        return new URLSearchParams();
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[hash][extname]',
        manualChunks: (id) => {
          if (!id.includes('node_modules') && !id.includes('/src/')) return;

          // App-side chunks (data + translations isolated from page code)
          if (id.includes('/src/translations/')) return 'translations';
          if (
            id.includes('/src/data/properties.ts') ||
            id.includes('/src/data/propertyTranslationsFi') ||
            id.includes('/src/data/propertyTranslationsEn') ||
            id.includes('/src/data/propertyDetails')
          ) {
            return 'properties-data';
          }

          // Vendor chunks
          if (id.includes('node_modules')) {
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/react-router') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor';
            }
            if (id.includes('/@supabase/')) return 'supabase';
            if (id.includes('/lucide-react/')) return 'icons';
            if (
              id.includes('/framer-motion/') ||
              id.includes('/recharts/') ||
              id.includes('/@radix-ui/')
            ) {
              return 'ui-vendor';
            }
          }
        },
      },
    },
  },
}));
