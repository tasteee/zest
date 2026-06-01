import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsSectionSubtitle,
	DocsText,
	DocsNote
} from '@/components/docs/mdx-components'
import { CodeBlock } from '@/components/docs/code-block'
import { z } from '@/components/ui'

const spacingScale = [
	{ name: '0', value: '0px', class: 'w-0' },
	{ name: 'px', value: '1px', class: 'w-px' },
	{ name: '0.5', value: '2px', class: 'w-0.5' },
	{ name: '1', value: '4px', class: 'w-1' },
	{ name: '1.5', value: '6px', class: 'w-1.5' },
	{ name: '2', value: '8px', class: 'w-2' },
	{ name: '2.5', value: '10px', class: 'w-2.5' },
	{ name: '3', value: '12px', class: 'w-3' },
	{ name: '3.5', value: '14px', class: 'w-3.5' },
	{ name: '4', value: '16px', class: 'w-4' },
	{ name: '5', value: '20px', class: 'w-5' },
	{ name: '6', value: '24px', class: 'w-6' },
	{ name: '7', value: '28px', class: 'w-7' },
	{ name: '8', value: '32px', class: 'w-8' },
	{ name: '9', value: '36px', class: 'w-9' },
	{ name: '10', value: '40px', class: 'w-10' },
	{ name: '11', value: '44px', class: 'w-11' },
	{ name: '12', value: '48px', class: 'w-12' },
	{ name: '14', value: '56px', class: 'w-14' },
	{ name: '16', value: '64px', class: 'w-16' },
	{ name: '20', value: '80px', class: 'w-20' },
	{ name: '24', value: '96px', class: 'w-24' }
]

const radiusScale = [
	{ name: 'none', value: '0', class: 'rounded-none', visual: 'rounded-none' },
	{ name: 'sm', value: 'calc(var(--radius) - 4px)', class: 'rounded-sm', visual: 'rounded-sm' },
	{ name: 'md', value: 'calc(var(--radius) - 2px)', class: 'rounded-md', visual: 'rounded-md' },
	{ name: 'lg', value: 'var(--radius)', class: 'rounded-lg', visual: 'rounded-lg' },
	{ name: 'xl', value: 'calc(var(--radius) + 4px)', class: 'rounded-xl', visual: 'rounded-xl' },
	{ name: '2xl', value: 'calc(var(--radius) + 8px)', class: 'rounded-2xl', visual: 'rounded-2xl' },
	{ name: 'full', value: '9999px', class: 'rounded-full', visual: 'rounded-full' }
]

