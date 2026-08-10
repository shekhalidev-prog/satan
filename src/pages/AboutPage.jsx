import BookPage from '../components/BookPage'

export default function AboutPage() {
  return (
    <BookPage>
      <h1 className="font-heading text-2xl sm:text-3xl text-blood text-center tracking-widest mb-8">
        About the Scribe
      </h1>
      <div className="ink-text text-base sm:text-lg space-y-4 max-w-2xl mx-auto">
        <p>
          My name is Suhail Ali. I built this app because I have always had a
          deep interest in human nature, power dynamics, and dark psychology.
          This book isn&rsquo;t just about power — it&rsquo;s about
          understanding the human mind, its weaknesses, and its ego.
        </p>
        <p>
          My goal is to bring this knowledge to anyone who wants clarity,
          self-control, and mental strength in life — without a lecture,
          delivered instead like a forbidden manuscript, where every page
          feels like an old, dangerous secret being unsealed.
        </p>
      </div>
    </BookPage>
  )
}
