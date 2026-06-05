'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components/ui/button-group'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Bold, Italic, Underline } from 'lucide-react'
import { buttonGroupProps, buttonGroupTextProps, buttonGroupSeparatorProps } from './props'
import { examples } from './examples'

export default function ButtonGroupDocsPage() {
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
				<span className='text-foreground'>Button Group</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ButtonGroup</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Groups related action controls together with shared borders and radius, creating a visually unified toolbar or input
					cluster.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<ButtonGroup>
					<z.button>Bold</z.button>
					<ButtonGroupSeparator />
					<z.button>Italic</z.button>
					<ButtonGroupSeparator />
					<z.button>Underline</z.button>
				</ButtonGroup>
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

				{/* Horizontal */}
				<ComponentPreview
					title='Horizontal'
					description='The default orientation. Buttons share a horizontal border edge.'
					code={examples.horizontal}
				>
					<ButtonGroup>
						<z.button>Bold</z.button>
						<ButtonGroupSeparator />
						<z.button>Italic</z.button>
						<ButtonGroupSeparator />
						<z.button>Underline</z.button>
					</ButtonGroup>
				</ComponentPreview>

				{/* Vertical */}
				<ComponentPreview
					title='Vertical'
					description='Stacks buttons vertically with shared side borders.'
					code={examples.vertical}
				>
					<ButtonGroup orientation='vertical'>
						<z.button>Top</z.button>
						<z.button>Middle</z.button>
						<z.button>Bottom</z.button>
					</ButtonGroup>
				</ComponentPreview>

				{/* With Text */}
				<ComponentPreview
					title='With Text Infix'
					description='Use ButtonGroupText to insert a static label between action controls.'
					code={examples.withText}
				>
					<ButtonGroup>
						<z.button>Copy</z.button>
						<ButtonGroupText>or</ButtonGroupText>
						<z.button>Paste</z.button>
					</ButtonGroup>
				</ComponentPreview>

				{/* Icon Buttons */}
				<ComponentPreview
					title='Icon Buttons'
					description='Combine icon-only buttons inside a group for compact toolbars.'
					code={examples.withIcons}
				>
					<ButtonGroup>
						<z.button>
							<Bold className='h-4 w-4' />
						</z.button>
						<ButtonGroupSeparator />
						<z.button>
							<Italic className='h-4 w-4' />
						</z.button>
						<ButtonGroupSeparator />
						<z.button>
							<Underline className='h-4 w-4' />
						</z.button>
					</ButtonGroup>
				</ComponentPreview>

				{/* Mixed */}
				<ComponentPreview
					title='Mixed Text and Actions'
					description='Combine static text labels with interactive buttons for URL or input-like patterns.'
					code={examples.mixed}
				>
					<ButtonGroup>
						<ButtonGroupText>https://</ButtonGroupText>
						<z.button>example.com</z.button>
						<ButtonGroupSeparator />
						<z.button>Copy</z.button>
					</ButtonGroup>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='ButtonGroup' props={buttonGroupProps} />
				<PropsTable title='ButtonGroupText' props={buttonGroupTextProps} />
				<PropsTable title='ButtonGroupSeparator' props={buttonGroupSeparatorProps} />
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
									<span className='text-muted-foreground'>Move focus between buttons in the group</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</kbd>
									<span className='text-muted-foreground'>Activate the focused button</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Group only actions that are semantically related</li>
								<li>Use separators to visually distinguish related sub-groups within a larger group</li>
								<li>Avoid mixing too many variants inside a single group to preserve visual coherence</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
