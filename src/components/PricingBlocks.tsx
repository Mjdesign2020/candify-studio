import { Check } from 'lucide-react'
import RollButton from './RollButton'
import { contactLink } from '../data/inquiry'
import type { Plan, PriceCategory } from '../data/pricing'

export function CategoryCard({ c }: { c: PriceCategory }) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <h3 className="text-[20px] sm:text-[22px] font-medium tracking-[-0.01em] text-gray-900">
        {c.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{c.description}</p>
      <ul className="mt-6 flex-1 divide-y divide-gray-100">
        {c.items.map((i) => (
          <li key={i.name} className="flex items-baseline justify-between gap-4 py-3 text-[14px]">
            <span className="text-gray-900">{i.name}</span>
            <span className="shrink-0 font-medium text-gray-900">{i.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <RollButton to={contactLink({ service: c.service, type: 'general' })} variant="dark">
          Get a Quote
        </RollButton>
      </div>
    </article>
  )
}

export function PlanCard({ plan }: { plan: Plan }) {
  const featured = !!plan.label
  return (
    <article
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 ${
        featured
          ? 'bg-gray-900 text-white'
          : 'border border-gray-200 bg-white text-gray-900'
      }`}
    >
      {plan.label && (
        <span className="absolute right-6 top-6 rounded-full bg-[#F26522] px-3 py-1 text-[11px] font-semibold text-white">
          {plan.label}
        </span>
      )}
      <h3 className="text-[20px] font-medium">{plan.name}</h3>
      <p className="mt-3 text-[32px] sm:text-[36px] font-medium tracking-[-0.02em]">{plan.price}</p>
      <p className={`mt-2 text-[14px] ${featured ? 'text-gray-300' : 'text-gray-600'}`}>
        {plan.blurb}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] leading-snug">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${featured ? 'text-[#F26522]' : 'text-gray-900'}`}
              aria-hidden="true"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <RollButton
          to={contactLink({ service: 'retainer', plan: plan.id, type: 'general' })}
          variant={featured ? 'orange' : 'dark'}
        >
          {plan.cta}
        </RollButton>
      </div>
    </article>
  )
}
