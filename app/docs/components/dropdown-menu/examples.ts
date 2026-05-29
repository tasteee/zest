export const examples = {
	quickPreview: `import {
  ZDropdownMenu,
  ZDropdownMenuContent,
  ZDropdownMenuItem,
  ZDropdownMenuLabel,
  ZDropdownMenuSeparator,
  ZDropdownMenuTrigger,
  z,
} from '@tasteee/zest'
import { User, CreditCard, Settings, LogOut } from 'lucide-react'

export function DropdownMenuDemo() {
  return (
    <ZDropdownMenu>
      <ZDropdownMenuTrigger asChild>
        <z.button>Open Menu</z.button>
      </ZDropdownMenuTrigger>
      <ZDropdownMenuContent className="w-56">
        <ZDropdownMenuLabel>My Account</ZDropdownMenuLabel>
        <ZDropdownMenuSeparator />
        <ZDropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </ZDropdownMenuItem>
        <ZDropdownMenuSeparator />
        <ZDropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </ZDropdownMenuItem>
      </ZDropdownMenuContent>
    </ZDropdownMenu>
  )
}`,

	usageImport: `import {
  ZDropdownMenu,
  ZDropdownMenuContent,
  ZDropdownMenuItem,
  ZDropdownMenuLabel,
  ZDropdownMenuSeparator,
  ZDropdownMenuTrigger,
} from '@tasteee/zest'`,

	usage: `<ZDropdownMenu>
  <ZDropdownMenuTrigger>Open</ZDropdownMenuTrigger>
  <ZDropdownMenuContent>
    <ZDropdownMenuLabel>My Account</ZDropdownMenuLabel>
    <ZDropdownMenuSeparator />
    <ZDropdownMenuItem>Profile</ZDropdownMenuItem>
    <ZDropdownMenuItem>Billing</ZDropdownMenuItem>
    <ZDropdownMenuItem>Settings</ZDropdownMenuItem>
  </ZDropdownMenuContent>
</ZDropdownMenu>`,

	withShortcuts: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Edit</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>
      <Copy className="mr-2 h-4 w-4" />
      <span>Copy</span>
      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Pencil className="mr-2 h-4 w-4" />
      <span>Edit</span>
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <Trash className="mr-2 h-4 w-4" />
      <span>Delete</span>
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,

	checkboxItems: `const [showStatusBar, setShowStatusBar] = useState(true)
const [showActivityBar, setShowActivityBar] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivityBar}
      onCheckedChange={setShowActivityBar}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,

	radioItems: `const [position, setPosition] = useState("bottom")

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,

	iconTrigger: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Open menu</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
} as const
