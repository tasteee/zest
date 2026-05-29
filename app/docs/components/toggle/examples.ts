export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function ToggleDemo() {
  return <z.toggle>Press me</z.toggle>
}`,
	kinds: `<z.toggle isGhost>Ghost</z.toggle>
<z.toggle isOutlined>Outlined</z.toggle>`,
	colors: `{/* Ghost */}
<z.toggle isGhost isWhite>White</z.toggle>
<z.toggle isGhost isGreen>Green</z.toggle>
<z.toggle isGhost isPurple>Purple</z.toggle>
<z.toggle isGhost isPink>Pink</z.toggle>
<z.toggle isGhost isOrange>Orange</z.toggle>

{/* Outlined */}
<z.toggle isOutlined isWhite>White</z.toggle>
<z.toggle isOutlined isGreen>Green</z.toggle>
<z.toggle isOutlined isPurple>Purple</z.toggle>
<z.toggle isOutlined isPink>Pink</z.toggle>
<z.toggle isOutlined isOrange>Orange</z.toggle>`,
	sizes: `<z.toggle isSmall>Small</z.toggle>
<z.toggle isMedium>Medium</z.toggle>
<z.toggle isLarge>Large</z.toggle>`,
	withIcons: `import { Bold, Italic, Underline } from 'lucide-react'

<z.toggle aria-label="Bold">
  <Bold className="h-4 w-4" />
</z.toggle>
<z.toggle aria-label="Italic">
  <Italic className="h-4 w-4" />
</z.toggle>
<z.toggle aria-label="Underline">
  <Underline className="h-4 w-4" />
</z.toggle>`,
	disabled: `<z.toggle isDisabled>Disabled Ghost</z.toggle>
<z.toggle isOutlined isDisabled>Disabled Outlined</z.toggle>
<z.toggle isGreen isDisabled>Disabled Green</z.toggle>`,
	singleSelection: `import { z } from '@tasteee/zest'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

const [alignment, setAlignment] = useState('left')

<z.toggleGroup
  type="single"
  value={alignment}
  onValueChange={(value) => { if (value) setAlignment(value) }}
  isOutlined
>
  <z.toggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="justify" aria-label="Justify">
    <AlignJustify className="h-4 w-4" />
  </z.toggleGroupItem>
</z.toggleGroup>`,
	multipleSelection: `import { z } from '@tasteee/zest'
import { Bold, Italic, Underline } from 'lucide-react'

const [formatting, setFormatting] = useState<string[]>([])

<z.toggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  isOutlined
  isGreen
>
  <z.toggleGroupItem value="bold" aria-label="Bold">
    <Bold className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="italic" aria-label="Italic">
    <Italic className="h-4 w-4" />
  </z.toggleGroupItem>
  <z.toggleGroupItem value="underline" aria-label="Underline">
    <Underline className="h-4 w-4" />
  </z.toggleGroupItem>
</z.toggleGroup>`,
	groupColorVariants: `<z.toggleGroup type="single" isOutlined isGreen>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>

<z.toggleGroup type="single" isOutlined isPurple>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>

<z.toggleGroup type="single" isOutlined isPink>
  <z.toggleGroupItem value="a">One</z.toggleGroupItem>
  <z.toggleGroupItem value="b">Two</z.toggleGroupItem>
  <z.toggleGroupItem value="c">Three</z.toggleGroupItem>
</z.toggleGroup>`
} as const
