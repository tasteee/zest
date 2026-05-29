export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function TooltipDemo() {
  return (
    <z.tooltip tip="Add to library">
      <z.button>Hover me</z.button>
    </z.tooltip>
  )
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.tooltip tip="Tooltip content">
  <z.button>Hover</z.button>
</z.tooltip>`,

	positions: `<div className="flex gap-4">
  <z.tooltip tip="Tooltip on top" side="top">
    <z.button>Top</z.button>
  </z.tooltip>
  <z.tooltip tip="Tooltip on right" side="right">
    <z.button>Right</z.button>
  </z.tooltip>
  <z.tooltip tip="Tooltip on bottom" side="bottom">
    <z.button>Bottom</z.button>
  </z.tooltip>
  <z.tooltip tip="Tooltip on left" side="left">
    <z.button>Left</z.button>
  </z.tooltip>
</div>`,

	iconButton: `<z.tooltip tip="Add item">
  <z.button isIcon>
    <Plus className="h-4 w-4" />
    <span className="sr-only">Add item</span>
  </z.button>
</z.tooltip>`,

	helpIcon: `<div className="flex items-center gap-2">
  <span className="text-sm font-medium">Password</span>
  <z.tooltip tip="Password must be at least 8 characters">
    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
  </z.tooltip>
</div>`,

	longerContent: `<z.tooltip
  tip={
    <p>
      This is a longer tooltip that provides more detailed information
      about the feature. It can wrap to multiple lines.
    </p>
  }
>
  <z.button>
    <Info className="mr-2 h-4 w-4" />
    More info
  </z.button>
</z.tooltip>`
} as const
