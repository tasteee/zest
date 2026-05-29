export const examples = {
	quickPreview: `import { ZCard } from '@tasteee/zest'

export function CardDemo() {
  return (
    <ZCard className="w-87.5">
      <ZCard.Header>
        <ZCard.Title>Card Title</ZCard.Title>
        <ZCard.Description>Card Description</ZCard.Description>
      </ZCard.Header>
      <ZCard.Content>
        <p>Card Content</p>
      </ZCard.Content>
      <ZCard.Footer>
        <p>Card Footer</p>
      </ZCard.Footer>
    </ZCard>
  )
}`,

	usageImport: `import { ZCard } from '@tasteee/zest'`,

	usage: `<ZCard>
  <ZCard.Header>
    <ZCard.Title>Card Title</ZCard.Title>
    <ZCard.Description>Card Description</ZCard.Description>
  </ZCard.Header>
  <ZCard.Content>
    <p>Card Content</p>
  </ZCard.Content>
  <ZCard.Footer>
    <p>Card Footer</p>
  </ZCard.Footer>
</ZCard>`,

	formCard: `import { ZCard, z, ZInput, ZLabel } from '@tasteee/zest'

<ZCard className="w-87.5">
  <ZCard.Header>
    <ZCard.Title>Create project</ZCard.Title>
    <ZCard.Description>Deploy your new project in one-click.</ZCard.Description>
  </ZCard.Header>
  <ZCard.Content>
    <form>
      <div className="grid w-full gap-4">
        <div className="flex flex-col space-y-1.5">
          <ZLabel htmlFor="name">Name</ZLabel>
          <ZInput id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </ZCard.Content>
  <ZCard.Footer className="flex justify-between">
    <z.button>Cancel</z.button>
    <z.button>Deploy</z.button>
  </ZCard.Footer>
</ZCard>`,

	notificationsCard: `import { ZCard, ZSwitch } from '@tasteee/zest'
import { Bell, CreditCard } from 'lucide-react'

<ZCard className="w-95">
  <ZCard.Header>
    <ZCard.Title>Notifications</ZCard.Title>
    <ZCard.Description>Choose what you want to be notified about.</ZCard.Description>
  </ZCard.Header>
  <ZCard.Content className="grid gap-4">
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Bell className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Push Notifications</p>
        <p className="text-sm text-muted-foreground">Send notifications to device.</p>
      </div>
      <ZSwitch />
    </div>
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <CreditCard className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Billing Alerts</p>
        <p className="text-sm text-muted-foreground">Receive alerts for billing events.</p>
      </div>
      <ZSwitch defaultChecked />
    </div>
  </ZCard.Content>
</ZCard>`,

	simpleCard: `import { ZCard } from '@tasteee/zest'
import { Check } from 'lucide-react'

<ZCard className="w-75">
  <ZCard.Content>
    <div className="flex items-center space-x-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">Payment successful</p>
        <p className="text-sm text-muted-foreground">Your payment has been processed.</p>
      </div>
    </div>
  </ZCard.Content>
</ZCard>`,

	cardGrid: `import { ZCard } from '@tasteee/zest'

<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <ZCard>
    <ZCard.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
      <ZCard.Title className="text-sm font-medium">Total Revenue</ZCard.Title>
    </ZCard.Header>
    <ZCard.Content>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </ZCard.Content>
  </ZCard>
  ...
</div>`,

	anatomy: `<ZCard>
  <ZCard.Header>
    <ZCard.Title />
    <ZCard.Description />
  </ZCard.Header>
  <ZCard.Content />
  <ZCard.Footer />
</ZCard>`
} as const
