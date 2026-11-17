# Personal Site
Personal branding website with CV and portfolio (Astro), built from one `content/cv.json`.

## Start of every session (in this order, stop when you have what you need)
1. `.ai/memory/state.json` -> tells you the current milestone and handoff file.
2. The handoff file named there (`.ai/handoff/...`).
3. The milestone spec `.ai/milestones/<milestone>.md`; follow its "Read" list only.
Do NOT read other milestone specs, older handoffs, `roadmap.md`, `architecture.md` or `docs/` unless the current spec lists them. Use `.ai/index.md` to find anything else.

## Rules
- One milestone per chat. Stay inside its scope; note out-of-scope ideas in `state.json` blockers, don't build them.
- When the milestone's "Done when" is met, run skill `close-milestone` (writes the next handoff + spec).
- Follow `.ai/context/conventions.md` before writing text or code.
- Edit CV/portfolio data only in `content/cv.json` (schema: `.ai/schemas/cv.schema.json`).
- Update `.ai/memory/state.json` at the end of each session; log mistakes in `.ai/memory/learned.md`.
- NEVER read, open, summarize or send anything in `content/private/`.
- Never read `public/` binaries or `exports/` (generated).
- Concise answers, conclusion first.
- For builds/checks, give the user a paste-ready terminal command (output trimmed to errors/tail) instead of running them yourself.
