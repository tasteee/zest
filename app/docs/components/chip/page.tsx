'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from '@/components/ui'
import { Chip } from '@/components/ui/chip'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
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
				<span className='text-foreground'>Chip</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Chip</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A compact, pill-shaped interactive token used for filters, tags, and multi-select controls. Supports default, selected,
					and disabled states.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Chip>Filter</Chip>
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

				{/* All States */}
				<ComponentPreview
					title='States'
					description='Chips can be in a default, selected, or disabled state.'
					code={examples.allStates}
				>
					<div className='flex items-center gap-3'>
						<Chip>Default</Chip>
						<Chip isSelected>Selected</Chip>
						<Chip disabled>Disabled</Chip>
					</div>
				</ComponentPreview>

				{/* Single Select Filter Group */}
				<ComponentPreview
					title='Single Select Filter'
					description='Use chips to build a single-select filter bar. Only one chip is active at a time.'
					code={examples.filterGroup}
				>
					<div className='flex flex-wrap gap-2'>
						{FILTERS.map((filter) => (
							<Chip key={filter} isSelected={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
								{filter}
							</Chip>
						))}
					</div>
				</ComponentPreview>

				{/* Multi Select */}
				<ComponentPreview
					title='Multi Select Tags'
					description='Toggle multiple chips independently for tag or attribute selection.'
					code={examples.multiSelect}
				>
					<div className='flex flex-wrap gap-2'>
						{TAGS.map((tag) => (
							<Chip key={tag} isSelected={selectedTags.includes(tag)} onClick={() => handleTagToggle(tag)}>
								{tag}
							</Chip>
						))}
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Chip' props={chipProps} />
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
									<span className='text-muted-foreground'>Move focus to the chip</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Enter / Space</kbd>
									<span className='text-muted-foreground'>Toggle the chip selected state</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Best Practices</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Keep chip labels short — one to three words at most</li>
								<li>Use chips for filtering or selection, not for navigation</li>
								<li>Always communicate the selected state visually and not just through color alone</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
