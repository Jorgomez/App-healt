// src/theme/index.ts
export const colors = {
  background: '#FFFFFF',
  primary: '#007AFF',
  text: '#000000',
  error: '#FF3B30',
  gray: '#8E8E93'
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
}

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const
  }
}
