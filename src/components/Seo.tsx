import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, canonicalUrl, metaForPath } from '../data/seo'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Keeps <head> in sync during client-side navigation. The first load already has the right tags
 * (written per route by scripts/prerender.mjs); this covers in-app route changes and unknown URLs.
 */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaForPath(pathname)
    const url = canonicalUrl(meta.path)

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    if (meta.image) {
      setMeta('property', 'og:image', absoluteUrl(meta.image))
      setMeta('name', 'twitter:image', absoluteUrl(meta.image))
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (meta.noindex) {
      canonical?.remove()
    } else {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
    }
  }, [pathname])

  return null
}
