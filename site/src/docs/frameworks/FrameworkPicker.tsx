import {
	FRAMEWORK_OPTIONS,
	checkIsFramework,
	useFramework,
	writeStoredFramework,
	type FrameworkT
} from '@app/docs/frameworks/framework-storage'

// Two ways to pick the reader's framework. Both write the same stored
// preference, so every code view on the page follows either one.

type SelectChangeEventT = CustomEvent<{ value: string; path: string[] }>

type FrameworkSelectPropsT = {
	size?: 'sm' | 'md'
	className?: string
}

const handleSelectChange = (event: SelectChangeEventT) => {
	const nextFramework = event.detail.value
	const isKnownFramework = checkIsFramework(nextFramework)
	if (!isKnownFramework) return
	writeStoredFramework(nextFramework)
}

/** A compact dropdown, for toolbars and the settings panel. */
export const FrameworkSelect = (props: FrameworkSelectPropsT) => {
	const framework = useFramework()

	return (
		<z-select
			className={props.className}
			size={props.size}
			value={framework}
			options={FRAMEWORK_OPTIONS}
			aria-label="Framework for code examples"
			onchange={handleSelectChange}
		/>
	)
}

type FrameworkChoicePropsT = {
	option: (typeof FRAMEWORK_OPTIONS)[number]
	activeFramework: FrameworkT
}

const FrameworkChoice = (props: FrameworkChoicePropsT) => {
	const isActive = props.option.value === props.activeFramework
	const handleClick = () => writeStoredFramework(props.option.value)

	return (
		<button type="button" aria-pressed={isActive} onClick={handleClick}>
			{props.option.label}
		</button>
	)
}

/** Every framework side by side, for pages where the choice should be seen. */
export const FrameworkSegments = () => {
	const framework = useFramework()

	const choices = FRAMEWORK_OPTIONS.map((option) => (
		<FrameworkChoice key={option.value} option={option} activeFramework={framework} />
	))

	return (
		<div className="Example-switch FrameworkSegments" role="group" aria-label="Framework for code examples">
			{choices}
		</div>
	)
}
