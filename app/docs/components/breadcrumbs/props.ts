import { PropDefinition } from '@/components/docs/props-table'

export const breadcrumbLinkProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		description: 'The URL the link navigates to.'
	},
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Merge props onto the child element. Use with Next.js Link for client-side navigation.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the link.'
	}
]

export const breadcrumbPageProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The name of the current page. This item is not a link and is marked aria-current="page".'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]

export const breadcrumbSeparatorProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'Custom separator content. Defaults to a ChevronRight icon when omitted.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply.'
	}
]
