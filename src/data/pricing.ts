import type { ServiceId } from './inquiry'

export interface PriceItem {
  name: string
  price: string
}
export interface PriceCategory {
  id: string
  title: string
  description: string
  items: PriceItem[]
  /** Service preselected in the contact form. */
  service: ServiceId
}

export const priceCategories: PriceCategory[] = [
  {
    id: 'explainer',
    title: 'Explainer Videos',
    description: 'Turn complex products, services, and ideas into clear visual stories.',
    service: '2d-explainer',
    items: [
      { name: '2D Explainer Videos', price: 'From $1,800 / 60 sec' },
      { name: '3D & Mixed-Media Explainer Videos', price: 'From $3,500 / 60 sec' },
      { name: 'Short Product / Feature Videos', price: 'From $600' },
    ],
  },
  {
    id: 'motion',
    title: 'Motion Design & Animation Systems',
    description: 'Give your brand, product, and digital experiences movement with purpose.',
    service: 'motion',
    items: [
      { name: 'Logo & Brand Animation', price: 'From $750' },
      { name: 'UI / Product Motion', price: 'From $1,200' },
      { name: '3D Motion Design', price: 'From $1,500' },
      { name: 'Motion Design System', price: 'From $2,500' },
    ],
  },
  {
    id: 'illustration',
    title: 'Illustration & Iconography',
    description:
      'Create a distinctive visual language with original illustrations and custom icon systems.',
    service: 'illustration',
    items: [
      { name: 'Custom Illustrations', price: 'From $150 each' },
      { name: 'Custom Icon Set', price: 'From $500 / 10 icons' },
      { name: '3D-Style Icon Set', price: 'From $750 / 10 icons' },
      { name: 'Illustration System', price: 'From $1,500' },
    ],
  },
  {
    id: 'ux-ui',
    title: 'UX/UI & Product Design',
    description: 'Design clearer, more intuitive digital experiences for your customers.',
    service: 'ux-ui',
    items: [
      { name: 'Landing Page Design', price: 'From $1,000' },
      { name: 'Website UX/UI Design', price: 'From $1,500' },
      { name: 'SaaS / Mobile App MVP Design', price: 'From $3,500' },
      { name: 'Design System', price: 'From $2,000' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Visual Identity',
    description: 'Build a consistent visual identity that helps your business stand out.',
    service: 'branding',
    items: [
      { name: 'Logo Design', price: 'From $500' },
      { name: 'Brand Identity', price: 'From $1,200' },
      { name: 'Brand Guidelines', price: 'From $750' },
      { name: 'Packaging Design', price: 'From $800' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web & App Development',
    description: 'Bring your digital product to life with development scoped to your requirements.',
    service: 'web-dev',
    items: [
      { name: 'Landing Page Development', price: 'From $2,500' },
      { name: 'Business Website', price: 'From $3,500' },
      { name: 'MVP / Web App Development', price: 'From $6,000' },
      { name: 'Mobile App Development', price: 'Custom Quote' },
    ],
  },
]

export const priceNote =
  'All prices are starting estimates. Final pricing depends on project scope, complexity, deliverables, and timeline.'

export interface Plan {
  id: 'essential' | 'growth' | 'partner'
  name: string
  price: string
  label?: string
  blurb: string
  features: string[]
  cta: string
}

export const plans: Plan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '$1,200/month',
    blurb: 'For startups that need consistent creative support.',
    features: [
      'Illustrations, icons, and marketing graphics',
      'Small motion graphics and social creatives',
      'One active task at a time',
      'Unlimited revisions within the agreed task scope',
      'Typical first draft in 2–4 business days',
      'Standard task priority',
    ],
    cta: 'Get Started',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$2,000/month',
    label: 'Recommended',
    blurb: 'For growing companies that need ongoing creative and product design.',
    features: [
      'Everything in Essential',
      'UX/UI and landing page design',
      'More involved illustration and motion design',
      'Priority task scheduling',
      'Unlimited revisions within the agreed task scope',
      'Typical first draft in 1–3 business days',
      'Weekly progress updates',
    ],
    cta: 'Choose Growth',
  },
  {
    id: 'partner',
    name: 'Creative Partner',
    price: '$3,500/month',
    blurb: 'For established teams requiring broader creative support.',
    features: [
      'Everything in Growth',
      'Branding, animation, illustration, and UX/UI support',
      'Planned weekly capacity and delivery milestones',
      'Priority access to the creative team',
      'Campaign and product launch support',
      'Unlimited revisions within the agreed task scope',
      'Customized monthly creative roadmap',
    ],
    cta: 'Discuss Your Needs',
  },
]

export const planDisclaimer =
  'Monthly plans provide defined creative capacity, not unlimited production. Turnaround times depend on task complexity and queue availability. New deliverables, major scope changes, development-heavy projects, and third-party expenses may require a separate quote.'

export const faqs = [
  {
    q: 'Are these fixed prices?',
    a: "These are starting estimates. We'll confirm your exact scope, deliverables, timeline, and final price before work begins.",
  },
  {
    q: 'Can I request a custom package?',
    a: "Yes. If your project combines several services or doesn't fit a listed package, we'll recommend a custom scope.",
  },
  {
    q: 'How do monthly retainers work?',
    a: 'Each plan provides defined creative capacity and a workflow suited to the selected tier. Work is prioritized and delivered according to task complexity, scope, and availability.',
  },
  {
    q: 'Do monthly plans include unlimited design output?',
    a: 'No. Plans provide defined creative capacity, not unlimited production. Revisions are unlimited only within the agreed task scope.',
  },
  {
    q: 'What if I only need one deliverable?',
    a: 'Choose project-based pricing or contact us for a quote tailored to your specific needs.',
  },
  {
    q: 'How do we get started?',
    a: "Send us a brief through the contact form. We'll review your needs and respond with recommended next steps.",
  },
]
