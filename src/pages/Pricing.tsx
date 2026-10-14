import Faq from '../components/Faq'
import { CategoryCard, PlanCard } from '../components/PricingBlocks'
import Reveal from '../components/Reveal'
import RollButton from '../components/RollButton'
import { Container } from '../components/SectionHead'
import { faqs, planDisclaimer, plans, priceCategories, priceNote } from '../data/pricing'
import { contactLink } from '../data/inquiry'

export default function Pricing() {
  return (
    <>
      <section className="bg-[#EFEFEF] pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
        <Container>
          <Reveal>
            <h1 className="hero-title hero-title--long max-w-5xl text-gray-900">
              Clear pricing. Creative solutions built around your needs.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
              From a single design deliverable to a complete creative partnership, choose the option
              that fits your goals, scope, and stage of growth.
            </p>
            <p className="mt-4 max-w-2xl text-[14px] sm:text-[15px] leading-[1.6] text-gray-700">
              Every project is different. Our starting prices help you plan your budget, and we'll
              confirm the final scope and quote before work begins.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24" aria-labelledby="project-pricing">
        <Container>
          <Reveal>
            <h2 id="project-pricing" className="mb-10 text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-[-0.02em] text-gray-900">
              Project-Based Pricing
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {priceCategories.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 60}>
                <CategoryCard c={c} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[13px] sm:text-[14px] text-gray-600">{priceNote}</p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="retainers">
        <Container>
          <Reveal>
            <h2 id="retainers" className="mb-10 text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-[-0.02em] text-gray-900">
              Monthly Creative Retainers
            </h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {plans.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <PlanCard plan={p} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-[13px] sm:text-[14px] leading-relaxed text-gray-600">
            {planDisclaimer}
          </p>
        </Container>
      </section>

      <section className="bg-[#EFEFEF] py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
              Only need one thing?
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] sm:text-[17px] leading-[1.6] text-gray-800">
              From a single illustration to a short animation or a focused design project, we'll
              recommend an approach that fits your goals and budget.
            </p>
            <div className="mt-8">
              <RollButton to={contactLink({ type: 'one-time' })} variant="orange">
                Tell Us About Your Project
              </RollButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="faq">
        <Container>
          <Reveal>
            <h2 id="faq" className="mb-10 text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-[-0.02em] text-gray-900">
              Pricing FAQ
            </h2>
            <Faq items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
