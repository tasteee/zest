import type { Meta, StoryObj } from '@storybook/nextjs'
import { z } from '@/components/ui'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof z.tooltip> = {
	title: 'UI/Tooltip',
	component: z.tooltip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		tip: 'Add to library'
	}
}

export default meta

type StoryT = StoryObj<typeof z.tooltip>

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
	padding: 64,
	display: 'flex',
	flexDirection: 'column',
	gap: 48
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 16,
	flexWrap: 'wrap'
}

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<div>
					<span style={sectionLabelStyle}>Basic Tooltips</span>
					<div style={rowStyle}>
						<z.tooltip tip='Simple tooltip text'>
							<z.button>Hover me</z.button>
						</z.tooltip>

						<z.tooltip tip='More information here'>
							<z.button>Another tooltip</z.button>
						</z.tooltip>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Tooltip Positions</span>
					<div style={rowStyle}>
						<z.tooltip tip='Tooltip on top' side='top'>
							<z.button>Top</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on bottom' side='bottom'>
							<z.button>Bottom</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on left' side='left'>
							<z.button>Left</z.button>
						</z.tooltip>

						<z.tooltip tip='Tooltip on right' side='right'>
							<z.button>Right</z.button>
						</z.tooltip>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Icon Button Tooltips</span>
					<div style={rowStyle}>
						<z.tooltip tip='Add new item'>
							<z.button isIcon>
								<Phosphor.Plus />
							</z.button>
						</z.tooltip>

						<z.tooltip tip='Edit'>
							<z.button isIcon>
								<Phosphor.PencilSimple />
							</z.button>
						</z.tooltip>

						<z.tooltip tip='Delete'>
							<z.button isIcon>
								<Phosphor.Trash />
							</z.button>
						</z.tooltip>

						<z.tooltip tip='More options'>
							<z.button isIcon>
								<Phosphor.DotsThree />
							</z.button>
						</z.tooltip>
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>With Longer Content</span>
					<div style={rowStyle}>
						<z.tooltip tip={<p className='max-w-50'>This is a longer tooltip that wraps to multiple lines when needed.</p>}>
							<z.button>
								<Phosphor.Info />
								Learn more
							</z.button>
						</z.tooltip>
					</div>
				</div>
			</div>
		)
	}
}

export const Default: StoryT = {
	render: (args) => {
		return (
			<z.tooltip {...args}>
				<z.button>Hover me</z.button>
			</z.tooltip>
		)
	}
}

export const Top: StoryT = {
	args: {
		tip: 'Tooltip on top',
		side: 'top'
	},
	render: (args) => (
		<z.tooltip {...args}>
			<z.button>Top</z.button>
		</z.tooltip>
	)
}

export const Bottom: StoryT = {
	args: {
		tip: 'Tooltip on bottom',
		side: 'bottom'
	},
	render: (args) => (
		<z.tooltip {...args}>
			<z.button>Bottom</z.button>
		</z.tooltip>
	)
}

export const Left: StoryT = {
	args: {
		tip: 'Tooltip on left',
		side: 'left'
	},
	render: (args) => (
		<z.tooltip {...args}>
			<z.button>Left</z.button>
		</z.tooltip>
	)
}

export const Right: StoryT = {
	args: {
		tip: 'Tooltip on right',
		side: 'right'
	},
	render: (args) => (
		<z.tooltip {...args}>
			<z.button>Right</z.button>
		</z.tooltip>
	)
}

export const OnIconButton: StoryT = {
	args: {
		tip: 'Add new item'
	},
	render: (args) => {
		return (
			<z.tooltip {...args}>
				<z.button isIcon>
					<Phosphor.Plus />
				</z.button>
			</z.tooltip>
		)
	}
}
