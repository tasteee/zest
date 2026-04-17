import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from './card'
import { ZButton } from './button'
import { Badge } from './badge'
import { Progress } from './progress'
import { Switch } from './switch'
import { Label } from './label'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof Card> = {
	title: 'UI/Card',
	component: Card,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Card>

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

const cardGridStyle: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
	gap: 16
}

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				{/* Basic Cards */}
				<div>
					<span style={sectionLabelStyle}>Basic Cards</span>
					<div style={cardGridStyle}>
						<Card>
							<CardHeader>
								<CardTitle>Simple Card</CardTitle>
								<CardDescription>A basic card with title and description.</CardDescription>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>Card content goes here. This is a simple example.</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Card with Footer</CardTitle>
								<CardDescription>This card has action buttons in the footer.</CardDescription>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>Some content for this card example.</p>
							</CardContent>
							<CardFooter className='gap-2'>
								<ZButton variant='outline'>Cancel</ZButton>
								<ZButton>Save</ZButton>
							</CardFooter>
						</Card>
					</div>
				</div>

				{/* With Action */}
				<div>
					<span style={sectionLabelStyle}>With Card Action</span>
					<div style={cardGridStyle}>
						<Card>
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>Manage your preferences.</CardDescription>
								<CardAction>
									<ZButton size='sm' variant='ghost'>
										<Phosphor.PencilSimple />
									</ZButton>
								</CardAction>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>You have 3 unread messages.</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Project Alpha</CardTitle>
								<CardDescription>Last updated 2 days ago</CardDescription>
								<CardAction>
									<Badge variant='green'>Active</Badge>
								</CardAction>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>Progress</span>
										<span>75%</span>
									</div>
									<Progress variant='green' value={75} />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Feature Cards */}
				<div>
					<span style={sectionLabelStyle}>Feature Cards</span>
					<div style={cardGridStyle}>
						<Card>
							<CardHeader>
								<div className='flex size-10 items-center justify-center rounded-lg bg-neon-green/10'>
									<Phosphor.Lightning className='size-5 text-neon-green' weight='fill' />
								</div>
								<CardTitle className='mt-4'>Fast Performance</CardTitle>
								<CardDescription>Optimized for speed with instant responses.</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<div className='flex size-10 items-center justify-center rounded-lg bg-neon-purple/10'>
									<Phosphor.Shield className='size-5 text-neon-purple' weight='fill' />
								</div>
								<CardTitle className='mt-4'>Secure by Default</CardTitle>
								<CardDescription>Enterprise-grade security built in.</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<div className='flex size-10 items-center justify-center rounded-lg bg-neon-pink/10'>
									<Phosphor.Sparkle className='size-5 text-neon-pink' weight='fill' />
								</div>
								<CardTitle className='mt-4'>AI Powered</CardTitle>
								<CardDescription>Intelligent features that learn and adapt.</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>

				{/* Settings Cards */}
				<div>
					<span style={sectionLabelStyle}>Settings Cards</span>
					<div style={cardGridStyle}>
						<Card>
							<CardHeader>
								<CardTitle>Email Notifications</CardTitle>
								<CardDescription>Choose when you want to receive emails.</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='marketing'>Marketing emails</Label>
									<Switch id='marketing' variant='green' />
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='security'>Security alerts</Label>
									<Switch id='security' variant='green' defaultChecked />
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='updates'>Product updates</Label>
									<Switch id='updates' variant='green' defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Appearance</CardTitle>
								<CardDescription>Customize how the app looks on your device.</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='dark-mode'>Dark mode</Label>
									<Switch id='dark-mode' variant='purple' defaultChecked />
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='animations'>Animations</Label>
									<Switch id='animations' variant='purple' defaultChecked />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Stat Cards */}
				<div>
					<span style={sectionLabelStyle}>Stat Cards</span>
					<div style={cardGridStyle}>
						<Card>
							<CardHeader>
								<CardDescription>Total Revenue</CardDescription>
								<CardTitle className='text-3xl font-bold'>$45,231</CardTitle>
								<CardAction>
									<Badge variant='green'>+20.1%</Badge>
								</CardAction>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<CardDescription>Active Users</CardDescription>
								<CardTitle className='text-3xl font-bold'>2,350</CardTitle>
								<CardAction>
									<Badge variant='purple'>+180</Badge>
								</CardAction>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<CardDescription>Sales</CardDescription>
								<CardTitle className='text-3xl font-bold'>12,234</CardTitle>
								<CardAction>
									<Badge variant='pink'>+19%</Badge>
								</CardAction>
							</CardHeader>
						</Card>
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
			<Card className='w-80'>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description goes here.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card content and body text.</p>
				</CardContent>
				<CardFooter className='gap-2'>
					<ZButton variant='outline'>Cancel</ZButton>
					<ZButton>Save</ZButton>
				</CardFooter>
			</Card>
		)
	}
}

export const WithAction: StoryT = {
	render: () => {
		return (
			<Card className='w-80'>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
					<CardDescription>Manage your preferences.</CardDescription>
					<CardAction>
						<ZButton size='sm' variant='ghost'>
							Edit
						</ZButton>
					</CardAction>
				</CardHeader>
				<CardContent>
					<p>You have 3 unread messages.</p>
				</CardContent>
			</Card>
		)
	}
}

export const FeatureCard: StoryT = {
	render: () => {
		return (
			<Card className='w-80'>
				<CardHeader>
					<div className='flex size-10 items-center justify-center rounded-lg bg-neon-green/10'>
						<Phosphor.Lightning className='size-5 text-neon-green' weight='fill' />
					</div>
					<CardTitle className='mt-4'>Fast Performance</CardTitle>
					<CardDescription>Optimized for speed with instant responses.</CardDescription>
				</CardHeader>
			</Card>
		)
	}
}

export const StatCard: StoryT = {
	render: () => {
		return (
			<Card className='w-64'>
				<CardHeader>
					<CardDescription>Total Revenue</CardDescription>
					<CardTitle className='text-3xl font-bold'>$45,231</CardTitle>
					<CardAction>
						<Badge variant='green'>+20.1%</Badge>
					</CardAction>
				</CardHeader>
			</Card>
		)
	}
}

export const SettingsCard: StoryT = {
	render: () => {
		return (
			<Card className='w-80'>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
					<CardDescription>Configure how you receive updates.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='email-notif'>Email notifications</Label>
						<Switch id='email-notif' variant='green' defaultChecked />
					</div>
					<div className='flex items-center justify-between'>
						<Label htmlFor='push-notif'>Push notifications</Label>
						<Switch id='push-notif' variant='green' />
					</div>
				</CardContent>
			</Card>
		)
	}
}
