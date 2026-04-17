import * as React from 'react'
import { cn } from '@/lib/utils'

function CodeBlock({ className, ...props }: React.ComponentProps<'pre'>) {
  return (
    <pre
      data-slot="codeblock"
      className={cn(
        'overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm text-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { CodeBlock }
