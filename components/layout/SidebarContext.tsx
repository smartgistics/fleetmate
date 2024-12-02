'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  isOpen: boolean
  isPinned: boolean
  toggle: (value: boolean) => void
  togglePin: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  const toggle = (value: boolean) => {
    if (!isPinned) {
      setIsOpen(value)
    }
  }

  const togglePin = () => {
    if (isPinned) {
      setIsPinned(false)
      setIsOpen(false)
    } else {
      setIsPinned(true)
      setIsOpen(true)
    }
  }

  return (
    <SidebarContext.Provider value={{ isOpen, isPinned, toggle, togglePin }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
