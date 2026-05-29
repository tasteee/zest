export const examples = {
	quickPreview: `import { Popover, PopoverTrigger, PopoverContent } from '@tasteee/zest'

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">This is a popover. Add any content here.</p>
      </PopoverContent>
    </Popover>
  )
}`,

	usageImport: `import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from '@tasteee/zest'`,

	usage: `<Popover>
  <PopoverTrigger asChild>
    <button>Open</button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content</p>
  </PopoverContent>
</Popover>`,

	alignment: `{/* Aligned to start */}
<Popover>
  <PopoverTrigger asChild><button>Align Start</button></PopoverTrigger>
  <PopoverContent align="start">
    <p className="text-sm">Aligned to the start of the trigger.</p>
  </PopoverContent>
</Popover>

{/* Aligned to end */}
<Popover>
  <PopoverTrigger asChild><button>Align End</button></PopoverTrigger>
  <PopoverContent align="end">
    <p className="text-sm">Aligned to the end of the trigger.</p>
  </PopoverContent>
</Popover>`,

	withForm: `<Popover>
  <PopoverTrigger asChild>
    <button>Edit Settings</button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="flex flex-col gap-3">
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input className="w-full rounded-md border px-3 py-1.5 text-sm" defaultValue="John Doe" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Username</label>
        <input className="w-full rounded-md border px-3 py-1.5 text-sm" defaultValue="@johndoe" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,

	controlled: `import { useState } from 'react'

export function ControlledPopover() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button>Toggle</button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Controlled popover.</p>
        <button onClick={() => setIsOpen(false)}>Dismiss</button>
      </PopoverContent>
    </Popover>
  )
}`
} as const
