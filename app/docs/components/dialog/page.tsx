'use client'

import Link from 'next/link'
import { ZButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from '@/components/ui/dialog'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, AlertTriangle, Share, Copy, Settings } from 'lucide-react'

const dialogProps: PropDefinition[] = [
	{
		name: 'open',
		type: 'boolean',
		description: 'The controlled open state of the dialog.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Event handler called when the open state changes.'
	},
	{
		name: 'defaultOpen',
		type: 'boolean',
		defaultValue: 'false',
		description: 'The open state of the dialog when initially rendered.'
	},
	{
		name: 'modal',
		type: 'boolean',
		defaultValue: 'true',
		description:
			'When true, interaction with outside elements is disabled and only dialog content is visible to screen readers.'
	}
]

const dialogContentProps: PropDefinition[] = [
	{
		name: 'onOpenAutoFocus',
		type: '(event: Event) => void',
		description: 'Event handler called when focus moves into the dialog after opening.'
	},
	{
		name: 'onCloseAutoFocus',
		type: '(event: Event) => void',
		description: 'Event handler called when focus moves to the trigger after closing.'
	},
	{
		name: 'onEscapeKeyDown',
		type: '(event: KeyboardEvent) => void',
		description: 'Event handler called when the escape key is pressed.'
	},
	{
		name: 'onPointerDownOutside',
		type: '(event: PointerDownOutsideEvent) => void',
		description: 'Event handler called when a pointer event occurs outside the dialog.'
	},
	{
		name: 'forceMount',
		type: 'boolean',
		description: 'Used to force mounting when more control is needed.'
	}
]

