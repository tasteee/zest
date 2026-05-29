'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Bell, Check, CreditCard } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { cardProps, cardHeaderProps, cardTitleProps } from './props'
import { examples } from './examples'
export default function CardDocsPage() {
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
				<span className='text-foreground'>Card</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZCard</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A container component for grouping related content and actions. Cards provide a flexible foundation for building
					complex UI patterns.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={examples.quickPreview}
			>
				<Card className='w-87.5'>
					<Card.Header>
						<Card.Title>Card Title</Card.Title>
						<Card.Description>Card Description</Card.Description>
					</Card.Header>
					<Card.Content>
						<p className='text-muted-foreground'>Card Content</p>
					</Card.Content>
					<Card.Footer>
						<p className='text-sm text-muted-foreground'>Card Footer</p>
					</Card.Footer>
				</Card>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Form Card */}
				<ComponentPreview
					code={examples.formCard}
				>
					<Card className='w-87.5'>
						<Card.Header>
							<Card.Title>Create project</Card.Title>
							<Card.Description>Deploy your new project in one-click.</Card.Description>
						</Card.Header>
						<Card.Content>
							<form>
								<div className='grid w-full gap-4'>
									<div className='flex flex-col space-y-1.5'>
										<Label htmlFor='name'>Name</Label>
										<Input id='name' placeholder='Name of your project' />
									</div>
								</div>
							</form>
						</Card.Content>
						<Card.Footer className='flex justify-between'>
							<z.button>Cancel</z.button>
							<z.button>Deploy</z.button>
						</Card.Footer>
					</Card>
				</ComponentPreview>

				{/* Notifications Card */}
				<ComponentPreview
					code={examples.notificationsCard}
				>
					<Card className='w-95'>
						<Card.Header>
							<Card.Title>Notifications</Card.Title>
							<Card.Description>Choose what you want to be notified about.</Card.Description>
						</Card.Header>
						<Card.Content className='grid gap-4'>
							<div className='flex items-center space-x-4 rounded-md border p-4'>
								<Bell className='h-5 w-5' />
								<div className='flex-1 space-y-1'>
									<p className='text-sm font-medium leading-none'>Push Notifications</p>
									<p className='text-sm text-muted-foreground'>Send notifications to device.</p>
								</div>
								<Switch />
							</div>
							<div className='flex items-center space-x-4 rounded-md border p-4'>
								<CreditCard className='h-5 w-5' />
								<div className='flex-1 space-y-1'>
									<p className='text-sm font-medium leading-none'>Billing Alerts</p>
									<p className='text-sm text-muted-foreground'>Receive alerts for billing events.</p>
								</div>
								<Switch defaultChecked />
							</div>
						</Card.Content>
					</Card>
				</ComponentPreview>

				{/* Simple Card */}
				<ComponentPreview
					code={examples.simpleCard}
				>
					<Card className='w-75'>
						<Card.Content>
							<div className='flex items-center space-x-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
									<Check className='h-6 w-6 text-primary' />
								</div>
								<div className='space-y-1'>
									<p className='text-sm font-medium leading-none'>Payment successful</p>
									<p className='text-sm text-muted-foreground'>Your payment has been processed.</p>
								</div>
							</div>
						</Card.Content>
					</Card>
				</ComponentPreview>

				{/* Card Grid */}
				<ComponentPreview
					code={examples.cardGrid}
				>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<Card>
							<Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<Card.Title className='text-sm font-medium'>Total Revenue</Card.Title>
							</Card.Header>
							<Card.Content>
								<div className='text-2xl font-bold'>$45,231.89</div>
								<p className='text-xs text-muted-foreground'>+20.1% from last month</p>
							</Card.Content>
						</Card>
						<Card>
							<Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<Card.Title className='text-sm font-medium'>Subscriptions</Card.Title>
							</Card.Header>
							<Card.Content>
								<div className='text-2xl font-bold'>+2350</div>
								<p className='text-xs text-muted-foreground'>+180.1% from last month</p>
							</Card.Content>
						</Card>
						<Card>
							<Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<Card.Title className='text-sm font-medium'>Active Now</Card.Title>
							</Card.Header>
							<Card.Content>
								<div className='text-2xl font-bold'>+573</div>
								<p className='text-xs text-muted-foreground'>+201 since last hour</p>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ZCard' props={cardProps} />
				<PropsTable title='ZCard.Header' props={cardHeaderProps} />
				<PropsTable title='ZCard.Title' props={cardTitleProps} />
				<div className='text-sm text-muted-foreground'>
					<p>
						ZCard.Description, ZCard.Content, and ZCard.Footer follow the same pattern, accepting className and children props.
					</p>
				</div>
			</section>

			{/* Anatomy */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Anatomy</h2>
				<Card>
					<Card.Content className='p-6'>
						<CodeBlock
							code={examples.anatomy}
							language='tsx'
						/>
					</Card.Content>
				</Card>
				<div className='grid gap-4 text-sm'>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard</code>
						<span className='text-muted-foreground'>The root container with border, background, and shadow.</span>
					</div>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard.Header</code>
						<span className='text-muted-foreground'>Contains the title and description with consistent spacing.</span>
					</div>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard.Title</code>
						<span className='text-muted-foreground'>The main heading of the card.</span>
					</div>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard.Description</code>
						<span className='text-muted-foreground'>Secondary text that describes the card content.</span>
					</div>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard.Content</code>
						<span className='text-muted-foreground'>The main content area of the card.</span>
					</div>
					<div className='flex gap-4'>
						<code className='font-mono text-primary'>ZCard.Footer</code>
						<span className='text-muted-foreground'>Contains actions or secondary information.</span>
					</div>
				</div>
			</section>
		</div>
	)
}
