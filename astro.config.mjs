// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // TODO: Replace with the live Vercel URL after the first deploy.
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
});
