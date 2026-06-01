'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'
import { z } from '@/components/ui'

interface ComponentPreviewProps {
	children: React.ReactNode
	code: string
	title?: string
	description?: string
	className?: string
	align?: 'start' | 'center' | 'end'
}

export function ComponentPreview({
	children,
	code,
	title,
	description,
	className,
	align = 'center'
}: ComponentPreviewProps) {
	return (
		<z.tabs defaultValue='preview' className='w-full'>
			{(title || description) && (
				<z.box className='mb-4'>
					{title && <z.text.h3 className='text-lg font-semibold text-foreground'>{title}</z.text.h3>}
					{description && <z.text.body className='mt-1 text-sm text-muted-foreground'>{description}</z.text.body>}
				</z.box>
			)}
			<z.tabsList className='w-auto justify-start p-1 h-auto'>
				<z.tabsTrigger value='preview' className='px-4 py-1.5 text-sm'>
					Preview
				</z.tabsTrigger>
				<z.tabsTrigger value='code' className='px-4 py-1.5 text-sm'>
					Code
				</z.tabsTrigger>
			</z.tabsList>
			<z.tabsContent value='preview' className='mt-0'>
				<z.box
					className={cn(
						'flex min-h-50 w-full rounded-lg border border-border bg-card p-8',
						align === 'center' && 'items-center justify-center',
						align === 'start' && 'items-start justify-start',
						align === 'end' && 'items-end justify-end',
						className
					)}
				>
					{children}
				</z.box>
			</z.tabsContent>
			<z.tabsContent value='code' className='mt-0'>
				<CodeBlock code={code} />
			</z.tabsContent>
		</z.tabs>
	)
}

interface ComponentExampleProps {
	title: string
	description?: string
	children: React.ReactNode
	code: string
	className?: string
}

export function ComponentExample({ title, description, children, code, className }: ComponentExampleProps) {
	return (
		<z.box className={cn('space-y-4', className)}>
			<z.box>
				<z.text.h3 className='text-lg font-semibold text-primary'>{title}</z.text.h3>
				{description && <z.text.body className='text-sm text-muted-foreground mt-1'>{description}</z.text.body>}
			</z.box>
			<ComponentPreview code={code}>{children}</ComponentPreview>
		</z.box>
	)
}
