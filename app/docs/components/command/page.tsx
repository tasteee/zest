'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
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
				<z.text className='text-foreground'>Command</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Command</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A fast, keyboard-driven command palette built on cmdk. Supports grouped items, keyboard shortcuts, custom filtering,
					and a full-screen dialog mode.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.command className='rounded-lg border shadow-md w-72'>
					<z.commandInput placeholder='Type a command or search...' />
					<z.commandList>
						<z.commandEmpty>No results found.</z.commandEmpty>
						<z.commandGroup heading='Suggestions'>
							<z.commandItem>Calendar</z.commandItem>
							<z.commandItem>Search Emoji</z.commandItem>
							<z.commandItem>Calculator</z.commandItem>
						</z.commandGroup>
					</z.commandList>
				</z.command>
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

				{/* With Groups and Separator */}
				<ComponentPreview
					title='With Groups and Separator'
					description='Organize items into labeled groups separated by a divider.'
					code={examples.withGroups}
				>
					<z.command className='rounded-lg border shadow-md w-80'>
						<z.commandInput placeholder='Search...' />
						<z.commandList>
							<z.commandEmpty>No results found.</z.commandEmpty>
							<z.commandGroup heading='Files'>
								<z.commandItem>index.tsx</z.commandItem>
								<z.commandItem>globals.css</z.commandItem>
							</z.commandGroup>
							<z.commandSeparator />
							<z.commandGroup heading='Actions'>
								<z.commandItem>
									New File
									<z.commandShortcut>⌘N</z.commandShortcut>
								</z.commandItem>
								<z.commandItem>
									Save
									<z.commandShortcut>⌘S</z.commandShortcut>
								</z.commandItem>
							</z.commandGroup>
						</z.commandList>
					</z.command>
				</ComponentPreview>

				{/* Keyboard Shortcuts */}
				<ComponentPreview
					title='Keyboard Shortcuts'
					description='CommandShortcut renders the key hint on the right side of an item.'
					code={examples.withShortcuts}
				>
					<z.command className='rounded-lg border shadow-md w-80'>
						<z.commandInput placeholder='Search actions...' />
						<z.commandList>
							<z.commandGroup heading='Actions'>
								<z.commandItem>
									New File
									<z.commandShortcut>⌘N</z.commandShortcut>
								</z.commandItem>
								<z.commandItem>
									Open File
									<z.commandShortcut>⌘O</z.commandShortcut>
								</z.commandItem>
								<z.commandItem>
									Save
									<z.commandShortcut>⌘S</z.commandShortcut>
								</z.commandItem>
							</z.commandGroup>
						</z.commandList>
					</z.command>
				</ComponentPreview>

				{/* Dialog */}
				<ComponentPreview
					title='Command Dialog'
					description='A modal command palette triggered by ⌘K. Press the button or use the keyboard shortcut.'
					code={examples.dialog}
				>
					<z.box className='flex flex-col items-center gap-4'>
						<z.button
							onClick={() => {
								setIsDialogOpen(true)
							}}
						>
							Open Command Palette
						</z.button>
						<z.text.body className='text-sm text-muted-foreground'>or press ⌘K</z.text.body>
					</z.box>

					<z.commandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<z.commandInput placeholder='Type a command or search...' />
						<z.commandList>
							<z.commandEmpty>No results found.</z.commandEmpty>
							<z.commandGroup heading='Pages'>
								<z.commandItem>Home</z.commandItem>
								<z.commandItem>Components</z.commandItem>
								<z.commandItem>Settings</z.commandItem>
							</z.commandGroup>
							<z.commandSeparator />
							<z.commandGroup heading='Actions'>
								<z.commandItem>
									New File
									<z.commandShortcut>⌘N</z.commandShortcut>
								</z.commandItem>
								<z.commandItem>
									Sign Out
									<z.commandShortcut>⇧⌘Q</z.commandShortcut>
								</z.commandItem>
							</z.commandGroup>
						</z.commandList>
					</z.commandDialog>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Command' props={commandProps} />
				<PropsTable title='CommandDialog' props={commandDialogProps} />
				<PropsTable title='CommandGroup' props={commandGroupProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>↑ ↓</z.text>
									<z.text className='text-muted-foreground'>Move between items in the list</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter</z.text>
									<z.text className='text-muted-foreground'>Select the focused item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</z.text>
									<z.text className='text-muted-foreground'>Close the dialog or clear search</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always provide a CommandEmpty message so users know when no results match</z.box>
								<z.box as='li'>Group related items under a shared heading to reduce cognitive load</z.box>
								<z.box as='li'>Use CommandDialog for application-level palettes triggered by ⌘K</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
