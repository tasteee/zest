type AnyObjectT = Record<string, any>

type ComponentPropsT = {
	children?: React.ReactNode | string
	className?: string
	style?: React.CSSProperties
	testId?: string
	as?: React.ElementType
}
