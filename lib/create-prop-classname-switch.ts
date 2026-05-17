export const createPropClassNameSwitch = (map: Record<string, string>) => {
	const mapEntries = Object.entries(map)

	return (props: AnyObjectT, fallback: string = ''): string => {
		for (const [prop, className] of mapEntries) {
			if (props[prop as keyof AnyObjectT]) {
				return className
			}
		}

		return fallback
	}
}

// This is a more flexible version of createPropClassNameSwitch that allows for
// multiple class names to be returned based on the props. It will return a string of
// class names separated by spaces for all props that are true.
export const createPropsClassNamesBuilder = (map: Record<string, string>) => {
	const mapEntries = Object.entries(map)

	return (props: AnyObjectT, fallback: string = ''): string => {
		const classNames: string[] = []

		for (const [prop, className] of mapEntries) {
			if (props[prop as keyof AnyObjectT]) {
				classNames.push(className)
			}
		}

		return classNames.length > 0 ? classNames.join(' ') : fallback
	}
}
