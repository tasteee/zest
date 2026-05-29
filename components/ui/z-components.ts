import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { badge } from './badge'
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from './breadcrumb'
import { ZButton } from './button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Checkbox } from './checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from './command'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from './drawer'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'
import { Input } from './input'
import { Chip } from './chip'
import { CodeBlock } from './codeblock'
import { ColorPicker } from './color-picker'
import { Combobox } from './combobox'
import { Line } from './line'
import { Link } from './link'
import { DropdownMenu } from './dropdown-menu'
import { NavigationMenu } from './navigation-menu'
import { Pagination } from './pagination'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './popover'
import { Progress } from './progress'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { ScrollArea, ScrollBar } from './scroll-area'
import { select } from './select'
import { Sidebar } from './sidebar'
import { Skeleton } from './skeleton'
import { Slider } from './slider'
import { Switch } from './switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Textarea } from './textarea'
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast'
import { Toggle } from './z-toggle'
import { ToggleGroup, ToggleGroupItem } from './z-toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, ZTooltip as ZTooltipRoot } from './tooltip'
import { Spinner } from './spinner'
import { ZBox } from './z-box'
import { ZText } from './z-text'

export const ZAccordion = Accordion
export const ZAccordionItem = AccordionItem
export const ZAccordionTrigger = AccordionTrigger
export const ZAccordionContent = AccordionContent

export const ZAlert = Alert
export const ZAlertTitle = AlertTitle
export const ZAlertDescription = AlertDescription

export const ZAvatar = Avatar
export const ZAvatarImage = AvatarImage
export const ZAvatarFallback = AvatarFallback

export const ZBreadcrumbs = Breadcrumb
export const ZBreadcrumbList = BreadcrumbList
export const ZBreadcrumbItem = BreadcrumbItem
export const ZBreadcrumbLink = BreadcrumbLink
export const ZBreadcrumbPage = BreadcrumbPage
export const ZBreadcrumbSeparator = BreadcrumbSeparator
export const ZBreadcrumbEllipsis = BreadcrumbEllipsis

export const ZButtonGroup = ButtonGroup
export const ZButtonGroupText = ButtonGroupText
export const ZButtonGroupSeparator = ButtonGroupSeparator

export const ZCard = Card
export const ZCardHeader = CardHeader
export const ZCardTitle = CardTitle
export const ZCardDescription = CardDescription
export const ZCardAction = CardAction
export const ZCardContent = CardContent
export const ZCardFooter = CardFooter

export const ZCheckbox = Checkbox
export const ZCollapsible = Collapsible
export const ZCollapsibleTrigger = CollapsibleTrigger
export const ZCollapsibleContent = CollapsibleContent

export const ZCommand = Command
export const ZCommandDialog = CommandDialog
export const ZCommandInput = CommandInput
export const ZCommandList = CommandList
export const ZCommandEmpty = CommandEmpty
export const ZCommandGroup = CommandGroup
export const ZCommandItem = CommandItem
export const ZCommandShortcut = CommandShortcut
export const ZCommandSeparator = CommandSeparator

export const ZDialog = Dialog
export const ZDialogTrigger = DialogTrigger
export const ZDialogContent = DialogContent
export const ZDialogHeader = DialogHeader
export const ZDialogTitle = DialogTitle
export const ZDialogDescription = DialogDescription
export const ZDialogFooter = DialogFooter

export const ZDrawer = Drawer
export const ZDrawerTrigger = DrawerTrigger
export const ZDrawerContent = DrawerContent
export const ZDrawerHeader = DrawerHeader
export const ZDrawerTitle = DrawerTitle
export const ZDrawerDescription = DrawerDescription
export const ZDrawerFooter = DrawerFooter
export const ZDrawerClose = DrawerClose

export const ZEmptyState = Empty
export const ZEmptyStateHeader = EmptyHeader
export const ZEmptyStateTitle = EmptyTitle
export const ZEmptyStateDescription = EmptyDescription
export const ZEmptyStateContent = EmptyContent
export const ZEmptyStateMedia = EmptyMedia

export const ZInput = Input
export const ZChip = Chip
export const ZCodeBlock = CodeBlock
export const ZColorPicker = ColorPicker
export const ZCombobox = Combobox
export const ZLine = Line
export const ZLink = Link
export const ZMenu = DropdownMenu
export const ZNavMenu = NavigationMenu
export const ZPagination = Pagination

export const ZPopover = Popover
export const ZPopoverTrigger = PopoverTrigger
export const ZPopoverContent = PopoverContent
export const ZPopoverAnchor = PopoverAnchor

export const ZProgress = Progress
export const ZRadioGroup = RadioGroup
export const ZRadioGroupItem = RadioGroupItem

export const ZScrollArea = ScrollArea
export const ZScrollBar = ScrollBar
export const ZSidebar = Sidebar
export const ZSkeleton = Skeleton
export const ZSlider = Slider
export const ZSwitch = Switch

