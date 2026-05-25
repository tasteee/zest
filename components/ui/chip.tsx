import * as React from 'react'
import { cn } from '@/lib/utils'
import './chip.css'

type ChipPropsT = React.ComponentProps<'button'> & {
	isSelected?: boolean
}

const Chip = (props: ChipPropsT) => {
	const chipProps: Record<string, unknown> = { ...props }
	const isSelected = props.isSelected === true
	const isDisabled = props.disabled === true
	const hasType = props.type != null

	if (!hasType) {
		chipProps.type = 'button'
	}

	delete chipProps.className
	delete chipProps.isSelected

	const classNames = cn('chip', isSelected && 'isSelected', isDisabled && 'isDisabled', props.className)

	return <button data-slot='chip' className={classNames} {...(chipProps as React.ComponentProps<'button'>)} />
}

export { Chip }
export type { ChipPropsT }
