import { PropDefinition } from '@/components/docs/props-table'

export const sidebarProviderProps: PropDefinition[] = [
	{
		name: 'defaultOpen',
		type: 'boolean',
		defaultValue: 'true',
		description: 'Initial open state in uncontrolled mode.'
	},
	{
		name: 'open',
		type: 'boolean',
		description: 'Controlled open state. Pair with onOpenChange.'
	},
	{
		name: 'onOpenChange',
		type: '(open: boolean) => void',
		description: 'Callback fired when the sidebar open state changes.'
	},
	{
		name: 'style',
		type: 'React.CSSProperties',
		description: 'Pass --sidebar-width CSS variable here to override the default sidebar width.'
	}
]

export const sidebarProps: PropDefinition[] = [
	{
		name: 'side',
		type: '"left" | "right"',
		defaultValue: '"left"',
		description: 'Which edge the sidebar anchors to.'
	},
	{
		name: 'variant',
		type: '"sidebar" | "floating" | "inset"',
		defaultValue: '"sidebar"',
		description: 'Visual treatment of the sidebar panel.'
	},
	{
		name: 'collapsible',
		type: '"offcanvas" | "icon" | "none"',
		defaultValue: '"offcanvas"',
		description: 'How the sidebar collapses. "icon" keeps an icon rail visible.'
	}
]

export const sidebarMenuButtonProps: PropDefinition[] = [
	{
		name: 'asChild',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Renders the button behaviour onto the child element (e.g. an anchor).'
	},
	{
		name: 'isActive',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Marks the menu item as the currently active route.'
	},
	{
		name: 'size',
		type: '"default" | "sm" | "lg"',
		defaultValue: '"default"',
		description: 'Size variant of the menu button.'
	},
	{
		name: 'tooltip',
		type: 'string | TooltipContentProps',
		description: 'Tooltip shown when the sidebar is collapsed to icon mode.'
	}
]

export const useSidebarReturn: PropDefinition[] = [
	{
		name: 'state',
		type: '"expanded" | "collapsed"',
		description: 'Current sidebar state.'
	},
	{
		name: 'open',
		type: 'boolean',
		description: 'Whether the sidebar is open (desktop).'
	},
	{
		name: 'setOpen',
		type: '(open: boolean) => void',
		description: 'Programmatically set the open state.'
	},
	{
		name: 'openMobile',
		type: 'boolean',
		description: 'Whether the mobile drawer is open.'
	},
	{
		name: 'setOpenMobile',
		type: '(open: boolean) => void',
		description: 'Programmatically set the mobile drawer state.'
	},
	{
		name: 'isMobile',
		type: 'boolean',
		description: 'True when the viewport is below the mobile breakpoint.'
	},
	{
		name: 'toggleSidebar',
		type: '() => void',
		description: 'Toggles the sidebar open/closed on the current breakpoint.'
	}
]
