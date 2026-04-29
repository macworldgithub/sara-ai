export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sara: {
          "dark-green": "#00493a",
          "off-white": "#f6f4f0",
          "light-green": "#a3b18a",
          black: "#0d0d0d",
          "dark-grey": "#2a2a2a",
          "mid-grey": "#5a5a5a",
          "light-grey": "#d4d2ce",
          white: "#ffffff",
        },
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        mono: ["DM Mono", "Courier New", "monospace"],
        sans: ["DM Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "sara-soft": "0 18px 50px rgba(13, 13, 13, 0.18)",
        "sara-accent": "0 16px 36px rgba(163, 177, 138, 0.22)",
      },
    },
  },
  plugins: [],
};