export default function DialogDocsPage() {
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
				<span className='text-foreground'>Dialog</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZDialog</h1>
					<Badge kind='ghost' color='white'>Component</Badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					A modal dialog that interrupts the user with important content and expects a response. Built on Radix UI Dialog
					primitive with full accessibility support.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				code={`import {
  ZDialog,
  ZDialogContent,
  ZDialogDescription,
  ZDialogFooter,
  ZDialogHeader,
  ZDialogTitle,
  ZDialogTrigger,
  ZButton,
  ZInput,
  ZLabel,
} from '@tasteee/zest'

export function DialogDemo() {
  return (
    <ZDialog>
      <ZDialogTrigger asChild>
        <ZButton variant="outline">Open Dialog</ZButton>
      </ZDialogTrigger>
      <ZDialogContent className="sm:max-w-[425px]">
        <ZDialogHeader>
          <ZDialogTitle>Edit profile</ZDialogTitle>
          <ZDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </ZDialogDescription>
        </ZDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ZLabel htmlFor="name" className="text-right">Name</ZLabel>
            <ZInput id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <ZDialogFooter>
          <ZButton type="submit">Save changes</ZButton>
        </ZDialogFooter>
      </ZDialogContent>
    </ZDialog>
  )
}`}
			>
				<Dialog>
					<DialogTrigger asChild>
						<ZButton variant='outline'>Open Dialog</ZButton>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='name' className='text-right'>
									Name
								</Label>
								<Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='username' className='text-right'>
									Username
								</Label>
								<Input id='username' defaultValue='@peduarte' className='col-span-3' />
							</div>
						</div>
						<DialogFooter>
							<ZButton type='submit'>Save changes</ZButton>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock
					code={`import {
  ZDialog,
  ZDialogContent,
  ZDialogDescription,
  ZDialogHeader,
  ZDialogTitle,
  ZDialogTrigger,
} from '@tasteee/zest'`}
					language='tsx'
				/>
				<CodeBlock
					code={`<ZDialog>
  <ZDialogTrigger>Open</ZDialogTrigger>
  <ZDialogContent>
    <ZDialogHeader>
      <ZDialogTitle>Are you sure?</ZDialogTitle>
      <ZDialogDescription>
        This action cannot be undone.
      </ZDialogDescription>
    </ZDialogHeader>
  </ZDialogContent>
</ZDialog>`}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Confirmation Dialog */}
				<ComponentPreview
					title='Confirmation Dialog'
					description='A dialog for confirming destructive actions.'
					code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        Are you absolutely sure?
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="gap-2 sm:gap-0">
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
				>
					<Dialog>
						<DialogTrigger asChild>
							<ZButton variant='destructive'>Delete Account</ZButton>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className='flex items-center gap-2'>
									<AlertTriangle className='h-5 w-5 text-destructive' />
									Are you absolutely sure?
								</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className='gap-2 sm:gap-0'>
								<DialogClose asChild>
									<ZButton variant='outline'>Cancel</ZButton>
								</DialogClose>
								<ZButton variant='destructive'>Delete Account</ZButton>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</ComponentPreview>

				{/* Share Dialog */}
				<ComponentPreview
					title='Share Dialog'
					description='A dialog for sharing content with a copy link feature.'
					code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Share className="mr-2 h-4 w-4" />
      Share
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Share link</DialogTitle>
      <DialogDescription>
        Anyone who has this link will be able to view this.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">Link</Label>
        <Input id="link" defaultValue="https://example.com/share/abc123" readOnly />
      </div>
      <Button type="submit" size="sm" className="px-3">
        <span className="sr-only">Copy</span>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
    <DialogFooter className="sm:justify-start">
      <DialogClose asChild>
        <Button type="button" variant="secondary">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
				>
					<Dialog>
						<DialogTrigger asChild>
							<ZButton variant='outline'>
								<Share className='mr-2 h-4 w-4' />
								Share
							</ZButton>
						</DialogTrigger>
						<DialogContent className='sm:max-w-md'>
							<DialogHeader>
								<DialogTitle>Share link</DialogTitle>
								<DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
							</DialogHeader>
							<div className='flex items-center space-x-2'>
								<div className='grid flex-1 gap-2'>
									<Label htmlFor='link' className='sr-only'>
										Link
									</Label>
									<Input id='link' defaultValue='https://example.com/share/abc123' readOnly />
								</div>
								<ZButton type='submit' size='sm' className='px-3'>
									<span className='sr-only'>Copy</span>
									<Copy className='h-4 w-4' />
								</ZButton>
							</div>
							<DialogFooter className='sm:justify-start'>
								<DialogClose asChild>
									<ZButton type='button' variant='secondary'>
										Close
									</ZButton>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</ComponentPreview>

				{/* Settings Dialog */}
				<ComponentPreview
					title='Settings Dialog'
					description='A larger dialog with multiple form fields.'
					code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[525px]">
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>
        Configure your account settings and preferences.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <Input id="display-name" placeholder="Enter your display name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" placeholder="Tell us about yourself" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
				>
					<Dialog>
						<DialogTrigger asChild>
							<ZButton variant='outline'>
								<Settings className='mr-2 h-4 w-4' />
								Settings
							</ZButton>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[525px]'>
							<DialogHeader>
								<DialogTitle>Settings</DialogTitle>
								<DialogDescription>Configure your account settings and preferences.</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid gap-2'>
									<Label htmlFor='display-name'>Display Name</Label>
									<Input id='display-name' placeholder='Enter your display name' />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='bio'>Bio</Label>
									<Input id='bio' placeholder='Tell us about yourself' />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='website'>Website</Label>
									<Input id='website' type='url' placeholder='https://example.com' />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<ZButton variant='outline'>Cancel</ZButton>
								</DialogClose>
								<ZButton>Save changes</ZButton>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Dialog' props={dialogProps} />
				<PropsTable title='DialogContent' props={dialogContentProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Keyboard Interactions</h3>
							<div className='grid gap-2'>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Escape</kbd>
									<span className='text-muted-foreground'>Closes the dialog</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Tab</kbd>
									<span className='text-muted-foreground'>Moves focus to the next focusable element</span>
								</div>
								<div className='flex items-center gap-4 text-sm'>
									<kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>Shift + Tab</kbd>
									<span className='text-muted-foreground'>Moves focus to the previous focusable element</span>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Focus Management</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Focus is automatically trapped inside the dialog</li>
								<li>Focus is moved to the first focusable element when opened</li>
								<li>Focus returns to the trigger element when closed</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
