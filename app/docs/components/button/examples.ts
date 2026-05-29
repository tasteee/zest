export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function ButtonDemo() {
  return <z.button>Click me</z.button>
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.button>Click me</z.button>`,

	kinds: `import { z } from '@tasteee/zest'

<div className="flex flex-wrap gap-4">
  <z.button isOutlined>Outlined</z.button>
  <z.button>Solid</z.button>
  <z.button>Ghost</z.button>
</div>`,

	colors: `import { z } from '@tasteee/zest'

{/* Purple */}
<z.button isPurple isOutlined>Purple Outlined</z.button>
<z.button isPurple isSolid>Purple Solid</z.button>
<z.button isPurple isGhost>Purple Ghost</z.button>

{/* Purple */}
<z.button isPurple isOutlined>Purple Outlined</z.button>
<z.button isPurple isSolid>Purple Solid</z.button>
<z.button isPurple isGhost>Purple Ghost</z.button>

{/* Pink */}
<z.button isPink isOutlined>Pink Outlined</z.button>
<z.button isPink isSolid>Pink Solid</z.button>
<z.button isPink isGhost>Pink Ghost</z.button>

{/* Pink */}
<z.button isPink isOutlined>Pink Outlined</z.button>
<z.button isPink isSolid>Pink Solid</z.button>
<z.button isPink isGhost>Pink Ghost</z.button>

{/* Neutral */}
<z.button isNeutral isOutlined>Neutral Outlined</z.button>
<z.button isNeutral isSolid>Neutral Solid</z.button>
<z.button isNeutral isGhost>Neutral Ghost</z.button>`,

	sizes: `import { z } from '@tasteee/zest'
import { Plus } from 'lucide-react'

<div className="flex items-center gap-4">
  <z.button isSmall>Small</z.button>
  <z.button isMedium>Default</z.button>
  <z.button isLarge>Large</z.button>
  <z.button isIcon>
    <Plus className="h-4 w-4" />
  </z.button>
</div>`,

	withIcons: `import { z } from '@tasteee/zest'
import { Mail, Download, ExternalLink } from 'lucide-react'

<div className="flex flex-wrap gap-4">
  <z.button>
    <Mail className="mr-2 h-4 w-4" />
    Login with Email
  </z.button>
  <z.button>
    Download
    <Download className="ml-2 h-4 w-4" />
  </z.button>
  <z.button>
    <ExternalLink className="mr-2 h-4 w-4" />
    Open Link
  </z.button>
</div>`,

	loadingState: `import { z } from '@tasteee/zest'
import { Loader2 } from 'lucide-react'

<z.button disabled={isLoading} onClick={handleLoadingClick}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </>
  ) : (
    "Click me"
  )}
</z.button>`,

	disabled: `import { z } from '@tasteee/zest'

<div className="flex gap-4">
  <z.button disabled>Disabled</z.button>
  <z.button disabled>Disabled Outline</z.button>
  <z.button disabled>Disabled Secondary</z.button>
</div>`,

	asChild: `import { z } from '@tasteee/zest'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

<z.button asChild>
  <Link href="/docs">
    Go to Docs
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
</z.button>`,

	iconButtons: `import { z } from '@tasteee/zest'
import { Check, X, Plus } from 'lucide-react'

<div className="flex gap-2">
  <z.button isIcon>
    <Check className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <X className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <Plus className="h-4 w-4" />
  </z.button>
  <z.button isIcon>
    <X className="h-4 w-4" />
  </z.button>
</div>`
} as const
