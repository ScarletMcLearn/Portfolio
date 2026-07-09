# Content Audit

This document records, for every significant claim used on the site, its source, confidence
level, and how it was worded. It exists so the site owner (and anyone else) can verify what is
backed by evidence versus what is qualified/representative language.

**Confidence levels**

- **High** — supported by several consistent sources or strong public evidence.
- **Medium** — supported by one supplied professional document, or by directly inspected public evidence (e.g. a GitHub repo or notebook).
- **Low** — ambiguous, inconsistent, or insufficiently supported. Not published as a stated fact; either omitted or rewritten as clearly representative/qualified language.

## Source documents inspected

| File                                                              | Role                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/Sr SQA Automation Engineer - Syed Shams Elahi.pdf`          | Newest, most detailed QE-focused résumé. Published as the SQA/quality-engineering résumé.                                                                                                |
| `data/Software Engineer - Syed Shams Elahi.pdf`                   | Same employment history, software-engineering framing. Published as the software-engineering résumé.                                                                                     |
| `data/Data Scientist - Syed Shams Elahi.pdf`                      | Same employment history, data-science framing, with several achievement claims not found elsewhere. Published as the data-science résumé.                                                |
| `data/Portfolio - Syed Shams Elahi - SQA Automation Engineer.pdf` | Older/superseded résumé (states "8+ years" vs. 11+ in the other three; project-level detail not corroborated elsewhere). **Not published** — kept in `data/` as internal reference only. |
| `data/DS-PF.txt`                                                  | Scraped file listing of `github.com/ScarletMcLearn/DataScience/Public` (~330 notebook filenames). Used to identify and classify public notebooks.                                        |
| GitHub API (`gh api`)                                             | `users/ScarletMcLearn`, `users/ScarletMcLearn/repos`, `repos/.../DataScience` tree and commit history, raw notebook content for a sample of shortlisted notebooks.                       |

## Reconciliation decisions

| Inconsistency                                                                                                                                                                                                                                                                                                                          | Resolution                                                                                                                                                                                                                                                                                                                                                                   | Confidence                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Years of experience: "8+" (Portfolio résumé) vs. "11+" (three newer résumés)                                                                                                                                                                                                                                                           | Used **11+ years** site-wide; older résumé treated as superseded and not published.                                                                                                                                                                                                                                                                                          | High                         |
| "Principle Software Development Engineer in Test" (typo)                                                                                                                                                                                                                                                                               | Corrected to **"Principal Software Development Engineer in Test"** — this is an obvious spelling correction, not a factual change.                                                                                                                                                                                                                                           | High                         |
| Employer list and dates (All Generation Tech, AutomatedPros, EWN Bangladesh, Bevy Commerce, Bit Mascot, WeDaeDallas LLC)                                                                                                                                                                                                               | Consistent across all four résumés. Used as-is in the experience timeline.                                                                                                                                                                                                                                                                                                   | High                         |
| Education (BSc Computer Science, Independent University Bangladesh, 2016–2019)                                                                                                                                                                                                                                                         | Consistent across all four résumés.                                                                                                                                                                                                                                                                                                                                          | High                         |
| IELTS 8.0 overall                                                                                                                                                                                                                                                                                                                      | Consistent across all four résumés.                                                                                                                                                                                                                                                                                                                                          | High                         |
| Core metric: "80% faster test cycles"                                                                                                                                                                                                                                                                                                  | Appears in the Software Engineer and Sr SQA Automation Engineer résumés (both newest, mutually consistent). Worded as "up to 80%" / "reported...up to 80%," never as a flat guaranteed figure.                                                                                                                                                                               | Medium                       |
| Core metric: "30% efficiency improvement"                                                                                                                                                                                                                                                                                              | Same two résumés. Worded cautiously ("contributed to," "reported outcomes included").                                                                                                                                                                                                                                                                                        | Medium                       |
| Data Scientist résumé's per-employer achievements (e.g. "45% response relevance improvement" at All Generation Tech, "40% engagement boost" and "98% sentiment accuracy" at AutomatedPros, "25% churn-forecast accuracy increase / 15% churn reduction" at EWN Bangladesh, "99% CNN product-categorization accuracy" at Bevy Commerce) | These figures appear in **only one** of the four résumés and are not corroborated. **Not published as facts.** The experience timeline instead uses generic, qualified language (e.g. "applied ML techniques to internal quality workflows," "explored predictive-analytics techniques for forecasting customer-churn patterns") without asserting the specific percentages. | Low → omitted as stated fact |
| Portfolio résumé's granular per-framework metrics (e.g. "60% flakiness reduction," "70% manual-reporting reduction," "90% infra setup-time reduction")                                                                                                                                                                                 | Single-source, from the superseded résumé. Where a metric aligns with the general "up to 80%" claim from the newer résumés, it is folded into that general, qualified statement in case-study outcomes. Standalone specific percentages not corroborated elsewhere are **not** repeated verbatim.                                                                            | Low → generalized            |
| Phone number (present in all four résumés)                                                                                                                                                                                                                                                                                             | **Excluded from the site entirely**, per explicit instruction, to avoid spam/privacy exposure.                                                                                                                                                                                                                                                                               | N/A — policy exclusion       |
| LinkedIn URL (`linkedin.com/in/SyedElahi`)                                                                                                                                                                                                                                                                                             | Taken from the résumés as supplied. Not independently verified as currently live/accurate — **flagged for the site owner to confirm**.                                                                                                                                                                                                                                       | Medium (self-reported)       |
| Kaggle URL (`kaggle.com/ScarletMcLearn`)                                                                                                                                                                                                                                                                                               | Present in résumés and matches the GitHub profile's public "blog" field (`kaggle.com/scarletmclearn/`), so cross-confirmed by two independent sources.                                                                                                                                                                                                                       | High                         |

## GitHub evidence

**Profile:** `github.com/ScarletMcLearn` — 288 public repositories (confirmed via `gh api users/ScarletMcLearn`).

**Classification approach:** every repo was checked for fork status, description, primary language, and last-push date. The large majority (~270+) are forks of tutorials, conference-talk slides, bootcamp exercises, or other people's coursework — **excluded entirely**, not featured anywhere on the site.

**Repos used as public evidence (non-fork, relevant):**

| Repo                              | Used for                                                           | Confidence                                  |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `Conduict-Automation`             | Software-engineering pillar (automation tooling pattern reference) | Medium                                      |
| `PlaywrightBoilerplateTypescript` | Quality-engineering pillar (Playwright architecture reference)     | Medium                                      |
| `Cypress-Cucumber-Boilerplate`    | Quality-engineering pillar                                         | Medium                                      |
| `Selenium-Behave-Boilerplate`     | Quality-engineering pillar                                         | Medium                                      |
| `django-rest-framework-bookstore` | Software-engineering pillar (backend service pattern)              | Low-medium (very small repo, 8KB)           |
| `AI-Email-Agent`                  | Software-engineering pillar (integration/tooling pattern)          | Medium                                      |
| `DataScience`                     | Data-science & AI pillar (notebook portfolio)                      | Medium — see notebook provenance note below |

**Avatar:** `avatars.githubusercontent.com/u/17823921` was inspected directly and is a stylized painterly portrait rather than a photographic headshot. Per instructions, the site uses an **initials-based monogram ("SSE")** instead of the GitHub avatar.

### Notebook provenance — important finding

Before citing any notebook metrics, a sample of the `DataScience` repository's notebooks was opened
directly (not just filename-inferred). This surfaced a material finding:

- `fraud-prediction-accuracy-97.ipynb` opens with a first-person bio belonging to a different,
  named individual ("Hi there! my name is Ahmad Firman...").
- `bert-text-classification-accuracy-98.ipynb` explicitly states it is "based on the work of"
  another Kaggle author.
- All repository commits are generic `"Add files via upload"` events with no incremental,
  per-notebook authorship signal — consistent with a bulk-uploaded personal collection rather than
  commit-by-commit original authorship.

Given the site's strict no-fabrication rules, **this repository is not presented as a body of
original research**. Per the site owner's explicit direction, the Data Science & AI pillar is
framed throughout as **documented applied-practice / technique-demonstration work** — hands-on
exploration of modeling approaches on public datasets — not novel or fully original research. The
nine notebooks selected for the public portfolio sample were individually spot-checked and show no
third-party attribution in their opening cells; reported accuracy figures are described as
self-reported notebook output, not independently audited results. Both the DS/AI case studies and
the `/data-science-ai` project cards state this framing explicitly and link to the source notebook
for every entry, so a reviewer can verify the claim themselves.

## Claims omitted entirely (insufficient evidence)

- Any specific client, employer, or company names tied to case-study outcomes beyond the résumé's
  own general employer list — case studies use anonymized labels ("Enterprise SaaS platform,"
  "distributed API platform," etc.) instead.
- Testimonials, quotes, or endorsements of any kind — none were supplied, so the testimonials
  section renders nothing (see `src/data/testimonials.ts`).
- Certifications, awards, revenue figures, team sizes, or user counts — none appeared in any
  supplied source document.
- Specific concurrent-user counts for performance testing beyond "several thousand," since the
  only source for an exact number was the single superseded résumé.

## Final wording conventions used site-wide

- "Contributed to..." / "Reported outcomes included..." / "Up to X%" / "Across selected
  engagements..." — used for every quantitative claim.
- No metric is stated as an absolute, guaranteed, or universally repeatable result.
- Data-science/ML notebook results are explicitly labeled as self-reported and not independently
  audited, with a direct source link on every entry.
