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
          // Rollup's CJS interop helper is needed by many chunks; keep it in the
          // always-loaded vendor chunk so charts (recharts) is not pulled in at startup.
          if (id.includes('commonjsHelpers')) return 'react-vendor';
          if (!id.includes('node_modules') && !id.includes('/src/')) return;

          // App-side chunks (data + translations isolated from page code)
          if (id.includes('/src/translations/')) return 'translations';

          // Shared layout components: one chunk (one request) instead of ~15 small ones.
          if (
            /\/src\/components\/(Header|Footer|Breadcrumbs|SubpageBackground|HreflangTags|SeoMeta|JsonLd|PageCTA|StickyBookingBar|InlineBookingLink)\.tsx$/.test(id) ||
            /\/src\/components\/guide\/(ReadNextSection|GuideDisclaimer)\.tsx$/.test(id) ||
            /\/src\/utils\/structuredData\.ts$/.test(id)
          ) {
            return 'layout';
          }
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
              id.includes('/scheduler/') ||
              id.includes('/node_modules/clsx/') ||
              id.includes('/node_modules/tailwind-merge/') ||
              id.includes('/node_modules/class-variance-authority/')
            ) {
              return 'react-vendor';
            }
            if (id.includes('/@supabase/')) return 'supabase';
            if (id.includes('/lucide-react/')) return 'icons';
            if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) {
              return 'motion';
            }
            if (id.includes('/recharts/') || id.includes('/d3-') || id.includes('/victory-vendor/')) {
              return 'charts';
            }
            if (id.includes('/@radix-ui/')) return 'radix';
          }
        },
      },
    },
  },
}));
