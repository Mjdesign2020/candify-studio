import type { TeamMember } from '../data/team'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

function Photo({ m }: { m: TeamMember }) {
  return (
    <div className="aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl bg-[#EFEFEF] md:max-w-none">
      {m.photo ? (
        <img
          src={`${import.meta.env.BASE_URL}team/${m.photo}`}
          alt={`Portrait of ${m.name}`}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-[48px] font-medium text-gray-400"
          aria-hidden="true"
        >
          {initials(m.name)}
        </div>
      )}
    </div>
  )
}

function Links({ m }: { m: TeamMember }) {
  const links = (m.links ?? []).filter((l) => l.url.trim() !== '')
  if (links.length === 0) return null
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${m.name} on social media`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-gray-300 px-3.5 py-1.5 text-[13px] font-medium text-gray-900 transition-colors duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** One team member as a row: photo on the left, details on the right (stacked on phones). */
export default function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article className="grid gap-6 md:grid-cols-[260px_1fr] md:gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
      <Photo m={m} />
      <div className="self-center">
        <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-gray-900">
          {m.name}
        </h3>
        <p className="mt-1 text-[14px] font-medium text-gray-500">{m.role}</p>
        <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-[1.7] text-gray-700">
          {m.bio}
        </p>
        <Links m={m} />
      </div>
    </article>
  )
}
