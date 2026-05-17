'use client'

import { Line, type LineProps } from './line'

function Separator(props: LineProps) {
	return <Line data-slot='separator' {...props} />
}

export { Separator }
