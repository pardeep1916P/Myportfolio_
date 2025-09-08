import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    optimizeDeps: {
      include: ["zwitch"],
    },
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
        "@utils": "/src/utils",
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react': ['react', 'react-dom'],
          },
        },
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  server: {
    host: true,
    port: 4321,
    open: true,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
