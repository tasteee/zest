import * as React from 'react'
import { cn } from '@/lib/utils'
import './link.css'

type LinkColorT = 'default' | 'purple' | 'pink' | 'neutral' | 'muted'

type LinkPropsT = React.ComponentProps<'a'> & {
	as?: React.ElementType
	color?: LinkColorT
	to?: string
}

const linkColorClassMap: Record<LinkColorT, string> = {
	default: 'linkColorDefault',
	purple: 'linkColorPurple',
	pink: 'linkColorPink',
	neutral: 'linkColorWhite',
	muted: 'linkColorMuted'
}

const Link = (props: LinkPropsT) => {
	const LinkElement = props.as || 'a'
	const color = props.color || 'default'
	const classNames = cn('link', linkColorClassMap[color], props.className)
	const elementProps: Record<string, unknown> = { ...props }
	const isAnchorElement = LinkElement === 'a'
	const hasTo = props.to != null
	const hasHref = props.href != null
	const shouldPromoteToToHref = hasTo && !hasHref

	delete elementProps.className
	delete elementProps.as
	delete elementProps.color

	if (isAnchorElement) {
		delete elementProps.to

		if (shouldPromoteToToHref) {
			elementProps.href = props.to
		}
	}

	const isCustomElement = !isAnchorElement
	if (isCustomElement) {
		if (shouldPromoteToToHref) {
			elementProps.href = props.to
		}
	}

	return <LinkElement data-slot='link' className={classNames} {...(elementProps as any)} />
}

export { Link }
export type { LinkPropsT, LinkColorT }
