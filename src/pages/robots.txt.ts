import type { APIRoute } from 'astro';
import { url } from '../lib/url';

// Note: on a GitHub Pages project site this file is served at /personal-site/robots.txt;
// crawlers only read robots.txt at the domain root, so the sitemap link in <head> matters more.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
