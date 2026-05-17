type ComponentPropsT = React.HTMLAttributes<HTMLElement> & {
	as?: React.ElementType
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
	asChild?: boolean
}
