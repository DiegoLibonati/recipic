/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js,ts}", "./src/**/*.{html,js,ts}"],
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
    },
  },
  plugins: [],
};
