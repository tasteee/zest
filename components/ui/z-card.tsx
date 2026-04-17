import { cn } from '@/lib/utils'
import * as React from 'react'
import { ZBox } from './z-box'
import './z-card.css'

type ZCardPropsT = ComponentPropsT & {
	color?: 'green' | 'pink' | 'purple'
}

const getThemeClass = (color: string) => {
	if (color === 'green') return 'isNeonGreenTheme'
	if (color === 'pink') return 'isNeonPinkTheme'
	if (color === 'purple') return 'isNeonPurpleTheme'
	if (color === 'orange') return 'isNeonOrangeTheme'
	return 'isWhiteTheme'
}

export const ZCard = (props: ZCardPropsT) => {
	const themeClass = getThemeClass(props.color || '')
	const classes = cn('zCard', themeClass, props.className)

	return <ZBox className={classes}>{props.children}</ZBox>
}
