import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import RollButton from '../components/RollButton'
import Reveal from '../components/Reveal'
import { Container } from '../components/SectionHead'
import { categoryLabel, getProject, projects, type Media } from '../data/projects'
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
    <img src={m.src} alt={m.alt} loading="lazy" className={`w-full rounded-2xl object-cover ${className}`} />
  )
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
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

  const related = projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 2)

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

        {/* 1. Title and summary */}
        <header>
          <p className="mb-4 text-[13px] text-gray-500">
            {[categoryLabel(project.category), project.client, project.year].filter(Boolean).join(' · ')}
          </p>
          <h1 className="hero-title max-w-5xl text-gray-900">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
            {project.description}
          </p>
        </header>

        {project.media && (
          <div className="mt-10">
            <MediaBlock m={project.media} className="aspect-[16/9]" />
          </div>
        )}

        <div className="mt-12 sm:mt-16">
          <Block n="1" title="Project overview">{project.overview}</Block>
          <Block n="2" title="The challenge">{project.challenge}</Block>
          <Block n="3" title="Creative approach">{project.approach}</Block>

          <Block n="4" title="Process & design frames">
            {project.frames && project.frames.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.frames.map((f) => (
                  <MediaBlock key={f.src} m={f} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Process frames to be added.</p>
            )}
          </Block>

          <Block n="5" title="Final deliverables">
            <ul className="list-disc space-y-1 pl-5">
              {project.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Block>

          <Block n="6" title="Final showcase">
            {project.showcase ? (
              <MediaBlock m={project.showcase} />
            ) : (
              <p className="text-gray-500">Final video or project showcase to be added.</p>
            )}
          </Block>
        </div>

        {/* Related projects */}
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

        {/* CTA */}
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
