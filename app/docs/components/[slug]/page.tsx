'use client'

import Link from 'next/link'
import { use, useMemo, useState } from 'react'
import { z } from '@/components/ui'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CATALOG_BY_SLUG, COMPONENT_CATALOG } from '../catalog'
import styles from '../component-explorer.module.css'

const statusMap = {
	ready: { label: 'Ready', badgeProps: { isOutline: true, isGreen: true } },
	'in-progress': { label: 'In Progress', badgeProps: { isOutline: true, isPurple: true } },
	planned: { label: 'Planned', badgeProps: { isOutline: true, isOrange: true } }
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
		<div className={styles.page}>
			<div className={styles.header}>
				<div className='flex items-center gap-2 text-sm text-muted-foreground'>
					<Link href='/docs'>Docs</Link>
					<span>/</span>
					<Link href='/docs/components'>Components</Link>
					<span>/</span>
					<span className='text-foreground'>{component.name}</span>
				</div>
				<div className='flex flex-wrap items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight'>{component.name}</h1>
					<z.badge {...getStatusBadgeProps(component.status)}>{statusMap[component.status].label}</z.badge>
				</div>
				<p className='max-w-3xl text-lg text-muted-foreground'>{component.description}</p>
				<p className='text-sm text-muted-foreground'>
					Canonical export: <span className='font-mono text-foreground'>{component.zName}</span> from{' '}
					<span className='font-mono text-foreground'>@/components/ui/z-components</span>.
				</p>
			</div>

			<div className={styles.controls}>
				<h2 className='text-xl font-semibold'>Playground</h2>
				<div className={styles.controlRow}>
					<div className='flex items-center justify-between'>
						<Label htmlFor='density'>Density</Label>
						<div className={styles.segment} id='density'>
							{(['compact', 'comfortable', 'spacious'] as const).map((option) => (
								<button key={option} type='button' data-active={density === option} onClick={() => setDensity(option)}>
									{option}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className={styles.controlRow}>
					<Slider
						id='emphasis'
						label='Accent Emphasis'
						formatValue={(value) => `${Math.round(value)}%`}
						min={15}
						max={100}
						step={5}
						value={emphasis}
						onValueChange={setEmphasis}
					/>
				</div>

				<div className='flex items-center justify-between'>
					<Label htmlFor='compact'>Compact Preview</Label>
					<Switch id='compact' checked={compact} onCheckedChange={setCompact} />
				</div>
			</div>

			<div className={styles.previewSurface}>
				<div
					className={styles.previewCard}
					style={{
						borderColor: accentMix,
						maxWidth: compact ? '22rem' : '28rem',
						gap: compact ? '0.5rem' : '0.85rem'
					}}
				>
					<div className='flex items-center justify-between'>
						<p className='text-xs uppercase tracking-[0.12em] text-muted-foreground'>{component.name} variation</p>
						<z.badge isOutline isWhite>
							{density}
						</z.badge>
					</div>
					<p className='text-sm text-foreground'>{previewCopy}</p>
					<div className={styles.meta}>
						<z.badge isGhost isWhite>
							{foundationMap[component.foundation]}
						</z.badge>
						{component.notes && (
							<z.badge isOutline isWhite>
								{component.notes}
							</z.badge>
						)}
					</div>
				</div>

				<p className='text-sm text-muted-foreground'>
					This route guarantees every planned component has a configurable surface while dedicated deep-dive docs are built.
				</p>
			</div>

			<section className='space-y-3'>
				<h2 className='text-xl font-semibold'>ZComponent Usage</h2>
				<pre className='overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm'>
					{`import { ${component.zName} } from "@/components/ui/z-components"

export function Demo() {
  return <${component.zName} />
}`}
				</pre>
			</section>

			<section className='space-y-3'>
				<h2 className='text-xl font-semibold'>All Components</h2>
				<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
					{COMPONENT_CATALOG.map((entry) => (
						<Link
							key={entry.slug}
							href={`/docs/components/${entry.slug}`}
							className='rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30'
						>
							<div className='mb-2 flex items-center justify-between gap-2'>
								<p className='font-medium text-foreground'>{entry.name}</p>
								<z.badge {...getStatusBadgeProps(entry.status)}>{statusMap[entry.status].label}</z.badge>
							</div>
							<p className='text-sm text-muted-foreground'>{entry.description}</p>
						</Link>
					))}
				</div>
			</section>
		</div>
	)
}
