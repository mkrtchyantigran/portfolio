import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/theme';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            // Warm, soft "paper" light theme (warm-gray / stone)
            background: '#faf9f7',
            foreground: '#1c1917',
            content1: '#fffefc',
            content2: '#f5f4f2',
            content3: '#ecebe8',
            content4: '#e4e2dd',
            default: {
              50: '#fafaf9',
              100: '#f5f5f4',
              200: '#e7e5e4',
              300: '#d6d3d1',
              400: '#a8a29e',
              500: '#78716c',
              600: '#57534e',
              700: '#44403c',
              800: '#292524',
              900: '#1c1917',
              DEFAULT: '#d6d3d1',
              foreground: '#1c1917',
            },
            primary: {
              DEFAULT: '#6366f1',
              foreground: '#ffffff',
            },
            focus: '#6366f1',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#818cf8',
              foreground: '#0b0b12',
            },
            focus: '#818cf8',
          },
        },
      },
    }),
  ],
};

export default config;
