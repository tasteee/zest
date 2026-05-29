import type { Meta, StoryObj } from '@storybook/nextjs'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
	title: 'UI/Slider',
	component: Slider,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		isPurple: { control: 'boolean' },
		isPink: { control: 'boolean' },
		isNeutral: { control: 'boolean' }
	}
}

export default meta

type StoryT = StoryObj<typeof Slider>

const colors = [
	{ label: 'Neutral', props: { isNeutral: true } },
	{ label: 'Purple', props: { isPurple: true } },
	{ label: 'Pink', props: { isPink: true } }
] as const

export const Default: StoryT = {
	args: {
		className: 'w-64',
		defaultValue: 50,
		label: 'Intensity',
		min: 0,
		max: 100
	}
}

export const Purple: StoryT = {
	args: {
		className: 'w-64',
		defaultValue: 50,
		isPurple: true,
		label: 'Saturation'
	}
}

export const Pink: StoryT = {
	args: {
		className: 'w-64',
		defaultValue: 50,
		isPink: true,
		label: 'Warmth',
		formatValue: (value) => `${value}%`
	}
}

export const Range: StoryT = {
	render: () => <Slider.Range className='w-64' defaultValues={[20, 80]} label='Price range' min={0} max={100} />
}

export const AllColors: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => (
		<div className='flex w-105 flex-col gap-6 p-8'>
			{colors.map(({ label, props }) => (
				<Slider key={label} defaultValue={50} label={label} {...props} />
			))}
		</div>
	)
}

export const Values: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => (
		<div className='flex w-105 flex-col gap-6 p-8'>
			{[0, 25, 50, 75, 100].map((value) => (
				<Slider key={value} defaultValue={value} formatValue={(currentValue) => `${currentValue}%`} label={`${value}%`} />
			))}
		</div>
	)
}

export const Ranges: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => (
		<div className='flex w-105 flex-col gap-6 p-8'>
			<Slider.Range defaultValues={[30, 70]} isPurple label='Purple range' />
			<Slider.Range defaultValues={[10, 90]} isPink label='Pink range' />
		</div>
	)
}

export const CustomValueLabel: StoryT = {
	render: () => (
		<Slider
			className='w-72'
			defaultValue={75}
			formatValue={(value) => `${value}% ready`}
			label='Readiness'
			min={0}
			max={100}
		/>
	)
}

export const HiddenValue: StoryT = {
	args: {
		className: 'w-64',
		defaultValue: 40,
		isNeutral: true,
		label: 'No value label',
		showValue: false
	}
}

export const Disabled: StoryT = {
	args: {
		className: 'w-64',
		defaultValue: 40,
		disabled: true,
		isNeutral: true,
		label: 'Disabled'
	}
}
