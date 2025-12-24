'use client'

import { Link, useRouterState } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

type SidebarItemProps = {
  label: string
  iconSrc: string
  href: string
}

export function SidebarItem({ label, iconSrc, href }: SidebarItemProps) {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const active = pathname === href

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="h-[52px] justify-start"
      asChild
    >
      <Link to={href}>
        <img
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  )
}
