# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# First activate the project's nix dev environment before relying on project tools/scripts
# This repo now uses `.envrc` with `use flake`
# Typical entry:
#   cd /data/Projects/drlove_portfolio
#   direnv allow   # first time / after envrc changes
# Then the shell provides: nodejs, pnpm, bun, pkg-config
# Keep using the repo's existing pnpm workflow unless there is a clear reason to switch

pnpm dev        # dev server with Turbopack
pnpm build      # production build + static export → out/
pnpm lint       # ESLint via next lint
```

There are no tests. `pnpm build` is the verification step - it must exit 0.

The build output is a fully static site in `out/` (configured via `output: 'export'` in `next.config.ts`). No server-side runtime. No `next start`.

## Deployment

Hosted on **GitHub Pages** with custom domain `drlove.dev`. The `out/` directory is the deploy artifact. `output: 'export'` + `trailingSlash: true` in `next.config.ts` ensures GitHub Pages compatibility. No backend, no SSR - purely static.

## Architecture

**Static export constraint**: `output: 'export'` means no server components that fetch at request time, no API routes, no Image Optimization. All data must be resolved at build time. `next/image` requires `unoptimized: true`.

**MDX pipeline**: Writing content lives in `src/content/writing/*.mdx`. `src/lib/mdx.ts` reads them with `gray-matter` at build time. `getAllPosts()` powers the listing page; `getPostBySlug()` + `generateStaticParams()` generate individual article pages. MDX is rendered via `next-mdx-remote/rsc` (React Server Component version). Plugins: `remark-gfm`, `rehype-pretty-code` (syntax highlighting via Shiki).

**MDX frontmatter shape**:
```
---
title: ""
description: ""
tag: ""        # e.g. "Systems", "Economy", "Essay"
readTime: ""   # e.g. "8 min read"
date: ""       # ISO 8601, optional, used for sort order
---
```

**Styling**: CSS Modules per component (`Component.module.css` co-located). No Tailwind. Global design tokens in `src/app/globals.css` - always use CSS variables, never hardcode colours or spacing. Global utility classes `.section`, `.divider`, `.accent`, `.accent2`, `.muted`, `.mono` are available everywhere.

**Fonts**: Loaded via `next/font/google` in `layout.tsx` and exposed as CSS variables: `--font-space-mono` (headings, 700wt), `--font-lora` (body, serif), `--font-jetbrains` (mono). Reference them through `--font-heading`, `--font-body`, `--font-mono` tokens defined in `globals.css`.

**Framer Motion**: Used for entrance animations. Always use string ease literals (`ease: 'easeOut' as const`), not numeric arrays - the v12 types are strict about this. Components that use `motion.*` must be `'use client'`.

**Path alias**: `@/` maps to `src/`.

## Design tokens (globals.css)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` / `--surface2` | `#111` / `#1a1a1a` | Cards, panels |
| `--border` | `#2a2a2a` | Dividers, outlines |
| `--accent` | `#e87c3a` | Primary CTA, highlights |
| `--accent2` | `#3ae8b4` | Secondary accent |
| `--text` | `#e8e4dc` | Body copy |
| `--muted` | `#666` | Meta text, labels |
| `--rust` / `--python` / `--next` | tech colours | Stack chips |

## Key conventions

- Server components by default; add `'use client'` only when needed (hooks, Framer Motion, IntersectionObserver).
- `StatCounter` (`src/components/home/StatCounter.tsx`) implements scroll-triggered counting with `IntersectionObserver` + `requestAnimationFrame` - no library. Follow this pattern for future scroll-reveal components.
- `SectionLabel` and `Chip` are the reusable primitives in `src/components/ui/`. Use them before creating new ones.
- Metadata: each page exports a `generateMetadata` or a static `metadata` object. The `metadataBase` is set to `https://drlove.dev` in the root layout.
