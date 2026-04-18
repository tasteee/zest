import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap overflow-hidden rounded-md border font-medium transition-[color,background-color,border-color,box-shadow] [&>svg]:pointer-events-none [&>svg]:size-3 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      kind: {
        outline: '',
        ghost: 'border-transparent bg-transparent',
        solid: 'border-transparent',
      },
      color: {
        white: '',
        green: '',
        purple: '',
        pink: '',
        orange: '',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    compoundVariants: [
      {
        kind: 'outline',
        color: 'white',
        className:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      {
        kind: 'outline',
        color: 'green',
        className:
          'border-neon-green text-neon-green [a&]:hover:bg-neon-green/10',
      },
      {
        kind: 'outline',
        color: 'purple',
        className:
          'border-neon-purple text-neon-purple [a&]:hover:bg-neon-purple/10',
      },
      {
        kind: 'outline',
        color: 'pink',
        className: 'border-neon-pink text-neon-pink [a&]:hover:bg-neon-pink/10',
      },
      {
        kind: 'outline',
        color: 'orange',
        className:
          'border-neon-orange text-neon-orange [a&]:hover:bg-neon-orange/10',
      },
      {
        kind: 'ghost',
        color: 'white',
        className: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      {
        kind: 'ghost',
        color: 'green',
        className: 'text-neon-green [a&]:hover:bg-neon-green/10',
      },
      {
        kind: 'ghost',
        color: 'purple',
        className: 'text-neon-purple [a&]:hover:bg-neon-purple/10',
      },
      {
        kind: 'ghost',
        color: 'pink',
        className: 'text-neon-pink [a&]:hover:bg-neon-pink/10',
      },
      {
        kind: 'ghost',
        color: 'orange',
        className: 'text-neon-orange [a&]:hover:bg-neon-orange/10',
      },
      {
        kind: 'solid',
        color: 'white',
        className: 'bg-foreground text-background [a&]:hover:opacity-90',
      },
      {
        kind: 'solid',
        color: 'green',
        className: 'bg-neon-green text-primary-foreground [a&]:hover:opacity-90',
      },
      {
        kind: 'solid',
        color: 'purple',
        className: 'bg-neon-purple text-primary-foreground [a&]:hover:opacity-90',
      },
      {
        kind: 'solid',
        color: 'pink',
        className: 'bg-neon-pink text-primary-foreground [a&]:hover:opacity-90',
      },
      {
        kind: 'solid',
        color: 'orange',
        className: 'bg-neon-orange text-primary-foreground [a&]:hover:opacity-90',
      },
    ],
    defaultVariants: {
      kind: 'outline',
      color: 'white',
      size: 'md',
    },
  },
)

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }

function Badge({
  className,
  kind,
  color,
  size,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ kind, color, size }), className)}
      {...props}
    />
  )
}

const ZBadge = Badge

export { Badge, ZBadge, badgeVariants }
export type { BadgeProps }
