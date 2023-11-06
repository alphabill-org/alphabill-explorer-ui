import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        'button': '0 12px 40px 0px rgba(12, 10, 62, 0.5)',
      },
      keyframes:{
        pulsing: {
          '0%': {transform: 'scale(1)',opacity: '0'},
          '25%': {transform: 'scale(1.125)', opacity: '100%'},
          '50%': {transform: 'scale(1.25)', opacity: '100%'},
          '75%': {transform: 'scale(1.375)', opacity: '100%'},
          '100%': {transform: 'scale(1.5)', opacity: '0'},
        }
      },
      animation:{
        pulsing: 'pulsing 12s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
