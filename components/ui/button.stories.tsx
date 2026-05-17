import type { Meta, StoryObj } from '@storybook/nextjs'
import * as Phosphor from '@phosphor-icons/react'
import { ZButton } from './button'
import { Layout } from './layout'

const meta: Meta<typeof ZButton> = {
	title: 'UI/Button',
	component: ZButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isGhost: {
			control: 'boolean'
		},
		isOutlined: {
			control: 'boolean'
		},
		isSolid: {
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
		},
		isWhite: {
			control: 'boolean'
		},
		isSmall: {
			control: 'boolean'
		},
		isMedium: {
			control: 'boolean'
		},
		isLarge: {
			control: 'boolean'
		},
		isDisabled: {
			control: 'boolean'
		}
	}
}

export default meta

type StoryT = StoryObj<typeof ZButton>

export const Default: StoryT = {
	args: {
		children: 'Button',
		isOutlined: true,
		isWhite: true,
		isMedium: true,
		isDisabled: false
	}
}

// ─── Exhaustive grid ────────────────────────────────────────────────────────

type KindT = 'outlined' | 'solid' | 'ghost'
type ThemeT = 'green' | 'purple' | 'pink' | 'orange' | 'white'
type SizeT = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const kinds: KindT[] = ['outlined', 'solid', 'ghost']
const themes: ThemeT[] = ['green', 'purple', 'pink', 'orange', 'white']
const sizes: SizeT[] = ['xs', 'sm', 'md', 'lg', 'xl']

const kindPropsByKind = {
	outlined: { isOutlined: true },
	solid: { isSolid: true },
	ghost: { isGhost: true }
} as const

const colorPropsByTheme = {
	green: { isGreen: true },
	purple: { isPurple: true },
	pink: { isPink: true },
	orange: { isOrange: true },
	white: { isWhite: true }
} as const

const sizePropsBySize = {
	xs: { isExtraSmall: true },
	sm: { isSmall: true },
	md: { isMedium: true },
	lg: { isLarge: true },
	xl: { isExtraLarge: true }
} as const

const sectionLabelStyle: React.CSSProperties = {
	fontSize: 12,
	fontWeight: 600,
	letterSpacing: '0.12em',
	textTransform: 'uppercase',
	color: 'var(--color-muted-foreground, #888)',
	marginBottom: 16,
	display: 'block'
}

const colorSectionStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 8
}

const cardsWrapStyle: React.CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: 14
}

const cardStyle: React.CSSProperties = {
	width: 230,
	display: 'flex',
	flexDirection: 'column',
	gap: 8
}

const cardLabelStyle: React.CSSProperties = {
	fontSize: 11,
	fontWeight: 500,
	color: 'var(--color-muted-foreground, #888)',
	lineHeight: 1.2
}

const buttonRowStyle: React.CSSProperties = {
	height: 96,
	borderRadius: 10,
	padding: 12
}

const gridWrapperStyle: React.CSSProperties = {
	padding: 32,
	display: 'flex',
	flexDirection: 'column',
	gap: 32
}

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				{themes.map((theme) => {
					return (
						<section key={theme} style={colorSectionStyle}>
							<span style={sectionLabelStyle}>{theme}</span>
							<div style={cardsWrapStyle}>
								{kinds.map((kind) => sizes.map((size) => {
									const label = `${theme} / ${kind} / ${size}`

									return (
										<div key={label} style={cardStyle}>
											<span style={cardLabelStyle}>{label}</span>
											<Layout.Row isCentered style={buttonRowStyle}>
												<ZButton {...kindPropsByKind[kind]} {...colorPropsByTheme[theme]} {...sizePropsBySize[size]}>
													<Phosphor.Plus />
													Button
												</ZButton>
											</Layout.Row>
										</div>
									)
								}))}
							</div>
						</section>
					)
				})}
			</div>
		)
	}
}
