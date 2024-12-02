import { createTheme } from '@mui/material/styles'
import { Lato } from 'next/font/google'

import { componentsTheme } from './components'
import { lightThemeConfig } from './theme-light-config'

/*
 * Storybook and Next font loading don't play nice.
 * Bug: https://github.com/storybookjs/storybook/issues/19711
 * Solution: split the main theme and font-specific configs into separate
 * exports, then for the Next app use next/font package for font config.
 */
export const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const lightTheme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
    body1: {
      lineHeight: 1.2,
    },
  },
  ...lightThemeConfig,
  ...componentsTheme,
} as any)

export { lightTheme }
