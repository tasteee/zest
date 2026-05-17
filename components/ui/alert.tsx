import * as React from 'react'
import { CheckCircle2, CircleAlert, Info, Sparkles, TriangleAlert, XCircle, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { createPropClassNameSwitch } from '@/lib/create-prop-classname-switch'
import './alert.css'

type AlertColorPropT = 'isGreen' | 'isPurple' | 'isPink' | 'isOrange' | 'isRed'
type AlertColorKeyT = 'default' | 'green' | 'purple' | 'pink' | 'orange' | 'red'

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

const alertDefaults: Record<AlertColorKeyT, { Icon: LucideIcon; title: string }> = {
	default: { Icon: Info, title: 'Default Alert' },
	green: { Icon: CheckCircle2, title: 'Success' },
	purple: { Icon: CircleAlert, title: 'Information' },
	pink: { Icon: Sparkles, title: 'Featured' },
	orange: { Icon: TriangleAlert, title: 'Warning' },
	red: { Icon: XCircle, title: 'Error' }
}

const getAlertColorKey = (props: AlertPropsT): AlertColorKeyT => {
	if (props.isGreen) return 'green'
	if (props.isPurple) return 'purple'
	if (props.isPink) return 'pink'
	if (props.isOrange) return 'orange'
	if (props.isRed) return 'red'

	return 'default'
}

const AlertTitle = (props: React.ComponentProps<'div'>) => {
	return <div data-slot='alert-title' {...props} className={cn('alertTitle', props.className)} />
}

const AlertDescription = (props: React.ComponentProps<'div'>) => {
	return <div data-slot='alert-description' {...props} className={cn('alertDescription', props.className)} />
}

const isAlertTitleElement = (child: React.ReactNode) => {
	return React.isValidElement(child) && child.type === AlertTitle
}

const isAlertDescriptionElement = (child: React.ReactNode) => {
	return React.isValidElement(child) && child.type === AlertDescription
}

const isAlertIconElement = (child: React.ReactNode) => {
	return React.isValidElement(child) && !isAlertTitleElement(child) && !isAlertDescriptionElement(child)
}

const AlertBase = (props: AlertPropsT) => {
	const colorClass = getColorClass(props)
	const classes = cn('alert', colorClass, props.className)
	const children = React.Children.toArray(props.children)
	const hasIcon = children.some(isAlertIconElement)
	const hasTitle = children.some(isAlertTitleElement)
	const { Icon, title } = alertDefaults[getAlertColorKey(props)]

	return (
		<div data-slot='alert' role='alert' className={classes} style={props.style}>
			{!hasIcon ? <Icon aria-hidden='true' /> : null}
			{!hasTitle ? <AlertTitle>{title}</AlertTitle> : null}
			{children}
		</div>
	)
}

const Alert = Object.assign(AlertBase, {
	title: AlertTitle,
	description: AlertDescription
})

export { Alert, AlertTitle, AlertDescription }
