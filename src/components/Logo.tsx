/**
 * Candify wordmark (black text, orange dot). It is black, so only place it on
 * light backgrounds. BASE_URL keeps the path correct if the site is hosted in
 * a sub-folder (e.g. GitHub Pages at /repo-name/).
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.svg`}
      alt="Candify Studio"
      width={360}
      height={98}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  )
}
