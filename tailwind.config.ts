import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./*.{html,js,ts,jsx,tsx}", "./src/**/*.{html,js,ts,jsx,tsx}"],
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

export default config;
