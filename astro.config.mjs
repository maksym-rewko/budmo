import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.budmo.ca',
  output: 'static',
  server: { port: 4325 },
  integrations: [sitemap()],
});