export const ZTabs = Tabs
export const ZTabsList = TabsList
export const ZTabsTrigger = TabsTrigger
export const ZTabsContent = TabsContent

export const ZTextarea = Textarea

export const ZToast = Toast
export const ZToastProvider = ToastProvider
export const ZToastViewport = ToastViewport
export const ZToastTitle = ToastTitle
export const ZToastDescription = ToastDescription
export const ZToastClose = ToastClose
export const ZToastAction = ToastAction

export const ZToggle = Toggle
export const ZToggleGroup = ToggleGroup
export const ZToggleGroupItem = ToggleGroupItem

export const ZTooltip = ZTooltipRoot
export const ZTooltipRootPrimitive = Tooltip
export const ZTooltipProvider = TooltipProvider
export const ZTooltipTrigger = TooltipTrigger
export const ZTooltipContent = TooltipContent

export const ZLoading = Spinner

export { ZBox, ZText }

export const z = {
	button: ZButton,
	accordion: ZAccordion,
	alert: ZAlert,
	avatar: ZAvatar,
	badge,
	breadcrumbs: ZBreadcrumbs,
	buttonGroup: ZButtonGroup,
	buttonGroupText: ZButtonGroupText,
	buttonGroupSeparator: ZButtonGroupSeparator,
	card: ZCard,
	cardHeader: ZCardHeader,
	cardTitle: ZCardTitle,
	cardDescription: ZCardDescription,
	cardAction: ZCardAction,
	cardContent: ZCardContent,
	cardFooter: ZCardFooter,
	checkbox: ZCheckbox,
	collapsible: ZCollapsible,
	collapsibleTrigger: ZCollapsibleTrigger,
	collapsibleContent: ZCollapsibleContent,
	command: ZCommand,
	commandDialog: ZCommandDialog,
	commandInput: ZCommandInput,
	commandList: ZCommandList,
	commandEmpty: ZCommandEmpty,
	commandGroup: ZCommandGroup,
	commandItem: ZCommandItem,
	commandShortcut: ZCommandShortcut,
	commandSeparator: ZCommandSeparator,
	dialog: ZDialog,
	dialogTrigger: ZDialogTrigger,
	dialogContent: ZDialogContent,
	dialogHeader: ZDialogHeader,
	dialogTitle: ZDialogTitle,
	dialogDescription: ZDialogDescription,
	dialogFooter: ZDialogFooter,
	drawer: ZDrawer,
	drawerTrigger: ZDrawerTrigger,
	drawerContent: ZDrawerContent,
	drawerHeader: ZDrawerHeader,
	drawerTitle: ZDrawerTitle,
	drawerDescription: ZDrawerDescription,
	drawerFooter: ZDrawerFooter,
	drawerClose: ZDrawerClose,
	emptyState: ZEmptyState,
	emptyStateHeader: ZEmptyStateHeader,
	emptyStateTitle: ZEmptyStateTitle,
	emptyStateDescription: ZEmptyStateDescription,
	emptyStateContent: ZEmptyStateContent,
	emptyStateMedia: ZEmptyStateMedia,

	input: ZInput,
	chip: ZChip,
	codeBlock: ZCodeBlock,
	codeblock: ZCodeBlock,
	colorPicker: ZColorPicker,
	combobox: ZCombobox,
	line: ZLine,
	link: ZLink,

	menu: ZMenu,
	navMenu: ZNavMenu,
	pagination: ZPagination,
	popover: ZPopover,
	popoverTrigger: ZPopoverTrigger,
	popoverContent: ZPopoverContent,

	popoverAnchor: ZPopoverAnchor,
	progress: ZProgress,
	radioGroup: ZRadioGroup,
	radioGroupItem: ZRadioGroupItem,
	select,
	scrollArea: ZScrollArea,
	scrollBar: ZScrollBar,

	sidebar: ZSidebar,

	skeleton: ZSkeleton,
	slider: ZSlider,
	switch: ZSwitch,
	tabs: ZTabs,
	tabsList: ZTabsList,
	tabsTrigger: ZTabsTrigger,
	tabsContent: ZTabsContent,
	textarea: ZTextarea,
	toast: ZToast,
	toastProvider: ZToastProvider,
	toastViewport: ZToastViewport,

	toastTitle: ZToastTitle,
	toastDescription: ZToastDescription,
	toastClose: ZToastClose,
	toastAction: ZToastAction,
	toggle: ZToggle,
	toggleGroup: ZToggleGroup,
	toggleGroupItem: ZToggleGroupItem,
	tooltip: ZTooltip,
	tooltipRoot: ZTooltipRootPrimitive,
	tooltipProvider: ZTooltipProvider,
	tooltipTrigger: ZTooltipTrigger,
	tooltipContent: ZTooltipContent,
	loading: ZLoading,
	box: ZBox,
	text: ZText
}
