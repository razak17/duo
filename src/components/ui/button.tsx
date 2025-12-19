import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold text-sm uppercase tracking-wide outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        locked:
          'border-neutral-400 border-b-4 bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 active:border-b-0',
        default:
          'border-2 border-slate-200 border-b-4 bg-white text-black text-slate-500 hover:bg-slate-100 active:border-b-2',
        primary:
          'border-sky-500 border-b-4 bg-sky-400 text-primary-foreground hover:bg-sky-400/90 active:border-b-0',
        primaryOutline: 'bg-white text-sky-500 hover:bg-slate-100',
        secondary:
          'border-green-600 border-b-4 bg-green-500 text-primary-foreground hover:bg-green-500/90 active:border-b-0',
        secondaryOutline: 'bg-white text-green-500 hover:bg-slate-100',
        danger:
          'border-rose-600 border-b-4 bg-rose-500 text-primary-foreground hover:bg-rose-500/90 active:border-b-0',
        dangerOutline: 'bg-white text-rose-500 hover:bg-slate-100',
        super:
          'border-indigo-600 border-b-4 bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 active:border-b-0',
        superOutline: 'bg-white text-indigo-500 hover:bg-slate-100',
        ghost:
          'border-0 border-transparent bg-transparent text-slate-500 hover:bg-slate-100',
        sidebar:
          'border-2 border-transparent bg-transparent text-slate-500 transition-none hover:bg-slate-100',
        sidebarOutline:
          'border-2 border-sky-300 bg-sky-500/15 text-sky-500 transition-none hover:bg-sky-500/20',
      },
      size: {
        default: 'h-11 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-8 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
