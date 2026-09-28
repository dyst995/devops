# DevOps notes website

Vite + React reader for the study pack (`linux/`, `bash/`, …).

## Local

```bash
cd website
npm install
npm run dev          # http://127.0.0.1:5173 — live notes via /api
```

## GitHub Pages

Repo is [dyst995/devops](https://github.com/dyst995/devops). The site is built as a **project site** at:

**https://dyst995.github.io/devops/**

Push to `master` runs [`.github/workflows/pages.yml`](../.github/workflows/pages.yml): it builds with `BASE_PATH=/devops/` and deploys the static `dist/` (catalog + notes baked into `data/`).

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions
2. Push (or run the workflow manually)

Local production check:

```bash
npm run build:pages
npm run preview:pages
```
