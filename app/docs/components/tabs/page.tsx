'use client'

import Link from 'next/link'
import { ZButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, User, CreditCard, Settings, Bell } from 'lucide-react'

const tabsProps: PropDefinition[] = [
	{
		name: 'defaultValue',
		type: 'string',
		description: 'The value of the tab that should be active when initially rendered.'
	},
	{
		name: 'value',
		type: 'string',
		description: 'The controlled value of the tab to activate.'
	},
	{
		name: 'onValueChange',
		type: '(value: string) => void',
		description: 'Event handler called when the value changes.'
	},
	{
		name: 'orientation',
		type: '"horizontal" | "vertical"',
		defaultValue: '"horizontal"',
		description: 'The orientation of the tabs.'
	},
	{
		name: 'activationMode',
		type: '"automatic" | "manual"',
		defaultValue: '"automatic"',
		description: 'Whether a tab is activated automatically or manually.'
	}
]

const tabsTriggerProps: PropDefinition[] = [
	{
		name: 'value',
		type: 'string',
		required: true,
		description: 'A unique value that associates the trigger with a content.'
	},
	{
		name: 'disabled',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, prevents the user from interacting with the tab.'
	}
]

export default function TabsDocsPage() {
	return (
		<div className='space-y-16'>
			{/* Breadcrumb */}
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Tabs</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZTabs</h1>
					<Badge kind='ghost' color='white'>Component</Badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A set of layered sections of content, known as tab panels, that are displayed one at a time. Built on Radix UI Tabs
					primitive.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Tabs'
				description='A basic tabs component with multiple panels.'
				code={`import { ZTabs, ZTabsContent, ZTabsList, ZTabsTrigger } from '@tasteee/zest'

export function TabsDemo() {
  return (
    <ZTabs defaultValue="account" className="w-[400px]">
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
}`}
			>
				<Tabs defaultValue='account' className='w-[400px]'>
					<TabsList>
						<TabsTrigger value='account'>Account</TabsTrigger>
						<TabsTrigger value='password'>Password</TabsTrigger>
					</TabsList>
					<TabsContent value='account' className='mt-4'>
						<p className='text-sm text-muted-foreground'>Make changes to your account here.</p>
					</TabsContent>
					<TabsContent value='password' className='mt-4'>
						<p className='text-sm text-muted-foreground'>Change your password here.</p>
					</TabsContent>
				</Tabs>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={`import { ZTabs, ZTabsContent, ZTabsList, ZTabsTrigger } from '@tasteee/zest'`} language='tsx' />
				<CodeBlock
					code={`<ZTabs defaultValue="account">
  <ZTabsList>
    <ZTabsTrigger value="account">Account</ZTabsTrigger>
    <ZTabsTrigger value="password">Password</ZTabsTrigger>
  </ZTabsList>
  <ZTabsContent value="account">Account content</ZTabsContent>
  <ZTabsContent value="password">Password content</ZTabsContent>
</ZTabs>`}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* With Cards */}
				<ComponentPreview
					title='With Cards'
					description='Tabs with card content for forms and settings.'
					code={`<Tabs defaultValue="account" className="w-full max-w-lg">
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
</Tabs>`}
				>
					<Tabs defaultValue='account' className='w-full max-w-lg'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='account'>Account</TabsTrigger>
							<TabsTrigger value='password'>Password</TabsTrigger>
						</TabsList>
						<TabsContent value='account'>
							<Card>
								<CardHeader>
									<CardTitle>Account</CardTitle>
									<CardDescription>Make changes to your account here. Click save when you&apos;re done.</CardDescription>
								</CardHeader>
								<CardContent className='space-y-2'>
									<div className='space-y-1'>
										<Label htmlFor='name'>Name</Label>
										<Input id='name' defaultValue='Pedro Duarte' />
									</div>
									<div className='space-y-1'>
										<Label htmlFor='username'>Username</Label>
										<Input id='username' defaultValue='@peduarte' />
									</div>
								</CardContent>
								<CardFooter>
									<ZButton>Save changes</ZButton>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value='password'>
							<Card>
								<CardHeader>
									<CardTitle>Password</CardTitle>
									<CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
								</CardHeader>
								<CardContent className='space-y-2'>
									<div className='space-y-1'>
										<Label htmlFor='current'>Current password</Label>
										<Input id='current' type='password' />
									</div>
									<div className='space-y-1'>
										<Label htmlFor='new'>New password</Label>
										<Input id='new' type='password' />
									</div>
								</CardContent>
								<CardFooter>
									<ZButton>Save password</ZButton>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview
					title='With Icons'
					description='Tabs with icons for visual context.'
					code={`<Tabs defaultValue="profile" className="w-full max-w-md">
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
</Tabs>`}
				>
					<Tabs defaultValue='profile' className='w-full max-w-md'>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger value='profile' className='flex items-center gap-2'>
								<User className='h-4 w-4' />
								<span className='hidden sm:inline'>Profile</span>
							</TabsTrigger>
							<TabsTrigger value='billing' className='flex items-center gap-2'>
								<CreditCard className='h-4 w-4' />
								<span className='hidden sm:inline'>Billing</span>
							</TabsTrigger>
							<TabsTrigger value='notifications' className='flex items-center gap-2'>
								<Bell className='h-4 w-4' />
								<span className='hidden sm:inline'>Alerts</span>
							</TabsTrigger>
							<TabsTrigger value='settings' className='flex items-center gap-2'>
								<Settings className='h-4 w-4' />
								<span className='hidden sm:inline'>Settings</span>
							</TabsTrigger>
						</TabsList>
						<TabsContent value='profile' className='mt-6'>
							<p className='text-sm text-muted-foreground'>Manage your profile information and preferences.</p>
						</TabsContent>
						<TabsContent value='billing' className='mt-6'>
							<p className='text-sm text-muted-foreground'>View and manage your billing information.</p>
						</TabsContent>
						<TabsContent value='notifications' className='mt-6'>
							<p className='text-sm text-muted-foreground'>Configure your notification preferences.</p>
						</TabsContent>
						<TabsContent value='settings' className='mt-6'>
							<p className='text-sm text-muted-foreground'>Adjust your account settings.</p>
						</TabsContent>
					</Tabs>
				</ComponentPreview>

				{/* Disabled Tab */}
				<ComponentPreview
					title='Disabled Tab'
					description='Individual tabs can be disabled.'
					code={`<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
</Tabs>`}
				>
					<Tabs defaultValue='active'>
						<TabsList>
							<TabsTrigger value='active'>Active</TabsTrigger>
							<TabsTrigger value='disabled' disabled>
								Disabled
							</TabsTrigger>
							<TabsTrigger value='another'>Another</TabsTrigger>
						</TabsList>
					</Tabs>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Tabs' props={tabsProps} />
				<PropsTable title='TabsTrigger' props={tabsTriggerProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Interactions</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus to the active trigger, then to the content</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Left/Right</kbd>
									<span className='text-muted-foreground'>Move focus between triggers (horizontal orientation)</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Up/Down</kbd>
									<span className='text-muted-foreground'>Move focus between triggers (vertical orientation)</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Home</kbd>
									<span className='text-muted-foreground'>Move focus to the first trigger</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>End</kbd>
									<span className='text-muted-foreground'>Move focus to the last trigger</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
