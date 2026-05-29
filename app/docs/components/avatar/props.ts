import { PropDefinition } from '@/components/docs/props-table'

export const avatarProps: PropDefinition[] = [
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the avatar container.'
	}
]

export const avatarImageProps: PropDefinition[] = [
	{
		name: 'src',
		type: 'string',
		description: 'The URL of the image to display.',
		required: true
	},
	{
		name: 'alt',
		type: 'string',
		description: 'Alternative text for the image.',
		required: true
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the image.'
	}
]

export const avatarFallbackProps: PropDefinition[] = [
	{
		name: 'delayMs',
		type: 'number',
		description: 'How long to wait before showing the fallback.'
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the fallback.'
	}
]
