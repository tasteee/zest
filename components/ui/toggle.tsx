'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 'bg-transparent data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        // Brand neon variants
        green:
          'bg-transparent data-[state=on]:bg-neon-green data-[state=on]:text-primary-foreground hover:bg-neon-green/10',
        purple:
          'bg-transparent data-[state=on]:bg-neon-purple data-[state=on]:text-primary-foreground hover:bg-neon-purple/10',
        pink:
          'bg-transparent data-[state=on]:bg-neon-pink data-[state=on]:text-primary-foreground hover:bg-neon-pink/10',
        orange:
          'bg-transparent data-[state=on]:bg-neon-orange data-[state=on]:text-primary-foreground hover:bg-neon-orange/10',
        // Brand neon outline variants
        'green-outline':
          'border border-input bg-transparent shadow-xs data-[state=on]:border-neon-green data-[state=on]:text-neon-green hover:border-neon-green/50',
        'purple-outline':
          'border border-input bg-transparent shadow-xs data-[state=on]:border-neon-purple data-[state=on]:text-neon-purple hover:border-neon-purple/50',
        'pink-outline':
          'border border-input bg-transparent shadow-xs data-[state=on]:border-neon-pink data-[state=on]:text-neon-pink hover:border-neon-pink/50',
        'orange-outline':
          'border border-input bg-transparent shadow-xs data-[state=on]:border-neon-orange data-[state=on]:text-neon-orange hover:border-neon-orange/50',
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
