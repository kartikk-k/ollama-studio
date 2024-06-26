import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#31353B",
        secondary: "#24272B",
        ring: "#404750",
        "secondary-foreground": "#6D7884",

      },fontSize: {
        'xxs': '10px'
      }
    },
  },
  plugins: [],
};
export default config;
