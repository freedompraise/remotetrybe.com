import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import VitePluginSitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePluginSitemap({
      hostname: 'https://www.remotetrybe.com',
      exclude: ['/404', '/thank-you'],
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/404', '/thank-you'],
        },
      ],
      dynamicRoutes: [
        '/',
        '/va-masterclass',
        '/affiliate'
      ],
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
