# drlove.dev — TODO

## SEO & Infrastructure

- [ ] `public/sitemap.xml` — or generate via Next.js
- [ ] `public/robots.txt`
- [ ] OpenGraph image (`/public/og-image.png`) — dark card with name + tagline
- [ ] Favicon / apple-touch-icon in `/public/`
- [ ] JSON-LD structured data (Person schema) in layout.tsx
- [ ] Canonical URL meta tags (already handled via metadataBase, verify)

## Components & UI

- [ ] Mobile navigation — hamburger menu for <640px (Nav.tsx truncates at 4 links)
- [ ] Scroll-to-top button (long pages like /worldwide)

## Deployment (GitHub Pages)

- [ ] GitHub Actions workflow: `pnpm build` → deploy `out/` to GitHub Pages
- [ ] Verify everything works correctly in production (links, images, SEO tags, etc.)
