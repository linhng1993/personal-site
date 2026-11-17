# Personal Site
Personal branding website with CV and portfolio. Data lives in `content/cv.json`; Astro renders the site; `exports/` holds generated CV files.

## Working with AI (milestone method)
Work is split into 9 milestones (`.ai/milestones/roadmap.md`), one chat each.
- **Start a chat:** paste "Start the current milestone. Read CLAUDE.md, then .ai/memory/state.json and follow it."
- **The AI reads only:** state.json -> the handoff file it names -> the current milestone spec. Nothing else by default.
- **Finish a chat:** say "close the milestone". The AI writes the next handoff file and spec, and updates state.json. Copy its start prompt into the next chat.

## Layout
- `CLAUDE.md` rules loaded every session
- `.ai/` AI context: index, context, memory, milestones, handoff, skills, schemas
- `content/` cv.json (public) and `private/` (never shared with AI, never committed)
- `src/`, `public/` site code and assets; `exports/` generated files

## Live site and deploy
Live at https://linhng1993.github.io/personal-site/ (GitHub Pages, base `/personal-site`).
Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`, Actions tab shows progress, about 2 min).

## Maintenance (Mac Terminal)
**Update CV content**
1. Edit `content/cv.json` only (schema: `.ai/schemas/cv.schema.json`).
2. `python3 .ai/skills/update-cv/scripts/export.py` - validates, rebuilds DOCX/PDF/JSON into `exports/` and `public/downloads/`.
3. Optional local check: `npm run build 2>&1 | tail -5` or `npm run dev`.
4. Publish: `git add -A && git commit -m "Update CV" && git push`

**Add a project:** new entry in `cv.json` `projects`. Optional fields:
- `"featured": true` shows it in Home "Selected work" (max 3).
- tag `"AI"` lists it on the AI journey page (/ai).
- `"slug"` gives it its own page at /projects/<slug>/; put its images in `src/assets/projects/<slug>/`.
Then run export.py and push.

**Site copy** (headlines, story, buttons, email) lives in `src/data/site.ts`. Internal links must use `url()` from `src/lib/url.ts` so they keep the `/personal-site` base.

## What is public
Tracked: site code, `content/cv.json`, `public/`, and the `.ai/` method (context, milestones, skills, schemas).
Ignored (stays on this Mac only, not backed up): `content/private/`, `exports/`, `.ai/memory/`, `.ai/handoff/`, `design/`, `to_delete/`.
Before pushing anything new: `git status --short` and make sure no private file appears.
