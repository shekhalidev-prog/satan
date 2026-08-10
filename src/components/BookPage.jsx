import Sigil from './Sigil'

export default function BookPage({ children, className = '', animateIn = 'pageInRight' }) {
  return (
    <div className={`relative mx-auto max-w-5xl px-4 py-10 sm:py-14 ${className}`}>
      <div
        className={`parchment torn-edge relative rounded-sm border border-ink/40 p-6 sm:p-12 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-${animateIn}`}
        style={{ transformOrigin: 'left center', perspective: '1200px' }}
      >
        <Sigil className="corner-sigil absolute -top-4 -left-4 w-8 h-8" />
        <Sigil className="corner-sigil absolute -top-4 -right-4 w-8 h-8" />
        <Sigil className="corner-sigil absolute -bottom-4 -left-4 w-8 h-8" />
        <Sigil className="corner-sigil absolute -bottom-4 -right-4 w-8 h-8" />
        {children}
      </div>
    </div>
  )
}
