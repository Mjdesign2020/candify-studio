import Reveal from '../components/Reveal'
import RollButton from '../components/RollButton'
import { Container } from '../components/SectionHead'
import { services, values } from '../data/content'
import { contactLink } from '../data/inquiry'
import { team } from '../data/team'
import TeamCard from '../components/TeamCard'
import LogoMarquee from '../components/LogoMarquee'

export default function About() {
  return (
    <>
      <section className="bg-white pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-28">
        <Container>
          <Reveal>
            <h1 className="hero-title hero-title--long max-w-5xl text-gray-900">
              We make ideas easier to understand—and experiences harder to forget.
            </h1>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
              <p>
                Candify is an independent creative studio helping businesses communicate clearly
                through design, motion, illustration, and digital experiences.
              </p>
              <p>
                We bring strategy and craft together to make complex products easier to understand,
                brands more recognizable, and digital experiences more engaging.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-28" aria-label="Our story">
        <Container>
          <Reveal>
            <div className="grid gap-12 border-t border-gray-200 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div className="max-w-2xl space-y-5 text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
                <p>
                  Founded in 2020, Candify Studio is a creative design and development studio helping
                  startups and growing brands build memorable brands, websites, and digital experiences.
                </p>
                <p>
                  With 50+ projects delivered, 15+ brands served, and a team of designers and developers
                  with 6+ years of experience, we combine creativity, strategy, and technology to create
                  work that is both visually engaging and results-driven. From brand identity and UI/UX
                  to illustrations, motion, and development, we partner with ambitious businesses to turn
                  ideas into impactful digital experiences.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
                {[
                  { value: '2020', label: 'Year founded' },
                  { value: '50+', label: 'Projects delivered' },
                  { value: '15+', label: 'Brands served' },
                  { value: '6+', label: 'Years of team experience' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-[13px] sm:text-[14px] text-gray-600">{s.label}</dt>
                    <dd className="text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.03em] text-gray-900">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-gray-200 bg-white py-12 sm:py-16" aria-label="Brands we’ve worked with">
        <LogoMarquee />
      </section>

      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-28" aria-label="Our values">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 60}>
                <h2 className="border-t border-gray-900 pt-5 text-[20px] sm:text-[24px] font-medium tracking-[-0.01em] text-gray-900">
                  {v.title}
                </h2>
                <p className="mt-3 max-w-md text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {team.length > 0 && (
        <section className="bg-white py-16 sm:py-20 lg:py-28" aria-labelledby="team">
          <Container>
            <Reveal>
              <h2
                id="team"
                className="mb-10 text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-[-0.02em] text-gray-900"
              >
                Meet the team
              </h2>
            </Reveal>
            {/* One column, top to bottom, in the order listed in src/data/team.ts */}
            <ul className="divide-y divide-gray-200 border-b border-gray-200">
              {team.map((m) => (
                <li key={m.name} className="py-10 first:pt-0 sm:py-12 sm:first:pt-0 last:pb-0">
                  <Reveal>
                    <TeamCard m={m} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-28" aria-labelledby="about-services">
        <Container>
          <Reveal>
            <h2 id="about-services" className="mb-8 text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-[-0.02em] text-gray-900">
              Services
            </h2>
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.title} className="rounded-full border border-gray-300 px-5 py-2 text-[14px] text-gray-900">
                  {s.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#EFEFEF] py-20 sm:py-24 lg:py-32">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
              Have a challenge we can help solve?
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
              Tell us about your product, your goals, or the idea you're ready to bring to life.
            </p>
            <div className="mt-8">
              <RollButton to={contactLink({ type: 'general' })} variant="orange">Start a Project</RollButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
