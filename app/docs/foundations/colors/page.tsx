'use client'

import { useState } from 'react'
import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsSectionSubtitle,
	DocsText,
	DocsNote,
	DocsGrid
} from '@/components/docs/mdx-components'
import { CodeBlock } from '@/components/docs/code-block'
import { cn } from '@/lib/utils'

const brandColors = [
	{
		name: 'Neon Green',
		variable: '---green',
		class: 'bg-neon-green',
		value: 'oklch(0.85 0.28 145)',
		hex: '#39FF14',
		usage: 'Primary actions, success states, key highlights'
	},
	{
		name: 'Neon Pink',
		variable: '---pink',
		class: 'bg-neon-pink',
		value: 'oklch(0.75 0.25 350)',
		hex: '#FF1493',
		usage: 'Secondary accents, badges, emphasis'
	},
	{
		name: 'Neon Purple',
		variable: '---purple',
		class: 'bg-neon-purple',
		value: 'oklch(0.7 0.25 300)',
		hex: '#BF40BF',
		usage: 'Tertiary accents, tags, categories'
	},
	{
		name: 'Neon Orange',
		variable: '---orange',
		class: 'bg-neon-orange',
		value: 'oklch(0.8 0.22 55)',
		hex: '#FF6B35',
		usage: 'Warnings, attention, call-outs'
	}
]

const semanticColors = [
	{
		name: 'Background',
		variable: '--background',
		class: 'bg-background',
		value: 'oklch(0.12 0.02 145)',
		usage: 'Page background'
	},
	{
		name: 'Foreground',
		variable: '--foreground',
		class: 'bg-foreground',
		value: 'oklch(0.65 0 0)',
		usage: 'Body text, descriptions'
	},
	{
		name: 'Primary',
		variable: '--primary',
		class: 'bg-primary',
		value: 'oklch(0.98 0 0)',
		usage: 'Headlines, primary text, CTAs'
	},
	{
		name: 'Muted',
		variable: '--muted',
		class: 'bg-muted',
		value: 'oklch(0.2 0.012 145)',
		usage: 'Subtle backgrounds, disabled states'
	},
	{
		name: 'Card',
		variable: '--card',
		class: 'bg-card',
		value: 'oklch(0.14 0.018 145)',
		usage: 'Elevated surfaces, cards'
	},
	{
		name: 'Border',
		variable: '--border',
		class: 'bg-border',
		value: 'oklch(0.28 0.015 145)',
		usage: 'Dividers, outlines'
	}
]

