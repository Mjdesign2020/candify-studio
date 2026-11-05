import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2, Play } from 'lucide-react'
import { type Project } from '../data/projects'
import { useVideoPreview } from '../lib/videoPreview'
import CardVideoPreview from './YouTubePreview'

const tileColors = ['#1a1d2e', '#6b6b6b', '#F26522', '#2b3a55', '#3b3b3b', '#8a4b2a']

/** Card is 4:3 and spans the full column on mobile, half the container from md up. */
const SIZES = '(min-width: 768px) 50vw, 100vw'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { media, youtubeId, previewSrc } = project
  const hasVideo = !!(youtubeId || previewSrc)
  const ref = useRef<HTMLElement>(null)
  const { active, warm, handlers } = useVideoPreview(project.slug, ref, hasVideo)
  const [playing, setPlaying] = useState(false)
  const loading = active && !playing

  return (
    <article ref={ref} className="group" {...handlers}>
      <Link
        to={`/portfolio/${project.slug}`}
        className="block"
        aria-label={`${project.title} — view case study`}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          style={{ backgroundColor: tileColors[index % tileColors.length] }}
        >
          {media?.type === 'image' && (
            <img
              src={media.src}
              srcSet={media.srcSet}
              sizes={media.srcSet ? SIZES : undefined}
              alt={media.alt}
              width={1600}
              height={1200}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
            />
          )}
          {media?.type === 'video' && (
            <video
              src={media.src}
              poster={media.poster}
              aria-label={media.alt}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover motion-reduce:hidden"
            />
          )}

          {hasVideo && (
            <CardVideoPreview
              videoId={youtubeId}
              src={previewSrc}
              active={active}
              warm={warm}
              onPlayingChange={setPlaying}
            />
          )}

          {project.isPlaceholder ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-gray-900">
              Placeholder — not a real project
            </span>
          ) : (
            hasVideo && (
              <span
                className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-opacity duration-300 ${
                  playing ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              >
                {loading ? (
                  <>
                    <Loader2 size={11} className="animate-spin" /> Loading
                  </>
                ) : (
                  <>
                    <Play size={10} className="fill-current" /> Video
                  </>
                )}
              </span>
            )
          )}

          <span
            className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-gray-900 transition-all duration-300 ease-in-out group-hover:w-[168px] group-focus-visible:w-[168px]"
            aria-hidden="true"
          >
            <span className="flex w-full items-center justify-center gap-2 whitespace-nowrap px-3">
              <span className="w-0 overflow-hidden text-[13px] font-medium opacity-0 transition-all delay-100 duration-300 group-hover:w-auto group-hover:opacity-100">
                View case study
              </span>
              <ArrowRight
                size={14}
                className="shrink-0 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
              />
            </span>
          </span>
        </div>
        <p className="mt-4 text-[12px] text-gray-500">
          {[...project.tags, project.year].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-1.5 text-[16px] sm:text-[18px] font-semibold leading-snug tracking-[-0.01em] text-gray-900">
          {project.title}
        </h3>
      </Link>
    </article>
  )
}
