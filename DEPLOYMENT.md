# Deployment Guide

This site builds to fully static files (`dist/`) with no server, database, or paid service
requirement. It can be hosted anywhere that serves static files.

## Primary target: GitHub Pages

The repository already includes `.github/workflows/deploy.yml`, which builds the site and deploys
it to GitHub Pages automatically on every push to `main`. The workflow uses
[`prefix-dev/setup-pixi`](https://github.com/prefix-dev/setup-pixi) to install the exact pinned
Node.js/pnpm toolchain from `pixi.toml`/`pixi.lock` before running `pixi run build` — no
`actions/setup-node` step is needed.

### One-time setup

1. Push this repository to GitHub (e.g. `github.com/ScarletMcLearn/Portfolio`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually from the **Actions** tab).
5. The site will be published at `https://<username>.github.io/<repo-name>` — for example,
   `https://scarletmclearn.github.io/Portfolio`.

### Repository subpath handling

GitHub Pages project sites (as opposed to a `<username>.github.io` root repo) are served under a
subpath (`/Portfolio` in this case). `astro.config.mjs` reads this from the `SITE_BASE` environment
variable (defaulting to `/Portfolio`), and the deploy workflow sets it explicitly:

```yaml
env:
  SITE_URL: https://scarletmclearn.github.io
  SITE_BASE: /Portfolio
```

If you rename the repository, or deploy to a root `username.github.io` repository instead, update
both `SITE_BASE` (to `/` for a root repo) and `SITE_URL` in `.github/workflows/deploy.yml` and
`.github/workflows/ci.yml`, and update `public/robots.txt`'s sitemap URL to match.

### Custom domain (optional)

To use a custom domain with GitHub Pages:

1. Add a `public/CNAME` file containing your domain (e.g. `example.com`).
2. Set `SITE_BASE=/` and `SITE_URL=https://example.com` in the deploy workflow.
3. Configure your DNS provider per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Alternative: Netlify

Netlify, Vercel, and Cloudflare Pages don't run `pixi` by default, so point their build command at
pnpm directly (their build images already provide a compatible Node.js) or install pixi as part of
the build command — either works since `pixi.toml` only pins the toolchain, not app behavior.

1. Connect the repository in the Netlify dashboard.
2. Build command: `pnpm install --frozen-lockfile && pnpm build`
3. Publish directory: `dist`
4. Environment variables: `SITE_URL=https://your-site.netlify.app`, `SITE_BASE=/`

## Alternative: Vercel

1. Import the repository in the Vercel dashboard.
2. Framework preset: **Astro** (auto-detected).
3. Build command: `pnpm install --frozen-lockfile && pnpm build` — output directory `dist` (auto-detected).
4. Environment variables: `SITE_URL=https://your-project.vercel.app`, `SITE_BASE=/`

## Alternative: Cloudflare Pages

1. Connect the repository in the Cloudflare Pages dashboard.
2. Build command: `pnpm install --frozen-lockfile && pnpm build`
3. Build output directory: `dist`
4. Environment variables: `SITE_URL=https://your-project.pages.dev`, `SITE_BASE=/`

## Local build & preview

```bash
SITE_URL=https://scarletmclearn.github.io SITE_BASE=/Portfolio pixi run build
pixi run preview
```

Visit `http://localhost:4321/Portfolio` (or `http://localhost:4321` if you built with
`SITE_BASE=/`) to verify the production build before deploying.

## `SITE_URL` environment variable

`SITE_URL` controls canonical URLs, the sitemap, and Open Graph/Twitter card metadata. It should
always be the fully-qualified origin the site will be served from (no trailing slash), e.g.
`https://scarletmclearn.github.io`. See `.env.example` for local overrides.
