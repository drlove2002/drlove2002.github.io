# drlove.dev — TODO

`pnpm build` exits 0. `pnpm lint` exits 0 (0 warnings, 0 errors).
CI/CD: push to `main` → GitHub Actions builds & deploys to GitHub Pages.

---

## Must-do before launch

- [ ] **OG image PNG** — `public/og-image.svg` is an SVG. Twitter/X and Facebook do not
      render SVG for social previews. Generate or design a 1200×630 PNG and place it at
      `public/og-image.png`, then update `layout.tsx` to reference it.
- [ ] **apple-touch-icon** — add `public/apple-touch-icon.png` (180×180 PNG) for iOS
      home screen bookmarks; reference it in `layout.tsx` `icons.apple`.

## Post-launch checks (manual)

- [ ] Verify OG image appears correctly on Discord / Twitter / LinkedIn after deploying PNG
- [ ] Confirm sitemap is submitted and indexed in Google Search Console
- [ ] Test hamburger nav on a real mobile device (iOS Safari, Android Chrome)
- [ ] Verify Discord invite link `https://discord.gg/SJy8dnMh` is still active

## Known issues / notes

- `pnpm lint` prints a "next lint is deprecated" notice (Next.js 15 migration warning).
  Not an error — lint still runs and reports 0 issues. Migration path when ready:
  `npx @next/codemod@canary next-lint-to-eslint-cli .`
- Discord stats (`discord.ts`) use the public invite API — no bot token needed.
  The GitHub Actions workflow does not pass any Discord secrets (removed).
