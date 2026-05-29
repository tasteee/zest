export const examples = {
	quickPreview: `import {
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem
} from '@tasteee/zest'

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md w-72">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,

	usageImport: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog
} from '@tasteee/zest'`,

	usage: `<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>New File</CommandItem>
      <CommandItem>Open File</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,

	withGroups: `<Command className="rounded-lg border shadow-md w-80">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Files">
      <CommandItem>index.tsx</CommandItem>
      <CommandItem>globals.css</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Actions">
      <CommandItem>
        New File
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Save
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,

	withShortcuts: `<CommandGroup heading="Actions">
  <CommandItem>
    New File
    <CommandShortcut>⌘N</CommandShortcut>
  </CommandItem>
  <CommandItem>
    Open File
    <CommandShortcut>⌘O</CommandShortcut>
  </CommandItem>
  <CommandItem>
    Save
    <CommandShortcut>⌘S</CommandShortcut>
  </CommandItem>
</CommandGroup>`,

	dialog: `import { useState } from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@tasteee/zest'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = event.key === 'k' && (event.metaKey || event.ctrlKey)
      if (isShortcut) {
        event.preventDefault()
        setIsOpen((previous) => !previous)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>Home</CommandItem>
          <CommandItem>Components</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`
} as const
