import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import RollButton from '../components/RollButton'
import Reveal from '../components/Reveal'
import { Container } from '../components/SectionHead'
import { getProject, projects, type Media, type Project } from '../data/projects'
import { contactLink } from '../data/inquiry'

function MediaBlock({ m, className = '' }: { m: Media; className?: string }) {
  return m.type === 'video' ? (
    <video
      src={m.src}
      poster={m.poster}
      aria-label={m.alt}
      controls
      muted
      playsInline
      preload="metadata"
      className={`w-full rounded-2xl bg-black ${className}`}
    />
  ) : (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={m.srcSet ? '(min-width: 1280px) 1200px, 100vw' : undefined}
      alt={m.alt}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-2xl object-cover ${className}`}
    />
  )
}

const YT_ORIGIN = 'https://www.youtube-nocookie.com'

/**
 * Auto-playing YouTube player with full controls (pause, seek, volume, fullscreen).
 *
 * Sound: browsers only allow autoplay WITH sound after the visitor has interacted
 * with the site. Arriving from a card click counts, so we start unmuted. On a
 * direct visit (or if the browser still blocks it, e.g. Safari) we fall back to
 * muted autoplay — the visitor can unmute from the player controls.
 */
function YouTubePlayer({ project, videoId }: { project: Project; videoId: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)
  const poster = project.media?.type === 'image' ? project.media : undefined

  const [startMuted] = useState(() => {
    const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
    return !ua?.hasBeenActive
  })

  const send = (func: string) =>
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), YT_ORIGIN)

  // If unmuted autoplay was blocked, retry muted so the video still starts on its own.
  useEffect(() => {
    if (startMuted) return
    let started = false
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || e.source !== frame.current?.contentWindow) return
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        const s = d.event === 'onStateChange' ? d.info : d.info?.playerState
        if (s === 1 || s === 3) started = true // playing / buffering
      } catch {
        /* ignore non-JSON messages */
      }
    }
    window.addEventListener('message', onMessage)
    const t = window.setTimeout(() => {
      if (!started) {
        send('mute')
        send('playVideo')
      }
    }, 3500)
    return () => {
      window.removeEventListener('message', onMessage)
      window.clearTimeout(t)
    }
  }, [startMuted, videoId])

  const params = new URLSearchParams({
    autoplay: '1',
    mute: startMuted ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    origin: window.location.origin,
  })

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black">
      {poster && (
        <img
          src={poster.src}
          srcSet={poster.srcSet}
          sizes="(min-width: 1280px) 1200px, 100vw"
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <iframe
        ref={frame}
        src={`${YT_ORIGIN}/embed/${videoId}?${params}`}
        title={`${project.title} — video`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => {
          setLoaded(true)
          frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: videoId, channel: 'widget' }), YT_ORIGIN)
        }}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-gray-200 py-10 sm:grid-cols-[220px_1fr] sm:gap-10 sm:py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
          {n}. {title}
        </h2>
        <div className="text-[15px] sm:text-[17px] leading-[1.65] text-gray-900">{children}</div>
      </section>
    </Reveal>
  )
}

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  if (!project) {
    return (
      <section className="pb-24 pt-40">
        <Container>
          <h1 className="hero-title hero-title--long text-gray-900">Project not found</h1>
          <p className="mt-4 text-gray-600">We couldn't find that project.</p>
          <div className="mt-8">
            <RollButton to="/portfolio" variant="dark">Back to Portfolio</RollButton>
          </div>
        </Container>
      </section>
    )
  }

  const shared = (p: Project) => p.categories.filter((c) => project.categories.includes(c)).length
  const related = projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, 2)

  // Only render sections that have real content; number them in order.
  const blocks: { title: string; body: React.ReactNode }[] = []
  if (project.overview) blocks.push({ title: 'Project overview', body: project.overview })
  if (project.challenge) blocks.push({ title: 'The challenge', body: project.challenge })
  if (project.approach) blocks.push({ title: 'Creative approach', body: project.approach })
  if (project.frames?.length)
    blocks.push({
      title: 'Process & design frames',
      body: (
        <div className="grid gap-4 sm:grid-cols-2">
          {project.frames.map((f) => (
            <MediaBlock key={f.src} m={f} />
          ))}
        </div>
      ),
    })
  if (project.deliverables?.length)
    blocks.push({
      title: 'Final deliverables',
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {project.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    })
  if (project.showcase) blocks.push({ title: 'Final showcase', body: <MediaBlock m={project.showcase} /> })

  return (
    <article className="bg-white pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28">
      <Container>
        <Link
          to="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>

        {project.isPlaceholder && (
          <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
            Placeholder page — this is not a real project. Replace the content in{' '}
            <code>src/data/projects.ts</code> with approved details and assets.
          </p>
        )}

        <header>
          <p className="mb-4 text-[13px] text-gray-500">
            {[...project.tags, project.year].filter(Boolean).join(' · ')}
          </p>
          <h1 className="hero-title max-w-5xl text-gray-900">{project.title}</h1>
          {project.client && (
            <p className="mt-6 text-[14px] text-gray-500">
              Brand: <span className="font-medium text-gray-900">{project.client}</span>
            </p>
          )}
          <p className="mt-3 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
            {project.description}
          </p>
          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-gray-700"
                >
                  {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </header>

        <div className="mt-10">
          {project.youtubeId ? (
            <YouTubePlayer project={project} videoId={project.youtubeId} />
          ) : (
            project.media && <MediaBlock m={project.media} className="aspect-[4/3] sm:aspect-[16/9]" />
          )}
        </div>

        {blocks.length > 0 && (
          <div className="mt-12 sm:mt-16">
            {blocks.map((b, i) => (
              <Block key={b.title} n={i + 1} title={b.title}>
                {b.body}
              </Block>
            ))}
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-12" aria-labelledby="related">
            <h2 id="related" className="mb-8 text-[24px] sm:text-[32px] font-medium tracking-[-0.02em] text-gray-900">
              Related projects
            </h2>
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i + 1} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-2xl bg-[#EFEFEF] p-8 sm:p-12">
          <h2 className="max-w-2xl text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            Have a similar project in mind?
          </h2>
          <div className="mt-6">
            <RollButton to={contactLink({ type: 'general' })} variant="orange">Start a Project</RollButton>
          </div>
        </section>
      </Container>
    </article>
  )
}
