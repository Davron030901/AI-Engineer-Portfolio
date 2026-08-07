import type { Config } from "tailwindcss";

/**
 * Every colour is a CSS variable holding a space-separated RGB triple, defined
 * twice in globals.css: once for light, once for dark. The two palettes are
 * tuned independently — dark is not an inversion of light.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        raised: token("raised"),
        line: token("line"),
        "line-strong": token("line-strong"),
        ink: token("ink"),
        "ink-muted": token("ink-muted"),
        "ink-subtle": token("ink-subtle"),
        primary: token("primary"),
        "primary-ink": token("primary-ink"),
        "primary-soft": token("primary-soft"),
        accent: token("accent"),
        "accent-soft": token("accent-soft"),
        violet: token("violet"),
        "violet-soft": token("violet-soft"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        mini: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.7" }],
        lead: ["clamp(1.0625rem, 0.99rem + 0.36vw, 1.25rem)", { lineHeight: "1.65" }],
        h3: ["clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", { lineHeight: "1.35" }],
        h2: ["clamp(1.5rem, 1.2rem + 1.2vw, 2rem)", { lineHeight: "1.2" }],
        h1: ["clamp(2rem, 1.4rem + 2.6vw, 3rem)", { lineHeight: "1.1" }],
        display: [
          "clamp(2.625rem, 1.55rem + 4.9vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
      },
      spacing: {
        section: "clamp(4.5rem, 3rem + 6vw, 8rem)",
        gutter: "clamp(1.25rem, 0.5rem + 3vw, 3rem)",
      },
      maxWidth: {
        shell: "76rem",
        prose: "42rem",
      },
      borderRadius: {
        card: "0.75rem",
      },
      transitionTimingFunction: {
        rule: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "tick-in": {
          from: { transform: "scaleX(0)", opacity: "0" },
          to: { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "tick-in": "tick-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
