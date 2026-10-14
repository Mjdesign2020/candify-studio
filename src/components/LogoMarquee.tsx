import { clients } from '../data/trust'

const base = import.meta.env.BASE_URL

/**
 * Endless logo strip. Logos slide left to right in a seamless loop.
 * - Pauses on hover / keyboard focus.
 * - With "reduce motion" on, it stops and the logos wrap into a static grid.
 * - The repeated copies are hidden from screen readers.
 * Renders nothing when there are no clients.
 */
export default function LogoMarquee({ label = 'Brands we’ve worked with' }: { label?: string }) {
  if (clients.length === 0) return null

  // 4 copies (2 + 2) so the strip is always wider than any screen; the loop moves by exactly half.
  const set = (copy: number) =>
    clients.map((c) => (
      <li key={`${c.name}-${copy}`} className="marquee-item" aria-hidden={copy > 0 || undefined}>
        <img
          src={`${base}${c.logo}`}
          alt={copy > 0 ? '' : c.name}
          loading="lazy"
          draggable={false}
          style={{ height: `calc(${c.h}px * var(--logo-scale))` }}
          className="marquee-logo w-auto max-w-none select-none"
        />
      </li>
    ))

  return (
    <div className="marquee" role="region" aria-label={label}>
      <p className="mx-auto mb-8 max-w-[1440px] px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-gray-600 sm:px-8 sm:text-[13px] lg:px-12">
        {label}
      </p>
      <div className="marquee-viewport">
        <ul className="marquee-track">
          {[0, 1, 2, 3].map((copy) => set(copy))}
        </ul>
      </div>
    </div>
  )
}
