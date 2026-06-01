'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { accordionProps, accordionItemProps } from './props'
import { examples } from './examples'

export default function AccordionDocsPage() {
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
				<z.text className='text-foreground'>Accordion</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZAccordion</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A vertically stacked set of interactive headings that each reveal a section of content. Built on Radix UI Accordion
					primitive.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.accordion type='single' collapsible className='w-full max-w-lg'>
					<z.accordionItem value='item-1'>
						<z.accordionTrigger>Is it accessible?</z.accordionTrigger>
						<z.accordionContent>Yes. It adheres to the WAI-ARIA design pattern.</z.accordionContent>
					</z.accordionItem>
					<z.accordionItem value='item-2'>
						<z.accordionTrigger>Is it styled?</z.accordionTrigger>
						<z.accordionContent>Yes. It comes with default styles that match your design system.</z.accordionContent>
					</z.accordionItem>
					<z.accordionItem value='item-3'>
						<z.accordionTrigger>Is it animated?</z.accordionTrigger>
						<z.accordionContent>Yes. It&apos;s animated by default, but you can disable it.</z.accordionContent>
					</z.accordionItem>
				</z.accordion>
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

				{/* Multiple */}
				<ComponentPreview
					title='Multiple Items Open'
					description='Allow multiple accordion items to be open at once.'
					code={examples.multipleItems}
				>
					<z.accordion type='multiple' className='w-full max-w-lg'>
						<z.accordionItem value='item-1'>
							<z.accordionTrigger>First Section</z.accordionTrigger>
							<z.accordionContent>This section can stay open while others are opened.</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='item-2'>
							<z.accordionTrigger>Second Section</z.accordionTrigger>
							<z.accordionContent>This section can also remain open simultaneously.</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='item-3'>
							<z.accordionTrigger>Third Section</z.accordionTrigger>
							<z.accordionContent>All three can be open at the same time!</z.accordionContent>
						</z.accordionItem>
					</z.accordion>
				</ComponentPreview>

				{/* Default Open */}
				<ComponentPreview
					title='Default Open'
					description='Set items to be open by default on initial render.'
					code={examples.defaultOpen}
				>
					<z.accordion type='single' collapsible defaultValue='item-2' className='w-full max-w-lg'>
						<z.accordionItem value='item-1'>
							<z.accordionTrigger>Closed by default</z.accordionTrigger>
							<z.accordionContent>This item starts closed.</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='item-2'>
							<z.accordionTrigger>Open by default</z.accordionTrigger>
							<z.accordionContent>This item is open when the page loads.</z.accordionContent>
						</z.accordionItem>
					</z.accordion>
				</ComponentPreview>

				{/* FAQ Example */}
				<ComponentPreview
					title='FAQ Section'
					description='Using accordion for a frequently asked questions section.'
					code={examples.faqSection}
				>
					<z.accordion type='single' collapsible className='w-full max-w-lg'>
						<z.accordionItem value='faq-1'>
							<z.accordionTrigger>How do I get started?</z.accordionTrigger>
							<z.accordionContent>
								Getting started is easy! Simply sign up for an account, complete your profile, and you can begin using all our
								features immediately.
							</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='faq-2'>
							<z.accordionTrigger>What payment methods do you accept?</z.accordionTrigger>
							<z.accordionContent>
								We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise
								customers.
							</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='faq-3'>
							<z.accordionTrigger>Can I cancel my subscription?</z.accordionTrigger>
							<z.accordionContent>
								Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the
								end of your billing period.
							</z.accordionContent>
						</z.accordionItem>
						<z.accordionItem value='faq-4'>
							<z.accordionTrigger>Do you offer refunds?</z.accordionTrigger>
							<z.accordionContent>
								We offer a 30-day money-back guarantee for all new subscriptions. If you&apos;re not satisfied, contact our support
								team for a full refund.
							</z.accordionContent>
						</z.accordionItem>
					</z.accordion>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Accordion' props={accordionProps} />
				<PropsTable title='AccordionItem' props={accordionItemProps} />
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
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Space / Enter</z.text>
									<z.text className='text-muted-foreground'>Toggle the accordion item</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Down</z.text>
									<z.text className='text-muted-foreground'>Move focus to the next trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Arrow Up</z.text>
									<z.text className='text-muted-foreground'>Move focus to the previous trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>Home</z.text>
									<z.text className='text-muted-foreground'>Move focus to the first trigger</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>End</z.text>
									<z.text className='text-muted-foreground'>Move focus to the last trigger</z.text>
								</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
