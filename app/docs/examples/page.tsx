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

// UI Components
import { ZButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Alert } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { Accordion } from '@/components/ui/accordion'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Select } from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'
import { Table } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

function SectionHeader({ title, description }: { title: string; description?: string }) {
	return (
		<div className='mb-8'>
			<h2 className='text-2xl font-semibold tracking-tight text-foreground mb-2'>{title}</h2>
			{description && <p className='text-muted-foreground'>{description}</p>}
		</div>
	)
}

function ExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className='rounded-lg border border-border bg-card p-6'>
			<h3 className='text-sm font-medium text-muted-foreground mb-4'>{title}</h3>
			<div className='flex flex-wrap items-start gap-4'>{children}</div>
		</div>
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
		<Tooltip.Provider>
			<div className='space-y-16 pb-16'>
				{/* Page Header */}
				<div className='space-y-4'>
					<nav className='flex items-center gap-2 text-sm text-muted-foreground'>
						<Link href='/docs' className='hover:text-foreground transition-colors'>
							Docs
						</Link>
						<ChevronRight className='h-4 w-4' />
						<span className='text-foreground'>Examples</span>
					</nav>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Component Examples</h1>
					<p className='text-lg text-muted-foreground max-w-3xl'>
						A comprehensive showcase of all Zest components with their common variations. Use this page as a reference for
						available styles, states, and configurations.
					</p>
				</div>

				{/* Buttons Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZButton' description='Buttons with different kinds, themes, and sizes.' />

					<div className='grid gap-6'>
						<ExampleCard title='Solid Buttons'>
							<ZButton kind='solid' color='green'>
								Green
							</ZButton>
							<ZButton kind='solid' color='purple'>
								Purple
							</ZButton>
							<ZButton kind='solid' color='pink'>
								Pink
							</ZButton>
							<ZButton kind='solid' color='orange'>
								Orange
							</ZButton>
							<ZButton kind='solid' color='white'>
								White
							</ZButton>
						</ExampleCard>

						<ExampleCard title='Outlined Buttons'>
							<ZButton kind='outlined' color='green'>
								Green
							</ZButton>
							<ZButton kind='outlined' color='purple'>
								Purple
							</ZButton>
							<ZButton kind='outlined' color='pink'>
								Pink
							</ZButton>
							<ZButton kind='outlined' color='orange'>
								Orange
							</ZButton>
							<ZButton kind='outlined' color='white'>
								White
							</ZButton>
						</ExampleCard>

						<ExampleCard title='Ghost Buttons'>
							<ZButton kind='ghost' color='green'>
								Green
							</ZButton>
							<ZButton kind='ghost' color='purple'>
								Purple
							</ZButton>
							<ZButton kind='ghost' color='pink'>
								Pink
							</ZButton>
							<ZButton kind='ghost' color='orange'>
								Orange
							</ZButton>
							<ZButton kind='ghost' color='white'>
								White
							</ZButton>
						</ExampleCard>

						<ExampleCard title='Button Sizes'>
							<ZButton kind='solid' color='green' size='xs'>
								Extra Small
							</ZButton>
							<ZButton kind='solid' color='green' size='sm'>
								Small
							</ZButton>
							<ZButton kind='solid' color='green' size='md'>
								Medium
							</ZButton>
							<ZButton kind='solid' color='green' size='lg'>
								Large
							</ZButton>
							<ZButton kind='solid' color='green' size='xl'>
								Extra Large
							</ZButton>
						</ExampleCard>

						<ExampleCard title='Button States'>
							<ZButton kind='solid' color='green'>
								Default
							</ZButton>
							<ZButton kind='solid' color='green' isDisabled>
								Disabled
							</ZButton>
							<ZButton kind='solid' color='purple'>
								<Loader2 className='h-4 w-4 animate-spin' />
								Loading
							</ZButton>
							<ZButton kind='outlined' color='pink'>
								<Heart className='h-4 w-4' />
								With Icon
							</ZButton>
							<ZButton kind='solid' color='orange'>
								Submit
								<Send className='h-4 w-4' />
							</ZButton>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Badge Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZBadge' description='Small status indicators and labels.' />

					<div className='grid gap-6'>
						<ExampleCard title='Solid Badges'>
							<Badge variant='default'>Default</Badge>
							<Badge variant='secondary'>Secondary</Badge>
							<Badge variant='destructive'>Destructive</Badge>
							<Badge variant='green'>Green</Badge>
							<Badge variant='purple'>Purple</Badge>
							<Badge variant='pink'>Pink</Badge>
							<Badge variant='orange'>Orange</Badge>
						</ExampleCard>

						<ExampleCard title='Outlined Badges'>
							<Badge variant='outline'>Outline</Badge>
							<Badge variant='green-outline'>Green</Badge>
							<Badge variant='purple-outline'>Purple</Badge>
							<Badge variant='pink-outline'>Pink</Badge>
							<Badge variant='orange-outline'>Orange</Badge>
						</ExampleCard>

						<ExampleCard title='Badges with Icons'>
							<Badge variant='green'>
								<CheckCircle className='h-3 w-3' /> Success
							</Badge>
							<Badge variant='destructive'>
								<AlertCircle className='h-3 w-3' /> Error
							</Badge>
							<Badge variant='orange'>
								<AlertTriangle className='h-3 w-3' /> Warning
							</Badge>
							<Badge variant='purple'>
								<Info className='h-3 w-3' /> Info
							</Badge>
							<Badge variant='pink'>
								<Star className='h-3 w-3' /> Featured
							</Badge>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Input Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZInput' description='Text inputs with different focus colors and states.' />

					<div className='grid gap-6'>
						<ExampleCard title='Focus Colors'>
							<div className='grid gap-4 w-full max-w-md'>
								<div className='space-y-2'>
									<Label>Default Focus</Label>
									<Input placeholder='Default focus ring' focusColor='default' />
								</div>
								<div className='space-y-2'>
									<Label>Green Focus</Label>
									<Input placeholder='Green focus ring' focusColor='green' />
								</div>
								<div className='space-y-2'>
									<Label>Purple Focus</Label>
									<Input placeholder='Purple focus ring' focusColor='purple' />
								</div>
								<div className='space-y-2'>
									<Label>Pink Focus</Label>
									<Input placeholder='Pink focus ring' focusColor='pink' />
								</div>
								<div className='space-y-2'>
									<Label>Orange Focus</Label>
									<Input placeholder='Orange focus ring' focusColor='orange' />
								</div>
							</div>
						</ExampleCard>

						<ExampleCard title='Input Types'>
							<div className='grid gap-4 w-full max-w-md'>
								<div className='space-y-2'>
									<Label htmlFor='text'>Text</Label>
									<Input id='text' type='text' placeholder='Enter text' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input id='email' type='email' placeholder='name@example.com' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input id='password' type='password' placeholder='Enter password' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='search'>Search</Label>
									<Input id='search' type='search' placeholder='Search...' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='disabled'>Disabled</Label>
									<Input id='disabled' placeholder='Disabled input' disabled />
								</div>
							</div>
						</ExampleCard>

						<ExampleCard title='Input with Icons'>
							<div className='grid gap-4 w-full max-w-md'>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
									<Input className='pl-9' placeholder='Search...' />
								</div>
								<div className='relative'>
									<Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
									<Input className='pl-9' type='email' placeholder='Email address' />
								</div>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Checkbox & Switch Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZCheckbox & ZSwitch' description='Toggle controls for boolean values.' />

					<div className='grid gap-6 md:grid-cols-2'>
						<ExampleCard title='Checkboxes'>
							<div className='space-y-4 w-full'>
								<div className='flex items-center space-x-2'>
									<Checkbox
										id='terms'
										checked={checkboxStates.terms}
										onCheckedChange={(checked) => setCheckboxStates((prev) => ({ ...prev, terms: checked as boolean }))}
									/>
									<Label htmlFor='terms'>Accept terms and conditions</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<Checkbox
										id='newsletter'
										checked={checkboxStates.newsletter}
										onCheckedChange={(checked) => setCheckboxStates((prev) => ({ ...prev, newsletter: checked as boolean }))}
									/>
									<Label htmlFor='newsletter'>Subscribe to newsletter</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<Checkbox id='disabled' disabled />
									<Label htmlFor='disabled' className='text-muted-foreground'>
										Disabled checkbox
									</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<Checkbox id='checked-disabled' checked disabled />
									<Label htmlFor='checked-disabled' className='text-muted-foreground'>
										Checked disabled
									</Label>
								</div>
							</div>
						</ExampleCard>

						<ExampleCard title='Switches'>
							<div className='space-y-4 w-full'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='airplane'>Airplane Mode</Label>
									<Switch
										id='airplane'
										checked={switchStates.airplane}
										onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, airplane: checked }))}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='notifications'>Notifications</Label>
									<Switch
										id='notifications'
										checked={switchStates.notifications}
										onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, notifications: checked }))}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='dark-mode'>Dark Mode</Label>
									<Switch
										id='dark-mode'
										checked={switchStates.darkMode}
										onCheckedChange={(checked) => setSwitchStates((prev) => ({ ...prev, darkMode: checked }))}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='disabled-switch' className='text-muted-foreground'>
										Disabled
									</Label>
									<Switch id='disabled-switch' disabled />
								</div>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Select Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZSelect' description='Dropdown selection controls.' />

					<div className='grid gap-6 md:grid-cols-2'>
						<ExampleCard title='Basic Select'>
							<div className='space-y-2 w-full max-w-xs'>
								<Label>Choose a theme</Label>
								<Select>
									<Select.Trigger>
										<Select.Value placeholder='Select theme' />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value='light'>Light</Select.Item>
										<Select.Item value='dark'>Dark</Select.Item>
										<Select.Item value='system'>System</Select.Item>
									</Select.Content>
								</Select>
							</div>
						</ExampleCard>

						<ExampleCard title='Select with Groups'>
							<div className='space-y-2 w-full max-w-xs'>
								<Label>Select a fruit</Label>
								<Select>
									<Select.Trigger>
										<Select.Value placeholder='Pick a fruit' />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value='apple'>Apple</Select.Item>
										<Select.Item value='banana'>Banana</Select.Item>
										<Select.Item value='orange'>Orange</Select.Item>
										<Select.Item value='grape'>Grape</Select.Item>
										<Select.Item value='mango'>Mango</Select.Item>
									</Select.Content>
								</Select>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Alert Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZAlert' description='Contextual feedback messages.' />

					<div className='grid gap-4'>
						<Alert>
							<Terminal className='h-4 w-4' />
							<Alert.Title>Default Alert</Alert.Title>
							<Alert.Description>This is a default alert with neutral styling.</Alert.Description>
						</Alert>

						<Alert variant='success'>
							<CheckCircle className='h-4 w-4' />
							<Alert.Title>Success</Alert.Title>
							<Alert.Description>Your changes have been saved successfully.</Alert.Description>
						</Alert>

						<Alert variant='warning'>
							<AlertTriangle className='h-4 w-4' />
							<Alert.Title>Warning</Alert.Title>
							<Alert.Description>Please review your information before proceeding.</Alert.Description>
						</Alert>

						<Alert variant='destructive'>
							<AlertCircle className='h-4 w-4' />
							<Alert.Title>Error</Alert.Title>
							<Alert.Description>There was an error processing your request.</Alert.Description>
						</Alert>

						<Alert variant='info'>
							<Info className='h-4 w-4' />
							<Alert.Title>Information</Alert.Title>
							<Alert.Description>Here is some helpful information for you.</Alert.Description>
						</Alert>

						<Alert variant='accent'>
							<Bell className='h-4 w-4' />
							<Alert.Title>New Feature</Alert.Title>
							<Alert.Description>Check out our latest feature update!</Alert.Description>
						</Alert>
					</div>
				</section>

				<Separator />

				{/* Toast Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZToast' description='Temporary notifications that appear and auto-dismiss.' />

					{/* Alert vs Toast comparison */}
					<div className='rounded-lg border border-border bg-card p-6 space-y-4'>
						<h3 className='text-lg font-semibold text-foreground'>Alert vs Toast: When to Use Each</h3>
						<div className='grid gap-4 md:grid-cols-2'>
							<div className='space-y-2'>
								<h4 className='text-sm font-medium text-neon-green'>Alerts (Static)</h4>
								<ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
									<li>Persistent, inline content within the page</li>
									<li>Important information that needs to remain visible</li>
									<li>Form validation errors or warnings</li>
									<li>System status or maintenance notices</li>
									<li>User must acknowledge or dismiss manually</li>
								</ul>
							</div>
							<div className='space-y-2'>
								<h4 className='text-sm font-medium text-neon-purple'>Toasts (Ephemeral)</h4>
								<ul className='text-sm text-muted-foreground space-y-1 list-disc list-inside'>
									<li>Temporary, floating notifications</li>
									<li>Feedback for completed actions</li>
									<li>Non-critical success or info messages</li>
									<li>Auto-dismiss after a few seconds</li>
									<li>Does not block user workflow</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='grid gap-6'>
						<ExampleCard title='Toast Triggers'>
							<ZButton
								kind='solid'
								color='white'
								onClick={() => {
									toast({
										title: 'Default Toast',
										description: 'This is a basic toast notification.'
									})
								}}
							>
								Show Default Toast
							</ZButton>

							<ZButton
								kind='solid'
								color='green'
								onClick={() => {
									toast({
										title: 'Success!',
										description: 'Your changes have been saved successfully.'
									})
								}}
							>
								Show Success Toast
							</ZButton>

							<ZButton
								kind='solid'
								color='pink'
								onClick={() => {
									toast({
										variant: 'destructive',
										title: 'Error',
										description: 'Something went wrong. Please try again.'
									})
								}}
							>
								Show Error Toast
							</ZButton>

							<ZButton
								kind='outlined'
								color='purple'
								onClick={() => {
									toast({
										title: 'Scheduled',
										description: 'Your meeting has been scheduled for tomorrow at 3pm.'
									})
								}}
							>
								Show Info Toast
							</ZButton>
						</ExampleCard>

						<ExampleCard title='Toast with Action'>
							<ZButton
								kind='outlined'
								color='white'
								onClick={() => {
									toast({
										title: 'Item Deleted',
										description: 'The item has been moved to trash.',
										action: (
											<ZButton kind='ghost' color='white' size='sm' onClick={() => {}}>
												Undo
											</ZButton>
										)
									})
								}}
							>
								Toast with Undo Action
							</ZButton>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Progress Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZProgress' description='Progress indicators with different colors.' />

					<div className='grid gap-6'>
						<ExampleCard title='Progress Variants'>
							<div className='space-y-6 w-full max-w-md'>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Default</span>
										<span className='text-muted-foreground'>75%</span>
									</div>
									<Progress value={75} />
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-neon-green'>Green</span>
										<span className='text-neon-green'>60%</span>
									</div>
									<Progress value={60} variant='green' />
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-neon-purple'>Purple</span>
										<span className='text-neon-purple'>45%</span>
									</div>
									<Progress value={45} variant='purple' />
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-neon-pink'>Pink</span>
										<span className='text-neon-pink'>90%</span>
									</div>
									<Progress value={90} variant='pink' />
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-neon-orange'>Orange</span>
										<span className='text-neon-orange'>30%</span>
									</div>
									<Progress value={30} variant='orange' />
								</div>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Avatar Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZAvatar' description='User profile images with fallback support.' />

					<div className='grid gap-6'>
						<ExampleCard title='Avatar Sizes'>
							<Avatar className='h-8 w-8'>
								<Avatar.Fallback>XS</Avatar.Fallback>
							</Avatar>
							<Avatar className='h-10 w-10'>
								<Avatar.Fallback>SM</Avatar.Fallback>
							</Avatar>
							<Avatar className='h-12 w-12'>
								<Avatar.Fallback>MD</Avatar.Fallback>
							</Avatar>
							<Avatar className='h-16 w-16'>
								<Avatar.Fallback>LG</Avatar.Fallback>
							</Avatar>
							<Avatar className='h-20 w-20'>
								<Avatar.Fallback>XL</Avatar.Fallback>
							</Avatar>
						</ExampleCard>

						<ExampleCard title='Avatar with Fallbacks'>
							<Avatar>
								<Avatar.Image src='/placeholder-user.jpg' alt='User' />
								<Avatar.Fallback>JD</Avatar.Fallback>
							</Avatar>
							<Avatar>
								<Avatar.Fallback className='bg-neon-green text-primary-foreground'>AB</Avatar.Fallback>
							</Avatar>
							<Avatar>
								<Avatar.Fallback className='bg-neon-purple text-primary-foreground'>CD</Avatar.Fallback>
							</Avatar>
							<Avatar>
								<Avatar.Fallback className='bg-neon-pink text-primary-foreground'>EF</Avatar.Fallback>
							</Avatar>
							<Avatar>
								<Avatar.Fallback className='bg-neon-orange text-primary-foreground'>GH</Avatar.Fallback>
							</Avatar>
						</ExampleCard>

						<ExampleCard title='Avatar Group'>
							<div className='flex -space-x-3'>
								<Avatar className='border-2 border-background'>
									<Avatar.Fallback className='bg-neon-green text-primary-foreground'>A</Avatar.Fallback>
								</Avatar>
								<Avatar className='border-2 border-background'>
									<Avatar.Fallback className='bg-neon-purple text-primary-foreground'>B</Avatar.Fallback>
								</Avatar>
								<Avatar className='border-2 border-background'>
									<Avatar.Fallback className='bg-neon-pink text-primary-foreground'>C</Avatar.Fallback>
								</Avatar>
								<Avatar className='border-2 border-background'>
									<Avatar.Fallback className='bg-muted text-muted-foreground'>+5</Avatar.Fallback>
								</Avatar>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Skeleton Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZSkeleton' description='Loading placeholders for content.' />

					<div className='grid gap-6'>
						<ExampleCard title='Basic Skeletons'>
							<div className='space-y-4 w-full max-w-md'>
								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-3/4' />
								<Skeleton className='h-4 w-1/2' />
							</div>
						</ExampleCard>

						<ExampleCard title='Card Skeleton'>
							<div className='flex items-center space-x-4 w-full max-w-sm'>
								<Skeleton className='h-12 w-12 rounded-full' />
								<div className='space-y-2 flex-1'>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-3/4' />
								</div>
							</div>
						</ExampleCard>

						<ExampleCard title='Content Skeleton'>
							<div className='space-y-4 w-full max-w-lg'>
								<Skeleton className='h-8 w-1/3' />
								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-2/3' />
								<div className='flex gap-2 pt-2'>
									<Skeleton className='h-10 w-24' />
									<Skeleton className='h-10 w-24' />
								</div>
							</div>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Card Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZCard' description='Flexible container components.' />

					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						<Card>
							<Card.Header>
								<Card.Title>Basic Card</Card.Title>
								<Card.Description>A simple card with header and content.</Card.Description>
							</Card.Header>
							<Card.Content>
								<p className='text-sm text-muted-foreground'>This is the card content area where you can place any content.</p>
							</Card.Content>
						</Card>

						<Card>
							<Card.Header>
								<Card.Title>Card with Footer</Card.Title>
								<Card.Description>Includes action buttons in footer.</Card.Description>
							</Card.Header>
							<Card.Content>
								<p className='text-sm text-muted-foreground'>Cards can have footers for actions.</p>
							</Card.Content>
							<Card.Footer className='gap-2'>
								<ZButton kind='outlined' color='white' size='sm'>
									Cancel
								</ZButton>
								<ZButton kind='solid' color='green' size='sm'>
									Save
								</ZButton>
							</Card.Footer>
						</Card>

						<Card>
							<Card.Header>
								<Card.Title>Interactive Card</Card.Title>
								<Card.Description>With form elements inside.</Card.Description>
							</Card.Header>
							<Card.Content className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='card-input'>Email</Label>
									<Input id='card-input' placeholder='name@example.com' />
								</div>
								<div className='flex items-center space-x-2'>
									<Checkbox id='card-checkbox' />
									<Label htmlFor='card-checkbox'>Remember me</Label>
								</div>
							</Card.Content>
							<Card.Footer>
								<ZButton kind='solid' color='purple' size='sm' className='w-full'>
									Submit
								</ZButton>
							</Card.Footer>
						</Card>
					</div>
				</section>

				<Separator />

				{/* Tabs Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZTabs' description='Tabbed content navigation.' />

					<div className='grid gap-6'>
						<ExampleCard title='Default Tabs'>
							<Tabs defaultValue='account' className='w-full max-w-lg'>
								<Tabs.List>
									<Tabs.Trigger value='account'>Account</Tabs.Trigger>
									<Tabs.Trigger value='password'>Password</Tabs.Trigger>
									<Tabs.Trigger value='settings'>Settings</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value='account' className='mt-4'>
									<Card>
										<Card.Header>
											<Card.Title>Account</Card.Title>
											<Card.Description>Manage your account settings.</Card.Description>
										</Card.Header>
										<Card.Content className='space-y-4'>
											<div className='space-y-2'>
												<Label htmlFor='name'>Name</Label>
												<Input id='name' defaultValue='John Doe' />
											</div>
											<div className='space-y-2'>
												<Label htmlFor='username'>Username</Label>
												<Input id='username' defaultValue='@johndoe' />
											</div>
										</Card.Content>
									</Card>
								</Tabs.Content>
								<Tabs.Content value='password' className='mt-4'>
									<Card>
										<Card.Header>
											<Card.Title>Password</Card.Title>
											<Card.Description>Change your password here.</Card.Description>
										</Card.Header>
										<Card.Content className='space-y-4'>
											<div className='space-y-2'>
												<Label htmlFor='current'>Current Password</Label>
												<Input id='current' type='password' />
											</div>
											<div className='space-y-2'>
												<Label htmlFor='new'>New Password</Label>
												<Input id='new' type='password' />
											</div>
										</Card.Content>
									</Card>
								</Tabs.Content>
								<Tabs.Content value='settings' className='mt-4'>
									<Card>
										<Card.Header>
											<Card.Title>Settings</Card.Title>
											<Card.Description>Configure your preferences.</Card.Description>
										</Card.Header>
										<Card.Content className='space-y-4'>
											<div className='flex items-center justify-between'>
												<Label htmlFor='tab-notifications'>Email Notifications</Label>
												<Switch id='tab-notifications' />
											</div>
											<div className='flex items-center justify-between'>
												<Label htmlFor='tab-marketing'>Marketing Emails</Label>
												<Switch id='tab-marketing' />
											</div>
										</Card.Content>
									</Card>
								</Tabs.Content>
							</Tabs>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Accordion Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZAccordion' description='Collapsible content panels.' />

					<div className='grid gap-6'>
						<ExampleCard title='Default Accordion'>
							<Accordion type='single' collapsible className='w-full max-w-lg'>
								<Accordion.Item value='item-1'>
									<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
									<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern for accordions.</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value='item-2'>
									<Accordion.Trigger>Is it styled?</Accordion.Trigger>
									<Accordion.Content>
										Yes. It comes with default styles that match your design system, following the Zest design language with proper
										spacing and colors.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value='item-3'>
									<Accordion.Trigger>Is it animated?</Accordion.Trigger>
									<Accordion.Content>
										Yes. It&apos;s animated by default with smooth open/close transitions, but you can disable animations if needed.
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Dialog Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZDialog' description='Modal dialogs for focused interactions.' />

					<div className='grid gap-6'>
						<ExampleCard title='Dialog Examples'>
							<Dialog>
								<Dialog.Trigger asChild>
									<ZButton kind='outlined' color='white'>
										Open Dialog
									</ZButton>
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Edit Profile</Dialog.Title>
										<Dialog.Description>Make changes to your profile here. Click save when you&apos;re done.</Dialog.Description>
									</Dialog.Header>
									<div className='space-y-4 py-4'>
										<div className='space-y-2'>
											<Label htmlFor='dialog-name'>Name</Label>
											<Input id='dialog-name' defaultValue='John Doe' />
										</div>
										<div className='space-y-2'>
											<Label htmlFor='dialog-email'>Email</Label>
											<Input id='dialog-email' defaultValue='john@example.com' />
										</div>
									</div>
									<Dialog.Footer>
										<ZButton kind='outlined' color='white'>
											Cancel
										</ZButton>
										<ZButton kind='solid' color='green'>
											Save Changes
										</ZButton>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog>

							<Dialog>
								<Dialog.Trigger asChild>
									<ZButton kind='solid' color='pink'>
										Confirm Action
									</ZButton>
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Are you sure?</Dialog.Title>
										<Dialog.Description>This action cannot be undone. This will permanently delete your data.</Dialog.Description>
									</Dialog.Header>
									<Dialog.Footer>
										<ZButton kind='outlined' color='white'>
											Cancel
										</ZButton>
										<ZButton kind='solid' color='pink'>
											Delete
										</ZButton>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Dropdown Menu Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZDropdownMenu' description='Contextual menus with actions.' />

					<div className='grid gap-6'>
						<ExampleCard title='Dropdown Examples'>
							<DropdownMenu>
								<DropdownMenu.Trigger asChild>
									<ZButton kind='outlined' color='white'>
										Open Menu
										<ChevronDown className='h-4 w-4' />
									</ZButton>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content className='w-56'>
									<DropdownMenu.Label>My Account</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>
										<User className='mr-2 h-4 w-4' />
										Profile
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<CreditCard className='mr-2 h-4 w-4' />
										Billing
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<Settings className='mr-2 h-4 w-4' />
										Settings
									</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item className='text-destructive'>
										<LogOut className='mr-2 h-4 w-4' />
										Log out
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>

							<DropdownMenu>
								<DropdownMenu.Trigger asChild>
									<ZButton kind='solid' color='purple'>
										<Plus className='h-4 w-4' />
										Create New
									</ZButton>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item>New Project</DropdownMenu.Item>
									<DropdownMenu.Item>New Team</DropdownMenu.Item>
									<DropdownMenu.Item>New Document</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>Import</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Tooltip Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZTooltip' description='Contextual information on hover.' />

					<div className='grid gap-6'>
						<ExampleCard title='Tooltip Positions'>
							<Tooltip>
								<Tooltip.Trigger asChild>
									<ZButton kind='outlined' color='white'>
										Hover me (Top)
									</ZButton>
								</Tooltip.Trigger>
								<Tooltip.Content side='top'>
									<p>Tooltip on top</p>
								</Tooltip.Content>
							</Tooltip>

							<Tooltip>
								<Tooltip.Trigger asChild>
									<ZButton kind='outlined' color='green'>
										Hover me (Right)
									</ZButton>
								</Tooltip.Trigger>
								<Tooltip.Content side='right'>
									<p>Tooltip on right</p>
								</Tooltip.Content>
							</Tooltip>

							<Tooltip>
								<Tooltip.Trigger asChild>
									<ZButton kind='outlined' color='purple'>
										Hover me (Bottom)
									</ZButton>
								</Tooltip.Trigger>
								<Tooltip.Content side='bottom'>
									<p>Tooltip on bottom</p>
								</Tooltip.Content>
							</Tooltip>

							<Tooltip>
								<Tooltip.Trigger asChild>
									<ZButton kind='outlined' color='pink'>
										Hover me (Left)
									</ZButton>
								</Tooltip.Trigger>
								<Tooltip.Content side='left'>
									<p>Tooltip on left</p>
								</Tooltip.Content>
							</Tooltip>
						</ExampleCard>
					</div>
				</section>

				<Separator />

				{/* Table Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZTable' description='Data tables with proper styling.' />

					<div className='rounded-lg border border-border overflow-hidden'>
						<Table>
							<Table.Header>
								<Table.Row>
									<Table.Head className='w-[100px]'>Invoice</Table.Head>
									<Table.Head>Status</Table.Head>
									<Table.Head>Method</Table.Head>
									<Table.Head className='text-right'>Amount</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell className='font-medium'>INV001</Table.Cell>
									<Table.Cell>
										<Badge variant='green'>Paid</Badge>
									</Table.Cell>
									<Table.Cell>Credit Card</Table.Cell>
									<Table.Cell className='text-right'>$250.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell className='font-medium'>INV002</Table.Cell>
									<Table.Cell>
										<Badge variant='orange'>Pending</Badge>
									</Table.Cell>
									<Table.Cell>PayPal</Table.Cell>
									<Table.Cell className='text-right'>$150.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell className='font-medium'>INV003</Table.Cell>
									<Table.Cell>
										<Badge variant='destructive'>Overdue</Badge>
									</Table.Cell>
									<Table.Cell>Bank Transfer</Table.Cell>
									<Table.Cell className='text-right'>$350.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell className='font-medium'>INV004</Table.Cell>
									<Table.Cell>
										<Badge variant='green'>Paid</Badge>
									</Table.Cell>
									<Table.Cell>Credit Card</Table.Cell>
									<Table.Cell className='text-right'>$450.00</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell className='font-medium'>INV005</Table.Cell>
									<Table.Cell>
										<Badge variant='purple-outline'>Processing</Badge>
									</Table.Cell>
									<Table.Cell>PayPal</Table.Cell>
									<Table.Cell className='text-right'>$550.00</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</div>
				</section>

				<Separator />

				{/* Separator Section */}
				<section className='space-y-6'>
					<SectionHeader title='ZSeparator' description='Visual dividers between content.' />

					<div className='grid gap-6'>
						<ExampleCard title='Horizontal Separator'>
							<div className='w-full max-w-md space-y-4'>
								<div>
									<h4 className='text-sm font-medium'>Section One</h4>
									<p className='text-sm text-muted-foreground'>Content for the first section.</p>
								</div>
								<Separator />
								<div>
									<h4 className='text-sm font-medium'>Section Two</h4>
									<p className='text-sm text-muted-foreground'>Content for the second section.</p>
								</div>
							</div>
						</ExampleCard>

						<ExampleCard title='Vertical Separator'>
							<div className='flex h-8 items-center space-x-4 text-sm'>
								<div>Blog</div>
								<Separator orientation='vertical' />
								<div>Docs</div>
								<Separator orientation='vertical' />
								<div>Source</div>
								<Separator orientation='vertical' />
								<div>Support</div>
							</div>
						</ExampleCard>
					</div>
				</section>
			</div>
		</Tooltip.Provider>
	)
}
