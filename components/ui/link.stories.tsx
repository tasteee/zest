import type { Meta, StoryObj } from '@storybook/nextjs'
import * as React from 'react'
import { Link } from './link'

type RouterLinkPropsT = React.ComponentProps<'a'> & {
	to?: string
}

const RouterLink = (props: RouterLinkPropsT) => {
	const href = props.href != null ? props.href : props.to != null ? props.to : '#'
	const elementProps: Record<string, unknown> = { ...props, href }
	delete elementProps.to

	return <a {...(elementProps as React.ComponentProps<'a'>)} />
}

const meta: Meta<typeof Link> = {
	title: 'UI/Link',
	component: Link,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		children: 'Read the docs',
		href: '#'
	},
	argTypes: {
		color: {
			control: 'select',
			options: ['default', 'green', 'purple', 'pink', 'orange', 'white', 'muted']
		},
		to: {
			control: 'text'
		}
	}
}

export default meta

type StoryT = StoryObj<typeof Link>

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 16,
	padding: 24,
	width: 700
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 16,
	flexWrap: 'wrap'
}

const colorValues = ['default', 'green', 'purple', 'pink', 'orange', 'white', 'muted'] as const

export const Default: StoryT = {}

export const ColorVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={wrapperStyle}>
				<div style={rowStyle}>
					{colorValues.map((color) => (
						<Link key={color} href='#' color={color}>
							{color} link
						</Link>
					))}
				</div>
			</div>
		)
	}
}

export const AsRouterLink: StoryT = {
	render: () => {
		return (
			<div style={wrapperStyle}>
				<div style={rowStyle}>
					<Link as={RouterLink} to='/docs/components/button' color='green'>
						Router link via to
					</Link>
					<Link as={RouterLink} href='/docs/components/input' color='purple'>
						Router link via href
					</Link>
				</div>
			</div>
		)
	}
}
