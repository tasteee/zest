export const examples = {
	quickPreview: `import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuLink, navigationMenuTriggerStyle
} from '@tasteee/zest'

export function NavMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/components" className={navigationMenuTriggerStyle()}>
            Components
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,

	usageImport: `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from '@tasteee/zest'`,

	usage: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,

	withDropdown: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-64">
          <li>
            <NavigationMenuLink href="/docs/overview">
              <div className="font-medium mb-1">Overview</div>
              <p className="text-sm text-muted-foreground">Introduction to the design system.</p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/installation">
              <div className="font-medium mb-1">Installation</div>
              <p className="text-sm text-muted-foreground">How to install and configure.</p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/components" className={navigationMenuTriggerStyle()}>
        Components
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,

	withGrid: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-2 p-4 w-96">
          <li>
            <NavigationMenuLink href="/docs/components/button">Button</NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/components/card">Card</NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/components/input">Input</NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/components/dialog">Dialog</NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`
} as const
