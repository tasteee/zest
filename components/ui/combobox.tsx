import * as React from 'react'
import { cn } from '@/lib/utils'

type ComboboxProps = React.ComponentProps<'input'> & {
  options: string[]
  listId?: string
}

function Combobox({ options, listId = 'z-combobox-options', className, ...props }: ComboboxProps) {
  return (
    <>
      <input
        data-slot="combobox"
        role="combobox"
        list={listId}
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
          className,
        )}
        {...props}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </>
  )
}

export { Combobox }
