/**
 * PUBLIC contact address shown in the footer, contact page and form error
 * message. Can be overridden with VITE_CONTACT_EMAIL.
 */
export const CONTACT_EMAIL: string = (
  import.meta.env.VITE_CONTACT_EMAIL || 'candifystudio@gmail.com'
).trim()

/**
 * Formspree form endpoint (public by design, not a secret).
 * Can be overridden with VITE_FORM_ENDPOINT, e.g. to point at another form.
 */
export const FORM_ENDPOINT: string = (
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/moejlzda'
).trim()

export const serviceOptions = [
  { id: '2d-explainer', label: '2D Explainer Video' },
  { id: '3d-explainer', label: '3D / Mixed-Media Explainer Video' },
  { id: 'product-video', label: 'Product / Feature Video' },
  { id: 'motion', label: 'Motion Design & Animation' },
  { id: 'illustration', label: 'Illustration & Iconography' },
  { id: 'ux-ui', label: 'UX/UI & Product Design' },
  { id: 'branding', label: 'Branding & Visual Identity' },
  { id: 'web-dev', label: 'Web & App Development' },
  { id: 'retainer', label: 'Monthly Creative Retainer' },
  { id: 'other', label: 'Something else' },
] as const

export type ServiceId = (typeof serviceOptions)[number]['id']

export const retainerOptions = [
  { id: 'essential', label: 'Essential — $1,200/month' },
  { id: 'growth', label: 'Growth — $2,000/month' },
  { id: 'partner', label: 'Creative Partner — $3,500/month' },
] as const

export type RetainerId = (typeof retainerOptions)[number]['id']

export const budgetOptions = [
  'Under $1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000–$10,000',
  '$10,000+',
  'Not sure yet',
]

export type InquiryType = 'general' | 'one-time'

export interface Preselect {
  service?: ServiceId
  plan?: RetainerId
  type?: InquiryType
}

/**
 * Build a /contact link that preselects the form.
 * Selections live in the URL so they survive navigation and reloads.
 */
export function contactLink(p: Preselect = { type: 'general' }): string {
  const q = new URLSearchParams()
  if (p.service) q.set('service', p.service)
  if (p.plan) q.set('plan', p.plan)
  if (p.type) q.set('type', p.type)
  const s = q.toString()
  return s ? `/contact?${s}` : '/contact'
}

export const isServiceId = (v: string | null): v is ServiceId =>
  serviceOptions.some((s) => s.id === v)
export const isRetainerId = (v: string | null): v is RetainerId =>
  retainerOptions.some((s) => s.id === v)
