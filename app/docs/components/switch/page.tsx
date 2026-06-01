'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { switchProps } from './props'
import { examples } from './examples'
export default function SwitchDocsPage() {
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
				<z.text className='text-foreground'>Switch</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZSwitch</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A control that allows the user to toggle between checked and unchecked states. Built on Radix UI Switch primitive.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview title='Default Switch' description='A basic toggle switch.' code={examples.quickPreview}>
				<z.switch />
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

				{/* With Label */}
				<ComponentPreview title='With Label' description='A switch paired with a clickable label.' code={examples.withLabel}>
					<z.box className='flex items-center space-x-2'>
						<z.switch id='airplane-mode' />
						<z.label htmlFor='airplane-mode'>Airplane Mode</z.label>
					</z.box>
				</ComponentPreview>

				{/* Default Checked */}
				<ComponentPreview
					title='Default Checked'
					description='A switch that starts in the checked state.'
					code={examples.defaultChecked}
				>
					<z.box className='flex items-center space-x-2'>
						<z.switch id='notifications' defaultChecked />
						<z.label htmlFor='notifications'>Enable notifications</z.label>
					</z.box>
				</ComponentPreview>

				{/* Disabled */}
				<ComponentPreview title='Disabled' description='Disabled switches cannot be toggled.' code={examples.disabled}>
					<z.box className='flex flex-col gap-4'>
						<z.box className='flex items-center space-x-2'>
							<z.switch id='disabled-off' disabled />
							<z.label htmlFor='disabled-off' className='text-muted-foreground'>
								Disabled (off)
							</z.label>
						</z.box>
						<z.box className='flex items-center space-x-2'>
							<z.switch id='disabled-on' disabled defaultChecked />
							<z.label htmlFor='disabled-on' className='text-muted-foreground'>
								Disabled (on)
							</z.label>
						</z.box>
					</z.box>
				</ComponentPreview>

				{/* Settings List */}
				<ComponentPreview
					title='Settings List'
					description='A list of toggleable settings using switches.'
					code={examples.settingsList}
				>
					<z.box className='w-full max-w-sm space-y-4'>
						<z.box className='flex items-center justify-between rounded-lg border p-4'>
							<z.box className='space-y-0.5'>
								<z.label htmlFor='marketing'>Marketing emails</z.label>
								<z.text.body className='text-sm text-muted-foreground'>Receive emails about new products and features.</z.text.body>
							</z.box>
							<z.switch id='marketing' />
						</z.box>
						<z.box className='flex items-center justify-between rounded-lg border p-4'>
							<z.box className='space-y-0.5'>
								<z.label htmlFor='security'>Security emails</z.label>
								<z.text.body className='text-sm text-muted-foreground'>Receive emails about your account activity.</z.text.body>
							</z.box>
							<z.switch id='security' defaultChecked />
						</z.box>
						<z.box className='flex items-center justify-between rounded-lg border p-4'>
							<z.box className='space-y-0.5'>
								<z.label htmlFor='updates'>Product updates</z.label>
								<z.text.body className='text-sm text-muted-foreground'>Receive emails about product updates.</z.text.body>
							</z.box>
							<z.switch id='updates' defaultChecked />
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Switch' props={switchProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Space
									</z.text>
									<z.text className='text-muted-foreground'>Toggle the switch</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always pair switches with visible labels</z.box>
								<z.box as='li'>Use switches for binary on/off settings</z.box>
								<z.box as='li'>Provide immediate feedback - changes should take effect instantly</z.box>
								<z.box as='li'>Use checkboxes instead if the change requires a submit action</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
