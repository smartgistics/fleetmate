'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationItems } from '@/config/navigation'

interface MainNavProps {
  collapsed?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MainNav({
  collapsed = false,
  onMouseEnter,
  onMouseLeave,
}: MainNavProps) {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Main Navigation Links */}
      <nav className="flex-1 px-2 mt-5">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path

          return (
            <Link
              className={`
                ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } 
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${collapsed ? 'justify-center' : 'justify-start'}
                transition-all duration-300 ease-in-out
              `}
              href={item.path}
              key={item.path}
            >
              <div
                className={`
                  ${
                    isActive
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-300'
                  }
                  flex-shrink-0
                  transition-all duration-300 ease-in-out
                  ${collapsed ? 'w-5' : 'w-5 mr-3'}
                `}
              >
                {item.icon}
              </div>
              <span
                className={`
                  transition-all duration-300 ease-in-out
                  ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                  overflow-hidden whitespace-nowrap
                `}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
