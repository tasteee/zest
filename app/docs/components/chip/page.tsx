'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { chipProps } from './props'
import { examples } from './examples'

const FILTERS = ['All', 'Design', 'Engineering', 'Marketing', 'Product']
const TAGS = ['React', 'TypeScript', 'CSS', 'Node', 'GraphQL']

export default function ChipDocsPage() {
	const [activeFilter, setActiveFilter] = useState('All')
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const handleTagToggle = (tag: string) => {
		const isAlreadySelected = selectedTags.includes(tag)
		if (isAlreadySelected) {
			setSelectedTags(selectedTags.filter((item) => item !== tag))
			return
		}
		setSelectedTags([...selectedTags, tag])
	}

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
				<z.text className='text-foreground'>Chip</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Chip</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A compact, pill-shaped interactive token used for filters, tags, and multi-select controls. Supports default, selected,
					and disabled states.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.chip>Filter</z.chip>
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

				{/* All States */}
				<ComponentPreview
					title='States'
					description='Chips can be in a default, selected, or disabled state.'
					code={examples.allStates}
				>
					<z.box className='flex items-center gap-3'>
						<z.chip>Default</z.chip>
						<z.chip isSelected>Selected</z.chip>
						<z.chip disabled>Disabled</z.chip>
					</z.box>
				</ComponentPreview>

				{/* Single Select Filter Group */}
				<ComponentPreview
					title='Single Select Filter'
					description='Use chips to build a single-select filter bar. Only one chip is active at a time.'
					code={examples.filterGroup}
				>
					<z.box className='flex flex-wrap gap-2'>
						{FILTERS.map((filter) => (
							<z.chip key={filter} isSelected={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
								{filter}
							</z.chip>
						))}
					</z.box>
				</ComponentPreview>

				{/* Multi Select */}
				<ComponentPreview
					title='Multi Select Tags'
					description='Toggle multiple chips independently for tag or attribute selection.'
					code={examples.multiSelect}
				>
					<z.box className='flex flex-wrap gap-2'>
						{TAGS.map((tag) => (
							<z.chip key={tag} isSelected={selectedTags.includes(tag)} onClick={() => handleTagToggle(tag)}>
								{tag}
							</z.chip>
						))}
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Chip' props={chipProps} />
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
									<z.text className='text-muted-foreground'>Move focus to the chip</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</z.text>
									<z.text className='text-muted-foreground'>Toggle the chip selected state</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Keep chip labels short — one to three words at most</z.box>
								<z.box as='li'>Use chips for filtering or selection, not for navigation</z.box>
								<z.box as='li'>Always communicate the selected state visually and not just through color alone</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
