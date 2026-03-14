export const theme = {
  colors: {
    active: "#2c4be2",
    disabled: "#808080",
    success: "#30d158",
    error: "#ff453a",
  },
  fonts: {
    sans: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  },
} as const;

export type Theme = typeof theme;
