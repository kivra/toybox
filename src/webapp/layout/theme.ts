import { CSSVariablesResolver, createTheme } from "@mantine/core";

export const themeSettings = createTheme({
  focusRing: "always",
  breakpoints: {
    xs: "640px",
    sm: "960px",
    md: "1280px",
  },
  fontSmoothing: true,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  fontSizes: {
    xs: "14px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.4",
    md: "1.5",
    lg: "1.5",
  },
  headings: {
    fontFamily: "'Kivra Sans', sans-serif",
    sizes: {
      h1: {
        fontWeight: "700",
        fontSize: "40px",
        lineHeight: "1.1",
      },
      h2: {
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "1.1",
      },
      h3: {
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "1.1",
      },
      h4: {
        fontWeight: "700",
        fontSize: "20px",
        lineHeight: "1.1",
      },
      h5: {
        fontWeight: "700",
        fontSize: "17px",
        lineHeight: "1.2",
      },
    },
  },
  other: {
    white65: "rgba(255, 255, 255, 0.65)",
    white80: "rgba(255, 255, 255, 0.80)",
    black20: "rgba(0, 0, 0, 0.20)",
    black65: "rgba(0, 0, 0, 0.65)",
    white: "#FFFFFF",
    beige100: "#F8F6F3",
    beige200: "#F2EEEB",
    beige300: "#EFEBE7",
    beige400: "#EBE7E3",
    beige500: "#E8E3DF",
    dark50: "#141414",
    dark100: "#1A1A1A",
    dark200: "#1F1F1F",
    dark300: "#292929",
    dark400: "#2E2E2E",
    dark500: "#3D3D3D",
    green400: "#178000",
  },
});

export const cssVariables: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--text-primary": theme.other["dark200"],
    "--text-secondary": theme.other["black65"],
    "--bg-primary ": theme.other["beige100"],
    "--surface-100": theme.other["white"],
    "--surface-200": theme.other["beige200"],
    "--surface-300": theme.other["beige300"],
    "--surface-400": theme.other["beige400"],
    "--surface-white-80": theme.other["white80"],
    "--surface-white": theme.other["white"],
    "--border": theme.other["beige400"],
    "--border-distinct": theme.other["beige500"],
    "--border-none-dark": theme.other["beige400"],
    "--green-primary": theme.other["green400"],
    // mantine overrides
    "--mantine-color-text": theme.other["dark200"],
    "--mantine-color-body": theme.other["beige100"],
  },
  dark: {
    "--text-primary": theme.other["beige200"],
    "--text-secondary": theme.other["white65"],
    "--bg-primary ": theme.other["dark50"],
    "--surface-100": theme.other["dark100"],
    "--surface-200": theme.other["dark200"],
    "--surface-300": theme.other["dark300"],
    "--surface-400": theme.other["dark400"],
    "--surface-white-80": theme.other["black20"],
    "--surface-white": theme.other["white"],
    "--border": theme.other["dark400"],
    "--border-distinct": theme.other["dark500"],
    "--green-primary": "#4CBA34",
    // mantine overrides
    "--mantine-color-text": theme.other["beige200"],
    "--mantine-color-body": theme.other["dark50"],
  },
});
