/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#fea928",
        secondry: "#ed8900",
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "2rem",
        }
      },
    },
  },
  plugins: [],
}

