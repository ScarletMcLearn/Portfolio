# Syed Shams Elahi — Portfolio

Professional portfolio for Syed Shams Elahi — Software Engineer, Principal SDET, and Data
Scientist. Built as a fast, accessible, static site representing three equally weighted
disciplines: **software engineering**, **quality engineering**, and **data science & AI**.

See [`CONTENT_AUDIT.md`](./CONTENT_AUDIT.md) for the full claim-by-claim sourcing and confidence
record behind every statement on the site.

## Stack

- [Astro 7.0.7](https://astro.build) (static output) + TypeScript 5.9.3
- [Tailwind CSS 4.3.2](https://tailwindcss.com)
- Astro content collections (typed case-study content)
- `pnpm` 10.33.2, ESLint (flat config), Prettier
- [Playwright](https://playwright.dev) + [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) for e2e and accessibility testing
- [pixi](https://pixi.sh) manages the Node.js/pnpm toolchain itself (pinned exact versions —
  see `pixi.toml`), so no global Node/pnpm install is required.
- No React, no database, no server runtime — the built site is plain static HTML/CSS/JS.

## Local setup

Requires [pixi](https://pixi.sh/latest/#installation) only — it installs the exact pinned Node.js
and pnpm versions into an isolated project environment (`.pixi/`), so nothing needs to be
installed globally.

```bash
pixi install        # installs pinned Node.js + pnpm, then pixi run install fetches JS deps
pixi run install     # pnpm install --frozen-lockfile
pixi run dev         # http://localhost:4321
```

All commands below can also be run as `pixi run <task>`, or by entering a shell with the pinned
toolchain on PATH via `pixi shell` and then using the bare `pnpm <script>` form.

Copy `.env.example` to `.env` if you want to override `SITE_URL` / `SITE_BASE` locally (defaults
are set in `astro.config.mjs` and work out of the box for GitHub Pages under `/Portfolio`).

## Commands

| pixi task                          | Equivalent                                          | Purpose                                                 |
| ---------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| `pixi run install`                 | `pnpm install --frozen-lockfile`                    | Install JS dependencies                                 |
| `pixi run dev`                     | `pnpm dev`                                          | Start the dev server                                    |
| `pixi run build`                   | `pnpm build`                                        | Production build to `dist/`                             |
| `pixi run preview`                 | `pnpm preview`                                      | Preview the production build locally                    |
| `pixi run typecheck`               | `pnpm typecheck`                                    | Astro/TypeScript type checking (`astro check`)          |
| `pixi run lint` / `lint:fix`       | `pnpm lint` / `lint:fix`                            | ESLint                                                  |
| `pixi run format` / `format:check` | `pnpm format` / `format:check`                      | Prettier                                                |
| `pixi run playwright:install`      | `pnpm exec playwright install --with-deps chromium` | Install Playwright browsers                             |
| `pixi run test:e2e`                | `pnpm test:e2e`                                     | Full Playwright suite (builds + previews automatically) |

## Content editing

All content lives outside of components, in `src/data/*.ts` (typed TypeScript) and
`src/content/case-studies/*.md` (typed Markdown via content collections). See
[`CONTENT_EDITING.md`](./CONTENT_EDITING.md) for exactly where to change what — résumés,
experience, skills, achievements, case studies, and testimonials.

## Testing

The project ships with 31 Playwright end-to-end tests covering: homepage rendering, desktop and
mobile navigation, theme switching, all three discipline landing pages, the filterable work index,
all 9 case-study detail routes, résumé downloads, keyboard navigation, `@axe-core` accessibility
scans (WCAG 2 A/AA) on three representative pages, horizontal-overflow checks at
320/375/768/1024/1440px, the 404 page, internal link integrity, and the empty-state behavior of the
testimonials section.

This portfolio represents a multidisciplinary senior engineer, so its own software quality, data
integrity, accessibility, performance, and maintainability are held to the same standard the
portfolio itself describes — run
`pixi run lint && pixi run typecheck && pixi run test:e2e && pixi run build` before treating any
change as done.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for exact GitHub Pages setup steps, plus notes for Netlify,
Vercel, and Cloudflare Pages. The site builds to fully static files with no server requirement.

## Performance approach

- Static rendering, minimal client-side JavaScript (a handful of small vanilla `<script>` blocks
  for theme toggling, mobile nav, and the work-page filter — no hydration framework).
- System font stack only — no webfont download, no layout shift from font swapping.
- All visuals are inline SVG (monogram, favicon, Open Graph card) — no raster image requests.
- No third-party scripts, no analytics, no external font/CDN dependency.

## Accessibility approach

- Semantic landmarks (`header`, `nav`, `main`, `footer`), logical heading hierarchy per page.
- Visible skip link, visible focus outlines (`:focus-visible`), full keyboard operability for nav,
  mobile menu, theme toggle, and the work-page filter.
- `prefers-reduced-motion` respected; no information conveyed by motion alone.
- Automated `@axe-core` WCAG 2 A/AA scans included in the test suite and CI.

## Trust and integrity notes

- The testimonials section (`src/data/testimonials.ts`) ships empty by default and the
  `Testimonials` component renders nothing when it is empty. See
  `src/data/testimonials.example.ts` and `CONTENT_EDITING.md` for how to add a real, permissioned
  testimonial later.
- All professional case studies are anonymized or explicitly marked as representative capability
  examples where the underlying client/employer work is confidential — see each case study's
  "Confidentiality" field.
- Data-science/ML notebooks are presented as documented applied-practice work with direct source
  links, not as audited production research. See `CONTENT_AUDIT.md` for the full reasoning.
