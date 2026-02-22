/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        background: "#40A2E3",
        primary: "#BBE2EC",
        secondary: "#FFF6E9",
        white: "#FFFFFF",
        black: "#000000",
        success: "#0D9276",
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
