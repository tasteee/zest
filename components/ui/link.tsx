import * as React from 'react'
import { cn } from '@/lib/utils'
import './link.css'

type LinkPropsT = React.ComponentProps<'a'>

const Link = (props: LinkPropsT) => {
	return <a data-slot='link' className={cn('link', props.className)} {...props} />
}

export { Link }
