import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f7f4ef',
          light: '#fcfbfa',
          dark: '#ede7dc',
          muted: '#e3dcce',
          border: '#e8e0d2',
        },
        maroon: {
          DEFAULT: '#7b1131',
          dark: '#5a0c24',
          light: '#991840',
          soft: '#fbf0f3',
          border: '#e6c8d2',
        },
        gold: {
          DEFAULT: '#c8a45d',
          light: '#e4cf9e',
          dark: '#a6833d',
          soft: '#fdfaf2',
          border: '#eddcb5',
        },
        brown: {
          DEFAULT: '#3a1d1d',
          light: '#614141',
          muted: '#7a6363',
          faint: '#9c8888',
        },
      },
      fontFamily: {
        serif: ['Garet', 'var(--font-garet)', 'var(--font-playfair)', 'Georgia', 'serif'],
        display: ['Garet', 'var(--font-garet)', 'var(--font-cinzel)', 'serif'],
        sans: ['Garet', 'var(--font-garet)', 'var(--font-lato)', 'system-ui', '-apple-system', 'sans-serif'],
        garet: ['Garet', 'var(--font-garet)', 'sans-serif'],
        primary: ['Garet', 'var(--font-garet)', 'sans-serif'],
        playfair: ['PlayfairDisplay', 'var(--font-playfair)', 'Georgia', 'serif'],
        josephsophia: ['JosephSophia', 'var(--font-josephsophia)', 'cursive', 'serif'],
        valentina: ['HelloValentina', 'var(--font-valentina)', 'cursive', 'serif'],
        rustic: ['RusticDelight', 'var(--font-rustic-delight)', 'cursive', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(58, 29, 29, 0.05)',
        'warm-md': '0 4px 16px -4px rgba(58, 29, 29, 0.08), 0 2px 6px -2px rgba(123, 17, 49, 0.04)',
        'warm-lg': '0 12px 32px -6px rgba(58, 29, 29, 0.12), 0 4px 12px -2px rgba(123, 17, 49, 0.06)',
        'gold-glow': '0 0 24px -4px rgba(200, 164, 93, 0.35)',
        'maroon-glow': '0 0 24px -4px rgba(123, 17, 49, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-pattern': 'radial-gradient(circle at 1px 1px, rgba(123, 17, 49, 0.04) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
