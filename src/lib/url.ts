// Prefix a root-relative path with the deploy base (GitHub Pages serves the site under /personal-site/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;
