# Instructions.md — drlove.dev

> **Format version:** 2.0
> **Last evolved:** 2026-03-14
> **Sessions run:** 1
> **Schema changes:** 0

This file is the execution entrypoint for Claude Code sessions on the drlove.dev portfolio project. It is designed to be self-improving — read the [Self-Improvement Protocol](#self-improvement-protocol) before your first clean-up.

---

## How to Use This File

```
1. Read this entire file top-to-bottom.
2. Read MEMORY.md and CLAUDE.md for project context.
3. Read TODO.md for current task state.
4. Execute tasks using the Execution Protocol below.
5. On completion, run the Clean-Up Protocol.
6. On clean-up, run the Self-Improvement Protocol.
```

**Rule:** Never skip steps 1–3. Context-loading is not optional — it prevents redundant work and repeated mistakes.

---

## Execution Protocol

For each task in the [Tasks](#tasks) section:

```
LOAD   → Read TODO.md to sync current state.
PLAN   → Break the task into subtasks. Write them into TODO.md as a checklist.
         If a similar task exists in Patterns Library, apply the pattern.
ACT    → Execute subtasks one at a time. Commit logical units.
VERIFY → After each subtask, verify it's actually done (render, test, inspect).
         Mark complete in TODO.md only after verification.
SYNC   → After the full task completes, re-read TODO.md.
         Remove completed items. Check if remaining items are truly incomplete.
LOG    → Append a brief entry to the Session Log (see template below).
```

### Task Schema

Each task below follows this structure:

```
### T-{id}: {Title}
- **Status:** queued | active | done | blocked | failed
- **Priority:** p0 (now) | p1 (soon) | p2 (later)
- **Depends on:** T-{id} or none
- **Acceptance criteria:** What "done" looks like, concretely.
- **Context:** Why this matters, what to watch out for.
- **Attempt history:** (auto-appended by self-improvement protocol)
```

---

## Tasks

### T-01: Populate /writing with original content

- **Status:** done
- **Priority:** p1
- **Depends on:** T-02 (merge about → home first, so you know what's already covered)
- **Acceptance criteria:**
  - Every article placeholder in /writing has real content.
  - No content duplicates what exists on the home page (post-merge).
  - Topics leverage the owner's strengths: systems architecture, database evolution, Rust, Discord infrastructure at scale, economics/geopolitics intersections with tech.
  - Each article has proper MDX frontmatter (title, date, summary, tags).
- **Context:** The writing page is the thought-leadership surface for DAAD and recruiter audiences. Content should demonstrate depth, not breadth. Refer to the CV and MEMORY.md for source material. Skip any topic already covered in the merged home page.

### T-02: Merge about page into home page

- **Status:** done
- **Priority:** p0
- **Depends on:** none
- **Acceptance criteria:**
  - Home page contains: hero/intro, background summary, skills overview, featured projects, and a call-to-action (contact or explore writing).
  - About page route is removed or redirects to home.
  - Navigation updated — no dead links.
  - Content flows naturally as a single narrative, not a mechanical concatenation.
  - Mobile layout is coherent (test at 375px, 768px, 1024px widths).
- **Context:** Goal is a streamlined single-entry-point experience. Visitors (professors, recruiters, DAAD reviewers) should understand who the owner is and what he builds within 10 seconds of landing.

### T-03: Design and UX audit across all pages

- **Status:** done
- **Priority:** p1
- **Depends on:** T-02
- **Acceptance criteria:**
  - Typography: Syne/Lora/JetBrains Mono applied consistently, hierarchy is clear.
  - Color system: dark #0a0a0a / amber #e87c3a / teal #3ae8b4 used with intention, not randomly.
  - Layout: No orphaned elements, no content clipping, no horizontal scroll on mobile.
  - Interactions: Framer Motion animations are purposeful (guide attention, not distract).
  - Accessibility: Contrast ratios pass WCAG AA. Focus states exist. Alt text on images.
  - Performance: No layout shift. Images optimized. No blocking resources above the fold.
- **Context:** This is the portfolio's first impression surface. Apply the project's design system from MEMORY.md. The aesthetic is dark, editorial, and precise — not playful or generic.

### T-04: Research and add relevant skills to project presentations

- **Status:** done
- **Priority:** p2
- **Depends on:** T-03
- **Acceptance criteria:**
  - Each project card/page lists skills that are specific and verifiable (not vague buzzwords).
  - Skills reflect current industry demand (check against real job postings or industry reports).
  - Skills are categorized (e.g., infrastructure, language, tooling, methodology).
  - Sources for skill relevance are documented in the session log.
- **Context:** Skills listed on projects serve double duty — they're keywords for recruiters AND credibility signals for academic reviewers. Prioritize skills that differentiate (e.g., "libSQL embedded via Axum/gRPC" over generic "SQL").

---

## Clean-Up Protocol

Run this after all tasks in a session are complete:

```
1. Update TODO.md     → Remove completed items, verify nothing's left dangling.
2. Update MEMORY.md   → Add any new project context, decisions, or tech changes discovered.
3. Update CLAUDE.md   → Add any preferences, patterns, or constraints learned about the owner.
4. Update this file   → Clear completed tasks. Run the Self-Improvement Protocol below.
5. Commit all changes  → Single clean commit with a descriptive message.
```

---

## Self-Improvement Protocol

This file evolves. After every session, perform these steps **in order:**

### 1. Log the Session

Append to the [Session Log](#session-log) using this template:

```markdown
### Session {n} — {YYYY-MM-DD}
- **Tasks attempted:** T-xx, T-yy
- **Completed:** T-xx
- **Failed/Blocked:** T-yy (reason: ...)
- **Time sinks:** What took longer than expected and why.
- **Discoveries:** New project context, gotchas, or constraints found.
- **What worked:** Techniques, approaches, or tool usage that went smoothly.
- **What didn't:** Approaches that failed or produced rework.
```

### 2. Refine Failed Tasks

For any task that failed or needed rework:

- Update its **Context** field with what went wrong and why.
- Tighten its **Acceptance criteria** to prevent the same failure.
- Add an **Attempt history** entry:

  ```
  - Attempt {n} ({date}): {what was tried} → {outcome} → {lesson}
  ```

### 3. Extract Patterns

Review the session log. If you notice a reusable insight, add it to the [Patterns Library](#patterns-library). A pattern should be:

- **Actionable** (not just an observation — include the "do this" part).
- **Scoped** (say when it applies and when it doesn't).
- **Proven** (emerged from at least one real session, not hypothetical).

### 4. Evolve the Format

Ask yourself:

- Did the task schema have fields I never used? → Remove them.
- Did I need information the schema didn't capture? → Add a field.
- Was the execution protocol's step order wrong? → Reorder it.
- Did a section of this file go unread or feel useless? → Cut or restructure it.

If you make a structural change, increment `Schema changes` in the header and note what changed and why in the [Format Changelog](#format-changelog).

---

## Patterns Library

> Patterns accumulate here over sessions. Start empty — earn each entry.

### P-01: Page Merge Pattern
- **When to apply:** Removing a route by merging its content into another page.
- **Do this:** Create separate components for each section, give them `id` anchors, update all internal links to `/#anchor`, delete the old route directory, update Nav last.
- **Don't do this:** Inline all markup directly into page.tsx — keep sections as components for maintainability.
- **Learned from:** Session 1 (about → home merge)

### P-02: Unified Plugin TypeScript
- **When to apply:** Adding rehype/remark plugins with options to next-mdx-remote/rsc.
- **Do this:** Cast the entire rehypePlugins array as `any` — `rehypePlugins: [...] as any`
- **Don't do this:** Use the `[plugin, options]` tuple form without a cast — TypeScript rejects it with a complex union error.
- **Learned from:** Session 1 (rehype-pretty-code integration)

<!-- Pattern template:
### P-{id}: {Name}
- **When to apply:** {Situation or trigger}
- **Do this:** {Concrete action}
- **Don't do this:** {Common mistake it prevents}
- **Learned from:** Session {n}
-->

---

## Session Log

> Append-only. Never edit past entries — they're historical data.

### Session 1 — 2026-03-14
- **Tasks attempted:** T-02, T-01, T-03, T-04
- **Completed:** T-02, T-01, T-03, T-04 (all tasks)
- **Failed/Blocked:** none
- **Time sinks:** rehype-pretty-code TypeScript type error required `as any` cast — next-mdx-remote's plugin type is strict about tuple format.
- **Discoveries:**
  - `/about` route deleted; content merged into home page at `#journey` / `#contact` anchors.
  - `--muted` in globals.css is `#888888`, not `#666` as CLAUDE.md states — both have sufficient contrast.
  - rehype-pretty-code and rehype-slug were installed but not wired into the article page MDX pipeline.
  - `prefers-reduced-motion` was not handled anywhere in the codebase.
- **What worked:** Parallel file creation for new components (JourneySection, ContactSection, chip rows). All builds passed first try except the rehype-pretty-code TypeScript issue.
- **What didn't:** Strict TS types for unified plugin tuples — can't use `[plugin, options]` tuple form without a cast.

---

## Format Changelog

| Version | Date | Change | Reason |
|---------|------|--------|--------|
| 2.0 | — | Initial structured format with self-improvement protocol | Replace freeform task list with schema-driven, evolvable system |

---

## Cross-File Contract

This project uses three knowledge files. They have distinct roles — don't blur them:

| File | Purpose | Mutated by |
|------|---------|------------|
| `Instructions.md` | Task execution, process, patterns, session history | Every session (clean-up + self-improvement) |
| `MEMORY.md` | Project-level technical context (stack, architecture, decisions) | When project facts change |
| `CLAUDE.md` | Owner preferences, communication style, constraints | When preferences are discovered or corrected |
| `TODO.md` | Granular subtask checklist (ephemeral, per-session) | During task execution |

**Rule:** If you're unsure where something belongs, ask: "Is this about *what to do* (Instructions), *how the project works* (MEMORY), *how the owner thinks* (CLAUDE), or *what's left to do right now* (TODO)?"
