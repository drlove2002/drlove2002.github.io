# drlove.dev — TODO

## Pages

### /worldwide — DONE
- [x] Section 01: Architecture — 3 ArchCards (Python, Rust, Next.js) with 3D hover
- [x] Section 02: Database Evolution timeline (5 TimelineCards, color-coded triggers)
- [x] Section 03: Economy Design (4 EconCards: inflation, exploits, psychology, real money)
- [x] Section 04: What Went Wrong (cache bug story)
- [x] Section 05: What's Next (forward-looking, links to /about)
- [x] Stack chips row at top of page
- [x] Scroll-reveal on timeline items (IntersectionObserver)
- [ ] "Visit Server" + "Live Dashboard" button links (add real URLs)

### /about — DONE
- [x] Personal story prose (West Bengal, too-ambitious projects, 5-year arc)
- [x] Two-column layout: bio left, interests grid right
- [x] CTA linking to /worldwide and /contact

### /writing — DONE (listing + article rendering)
- [x] Listing page via getAllPosts()
- [x] [slug] pages via getPostBySlug() + generateStaticParams()

### /writing articles (content work — all 4 are stubs)
- [ ] rust-financial-layer.mdx — full article (~8 min read)
- [ ] virtual-economy-design.mdx — full article (~12 min read)
- [ ] six-databases.mdx — full article (~10 min read)
- [ ] community-lessons.mdx — full article (~7 min read)

### /contact — DONE
- [x] Email, GitHub, LinkedIn, Discord links
- [ ] Add real Discord server invite link (currently null/TBD)

---

## Components & UI

### Global UI polish
- [ ] Mobile navigation — hamburger menu for <640px (Nav.tsx currently truncates)
- [ ] Scroll-to-top button (nice-to-have for long pages like /worldwide)

---

## SEO & Infrastructure

- [ ] `public/sitemap.xml` — or generate via Next.js
- [ ] `public/robots.txt`
- [ ] OpenGraph image (`/public/og-image.png`) — dark card with name + tagline
- [ ] Favicon / apple-touch-icon in `/public/`
- [ ] JSON-LD structured data (Person schema) in layout.tsx
- [ ] Canonical URL meta tags (already handled via metadataBase, verify)

---

## Animations & Polish

- [x] Staggered fade-in (Hero)
- [x] Stat counter animation (StatCounter)
- [x] Timeline item scroll-reveal (IntersectionObserver)
- [x] Stack chip hover tooltips
- [ ] Page transition (optional — framer-motion AnimatePresence in layout)
- [ ] Reduce motion: respect `prefers-reduced-motion` media query in StatCounter + Hero

---

## Content / Copy

- [ ] Proofread all final copy against blueprint design notes
- [ ] Add real GitHub URL, LinkedIn URL to nav or footer (currently only in /contact)

---

## Deployment (GitHub Pages)

- [ ] GitHub Actions workflow: `pnpm build` → deploy `out/` to GitHub Pages
- [ ] Configure custom domain `drlove.dev` in GitHub Pages settings
- [ ] DNS: point drlove.dev to GitHub Pages IPs
- [ ] Verify HTTPS works with custom domain
