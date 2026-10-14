import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'orange' | 'dark' | 'light'

const styles: Record<Variant, { btn: string; circle: string; arrow: string }> = {
  orange: {
    btn: 'bg-[#F26522] hover:bg-[#e05a1a] text-white',
    circle: 'bg-white',
    arrow: 'text-[#F26522]',
  },
  dark: {
    btn: 'bg-gray-900 text-white',
    circle: 'bg-white',
    arrow: 'text-gray-900',
  },
  light: {
    btn: 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300',
    circle: 'bg-gray-900',
    arrow: 'text-white',
  },
}

const ease = 'duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

interface Props {
  children: string
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: Variant
  className?: string
  icon?: ReactNode
}

/** Pill button with the text-roll + rotating arrow hover from the style reference. */
export default function RollButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  variant = 'orange',
  className = '',
}: Props) {
  const s = styles[variant]
  const base = `group inline-flex items-center gap-3 rounded-full pl-5 sm:pl-6 pr-2 py-2 text-[13px] sm:text-[14px] font-medium transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${s.btn} ${className}`

  const inner = (
    <>
      <span className="block h-[20px] overflow-hidden" aria-hidden="true">
        <span
          className={`flex flex-col transition-transform ${ease} group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2`}
        >
          <span className="h-[20px] leading-[20px]">{children}</span>
          <span className="h-[20px] leading-[20px]">{children}</span>
        </span>
      </span>
      <span className="sr-only">{children}</span>
      <span
        className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full ${s.circle}`}
        aria-hidden="true"
      >
        <ArrowRight
          size={14}
          className={`${s.arrow} transition-transform ${ease} group-hover:-rotate-45 group-focus-visible:-rotate-45`}
        />
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={base}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {inner}
    </button>
  )
}
