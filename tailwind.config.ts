import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "mblue-500": "#35c9cc",
        "mblue-700": "#268f91",
        "mgray-100": "#d0d0d0",
        "mgray-300": "#999999",
        "mgray-500": "#676767",
        "mgray-800": "#393939",
        "mdblue-300": "#597390",
      "mdblue-500": "#072e5a"
      },
      "fontFamily": {
      "montserrat": "Montserrat"
 }
      
    },
  },
  plugins: [],
} satisfies Config;