export default function SpacingPage() {
	return (
		<z.box>
			<DocsTitle>Spacing</DocsTitle>
			<DocsDescription>Consistent spacing creates rhythm. Use the Tailwind scale, not arbitrary values.</DocsDescription>

			<DocsSection>
				<DocsSectionTitle>Spacing Scale</DocsSectionTitle>
				<DocsText>
					The spacing scale follows Tailwind&apos;s default 4px base unit. Prefer these values over arbitrary ones like p-[17px].
				</DocsText>

				<z.box className='rounded-lg border border-border overflow-hidden'>
					<z.box className='grid grid-cols-[80px_80px_1fr] gap-4 p-4 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border'>
						<z.text>Name</z.text>
						<z.text>Size</z.text>
						<z.text>Visual</z.text>
					</z.box>
					<z.box className='divide-y divide-border'>
						{spacingScale.slice(0, 16).map((space) => (
							<z.box key={space.name} className='grid grid-cols-[80px_80px_1fr] gap-4 p-4 items-center'>
								<z.box as='code' className='text-sm text-primary font-mono'>{space.name}</z.box>
								<z.text className='text-sm text-muted-foreground'>{space.value}</z.text>
								<z.box className='flex items-center gap-2'>
									<z.box className={`h-4 bg-neon-purple ${space.class}`} style={{ minWidth: space.value }} />
								</z.box>
							</z.box>
						))}
					</z.box>
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Common Patterns</DocsSectionTitle>

				<DocsSectionSubtitle>Component Padding</DocsSectionSubtitle>
				<z.box className='grid md:grid-cols-3 gap-4 mb-8'>
					<z.box className='rounded-lg border border-border p-3 text-center'>
						<z.text className='text-xs text-muted-foreground block mb-2'>Small</z.text>
						<z.box as='code' className='text-sm text-primary'>p-3</z.box>
						<z.text className='text-xs text-muted-foreground block mt-1'>12px</z.text>
					</z.box>
					<z.box className='rounded-lg border border-border p-4 text-center'>
						<z.text className='text-xs text-muted-foreground block mb-2'>Default</z.text>
						<z.box as='code' className='text-sm text-primary'>p-4</z.box>
						<z.text className='text-xs text-muted-foreground block mt-1'>16px</z.text>
					</z.box>
					<z.box className='rounded-lg border border-border p-6 text-center'>
						<z.text className='text-xs text-muted-foreground block mb-2'>Large</z.text>
						<z.box as='code' className='text-sm text-primary'>p-6</z.box>
						<z.text className='text-xs text-muted-foreground block mt-1'>24px</z.text>
					</z.box>
				</z.box>

				<DocsSectionSubtitle>Gap Spacing</DocsSectionSubtitle>
				<DocsText>Use gap utilities for consistent spacing between elements:</DocsText>
				<CodeBlock
					code={`// Flex layouts with gap
<div className="flex gap-2">      {/* 8px gap */}
<div className="flex gap-4">      {/* 16px gap */}
<div className="flex gap-6">      {/* 24px gap */}

// Grid layouts
<div className="grid grid-cols-3 gap-4">
<div className="grid grid-cols-2 gap-6">

// Different axis gaps
<div className="grid gap-x-4 gap-y-2">`}
					language='tsx'
					filename='Example.tsx'
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Border Radius</DocsSectionTitle>
				<DocsText>The radius scale is based on a CSS variable (--radius: 0.5rem) for easy customization.</DocsText>

				<z.box className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4'>
					{radiusScale.map((radius) => (
						<z.box key={radius.name} className='text-center'>
							<z.box className={`w-16 h-16 bg-neon-purple mx-auto mb-3 ${radius.visual}`} />
							<z.box as='code' className='text-sm text-primary block'>{radius.class}</z.box>
							<z.text className='text-xs text-muted-foreground'>{radius.name}</z.text>
						</z.box>
					))}
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Layout Spacing</DocsSectionTitle>

				<DocsSectionSubtitle>Section Spacing</DocsSectionSubtitle>
				<CodeBlock
					code={`// Page sections
<section className="py-12">         {/* 48px vertical */}
<section className="py-16">         {/* 64px vertical */}
<section className="py-24">         {/* 96px vertical */}

// Content containers
<div className="px-4 md:px-6 lg:px-8">
<div className="max-w-4xl mx-auto">`}
					language='tsx'
					filename='Example.tsx'
				/>

				<DocsSectionSubtitle>Stack Spacing</DocsSectionSubtitle>
				<CodeBlock
					code={`// Vertical stacks
<div className="space-y-2">   {/* 8px between items */}
<div className="space-y-4">   {/* 16px between items */}
<div className="space-y-6">   {/* 24px between items */}

// Better: Use flex with gap
<div className="flex flex-col gap-4">
<div className="flex flex-col gap-6">`}
					language='tsx'
					filename='Example.tsx'
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Best Practices</DocsSectionTitle>

				<z.box className='grid md:grid-cols-2 gap-6'>
					<z.box className='rounded-lg border border-neon-purple/30 p-6'>
						<z.text.h4 isPurple isBold className='mb-4'>
							Do
						</z.text.h4>
						<z.box as='ul' className='space-y-2 text-sm text-foreground'>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Use the spacing scale: p-4, gap-6, mt-8
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Prefer gap over margin for flex/grid layouts
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Use consistent padding within component types
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-purple mt-1'>•</z.text>
								Scale spacing responsively: p-4 md:p-6 lg:p-8
							</z.box>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-neon-pink/30 p-6'>
						<z.text.h4 isPink isBold className='mb-4'>
							Don&apos;t
						</z.text.h4>
						<z.box as='ul' className='space-y-2 text-sm text-foreground'>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Avoid arbitrary values: p-[17px], mt-[23px]
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Don&apos;t mix margin and gap on the same container
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Avoid inconsistent spacing between similar elements
							</z.box>
							<z.box as='li' className='flex items-start gap-2'>
								<z.text className='text-neon-pink mt-1'>•</z.text>
								Don&apos;t use space-* classes (prefer gap)
							</z.box>
						</z.box>
					</z.box>
				</z.box>
			</DocsSection>

			<DocsNote>
				The base radius variable (--radius: 0.5rem) can be adjusted to globally change the roundness of all components in the
				design system.
			</DocsNote>
		</z.box>
	)
}
