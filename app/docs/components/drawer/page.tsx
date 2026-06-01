'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { drawerProps, drawerContentProps } from './props'
import { examples } from './examples'

export default function DrawerDocsPage() {
	const [isControlledOpen, setIsControlledOpen] = useState(false)

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
				<z.text className='text-foreground'>Drawer</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Drawer</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A panel that slides in from any edge of the screen, built on Vaul. Supports bottom, top, left, and right directions
					with touch drag-to-dismiss on mobile.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.drawer>
					<z.drawerTrigger asChild>
						<z.button>Open Drawer</z.button>
					</z.drawerTrigger>
					<z.drawerContent>
						<z.drawerHeader>
							<z.drawerTitle>Edit profile</z.drawerTitle>
							<z.drawerDescription>Make changes to your profile here.</z.drawerDescription>
						</z.drawerHeader>
						<z.box className='p-4'>
							<z.text.body className='text-sm text-muted-foreground'>Your content goes here.</z.text.body>
						</z.box>
						<z.drawerFooter>
							<z.drawerClose asChild>
								<z.button isGhost>Cancel</z.button>
							</z.drawerClose>
						</z.drawerFooter>
					</z.drawerContent>
				</z.drawer>
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

				{/* From Right */}
				<ComponentPreview
					title='Right Panel'
					description='Use direction="right" for a side panel layout common in settings and detail views.'
					code={examples.fromRight}
				>
					<z.drawer direction='right'>
						<z.drawerTrigger asChild>
							<z.button>Open Right Panel</z.button>
						</z.drawerTrigger>
						<z.drawerContent>
							<z.drawerHeader>
								<z.drawerTitle>Settings</z.drawerTitle>
								<z.drawerDescription>Configure your preferences.</z.drawerDescription>
							</z.drawerHeader>
							<z.box className='p-4 flex-1 overflow-auto'>
								<z.text.body className='text-sm text-muted-foreground'>Panel content here.</z.text.body>
							</z.box>
							<z.drawerFooter>
								<z.drawerClose asChild>
									<z.button isGhost>Done</z.button>
								</z.drawerClose>
							</z.drawerFooter>
						</z.drawerContent>
					</z.drawer>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the open state externally to trigger the drawer programmatically.'
					code={examples.controlled}
				>
					<z.box className='flex items-center gap-3'>
						<z.button
							onClick={() => {
								setIsControlledOpen(true)
							}}
						>
							Open Programmatically
						</z.button>
					</z.box>
					<z.drawer open={isControlledOpen} onOpenChange={setIsControlledOpen}>
						<z.drawerContent>
							<z.drawerHeader>
								<z.drawerTitle>Controlled Drawer</z.drawerTitle>
								<z.drawerDescription>Open state is managed externally.</z.drawerDescription>
							</z.drawerHeader>
							<z.drawerFooter>
								<z.button
									onClick={() => {
										setIsControlledOpen(false)
									}}
								>
									Close
								</z.button>
							</z.drawerFooter>
						</z.drawerContent>
					</z.drawer>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Drawer' props={drawerProps} />
				<PropsTable title='DrawerContent' props={drawerContentProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the drawer</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</z.text>
									<z.text className='text-muted-foreground'>Move focus between interactive elements inside the drawer</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always include a DrawerTitle for screen readers, even if visually hidden</z.box>
								<z.box as='li'>Provide a DrawerClose action so users without touch input can dismiss the drawer</z.box>
								<z.box as='li'>Use bottom drawers for mobile-first patterns; right panels for desktop detail views</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
