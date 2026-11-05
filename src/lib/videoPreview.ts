import { useCallback, useEffect, useRef, useSyncExternalStore, type RefObject } from 'react'

/**
 * Card video previews.
 *
 * Performance rules:
 *  - Only ONE preview plays at a time (module-level store).
 *  - Nothing YouTube-related loads until a user shows intent (hover on desktop,
 *    the card settling in the middle of the viewport on touch devices).
 *  - Players that have already booted are kept WARM (paused, hidden) so hovering
 *    the same card again is instant. At most MAX_WARM players exist on the page,
 *    least-recently-used is destroyed first — memory stays bounded.
 *  - Respects prefers-reduced-motion and Data Saver: previews are disabled and
 *    the static thumbnail is shown.
 */

const MAX_WARM = 2

/* --------------------------------- store ---------------------------------- */

let activeId: string | null = null
let warm: string[] = []
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function setActive(id: string | null) {
  if (activeId === id) return
  activeId = id
  if (id) warm = [id, ...warm.filter((w) => w !== id)].slice(0, MAX_WARM)
  emit()
}

function release(id: string) {
  const wasActive = activeId === id
  if (wasActive) activeId = null
  if (warm.includes(id)) warm = warm.filter((w) => w !== id)
  emit()
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

if (typeof document !== 'undefined') {
  // Pause playback when the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) setActive(null)
  })
}

/* ------------------------------ environment ------------------------------- */

const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia?.(q).matches

export function previewsAllowed() {
  if (mq('(prefers-reduced-motion: reduce)')) return false
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !conn?.saveData
}

/** True on devices without a real hover (phones / tablets). */
export const isTouchDevice = () => !!mq('(hover: none)')

let preconnected = false
/** Warm up DNS/TLS for YouTube the first time a user shows any intent. */
export function preconnectYouTube() {
  if (preconnected || typeof document === 'undefined') return
  preconnected = true
  for (const href of [
    'https://www.youtube-nocookie.com',
    'https://www.youtube.com',
    'https://www.google.com',
    'https://i.ytimg.com',
    'https://static.doubleclick.net',
  ]) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = ''
    document.head.appendChild(link)
  }
}

/* --------------------------------- hook ----------------------------------- */

const SCROLL_SETTLE_MS = 300

/**
 * Wires a card up for previewing. `active` = should be playing now,
 * `warm` = player should exist (playing or paused). Spread `handlers` on the card.
 */
export function useVideoPreview(id: string, ref: RefObject<HTMLElement>, enabled: boolean) {
  const active = useSyncExternalStore(subscribe, () => activeId === id, () => false)
  const isWarm = useSyncExternalStore(subscribe, () => warm.includes(id), () => false)
  const timer = useRef<number>()
  const clearTimer = () => window.clearTimeout(timer.current)

  // Touch devices: play the card that settles in the central band of the viewport.
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el || !isTouchDevice() || !previewsAllowed()) return
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimer()
        if (entry.isIntersecting) {
          preconnectYouTube()
          timer.current = window.setTimeout(() => setActive(id), SCROLL_SETTLE_MS)
        } else if (activeId === id) {
          setActive(null)
        }
      },
      // A card is "in focus" while it overlaps the middle 30% of the screen.
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimer()
    }
  }, [enabled, id, ref])

  // Destroy this card's player if the card unmounts (e.g. a filter change).
  useEffect(
    () => () => {
      clearTimer()
      release(id)
    },
    [id],
  )

  // Desktop: start the moment the mouse is anywhere over the card.
  const onPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || e.pointerType === 'touch' || !previewsAllowed()) return
      preconnectYouTube()
      setActive(id)
    },
    [enabled, id],
  )

  const onPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (activeId === id) setActive(null)
    },
    [id],
  )

  return { active, warm: isWarm, handlers: { onPointerEnter, onPointerLeave } }
}
