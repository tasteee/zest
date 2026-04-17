import * as React from 'react'
import { cn } from '@/lib/utils'

function Chip({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="chip"
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/80',
        className,
      )}
      {...props}
    />
  )
}

export { Chip }
