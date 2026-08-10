import { Link } from 'react-router-dom'
import BookPage from '../components/BookPage'
import { laws } from '../data/laws'

export default function LawsIndex() {
  return (
    <BookPage>
      <h1 className="font-heading text-2xl sm:text-3xl text-blood text-center tracking-widest mb-1">
        Table of Forbidden Laws
      </h1>
      <p className="text-center font-body italic text-ink/60 mb-8">
        Choose a law. The page will turn itself for you.
      </p>

      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
        {laws.map((law) => (
          <li key={law.id} className="border-b border-ink/15 py-3">
            <Link
              to={`/laws/${law.id}`}
              className="flex items-baseline gap-3 group"
            >
              <span className="font-heading text-blood text-sm w-10 shrink-0 text-right">
                {law.numeral}
              </span>
              <span className="ink-text text-base sm:text-lg group-hover:text-blood transition-colors">
                {law.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </BookPage>
  )
}
