'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandShortcut
} from '@/components/ui/command'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { commandProps, commandDialogProps, commandGroupProps } from './props'
import { examples } from './examples'

export default function CommandDocsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isShortcut = event.key === 'k' && (event.metaKey || event.ctrlKey)
			if (isShortcut) {
				event.preventDefault()
				setIsDialogOpen((previous) => !previous)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

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
				<span className='text-foreground'>Command</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Command</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A fast, keyboard-driven command palette built on cmdk. Supports grouped items, keyboard shortcuts, custom
					filtering, and a full-screen dialog mode.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Command className='rounded-lg border shadow-md w-72'>
					<CommandInput placeholder='Type a command or search...' />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading='Suggestions'>
							<CommandItem>Calendar</CommandItem>
							<CommandItem>Search Emoji</CommandItem>
							<CommandItem>Calculator</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
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

				{/* With Groups and Separator */}
				<ComponentPreview
					title='With Groups and Separator'
					description='Organize items into labeled groups separated by a divider.'
					code={examples.withGroups}
				>
					<Command className='rounded-lg border shadow-md w-80'>
						<CommandInput placeholder='Search...' />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading='Files'>
								<CommandItem>index.tsx</CommandItem>
								<CommandItem>globals.css</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading='Actions'>
								<CommandItem>
									New File
									<CommandShortcut>⌘N</CommandShortcut>
								</CommandItem>
								<CommandItem>
									Save
									<CommandShortcut>⌘S</CommandShortcut>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</ComponentPreview>

				{/* Keyboard Shortcuts */}
				<ComponentPreview
					title='Keyboard Shortcuts'
					description='CommandShortcut renders the key hint on the right side of an item.'
					code={examples.withShortcuts}
				>
					<Command className='rounded-lg border shadow-md w-80'>
						<CommandInput placeholder='Search actions...' />
						<CommandList>
							<CommandGroup heading='Actions'>
								<CommandItem>
									New File
									<CommandShortcut>⌘N</CommandShortcut>
								</CommandItem>
								<CommandItem>
									Open File
									<CommandShortcut>⌘O</CommandShortcut>
								</CommandItem>
								<CommandItem>
									Save
									<CommandShortcut>⌘S</CommandShortcut>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</ComponentPreview>

				{/* Dialog */}
				<ComponentPreview
					title='Command Dialog'
					description='A modal command palette triggered by ⌘K. Press the button or use the keyboard shortcut.'
					code={examples.dialog}
				>
					<div className='flex flex-col items-center gap-4'>
						<z.button onClick={() => { setIsDialogOpen(true) }}>
							Open Command Palette
						</z.button>
						<p className='text-sm text-muted-foreground'>or press ⌘K</p>
					</div>

					<CommandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<CommandInput placeholder='Type a command or search...' />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading='Pages'>
								<CommandItem>Home</CommandItem>
								<CommandItem>Components</CommandItem>
								<CommandItem>Settings</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading='Actions'>
								<CommandItem>
									New File
									<CommandShortcut>⌘N</CommandShortcut>
								</CommandItem>
								<CommandItem>
									Sign Out
									<CommandShortcut>⇧⌘Q</CommandShortcut>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</CommandDialog>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Command' props={commandProps} />
				<PropsTable title='CommandDialog' props={commandDialogProps} />
				<PropsTable title='CommandGroup' props={commandGroupProps} />
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
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ ↓</kbd>
									<span className='text-muted-foreground'>Move between items in the list</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</kbd>
									<span className='text-muted-foreground'>Select the focused item</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Close the dialog or clear search</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always provide a CommandEmpty message so users know when no results match</li>
								<li>Group related items under a shared heading to reduce cognitive load</li>
								<li>Use CommandDialog for application-level palettes triggered by ⌘K</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
