'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis
} from '@/components/ui/pagination'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { paginationLinkProps, paginationPreviousNextProps } from './props'
import { examples } from './examples'

const TOTAL_PAGES = 5

export default function PaginationDocsPage() {
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handlePreviousClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		const isFirstPage = currentPage <= 1
		if (isFirstPage) return
		handlePageChange(currentPage - 1)
	}

	const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		const isLastPage = currentPage >= TOTAL_PAGES
		if (isLastPage) return
		handlePageChange(currentPage + 1)
	}

	const handlePageLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
		event.preventDefault()
		handlePageChange(page)
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
				<z.text className='text-foreground'>Pagination</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Pagination</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Navigation controls for paged content. Includes previous/next links, page number links, ellipsis for collapsed ranges,
					and full controlled state support.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href='#' />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#' isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href='#' />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
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

				{/* With Ellipsis */}
				<ComponentPreview
					title='With Ellipsis'
					description='Use PaginationEllipsis to represent collapsed page ranges in large datasets.'
					code={examples.withEllipsis}
				>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href='#' />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>4</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#' isActive>
									5
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>6</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>20</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href='#' />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</ComponentPreview>

				{/* Controlled */}
				<ComponentPreview
					title='Controlled'
					description={`Controlled pagination with live state. Current page: ${currentPage}`}
					code={examples.controlled}
				>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href='#' onClick={handlePreviousClick} />
							</PaginationItem>
							{Array.from({ length: TOTAL_PAGES }).map((_, index) => {
								const page = index + 1
								const isCurrentPage = currentPage === page
								return (
									<PaginationItem key={page}>
										<PaginationLink
											href='#'
											isActive={isCurrentPage}
											onClick={(event) => {
												handlePageLinkClick(event, page)
											}}
										>
											{page}
										</PaginationLink>
									</PaginationItem>
								)
							})}
							<PaginationItem>
								<PaginationNext href='#' onClick={handleNextClick} />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='PaginationLink' props={paginationLinkProps} />
				<PropsTable title='PaginationPrevious / PaginationNext' props={paginationPreviousNextProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Tab
									</z.text>
									<z.text className='text-muted-foreground'>Move focus between pagination links</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Enter
									</z.text>
									<z.text className='text-muted-foreground'>Navigate to the focused page</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Best Practices</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>The Pagination root renders a nav element with aria-label="pagination" automatically</z.box>
								<z.box as='li'>PaginationLink sets aria-current="page" on the active page link</z.box>
								<z.box as='li'>PaginationEllipsis has aria-hidden="true" — it is decorative, not interactive</z.box>
								<z.box as='li'>For controlled pagination, always prevent default on href="#" links to avoid scroll jumps</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
