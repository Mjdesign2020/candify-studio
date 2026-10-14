/**
 * Candify social profiles. Paste each real profile URL between the quotes
 * (e.g. 'https://www.instagram.com/yourhandle'). Entries left empty are not
 * shown anywhere on the site, so no placeholder or invented link is published.
 */
export interface Social {
  label: string
  url: string
}

export const socials: Social[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/candifydesignstudio/' },
  { label: 'Instagram', url: 'https://www.instagram.com/candifystudio' },
  { label: 'YouTube', url: 'https://www.youtube.com/@candifystudio' },
  { label: 'Behance', url: 'https://www.behance.net/candifydesignstudio' },
  { label: 'X (Twitter)', url: 'https://x.com/candify_studio' },
]

export const activeSocials = socials.filter((s) => s.url.trim() !== '')
