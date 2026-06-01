'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
	ChevronRight,
	Terminal,
	AlertCircle,
	CheckCircle,
	Info,
	AlertTriangle,
	Bell,
	User,
	Settings,
	CreditCard,
	LogOut,
	Mail,
	Plus,
	Search,
	Loader2,
	Heart,
	Star,
	Send,
	ChevronDown
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { z } from '@/components/ui'

function SectionHeader({ title, description }: { title: string; description?: string }) {
	return (
		<z.box className='mb-8'>
			<z.text.h2 className='mb-2'>{title}</z.text.h2>
			{description && <z.text.body className='text-muted-foreground'>{description}</z.text.body>}
		</z.box>
	)
}

function ExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<z.box className='rounded-lg border border-border bg-card p-6'>
			<z.text as='h3' isSmall isMuted isBold className='mb-4'>
				{title}
			</z.text>
			<z.box className='flex flex-wrap items-start gap-4'>{children}</z.box>
		</z.box>
	)
}

export default function ExamplesPage() {
	const { toast } = useToast()

	const [switchStates, setSwitchStates] = useState({
		airplane: false,
		notifications: true,
		darkMode: false
	})

	const [checkboxStates, setCheckboxStates] = useState({
		terms: false,
		newsletter: true,
		updates: false
	})

	return (
		<z.box className='space-y-16 pb-16'>
			{/* Page Header */}
			<z.box className='space-y-4'>
				<z.box as='nav' className='flex items-center gap-2 text-sm text-muted-foreground'>
					<Link href='/docs' className='hover:text-foreground transition-colors'>
						Docs
					</Link>
					<ChevronRight className='h-4 w-4' />
					<z.text className='text-foreground'>Examples</z.text>
				</z.box>
				<z.text.h1>Component Examples</z.text.h1>
				<z.text.body className='text-lg text-muted-foreground max-w-3xl'>
					A comprehensive showcase of all Zest components with their common variations. Use this page as a reference for
					available styles, states, and configurations.
				</z.text.body>
			</z.box>

			{/* Buttons Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='z.button' description='Buttons with different kinds, themes, and sizes.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Solid Buttons'>
						<z.button isPurple>Purple</z.button>
						<z.button isPurple>Purple</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isNeutral>Neutral</z.button>
					</ExampleCard>

					<ExampleCard title='Outlined Buttons'>
						<z.button isPurple>Purple</z.button>
						<z.button isPurple>Purple</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isNeutral>Neutral</z.button>
					</ExampleCard>

					<ExampleCard title='Ghost Buttons'>
						<z.button isPurple>Purple</z.button>
						<z.button isPurple>Purple</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isPink>Pink</z.button>
						<z.button isNeutral>Neutral</z.button>
					</ExampleCard>

					<ExampleCard title='Button Sizes'>
						<z.button isPurple isExtraSmall>
							Extra Small
						</z.button>
						<z.button isPurple isSmall>
							Small
						</z.button>
						<z.button isPurple isMedium>
							Medium
						</z.button>
						<z.button isPurple isLarge>
							Large
						</z.button>
						<z.button isPurple isExtraLarge>
							Extra Large
						</z.button>
					</ExampleCard>

					<ExampleCard title='Button States'>
						<z.button isPurple>Default</z.button>
						<z.button isPurple isDisabled>
							Disabled
						</z.button>
						<z.button isPurple>
							<Loader2 className='h-4 w-4 animate-spin' />
							Loading
						</z.button>
						<z.button isPink>
							<Heart className='h-4 w-4' />
							With Icon
						</z.button>
						<z.button isPink>
							Submit
							<Send className='h-4 w-4' />
						</z.button>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Badge Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='z.badge' description='Small status indicators and labels.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Solid Badges'>
						<z.badge isSolid isNeutral>
							Default
						</z.badge>
						<z.badge isGhost isNeutral>
							Secondary
						</z.badge>
						<z.badge isSolid isPink>
							Destructive
						</z.badge>
						<z.badge isSolid isPurple>
							Purple
						</z.badge>
						<z.badge isSolid isPurple>
							Purple
						</z.badge>
						<z.badge isSolid isPink>
							Pink
						</z.badge>
						<z.badge isSolid isPink>
							Pink
						</z.badge>
					</ExampleCard>

					<ExampleCard title='Outlined Badges'>
						<z.badge isOutline isNeutral>
							Outline
						</z.badge>
						<z.badge isOutline isPurple>
							Purple
						</z.badge>
						<z.badge isOutline isPurple>
							Purple
						</z.badge>
						<z.badge isOutline isPink>
							Pink
						</z.badge>
						<z.badge isOutline isPink>
							Pink
						</z.badge>
					</ExampleCard>

					<ExampleCard title='Badges with Icons'>
						<z.badge isSolid isPurple>
							<CheckCircle className='h-3 w-3' /> Success
						</z.badge>
						<z.badge isSolid isPink>
							<AlertCircle className='h-3 w-3' /> Error
						</z.badge>
						<z.badge isSolid isPink>
							<AlertTriangle className='h-3 w-3' /> Warning
						</z.badge>
						<z.badge isSolid isPurple>
							<Info className='h-3 w-3' /> Info
						</z.badge>
						<z.badge isSolid isPink>
							<Star className='h-3 w-3' /> Featured
						</z.badge>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Input Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZInput' description='Text inputs with different focus colors and states.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Focus Colors'>
						<z.box className='grid gap-4 w-full max-w-md'>
							<z.box className='space-y-2'>
								<z.label>Default Focus</z.label>
								<z.input placeholder='Default focus ring' focusColor='neutral' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label>Purple Focus</z.label>
								<z.input placeholder='Purple focus ring' focusColor='purple' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label>Purple Focus</z.label>
								<z.input placeholder='Purple focus ring' focusColor='purple' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label>Pink Focus</z.label>
								<z.input placeholder='Pink focus ring' focusColor='pink' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label>Pink Focus</z.label>
								<z.input placeholder='Pink focus ring' focusColor='pink' />
							</z.box>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Input Types'>
						<z.box className='grid gap-4 w-full max-w-md'>
							<z.box className='space-y-2'>
								<z.label htmlFor='text'>Text</z.label>
								<z.input id='text' type='text' placeholder='Enter text' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='email'>Email</z.label>
								<z.input id='email' type='email' placeholder='name@example.com' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='password'>Password</z.label>
								<z.input id='password' type='password' placeholder='Enter password' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='search'>Search</z.label>
								<z.input id='search' type='search' placeholder='Search...' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='disabled'>Disabled</z.label>
								<z.input id='disabled' placeholder='Disabled input' disabled />
							</z.box>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Input with Icons'>
						<z.box className='grid gap-4 w-full max-w-md'>
							<z.box className='relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
								<z.input className='pl-9' placeholder='Search...' />
							</z.box>
							<z.box className='relative'>
								<Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
								<z.input className='pl-9' type='email' placeholder='Email address' />
							</z.box>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Checkbox & Switch Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZCheckbox & ZSwitch' description='Toggle controls for boolean values.' />

				<z.box className='grid gap-6 md:grid-cols-2'>
					<ExampleCard title='Checkboxes'>
						<z.box className='space-y-4 w-full'>
							<z.box className='flex items-center space-x-2'>
								<z.checkbox
									id='terms'
									isChecked={checkboxStates.terms}
									onCheckedChange={(checked) => setCheckboxStates((prev) => ({ ...prev, terms: checked as boolean }))}
								/>
								<z.label htmlFor='terms'>Accept terms and conditions</z.label>
							</z.box>
							<z.box className='flex items-center space-x-2'>
								<z.checkbox
									id='newsletter'
									isChecked={checkboxStates.newsletter}
									onCheckedChange={(checked) => setCheckboxStates((prev) => ({ ...prev, newsletter: checked as boolean }))}
								/>
								<z.label htmlFor='newsletter'>Subscribe to newsletter</z.label>
							</z.box>
							<z.box className='flex items-center space-x-2'>
								<z.checkbox id='disabled' isDisabled />
								<z.label htmlFor='disabled' className='text-muted-foreground'>
									Disabled checkbox
								</z.label>
							</z.box>
							<z.box className='flex items-center space-x-2'>
								<z.checkbox id='checked-disabled' isChecked isDisabled />
								<z.label htmlFor='checked-disabled' className='text-muted-foreground'>
									Checked disabled
								</z.label>
							</z.box>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Switches'>
						<z.box className='space-y-4 w-full'>
							<z.box className='flex items-center justify-between'>
								<z.label htmlFor='airplane'>Airplane Mode</z.label>
								<z.switch
									id='airplane'
									checked={switchStates.airplane}
									onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, airplane: checked }))}
								/>
							</z.box>
							<z.box className='flex items-center justify-between'>
								<z.label htmlFor='notifications'>Notifications</z.label>
								<z.switch
									id='notifications'
									checked={switchStates.notifications}
									onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, notifications: checked }))}
								/>
							</z.box>
							<z.box className='flex items-center justify-between'>
								<z.label htmlFor='dark-mode'>Dark Mode</z.label>
								<z.switch
									id='dark-mode'
									checked={switchStates.darkMode}
									onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, darkMode: checked }))}
								/>
							</z.box>
							<z.box className='flex items-center justify-between'>
								<z.label htmlFor='disabled-switch' className='text-muted-foreground'>
									Disabled
								</z.label>
								<z.switch id='disabled-switch' disabled />
							</z.box>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Select Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZSelect' description='Dropdown selection controls.' />

				<z.box className='grid gap-6 md:grid-cols-2'>
					<ExampleCard title='Basic Select'>
						<z.box className='space-y-2 w-full max-w-xs'>
							<z.label>Choose a theme</z.label>
							<z.select>
								<z.select.trigger>
									<z.select.value placeholder='Select theme' />
								</z.select.trigger>
								<z.select.content>
									<z.select.item value='light'>Light</z.select.item>
									<z.select.item value='dark'>Dark</z.select.item>
									<z.select.item value='system'>System</z.select.item>
								</z.select.content>
							</z.select>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Select with Groups'>
						<z.box className='space-y-2 w-full max-w-xs'>
							<z.label>Select a fruit</z.label>
							<z.select>
								<z.select.trigger>
									<z.select.value placeholder='Pick a fruit' />
								</z.select.trigger>
								<z.select.content>
									<z.select.item value='apple'>Apple</z.select.item>
									<z.select.item value='banana'>Banana</z.select.item>
									<z.select.item value='pink'>Pink</z.select.item>
									<z.select.item value='grape'>Grape</z.select.item>
									<z.select.item value='mango'>Mango</z.select.item>
								</z.select.content>
							</z.select>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Alert Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZAlert' description='Contextual feedback messages.' />

				<z.box className='grid gap-4'>
					<z.alert>
						<Terminal className='h-4 w-4' />
						<z.alertTitle>Default Alert</z.alertTitle>
						<z.alertDescription>This is a default alert with neutral styling.</z.alertDescription>
					</z.alert>

					<z.alert isPurple>
						<CheckCircle className='h-4 w-4' />
						<z.alertTitle>Success</z.alertTitle>
						<z.alertDescription>Your changes have been saved successfully.</z.alertDescription>
					</z.alert>

					<z.alert isPink>
						<AlertTriangle className='h-4 w-4' />
						<z.alertTitle>Warning</z.alertTitle>
						<z.alertDescription>Please review your information before proceeding.</z.alertDescription>
					</z.alert>

					<z.alert isPink>
						<AlertCircle className='h-4 w-4' />
						<z.alertTitle>Error</z.alertTitle>
						<z.alertDescription>There was an error processing your request.</z.alertDescription>
					</z.alert>

					<z.alert isPurple>
						<Info className='h-4 w-4' />
						<z.alertTitle>Information</z.alertTitle>
						<z.alertDescription>Here is some helpful information for you.</z.alertDescription>
					</z.alert>

					<z.alert isPink>
						<Bell className='h-4 w-4' />
						<z.alertTitle>Featured</z.alertTitle>
						<z.alertDescription>Check out our latest feature update!</z.alertDescription>
					</z.alert>
				</z.box>
			</z.box>

			<z.separator />

			{/* Toast Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZToast' description='Temporary notifications that appear and auto-dismiss.' />

				{/* Alert vs Toast comparison */}
				<z.box className='rounded-lg border border-border bg-card p-6 space-y-4'>
					<z.text.h3>Alert vs Toast: When to Use Each</z.text.h3>
					<z.box className='grid gap-4 md:grid-cols-2'>
						<z.box className='space-y-2'>
							<z.text as='h4' isSmall isBold isPurple>
								Alerts (Static)
							</z.text>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<z.box as='li'>Persistent, inline content within the page</z.box>
								<z.box as='li'>Important information that needs to remain visible</z.box>
								<z.box as='li'>Form validation errors or warnings</z.box>
								<z.box as='li'>System status or maintenance notices</z.box>
								<z.box as='li'>User must acknowledge or dismiss manually</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text as='h4' isSmall isBold isPurple>
								Toasts (Ephemeral)
							</z.text>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
								<z.box as='li'>Temporary, floating notifications</z.box>
								<z.box as='li'>Feedback for completed actions</z.box>
								<z.box as='li'>Non-critical success or info messages</z.box>
								<z.box as='li'>Auto-dismiss after a few seconds</z.box>
								<z.box as='li'>Does not block user workflow</z.box>
							</z.box>
						</z.box>
					</z.box>
				</z.box>

				<z.box className='grid gap-6'>
					<ExampleCard title='Toast Triggers'>
						<z.button
							isNeutral
							onClick={() => {
								toast({
									title: 'Default Toast',
									description: 'This is a basic toast notification.'
								})
							}}
						>
							Show Default Toast
						</z.button>

						<z.button
							isPurple
							onClick={() => {
								toast({
									title: 'Success!',
									description: 'Your changes have been saved successfully.'
								})
							}}
						>
							Show Success Toast
						</z.button>

						<z.button
							isRed
							onClick={() => {
								toast({
									isRed: true,
									title: 'Error',
									description: 'Something went wrong. Please try again.'
								})
							}}
						>
							Show Error Toast
						</z.button>

						<z.button
							isPurple
							onClick={() => {
								toast({
									title: 'Scheduled',
									description: 'Your meeting has been scheduled for tomorrow at 3pm.'
								})
							}}
						>
							Show Info Toast
						</z.button>
					</ExampleCard>

					<ExampleCard title='Toast with Action'>
						<z.button
							isNeutral
							onClick={() => {
								toast({
									title: 'Item Deleted',
									description: 'The item has been moved to trash.',
									action: (
										<z.button isNeutral isSmall onClick={() => {}}>
											Undo
										</z.button>
									)
								})
							}}
						>
							Toast with Undo Action
						</z.button>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Progress Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZProgress' description='Progress indicators with different colors.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Progress Variants'>
						<z.box className='space-y-6 w-full max-w-md'>
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text className='text-muted-foreground'>Default</z.text>
									<z.text className='text-muted-foreground'>75%</z.text>
								</z.box>
								<z.progress value={75} />
							</z.box>
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text className='text-neon-purple'>Purple</z.text>
									<z.text className='text-neon-purple'>60%</z.text>
								</z.box>
								<z.progress value={60} variant='purple' />
							</z.box>
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text className='text-neon-purple'>Purple</z.text>
									<z.text className='text-neon-purple'>45%</z.text>
								</z.box>
								<z.progress value={45} variant='purple' />
							</z.box>
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text className='text-neon-pink'>Pink</z.text>
									<z.text className='text-neon-pink'>90%</z.text>
								</z.box>
								<z.progress value={90} variant='pink' />
							</z.box>
							<z.box className='space-y-2'>
								<z.box className='flex justify-between text-sm'>
									<z.text className='text-neon-pink'>Pink</z.text>
									<z.text className='text-neon-pink'>30%</z.text>
								</z.box>
								<z.progress value={30} variant='pink' />
							</z.box>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Avatar Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZAvatar' description='User profile images with fallback support.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Avatar Sizes'>
						<z.avatar className='h-8 w-8'>
							<z.avatarFallback>XS</z.avatarFallback>
						</z.avatar>
						<z.avatar className='h-10 w-10'>
							<z.avatarFallback>SM</z.avatarFallback>
						</z.avatar>
						<z.avatar className='h-12 w-12'>
							<z.avatarFallback>MD</z.avatarFallback>
						</z.avatar>
						<z.avatar className='h-16 w-16'>
							<z.avatarFallback>LG</z.avatarFallback>
						</z.avatar>
						<z.avatar className='h-20 w-20'>
							<z.avatarFallback>XL</z.avatarFallback>
						</z.avatar>
					</ExampleCard>

					<ExampleCard title='Avatar with Fallbacks'>
						<z.avatar>
							<z.avatarImage src='/placeholder-user.jpg' alt='User' />
							<z.avatarFallback>JD</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarFallback className='bg-neon-purple text-primary-foreground'>AB</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarFallback className='bg-neon-purple text-primary-foreground'>CD</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarFallback className='bg-neon-pink text-primary-foreground'>EF</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarFallback className='bg-neon-pink text-primary-foreground'>GH</z.avatarFallback>
						</z.avatar>
					</ExampleCard>

					<ExampleCard title='Avatar Group'>
						<z.box className='flex -space-x-3'>
							<z.avatar className='border-2 border-background'>
								<z.avatarFallback className='bg-neon-purple text-primary-foreground'>A</z.avatarFallback>
							</z.avatar>
							<z.avatar className='border-2 border-background'>
								<z.avatarFallback className='bg-neon-purple text-primary-foreground'>B</z.avatarFallback>
							</z.avatar>
							<z.avatar className='border-2 border-background'>
								<z.avatarFallback className='bg-neon-pink text-primary-foreground'>C</z.avatarFallback>
							</z.avatar>
							<z.avatar className='border-2 border-background'>
								<z.avatarFallback className='bg-muted text-muted-foreground'>+5</z.avatarFallback>
							</z.avatar>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Skeleton Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZSkeleton' description='Loading placeholders for content.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Basic Skeletons'>
						<z.box className='space-y-4 w-full max-w-md'>
							<z.skeleton className='h-4 w-full' />
							<z.skeleton className='h-4 w-3/4' />
							<z.skeleton className='h-4 w-1/2' />
						</z.box>
					</ExampleCard>

					<ExampleCard title='Card Skeleton'>
						<z.box className='flex items-center space-x-4 w-full max-w-sm'>
							<z.skeleton className='h-12 w-12 rounded-full' />
							<z.box className='space-y-2 flex-1'>
								<z.skeleton className='h-4 w-full' />
								<z.skeleton className='h-4 w-3/4' />
							</z.box>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Content Skeleton'>
						<z.box className='space-y-4 w-full max-w-lg'>
							<z.skeleton className='h-8 w-1/3' />
							<z.skeleton className='h-4 w-full' />
							<z.skeleton className='h-4 w-full' />
							<z.skeleton className='h-4 w-2/3' />
							<z.box className='flex gap-2 pt-2'>
								<z.skeleton className='h-10 w-24' />
								<z.skeleton className='h-10 w-24' />
							</z.box>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Card Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZCard' description='Flexible container components.' />

				<z.box className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					<z.card>
						<z.cardHeader>
							<z.cardTitle>Basic Card</z.cardTitle>
							<z.cardDescription>A simple card with header and content.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent>
							<z.text.body className='text-sm text-muted-foreground'>
								This is the card content area where you can place any content.
							</z.text.body>
						</z.cardContent>
					</z.card>

					<z.card>
						<z.cardHeader>
							<z.cardTitle>Card with Footer</z.cardTitle>
							<z.cardDescription>Includes action buttons in footer.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent>
							<z.text.body className='text-sm text-muted-foreground'>Cards can have footers for actions.</z.text.body>
						</z.cardContent>
						<z.cardFooter className='gap-2'>
							<z.button isNeutral isSmall>
								Cancel
							</z.button>
							<z.button isPurple isSmall>
								Save
							</z.button>
						</z.cardFooter>
					</z.card>

					<z.card>
						<z.cardHeader>
							<z.cardTitle>Interactive Card</z.cardTitle>
							<z.cardDescription>With form elements inside.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent className='space-y-4'>
							<z.box className='space-y-2'>
								<z.label htmlFor='card-input'>Email</z.label>
								<z.input id='card-input' placeholder='name@example.com' />
							</z.box>
							<z.box className='flex items-center space-x-2'>
								<z.checkbox id='card-checkbox' />
								<z.label htmlFor='card-checkbox'>Remember me</z.label>
							</z.box>
						</z.cardContent>
						<z.cardFooter>
							<z.button isPurple isSmall className='w-full'>
								Submit
							</z.button>
						</z.cardFooter>
					</z.card>
				</z.box>
			</z.box>

			<z.separator />

			{/* Tabs Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZTabs' description='Tabbed content navigation.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Default Tabs'>
						<z.tabs defaultValue='account' className='w-full max-w-lg'>
							<z.tabsList>
								<z.tabsTrigger value='account'>Account</z.tabsTrigger>
								<z.tabsTrigger value='password'>Password</z.tabsTrigger>
								<z.tabsTrigger value='settings'>Settings</z.tabsTrigger>
							</z.tabsList>
							<z.tabsContent value='account' className='mt-4'>
								<z.card>
									<z.cardHeader>
										<z.cardTitle>Account</z.cardTitle>
										<z.cardDescription>Manage your account settings.</z.cardDescription>
									</z.cardHeader>
									<z.cardContent className='space-y-4'>
										<z.box className='space-y-2'>
											<z.label htmlFor='name'>Name</z.label>
											<z.input id='name' defaultValue='John Doe' />
										</z.box>
										<z.box className='space-y-2'>
											<z.label htmlFor='username'>Username</z.label>
											<z.input id='username' defaultValue='@johndoe' />
										</z.box>
									</z.cardContent>
								</z.card>
							</z.tabsContent>
							<z.tabsContent value='password' className='mt-4'>
								<z.card>
									<z.cardHeader>
										<z.cardTitle>Password</z.cardTitle>
										<z.cardDescription>Change your password here.</z.cardDescription>
									</z.cardHeader>
									<z.cardContent className='space-y-4'>
										<z.box className='space-y-2'>
											<z.label htmlFor='current'>Current Password</z.label>
											<z.input id='current' type='password' />
										</z.box>
										<z.box className='space-y-2'>
											<z.label htmlFor='new'>New Password</z.label>
											<z.input id='new' type='password' />
										</z.box>
									</z.cardContent>
								</z.card>
							</z.tabsContent>
							<z.tabsContent value='settings' className='mt-4'>
								<z.card>
									<z.cardHeader>
										<z.cardTitle>Settings</z.cardTitle>
										<z.cardDescription>Configure your preferences.</z.cardDescription>
									</z.cardHeader>
									<z.cardContent className='space-y-4'>
										<z.box className='flex items-center justify-between'>
											<z.label htmlFor='tab-notifications'>Email Notifications</z.label>
											<z.switch id='tab-notifications' />
										</z.box>
										<z.box className='flex items-center justify-between'>
											<z.label htmlFor='tab-marketing'>Marketing Emails</z.label>
											<z.switch id='tab-marketing' />
										</z.box>
									</z.cardContent>
								</z.card>
							</z.tabsContent>
						</z.tabs>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Accordion Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZAccordion' description='Collapsible content panels.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Default Accordion'>
						<z.accordion type='single' collapsible className='w-full max-w-lg'>
							<z.accordionItem value='item-1'>
								<z.accordionTrigger>Is it accessible?</z.accordionTrigger>
								<z.accordionContent>Yes. It adheres to the WAI-ARIA design pattern for accordions.</z.accordionContent>
							</z.accordionItem>
							<z.accordionItem value='item-2'>
								<z.accordionTrigger>Is it styled?</z.accordionTrigger>
								<z.accordionContent>
									Yes. It comes with default styles that match your design system, following the Zest design language with proper
									spacing and colors.
								</z.accordionContent>
							</z.accordionItem>
							<z.accordionItem value='item-3'>
								<z.accordionTrigger>Is it animated?</z.accordionTrigger>
								<z.accordionContent>
									Yes. It&apos;s animated by default with smooth open/close transitions, but you can disable animations if needed.
								</z.accordionContent>
							</z.accordionItem>
						</z.accordion>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Dialog Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZDialog' description='Modal dialogs for focused interactions.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Dialog Examples'>
						<z.dialog>
							<z.dialogTrigger asChild>
								<z.button isNeutral>Open Dialog</z.button>
							</z.dialogTrigger>
							<z.dialogContent>
								<z.dialogHeader>
									<z.dialogTitle>Edit Profile</z.dialogTitle>
									<z.dialogDescription>Make changes to your profile here. Click save when you&apos;re done.</z.dialogDescription>
								</z.dialogHeader>
								<z.box className='space-y-4 py-4'>
									<z.box className='space-y-2'>
										<z.label htmlFor='dialog-name'>Name</z.label>
										<z.input id='dialog-name' defaultValue='John Doe' />
									</z.box>
									<z.box className='space-y-2'>
										<z.label htmlFor='dialog-email'>Email</z.label>
										<z.input id='dialog-email' defaultValue='john@example.com' />
									</z.box>
								</z.box>
								<z.dialogFooter>
									<z.button isNeutral>Cancel</z.button>
									<z.button isPurple>Save Changes</z.button>
								</z.dialogFooter>
							</z.dialogContent>
						</z.dialog>

						<z.dialog>
							<z.dialogTrigger asChild>
								<z.button isPink>Confirm Action</z.button>
							</z.dialogTrigger>
							<z.dialogContent>
								<z.dialogHeader>
									<z.dialogTitle>Are you sure?</z.dialogTitle>
									<z.dialogDescription>This action cannot be undone. This will permanently delete your data.</z.dialogDescription>
								</z.dialogHeader>
								<z.dialogFooter>
									<z.button isNeutral>Cancel</z.button>
									<z.button isPink>Delete</z.button>
								</z.dialogFooter>
							</z.dialogContent>
						</z.dialog>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Dropdown Menu Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZDropdownMenu' description='Contextual menus with actions.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Dropdown Examples'>
						<z.menu>
							<z.menu.Trigger asChild>
								<z.button isNeutral>
									Open Menu
									<ChevronDown className='h-4 w-4' />
								</z.button>
							</z.menu.Trigger>
							<z.menu.Content className='w-56'>
								<z.menu.Label>My Account</z.menu.Label>
								<z.menu.Separator />
								<z.menu.Item>
									<User className='mr-2 h-4 w-4' />
									Profile
								</z.menu.Item>
								<z.menu.Item>
									<CreditCard className='mr-2 h-4 w-4' />
									Billing
								</z.menu.Item>
								<z.menu.Item>
									<Settings className='mr-2 h-4 w-4' />
									Settings
								</z.menu.Item>
								<z.menu.Separator />
								<z.menu.Item className='text-destructive'>
									<LogOut className='mr-2 h-4 w-4' />
									Log out
								</z.menu.Item>
							</z.menu.Content>
						</z.menu>

						<z.menu>
							<z.menu.Trigger asChild>
								<z.button isPurple>
									<Plus className='h-4 w-4' />
									Create New
								</z.button>
							</z.menu.Trigger>
							<z.menu.Content>
								<z.menu.Item>New Project</z.menu.Item>
								<z.menu.Item>New Team</z.menu.Item>
								<z.menu.Item>New Document</z.menu.Item>
								<z.menu.Separator />
								<z.menu.Item>Import</z.menu.Item>
							</z.menu.Content>
						</z.menu>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Tooltip Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='z.tooltip' description='Contextual information on hover.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Tooltip Positions'>
						<z.tooltip tip='Tooltip on top' side='top'>
							<z.button isNeutral>Hover me (Top)</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on right' side='right'>
							<z.button isPurple>Hover me (Right)</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on bottom' side='bottom'>
							<z.button isPurple>Hover me (Bottom)</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on left' side='left'>
							<z.button isPink>Hover me (Left)</z.button>
						</z.tooltip>
					</ExampleCard>
				</z.box>
			</z.box>

			<z.separator />

			{/* Table Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='ZTable' description='Data tables with proper styling.' />

				<z.box className='rounded-lg border border-border overflow-hidden'>
					<z.table>
						<z.tableHeader>
							<z.tableRow>
								<z.tableHead className='w-25'>Invoice</z.tableHead>
								<z.tableHead>Status</z.tableHead>
								<z.tableHead>Method</z.tableHead>
								<z.tableHead className='text-right'>Amount</z.tableHead>
							</z.tableRow>
						</z.tableHeader>
						<z.tableBody>
							<z.tableRow>
								<z.tableCell className='font-medium'>INV001</z.tableCell>
								<z.tableCell>
									<z.badge isSolid isPurple>
										Paid
									</z.badge>
								</z.tableCell>
								<z.tableCell>Credit Card</z.tableCell>
								<z.tableCell className='text-right'>$250.00</z.tableCell>
							</z.tableRow>
							<z.tableRow>
								<z.tableCell className='font-medium'>INV002</z.tableCell>
								<z.tableCell>
									<z.badge isSolid isPink>
										Pending
									</z.badge>
								</z.tableCell>
								<z.tableCell>PayPal</z.tableCell>
								<z.tableCell className='text-right'>$150.00</z.tableCell>
							</z.tableRow>
							<z.tableRow>
								<z.tableCell className='font-medium'>INV003</z.tableCell>
								<z.tableCell>
									<z.badge isSolid isPink>
										Overdue
									</z.badge>
								</z.tableCell>
								<z.tableCell>Bank Transfer</z.tableCell>
								<z.tableCell className='text-right'>$350.00</z.tableCell>
							</z.tableRow>
							<z.tableRow>
								<z.tableCell className='font-medium'>INV004</z.tableCell>
								<z.tableCell>
									<z.badge isSolid isPurple>
										Paid
									</z.badge>
								</z.tableCell>
								<z.tableCell>Credit Card</z.tableCell>
								<z.tableCell className='text-right'>$450.00</z.tableCell>
							</z.tableRow>
							<z.tableRow>
								<z.tableCell className='font-medium'>INV005</z.tableCell>
								<z.tableCell>
									<z.badge isOutline isPurple>
										Processing
									</z.badge>
								</z.tableCell>
								<z.tableCell>PayPal</z.tableCell>
								<z.tableCell className='text-right'>$550.00</z.tableCell>
							</z.tableRow>
						</z.tableBody>
					</z.table>
				</z.box>
			</z.box>

			<z.separator />

			{/* Line Section */}
			<z.box as='section' className='space-y-6'>
				<SectionHeader title='Line' description='Visual dividers between content.' />

				<z.box className='grid gap-6'>
					<ExampleCard title='Horizontal Line'>
						<z.box className='w-full max-w-md space-y-4'>
							<z.box>
								<z.text as='h4' isSmall isBold>
									Section One
								</z.text>
								<z.text.body className='text-sm text-muted-foreground'>Content for the first section.</z.text.body>
							</z.box>
							<z.line />
							<z.box>
								<z.text as='h4' isSmall isBold>
									Section Two
								</z.text>
								<z.text.body className='text-sm text-muted-foreground'>Content for the second section.</z.text.body>
							</z.box>
						</z.box>
					</ExampleCard>

					<ExampleCard title='Vertical Line'>
						<z.box className='flex h-8 items-center space-x-4 text-sm'>
							<z.box>Blog</z.box>
							<z.line isVertical />
							<z.box>Docs</z.box>
							<z.line isVertical />
							<z.box>Source</z.box>
							<z.line isVertical />
							<z.box>Support</z.box>
						</z.box>
					</ExampleCard>
				</z.box>
			</z.box>
		</z.box>
	)
}
