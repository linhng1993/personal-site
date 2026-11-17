import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://linhng1993.github.io/personal-site/
// Internal links go through src/lib/url.ts so they pick up `base`.
export default defineConfig({
  site: 'https://linhng1993.github.io',
  base: '/personal-site',
  output: 'static',
  integrations: [sitemap()],
});
