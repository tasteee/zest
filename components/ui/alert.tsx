import * as React from 'react'
import { CircleAlert, Info, Sparkles, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { createPropClassNameSwitch } from '@/lib/prop'
import './alert.css'

type AlertColorPropT = 'isNeutral' | 'isPurple' | 'isPink'
type AlertColorKeyT = 'neutral' | 'purple' | 'pink'

type AlertPropsT = {
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
} & ZeroOrOneTruePropT<AlertColorPropT>

const getColorClass = createPropClassNameSwitch({
	isPurple: 'isPurple',
	isPink: 'isPink',
	isNeutral: 'isNeutral',
	default: 'isNeutral'
})

const alertDefaults: Record<AlertColorKeyT, { Icon: LucideIcon; title: string }> = {
	neutral: { Icon: Info, title: 'Notice' },
	purple: { Icon: CircleAlert, title: 'Information' },
	pink: { Icon: Sparkles, title: 'Featured' }
}

const getAlertColorKey = (props: AlertPropsT): AlertColorKeyT => {
	if (props.isPurple) return 'purple'
	if (props.isPink) return 'pink'

	return 'neutral'
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
