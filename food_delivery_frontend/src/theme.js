export const colors = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827'
}

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24
}

export const shadows = {
  sm: 0x00000020, // semi-transparent for subtle drop shadow effect via alpha surfaces
}

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32
}

// PUBLIC_INTERFACE
export const theme = {
  name: 'Ocean Professional',
  backgroundColor: colors.background,
  surfaceColor: colors.surface,
  textColor: colors.text,
  primaryColor: colors.primary,
  secondaryColor: colors.secondary,
  errorColor: colors.error,
  radii,
  spacing,
  shadows
}
