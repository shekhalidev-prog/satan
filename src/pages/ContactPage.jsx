import BookPage from '../components/BookPage'
import Sigil from '../components/Sigil'

export default function ContactPage() {
  return (
    <BookPage>
      <h1 className="font-heading text-2xl sm:text-3xl text-blood text-center tracking-widest mb-2">
        Summon the Scribe
      </h1>
      <p className="text-center font-body italic text-ink/60 mb-10">
        Reach across the veil.
      </p>

      <div className="flex flex-col items-center gap-6">
        <Sigil className="w-16 h-16 text-blood animate-flicker" animate />
        <a
          href="https://www.instagram.com/_ig_suhail_37/"
          target="_blank"
          rel="noopener noreferrer"
          className="ink-text text-lg sm:text-xl border-b border-blood/60 hover:text-blood transition-colors"
        >
          @_ig_suhail_37
        </a>
        <p className="ink-text text-sm text-ink/70 max-w-md text-center">
          Follow for more forbidden knowledge, dark builds, and worlds still
          being written.
        </p>
      </div>
    </BookPage>
  )
}
