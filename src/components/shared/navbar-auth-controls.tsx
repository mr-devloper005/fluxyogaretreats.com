'use client'

import Link from 'next/link'
import { LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <Button
        size="sm"
        asChild
        className="h-10 gap-2 rounded-full bg-[linear-gradient(90deg,#a855f7,#ec4899)] px-4 text-white shadow-[0_14px_36px_rgba(168,85,247,0.35)] hover:brightness-105"
      >
        <Link href="/create/article">
          <Plus className="h-4 w-4" />
          Write article
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-600 hover:bg-violet-50 hover:text-violet-800">
            <Avatar className="h-9 w-9 border border-violet-100">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-white/60 bg-white/90 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-violet-100">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{user?.name}</span>
              <span className="truncate text-xs text-slate-500">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
