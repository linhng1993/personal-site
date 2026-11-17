# Content map

What the site renders, per page and section. Structure and sizes only; the words live in `content/cv.json` (CV data) and `src/data/site.ts` (site copy). Counts as of 2026-11-15.

## Global (every page)

| Section | Purpose | Type | Length / items | Odd cases |
|---|---|---|---|---|
| Nav | Brand name + main links | Nav bar (burger below 48rem) | 4 links | `/story` and `/contact` don't exist yet (404). Burger needs JS; `<noscript>` shows the full list. |
| Footer | Copyright + profile links | Link row | 3 links | The Behance label is rewritten to "Behance (volunteer design work)". Year comes from build time. |

## Home `/`

| Section | Purpose | Type | Length / items | Odd cases |
|---|---|---|---|---|
| Hero | Who I am, first impression | Hero | Role label, name, 1-sentence hook, 55-word summary, 2 buttons | **Hook is a placeholder** (`hookIsPlaceholder: true`). Name is split at the first comma (credentials dropped); headline is split at `\|` into a label. The "Read my story" button goes to a 404. |
| Three chapters | The career arc in brief | Cards (ordered) | 3 cards, title + 7–9 words | Fixed at 3 in `site.ts`, not from cv.json. |
| 3MT feature | Signature visual | Image + caption | 1 image, 1-line caption, 1 link | Matched to a project by exact title (`threeMtTitle`). If the title changes, the heading falls back to the constant and the anchor link breaks. |
| Selected work | Teaser of the portfolio | Cards | First 3 projects, 18–30 words each, 2–3 tags | Order follows cv.json (not the Portfolio order). "View project" only shows when a project has a URL. |
| What I bring | Strengths at a glance | Tag list | First 6 of 9 skills | Skill strings run 20–64 chars, so long tags wrap. |
| Let's talk | Call to action | CTA band | Heading + 2 buttons | "Get in touch" goes to a 404 (no `/contact`). |

## Portfolio `/portfolio`

| Section | Purpose | Type | Length / items | Odd cases |
|---|---|---|---|---|
| Intro | Frame the work | Short text | Label, H1, 1 sentence | — |
| Filter chips | Filter by theme | Chips (CSS-only `:target` + `:has()`) | All + 4 groups | Build fails if a project tag isn't in a group. Active state is visual only (no `aria-current`). No empty state: a filter is never empty while every group has at least one project. |
| Project grid | Show each project | Cards | 6 cards, 12–30 words, 2–3 tags; titles 9–35 chars | The 3MT card comes first, spans the full width and has an image. 2 of 6 projects have no URL and show "Shown as a description only." Each card has a slug `id` for deep links. |

## CV `/cv`

| Section | Purpose | Type | Length / items | Odd cases |
|---|---|---|---|---|
| Sidebar | Downloads + jump links | Card (sticky ≥60rem, hidden in print) | 3 downloads, 7 jump links | Download files only exist after `export.py` runs; until then the links 404. |
| Header | Identity | Long text | Full name with credentials, 9-word headline, 55-word summary, 3 links | — |
| Experience | Work history | Entry list | 6 entries, 2–4 bullets each, 6–29 words per bullet | **Long titles:** role + org runs up to ~157 chars. `end` is optional and shows "present" when missing (none are missing now). Highlights are optional. |
| Education | Degrees | Entry list | 4 entries | **Very long degree names** (91–208 chars). Year is optional. |
| Skills | Skill tags | Tag list | 9 tags, 20–64 chars | Long tags wrap. |
| Awards | Recognition | Bullet list | 9 items, 7–12 words | Year is optional. |
| Publications | Publication record | Long text (summary only) | 1 paragraph, ~25 words | No individual citations listed. |
| Volunteering | Side roles | Entry list | 4 entries, 8–17 words | — |
| Languages | Languages | Bullet list | 4 items, "language: level" | — |

## Not built yet

- `/story` and `/contact`: linked from the nav, the Home hero and the CTA, but not in any milestone (see `state.json` blockers).
- Empty states: no section handles an empty array. An empty list in cv.json renders a heading with nothing under it.
