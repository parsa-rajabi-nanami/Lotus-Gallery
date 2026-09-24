module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lotus: {
          black: '#0A0A0A', // Deep pure black for main background
          charcoal: '#151515', // Frosted glass backgrounds & cards
          border: '#2A2A2A', // Subtle structural dividers
          gold: {
            DEFAULT: '#D4AF37', // Classic 18K Yellow Gold (Primary Action / Accents)
            light: '#F3E5AB', // Shine/Highlight
            dark: '#AA882E', // Hover states
          },
          rosegold: '#E0A899', // Champagne Rose Gold (Secondary Accent)
          whitegold: '#E2E8F0', // Platinum / White Gold (Text headers)
        },
      },
      fontFamily: {
        fa: ['Yekan Bakh', 'Peyda', 'sans-serif'],
        en: ['Playfair Display', 'Cinzel', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #AA882E 100%)',
        'glass-panel': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.15)',
        'glass-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      }
    }
  }
};
