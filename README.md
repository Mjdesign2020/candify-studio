# Candify Studio website

Vite + React 18 + TypeScript + Tailwind CSS 3.4 + react-router. Shader hero via the `shaders` package, icons via `lucide-react`.

> **Status:** the source was written in a sandbox with no npm access, so it has **never been installed, built or run**. Run the checklist below first.

## Run it

```bash
npm install
cp .env.example .env     # then set VITE_FORM_ENDPOINT (see below)
npm run dev              # http://localhost:5173
npm run build            # type-check + production build
```

If `tsc` reports errors on first build, fix them before deploying; none have been checked.

## Contact form setup (required before it can work)

The form posts JSON to the Formspree endpoint `https://formspree.io/f/moejlzda` (set in `src/data/inquiry.ts`, overridable with `VITE_FORM_ENDPOINT`) and shows success **only** on a 2xx response. On any failure it shows the error message and keeps what the visitor typed.

Before launch:
1. In Formspree, confirm `candifystudio@gmail.com` is the receiving inbox and click the one-time confirmation email if it asks.
2. Deploy, send a real test inquiry from the live site, and check that it arrives. This has not been tested yet.
3. Optional: add the live domain to the form's allowed domains in Formspree. If you enable Formspree's reCAPTCHA, this form will need a token added, so check that first.

The site displays `candifystudio@gmail.com` as its public contact address (override with `VITE_CONTACT_EMAIL`). The endpoint URL is public by design. Never put private API keys in frontend code.

## Where to edit content

| What | File |
| --- | --- |
| Portfolio projects (all placeholders now) | `src/data/projects.ts` |
| Approved client names / logos (hidden while empty) | `src/data/trust.ts` |
| Social profile links | `src/data/social.ts` |
| Team members and photos (`public/team/`) | `src/data/team.ts` |
| Prices, retainers, FAQ | `src/data/pricing.ts` |
| Services, process, values copy | `src/data/content.ts` |
| Social links | `src/components/Footer.tsx` (`socials`) |

Social links without a URL are hidden. Trust blocks with no data are hidden.

## Form preselection (URL parameters)

`/contact?service=<id>&plan=<essential|growth|partner>&type=<general|one-time>`

Get Started → `service=retainer&plan=essential`; Choose Growth → `plan=growth`; Discuss Your Needs → `plan=partner`; Tell Us About Your Project → `type=one-time` (service "Something else"); Start a Project → `type=general`.

## Deployment note

This is a single-page app: configure your host to rewrite all paths to `index.html` (Vercel/Netlify do this with a rewrite rule) so `/pricing` and `/portfolio/...` work on refresh.

## Deploying to GitHub Pages (custom domain: candify.in)

- Push to the `main` branch; `.github/workflows/deploy.yml` builds and publishes automatically.
- `public/CNAME` holds the domain. After `vite build`, `scripts/prerender.mjs` writes `dist/<route>/index.html` for every page (so `/pricing/` etc. return HTTP 200, not 404), plus `sitemap.xml`, `robots.txt` and a noindex `404.html`.

## SEO

- Titles, descriptions, canonical URLs and social tags live in `src/data/seo.ts`. Project pages use their entry in `src/data/projects.ts` automatically, and new projects are added to the sitemap on the next build.
- Canonical URLs end in `/` (e.g. `https://candify.in/pricing/`) because GitHub Pages serves each page from a folder.
- Google Search Console: add a **Domain** property for `candify.in` and verify with the DNS TXT record (no code change), or use the HTML tag method by pasting the code into `GOOGLE_SITE_VERIFICATION` in `src/data/seo.ts`. Then submit `sitemap.xml` under Sitemaps.
- Optional: add a 1200×630 share image to `public/` and set `DEFAULT_OG_IMAGE` in `src/data/seo.ts`.
- In the repo: Settings > Pages > Source = "GitHub Actions", Custom domain = `candify.in`, then tick "Enforce HTTPS" once it is available.
