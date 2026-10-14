import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import RollButton from './RollButton'
import Logo from './Logo'
import { contactLink } from '../data/inquiry'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

const startLink = contactLink({ type: 'general' })

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the sheet on route change
  useEffect(() => setOpen(false), [pathname])

  // Escape closes; lock body scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[14px] transition-colors duration-300 ${
      isActive ? 'text-gray-900 font-medium' : 'text-gray-900 hover:text-gray-500'
    }`

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-[1440px] p-2 sm:p-3">
          <nav
            aria-label="Main"
            className="flex items-center justify-between rounded-full bg-white p-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-6">
              <Link
                to="/"
                aria-label="Candify Studio home"
                className="flex h-9 sm:h-10 items-center pl-3 pr-1 sm:pl-4"
              >
                <Logo className="h-6 sm:h-7" />
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((l) => (
                  <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <RollButton to={startLink} variant="dark">
                Start a Project
              </RollButton>
            </div>

            <button
              type="button"
              className="md:hidden flex items-center gap-2 rounded-full bg-gray-900 pl-4 pr-3 py-2 text-[13px] font-medium text-white"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Close' : 'Menu'}
              {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo className="h-6" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-full bg-gray-900 pl-4 pr-3 py-2 text-[13px] font-medium text-white"
              tabIndex={open ? 0 : -1}
            >
              Close <X size={16} aria-hidden="true" />
            </button>
          </div>
          <ul className="mb-8 space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    `block text-[28px] sm:text-[32px] font-medium ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <RollButton to={startLink} variant="orange" className="w-full justify-between">
            Start a Project
          </RollButton>
        </div>
      </div>
    </>
  )
}
