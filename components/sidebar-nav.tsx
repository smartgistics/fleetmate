'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Settings,
  Calculator 
} from "lucide-react"
import Link from "next/link"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500',
    },
    {
      label: 'Loads',
      icon: Truck,
      href: '/loads',
      color: 'text-violet-500',
    },
    {
      label: 'Carriers',
      icon: Users,
      href: '/carriers',
      color: 'text-pink-500',
    },
    {
      label: 'SmartLane',
      icon: Calculator,
      href: '/smartlane',
      color: 'text-orange-500',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      color: 'text-gray-500',
    },
  ]

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 