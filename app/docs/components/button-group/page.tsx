'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, Bold, Italic, Underline } from 'lucide-react'
import { buttonGroupProps, buttonGroupTextProps, buttonGroupSeparatorProps } from './props'
import { examples } from './examples'

export default function ButtonGroupDocsPage() {
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
				<z.text className='text-foreground'>Button Group</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ButtonGroup</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Groups related action controls together with shared borders and radius, creating a visually unified toolbar or input
					cluster.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.buttonGroup>
					<z.button>Bold</z.button>
					<z.buttonGroupSeparator />
					<z.button>Italic</z.button>
					<z.buttonGroupSeparator />
					<z.button>Underline</z.button>
				</z.buttonGroup>
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

				{/* Horizontal */}
				<ComponentPreview
					title='Horizontal'
					description='The default orientation. Buttons share a horizontal border edge.'
					code={examples.horizontal}
				>
					<z.buttonGroup>
						<z.button>Bold</z.button>
						<z.buttonGroupSeparator />
						<z.button>Italic</z.button>
						<z.buttonGroupSeparator />
						<z.button>Underline</z.button>
					</z.buttonGroup>
				</ComponentPreview>

				{/* Vertical */}
				<ComponentPreview
					title='Vertical'
					description='Stacks buttons vertically with shared side borders.'
					code={examples.vertical}
				>
					<z.buttonGroup orientation='vertical'>
						<z.button>Top</z.button>
						<z.button>Middle</z.button>
						<z.button>Bottom</z.button>
					</z.buttonGroup>
				</ComponentPreview>

				{/* With Text */}
				<ComponentPreview
					title='With Text Infix'
					description='Use ButtonGroupText to insert a static label between action controls.'
					code={examples.withText}
				>
					<z.buttonGroup>
						<z.button>Copy</z.button>
						<z.buttonGroupText>or</z.buttonGroupText>
						<z.button>Paste</z.button>
					</z.buttonGroup>
				</ComponentPreview>

				{/* Icon Buttons */}
				<ComponentPreview
					title='Icon Buttons'
					description='Combine icon-only buttons inside a group for compact toolbars.'
					code={examples.withIcons}
				>
					<z.buttonGroup>
						<z.button>
							<Bold className='h-4 w-4' />
						</z.button>
						<z.buttonGroupSeparator />
						<z.button>
							<Italic className='h-4 w-4' />
						</z.button>
						<z.buttonGroupSeparator />
						<z.button>
							<Underline className='h-4 w-4' />
						</z.button>
					</z.buttonGroup>
				</ComponentPreview>

				{/* Mixed */}
				<ComponentPreview
					title='Mixed Text and Actions'
					description='Combine static text labels with interactive buttons for URL or input-like patterns.'
					code={examples.mixed}
				>
					<z.buttonGroup>
						<z.buttonGroupText>https://</z.buttonGroupText>
						<z.button>example.com</z.button>
						<z.buttonGroupSeparator />
						<z.button>Copy</z.button>
					</z.buttonGroup>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='ButtonGroup' props={buttonGroupProps} />
				<PropsTable title='ButtonGroupText' props={buttonGroupTextProps} />
				<PropsTable title='ButtonGroupSeparator' props={buttonGroupSeparatorProps} />
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
									<z.text className='text-muted-foreground'>Move focus between buttons in the group</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Activate the focused button</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Group only actions that are semantically related</z.box>
								<z.box as='li'>Use separators to visually distinguish related sub-groups within a larger group</z.box>
								<z.box as='li'>Avoid mixing too many variants inside a single group to preserve visual coherence</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
