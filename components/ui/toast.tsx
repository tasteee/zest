'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { X } from 'lucide-react'

import { prop } from '@/lib/prop'
import { cn } from '@/lib/utils'
import './toast.css'

const ToastProvider = ToastPrimitives.Provider

type ToastColorPropsT = 'isNeutral' | 'isPurple' | 'isPink' | 'isRed'
type ToastVariantT = 'default' | 'destructive'

type ToastOtherPropsT = {
	variant?: ToastVariantT | null
}

type ToastViewportPropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
type ToastRootPropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
type ToastActionPropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
type ToastClosePropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
type ToastTitlePropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
type ToastDescriptionPropsT = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>

type ToastPropsT = ToastRootPropsT & ZeroOrOneTruePropT<ToastColorPropsT> & ToastOtherPropsT
type ToastActionElementT = React.ReactElement<typeof ToastAction>

const TOAST_ROOT_CUSTOM_PROPS = ['isNeutral', 'isPurple', 'isPink', 'isRed', 'variant', 'className']
const TOAST_CLASS_NAME_PROPS = ['className']

const getColorClass = prop.classNameSwitch({
	isPurple: 'isPurple',
	isPink: 'isPink',
	isRed: 'isRed',
	isNeutral: 'isNeutral',
	default: 'isNeutral'
})

const getToastColorClass = (customProps: AnyObjectT): string => {
	const hasDestructiveVariant = customProps.variant === 'destructive'
	if (hasDestructiveVariant) return 'isRed'

	return getColorClass(customProps)
}

const getToastRootSplitProps = prop.splitter(TOAST_ROOT_CUSTOM_PROPS)
const getToastClassNameSplitProps = prop.splitter(TOAST_CLASS_NAME_PROPS)

const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Viewport>, ToastViewportPropsT>(
	(props, ref) => {
		const [customProps, otherProps] = getToastClassNameSplitProps(props)
		const classNames = cn('zToastViewport', customProps.className)

		return <ToastPrimitives.Viewport ref={ref} className={classNames} {...otherProps} />
	}
)
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastPropsT>((props, ref) => {
	const [customProps, otherProps] = getToastRootSplitProps(props)
	const colorClass = getToastColorClass(customProps)
	const classNames = cn('zToast', colorClass, customProps.className)

	return <ToastPrimitives.Root ref={ref} className={classNames} {...otherProps} />
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Action>, ToastActionPropsT>((props, ref) => {
	const [customProps, otherProps] = getToastClassNameSplitProps(props)
	const classNames = cn('zToastAction', customProps.className)
	const toastActionProps = otherProps as ToastActionPropsT

	return <ToastPrimitives.Action ref={ref} className={classNames} {...toastActionProps} />
})
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, ToastClosePropsT>((props, ref) => {
	const [customProps, otherProps] = getToastClassNameSplitProps(props)
	const classNames = cn('zToastClose', customProps.className)

	return (
		<ToastPrimitives.Close ref={ref} className={classNames} toast-close='' {...otherProps}>
			<X aria-hidden className='zToastCloseIcon' />
		</ToastPrimitives.Close>
	)
})
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Title>, ToastTitlePropsT>((props, ref) => {
	const [customProps, otherProps] = getToastClassNameSplitProps(props)
	const classNames = cn('zToastTitle', customProps.className)

	return <ToastPrimitives.Title ref={ref} className={classNames} {...otherProps} />
})
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Description>, ToastDescriptionPropsT>(
	(props, ref) => {
		const [customProps, otherProps] = getToastClassNameSplitProps(props)
		const classNames = cn('zToastDescription', customProps.className)

		return <ToastPrimitives.Description ref={ref} className={classNames} {...otherProps} />
	}
)
ToastDescription.displayName = ToastPrimitives.Description.displayName

// Compound component pattern
const ToastNamespace = Object.assign(Toast, {
	Provider: ToastProvider,
	Viewport: ToastViewport,
	Title: ToastTitle,
	Description: ToastDescription,
	Close: ToastClose,
	Action: ToastAction
})

// Export both namespace and individual components for flexibility
export {
	type ToastPropsT,
	type ToastActionElementT,
	type ToastColorPropsT,
	type ToastVariantT,
	ToastNamespace as Toast,
	ToastProvider,
	ToastViewport,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction
}
