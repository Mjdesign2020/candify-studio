import { useEffect, useRef, useState } from 'react'

const ORIGIN = 'https://www.youtube-nocookie.com'
const FADE_MS = 300

interface Props {
  /** YouTube id — used when no self-hosted clip is available. */
  videoId?: string
  /** Self-hosted short preview clip (mp4/webm). Starts in ~200 ms; preferred. */
  src?: string
  /** Should be playing now. */
  active: boolean
  /** Player should exist (playing or paused, hidden). */
  warm: boolean
  onPlayingChange?: (playing: boolean) => void
}

/**
 * Muted, chrome-less, looping preview that covers a 4:3 card.
 * It stays invisible until playback has actually started, so the thumbnail
 * cross-fades straight into motion — no black box, spinner or YouTube title bar.
 */
export default function CardVideoPreview({ videoId, src, active, warm, onPlayingChange }: Props) {
  const [playing, setPlaying] = useState(false)
  const visible = playing && active

  useEffect(() => onPlayingChange?.(visible), [visible, onPlayingChange])
  useEffect(() => {
    if (!active) setPlaying(false)
  }, [active])

  if (!warm) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {src ? (
        <FileVideo src={src} active={active} onPlaying={() => setPlaying(true)} />
      ) : videoId ? (
        <YouTubeFrame videoId={videoId} active={active} onPlaying={() => setPlaying(true)} />
      ) : null}
    </div>
  )
}

function FileVideo({ src, active, onPlaying }: { src: string; active: boolean; onPlaying: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active])
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={onPlaying}
      className="h-full w-full object-cover"
    />
  )
}

/**
 * YouTube player driven with the lightweight postMessage protocol (no IFrame API
 * script). Booted once, then paused/resumed so re-hovering is instant.
 */
function YouTubeFrame({ videoId, active, onPlaying }: { videoId: string; active: boolean; onPlaying: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const loaded = useRef(false)

  const command = (func: 'playVideo' | 'pauseVideo') =>
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), ORIGIN)

  const lastState = useRef<number>(-1)

  // Resume / pause an already-booted player.
  useEffect(() => {
    if (!loaded.current) return
    command(active ? 'playVideo' : 'pauseVideo')
    // Re-hovered before the pause landed: it's still playing, so no state event will come.
    if (active && lastState.current === 1) onPlayingRef.current()
  }, [active])

  // Listen for the player's state; 1 === PLAYING.
  const onPlayingRef = useRef(onPlaying)
  onPlayingRef.current = onPlaying
  const activeRef = useRef(active)
  activeRef.current = active
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || e.source !== frame.current?.contentWindow) return
      let data: { event?: string; info?: unknown }
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      } catch {
        return
      }
      const state =
        data.event === 'onStateChange'
          ? data.info
          : (data.info as { playerState?: number } | undefined)?.playerState
      if (typeof state !== 'number') return
      lastState.current = state
      if (state !== 1) return
      if (activeRef.current) onPlayingRef.current()
      else command('pauseVideo') // autoplay finished booting after the user left
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    playsinline: '1',
    loop: '1',
    playlist: videoId, // required for loop to work on a single video
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
    enablejsapi: '1',
    origin: window.location.origin,
  })

  const onLoad = () => {
    loaded.current = true
    // Ask the player to send state events to this window.
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: videoId, channel: 'widget' }), ORIGIN)
    // If the user left while it was booting, don't let autoplay run hidden.
    if (!activeRef.current) command('pauseVideo')
  }

  return (
    // 16:9 video scaled to cover the 4:3 card, slightly over-scaled to crop YouTube's edge chrome.
    <iframe
      ref={frame}
      src={`${ORIGIN}/embed/${videoId}?${params}`}
      title=""
      tabIndex={-1}
      allow="autoplay; encrypted-media; picture-in-picture"
      onLoad={onLoad}
      className="absolute left-1/2 top-1/2 h-[106%] w-[141.5%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
    />
  )
}
