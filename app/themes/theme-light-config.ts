import styles from '@/styles/sass-variables.module.sass'

// Also be sure to extend any MUI components' interfaces that you may be
// using a non-standard color prop value on. See /types.ts
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
  }
}

export const lightThemeConfig = {
  palette: {
    primary: {
      main: styles.primaryColor,
    },
    secondary: {
      main: styles.secondaryColor,
    },
    neutral: {
      main: styles.neutralColor,
      contrastText: styles.charcoal,
    },
    text: {
      primary: styles.textColor,
    },
    error: {
      main: styles.errorColor,
    },
    warning: {
      main: styles.warningColor,
    },
    success: {
      main: styles.successColor,
    },
    white: {
      main: styles.white,
    },
    muted: styles.neutralColor,
  },
}
