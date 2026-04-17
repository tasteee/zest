import type { Meta, StoryObj } from '@storybook/nextjs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { ZButton } from './button'
import * as Phosphor from '@phosphor-icons/react'

const meta: Meta<typeof Tooltip> = {
	title: 'UI/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
}

export default meta

type StoryT = StoryObj<typeof Tooltip>

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

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				{/* Basic Tooltips */}
				<div>
					<span style={sectionLabelStyle}>Basic Tooltips</span>
					<div style={rowStyle}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Hover me</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>Simple tooltip text</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='secondary'>Another tooltip</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>More information here</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				{/* Tooltip Positions */}
				<div>
					<span style={sectionLabelStyle}>Tooltip Positions</span>
					<div style={rowStyle}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Top</ZButton>
								</TooltipTrigger>
								<TooltipContent side='top'>
									<p>Tooltip on top</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Bottom</ZButton>
								</TooltipTrigger>
								<TooltipContent side='bottom'>
									<p>Tooltip on bottom</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Left</ZButton>
								</TooltipTrigger>
								<TooltipContent side='left'>
									<p>Tooltip on left</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>Right</ZButton>
								</TooltipTrigger>
								<TooltipContent side='right'>
									<p>Tooltip on right</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				{/* Icon Button Tooltips */}
				<div>
					<span style={sectionLabelStyle}>Icon Button Tooltips</span>
					<div style={rowStyle}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline' size='icon'>
										<Phosphor.Plus />
									</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>Add new item</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline' size='icon'>
										<Phosphor.PencilSimple />
									</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>Edit</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline' size='icon'>
										<Phosphor.Trash />
									</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>Delete</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline' size='icon'>
										<Phosphor.DotsThree />
									</ZButton>
								</TooltipTrigger>
								<TooltipContent>
									<p>More options</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				{/* Longer Content */}
				<div>
					<span style={sectionLabelStyle}>With Longer Content</span>
					<div style={rowStyle}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ZButton variant='outline'>
										<Phosphor.Info />
										Learn more
									</ZButton>
								</TooltipTrigger>
								<TooltipContent className='max-w-[200px]'>
									<p>This is a longer tooltip that wraps to multiple lines when needed.</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
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
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline'>Hover me</ZButton>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add to library</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}

export const Top: StoryT = {
	render: () => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline'>Top</ZButton>
					</TooltipTrigger>
					<TooltipContent side='top'>
						<p>Tooltip on top</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}

export const Bottom: StoryT = {
	render: () => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline'>Bottom</ZButton>
					</TooltipTrigger>
					<TooltipContent side='bottom'>
						<p>Tooltip on bottom</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}

export const Left: StoryT = {
	render: () => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline'>Left</ZButton>
					</TooltipTrigger>
					<TooltipContent side='left'>
						<p>Tooltip on left</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}

export const Right: StoryT = {
	render: () => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline'>Right</ZButton>
					</TooltipTrigger>
					<TooltipContent side='right'>
						<p>Tooltip on right</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}

export const OnIconButton: StoryT = {
	render: () => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ZButton variant='outline' size='icon'>
							<Phosphor.Plus />
						</ZButton>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add new item</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
}
