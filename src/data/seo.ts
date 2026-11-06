import { projects, type Project } from './projects'
import { activeSocials } from './social'
import { CONTACT_EMAIL } from './inquiry'

/**
 * Single source of truth for search/social metadata. Used in the browser (src/components/Seo.tsx)
 * and at build time (scripts/prerender.mjs), which writes one static HTML file per route plus
 * sitemap.xml and robots.txt.
 */

/** Live origin, no trailing slash. Must match public/CNAME. */
export const SITE_URL = 'https://candify.in'
export const SITE_NAME = 'Candify Studio'

/**
 * Google Search Console "HTML tag" verification code (only the content value).
 * Leave empty if you verify with a DNS record (recommended for a Domain property on candify.in).
 */
export const GOOGLE_SITE_VERIFICATION = ''

/**
 * Social share image, 1200×630, served from /public. Leave empty until the file exists: a broken
 * og:image is worse than none. Project pages use their own thumbnail regardless.
 */
export const DEFAULT_OG_IMAGE = ''

export interface PageMeta {
  /** Route path without trailing slash, e.g. "/portfolio/sorbet-explainer" ("/" for home). */
  path: string
  title: string
  description: string
  /** Absolute or root-relative image URL. */
  image?: string
  noindex?: boolean
}

const MAX_DESCRIPTION = 160

/** Trim to a search-snippet-friendly length on a word boundary. */
export function clampDescription(text: string, max = MAX_DESCRIPTION) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–-]+$/, '')}…`
}

/** Canonical URL. Inner pages end in "/" because GitHub Pages serves them as folder/index.html. */
export function canonicalUrl(path: string) {
  const p = path.replace(/\/+$/, '')
  return p === '' ? `${SITE_URL}/` : `${SITE_URL}${p}/`
}

export function absoluteUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

const staticPages: PageMeta[] = [
  {
    path: '/',
    title: 'Candify Studio | Explainer Videos, Motion Design & Branding Studio',
    description:
      'Candify Studio is an independent creative studio for explainer videos, motion design, illustration, UX/UI, branding and web development for startups and growing companies.',
  },
  {
    path: '/portfolio',
    title: 'Portfolio | Explainer Videos, Motion & UX/UI Work | Candify Studio',
    description:
      'Explore Candify Studio’s work: 2D and 3D explainer videos, motion graphics, illustration, UX/UI and web projects for tech, health and fintech brands.',
  },
  {
    path: '/pricing',
    title: 'Pricing & Creative Retainers | Candify Studio',
    description:
      'Transparent pricing for explainer videos, motion design and branding, plus monthly creative retainers for teams that need ongoing design support.',
  },
  {
    path: '/about',
    title: 'About Us | Candify Studio',
    description:
      'Meet Candify Studio, an independent team of designers, animators and developers who turn complex ideas into clear, memorable visual stories.',
  },
  {
    path: '/contact',
    title: 'Contact | Start a Project with Candify Studio',
    description:
      'Tell us about your explainer video, motion design, branding or web project. Get in touch with Candify Studio and we’ll reply with next steps.',
  },
]

export function projectMeta(p: Project): PageMeta {
  return {
    path: `/portfolio/${p.slug}`,
    title: `${p.title} | ${SITE_NAME}`,
    description: clampDescription(p.description),
    image: p.media?.src,
    noindex: p.isPlaceholder,
  }
}

/** Every indexable route, for the prerender step and sitemap. */
export function allPages(): PageMeta[] {
  return [...staticPages, ...projects.map(projectMeta)]
}

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: `Page not found | ${SITE_NAME}`,
  description: 'The page you’re looking for doesn’t exist.',
  noindex: true,
}

/** Metadata for the current browser path. Unknown paths get the noindex 404 meta. */
export function metaForPath(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/'
  return allPages().find((p) => p.path === path) ?? { ...notFoundMeta, path }
}

/** schema.org Organization + WebSite, emitted on every page. */
export function structuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.svg`,
      email: CONTACT_EMAIL,
      sameAs: activeSocials.map((s) => s.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  ]
}
