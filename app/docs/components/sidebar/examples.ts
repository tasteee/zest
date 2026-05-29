export const examples = {
	quickPreview: `import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarInset, SidebarTrigger
} from '@tasteee/zest'
import { Home, Settings, Users } from 'lucide-react'

const navItems = [
  { title: 'Home', icon: Home, href: '/' },
  { title: 'Users', icon: Users, href: '/users' },
  { title: 'Settings', icon: Settings, href: '/settings' }
]

export function SidebarDemo() {
  return (
    <SidebarProvider style={{ '--sidebar-width': '200px' }}>
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold text-sm px-2">My App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground px-2">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center px-4 border-b gap-2">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <main className="p-4 text-sm text-muted-foreground">
          Main content area
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}`,

	usageImport: `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '@tasteee/zest'`,

	usage: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo / brand</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">Dashboard</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer content</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    {/* Page content */}
  </SidebarInset>
</SidebarProvider>`,

	useSidebarHook: `import { useSidebar } from '@tasteee/zest'

export function MyComponent() {
  const { state, toggleSidebar, isMobile } = useSidebar()

  return (
    <div>
      <p>Sidebar is {state}</p>
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  )
}`,

	subMenu: `<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>Parent</SidebarMenuButton>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <a href="/child">Child item</a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>`
} as const
