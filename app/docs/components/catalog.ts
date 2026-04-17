export type ComponentStatus = "ready" | "in-progress" | "planned"

export type ComponentCatalogEntry = {
  slug: string
  name: string
  zName: string
  category: "Inputs" | "Data Display" | "Navigation" | "Overlays" | "Feedback" | "Layout"
  description: string
  status: ComponentStatus
  foundation: "radix" | "native" | "custom"
  notes?: string
}

export const COMPONENT_CATALOG: ComponentCatalogEntry[] = [
  { slug: "accordion", name: "Accordion", zName: "ZAccordion", category: "Layout", description: "Expandable sections for dense content.", status: "ready", foundation: "radix" },
  { slug: "alert", name: "Alert", zName: "ZAlert", category: "Feedback", description: "Contextual messages for status and guidance.", status: "ready", foundation: "radix" },
  { slug: "avatar", name: "Avatar", zName: "ZAvatar", category: "Data Display", description: "User or entity identity tokens.", status: "ready", foundation: "radix" },
  { slug: "badge", name: "Badge", zName: "ZBadge", category: "Data Display", description: "Compact label for state or metadata.", status: "ready", foundation: "custom" },
  { slug: "box", name: "Box", zName: "ZBox", category: "Layout", description: "Primitive layout surface for composition.", status: "ready", foundation: "custom", notes: "Completed and considered stable." },
  { slug: "breadcrumbs", name: "Breadcrumbs", zName: "ZBreadcrumbs", category: "Navigation", description: "Hierarchical path navigation.", status: "ready", foundation: "custom" },
  { slug: "button", name: "Button", zName: "ZButton", category: "Inputs", description: "Primary action trigger across UI contexts.", status: "ready", foundation: "custom" },
  { slug: "button-group", name: "Button Group", zName: "ZButtonGroup", category: "Inputs", description: "Grouped action controls with shared shape.", status: "ready", foundation: "custom" },
  { slug: "card", name: "Card", zName: "ZCard", category: "Data Display", description: "Elevated content container with expressive tone.", status: "in-progress", foundation: "custom", notes: "Color strategy aligned to premium accent tones." },
  { slug: "checkbox", name: "Checkbox", zName: "ZCheckbox", category: "Inputs", description: "Boolean or multi-select control.", status: "ready", foundation: "radix" },
  { slug: "chip", name: "Chip", zName: "ZChip", category: "Data Display", description: "Interactive compact token for filters/selections.", status: "planned", foundation: "custom" },
  { slug: "codeblock", name: "Code Block", zName: "ZCodeBlock", category: "Data Display", description: "Syntax highlighted code presentation.", status: "in-progress", foundation: "custom" },
  { slug: "collapsible", name: "Collapsible", zName: "ZCollapsible", category: "Layout", description: "Toggleable content regions with smooth motion.", status: "ready", foundation: "radix" },
  { slug: "color-picker", name: "Color Picker", zName: "ZColorPicker", category: "Inputs", description: "Precise color selection for theme tooling.", status: "planned", foundation: "custom" },
  { slug: "combobox", name: "Combobox", zName: "ZCombobox", category: "Inputs", description: "Searchable select input with suggestions.", status: "in-progress", foundation: "custom" },
  { slug: "command", name: "Command", zName: "ZCommand", category: "Navigation", description: "Power-user command palette interactions.", status: "ready", foundation: "custom" },
  { slug: "dialog", name: "Dialog", zName: "ZDialog", category: "Overlays", description: "Modal interactions requiring focused attention.", status: "ready", foundation: "radix" },
  { slug: "drawer", name: "Drawer", zName: "ZDrawer", category: "Overlays", description: "Edge-attached overlay for supplemental workflows.", status: "ready", foundation: "custom" },
  { slug: "empty-state", name: "Empty State", zName: "ZEmptyState", category: "Feedback", description: "Guided zero-data and onboarding experiences.", status: "ready", foundation: "custom" },
  { slug: "input", name: "Input", zName: "ZInput", category: "Inputs", description: "Single-line text and structured data entry.", status: "ready", foundation: "custom" },
  { slug: "link", name: "Link", zName: "ZLink", category: "Navigation", description: "Navigational text with semantic affordance.", status: "planned", foundation: "native" },
  { slug: "loading", name: "Loading", zName: "ZLoading", category: "Feedback", description: "Asynchronous activity indicators and states.", status: "ready", foundation: "custom" },
  { slug: "menu", name: "Menu", zName: "ZMenu", category: "Navigation", description: "Contextual command menus and action lists.", status: "ready", foundation: "radix" },
  { slug: "nav-menu", name: "Nav Menu", zName: "ZNavMenu", category: "Navigation", description: "Structured multi-level primary navigation.", status: "ready", foundation: "radix" },
  { slug: "pagination", name: "Pagination", zName: "ZPagination", category: "Navigation", description: "Paged content navigation with clarity.", status: "ready", foundation: "custom" },
  { slug: "popover", name: "Popover", zName: "ZPopover", category: "Overlays", description: "Anchored floating panels for supportive actions.", status: "ready", foundation: "radix" },
  { slug: "progress", name: "Progress", zName: "ZProgress", category: "Feedback", description: "Task progression and completion indicators.", status: "ready", foundation: "radix" },
  { slug: "radio-group", name: "Radio Group", zName: "ZRadioGroup", category: "Inputs", description: "Single-choice selection from options.", status: "ready", foundation: "radix" },
  { slug: "select", name: "Select", zName: "ZSelect", category: "Inputs", description: "Curated selection list with keyboard support.", status: "ready", foundation: "radix" },
  { slug: "scroll-area", name: "Scroll Area", zName: "ZScrollArea", category: "Layout", description: "Enhanced custom scrolling containers.", status: "ready", foundation: "radix" },
  { slug: "sidebar", name: "Sidebar", zName: "ZSidebar", category: "Layout", description: "Persistent contextual navigation region.", status: "ready", foundation: "custom" },
  { slug: "skeleton", name: "Skeleton", zName: "ZSkeleton", category: "Feedback", description: "Content-loading placeholders.", status: "ready", foundation: "custom" },
  { slug: "slider", name: "Slider", zName: "ZSlider", category: "Inputs", description: "Continuous value input via drag gestures.", status: "ready", foundation: "radix" },
  { slug: "switch", name: "Switch", zName: "ZSwitch", category: "Inputs", description: "Binary toggle with immediate feedback.", status: "ready", foundation: "radix" },
  { slug: "tabs", name: "Tabs", zName: "ZTabs", category: "Navigation", description: "Segmented content views within one region.", status: "ready", foundation: "radix" },
  { slug: "text", name: "Text", zName: "ZText", category: "Data Display", description: "Semantic typography primitives.", status: "in-progress", foundation: "custom" },
  { slug: "textarea", name: "Textarea", zName: "ZTextarea", category: "Inputs", description: "Multi-line text entry.", status: "ready", foundation: "custom" },
  { slug: "toast", name: "Toast", zName: "ZToast", category: "Feedback", description: "Ephemeral non-blocking notifications.", status: "ready", foundation: "radix" },
  { slug: "toggle-group", name: "Toggle Group", zName: "ZToggleGroup", category: "Inputs", description: "Grouped on/off option controls.", status: "ready", foundation: "radix" },
  { slug: "tooltip", name: "Tooltip", zName: "ZTooltip", category: "Feedback", description: "Assistive hover/focus hints.", status: "ready", foundation: "radix" },
]

export const CATALOG_BY_SLUG = new Map(COMPONENT_CATALOG.map((entry) => [entry.slug, entry]))