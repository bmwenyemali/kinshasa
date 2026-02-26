import React, { createContext, useContext } from "react";

export const colors = {
  primary: "#0077BE",
  primaryDark: "#005A91",
  secondary: "#FDB913",
  secondaryDark: "#E5A511",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  foreground: "#1E293B",
  muted: "#64748B",
  mutedForeground: "#94A3B8",
  border: "#E2E8F0",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

const theme = {
  colors,
  spacing,
  fontSize,
  borderRadius,
};

type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default theme;
