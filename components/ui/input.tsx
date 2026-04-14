import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-accent selection:text-accent-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      focusColor: {
        default: 'focus-visible:border-foreground/50 focus-visible:ring-foreground/20 focus-visible:ring-[3px]',
        green: 'focus-visible:border-neon-green focus-visible:ring-neon-green/30 focus-visible:ring-[3px]',
        purple: 'focus-visible:border-neon-purple focus-visible:ring-neon-purple/30 focus-visible:ring-[3px]',
        pink: 'focus-visible:border-neon-pink focus-visible:ring-neon-pink/30 focus-visible:ring-[3px]',
        orange: 'focus-visible:border-neon-orange focus-visible:ring-neon-orange/30 focus-visible:ring-[3px]',
      },
    },
    defaultVariants: {
      focusColor: 'default',
    },
  },
)

function Input({
  className,
  type,
  focusColor,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ focusColor }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
