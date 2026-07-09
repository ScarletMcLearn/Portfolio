// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://scarletmclearn.github.io';
const base = process.env.SITE_BASE || '/Portfolio';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
