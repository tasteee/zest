'use client'

import Link from 'next/link'
import { use, useMemo, useState } from 'react'
import { z } from '@/components/ui'
import { CATALOG_BY_SLUG, COMPONENT_CATALOG } from '../catalog'
import styles from '../component-explorer.module.css'

const statusMap = {
	ready: { label: 'Ready', badgeProps: { isOutline: true, isPurple: true } },
	'in-progress': { label: 'In Progress', badgeProps: { isOutline: true, isPurple: true } },
	planned: { label: 'Planned', badgeProps: { isOutline: true, isPink: true } }
} as const

function getStatusBadgeProps(status: keyof typeof statusMap) {
	return statusMap[status].badgeProps
}

const foundationMap = {
	radix: 'Radix primitive foundation',
	custom: 'Custom low-overhead implementation',
	native: 'Native HTML semantic implementation'
}

export default function ComponentExplorerPage(props: { params: Promise<{ slug: string }> }) {
	const params = use(props.params)
	const component = CATALOG_BY_SLUG.get(params.slug)

	if (!component) {
		return null
	}

	const [compact, setCompact] = useState(false)
	const [emphasis, setEmphasis] = useState(60)
	const [density, setDensity] = useState<'comfortable' | 'compact' | 'spacious'>('comfortable')

	const previewCopy = useMemo(() => {
		const intent =
			density === 'compact'
				? 'information-dense UIs'
				: density === 'spacious'
					? 'editorial and premium marketing surfaces'
					: 'balanced product surfaces'

		return `Configured for ${intent} with ${Math.round(emphasis)}% accent emphasis.`
	}, [density, emphasis])

	const accentMix = `color-mix(in srgb, var(--accent) ${Math.round(emphasis)}%, transparent)`

	return (
		<z.box className={styles.page}>
			<z.box className={styles.header}>
				<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
					<Link href='/docs'>Docs</Link>
					<z.text>/</z.text>
					<Link href='/docs/components'>Components</Link>
					<z.text>/</z.text>
					<z.text className='text-foreground'>{component.name}</z.text>
				</z.box>
				<z.box className='flex flex-wrap items-center gap-3'>
					<z.text.h1>{component.name}</z.text.h1>
					<z.badge {...getStatusBadgeProps(component.status)}>{statusMap[component.status].label}</z.badge>
				</z.box>
				<z.text.body className='max-w-3xl text-lg text-muted-foreground'>{component.description}</z.text.body>
				<z.text.body className='text-sm text-muted-foreground'>
					Canonical export: <z.text className='font-mono text-foreground'>{component.zName}</z.text> from{' '}
					<z.text className='font-mono text-foreground'>@/components/ui/z-components</z.text>.
				</z.text.body>
			</z.box>

			<z.box className={styles.controls}>
				<z.text.h2>Playground</z.text.h2>
				<z.box className={styles.controlRow}>
					<z.box className='flex items-center justify-between'>
						<z.label htmlFor='density'>Density</z.label>
						<z.box className={styles.segment} id='density'>
							{(['compact', 'comfortable', 'spacious'] as const).map((option) => (
								<z.button key={option} type='button' data-active={density === option} onClick={() => setDensity(option)}>
									{option}
								</z.button>
							))}
						</z.box>
					</z.box>
				</z.box>

				<z.box className={styles.controlRow}>
					<z.slider
						id='emphasis'
						label='Accent Emphasis'
						formatValue={(value) => `${Math.round(value)}%`}
						min={15}
						max={100}
						step={5}
						value={emphasis}
						onValueChange={setEmphasis}
					/>
				</z.box>

				<z.box className='flex items-center justify-between'>
					<z.label htmlFor='compact'>Compact Preview</z.label>
					<z.switch id='compact' checked={compact} onCheckedChange={setCompact} />
				</z.box>
			</z.box>

			<z.box className={styles.previewSurface}>
				<z.box
					className={styles.previewCard}
					style={{
						borderColor: accentMix,
						maxWidth: compact ? '22rem' : '28rem',
						gap: compact ? '0.5rem' : '0.85rem'
					}}
				>
					<z.box className='flex items-center justify-between'>
						<z.text.body className='text-xs uppercase tracking-[0.12em] text-muted-foreground'>
							{component.name} variation
						</z.text.body>
						<z.badge isOutline isNeutral>
							{density}
						</z.badge>
					</z.box>
					<z.text.body className='text-sm text-foreground'>{previewCopy}</z.text.body>
					<z.box className={styles.meta}>
						<z.badge isGhost isNeutral>
							{foundationMap[component.foundation]}
						</z.badge>
						{component.notes && (
							<z.badge isOutline isNeutral>
								{component.notes}
							</z.badge>
						)}
					</z.box>
				</z.box>

				<z.text.body className='text-sm text-muted-foreground'>
					This route guarantees every planned component has a configurable surface while dedicated deep-dive docs are built.
				</z.text.body>
			</z.box>

			<z.box as='section' className='space-y-3'>
				<z.text.h2>ZComponent Usage</z.text.h2>
				<z.box as='pre' className='overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm'>
					{`import { ${component.zName} } from "@/components/ui/z-components"

export function Demo() {
  return <${component.zName} />
}`}
				</z.box>
			</z.box>

			<z.box as='section' className='space-y-3'>
				<z.text.h2>All Components</z.text.h2>
				<z.box className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
					{COMPONENT_CATALOG.map((entry) => (
						<Link
							key={entry.slug}
							href={`/docs/components/${entry.slug}`}
							className='rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30'
						>
							<z.box className='mb-2 flex items-center justify-between gap-2'>
								<z.text.body className='font-medium text-foreground'>{entry.name}</z.text.body>
								<z.badge {...getStatusBadgeProps(entry.status)}>{statusMap[entry.status].label}</z.badge>
							</z.box>
							<z.text.body className='text-sm text-muted-foreground'>{entry.description}</z.text.body>
						</Link>
					))}
				</z.box>
			</z.box>
		</z.box>
	)
}
