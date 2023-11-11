import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  "html, body": {
    backgroundColor: "quaternary",
    lineHeight: "1.5",
  },
});

export default defineConfig({
  // Whether to use css reset
  globalCss,
  preflight: true,
  jsxFramework: "react",

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        primary: { value: "#9a8c98" },
        secondary: { value: "#4A4E69" },
        tertiary: { value: "#C9ADA7" },
        quaternary: { value: "#f2e9e4" },
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
