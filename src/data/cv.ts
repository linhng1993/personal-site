import cv from '../../content/cv.json';

export type Cv = typeof cv;
export default cv;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-01" -> "Jan 2026"; anything else is returned unchanged ("present"). */
export function formatDate(value?: string): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})$/.exec(value);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : value;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Project shape incl. optional page fields (see .ai/schemas/cv.schema.json). */
export interface Project {
  title: string;
  description: string;
  url?: string;
  youtubeId?: string;
  tags?: string[];
  slug?: string;
  summary?: string;
  status?: string;
  body?: string;
  team?: { name: string; role?: string; url?: string }[];
  links?: { label: string; url: string }[];
  gallery?: { image: string; alt: string; caption?: string }[];
  issues?: { title: string; year?: string; url: string; cover?: string }[];
  thesis?: { status: string; url?: string };
}
export const projects = cv.projects as Project[];
