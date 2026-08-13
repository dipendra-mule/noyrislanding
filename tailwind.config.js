/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Noyris theme palette */
        ink: "#1A1714",
        paper: "#F7F4EF",
        mist: "#6E675F",
        line: "#D9D2C7",
        card: "#FFFFFF",
        lime: "#363636",
        brand: {
          /* Matches the app's brand Noyris theme (rainbow-trail): neutral
             charcoal accent — OKLCH(0.333 0 90), never blue-tinted. */
          DEFAULT: "#363636",
          dark: "#1F1F1F",
          fg: "#FFFFFF",
          ink: "#1F1F1F",
          sub: "#424242",
          light: "#5F5F5F",
          border: "#E4E4E4",
          line: "#E4E4E4",
          surface: "#F5F5F5",
          hover: "#EBEBEB",
          faint: "#E1E1E1",
          badge: "#EBEBEB",
        },
        brandblue: "#E5DDD0",
        navy: "#090909",
        success: "#21A45C",
        destructive: "#EF4345",
        warning: "#F59F05",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["11px", "1.4"],
        sm: ["14px", "1.4"],
        base: ["15px", "1.45"],
        body: ["13px", "1.45"],
        md: ["15px", "1.4"],
        lg: ["17px", "1.3"],
        xl: ["20px", "1.3"],
        "2xl": ["24px", "1.25"],
        "3xl": ["30px", "1.2"],
        "4xl": ["36px", "1.15"],
      },
      boxShadow: {
        "macos-1": "0 1px 3px rgba(54,54,54,0.06), 0 1px 2px rgba(54,54,54,0.04)",
        "macos-2": "0 4px 12px rgba(54,54,54,0.08), 0 2px 4px rgba(54,54,54,0.05)",
        "macos-3": "0 8px 30px rgba(54,54,54,0.1), 0 4px 8px rgba(54,54,54,0.06)",
        "macos-4": "0 20px 60px rgba(54,54,54,0.14), 0 8px 20px rgba(54,54,54,0.08)",
        "glow-sm": "0 4px 10px rgba(54,54,54,0.25)",
        "glow-lg": "0 16px 40px rgba(54,54,54,0.4)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        macos: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        heroIn: {
          from: { opacity: 0, transform: "translateY(22px)", filter: "blur(6px)" },
          to: { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        },
        cursorBlink: {
          "0%, 45%": { opacity: 1 },
          "50%, 95%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drift: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blobFloat: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-16px) scale(1.05)" },
          "66%": { transform: "translate(-16px,14px) scale(0.97)" },
        },
        kenBurns: {
          from: { transform: "scale(1.12) translateY(0)" },
          to: { transform: "scale(1) translateY(-2%)" },
        },
        ghostDrift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(8px,-14px)" },
          "50%": { transform: "translate(-6px,6px)" },
          "75%": { transform: "translate(6px,10px)" },
        },
      },
      animation: {
        heroIn: "heroIn 0.9s cubic-bezier(.16,1,.3,1) both",
        cursorBlink: "cursorBlink 1s step-end infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        drift: "drift 34s linear infinite",
        blobFloat: "blobFloat 16s ease-in-out infinite",
        kenBurns: "kenBurns 16s ease-out forwards",
        ghostDrift: "ghostDrift ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
