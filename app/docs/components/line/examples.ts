export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function LineDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">tasteink Design System</h4>
        <p className="text-sm text-muted-foreground">
          A comprehensive component library.
        </p>
      </div>
      <z.line className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <z.line isVertical />
        <div>Docs</div>
        <z.line isVertical />
        <div>Source</div>
      </div>
    </div>
  )
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.line />`,

	horizontal: `<div className="space-y-4">
  <p className="text-sm">Section One Content</p>
  <z.line />
  <p className="text-sm">Section Two Content</p>
</div>`,

	vertical: `<div className="flex h-5 items-center space-x-4 text-sm">
  <span>Home</span>
  <z.line isVertical />
  <span>Products</span>
  <z.line isVertical />
  <span>About</span>
  <z.line isVertical />
  <span>Contact</span>
</div>`,

	inACard: `<Card className="w-full max-w-sm">
  <CardContent className="p-6">
    <div className="space-y-1">
      <h3 className="font-semibold">Account Settings</h3>
      <p className="text-sm text-muted-foreground">
        Manage your account preferences
      </p>
    </div>
    <z.line className="my-4" />
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Email Notifications</span>
        <span className="text-muted-foreground">Enabled</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Two-Factor Auth</span>
        <span className="text-muted-foreground">Active</span>
      </div>
    </div>
    <z.line className="my-4" />
    <p className="text-xs text-muted-foreground">
      Last updated: 2 days ago
    </p>
  </CardContent>
</Card>`
} as const
