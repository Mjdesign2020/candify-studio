import { categoryFilters, type CategoryId } from '../data/projects'

export type Filter = 'all' | CategoryId

export default function FilterBar({
  value,
  onChange,
}: {
  value: Filter
  onChange: (f: Filter) => void
}) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {categoryFilters.map((c) => {
        const active = c.id === value
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c.id)}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
              active
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-transparent text-gray-900 hover:border-gray-900'
            }`}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
