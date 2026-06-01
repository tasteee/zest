import { cn } from '@/lib/utils'
import { z } from '@/components/ui'
import { Info } from 'lucide-react'

type DocsTitleProps = {
	children: React.ReactNode
	badge?: string
	badgeVariant?: 'neutral' | 'pink' | 'purple'
}

const badgeVariantProps = {
	neutral: { isOutline: true, isNeutral: true },
	pink: { isOutline: true, isPink: true },
	purple: { isOutline: true, isPurple: true }
} as const

export function DocsTitle({ children, badge, badgeVariant = 'purple' }: DocsTitleProps) {
	return (
		<z.box className='space-y-2'>
			<z.box className='flex items-center gap-3'>
				<z.text.h1 className='text-4xl font-bold tracking-tight text-primary'>{children}</z.text.h1>
				{badge && <z.badge {...badgeVariantProps[badgeVariant]}>{badge}</z.badge>}
			</z.box>
		</z.box>
	)
}

interface DocsDescriptionProps {
	children: React.ReactNode
}

export function DocsDescription({ children }: DocsDescriptionProps) {
	return <z.text.body className='text-lg text-foreground leading-relaxed mt-2'>{children}</z.text.body>
}

interface DocsSectionProps {
	children: React.ReactNode
	className?: string
}

export function DocsSection({ children, className }: DocsSectionProps) {
	return (
		<z.box as='section' className={cn('mt-12', className)}>
			{children}
		</z.box>
	)
}

interface DocsSectionTitleProps {
	children: React.ReactNode
	id?: string
}

export function DocsSectionTitle({ children, id }: DocsSectionTitleProps) {
	return (
		<z.text.h2 id={id} className='text-2xl font-semibold text-primary mb-4 scroll-mt-20'>
			{children}
		</z.text.h2>
	)
}

interface DocsSectionSubtitleProps {
	children: React.ReactNode
	id?: string
}

export function DocsSectionSubtitle({ children, id }: DocsSectionSubtitleProps) {
	return (
		<z.text.h3 id={id} className='text-lg font-semibold text-primary mb-3 mt-8 scroll-mt-20'>
			{children}
		</z.text.h3>
	)
}

interface DocsTextProps {
	children: React.ReactNode
	className?: string
}

export function DocsText({ children, className }: DocsTextProps) {
	return <z.text.body className={cn('text-foreground leading-relaxed mb-4', className)}>{children}</z.text.body>
}

interface DocsListProps {
	children: React.ReactNode
	className?: string
}

export function DocsList({ children, className }: DocsListProps) {
	return (
		<z.box as='ul' className={cn('list-disc pl-6 space-y-2 text-foreground mb-4', className)}>
			{children}
		</z.box>
	)
}

interface DocsNoteProps {
	children: React.ReactNode
	variant?: 'default' | 'warning' | 'success'
}

export function DocsNote({ children, variant = 'default' }: DocsNoteProps) {
	const variants = {
		default: 'border-neon-purple/50 bg-neon-purple/5',
		warning: 'border-neon-pink/50 bg-neon-pink/5',
		success: 'border-neon-purple/50 bg-neon-purple/5'
	}

	const iconColors = {
		default: 'text-neon-purple',
		warning: 'text-neon-pink',
		success: 'text-neon-purple'
	}

	return (
		<z.box className={cn('rounded-lg border p-4 my-6', variants[variant])}>
			<z.box className='flex gap-3'>
				<Info className={cn('h-5 w-5 mt-0.5 shrink-0', iconColors[variant])} />
				<z.box className='text-sm text-foreground'>{children}</z.box>
			</z.box>
		</z.box>
	)
}

interface DocsGridProps {
	children: React.ReactNode
	columns?: 2 | 3 | 4
	className?: string
}

export function DocsGrid({ children, columns = 2, className }: DocsGridProps) {
	const gridCols = {
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-2 lg:grid-cols-4'
	}

	return <z.box className={cn('grid gap-4', gridCols[columns], className)}>{children}</z.box>
}