function ColorSwatch({
	name,
	variable,
	colorClass,
	value,
	hex,
	usage
}: {
	name: string
	variable: string
	colorClass: string
	value: string
	hex?: string
	usage: string
}) {
	const [copied, setCopied] = useState<string | null>(null)

	const copy = (text: string, type: string) => {
		navigator.clipboard.writeText(text)
		setCopied(type)
		setTimeout(() => setCopied(null), 2000)
	}

	return (
		<div className='group rounded-lg border border-border overflow-hidden hover:border-foreground/30 transition-colors'>
			<div className={cn('h-24 w-full', colorClass)} />
			<div className='p-4 space-y-3'>
				<div>
					<h4 className='font-semibold text-primary'>{name}</h4>
					<p className='text-xs text-muted-foreground mt-1'>{usage}</p>
				</div>
				<div className='space-y-1.5'>
					<button onClick={() => copy(variable, 'var')} className='flex items-center justify-between w-full text-left group/btn'>
						<code className='text-xs font-mono text-foreground'>{variable}</code>
						<span
							className={cn(
								'text-[10px] transition-opacity',
								copied === 'var' ? 'text-neon-green opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
							)}
						>
							{copied === 'var' ? 'Copied!' : 'Copy'}
						</span>
					</button>
					<button onClick={() => copy(value, 'value')} className='flex items-center justify-between w-full text-left group/btn'>
						<code className='text-xs font-mono text-muted-foreground'>{value}</code>
						<span
							className={cn(
								'text-[10px] transition-opacity',
								copied === 'value' ? 'text-neon-green opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
							)}
						>
							{copied === 'value' ? 'Copied!' : 'Copy'}
						</span>
					</button>
					{hex && (
						<button onClick={() => copy(hex, 'hex')} className='flex items-center justify-between w-full text-left group/btn'>
							<code className='text-xs font-mono text-muted-foreground'>{hex}</code>
							<span
								className={cn(
									'text-[10px] transition-opacity',
									copied === 'hex' ? 'text-neon-green opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
								)}
							>
								{copied === 'hex' ? 'Copied!' : 'Copy'}
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default function ColorsPage() {
	return (
		<div>
			<DocsTitle>Colors</DocsTitle>
			<DocsDescription>Neons that cut through the dark. No fucking blue. Ever.</DocsDescription>

			<DocsSection>
				<DocsSectionTitle>Brand Neons</DocsSectionTitle>
				<DocsText>
					The signature colors of tasteink. Bold, vibrant, and unapologetic. Use these for interactive elements, badges, and key
					highlights.
				</DocsText>
				<DocsGrid columns={2}>
					{brandColors.map((color) => (
						<ColorSwatch
							key={color.name}
							name={color.name}
							variable={color.variable}
							colorClass={color.class}
							value={color.value}
							hex={color.hex}
							usage={color.usage}
						/>
					))}
				</DocsGrid>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Semantic Colors</DocsSectionTitle>
				<DocsText>
					The foundation of our interface. These colors define the visual hierarchy and ensure consistent contrast throughout the
					design system.
				</DocsText>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
					{semanticColors.map((color) => (
						<ColorSwatch
							key={color.name}
							name={color.name}
							variable={color.variable}
							colorClass={color.class}
							value={color.value}
							usage={color.usage}
						/>
					))}
				</div>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage in Code</DocsSectionTitle>

				<DocsSectionSubtitle>Tailwind Classes</DocsSectionSubtitle>
				<DocsText>Use the semantic color classes directly in your components:</DocsText>
				<CodeBlock
					code={`// Background colors
<div className="bg-background">Page background</div>
<div className="bg-card">Card surface</div>
<div className="bg-muted">Subtle background</div>

// Text colors
<p className="text-primary">Headlines</p>
<p className="text-foreground">Body text</p>
<p className="text-muted-foreground">Secondary text</p>

// Brand neons
<button className="bg-neon-green text-primary-foreground">
  Primary Action
</button>
<span className="text-neon-pink">Accent text</span>`}
					language='tsx'
					filename='Example.tsx'
				/>

				<DocsSectionSubtitle>CSS Variables</DocsSectionSubtitle>
				<DocsText>Access colors via CSS variables for custom styling:</DocsText>
				<CodeBlock
					code={`.custom-element {
  background: var(---green);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}

.gradient-accent {
  background: linear-gradient(
    135deg,
    var(---green),
    var(---purple)
  );
}`}
					language='css'
					filename='styles.css'
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage Guidelines</DocsSectionTitle>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='rounded-lg border border-neon-green/30 p-6'>
						<h4 className='text-neon-green font-semibold mb-4 flex items-center gap-2'>
							<svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
							</svg>
							Do
						</h4>
						<ul className='space-y-2 text-sm text-foreground'>
							<li className='flex items-start gap-2'>
								<span className='text-neon-green mt-1'>•</span>
								Use neon colors for interactive elements and highlights
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-green mt-1'>•</span>
								Maintain high contrast between text and backgrounds
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-green mt-1'>•</span>
								Use white sparingly for hierarchy
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-green mt-1'>•</span>
								Scatter brand colors throughout—don&apos;t be shy
							</li>
						</ul>
					</div>

					<div className='rounded-lg border border-neon-pink/30 p-6'>
						<h4 className='text-neon-pink font-semibold mb-4 flex items-center gap-2'>
							<svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
							Don&apos;t
						</h4>
						<ul className='space-y-2 text-sm text-foreground'>
							<li className='flex items-start gap-2'>
								<span className='text-neon-pink mt-1'>•</span>
								Never use blue. Seriously. Not even close.
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-pink mt-1'>•</span>
								Don&apos;t stack similar background colors
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-pink mt-1'>•</span>
								Avoid pure black (#000000) backgrounds
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-neon-pink mt-1'>•</span>
								Don&apos;t use neon colors for large text blocks
							</li>
						</ul>
					</div>
				</div>
			</DocsSection>

			<DocsNote>
				All colors are defined using OKLCH for perceptual uniformity. This ensures consistent brightness across the color
				palette.
			</DocsNote>
		</div>
	)
}
