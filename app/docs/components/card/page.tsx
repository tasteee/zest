'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Bell, Check, CreditCard } from 'lucide-react'
import { cardProps, cardHeaderProps, cardTitleProps } from './props'
import { examples } from './examples'
export default function CardDocsPage() {
	return (
		<z.box className='space-y-16'>
			{/* Breadcrumb */}
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Card</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZCard</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A container component for grouping related content and actions. Cards provide a flexible foundation for building
					complex UI patterns.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.card className='w-87.5'>
					<z.cardHeader>
						<z.cardTitle>Card Title</z.cardTitle>
						<z.cardDescription>Card Description</z.cardDescription>
					</z.cardHeader>
					<z.cardContent>
						<z.text.body className='text-muted-foreground'>Card Content</z.text.body>
					</z.cardContent>
					<z.cardFooter>
						<z.text.body className='text-sm text-muted-foreground'>Card Footer</z.text.body>
					</z.cardFooter>
				</z.card>
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				{/* Form Card */}
				<ComponentPreview code={examples.formCard}>
					<z.card className='w-87.5'>
						<z.cardHeader>
							<z.cardTitle>Create project</z.cardTitle>
							<z.cardDescription>Deploy your new project in one-click.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent>
							<z.box as='form'>
								<z.box className='grid w-full gap-4'>
									<z.box className='flex flex-col space-y-1.5'>
										<z.label htmlFor='name'>Name</z.label>
										<z.input id='name' placeholder='Name of your project' />
									</z.box>
								</z.box>
							</z.box>
						</z.cardContent>
						<z.cardFooter className='flex justify-between'>
							<z.button>Cancel</z.button>
							<z.button>Deploy</z.button>
						</z.cardFooter>
					</z.card>
				</ComponentPreview>

				{/* Notifications Card */}
				<ComponentPreview code={examples.notificationsCard}>
					<z.card className='w-95'>
						<z.cardHeader>
							<z.cardTitle>Notifications</z.cardTitle>
							<z.cardDescription>Choose what you want to be notified about.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent className='grid gap-4'>
							<z.box className='flex items-center space-x-4 rounded-md border p-4'>
								<Bell className='h-5 w-5' />
								<z.box className='flex-1 space-y-1'>
									<z.text.body className='text-sm font-medium leading-none'>Push Notifications</z.text.body>
									<z.text.body className='text-sm text-muted-foreground'>Send notifications to device.</z.text.body>
								</z.box>
								<z.switch />
							</z.box>
							<z.box className='flex items-center space-x-4 rounded-md border p-4'>
								<CreditCard className='h-5 w-5' />
								<z.box className='flex-1 space-y-1'>
									<z.text.body className='text-sm font-medium leading-none'>Billing Alerts</z.text.body>
									<z.text.body className='text-sm text-muted-foreground'>Receive alerts for billing events.</z.text.body>
								</z.box>
								<z.switch defaultChecked />
							</z.box>
						</z.cardContent>
					</z.card>
				</ComponentPreview>

				{/* Simple Card */}
				<ComponentPreview code={examples.simpleCard}>
					<z.card className='w-75'>
						<z.cardContent>
							<z.box className='flex items-center space-x-4'>
								<z.box className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
									<Check className='h-6 w-6 text-primary' />
								</z.box>
								<z.box className='space-y-1'>
									<z.text.body className='text-sm font-medium leading-none'>Payment successful</z.text.body>
									<z.text.body className='text-sm text-muted-foreground'>Your payment has been processed.</z.text.body>
								</z.box>
							</z.box>
						</z.cardContent>
					</z.card>
				</ComponentPreview>

				{/* Card Grid */}
				<ComponentPreview code={examples.cardGrid}>
					<z.box className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<z.card>
							<z.cardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<z.cardTitle className='text-sm font-medium'>Total Revenue</z.cardTitle>
							</z.cardHeader>
							<z.cardContent>
								<z.box className='text-2xl font-bold'>$45,231.89</z.box>
								<z.text.body className='text-xs text-muted-foreground'>+20.1% from last month</z.text.body>
							</z.cardContent>
						</z.card>
						<z.card>
							<z.cardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<z.cardTitle className='text-sm font-medium'>Subscriptions</z.cardTitle>
							</z.cardHeader>
							<z.cardContent>
								<z.box className='text-2xl font-bold'>+2350</z.box>
								<z.text.body className='text-xs text-muted-foreground'>+180.1% from last month</z.text.body>
							</z.cardContent>
						</z.card>
						<z.card>
							<z.cardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<z.cardTitle className='text-sm font-medium'>Active Now</z.cardTitle>
							</z.cardHeader>
							<z.cardContent>
								<z.box className='text-2xl font-bold'>+573</z.box>
								<z.text.body className='text-xs text-muted-foreground'>+201 since last hour</z.text.body>
							</z.cardContent>
						</z.card>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ZCard' props={cardProps} />
				<PropsTable title='Zz.cardHeader' props={cardHeaderProps} />
				<PropsTable title='Zz.cardTitle' props={cardTitleProps} />
				<z.box className='text-sm text-muted-foreground'>
					<z.text.body>
						Zz.cardDescription, Zz.cardContent, and Zz.cardFooter follow the same pattern, accepting className and children props.
					</z.text.body>
				</z.box>
			</z.box>

			{/* Anatomy */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Anatomy</z.text.h2>
				<z.card>
					<z.cardContent className='p-6'>
						<CodeBlock code={examples.anatomy} language='tsx' />
					</z.cardContent>
				</z.card>
				<z.box className='grid gap-4 text-sm'>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							ZCard
						</z.box>
						<z.text className='text-muted-foreground'>The root container with border, background, and shadow.</z.text>
					</z.box>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							Zz.cardHeader
						</z.box>
						<z.text className='text-muted-foreground'>Contains the title and description with consistent spacing.</z.text>
					</z.box>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							Zz.cardTitle
						</z.box>
						<z.text className='text-muted-foreground'>The main heading of the card.</z.text>
					</z.box>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							Zz.cardDescription
						</z.box>
						<z.text className='text-muted-foreground'>Secondary text that describes the card content.</z.text>
					</z.box>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							Zz.cardContent
						</z.box>
						<z.text className='text-muted-foreground'>The main content area of the card.</z.text>
					</z.box>
					<z.box className='flex gap-4'>
						<z.box as='code' className='font-mono text-primary'>
							Zz.cardFooter
						</z.box>
						<z.text className='text-muted-foreground'>Contains actions or secondary information.</z.text>
					</z.box>
				</z.box>
			</z.box>
		</z.box>
	)
}
