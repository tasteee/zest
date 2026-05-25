import type { Meta, StoryObj } from '@storybook/nextjs'
import * as React from 'react'
import { ZText } from './z-text'

const meta: Meta<typeof ZText> = {
	title: 'UI/ZText',
	component: ZText,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	args: {
		children: 'ZText sample'
	},
	argTypes: {
		isOrange: { control: 'boolean' },
		isPurple: { control: 'boolean' },
		isPink: { control: 'boolean' },
		isGreen: { control: 'boolean' },
		isWhite: { control: 'boolean' },
		isMuted: { control: 'boolean' },
		isExtraSmall: { control: 'boolean' },
		isSmall: { control: 'boolean' },
		isMedium: { control: 'boolean' },
		isLarge: { control: 'boolean' },
		isExtraLarge: { control: 'boolean' },
		isThin: { control: 'boolean' },
		isNormal: { control: 'boolean' },
		isBold: { control: 'boolean' },
		isVeryBold: { control: 'boolean' },
		isItalic: { control: 'boolean' },
		isUnderlined: { control: 'boolean' }
	}
}

export default meta

type StoryT = StoryObj<typeof ZText>

const pageStyle: React.CSSProperties = {
	padding: 32,
	display: 'flex',
	flexDirection: 'column',
	gap: 24,
	maxWidth: 860
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 12
}

const labelStyle: React.CSSProperties = {
	fontSize: 11,
	fontWeight: 600,
	letterSpacing: '0.12em',
	textTransform: 'uppercase',
	color: 'var(--muted-foreground)'
}

export const Default: StoryT = {
	args: {
		children: 'Plain body text'
	}
}

export const TypographyScale: StoryT = {
	render: () => {
		return (
			<div style={pageStyle}>
				<div style={rowStyle}>
					<span style={labelStyle}>Display And Headings</span>
					<ZText.display>Design language speaks in systems</ZText.display>
					<ZText.h1>Heading one</ZText.h1>
					<ZText.h2>Heading two</ZText.h2>
					<ZText.h3>Heading three</ZText.h3>
					<ZText.h4>Heading four</ZText.h4>
				</div>
				<div style={rowStyle}>
					<span style={labelStyle}>Body Styles</span>
					<ZText.body>Body text for longer reading.</ZText.body>
					<ZText.small>Small helper text.</ZText.small>
					<ZText.caption>Caption label text.</ZText.caption>
				</div>
			</div>
		)
	}
}

export const ColorAndWeight: StoryT = {
	render: () => {
		return (
			<div style={pageStyle}>
				<div style={rowStyle}>
					<span style={labelStyle}>Color Variants</span>
					<ZText isGreen>Neon green accent text.</ZText>
					<ZText isPurple>Neon purple accent text.</ZText>
					<ZText isPink>Neon pink accent text.</ZText>
					<ZText isOrange>Neon orange accent text.</ZText>
					<ZText isMuted>Muted supporting text.</ZText>
				</div>
				<div style={rowStyle}>
					<span style={labelStyle}>Weight And Style</span>
					<ZText isThin>Thin text</ZText>
					<ZText isNormal>Normal text</ZText>
					<ZText isBold>Bold text</ZText>
					<ZText isVeryBold>Very bold text</ZText>
					<ZText isItalic>Italic text</ZText>
					<ZText isUnderlined>Underlined text</ZText>
				</div>
			</div>
		)
	}
}
