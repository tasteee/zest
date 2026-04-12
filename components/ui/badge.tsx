import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        // Brand neon variants - solid
        green:
          'border-transparent bg-neon-green text-primary-foreground [a&]:hover:opacity-90',
        purple:
          'border-transparent bg-neon-purple text-primary-foreground [a&]:hover:opacity-90',
        pink:
          'border-transparent bg-neon-pink text-primary-foreground [a&]:hover:opacity-90',
        orange:
          'border-transparent bg-neon-orange text-primary-foreground [a&]:hover:opacity-90',
        // Brand neon variants - outlined
        'green-outline':
          'border-neon-green text-neon-green bg-transparent [a&]:hover:bg-neon-green/10',
        'purple-outline':
          'border-neon-purple text-neon-purple bg-transparent [a&]:hover:bg-neon-purple/10',
        'pink-outline':
          'border-neon-pink text-neon-pink bg-transparent [a&]:hover:bg-neon-pink/10',
        'orange-outline':
          'border-neon-orange text-neon-orange bg-transparent [a&]:hover:bg-neon-orange/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
