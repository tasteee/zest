import type { Meta, StoryObj } from '@storybook/nextjs'
import { Toggle } from './toggle'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof Toggle> = {
	title: 'UI/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isGhost: { control: 'boolean' },
		isOutlined: { control: 'boolean' },
		isWhite: { control: 'boolean' },
		isGreen: { control: 'boolean' },
		isPurple: { control: 'boolean' },
		isPink: { control: 'boolean' },
		isOrange: { control: 'boolean' },
		isSmall: { control: 'boolean' },
		isMedium: { control: 'boolean' },
		isLarge: { control: 'boolean' }
	}
}

export default meta

type StoryT = StoryObj<typeof Toggle>

type ColorKeyT = 'white' | 'green' | 'purple' | 'pink' | 'orange'
type KindKeyT = 'ghost' | 'outlined'
type SizeKeyT = 'small' | 'medium' | 'large'

const colors: ColorKeyT[] = ['white', 'green', 'purple', 'pink', 'orange']
const neonColors: ColorKeyT[] = ['green', 'purple', 'pink', 'orange']
const kinds: KindKeyT[] = ['ghost', 'outlined']
const sizes: SizeKeyT[] = ['small', 'medium', 'large']

const colorPropsByColor = {
	white: { isWhite: true },
	green: { isGreen: true },
	purple: { isPurple: true },
	pink: { isPink: true },
	orange: { isOrange: true }
} as const

const kindPropsByKind = {
	ghost: { isGhost: true },
	outlined: { isOutlined: true }
} as const

const sizePropsBySize = {
	small: { isSmall: true },
	medium: { isMedium: true },
	large: { isLarge: true }
} as const

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

const corePresets = [
	{ label: 'default', props: {} },
	{ label: 'outline', props: { isOutlined: true } }
] as const

