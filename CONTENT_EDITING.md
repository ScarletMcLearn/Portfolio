# Content Editing Guide

All content lives in typed data files and Markdown content collections, separate from
presentational components. This guide maps what you want to change to the file you need to edit.

## Where things live

| To change...                                            | Edit...                                |
| ------------------------------------------------------- | -------------------------------------- |
| Name, hero headline/subhead, narrative, location, email | `src/data/profile.ts`                  |
| GitHub/LinkedIn/Kaggle/email links                      | `src/data/social.ts`                   |
| Work history / experience timeline                      | `src/data/experience.ts`               |
| Skills (grouped by discipline)                          | `src/data/skills.ts`                   |
| Achievements (grouped by discipline)                    | `src/data/achievements.ts`             |
| "Problems I can solve" and collaboration strengths      | `src/data/capabilities.ts`             |
| Data-science/AI notebook project cards                  | `src/data/projects.ts`                 |
| Résumé variants (labels, filenames, descriptions)       | `src/data/resumes.ts`                  |
| Testimonials                                            | `src/data/testimonials.ts` (see below) |
| Case studies (the 9 detail pages under `/work/...`)     | `src/content/case-studies/*.md`        |
| Shared TypeScript types                                 | `src/data/types.ts`                    |

Changing any of these files does not require touching components — pages read from this data
layer automatically.

## Adding or editing a case study

Case studies are Markdown files in `src/content/case-studies/`, validated against the schema in
`src/content.config.ts`. Each file needs frontmatter for: `title`, `discipline`
(`software-engineering` | `quality-engineering` | `data-science-ai` | `multidisciplinary`),
`projectType`, `summary`, `context`, `problem`, `constraints`, `role`, `technologies` (array),
`outcomes` (array), `lessons` (array), `publicEvidence`, `confidentiality`
(`public` | `anonymized` | `representative`), `evidenceLevel` (`high` | `medium` | `low`), `order`
(number, controls sort within its discipline), and `featured` (boolean, whether it appears in the
homepage's "Selected multidisciplinary work" sample).

The Markdown body appears between the "Technologies" and "Outcomes" sections on the detail page —
use it for an "Approach"/"Architecture" section and an "Additional notes" section (don't duplicate
the "What can be discussed publicly" heading, which is auto-generated from the `publicEvidence`
frontmatter field).

A new case study automatically appears on `/work`, its discipline landing page, and gets its own
route at `/work/<discipline>/<filename-without-extension>`.

## Adding a real testimonial

The site intentionally ships **zero** testimonials. `src/data/testimonials.ts` exports an empty
array, and the `Testimonials` component (`src/components/Testimonials.astro`) renders nothing when
that array is empty — this is enforced by a Playwright test
(`tests/e2e/home.spec.ts`), so don't remove that guard.

To add a genuine testimonial:

1. Get **explicit written permission** from the person to publish their name, title, company, and
   quote (e.g. a LinkedIn recommendation they wrote themselves, or a direct message where they
   agree to be quoted publicly).
2. Look at `src/data/testimonials.example.ts` for the exact shape expected (`quote`, `name`,
   `title`, `company`, `relationship`).
3. Add a real entry — not the example placeholder — to the array in `src/data/testimonials.ts`.
4. Never invent a name, title, company, or quote. If you don't have permission yet, leave the
   array empty.

## Swapping or adding a résumé

Résumé PDFs live in `public/resume/`. To replace one:

1. Drop the new PDF into `public/resume/`, keeping (or updating) the filename referenced in
   `src/data/resumes.ts`.
2. Update the `filename`, `label`, `bestFor`, or `description` fields in `src/data/resumes.ts` if
   needed — the `/resumes` page and the résumé download links regenerate automatically.

The four original source résumés remain in `data/` at the repository root (untouched, not served
publicly) for reference — see `CONTENT_AUDIT.md` for why one of the four was not published.

## Updating claims/metrics

Before adding or changing any quantitative claim (a percentage, a year count, a scale figure),
check `CONTENT_AUDIT.md` first. If the new claim isn't already documented there with a source and
confidence level, add an entry before publishing it on the site — this keeps the audit trail
accurate as content evolves.
