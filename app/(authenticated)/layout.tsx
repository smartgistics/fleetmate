'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

import { SidebarProvider } from '@/components/layout/SidebarContext'
import { Sidebar } from '@/components/layout/Sidebar'
import { MainContent } from '@/components/layout/MainContent'
import { lightTheme } from '@/app/themes/theme-light'

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SidebarProvider>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </ThemeProvider>
  )
}
