import * as React from 'react'
import { cn } from '@/lib/utils'
import styles from './card.module.css'

type CardToneT = 'neutral' | 'green' | 'pink' | 'purple' | 'orange'

type CardPropsT = React.ComponentProps<'div'> & {
	isHoverable?: boolean
	tone?: CardToneT
	isPremium?: boolean
}

const toneClassMap: Record<CardToneT, string> = {
	neutral: styles.cardToneNeutral,
	green: styles.cardToneGreen,
	pink: styles.cardTonePink,
	purple: styles.cardTonePurple,
	orange: styles.cardToneOrange
}

const getPropsWithoutClassName = <PropsT extends { className?: string }>(props: PropsT): Omit<PropsT, 'className'> => {
	const nextProps: Record<string, unknown> = { ...props }
	delete nextProps.className

	return nextProps as Omit<PropsT, 'className'>
}

const getCardRootProps = (props: CardPropsT): React.ComponentProps<'div'> => {
	const nextProps: Record<string, unknown> = getPropsWithoutClassName(props)
	delete nextProps.tone
	delete nextProps.isHoverable
	delete nextProps.isPremium

	return nextProps as React.ComponentProps<'div'>
}

const CardBase = (props: CardPropsT) => {
	const tone = props.tone ?? 'neutral'
	const isHoverable = props.isHoverable === true
	const isPremium = props.isPremium === true
	const classNames = cn(
		styles.card,
		toneClassMap[tone],
		isHoverable && styles.cardHoverable,
		isPremium && styles.cardPremium,
		props.className
	)
	const cardRootProps = getCardRootProps(props)

	return <div data-slot='card' className={classNames} {...cardRootProps} />
}

const CardHeader = (props: React.ComponentProps<'div'>) => {
	const headerProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardHeader, props.className)

	return <div data-slot='card-header' className={classNames} {...headerProps} />
}

const CardTitle = (props: React.ComponentProps<'div'>) => {
	const titleProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardTitle, props.className)

	return <div data-slot='card-title' className={classNames} {...titleProps} />
}

const CardDescription = (props: React.ComponentProps<'div'>) => {
	const descriptionProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardDescription, props.className)

	return <div data-slot='card-description' className={classNames} {...descriptionProps} />
}

const CardAction = (props: React.ComponentProps<'div'>) => {
	const actionProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardAction, props.className)

	return <div data-slot='card-action' className={classNames} {...actionProps} />
}

const CardContent = (props: React.ComponentProps<'div'>) => {
	const contentProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardContent, props.className)

	return <div data-slot='card-content' className={classNames} {...contentProps} />
}

const CardFooter = (props: React.ComponentProps<'div'>) => {
	const footerProps = getPropsWithoutClassName(props)
	const classNames = cn(styles.cardFooter, props.className)

	return <div data-slot='card-footer' className={classNames} {...footerProps} />
}

const CardNamespace = Object.assign(CardBase, {
	Header: CardHeader,
	Footer: CardFooter,
	Title: CardTitle,
	Action: CardAction,
	Description: CardDescription,
	Content: CardContent
})

export { CardNamespace as Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
