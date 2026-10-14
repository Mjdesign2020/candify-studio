import { Plus } from 'lucide-react'

/** Accessible accordion using native <details>, so keyboard support is built in. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((i) => (
        <details key={i.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] sm:text-[18px] font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
            {i.q}
            <Plus
              size={20}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-[14px] sm:text-[15px] leading-[1.6] text-gray-600">
            {i.a}
          </p>
        </details>
      ))}
    </div>
  )
}
