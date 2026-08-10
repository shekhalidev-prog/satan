# Codex of Power

A dark, occult-themed grimoire that teaches *The 48 Laws of Power* through an
AI oracle. Built with React 19-style hooks (React 18 runtime), Vite,
Tailwind, and React Router.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Give the Codex a voice (optional)

By default the AI Explanation Engine runs fully offline with hand-written
"ritual text" for every law, so the app works with zero setup.

To let it speak through Groq's LLM instead:

1. Copy `.env.example` to `.env`
2. Get a free key at https://console.groq.com
3. Set `VITE_GROQ_API_KEY=your_key_here`
4. Restart `npm run dev`

If the Groq call fails for any reason, it silently falls back to the offline
text so the page never breaks.

## Structure

```
src/
  components/   Navbar, BookPage frame, Sigil (pentagram SVG), BloodDrip
  data/laws.js  All 48 law titles + taglines
  lib/aiEngine.js   Groq client + offline fallback generator
  pages/        CoverPage, LawsIndex, LawPage, AboutPage, ContactPage
```

## Pages

- `/` — Cover page (ancient book cover, blood drips, entry button)
- `/laws` — Table of contents, all 48 laws listed with roman numerals
- `/laws/:id` — Two-page spread: law title/sigil on the left, AI explanation
  (Meaning, Psychology, How to Use, Example, Warning, Key Takeaway) on the
  right, with Previous/Next navigation
- `/about` — The Scribe's bio (Hinglish)
- `/contact` — Instagram link

## Notes

- Uses `HashRouter` so it deploys cleanly to any static host (Vercel,
  GitHub Pages, etc.) without server rewrite rules.
- Fonts: Cinzel / Cinzel Decorative (display), UnifrakturCook (gothic
  accents), EB Garamond (parchment body text) — loaded from Google Fonts.
- Respects `prefers-reduced-motion`.
