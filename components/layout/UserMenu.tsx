'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div className="p-4">Loading...</div>
  }

  if (!session?.user) {
    console.log('No session or user found')
    return null
  }

  const initials = session.user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signout' })
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outlined">
            <Avatar className="h-8 w-8 bg-blue-600">
              <AvatarImage
                alt={session.user.name ?? ''}
                src={session.user.image ?? ''}
              />
              <AvatarFallback className="bg-blue-600 text-white font-medium">
                {initials || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white text-gray-900 shadow-lg border border-gray-200"
          forceMount
        >
          <DropdownMenuLabel className="font-normal bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-gray-600">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:bg-gray-100"
            onClick={() => router.push('/profile')}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
            onClick={handleSignOut}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
