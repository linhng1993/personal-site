# Personal Site
Personal branding website with CV and portfolio. Data lives in `content/cv.json`; Astro renders the site; `exports/` holds generated CV files.

## Working with AI (milestone method)
Work is split into 7 milestones (`.ai/milestones/roadmap.md`), one chat each.
- **Start a chat:** paste "Start the current milestone. Read CLAUDE.md, then .ai/memory/state.json and follow it."
- **The AI reads only:** state.json -> the handoff file it names -> the current milestone spec. Nothing else by default.
- **Finish a chat:** say "close the milestone". The AI writes the next handoff file and spec, and updates state.json. Copy its start prompt into the next chat.

## Layout
- `CLAUDE.md` rules loaded every session
- `.ai/` AI context: index, context, memory, milestones, handoff, skills, schemas
- `content/` cv.json (public) and `private/` (never shared with AI)
- `src/`, `public/` site code and assets; `exports/` generated files
