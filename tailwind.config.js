/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          orange: '#ff6b00',
          'orange-glow': '#f97316',
          'orange-dark': '#c2410c',
          'orange-light': '#fed7aa',
        },
        obsidian: {
          950: '#080808',
          900: '#0f0f11',
          850: '#151518',
          800: '#1c1c20',
          750: '#232328',
          700: '#2d2d34',
        },
        fighter: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          800: '#27272a',
          900: '#18181b',
        },
        terminal: {
          green: '#ffffff',
          cyan: '#e4e4e7',
          amber: '#d4d4d8',
          pink: '#a1a1aa',
          violet: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Fira Code', 'JetBrains Mono', 'Space Grotesk', 'monospace'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -2px rgba(249, 115, 22, 0.45)',
        'glow-green': '0 0 25px -2px rgba(255, 255, 255, 0.25)',
        'glow-cyan': '0 0 25px -2px rgba(255, 255, 255, 0.2)',
        'glow-white': '0 0 25px -2px rgba(255, 255, 255, 0.3)',
        'fighter-panel': '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'terminal-window': '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 2px 1px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'scanline': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.02))',
        'grid-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
      },
      animation: {
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
