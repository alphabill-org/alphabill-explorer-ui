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
    },
  },
  plugins: [],
} satisfies Config;
