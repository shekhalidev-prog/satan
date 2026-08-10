import { Link, useLocation } from 'react-router-dom'
import Sigil from './Sigil'

const links = [
  { to: '/', label: 'Cover' },
  { to: '/laws', label: 'Laws Index' },
  { to: '/about', label: 'The Scribe' },
  { to: '/contact', label: 'Summon' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-blood/50 bg-void/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Sigil className="w-6 h-6 text-blood group-hover:animate-flicker" />
          <span className="font-heading tracking-[0.2em] text-bone text-sm sm:text-base">
            CODEX <span className="text-bloodBright">OF POWER</span>
          </span>
        </Link>
        <ul className="flex gap-4 sm:gap-8 font-body text-xs sm:text-sm uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`transition-colors hover:text-bloodBright ${
                  pathname === l.to ? 'text-bloodBright' : 'text-parchmentDim'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
