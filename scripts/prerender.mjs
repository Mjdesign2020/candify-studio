/**
 * Post-build SEO step (runs after `vite build`).
 *
 * GitHub Pages has no SPA rewrites: a deep link like /pricing used to be answered by 404.html
 * with HTTP status 404, so Google would not index it. This writes dist/<route>/index.html for
 * every page in src/data/seo.ts (served with 200), each with its own title, description,
 * canonical, Open Graph and structured data. It also writes sitemap.xml, robots.txt and a
 * noindex 404.html for unknown URLs.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'
import { createServer } from 'vite'

const DIST = 'dist'

// Load the TS data through Vite so import.meta.glob / import.meta.env behave as in the app.
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})
const seo = await vite.ssrLoadModule('/src/data/seo.ts')
await vite.close()

const { SITE_URL, SITE_NAME, GOOGLE_SITE_VERIFICATION, DEFAULT_OG_IMAGE } = seo
const pages = seo.allPages()

// Dev-server asset URLs (/src/assets/work/x-960.webp) -> hashed build files (/assets/x-960-AbC1.webp)
const builtAssets = readdirSync(join(DIST, 'assets'))
function resolveImage(src) {
  if (!src) return ''
  if (!src.startsWith('/src/')) return seo.absoluteUrl(src)
  const { name, ext } = posix.parse(src)
  const hit = builtAssets.find((f) => f.startsWith(`${name}-`) && f.endsWith(ext))
  if (!hit) throw new Error(`prerender: no built asset found for ${src}`)
  return seo.absoluteUrl(`/assets/${hit}`)
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headFor(page) {
  const url = seo.canonicalUrl(page.path)
  const image = page.image ? resolveImage(page.image) : DEFAULT_OG_IMAGE ? seo.absoluteUrl(DEFAULT_OG_IMAGE) : ''
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    page.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    GOOGLE_SITE_VERIFICATION ? `<meta name="google-site-verification" content="${esc(GOOGLE_SITE_VERIFICATION)}" />` : '',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    image ? `<meta property="og:image" content="${image}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    image ? `<meta name="twitter:image" content="${image}" />` : '',
    `<script type="application/ld+json">${JSON.stringify(seo.structuredData()).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
if (!SEO_BLOCK.test(template)) throw new Error('prerender: seo:start/seo:end markers missing in index.html')
const render = (page) => template.replace(SEO_BLOCK, headFor(page))

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const page of pages) {
  const file = page.path === '/' ? join(DIST, 'index.html') : join(DIST, page.path, 'index.html')
  write(file, render(page))
}
write(join(DIST, '404.html'), render(seo.notFoundMeta))

const indexable = pages.filter((p) => !p.noindex)
write(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${seo.canonicalUrl(p.path)}</loc></url>`).join('\n')}
</urlset>
`,
)
write(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`prerender: ${pages.length} pages, 404.html, sitemap.xml (${indexable.length} URLs), robots.txt`)
