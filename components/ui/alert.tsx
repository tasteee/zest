import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
        // Brand neon variants
        success:
          'border-neon-green/50 bg-neon-green/10 text-neon-green [&>svg]:text-neon-green *:data-[slot=alert-description]:text-neon-green/80',
        warning:
          'border-neon-orange/50 bg-neon-orange/10 text-neon-orange [&>svg]:text-neon-orange *:data-[slot=alert-description]:text-neon-orange/80',
        info:
          'border-neon-purple/50 bg-neon-purple/10 text-neon-purple [&>svg]:text-neon-purple *:data-[slot=alert-description]:text-neon-purple/80',
        accent:
          'border-neon-pink/50 bg-neon-pink/10 text-neon-pink [&>svg]:text-neon-pink *:data-[slot=alert-description]:text-neon-pink/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

// Compound component pattern
const AlertNamespace = Object.assign(Alert, {
  Title: AlertTitle,
  Description: AlertDescription,
})

export { AlertNamespace as Alert }
