/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf8",
          100: "#d6f7ee",
          200: "#b0efe0",
          300: "#7fe3ce",
          400: "#49cfb5",
          500: "#2cb197",
          600: "#208c78",
          700: "#1e6e60",
          800: "#1d574d",
          900: "#1a473f"
        }
      }
    }
  },
  plugins: []
};
