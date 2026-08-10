export default function BloodDrip({ left = '10%', delay = 0, height = 50 }) {
  return (
    <span
      className="drip animate-drip"
      style={{
        left,
        animationDelay: `${delay}s`,
        '--drip-h': `${height}px`,
      }}
      aria-hidden="true"
    />
  )
}
