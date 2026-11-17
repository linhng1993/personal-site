---
name: close-milestone
description: Use when a milestone's "done when" criteria are met or the user says to wrap up/close the milestone, to write the handoff file for the next chat.
---
# Steps
1. Check the current milestone's "Done when" in milestones/Mx.md; list anything unmet.
2. Write handoff/0x-to-0y.md from handoff/TEMPLATE.md (under 40 lines, conclusion first). Include the exact Read and Skip lists for the next chat.
3. Create milestones/My.md using roadmap.md. It must have: Goal, Read (exact file list), Do not read, Tasks, Done when, End. Keep the Read list minimal.
4. Update memory/state.json (milestone, current_task, status not_started, handoff = the new handoff path, next_step) and add mistakes to memory/learned.md; append decisions to memory/decisions.jsonl if any.
5. Give the user a copy-paste start prompt: "Start milestone My. Read CLAUDE.md, .ai/memory/state.json, handoff/0x-to-0y.md."
6. Check the handoff against the milestone: no step missing, no private data included.
