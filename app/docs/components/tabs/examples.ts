export const examples = {
	quickPreview: `import { ZTabs, ZTabsContent, ZTabsList, ZTabsTrigger } from '@tasteee/zest'

export function TabsDemo() {
  return (
    <ZTabs defaultValue="account" className="w-100">
      <ZTabsList>
        <ZTabsTrigger value="account">Account</ZTabsTrigger>
        <ZTabsTrigger value="password">Password</ZTabsTrigger>
      </ZTabsList>
      <ZTabsContent value="account">
        Make changes to your account here.
      </ZTabsContent>
      <ZTabsContent value="password">
        Change your password here.
      </ZTabsContent>
    </ZTabs>
  )
}`,

	usageImport: `import { ZTabs, ZTabsContent, ZTabsList, ZTabsTrigger } from '@tasteee/zest'`,

	usage: `<ZTabs defaultValue="account">
  <ZTabsList>
    <ZTabsTrigger value="account">Account</ZTabsTrigger>
    <ZTabsTrigger value="password">Password</ZTabsTrigger>
  </ZTabsList>
  <ZTabsContent value="account">Account content</ZTabsContent>
  <ZTabsContent value="password">Password content</ZTabsContent>
</ZTabs>`,

	withCards: `<Tabs defaultValue="account" className="w-full max-w-lg">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  </TabsContent>
</Tabs>`,

	withIcons: `<Tabs defaultValue="profile" className="w-full max-w-md">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="profile" className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span className="hidden sm:inline">Profile</span>
    </TabsTrigger>
    <TabsTrigger value="billing" className="flex items-center gap-2">
      <CreditCard className="h-4 w-4" />
      <span className="hidden sm:inline">Billing</span>
    </TabsTrigger>
    <TabsTrigger value="notifications" className="flex items-center gap-2">
      <Bell className="h-4 w-4" />
      <span className="hidden sm:inline">Alerts</span>
    </TabsTrigger>
    <TabsTrigger value="settings" className="flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span className="hidden sm:inline">Settings</span>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile" className="mt-6">
    <p className="text-sm text-muted-foreground">
      Manage your profile information and preferences.
    </p>
  </TabsContent>
  <TabsContent value="billing" className="mt-6">
    <p className="text-sm text-muted-foreground">
      View and manage your billing information.
    </p>
  </TabsContent>
  <TabsContent value="notifications" className="mt-6">
    <p className="text-sm text-muted-foreground">
      Configure your notification preferences.
    </p>
  </TabsContent>
  <TabsContent value="settings" className="mt-6">
    <p className="text-sm text-muted-foreground">
      Adjust your account settings.
    </p>
  </TabsContent>
</Tabs>`,

	disabledTab: `<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
</Tabs>`
} as const
