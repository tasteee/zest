import type { Meta, StoryObj } from '@storybook/nextjs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { z } from '@/components/ui'
import { Input } from './input'
import { Label } from './label'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof Dialog> = {
	title: 'UI/Dialog',
	component: Dialog,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Dialog>

// ─── Shared styles ──────────────────────────────────────────────────────────

const sectionLabelStyle: React.CSSProperties = {
	fontSize: 11,
	fontWeight: 600,
	letterSpacing: '0.12em',
	textTransform: 'uppercase',
	color: 'var(--color-muted-foreground, #888)',
	marginBottom: 12,
	display: 'block'
}

const gridWrapperStyle: React.CSSProperties = {
	padding: 32,
	display: 'flex',
	flexDirection: 'column',
	gap: 32
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 12,
	flexWrap: 'wrap'
}

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				{/* Basic Dialogs */}
				<div>
					<span style={sectionLabelStyle}>Basic Dialogs</span>
					<div style={rowStyle}>
						<Dialog>
							<DialogTrigger asChild>
								<z.button>Simple Dialog</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Simple Dialog</DialogTitle>
									<DialogDescription>This is a simple dialog with just a title and description.</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>

						<Dialog>
							<DialogTrigger asChild>
								<z.button>With Footer</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Confirm Action</DialogTitle>
									<DialogDescription>Are you sure you want to continue? This action cannot be undone.</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<z.button>Cancel</z.button>
									<z.button>Continue</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Destructive Actions */}
				<div>
					<span style={sectionLabelStyle}>Destructive Actions</span>
					<div style={rowStyle}>
						<Dialog>
							<DialogTrigger asChild>
								<z.button isPink>Delete Account</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Delete Account</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete your account and remove all of your data from our
										servers.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<z.button>Cancel</z.button>
									<z.button isPink>Delete Account</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog>
							<DialogTrigger asChild>
								<z.button>
									<Phosphor.Trash />
									Delete Item
								</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Delete Item</DialogTitle>
									<DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<z.button>Cancel</z.button>
									<z.button isPink>
										<Phosphor.Trash />
										Delete
									</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Form Dialogs */}
				<div>
					<span style={sectionLabelStyle}>Form Dialogs</span>
					<div style={rowStyle}>
						<Dialog>
							<DialogTrigger asChild>
								<z.button>
									<Phosphor.Plus />
									Create Project
								</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create Project</DialogTitle>
									<DialogDescription>Add a new project to your workspace. Click save when you&apos;re done.</DialogDescription>
								</DialogHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid gap-2'>
										<Label htmlFor='name'>Project name</Label>
										<Input id='name' placeholder='My awesome project' focusColor='green' />
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='description'>Description</Label>
										<Input id='description' placeholder='A brief description...' focusColor='green' />
									</div>
								</div>
								<DialogFooter>
									<z.button>Cancel</z.button>
									<z.button>Create Project</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog>
							<DialogTrigger asChild>
								<z.button>
									<Phosphor.UserPlus />
									Invite Member
								</z.button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Invite Team Member</DialogTitle>
									<DialogDescription>Invite a new member to join your team.</DialogDescription>
								</DialogHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email address</Label>
										<Input id='email' type='email' placeholder='colleague@company.com' focusColor='purple' />
									</div>
								</div>
								<DialogFooter>
									<z.button>Cancel</z.button>
									<z.button>
										<Phosphor.PaperPlaneTilt />
										Send Invite
									</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Without Close Button */}
				<div>
					<span style={sectionLabelStyle}>Without Close Button</span>
					<div style={rowStyle}>
						<Dialog>
							<DialogTrigger asChild>
								<z.button>No Close Button</z.button>
							</DialogTrigger>
							<DialogContent showCloseButton={false}>
								<DialogHeader>
									<DialogTitle>Custom Close Behavior</DialogTitle>
									<DialogDescription>
										This dialog doesn&apos;t have the default close button. Use the action buttons or click outside to close.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<z.button>Close</z.button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		)
	}
}

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
	render: () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<z.button>Open Dialog</z.button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your account and remove all data.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<z.button>Cancel</z.button>
						<z.button isPink>Delete</z.button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
}

export const WithForm: StoryT = {
	render: () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<z.button>
						<Phosphor.Plus />
						Create New
					</z.button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Project</DialogTitle>
						<DialogDescription>Add a new project to your workspace.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label htmlFor='project-name'>Name</Label>
							<Input id='project-name' placeholder='Project name' focusColor='green' />
						</div>
					</div>
					<DialogFooter>
						<z.button>Cancel</z.button>
						<z.button>Create</z.button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
}

export const Destructive: StoryT = {
	render: () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<z.button isPink>
						<Phosphor.Trash />
						Delete
					</z.button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Item</DialogTitle>
						<DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<z.button>Cancel</z.button>
						<z.button isPink>Delete</z.button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
}

export const NoCloseButton: StoryT = {
	render: () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<z.button>No Close Button</z.button>
				</DialogTrigger>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Custom Dialog</DialogTitle>
						<DialogDescription>This dialog has no close button in the corner.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<z.button>Close</z.button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
}

