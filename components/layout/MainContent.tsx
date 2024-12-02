'use client'

import { Suspense } from 'react'
import { GlobalSearch } from '@/components/search/GlobalSearch'
import { useSidebar } from './SidebarContext'
import { UserMenu } from './UserMenu'

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isPinned } = useSidebar()

  return (
    <div className={`main-content ${isPinned ? 'pinned' : ''}`}>
      <header className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <h1 className="text-2xl font-semibold text-gray-900">
              FleetMate TMS
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
            <Suspense fallback={<div>Loading...</div>}>
              <GlobalSearch />
            </Suspense>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto bg-white">{children}</div>
    </div>
  )
}
