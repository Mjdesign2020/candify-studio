import { Link } from 'react-router-dom'
import { Container } from './SectionHead'
import { CONTACT_EMAIL, contactLink } from '../data/inquiry'

import { activeSocials } from '../data/social'

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: contactLink({ type: 'general' }), label: 'Start a Project' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold tracking-[0.14em]">CANDIFY STUDIO</p>
            <p className="mt-3 text-[15px] text-gray-300">Creative minds. Strategic design.</p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-gray-400">
              We help businesses explain, design, and bring ideas to life.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-3 text-[14px]">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-300 transition-colors duration-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[14px]">
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-gray-300 transition-colors duration-300 hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            )}
            {activeSocials.length > 0 && (
              <ul className="mt-5 space-y-3">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 transition-colors duration-300 hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-[13px] text-gray-500">
          © 2026 Candify Studio. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
