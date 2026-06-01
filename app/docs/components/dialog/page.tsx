'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, AlertTriangle, Share, Copy, Settings } from 'lucide-react'
import { dialogProps, dialogContentProps } from './props'
import { examples } from './examples'

export default function DialogDocsPage() {
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
				<z.text className='text-foreground'>Dialog</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZDialog</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A modal dialog that interrupts the user with important content and expects a response. Built on Radix UI Dialog
					primitive with full accessibility support.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview code={examples.quickPreview}>
				<z.dialog>
					<z.dialogTrigger asChild>
						<z.button>Open Dialog</z.button>
					</z.dialogTrigger>
					<z.dialogContent className='sm:max-w-106.25'>
						<z.dialogHeader>
							<z.dialogTitle>Edit profile</z.dialogTitle>
							<z.dialogDescription>Make changes to your profile here. Click save when you&apos;re done.</z.dialogDescription>
						</z.dialogHeader>
						<z.box className='grid gap-4 py-4'>
							<z.box className='grid grid-cols-4 items-center gap-4'>
								<z.label htmlFor='name' className='text-right'>
									Name
								</z.label>
								<z.input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
							</z.box>
							<z.box className='grid grid-cols-4 items-center gap-4'>
								<z.label htmlFor='username' className='text-right'>
									Username
								</z.label>
								<z.input id='username' defaultValue='@peduarte' className='col-span-3' />
							</z.box>
						</z.box>
						<z.dialogFooter>
							<z.button type='submit'>Save changes</z.button>
						</z.dialogFooter>
					</z.dialogContent>
				</z.dialog>
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

				{/* Confirmation Dialog */}
				<ComponentPreview
					title='Confirmation Dialog'
					description='A dialog for confirming destructive actions.'
					code={examples.confirmationDialog}
				>
					<z.dialog>
						<z.dialogTrigger asChild>
							<z.button isPink>Delete Account</z.button>
						</z.dialogTrigger>
						<z.dialogContent>
							<z.dialogHeader>
								<z.dialogTitle className='flex items-center gap-2'>
									<AlertTriangle className='h-5 w-5 text-destructive' />
									Are you absolutely sure?
								</z.dialogTitle>
								<z.dialogDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</z.dialogDescription>
							</z.dialogHeader>
							<z.dialogFooter className='gap-2 sm:gap-0'>
								<z.dialogClose asChild>
									<z.button>Cancel</z.button>
								</z.dialogClose>
								<z.button isPink>Delete Account</z.button>
							</z.dialogFooter>
						</z.dialogContent>
					</z.dialog>
				</ComponentPreview>

				{/* Share Dialog */}
				<ComponentPreview
					title='Share Dialog'
					description='A dialog for sharing content with a copy link feature.'
					code={examples.shareDialog}
				>
					<z.dialog>
						<z.dialogTrigger asChild>
							<z.button>
								<Share className='mr-2 h-4 w-4' />
								Share
							</z.button>
						</z.dialogTrigger>
						<z.dialogContent className='sm:max-w-md'>
							<z.dialogHeader>
								<z.dialogTitle>Share link</z.dialogTitle>
								<z.dialogDescription>Anyone who has this link will be able to view this.</z.dialogDescription>
							</z.dialogHeader>
							<z.box className='flex items-center space-x-2'>
								<z.box className='grid flex-1 gap-2'>
									<z.label htmlFor='link' className='sr-only'>
										Link
									</z.label>
									<z.input id='link' defaultValue='https://example.com/share/abc123' readOnly />
								</z.box>
								<z.button type='submit' isSmall className='px-3'>
									<z.text className='sr-only'>Copy</z.text>
									<Copy className='h-4 w-4' />
								</z.button>
							</z.box>
							<z.dialogFooter className='sm:justify-start'>
								<z.dialogClose asChild>
									<z.button type='button'>Close</z.button>
								</z.dialogClose>
							</z.dialogFooter>
						</z.dialogContent>
					</z.dialog>
				</ComponentPreview>

				{/* Settings Dialog */}
				<ComponentPreview
					title='Settings Dialog'
					description='A larger dialog with multiple form fields.'
					code={examples.settingsDialog}
				>
					<z.dialog>
						<z.dialogTrigger asChild>
							<z.button>
								<Settings className='mr-2 h-4 w-4' />
								Settings
							</z.button>
						</z.dialogTrigger>
						<z.dialogContent className='sm:max-w-131.25'>
							<z.dialogHeader>
								<z.dialogTitle>Settings</z.dialogTitle>
								<z.dialogDescription>Configure your account settings and preferences.</z.dialogDescription>
							</z.dialogHeader>
							<z.box className='grid gap-4 py-4'>
								<z.box className='grid gap-2'>
									<z.label htmlFor='display-name'>Display Name</z.label>
									<z.input id='display-name' placeholder='Enter your display name' />
								</z.box>
								<z.box className='grid gap-2'>
									<z.label htmlFor='bio'>Bio</z.label>
									<z.input id='bio' placeholder='Tell us about yourself' />
								</z.box>
								<z.box className='grid gap-2'>
									<z.label htmlFor='website'>Website</z.label>
									<z.input id='website' type='url' placeholder='https://example.com' />
								</z.box>
							</z.box>
							<z.dialogFooter>
								<z.dialogClose asChild>
									<z.button>Cancel</z.button>
								</z.dialogClose>
								<z.button>Save changes</z.button>
							</z.dialogFooter>
						</z.dialogContent>
					</z.dialog>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Dialog' props={dialogProps} />
				<PropsTable title='DialogContent' props={dialogContentProps} />
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
										Escape
									</z.text>
									<z.text className='text-muted-foreground'>Closes the dialog</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Tab
									</z.text>
									<z.text className='text-muted-foreground'>Moves focus to the next focusable element</z.text>
								</z.box>
								<z.box className='flex items-center gap-4 text-sm'>
									<z.text as='kbd' className='px-2 py-1 bg-muted rounded text-xs font-mono'>
										Shift + Tab
									</z.text>
									<z.text className='text-muted-foreground'>Moves focus to the previous focusable element</z.text>
								</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Focus Management</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Focus is automatically trapped inside the dialog</z.box>
								<z.box as='li'>Focus is moved to the first focusable element when opened</z.box>
								<z.box as='li'>Focus returns to the trigger element when closed</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
