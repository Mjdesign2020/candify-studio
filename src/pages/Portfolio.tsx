import { useState } from 'react'
import FilterBar, { type Filter } from '../components/FilterBar'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { Container } from '../components/SectionHead'
import { projects } from '../data/projects'

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all')
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="bg-[#F5F5F5] pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
      <Container>
        <Reveal>
          <h1 className="hero-title mb-6 max-w-5xl text-gray-900">
            Work that makes ideas come to life.
          </h1>
          <p className="mb-8 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
            From product explainers to brand identities, we create purposeful visual experiences
            designed around the problem, the audience, and the message.
          </p>
          <div className="mb-10 sm:mb-14">
            <FilterBar value={filter} onChange={setFilter} />
          </div>
        </Reveal>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {list.length} {list.length === 1 ? 'project' : 'projects'}
        </p>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
            {list.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-gray-600">No projects in this category yet.</p>
        )}
      </Container>
    </section>
  )
}
