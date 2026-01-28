/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#c49963",
        "accent-focus": "#b46c2c",
        charcoal: "#222417",
        "muted-gold": "#816432",
        "bg-light": "#F9F9F9",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
}