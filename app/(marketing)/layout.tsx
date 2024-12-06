'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

import { lightTheme } from '@/app/themes/theme-light'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-white">{children}</div>
    </ThemeProvider>
  )
}
