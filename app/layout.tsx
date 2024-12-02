import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.sass'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from '@/components/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FleetMate TMS',
  description: 'Transportation Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
