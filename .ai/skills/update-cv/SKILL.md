---
name: update-cv
description: Use when adding or changing a role, project, skill or education entry on the CV/portfolio, or when exports (docx, xlsx, JSON) need regenerating.
---
# Steps
1. Read only the needed keys of `content/cv.json` (never `content/private/`).
2. Edit `content/cv.json`; keep entries newest first and highlights concrete.
3. Run `python3 .ai/skills/update-cv/scripts/export.py` (validates, then writes `exports/`).
4. Check the result against `.ai/schemas/cv.schema.json` (the script reports errors) and update `.ai/memory/state.json`.
