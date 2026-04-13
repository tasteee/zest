import type { Meta, StoryObj } from '@storybook/nextjs'
import * as Phosphor from '@phosphor-icons/react'
import { Button } from './button'
import { Layout } from './layout'

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		kind: {
			control: 'select',
			options: ['outlined', 'solid', 'ghost']
		},
		theme: {
			control: 'select',
			options: ['green', 'purple', 'pink', 'orange', 'white']
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl']
		},
		isDisabled: {
			control: 'boolean'
		}
	}
}

export default meta

type StoryT = StoryObj<typeof Button>

export const Default: StoryT = {
	args: {
		children: 'Button',
		kind: 'outlined',
		theme: 'white',
		size: 'md',
		isDisabled: false
	}
}

// ─── Exhaustive grid ────────────────────────────────────────────────────────

type KindT = 'solid' | 'outlined' | 'ghost'
type ThemeT = 'green' | 'purple' | 'pink' | 'orange' | 'white'
type SizeT = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const kinds: KindT[] = ['solid', 'outlined', 'ghost']
const themes: ThemeT[] = ['green', 'purple', 'pink', 'orange', 'white']
const sizes: SizeT[] = ['xs', 'sm', 'md', 'lg', 'xl']

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
		const isIconButton = (kind: KindT): boolean => {
			const shouldUseIcon = kind !== 'solid'
			return shouldUseIcon
		}

		return (
			<div style={gridWrapperStyle}>
				{themes.map((theme) => {
					return (
						<section key={theme} style={colorSectionStyle}>
							<span style={sectionLabelStyle}>{theme}</span>
							<div style={cardsWrapStyle}>
								{kinds.map((kind) => {
									return sizes.map((size) => {
										const label = `${theme} / ${kind} / ${size}`
										const shouldUseIcon = isIconButton(kind)

										return (
											<div key={label} style={cardStyle}>
												<span style={cardLabelStyle}>{label}</span>
												<Layout.Row isCentered style={buttonRowStyle}>
													<Button kind={kind} theme={theme} size={size}>
														{shouldUseIcon ? <Phosphor.Plus /> : null}
														Button
													</Button>
												</Layout.Row>
											</div>
										)
									})
								})}
							</div>
						</section>
					)
				})}
			</div>
		)
	}
}
