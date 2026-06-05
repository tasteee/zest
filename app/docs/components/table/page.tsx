'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { tableProps } from './props'
import { examples } from './examples'

const invoices = [
	{ id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
	{ id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
	{ id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
	{ id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
	{ id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' }
] as const

function getInvoiceStatusBadgeProps(status: (typeof invoices)[number]['status']) {
	if (status === 'Paid') return { isSolid: true, isPurple: true } as const
	if (status === 'Pending') return { isGhost: true, isNeutral: true } as const
	return { isSolid: true, isPink: true } as const
}

export default function TableDocsPage() {
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
				<span className='text-foreground'>Table</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZTable</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A responsive table component for displaying tabular data with proper accessibility and styling.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Table'
				description='A basic table with headers and data rows.'
				code={examples.quickPreview}
			>
				<z.table>
					<z.tableCaption>A list of recent invoices.</z.tableCaption>
					<z.tableHeader>
						<z.tableRow>
							<z.tableHead className='w-25'>Invoice</z.tableHead>
							<z.tableHead>Status</z.tableHead>
							<z.tableHead>Method</z.tableHead>
							<z.tableHead className='text-right'>Amount</z.tableHead>
						</z.tableRow>
					</z.tableHeader>
					<z.tableBody>
						{invoices.map((invoice) => (
							<z.tableRow key={invoice.id}>
								<z.tableCell className='font-medium'>{invoice.id}</z.tableCell>
								<z.tableCell>{invoice.status}</z.tableCell>
								<z.tableCell>{invoice.method}</z.tableCell>
								<z.tableCell className='text-right'>{invoice.amount}</z.tableCell>
							</z.tableRow>
						))}
					</z.tableBody>
				</z.table>
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

				{/* With Footer */}
				<ComponentPreview
					title='With Footer'
					description='A table with a footer row for totals or summaries.'
					code={examples.withFooter}
				>
					<z.table>
						<z.tableHeader>
							<z.tableRow>
								<z.tableHead>Invoice</z.tableHead>
								<z.tableHead>Status</z.tableHead>
								<z.tableHead className='text-right'>Amount</z.tableHead>
							</z.tableRow>
						</z.tableHeader>
						<z.tableBody>
							{invoices.map((invoice) => (
								<z.tableRow key={invoice.id}>
									<z.tableCell>{invoice.id}</z.tableCell>
									<z.tableCell>{invoice.status}</z.tableCell>
									<z.tableCell className='text-right'>{invoice.amount}</z.tableCell>
								</z.tableRow>
							))}
						</z.tableBody>
						<z.tableFooter>
							<z.tableRow>
								<z.tableCell colSpan={2}>Total</z.tableCell>
								<z.tableCell className='text-right'>$1,750.00</z.tableCell>
							</z.tableRow>
						</z.tableFooter>
					</z.table>
				</ComponentPreview>

				{/* With Status Badges */}
				<ComponentPreview
					title='With Status Badges'
					description='Using badges to indicate status in table cells.'
					code={examples.withStatusBadges}
				>
					<z.table>
						<z.tableHeader>
							<z.tableRow>
								<z.tableHead>Invoice</z.tableHead>
								<z.tableHead>Status</z.tableHead>
								<z.tableHead>Method</z.tableHead>
								<z.tableHead className='text-right'>Amount</z.tableHead>
							</z.tableRow>
						</z.tableHeader>
						<z.tableBody>
							{invoices.map((invoice) => (
								<z.tableRow key={invoice.id}>
									<z.tableCell className='font-medium'>{invoice.id}</z.tableCell>
									<z.tableCell>
										<z.badge {...getInvoiceStatusBadgeProps(invoice.status)}>{invoice.status}</z.badge>
									</z.tableCell>
									<z.tableCell>{invoice.method}</z.tableCell>
									<z.tableCell className='text-right'>{invoice.amount}</z.tableCell>
								</z.tableRow>
							))}
						</z.tableBody>
					</z.table>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Table' props={tableProps} />
				<p className='text-sm text-muted-foreground'>
					All table components (TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption) accept
					standard HTML attributes for their respective elements plus a{' '}
					<code className='text-xs bg-muted px-1 py-0.5 rounded'>className</code> prop.
				</p>
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Semantic HTML</h3>
							<p className='text-sm text-muted-foreground'>
								The Table component uses native HTML table elements which provide built-in accessibility for screen readers and
								other assistive technologies.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Table Caption</h3>
							<p className='text-sm text-muted-foreground'>
								Use the TableCaption component to provide a description of the table&apos;s contents. This helps screen reader users
								understand the purpose of the table.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Column Headers</h3>
							<p className='text-sm text-muted-foreground'>
								Always use TableHead for column headers. Screen readers use these to announce column names when navigating table
								cells.
							</p>
						</div>
					</z.cardContent>
				</z.card>
			</section>
		</div>
	)
}
