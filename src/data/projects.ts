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
  /** Responsive candidates for `type: 'image'` (e.g. "a.webp 640w, b.webp 960w"). */
  srcSet?: string
  poster?: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  /** Only set when the client has approved being named. */
  client?: string
  /** Filter tabs this project appears under. The first one is the primary category. */
  categories: CategoryId[]
  /** Disciplines / industry shown under the card, e.g. "2D Explainer Video · Motion Graphics". */
  tags: string[]
  /** Only set when confirmed. */
  year?: number
  description: string
  overview?: string
  challenge?: string
  approach?: string
  deliverables?: string[]
  /** Card thumbnail (4:3). */
  media?: Media
  /** YouTube video id — previews on hover (desktop) / in view (touch), plays on the case study. */
  youtubeId?: string
  /**
   * Optional self-hosted preview clip for the card (e.g. a 6–10 s, 720p, muted MP4 under ~1 MB in
   * /public/previews). Starts in ~200 ms vs ~2 s+ for a YouTube player, so it's preferred when set.
   */
  previewSrc?: string
  /** External destination shown on the case study (live site, Behance, …). */
  link?: { url: string; label: string }
  /** Process / design frames for the case study. */
  frames?: Media[]
  /** Final video or project showcase for the case study. */
  showcase?: Media
  /** TRUE = layout placeholder with no real project behind it. The UI labels these clearly. */
  isPlaceholder: boolean
}

export const matchesFilter = (p: Project, filter: 'all' | CategoryId) =>
  filter === 'all' || p.categories.includes(filter)

/* Optimised thumbnails generated from src/AllWorkThumbnail/*.png (1600×1200 → WebP 640/960/1440). */
const thumbFiles = import.meta.glob('../assets/work/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const thumbWidths = [640, 960, 1440] as const

function thumb(name: string, alt: string): Media {
  const url = (w: number) => thumbFiles[`../assets/work/${name}-${w}.webp`]
  return {
    type: 'image',
    src: url(960),
    srcSet: thumbWidths.map((w) => `${url(w)} ${w}w`).join(', '),
    alt,
  }
}

export const projects: Project[] = [
  {
    slug: 'beephire-ai-recruitment-explainer',
    title: 'Beephire – AI-Powered Recruitment Explainer',
    client: 'Beephire',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Motion Graphics', 'AI & HR Tech'],
    description:
      "An engaging 2D explainer video introducing Beephire's AI-powered recruitment platform, highlighting how intelligent candidate sourcing, automated screening, and AI-led interviews help businesses streamline hiring and find the right talent faster.",
    media: thumb('beephire', 'Beephire logo — 2D explainer video'),
    youtubeId: 'B_XdPvF_FgI',
    isPlaceholder: false,
  },
  {
    slug: 'beato-diabetes-care-explainer',
    title: 'BeatO – Diabetes Care Explainer Video',
    client: 'BeatO',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Motion Graphics', 'HealthTech'],
    description:
      "A creative explainer video introducing BeatO's digital diabetes care ecosystem, showcasing how connected glucose monitoring devices, smart technology, and personalised health support make managing diabetes simpler and more accessible.",
    media: thumb('beato', 'BeatO logo — 2D explainer video'),
    youtubeId: '9cOqqZR40p0',
    isPlaceholder: false,
  },
  {
    slug: 'national-ms-society-explainer',
    title: 'National MS Society – 2D Explainer Video',
    client: 'National MS Society',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Motion Graphics', 'Healthcare & Nonprofit'],
    description:
      "A thoughtfully crafted 2D explainer video highlighting the National MS Society's mission to support people affected by multiple sclerosis, advance groundbreaking research, and bring the community closer to a world free of MS.",
    media: thumb('ms-society', 'National MS Society logo — 2D explainer video'),
    youtubeId: 'szGHt3jKUxI',
    isPlaceholder: false,
  },
  {
    slug: 'ninzarin-brand-explainer-3d-motion',
    title: 'Ninzarin – Brand Explainer',
    client: 'Ninzarin',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Branding', 'HR Tech'],
    description:
      "A creative video project bringing Ninzarin's skills-first workforce vision to life through engaging 2D storytelling and immersive 3D motion graphics, showcasing how AI, human intelligence, and skills-based solutions are transforming the future of talent and workforce development.",
    media: thumb('ninzarin', 'Ninzarin logo — brand explainer and 3D motion video'),
    youtubeId: 'm-bE7OImDLk',
    isPlaceholder: false,
  },
  {
    slug: 'ninzarin-3d-motion-video',
    title: 'Ninzarin – Brand Explainer & 3D Motion Video',
    client: 'Ninzarin',
    categories: ['motion'],
    tags: ['2D Explainer Video', '3D Motion Graphics', 'Branding', 'HR Tech'],
    description:
      "A creative video project bringing Ninzarin's skills-first workforce vision to life through engaging 2D storytelling and immersive 3D motion graphics, showcasing how AI, human intelligence, and skills-based solutions are transforming the future of talent and workforce development.",
    // TODO: swap for a dedicated 3D thumbnail — this one is labelled "2D Explainer Video".
    media: thumb('ninzarin', 'Ninzarin logo — 3D motion video'),
    link: {
      url: 'https://www.behance.net/gallery/233562279/Ninzarin-3D-Explainer-Video-%28Spec-Project%29',
      label: 'Watch on Behance',
    },
    isPlaceholder: false,
  },
  {
    slug: 'prophetshares-explainer',
    title: 'ProphetShares – Explainer Video',
    client: 'ProphetShares',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Motion Graphics', 'SportsTech', 'FinTech'],
    description:
      'An engaging explainer video introducing ProphetShares, a free-to-play prediction and competition platform where users test their knowledge, explore prediction markets, build athlete portfolios, and compete for rewards through skill-based gameplay.',
    media: thumb('prophetshares', 'ProphetShares logo — explainer video'),
    youtubeId: '4XZ_KX4nP3I',
    isPlaceholder: false,
  },
  {
    slug: 'vyrgon-mma-platform-website',
    title: 'VYRGON – MMA Platform Website Design & Development',
    client: 'VYRGON',
    categories: ['ux-ui', 'web-dev'],
    tags: ['UI/UX Design', 'Website Design', 'Web Development', 'SportsTech'],
    description:
      'Designed and developed a modern digital experience for VYRGON, an MMA-focused platform built to connect fighters, fans, academies, and supporters through athlete discovery, fight events, and the growing combat sports community.',
    media: thumb('vyrgon', 'VYRGON logo — UX/UI and product design'),
    link: { url: 'https://vyrgon.com/', label: 'Visit live website' },
    isPlaceholder: false,
  },
  {
    slug: 'sorbet-explainer',
    title: 'Sorbet – 2D Explainer Video',
    client: 'Sorbet',
    categories: ['explainer'],
    tags: ['2D Explainer Video', 'Motion Graphics', 'Fintech'],
    description:
      'A dynamic 2D explainer video showcasing how Sorbet simplifies global payments, cross-border transactions, and international money management for businesses and freelancers.',
    media: thumb('sorbet', 'Sorbet logo — 2D explainer video'),
    // TODO: this is the same video id as Beephire — replace with Sorbet's own YouTube id.
    youtubeId: 'B_XdPvF_FgI',
    isPlaceholder: false,
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
