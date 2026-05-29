import { PropDefinition } from '@/components/docs/props-table'

export const paginationLinkProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		description: 'The URL the page link navigates to.'
	},
	{
		name: 'isActive',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, styles the link as the current page and sets aria-current="page".'
	},
	{
		name: 'isIcon',
		type: 'boolean',
		defaultValue: 'true',
		description: 'When true, sizes the link as an icon button. Used by PaginationPrevious and PaginationNext internally.'
	},
	{
		name: 'isMedium',
		type: 'boolean',
		defaultValue: 'false',
		description: 'When true, applies medium sizing to the link.'
	},
	{
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLAnchorElement>',
		description: 'Callback fired when the link is clicked. Useful for controlled pagination without page navigation.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes.'
	}
]

export const paginationPreviousNextProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		description: 'The URL to navigate to.'
	},
	{
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLAnchorElement>',
		description: 'Callback for controlled navigation. Call event.preventDefault() to suppress href navigation.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes.'
	}
]
