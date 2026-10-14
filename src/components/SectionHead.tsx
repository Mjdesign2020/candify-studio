import type { ReactNode } from 'react'

export function Badge({
  n,
  label,
  border = 'border-gray-200',
}: {
  n?: string | number
  label: string
  border?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      {n !== undefined && (
        <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold">
          {n}
        </span>
      )}
      <span
        className={`rounded-full border ${border} px-3 sm:px-4 py-1 sm:py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900`}
      >
        {label}
      </span>
    </div>
  )
}

export function H2({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-[clamp(1.6rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 ${className}`}
    >
      {children}
    </h2>
  )
}

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}
