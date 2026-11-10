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
          DEFAULT: '#F7F4EF',
          light: '#FCFBFA',
          dark: '#EDE7DC',
          muted: '#E3DCCE',
          border: '#E8E0D2',
        },
        maroon: {
          DEFAULT: '#7B1131',
          dark: '#5A0C24',
          light: '#991840',
          soft: '#FBF0F3',
          border: '#E6C8D2',
        },
        gold: {
          DEFAULT: '#C8A45D',
          light: '#E4CF9E',
          dark: '#A6833D',
          soft: '#FDFAF2',
          border: '#EDDCB5',
        },
        brown: {
          DEFAULT: '#3A1D1D',
          light: '#614141',
          muted: '#7A6363',
          faint: '#9C8888',
        },
      },
      fontFamily: {
        heading: ['Garet', 'var(--font-garet)', 'sans-serif'],
        primary: ['Garet', 'var(--font-garet)', 'sans-serif'],
        garet: ['Garet', 'var(--font-garet)', 'sans-serif'],
        display: ['Garet', 'var(--font-garet)', 'sans-serif'],
        sans: ['Lato', 'var(--font-lato)', 'sans-serif'],
        body: ['Lato', 'var(--font-lato)', 'sans-serif'],
        lato: ['Lato', 'var(--font-lato)', 'sans-serif'],
        serif: ['Times New Roman', 'Times', 'serif'],
        times: ['Times New Roman', 'Times', 'serif'],
        quote: ['Times New Roman', 'Times', 'serif'],
        playfair: ['Garet', 'var(--font-garet)', 'sans-serif'],
        accent: ['Times New Roman', 'Times', 'serif'],
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
