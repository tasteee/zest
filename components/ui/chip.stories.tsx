import type { Meta, StoryObj } from '@storybook/nextjs'
import * as React from 'react'
import * as Phosphor from '@phosphor-icons/react'
import { Chip } from './chip'

const meta: Meta<typeof Chip> = {
	title: 'UI/Chip',
	component: Chip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		children: 'Chip'
	},
	argTypes: {
		isSelected: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
}

export default meta

type StoryT = StoryObj<typeof Chip>

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 16,
	padding: 24,
	width: 560
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 12,
	flexWrap: 'wrap'
}

export const Default: StoryT = {
	args: {
		children: 'Default chip'
	}
}

export const Selected: StoryT = {
	args: {
		children: 'Selected chip',
		isSelected: true
	}
}

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={wrapperStyle}>
				<div style={rowStyle}>
					<Chip>Neutral</Chip>
					<Chip isSelected>Selected</Chip>
					<Chip disabled>Disabled</Chip>
				</div>
				<div style={rowStyle}>
					<Chip>
						<Phosphor.Tag />
						Tag
					</Chip>
					<Chip isSelected>
						<Phosphor.CheckCircle weight='fill' />
						Applied
					</Chip>
					<Chip>
						<Phosphor.Lightning />
						Fast
					</Chip>
				</div>
			</div>
		)
	}
}
