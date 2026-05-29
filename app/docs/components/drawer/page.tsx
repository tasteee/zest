'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose
} from '@/components/ui/drawer'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { drawerProps, drawerContentProps } from './props'
import { examples } from './examples'

export default function DrawerDocsPage() {
	const [isControlledOpen, setIsControlledOpen] = useState(false)

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
				<span className='text-foreground'>Drawer</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Drawer</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A panel that slides in from any edge of the screen, built on Vaul. Supports bottom, top, left, and right directions
					with touch drag-to-dismiss on mobile.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Drawer>
					<DrawerTrigger asChild>
						<z.button>Open Drawer</z.button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Edit profile</DrawerTitle>
							<DrawerDescription>Make changes to your profile here.</DrawerDescription>
						</DrawerHeader>
						<div className='p-4'>
							<p className='text-sm text-muted-foreground'>Your content goes here.</p>
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<z.button isGhost>Cancel</z.button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* From Right */}
				<ComponentPreview
					title='Right Panel'
					description='Use direction="right" for a side panel layout common in settings and detail views.'
					code={examples.fromRight}
				>
					<Drawer direction='right'>
						<DrawerTrigger asChild>
							<z.button>Open Right Panel</z.button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Settings</DrawerTitle>
								<DrawerDescription>Configure your preferences.</DrawerDescription>
							</DrawerHeader>
							<div className='p-4 flex-1 overflow-auto'>
								<p className='text-sm text-muted-foreground'>Panel content here.</p>
							</div>
							<DrawerFooter>
								<DrawerClose asChild>
									<z.button isGhost>Done</z.button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description='Manage the open state externally to trigger the drawer programmatically.'
					code={examples.controlled}
				>
					<div className='flex items-center gap-3'>
						<z.button
							onClick={() => {
								setIsControlledOpen(true)
							}}
						>
							Open Programmatically
						</z.button>
					</div>
					<Drawer open={isControlledOpen} onOpenChange={setIsControlledOpen}>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Controlled Drawer</DrawerTitle>
								<DrawerDescription>Open state is managed externally.</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<z.button
									onClick={() => {
										setIsControlledOpen(false)
									}}
								>
									Close
								</z.button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Drawer' props={drawerProps} />
				<PropsTable title='DrawerContent' props={drawerContentProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the drawer</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Move focus between interactive elements inside the drawer</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always include a DrawerTitle for screen readers, even if visually hidden</li>
								<li>Provide a DrawerClose action so users without touch input can dismiss the drawer</li>
								<li>Use bottom drawers for mobile-first patterns; right panels for desktop detail views</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
