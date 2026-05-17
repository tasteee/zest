import type { Meta, StoryObj } from '@storybook/nextjs'
import { Checkbox } from './checkbox'
import { Label } from './label'

const meta: Meta<typeof Checkbox> = {
	title: 'UI/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isWhite: { control: 'boolean' },
		isGreen: { control: 'boolean' },
		isPurple: { control: 'boolean' },
		isPink: { control: 'boolean' },
		isOrange: { control: 'boolean' },
		isChecked: { control: 'boolean' },
		isDisabled: { control: 'boolean' },
		label: { control: 'text' },
		description: { control: 'text' }
	}
}

export default meta

type StoryT = StoryObj<typeof Checkbox>

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
	gap: 32,
	width: 320
}

const rowStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 16
}

const checkboxRowStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 12
}

const colors = ['white', 'green', 'purple', 'pink', 'orange'] as const

const colorPropsByColor = {
	white: { isWhite: true },
	green: { isGreen: true },
	purple: { isPurple: true },
	pink: { isPink: true },
	orange: { isOrange: true }
} as const

export const Default: StoryT = {
	args: {
		isWhite: true,
		label: 'Accept terms and conditions'
	}
}

export const AllVariants: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div style={gridWrapperStyle}>
				<div>
					<span style={sectionLabelStyle}>All Variants (Unchecked)</span>
					<div style={rowStyle}>
						{colors.map((color) => (
							<div key={`${color}-unchecked`} style={checkboxRowStyle}>
								<Checkbox {...colorPropsByColor[color]} id={`${color}-unchecked`} />
								<Label htmlFor={`${color}-unchecked`}>{color}</Label>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>All Variants (Checked)</span>
					<div style={rowStyle}>
						{colors.map((color) => (
							<div key={`${color}-checked`} style={checkboxRowStyle}>
								<Checkbox {...colorPropsByColor[color]} id={`${color}-checked`} isChecked />
								<Label htmlFor={`${color}-checked`}>{color}</Label>
							</div>
						))}
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Label Prop</span>
					<div style={rowStyle}>
						<Checkbox isGreen isChecked label='Enable notifications' />
						<Checkbox isPurple isChecked label='Receive product updates' />
						<Checkbox isPink label='Subscribe to newsletter' />
						<Checkbox isOrange label='Join beta program' />
					</div>
				</div>

				<div>
					<span style={sectionLabelStyle}>Disabled States</span>
					<div style={rowStyle}>
						<Checkbox isGreen isDisabled label='Disabled unchecked' />
						<Checkbox isGreen isDisabled isChecked label='Disabled checked' />
					</div>
				</div>
			</div>
		)
	}
}

export const Checked: StoryT = {
	args: {
		isGreen: true,
		isChecked: true,
		label: 'Checked'
	}
}

export const Green: StoryT = {
	render: () => {
		return (
			<div className='flex gap-4'>
				<Checkbox isGreen />
				<Checkbox isGreen isChecked />
			</div>
		)
	}
}

export const Purple: StoryT = {
	render: () => {
		return (
			<div className='flex gap-4'>
				<Checkbox isPurple />
				<Checkbox isPurple isChecked />
			</div>
		)
	}
}

export const Pink: StoryT = {
	render: () => {
		return (
			<div className='flex gap-4'>
				<Checkbox isPink />
				<Checkbox isPink isChecked />
			</div>
		)
	}
}

export const Orange: StoryT = {
	render: () => {
		return (
			<div className='flex gap-4'>
				<Checkbox isOrange />
				<Checkbox isOrange isChecked />
			</div>
		)
	}
}

export const WithLabel: StoryT = {
	render: () => {
		return <Checkbox isGreen id='terms' label='Accept terms and conditions' />
	}
}

export const WithDescription: StoryT = {
	render: () => {
		return (
			<Checkbox
				isGreen
				id='terms-desc'
				label='Accept terms and conditions'
				description='You agree to our Terms of Service and Privacy Policy.'
			/>
		)
	}
}

export const Disabled: StoryT = {
	render: () => {
		return (
			<div className='flex gap-4'>
				<Checkbox isGreen isDisabled />
				<Checkbox isGreen isDisabled isChecked />
			</div>
		)
	}
}

export const TodoList: StoryT = {
	render: () => {
		return (
			<div className='w-64 space-y-3'>
				<div className='flex items-center gap-2'>
					<Checkbox isGreen id='task1' isChecked />
					<Label htmlFor='task1' className='line-through text-muted-foreground'>
						Complete project setup
					</Label>
				</div>
				<div className='flex items-center gap-2'>
					<Checkbox isGreen id='task2' isChecked />
					<Label htmlFor='task2' className='line-through text-muted-foreground'>
						Design system review
					</Label>
				</div>
				<div className='flex items-center gap-2'>
					<Checkbox isPurple id='task3' />
					<Label htmlFor='task3'>Implement components</Label>
				</div>
				<div className='flex items-center gap-2'>
					<Checkbox isPink id='task4' />
					<Label htmlFor='task4'>Write documentation</Label>
				</div>
			</div>
		)
	}
}
