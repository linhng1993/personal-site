# Index (find a file here; don't open what you don't need)
## Always, at session start
| Path | Open when |
|---|---|
| memory/state.json | every session, first |
| handoff/<file in state.json> | every session, second |
| milestones/<milestone in state.json>.md | every session, third |

## On demand
| Path | What it is | Open when |
|---|---|---|
| context/project.md | goal, audience, scope | scope unclear (M1 lists it) |
| context/architecture.md | data flow, sitemap | structure/design tasks |
| context/conventions.md | brand voice, style, naming | before writing text or code |
| context/glossary.json | brand terms | unknown term (lookup by key) |
| memory/learned.md | past mistakes | before similar work |
| memory/decisions.jsonl | past decisions | before changing direction (grep topic) |
| schemas/cv.schema.json | shape of cv.json | editing cv.json |
| ../content-map.md | per-page sections, types, sizes, odd cases | layout/design tasks |
| ../content/cv.json | CV + portfolio data | content tasks (read by key) |
| skills/update-cv/ | edit CV, run exports | updating CV / exports |
| skills/close-milestone/ | write handoff + next spec | milestone done |

## Planning only (not at session start)
| Path | Open when |
|---|---|
| milestones/roadmap.md | planning, or closing a milestone |
| handoff/TEMPLATE.md | closing a milestone |
| handoff/ older files | never, unless the current handoff points to one |
