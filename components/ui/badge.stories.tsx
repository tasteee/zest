import type { Meta, StoryObj } from '@storybook/nextjs'
import * as Phosphor from '@phosphor-icons/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
	title: 'UI/Badge',
	component: Badge,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isOutline: {
			control: 'boolean'
		},
		isGhost: {
			control: 'boolean'
		},
		isSolid: {
			control: 'boolean'
		},
		isWhite: {
			control: 'boolean'
		},
		isGreen: {
			control: 'boolean'
		},
		isPurple: {
			control: 'boolean'
		},
		isPink: {
			control: 'boolean'
		},
		isOrange: {
			control: 'boolean'
		}
	}
}

export default meta

type StoryT = StoryObj<typeof Badge>

export const Default: StoryT = {
	args: {
		children: 'Badge',
		isOutline: true,
		isWhite: true
	}
}

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

const kinds = ['outline', 'ghost', 'solid'] as const
const colors = ['white', 'green', 'purple', 'pink', 'orange'] as const

const kindPropsByKind = {
	outline: { isOutline: true },
	ghost: { isGhost: true },
	solid: { isSolid: true }
} as const

const colorPropsByColor = {
	white: { isWhite: true },
	green: { isGreen: true },
	purple: { isPurple: true },
	pink: { isPink: true },
	orange: { isOrange: true }
} as const

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				{kinds.map((kind) => (
					<div key={kind}>
						<span style={sectionLabelStyle}>{kind}</span>
						<div style={rowStyle}>
							{colors.map((color) => (
								<z.badge key={`${kind}-${color}`} {...kindPropsByKind[kind]} {...colorPropsByColor[color]}>
									{color}
								</z.badge>
							))}
						</div>
					</div>
				))}

				<div>
					<span style={sectionLabelStyle}>With Icons</span>
					<div style={rowStyle}>
						<z.badge isSolid isGreen>
							<Phosphor.CheckCircle weight='fill' />
							Success
						</z.badge>
						<z.badge isSolid isPink>
							<Phosphor.XCircle weight='fill' />
							Error
						</z.badge>
						<z.badge isOutline isPurple>
							<Phosphor.Tag />
							Tagged
						</z.badge>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>As Interactive Link</span>
					<div style={rowStyle}>
						<z.badge isSolid isGreen asChild>
							<a href='#'>Click me</a>
						</z.badge>
						<z.badge isOutline isPurple asChild>
							<a href='#'>Another link</a>
						</z.badge>
					</div>
				</div>
			</div>
		)
	}
}
