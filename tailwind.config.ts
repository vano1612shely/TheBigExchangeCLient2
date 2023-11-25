import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "340px",
      md: "768px",
      lg: "990px",
      xl: "1200px",
      "2xl": "1220px",
    },
    extend: {
      fontFamily: {
        xolonium: "var(--font-xolonium)",
        raleway: "var(--font-raleway)",
      },
      dropShadow: {
        "1xl-light": [
          "2px 2px 5px rgba(80,80,80,.25)",
          "-2px -2px 5px rgba(203,203,203,.25)",
        ],
        "3xl": [
          "-2px -2px 5px rgba(187,134,31,.5)",
          "2px 2px 5px rgba(187,134,31,.5)",
        ],
        "3xl-light": [
          "3px 3px 33px rgba(80,80,80,.25)",
          "-3px -3px 33px rgba(203,203,203,.25)",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
