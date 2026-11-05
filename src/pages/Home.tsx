import { Suspense, lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import RollButton from '../components/RollButton'
import Reveal from '../components/Reveal'
import SafeBoundary from '../components/SafeBoundary'
import FilterBar, { type Filter } from '../components/FilterBar'
import ProjectCard from '../components/ProjectCard'
import { Badge, Container, H2 } from '../components/SectionHead'
import { matchesFilter, projects } from '../data/projects'
import LogoMarquee from '../components/LogoMarquee'
import { process, services, why } from '../data/content'
import { contactLink } from '../data/inquiry'

const HeroShader = lazy(() => import('../components/HeroShader'))

const start = contactLink({ type: 'general' })

function usePrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Hero() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <SafeBoundary>
            <Suspense fallback={null}>
              <HeroShader />
            </Suspense>
          </SafeBoundary>
        </div>
      )}

      <div className="flex-1" />

      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-5 text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.14em] text-gray-900 sm:mb-8">
          Creative studio for ambitious businesses
        </p>
        <h1 className="hero-title max-w-[14ch] text-gray-900 sm:max-w-[26ch]">
          Design that makes complex ideas clear.
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
          We help startups and growing companies explain their products, bring ideas to life, and
          build memorable brands through explainer videos, motion design, illustration, and digital
          experiences.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
          <RollButton to={start} variant="orange">Start a Project</RollButton>
          <RollButton to="/portfolio" variant="light">Explore Our Work</RollButton>
        </div>
        <p className="mt-8 text-[13px] sm:text-[14px] text-gray-700">
          From the first idea to the final frame, we make every detail count.
        </p>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
      <Container>
        <Reveal>
          <Badge n={1} label="Our approach" />
          <H2 className="mb-6 max-w-4xl">Creative work built around real business goals.</H2>
          <p className="max-w-2xl text-[15px] sm:text-[17px] font-medium leading-[1.6] text-gray-900">
            We partner with teams to turn complex products, ambitious ideas, and business challenges
            into clear, engaging visual experiences.
          </p>
        </Reveal>
      </Container>
      <div className="mt-12 sm:mt-16">
        <LogoMarquee />
      </div>
    </section>
  )
}

function SelectedWork() {
  const [filter, setFilter] = useState<Filter>('all')
  const list = filter === 'all' ? projects : projects.filter((p) => matchesFilter(p, filter))
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <Container>
        <Reveal>
          <Badge n={2} label="Selected work" border="border-gray-300" />
          <h2 className="mb-5 max-w-4xl text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            Good ideas deserve to be understood.
          </h2>
          <p className="mb-8 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
            Explore how we combine strategy, design, illustration, and motion to make products easier
            to understand and brands harder to forget.
          </p>
          <div className="mb-10 sm:mb-12">
            <FilterBar value={filter} onChange={setFilter} />
          </div>
        </Reveal>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 60}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-gray-600">No projects in this category yet.</p>
        )}

        <div className="mt-12">
          <RollButton to="/portfolio" variant="dark">Explore All Projects</RollButton>
        </div>
      </Container>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <Badge n={3} label="Services" />
          <H2 className="mb-12 max-w-4xl sm:mb-16">
            The right creative solution for your next big idea.
          </H2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60} className="bg-white">
              <div className="group h-full p-6 transition-colors duration-500 hover:bg-[#F5F5F5] sm:p-8">
                <h3 className="text-[18px] sm:text-[20px] font-medium tracking-[-0.01em] text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <RollButton to="/pricing" variant="orange">Explore Services & Pricing</RollButton>
        </div>
      </Container>
    </section>
  )
}

function Why() {
  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <Badge n={4} label="Why Candify" border="border-gray-300" />
          <H2 className="mb-12 max-w-4xl sm:mb-16">
            Thoughtful design. Clear communication. Work made for you.
          </H2>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <h3 className="border-t border-gray-900 pt-5 text-[17px] font-medium text-gray-900">
                {w.title}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Process() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <Badge n={5} label="Process" />
          <H2 className="mb-12 max-w-4xl sm:mb-16">A clear process from idea to delivery.</H2>
        </Reveal>
        <ol className="divide-y divide-gray-200 border-y border-gray-200">
          {process.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 40}>
                <div className="grid gap-2 py-6 sm:grid-cols-[120px_220px_1fr] sm:items-baseline sm:gap-6 sm:py-8">
                  <span className="text-[13px] font-semibold text-gray-500">{s.n}</span>
                  <h3 className="text-[20px] sm:text-[24px] font-medium tracking-[-0.01em] text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function PricingTeaser() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <H2 className="mb-5 max-w-4xl">Great creative work starts with the right plan.</H2>
          <p className="mb-8 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-700">
            Whether you need a one-time deliverable or ongoing creative support, we offer project-based
            pricing and monthly retainers to suit different needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <RollButton to="/pricing" variant="dark">Explore Pricing</RollButton>
            <RollButton to={contactLink({ type: 'one-time' })} variant="light">Discuss Your Project</RollButton>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#EFEFEF] py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-4xl text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            Have something worth explaining?
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
            Let's turn your idea into work that people understand, remember, and want to engage with.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <RollButton to={start} variant="orange">Start a Project</RollButton>
            <RollButton to="/portfolio" variant="light">View Our Work</RollButton>
          </div>
          <p className="mt-8 max-w-xl text-[13px] sm:text-[14px] leading-relaxed text-gray-700">
            Tell us what you're building, what you need, and where you want to go. We'll help you figure
            out the next step.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <SelectedWork />
      <Services />
      <Why />
      <Process />
      <PricingTeaser />
      <FinalCta />
    </>
  )
}