const neonSolidPresets = [
	{ label: 'green', props: { isGreen: true } },
	{ label: 'purple', props: { isPurple: true } },
	{ label: 'pink', props: { isPink: true } },
	{ label: 'orange', props: { isOrange: true } }
] as const

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<div>
					<span style={sectionLabelStyle}>All Kinds × Colors</span>
					<div style={rowStyle}>
						{kinds.map((kind) =>
							colors.map((color) => (
								<div key={`${kind}-${color}`} style={{ display: 'flex', gap: 8 }}>
									<Toggle {...kindPropsByKind[kind]} {...colorPropsByColor[color]} aria-label={`${kind} ${color}`}>
										<Phosphor.Star />
									</Toggle>
									<Toggle {...kindPropsByKind[kind]} {...colorPropsByColor[color]} defaultPressed aria-label={`${kind} ${color} on`}>
										<Phosphor.Star weight='fill' />
									</Toggle>
								</div>
							))
						)}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Sizes</span>
					<div style={rowStyle}>
						{sizes.map((size) => (
							<div key={size} style={{ display: 'flex', gap: 8 }}>
								<Toggle {...sizePropsBySize[size]} isGreen aria-label={size}>
									<Phosphor.Star />
								</Toggle>
								<Toggle {...sizePropsBySize[size]} isGreen defaultPressed aria-label={`${size} on`}>
									<Phosphor.Star weight='fill' />
								</Toggle>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Outlined Sizes</span>
					<div style={rowStyle}>
						{sizes.map((size) => (
							<div key={size} style={{ display: 'flex', gap: 8 }}>
								<Toggle {...sizePropsBySize[size]} isGreen isOutlined aria-label={size}>
									<Phosphor.Star />
								</Toggle>
								<Toggle {...sizePropsBySize[size]} isGreen isOutlined defaultPressed aria-label={`${size} on`}>
									<Phosphor.Star weight='fill' />
								</Toggle>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Neon Ghost × Colors</span>
					<div style={rowStyle}>
						{neonColors.map((color) => (
							<div key={color} style={{ display: 'flex', gap: 8 }}>
								<Toggle isGhost {...colorPropsByColor[color]} aria-label={color}>
									<Phosphor.Star />
								</Toggle>
								<Toggle isGhost {...colorPropsByColor[color]} defaultPressed aria-label={`${color} on`}>
									<Phosphor.Star weight='fill' />
								</Toggle>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Neon Outlined × Colors</span>
					<div style={rowStyle}>
						{neonColors.map((color) => (
							<div key={color} style={{ display: 'flex', gap: 8 }}>
								<Toggle isOutlined {...colorPropsByColor[color]} aria-label={color}>
									<Phosphor.Star />
								</Toggle>
								<Toggle isOutlined {...colorPropsByColor[color]} defaultPressed aria-label={`${color} on`}>
									<Phosphor.Star weight='fill' />
								</Toggle>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>With Text</span>
					<div style={rowStyle}>
						<Toggle isGreen>
							<Phosphor.Star />
							Favorite
						</Toggle>
						<Toggle isPurple defaultPressed>
							<Phosphor.Bell weight='fill' />
							Notifications On
						</Toggle>
						<Toggle isPink>
							<Phosphor.Heart />
							Like
						</Toggle>
						<Toggle isOrange defaultPressed>
							<Phosphor.Eye weight='fill' />
							Watching
						</Toggle>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Text Formatting Toolbar</span>
					<div style={rowStyle}>
						<Toggle isGreen isOutlined aria-label='Bold'>
							<Phosphor.TextB weight='bold' />
						</Toggle>
						<Toggle isPurple isOutlined aria-label='Italic'>
							<Phosphor.TextItalic />
						</Toggle>
						<Toggle isPink isOutlined aria-label='Underline'>
							<Phosphor.TextUnderline />
						</Toggle>
						<Toggle isOrange isOutlined aria-label='Strikethrough'>
							<Phosphor.TextStrikethrough />
						</Toggle>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Disabled</span>
					<div style={rowStyle}>
						<Toggle isGreen disabled aria-label='Disabled off'>
							<Phosphor.Star />
						</Toggle>
						<Toggle isGreen disabled defaultPressed aria-label='Disabled on'>
							<Phosphor.Star weight='fill' />
						</Toggle>
						<Toggle isPurple isOutlined disabled aria-label='Disabled outline'>
							<Phosphor.Bell />
						</Toggle>
					</div>
				</div>
			</div>
		)
	}
}

export const Default: StoryT = {
	args: {
		children: 'Toggle'
	}
}

export const Outline: StoryT = {
	args: {
		children: 'Outline',
		isOutlined: true
	}
}

export const Green: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isGreen aria-label='Green toggle'>
					<Phosphor.Star />
				</Toggle>
				<Toggle isGreen defaultPressed aria-label='Green toggle on'>
					<Phosphor.Star weight='fill' />
				</Toggle>
			</div>
		)
	}
}

export const Purple: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isPurple aria-label='Purple toggle'>
					<Phosphor.Bell />
				</Toggle>
				<Toggle isPurple defaultPressed aria-label='Purple toggle on'>
					<Phosphor.Bell weight='fill' />
				</Toggle>
			</div>
		)
	}
}

export const Pink: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isPink aria-label='Pink toggle'>
					<Phosphor.Heart />
				</Toggle>
				<Toggle isPink defaultPressed aria-label='Pink toggle on'>
					<Phosphor.Heart weight='fill' />
				</Toggle>
			</div>
		)
	}
}

export const Orange: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isOrange aria-label='Orange toggle'>
					<Phosphor.Lightning />
				</Toggle>
				<Toggle isOrange defaultPressed aria-label='Orange toggle on'>
					<Phosphor.Lightning weight='fill' />
				</Toggle>
			</div>
		)
	}
}

export const GreenOutline: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isGreen isOutlined aria-label='Green outline toggle'>
					<Phosphor.Star />
				</Toggle>
				<Toggle isGreen isOutlined defaultPressed aria-label='Green outline toggle on'>
					<Phosphor.Star weight='fill' />
				</Toggle>
			</div>
		)
	}
}

export const WithIcon: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isGreen aria-label='Bold'>
					<Phosphor.TextB weight='bold' />
				</Toggle>
				<Toggle isPurple aria-label='Italic'>
					<Phosphor.TextItalic />
				</Toggle>
				<Toggle isPink aria-label='Underline'>
					<Phosphor.TextUnderline />
				</Toggle>
			</div>
		)
	}
}

export const Disabled: StoryT = {
	render: () => {
		return (
			<div className='flex gap-2'>
				<Toggle isGreen disabled aria-label='Disabled'>
					<Phosphor.Star />
				</Toggle>
				<Toggle isGreen disabled defaultPressed aria-label='Disabled on'>
					<Phosphor.Star weight='fill' />
				</Toggle>
			</div>
		)
	}
}
