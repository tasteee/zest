export const examples = {
	quickPreview: `import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut
} from '@tasteee/zest'

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Quit <MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,

	usageImport: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from '@tasteee/zest'`,

	usage: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New File</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Quit</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,

	full: `import { useState } from 'react'

export function FullMenubar() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [zoomLevel, setZoomLevel] = useState('100')

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
          <MenubarItem>Save As <MenubarShortcut>⇧⌘S</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Quit <MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Zoom</MenubarLabel>
          <MenubarRadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
            <MenubarRadioItem value="75">75%</MenubarRadioItem>
            <MenubarRadioItem value="100">100%</MenubarRadioItem>
            <MenubarRadioItem value="150">150%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,

	withSubmenu: `<MenubarMenu>
  <MenubarTrigger>Edit</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
    <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
    <MenubarSeparator />
    <MenubarSub>
      <MenubarSubTrigger>Find</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>Find <MenubarShortcut>⌘F</MenubarShortcut></MenubarItem>
        <MenubarItem>Find Next <MenubarShortcut>⌘G</MenubarShortcut></MenubarItem>
        <MenubarItem>Find Previous <MenubarShortcut>⇧⌘G</MenubarShortcut></MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`
} as const
