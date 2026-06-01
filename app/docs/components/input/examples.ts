export const examples = {
	quickPreview: `import { ZInput } from '@tasteee/zest'

export function InputDemo() {
  return <ZInput placeholder="Enter your email" />
}`,

	usageImport: `import { ZInput } from '@tasteee/zest'`,

	usage: `<ZInput type="email" placeholder="Email" />`,

	withLabel: `import { ZInput, ZLabel } from '@tasteee/zest'

<div className="grid w-full max-w-sm gap-1.5">
  <ZLabel htmlFor="email">Email</ZLabel>
  <ZInput type="email" id="email" placeholder="Enter your email" />
</div>`,

	inputTypes: `import { ZInput } from '@tasteee/zest'

<div className="grid gap-4 max-w-sm">
  <ZInput type="text" placeholder="Text input" />
  <ZInput type="email" placeholder="Email input" />
  <ZInput type="number" placeholder="Number input" />
  <ZInput type="search" placeholder="Search input" />
  <ZInput type="tel" placeholder="Phone input" />
  <ZInput type="url" placeholder="URL input" />
</div>`,

	sizes: `import { ZInput } from '@tasteee/zest'

<div className="grid gap-4 max-w-sm">
  <ZInput isExtraSmall placeholder="Extra small input" />
  <ZInput isSmall placeholder="Small input" />
  <ZInput isMedium placeholder="Medium input" />
  <ZInput isLarge placeholder="Large input" />
  <ZInput isExtraLarge placeholder="Extra large input" />
</div>`,

	withIcon: `import { ZInput } from '@tasteee/zest'
import { Search } from 'lucide-react'

<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <ZInput placeholder="Search..." className="pl-10" />
</div>`,

	passwordToggle: `import { ZInput, z } from '@tasteee/zest'
import { Lock, Eye, EyeOff } from 'lucide-react'

const [showPassword, setShowPassword] = useState(false)

<div className="relative max-w-sm">
  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <ZInput 
    type={showPassword ? "text" : "password"} 
    placeholder="Enter password" 
    className="pl-10 pr-10" 
  />
  <z.button type="button" isIcon className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </z.button>
</div>`,

	withButton: `import { ZInput, z.button } from '@tasteee/zest'

<div className="flex max-w-sm gap-2">
  <ZInput type="email" placeholder="Enter your email" />
  <z.button type="submit">Subscribe</z.button>
</div>`,

	disabled: `import { ZInput } from '@tasteee/zest'

<ZInput disabled placeholder="Disabled input" />`,

	fileInput: `import { ZInput, ZLabel } from '@tasteee/zest'

<div className="grid w-full max-w-sm gap-1.5">
  <ZLabel htmlFor="file">Upload file</ZLabel>
  <ZInput id="file" type="file" />
</div>`
} as const
