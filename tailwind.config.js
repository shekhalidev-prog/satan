/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07050a',
        abyss: '#0e0810',
        parchment: '#d9c9a3',
        parchmentDim: '#c2b08a',
        blood: '#7a0c14',
        bloodBright: '#a3121b',
        ember: '#b5651d',
        bone: '#e8ddc4',
        ink: '#1c1410'
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        gothic: ['"UnifrakturCook"', 'cursive'],
        body: ['"EB Garamond"', 'serif']
      },
      backgroundImage: {
        'parchment-tex': "radial-gradient(ellipse at top left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 100%)",
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '45%': { opacity: 0.92 },
          '48%': { opacity: 0.7 },
          '50%': { opacity: 0.95 },
          '72%': { opacity: 0.85 },
        },
        drip: {
          '0%': { height: '0px', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { height: 'var(--drip-h, 40px)', opacity: 1 },
        },
        pageInRight: {
          '0%': { transform: 'rotateY(-90deg)', opacity: 0 },
          '100%': { transform: 'rotateY(0deg)', opacity: 1 },
        },
        pageInLeft: {
          '0%': { transform: 'rotateY(90deg)', opacity: 0 },
          '100%': { transform: 'rotateY(0deg)', opacity: 1 },
        },
        emberGlow: {
          '0%, 100%': { boxShadow: '0 0 18px 2px rgba(163,18,27,0.35)' },
          '50%': { boxShadow: '0 0 32px 6px rgba(163,18,27,0.55)' },
        }
      },
      animation: {
        flicker: 'flicker 4s infinite',
        drip: 'drip 1.4s ease-out forwards',
        pageInRight: 'pageInRight 0.7s cubic-bezier(.4,.2,.2,1) forwards',
        pageInLeft: 'pageInLeft 0.7s cubic-bezier(.4,.2,.2,1) forwards',
        emberGlow: 'emberGlow 3.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
