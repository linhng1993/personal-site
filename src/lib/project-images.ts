import type { ImageMetadata } from 'astro';

// Local images only (never hotlinked): src/assets/projects/<slug>/<file>.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/**/*.{jpg,jpeg,png,webp}', { eager: true });

export function projectImage(slug: string, file: string): ImageMetadata {
  const hit = files[`/src/assets/projects/${slug}/${file}`];
  if (!hit) throw new Error(`Missing image src/assets/projects/${slug}/${file} (named in cv.json)`);
  return hit.default;
}
