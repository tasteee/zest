import * as React from 'react'

import { cn } from '@/lib/utils'
import { createPropClassNameSwitch } from '@/lib/create-prop-classname-switch'
import './alert.css'

type AlertColorPropT = 'isGreen' | 'isPurple' | 'isPink' | 'isOrange' | 'isRed'

type AlertPropsT = {
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
} & ZeroOrOneTruePropT<AlertColorPropT>

const getColorClass = createPropClassNameSwitch({
	isGreen: 'isGreen',
	isPurple: 'isPurple',
	isPink: 'isPink',
	isOrange: 'isOrange',
	isRed: 'isRed'
})

const AlertBase = (props: AlertPropsT) => {
	const colorClass = getColorClass(props)
	const classes = cn('alert', colorClass, props.className)

	return (
		<div data-slot='alert' role='alert' className={classes} style={props.style}>
			{props.children}
		</div>
	)
}

const AlertTitle = (props: React.ComponentProps<'div'>) => {
	return <div data-slot='alert-title' {...props} className={cn('alertTitle', props.className)} />
}

const AlertDescription = (props: React.ComponentProps<'div'>) => {
	return <div data-slot='alert-description' {...props} className={cn('alertDescription', props.className)} />
}

const Alert = Object.assign(AlertBase, {
	title: AlertTitle,
	description: AlertDescription
})

export { Alert, AlertTitle, AlertDescription }
