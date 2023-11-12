import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  "html, body": {
    backgroundColor: "emerald.400!",
    lineHeight: "1.5",
  },
});

export default defineConfig({
  // Whether to use css reset
  presets: ["@shadow-panda/preset"],
  globalCss,
  preflight: true,
  jsxFramework: "react",

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // Override `semanticTokens`
      semanticTokens: {
        // Example: Set primary color to another value
        colors: {
          primary: {
            DEFAULT: {
              value: {
                // Light mode
                base: "{colors.grayscale.900}",
                // Dark mode
                _dark: "{colors.grayscale.50}",
              },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  emitPackage: true,
  outdir: "@shadow-panda/styled-system",
});
