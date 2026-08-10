import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sigil from '../components/Sigil'
import { getLawById, laws } from '../data/laws'
import { getLawExplanation } from '../lib/aiEngine'

const SECTIONS = [
  { key: 'meaning', label: 'Meaning' },
  { key: 'psychology', label: 'Psychology Behind It' },
  { key: 'howToUse', label: 'How to Use It' },
  { key: 'example', label: 'Example' },
  { key: 'warning', label: 'Warning / Dark Side' },
]

export default function LawPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const law = getLawById(id)

  const [explanation, setExplanation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState(null)

  useEffect(() => {
    if (!law) return
    let cancelled = false
    setLoading(true)
    setExplanation(null)

    getLawExplanation(law).then(({ data, source }) => {
      if (!cancelled) {
        setExplanation(data)
        setSource(source)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [id])

  if (!law) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-heading text-blood text-xl">
          This page has crumbled to dust. No such law exists in the Codex.
        </p>
        <Link to="/laws" className="mt-6 inline-block text-parchmentDim underline">
          Return to the Table of Laws
        </Link>
      </div>
    )
  }

  const prev = laws.find((l) => l.id === law.id - 1)
  const next = laws.find((l) => l.id === law.id + 1)

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT PAGE */}
        <div
          className="parchment torn-edge relative rounded-sm border border-ink/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-pageInLeft flex flex-col items-center text-center"
          style={{ transformOrigin: 'right center' }}
        >
          <Sigil className="corner-sigil absolute -top-4 -left-4 w-8 h-8" />
          <Sigil className="corner-sigil absolute -top-4 -right-4 w-8 h-8" />

          <span className="font-heading text-blood text-lg tracking-[0.3em]">
            LAW {law.numeral}
          </span>
          <Sigil className="w-20 h-20 my-6 text-blood animate-flicker" />
          <h1 className="font-heading text-2xl sm:text-3xl text-ink leading-snug">
            {law.title}
          </h1>
          <p className="mt-4 font-body italic text-ink/70">{law.tagline}</p>

          {explanation && !loading && (
            <div className="mt-8 border-t border-ink/20 pt-5 w-full">
              <p className="font-gothic text-lg text-blood mb-2">Key Takeaway</p>
              <p className="ink-text italic">&ldquo;{explanation.keyTakeaway}&rdquo;</p>
            </div>
          )}
        </div>

        {/* RIGHT PAGE */}
        <div
          className="parchment torn-edge relative rounded-sm border border-ink/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-pageInRight"
          style={{ transformOrigin: 'left center' }}
        >
          <Sigil className="corner-sigil absolute -top-4 -right-4 w-8 h-8" />
          <Sigil className="corner-sigil absolute -bottom-4 -right-4 w-8 h-8" />

          <h2 className="font-heading text-blood text-lg tracking-widest mb-6 text-center">
            The Codex Speaks
          </h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Sigil className="w-12 h-12 text-blood animate-flicker" animate />
              <p className="mt-4 ink-text italic text-ink/60">
                The ink is bleeding onto the page&hellip;
              </p>
            </div>
          )}

          {explanation && !loading && (
            <div className="space-y-5">
              {SECTIONS.map((s) => (
                <div key={s.key}>
                  <p className="font-gothic text-blood text-base mb-1">{s.label}</p>
                  <p className="ink-text text-[0.95rem] sm:text-base">
                    {explanation[s.key]}
                  </p>
                </div>
              ))}
              {source && source !== 'groq' && (
                <p className="pt-4 text-xs text-ink/40 italic">
                  * Rendered from the Codex&rsquo;s local ritual text (no oracle key
                  configured or the oracle was silent).
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NAV */}
      <div className="mt-8 flex items-center justify-between font-heading text-xs sm:text-sm uppercase tracking-widest">
        <button
          disabled={!prev}
          onClick={() => navigate(`/laws/${prev.id}`)}
          className="disabled:opacity-30 disabled:cursor-not-allowed text-parchmentDim hover:text-bloodBright transition-colors"
        >
          &larr; Previous Law
        </button>
        <Link to="/laws" className="text-parchmentDim hover:text-bloodBright transition-colors">
          Table of Laws
        </Link>
        <button
          disabled={!next}
          onClick={() => navigate(`/laws/${next.id}`)}
          className="disabled:opacity-30 disabled:cursor-not-allowed text-parchmentDim hover:text-bloodBright transition-colors"
        >
          Next Law &rarr;
        </button>
      </div>
    </div>
  )
}
