import { camelize } from '@app/docs/frameworks/convert-react'
import { useFramework } from '@app/docs/frameworks/framework-storage'

// An attribute name inside a hand-written markup caption. React takes the
// camelCase property (`aligns-x` → `alignsX`); every other framework writes
// the HTML attribute as-is.

type CaptionAttributePropsT = { name: string }

export const CaptionAttribute = (props: CaptionAttributePropsT) => {
	const framework = useFramework()
	const isReact = framework === 'react'
	const displayName = isReact ? camelize(props.name) : props.name
	return <b>{displayName}</b>
}
