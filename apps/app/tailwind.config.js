// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1C1C1F",
        "deActive": "#DCE4F2",
      }
    },
  },
  plugins: [],
}