import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { cn } from '@/lib/utils'

import { SidebarItem } from './sidebar-item'

type Props = {
  className?: string
}

export function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        'top-0 left-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className,
      )}
    >
      <Link to="/learn">
        <div className="flex items-center gap-x-3 pt-8 pb-7 pl-4">
          <img src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="font-extrabold text-2xl text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="shop" href="/shop" iconSrc="/shop.svg" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  )
}
