import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
} from '@clerk/tanstack-react-start'
import { Loader } from 'lucide-react'

import { cn } from '@/lib/utils'

import { SidebarItem } from './sidebar-item'
import { Logo } from '@/components/logo'

type SidebarProps = {
  className?: string
}

const SIDEBAR_ITEMS = [
  { label: 'Learn', href: '/learn', iconSrc: '/learn.svg' },
  { label: 'Leaderboard', href: '/leaderboard', iconSrc: '/leaderboard.svg' },
  { label: 'Quests', href: '/quests', iconSrc: '/quests.svg' },
  { label: 'Shop', href: '/shop', iconSrc: '/shop.svg' },
] as const

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        'top-0 left-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className,
      )}
    >
      <div className="pt-8 pb-7 pl-4">
        <Logo href="/learn" />
      </div>
      <div className="flex flex-1 flex-col gap-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  )
}
