import type { Meta, StoryObj } from '@storybook/nextjs'
import { Alert, AlertTitle, AlertDescription } from './alert'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof Alert> = {
	title: 'UI/Alert',
	component: Alert,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isGreen: { control: 'boolean' },
		isPurple: { control: 'boolean' },
		isPink: { control: 'boolean' },
		isOrange: { control: 'boolean' },
		isRed: { control: 'boolean' }
	}
}

export default meta

type StoryT = StoryObj<typeof Alert>

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
	gap: 24,
	maxWidth: 600
}

// ─── All Variants Story ─────────────────────────────────────────────────────

type ColorKeyT = 'default' | 'red' | 'green' | 'orange' | 'purple' | 'pink'

const allColorKeys: ColorKeyT[] = ['default', 'red', 'green', 'orange', 'purple', 'pink']

const colorPropsMap = {
	default: {},
	red: { isRed: true },
	green: { isGreen: true },
	orange: { isOrange: true },
	purple: { isPurple: true },
	pink: { isPink: true }
} as const

const colorIcons: Record<ColorKeyT, React.ReactNode> = {
	default: <Phosphor.Info weight='fill' />,
	red: <Phosphor.XCircle weight='fill' />,
	green: <Phosphor.CheckCircle weight='fill' />,
	orange: <Phosphor.Warning weight='fill' />,
	purple: <Phosphor.Info weight='fill' />,
	pink: <Phosphor.Heart weight='fill' />
}

const colorTitles: Record<ColorKeyT, string> = {
	default: 'Default Alert',
	red: 'Error',
	green: 'Success',
	orange: 'Warning',
	purple: 'Information',
	pink: 'Featured'
}

const colorDescriptions: Record<ColorKeyT, string> = {
	default: 'This is a default alert message with neutral styling.',
	red: 'Something went wrong. Please check your input and try again.',
	green: 'Your changes have been saved successfully.',
	orange: 'Please review this before continuing.',
	purple: 'Here is some helpful information you should know.',
	pink: 'This content has been marked as featured.'
}

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<span style={sectionLabelStyle}>All Alert Variants</span>
				{allColorKeys.map((colorKey) => (
					<Alert key={colorKey} {...colorPropsMap[colorKey]}>
						{colorIcons[colorKey]}
						<AlertTitle>{colorTitles[colorKey]}</AlertTitle>
						<AlertDescription>{colorDescriptions[colorKey]}</AlertDescription>
					</Alert>
				))}
			</div>
		)
	}
}

// ─── Automatic Defaults ─────────────────────────────────────────────────────

export const AutomaticDefaults: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<span style={sectionLabelStyle}>Automatic Icon + Title Defaults</span>
				{allColorKeys.map((colorKey) => (
					<Alert key={colorKey} {...colorPropsMap[colorKey]}>
						<AlertDescription>{colorDescriptions[colorKey]}</AlertDescription>
					</Alert>
				))}
			</div>
		)
	}
}

// ─── Title Only ─────────────────────────────────────────────────────────────

export const TitleOnly: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<span style={sectionLabelStyle}>Title Only</span>
				{allColorKeys.map((colorKey) => (
					<Alert key={colorKey} {...colorPropsMap[colorKey]}>
						{colorIcons[colorKey]}
						<AlertTitle>{colorTitles[colorKey]}</AlertTitle>
					</Alert>
				))}
			</div>
		)
	}
}

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
	render: () => {
		return (
			<Alert className='w-96'>
				<Phosphor.Info weight='fill' />
				<AlertTitle>Default Alert</AlertTitle>
				<AlertDescription>You can add components to your app using the CLI.</AlertDescription>
			</Alert>
		)
	}
}

export const Destructive: StoryT = {
	render: () => {
		return (
			<Alert isRed className='w-96'>
				<Phosphor.XCircle weight='fill' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong. Please try again.</AlertDescription>
			</Alert>
		)
	}
}

export const Success: StoryT = {
	render: () => {
		return (
			<Alert isGreen className='w-96'>
				<Phosphor.CheckCircle weight='fill' />
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>Your changes have been saved successfully.</AlertDescription>
			</Alert>
		)
	}
}

export const Warning: StoryT = {
	render: () => {
		return (
			<Alert isOrange className='w-96'>
				<Phosphor.Warning weight='fill' />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>This action cannot be undone. Please proceed with caution.</AlertDescription>
			</Alert>
		)
	}
}

export const Info: StoryT = {
	render: () => {
		return (
			<Alert isPurple className='w-96'>
				<Phosphor.Info weight='fill' />
				<AlertTitle>Information</AlertTitle>
				<AlertDescription>You can customize your experience in the settings panel.</AlertDescription>
			</Alert>
		)
	}
}

export const Accent: StoryT = {
	render: () => {
		return (
			<Alert isPink className='w-96'>
				<Phosphor.Heart weight='fill' />
				<AlertTitle>Featured</AlertTitle>
				<AlertDescription>This content has been specially curated for you.</AlertDescription>
			</Alert>
		)
	}
}
