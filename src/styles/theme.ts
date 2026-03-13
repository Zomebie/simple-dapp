export const theme = {
  colors: {
    primary: "#2c4be2",
    primaryHover: "#2440c8",

    text: "#1d1d1f",
    textSecondary: "#86868b",
    textPlaceholder: "#aeaeb2",

    background: "#f5f5f7",
    surface: "#ffffff",
    surfaceSecondary: "#f2f2f6",

    success: "#30d158",
    successDark: "#28bd4e",
    successDot: "#34c759",

    error: "#ff453a",
    errorDark: "#e8352c",

    disabled: "#808080",

    border: "rgba(0, 0, 0, 0.04)",
  },
  shadows: {
    card: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)",
    cardHover: "0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.05)",
    toast: {
      success: "0 4px 16px rgba(48, 209, 88, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08)",
      error: "0 4px 16px rgba(255, 69, 58, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    focusPrimary: "0 0 0 3px rgba(44, 75, 226, 0.1)",
    focusError: "0 0 0 3px rgba(255, 69, 58, 0.12)",
  },
  fonts: {
    sans: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    mono: `"SF Mono", SFMono-Regular, ui-monospace, monospace`,
  },
  fontSizes: {
    header: "24px",
    cardTitle: "20px",
    cardContent: "16px",
    input: "12px",
    button: "16px",
  },
} as const;

export type Theme = typeof theme;
