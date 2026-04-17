import * as React from 'react'
import { cn } from '@/lib/utils'

function ColorPicker({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type="color"
      data-slot="color-picker"
      className={cn('h-10 w-16 cursor-pointer rounded-md border border-border bg-card p-1', className)}
      {...props}
    />
  )
}

export { ColorPicker }
