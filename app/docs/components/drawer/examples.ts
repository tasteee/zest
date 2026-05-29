export const examples = {
	quickPreview: `import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from '@tasteee/zest'

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Your content goes here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button>Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,

	usageImport: `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from '@tasteee/zest'`,

	usage: `<Drawer>
  <DrawerTrigger asChild>
    <button>Open</button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <button>Cancel</button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,

	fromRight: `<Drawer direction="right">
  <DrawerTrigger asChild>
    <button>Open Right Panel</button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Configure your preferences.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 flex-1 overflow-auto">
      <p className="text-sm text-muted-foreground">Panel content here.</p>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <button>Done</button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,

	controlled: `import { useState } from 'react'

export function ControlledDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => { setIsOpen(true) }
  const handleClose = () => { setIsOpen(false) }

  return (
    <>
      <button onClick={handleOpen}>Open</button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled Drawer</DrawerTitle>
            <DrawerDescription>Open state is managed externally.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <button onClick={handleClose}>Close</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}`
} as const
