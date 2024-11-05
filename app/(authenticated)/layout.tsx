'use client'

import React from 'react'
import { SidebarNav } from "@/components/sidebar-nav"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden border-r bg-gray-100/40 lg:block lg:w-72">
        <div className="flex h-full flex-col">
          <SidebarNav className="flex-1" />
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
} 