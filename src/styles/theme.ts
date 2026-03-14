export const theme = {
  colors: {
    active: "#2c4be2",
    disabled: "#808080",
    success: "#30d158",
    error: "#ff453a",
  },
} as const;

export type Theme = typeof theme;
