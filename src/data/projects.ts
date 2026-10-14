export type CategoryId =
  | 'explainer'
  | 'motion'
  | 'illustration'
  | 'ux-ui'
  | 'branding'
  | 'web-dev'

export const categoryFilters: { id: 'all' | CategoryId; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'explainer', label: 'Explainer Videos' },
  { id: 'motion', label: 'Motion Design' },
  { id: 'illustration', label: 'Illustration & Iconography' },
  { id: 'ux-ui', label: 'UX/UI & Product Design' },
  { id: 'branding', label: 'Branding & Visual Identity' },
  { id: 'web-dev', label: 'Web & App Development' },
]

export const categoryLabel = (id: CategoryId) =>
  categoryFilters.find((c) => c.id === id)?.label ?? id

export interface Media {
  type: 'image' | 'video'
  src: string
  poster?: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  /** Only set when the client has approved being named. */
  client?: string
  category: CategoryId
  /** Only set when confirmed. */
  year?: number
  description: string
  overview: string
  challenge: string
  approach: string
  deliverables: string[]
  /** Card preview. Leave undefined until a real asset is available. */
  media?: Media
  /** Process / design frames for the case study. */
  frames?: Media[]
  /** Final video or project showcase for the case study. */
  showcase?: Media
  /**
   * TRUE = layout placeholder with no real project behind it.
   * The UI labels these clearly. Set to false only when every field above
   * contains verified, approved content and real assets.
   */
  isPlaceholder: boolean
}

const todo = 'Add verified project details here in src/data/projects.ts.'

/**
 * ============================ EDIT ME ============================
 * Everything below is a PLACEHOLDER so the layout can be reviewed.
 * No real client, result or metric is implied. Replace each entry with
 * an approved project (and set isPlaceholder: false), or delete it.
 * =================================================================
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-explainer-video',
    title: 'Explainer Video Project',
    category: 'explainer',
    description: 'Placeholder entry. Replace with an approved explainer video project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
  {
    slug: 'placeholder-motion-design',
    title: 'Motion Design Project',
    category: 'motion',
    description: 'Placeholder entry. Replace with an approved motion design project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
  {
    slug: 'placeholder-illustration',
    title: 'Illustration & Icon Project',
    category: 'illustration',
    description: 'Placeholder entry. Replace with an approved illustration or icon project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
  {
    slug: 'placeholder-ux-ui',
    title: 'UX/UI Project',
    category: 'ux-ui',
    description: 'Placeholder entry. Replace with an approved UX/UI or product design project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
  {
    slug: 'placeholder-branding',
    title: 'Brand Identity Project',
    category: 'branding',
    description: 'Placeholder entry. Replace with an approved branding project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
  {
    slug: 'placeholder-web-dev',
    title: 'Web Development Project',
    category: 'web-dev',
    description: 'Placeholder entry. Replace with an approved web or app development project.',
    overview: todo,
    challenge: todo,
    approach: todo,
    deliverables: ['To be confirmed'],
    isPlaceholder: true,
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
