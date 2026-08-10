import { Link } from 'react-router-dom'
import Sigil from '../components/Sigil'
import BloodDrip from '../components/BloodDrip'

export default function CoverPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-6">
      {/* ambient blood drips from top */}
      <BloodDrip left="12%" delay={0.2} height={80} />
      <BloodDrip left="34%" delay={1.1} height={40} />
      <BloodDrip left="68%" delay={0.6} height={65} />
      <BloodDrip left="88%" delay={1.6} height={30} />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Sigil className="w-24 h-24 mb-6 text-blood animate-emberGlow rounded-full" animate />

        <h1 className="font-display text-4xl sm:text-6xl leading-tight text-bone tracking-wide drop-shadow-[0_0_25px_rgba(163,18,27,0.5)]">
          THE 48 LAWS
          <br />
          <span className="text-bloodBright">OF POWER</span>
        </h1>

        <p className="mt-6 font-gothic text-xl sm:text-2xl text-parchmentDim">
          An Ancient Manuscript of Power, Strategy &amp; Human Nature
        </p>

        <p className="mt-4 max-w-xl font-body italic text-parchmentDim/80">
          Bound in blood, sealed in silence. Turn its pages and the Codex will
          speak — for those who dare to learn how power is truly won, and how
          easily it is lost.
        </p>

        <Link
          to="/laws"
          className="group relative mt-10 overflow-hidden rounded-sm border border-blood px-8 py-3 font-heading uppercase tracking-[0.3em] text-parchment transition-all hover:border-bloodBright hover:text-bone"
        >
          <span className="relative z-10">Enter the Forbidden Book</span>
          <span className="absolute inset-0 -z-0 bg-blood/0 transition-colors duration-500 group-hover:bg-blood/30" />
        </Link>
      </div>
    </div>
  )
}
