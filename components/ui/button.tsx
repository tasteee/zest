import React from 'react'
import { cva } from 'class-variance-authority'

type ZButtonKindT = 'outlined' | 'solid' | 'ghost'
type ZButtonColorT = 'green' | 'purple' | 'pink' | 'orange' | 'white'
type ZButtonSizeT = 'sm' | 'md' | 'lg' | 'icon'

type ZButtonPropsT = {
	kind?: ZButtonKindT
	color?: ZButtonColorT
	size?: ZButtonSizeT
	isDisabled?: boolean
	children: React.ReactNode
	onClick?: () => void
}

const variants = cva(
	'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-md border transition-opacity transition-colors cursor-pointer',
	{
		variants: {
			kind: {
				solid: '',
				outlined: 'bg-transparent',
				ghost: 'bg-transparent border-transparent'
			},
			color: {
				green: '',
				purple: '',
				pink: '',
				orange: '',
				white: ''
			},
			size: {
				icon: 'h-10 w-10',
				sm: 'h-8 px-3.5 text-sm',
				md: 'h-10 px-4 text-sm',
				lg: 'h-12 px-6 text-base'
			}
		},
		compoundVariants: [
			// solid
			{
				kind: 'solid',
				color: 'green',
				class: 'bg-neon-green  border-neon-green  text-primary-foreground hover:opacity-90 active:opacity-80'
			},
			{
				kind: 'solid',
				color: 'purple',
				class: 'bg-neon-purple border-neon-purple text-primary-foreground hover:opacity-90 active:opacity-80'
			},
			{
				kind: 'solid',
				color: 'pink',
				class: 'bg-neon-pink   border-neon-pink   text-primary-foreground hover:opacity-90 active:opacity-80'
			},
			{
				kind: 'solid',
				color: 'orange',
				class: 'bg-neon-orange border-neon-orange text-primary-foreground hover:opacity-90 active:opacity-80'
			},
			{
				kind: 'solid',
				color: 'white',
				class: 'bg-primary     border-primary     text-primary-foreground hover:opacity-90 active:opacity-80'
			},
			// outlined
			{
				kind: 'outlined',
				color: 'green',
				class: 'border-neon-green  text-neon-green  hover:bg-neon-green/10 active:bg-neon-green/20'
			},
			{
				kind: 'outlined',
				color: 'purple',
				class: 'border-neon-purple text-neon-purple hover:bg-neon-purple/10 active:bg-neon-purple/20'
			},
			{
				kind: 'outlined',
				color: 'pink',
				class: 'border-neon-pink   text-neon-pink   hover:bg-neon-pink/10 active:bg-neon-pink/20'
			},
			{
				kind: 'outlined',
				color: 'orange',
				class: 'border-neon-orange text-neon-orange hover:bg-neon-orange/10 active:bg-neon-orange/20'
			},
			{
				kind: 'outlined',
				color: 'white',
				class: 'border-border text-foreground  hover:border-foreground/50 active:border-foreground/70 active:bg-foreground/5'
			},
			// ghost
			{
				kind: 'ghost',
				color: 'green',
				class: 'text-neon-green  hover:opacity-70 active:opacity-55'
			},
			{
				kind: 'ghost',
				color: 'purple',
				class: 'text-neon-purple hover:opacity-70 active:opacity-55'
			},
			{
				kind: 'ghost',
				color: 'pink',
				class: 'text-neon-pink   hover:opacity-70 active:opacity-55'
			},
			{
				kind: 'ghost',
				color: 'orange',
				class: 'text-neon-orange hover:opacity-70 active:opacity-55'
			},
			{
				kind: 'ghost',
				color: 'white',
				class: 'text-foreground  hover:opacity-70 active:opacity-55'
			}
		],

		defaultVariants: {
			kind: 'outlined',
			color: 'white',
			size: 'md'
		}
	}
)

const ZButton = (props: ZButtonPropsT) => {
	const buttonClass = variants({
		kind: props.kind,
		color: props.color,
		size: props.size
	})

	const disabledClass = props.isDisabled ? 'opacity-50 pointer-events-none' : ''

	return (
		<button className={`${buttonClass} ${disabledClass}`} onClick={props.onClick} disabled={props.isDisabled}>
			{props.children}
		</button>
	)
}

export { ZButton }
