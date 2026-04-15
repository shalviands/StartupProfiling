/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F2647",
        navyLight: "#1A3A6B",
        gold: "#E8A020",
        goldLight: "#FDF3DC",
        teal: "#1A7A6E",
        tealLight: "#D8F0ED",
        coral: "#E84B3A",
        coralLight: "#FDECEA",
        purple: "#5B4FCF",
        purpleLight: "#EEEAFF",
        slate: "#3B5070",
        silver: "#8A9BB0",
        smoke: "#F4F6F9",
      },
    },
  },
  plugins: [],
}

