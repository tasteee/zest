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
import { z } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

const brandColors = [
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
		<z.box className='group rounded-lg border border-border overflow-hidden hover:border-foreground/30 transition-colors'>
			<z.box className={cn('h-24 w-full', colorClass)} />
			<z.box className='p-4 space-y-3'>
				<z.box>
					<z.text.h4 isPrimary isBold>
						{name}
					</z.text.h4>
					<z.text.body className='text-xs text-muted-foreground mt-1'>{usage}</z.text.body>
				</z.box>
				<z.box className='space-y-1.5'>
					<z.button
						onClick={() => copy(variable, 'var')}
						className='flex items-center justify-between w-full text-left group/btn'
					>
						<z.box as='code' className='text-xs font-mono text-foreground'>
							{variable}
						</z.box>
						<z.text
							className={cn(
								'text-[10px] transition-opacity',
								copied === 'var' ? 'text-neon-purple opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
							)}
						>
							{copied === 'var' ? 'Copied!' : 'Copy'}
						</z.text>
					</z.button>
					<z.button
						onClick={() => copy(value, 'value')}
						className='flex items-center justify-between w-full text-left group/btn'
					>
						<z.box as='code' className='text-xs font-mono text-muted-foreground'>
							{value}
						</z.box>
						<z.text
							className={cn(
								'text-[10px] transition-opacity',
								copied === 'value' ? 'text-neon-purple opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
							)}
						>
							{copied === 'value' ? 'Copied!' : 'Copy'}
						</z.text>
					</z.button>
					{hex && (
						<z.button onClick={() => copy(hex, 'hex')} className='flex items-center justify-between w-full text-left group/btn'>
							<z.box as='code' className='text-xs font-mono text-muted-foreground'>
								{hex}
							</z.box>
							<z.text
								className={cn(
									'text-[10px] transition-opacity',
									copied === 'hex' ? 'text-neon-purple opacity-100' : 'text-muted-foreground opacity-0 group-hover/btn:opacity-100'
								)}
							>
								{copied === 'hex' ? 'Copied!' : 'Copy'}
							</z.text>
						</z.button>
					)}
				</z.box>
			</z.box>
		</z.box>
	)
}

export default function ColorsPage() {
	return (
		<z.box>
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
				<z.box className='grid grid-cols-2 md:grid-cols-3 gap-4'>
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
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage in Code</DocsSectionTitle>

				<DocsSectionSubtitle>Tailwind Classes</DocsSectionSubtitle>
				<DocsText>Use the semantic color classes directly in your components:</DocsText>
				<CodeBlock
					code={`// Background colors
<z.box className="bg-background">Page background</z.box>
<z.box className="bg-card">Card surface</z.box>
<z.box className="bg-muted">Subtle background</z.box>

// Text colors
<z.text.body className="text-primary">Headlines</z.text.body>
<z.text.body className="text-foreground">Body text</z.text.body>
<z.text.body className="text-muted-foreground">Secondary text</z.text.body>

// Brand neons
<z.button className="bg-neon-purple text-primary-foreground">
  Primary Action
</z.button>
<span className="text-neon-pink">Accent text</span>`}
					language='tsx'
					filename='Example.tsx'
				/>

				<DocsSectionSubtitle>CSS Variables</DocsSectionSubtitle>
				<DocsText>Access colors via CSS variables for custom styling:</DocsText>
				<CodeBlock
					code={`.custom-element {
  background: var(---purple);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}

.gradient-accent {
  background: linear-gradient(
    135deg,
    var(---purple),
    var(---purple)
  );
}`}
					language='css'
					filename='styles.css'
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage Guidelines</DocsSectionTitle>

				<z.box className='grid md:grid-cols-2 gap-6'>
					<z.box className='rounded-lg border border-neon-purple/30 p-6'>
						<z.text.h4 isPurple isBold className='mb-4 flex items-center gap-2'>
							<Check className='w-4 h-4' />
							Do
						</z.text.h4>
						<z.box as='ul' className='space-y-2 text-sm text-foreground'>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Use neon colors for interactive elements and highlights
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Maintain high contrast between text and backgrounds
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Use neutral sparingly for hierarchy
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Scatter brand colors throughout—don&apos;t be shy
							</z.box>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-neon-pink/30 p-6'>
						<z.text.h4 isPink isBold className='mb-4 flex items-center gap-2'>
							<X className='w-4 h-4' />
							Don&apos;t
						</z.text.h4>
						<z.box as='ul' className='space-y-2 text-sm text-foreground'>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Never use blue. Seriously. Not even close.
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Don&apos;t stack similar background colors
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Avoid pure black (#000000) backgrounds
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Don&apos;t use neon colors for large text blocks
							</z.box>
						</z.box>
					</z.box>
				</z.box>
			</DocsSection>

			<DocsNote>
				All colors are defined using OKLCH for perceptual uniformity. This ensures consistent brightness across the color
				palette.
			</DocsNote>
		</z.box>
	)
}
