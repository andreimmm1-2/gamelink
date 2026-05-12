// Global design tokens and theme colors
export const THEME = {
  // Color palette
  colors: {
    // Greys (primary)
    darkBg: '#0f172a',      // Darkest background
    bg900: '#1a202c',       // Very dark grey
    bg800: '#2d3748',       // Dark grey
    bg700: '#4a5568',       // Medium dark grey
    bg600: '#718096',       // Medium grey
    
    // Accents (muted)
    purple: '#6366f1',      // Muted indigo
    purpleLight: '#93a0f8', // Softer light indigo
    
    // Semantics
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // Text
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  // Typography
  font: {
    family: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
}

export default THEME
