'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, User, CreditCard, Settings, Bell } from 'lucide-react'
import { tabsProps, tabsTriggerProps } from './props'
import { examples } from './examples'

export default function TabsDocsPage() {
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
				<z.text className='text-foreground'>Tabs</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZTabs</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A set of layered sections of content, known as tab panels, that are displayed one at a time. Built on Radix UI Tabs
					primitive.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Tabs'
				description='A basic tabs component with multiple panels.'
				code={examples.quickPreview}
			>
				<z.tabs defaultValue='account' className='w-100'>
					<z.tabsList>
						<z.tabsTrigger value='account'>Account</z.tabsTrigger>
						<z.tabsTrigger value='password'>Password</z.tabsTrigger>
					</z.tabsList>
					<z.tabsContent value='account' className='mt-4'>
						<z.text.body className='text-sm text-muted-foreground'>Make changes to your account here.</z.text.body>
					</z.tabsContent>
					<z.tabsContent value='password' className='mt-4'>
						<z.text.body className='text-sm text-muted-foreground'>Change your password here.</z.text.body>
					</z.tabsContent>
				</z.tabs>
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				{/* With Cards */}
				<ComponentPreview
					title='With Cards'
					description='Tabs with card content for forms and settings.'
					code={examples.withCards}
				>
					<z.tabs defaultValue='account' className='w-full max-w-lg'>
						<z.tabsList className='grid w-full grid-cols-2'>
							<z.tabsTrigger value='account'>Account</z.tabsTrigger>
							<z.tabsTrigger value='password'>Password</z.tabsTrigger>
						</z.tabsList>
						<z.tabsContent value='account'>
							<z.card>
								<z.cardHeader>
									<z.cardTitle>Account</z.cardTitle>
									<z.cardDescription>Make changes to your account here. Click save when you&apos;re done.</z.cardDescription>
								</z.cardHeader>
								<z.cardContent className='space-y-2'>
									<z.box className='space-y-1'>
										<z.label htmlFor='name'>Name</z.label>
										<z.input id='name' defaultValue='Pedro Duarte' />
									</z.box>
									<z.box className='space-y-1'>
										<z.label htmlFor='username'>Username</z.label>
										<z.input id='username' defaultValue='@peduarte' />
									</z.box>
								</z.cardContent>
								<z.cardFooter>
									<z.button>Save changes</z.button>
								</z.cardFooter>
							</z.card>
						</z.tabsContent>
						<z.tabsContent value='password'>
							<z.card>
								<z.cardHeader>
									<z.cardTitle>Password</z.cardTitle>
									<z.cardDescription>Change your password here. After saving, you&apos;ll be logged out.</z.cardDescription>
								</z.cardHeader>
								<z.cardContent className='space-y-2'>
									<z.box className='space-y-1'>
										<z.label htmlFor='current'>Current password</z.label>
										<z.input id='current' type='password' />
									</z.box>
									<z.box className='space-y-1'>
										<z.label htmlFor='new'>New password</z.label>
										<z.input id='new' type='password' />
									</z.box>
								</z.cardContent>
								<z.cardFooter>
									<z.button>Save password</z.button>
								</z.cardFooter>
							</z.card>
						</z.tabsContent>
					</z.tabs>
				</ComponentPreview>

				{/* With Icons */}
				<ComponentPreview
					title='With Icons'
					description='Tabs with icons for visual context.'
					code={examples.withIcons}
				>
					<z.tabs defaultValue='profile' className='w-full max-w-md'>
						<z.tabsList className='grid w-full grid-cols-4'>
							<z.tabsTrigger value='profile' className='flex items-center gap-2'>
								<User className='h-4 w-4' />
								<z.text className='hidden sm:inline'>Profile</z.text>
							</z.tabsTrigger>
							<z.tabsTrigger value='billing' className='flex items-center gap-2'>
								<CreditCard className='h-4 w-4' />
								<z.text className='hidden sm:inline'>Billing</z.text>
							</z.tabsTrigger>
							<z.tabsTrigger value='notifications' className='flex items-center gap-2'>
								<Bell className='h-4 w-4' />
								<z.text className='hidden sm:inline'>Alerts</z.text>
							</z.tabsTrigger>
							<z.tabsTrigger value='settings' className='flex items-center gap-2'>
								<Settings className='h-4 w-4' />
								<z.text className='hidden sm:inline'>Settings</z.text>
							</z.tabsTrigger>
						</z.tabsList>
						<z.tabsContent value='profile' className='mt-6'>
							<z.text.body className='text-sm text-muted-foreground'>Manage your profile information and preferences.</z.text.body>
						</z.tabsContent>
						<z.tabsContent value='billing' className='mt-6'>
							<z.text.body className='text-sm text-muted-foreground'>View and manage your billing information.</z.text.body>
						</z.tabsContent>
						<z.tabsContent value='notifications' className='mt-6'>
							<z.text.body className='text-sm text-muted-foreground'>Configure your notification preferences.</z.text.body>
						</z.tabsContent>
						<z.tabsContent value='settings' className='mt-6'>
							<z.text.body className='text-sm text-muted-foreground'>Adjust your account settings.</z.text.body>
						</z.tabsContent>
					</z.tabs>
				</ComponentPreview>

				{/* Disabled Tab */}
				<ComponentPreview
					title='Disabled Tab'
					description='Individual tabs can be disabled.'
					code={examples.disabledTab}
				>
					<z.tabs defaultValue='active'>
						<z.tabsList>
							<z.tabsTrigger value='active'>Active</z.tabsTrigger>
							<z.tabsTrigger value='disabled' disabled>
								Disabled
							</z.tabsTrigger>
							<z.tabsTrigger value='another'>Another</z.tabsTrigger>
						</z.tabsList>
					</z.tabs>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Tabs' props={tabsProps} />
				<PropsTable title='TabsTrigger' props={tabsTriggerProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Keyboard Interactions</z.text.h3>
							<z.box className='grid gap-2'>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus to the active trigger, then to the content</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Left/Right</z.text>
									<z.text className='text-muted-foreground'>Move focus between triggers (horizontal orientation)</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Up/Down</z.text>
									<z.text className='text-muted-foreground'>Move focus between triggers (vertical orientation)</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Home</z.text>
									<z.text className='text-muted-foreground'>Move focus to the first trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>End</z.text>
									<z.text className='text-muted-foreground'>Move focus to the last trigger</z.text>
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
