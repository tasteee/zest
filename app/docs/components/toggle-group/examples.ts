export const examples = {
	quickPreview: `import { ToggleGroup, ToggleGroupItem } from '@tasteee/zest'
import { Bold, Italic, Underline } from 'lucide-react'

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`,

	usageImport: `import { ToggleGroup, ToggleGroupItem } from '@tasteee/zest'`,

	usage: `<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,

	singleSelect: `<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,

	multiSelect: `import { Bold, Italic, Underline } from 'lucide-react'

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,

	colors: `<div className="flex flex-col gap-4">
  <ToggleGroup type="single" defaultValue="a" isNeutral>
    <ToggleGroupItem value="a">Neutral</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" defaultValue="a" isPurple>
    <ToggleGroupItem value="a">Purple</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" defaultValue="a" isPink>
    <ToggleGroupItem value="a">Pink</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
</div>`,

	kinds: `<div className="flex flex-col gap-4">
  <ToggleGroup type="single" defaultValue="a" isGhost>
    <ToggleGroupItem value="a">Ghost A</ToggleGroupItem>
    <ToggleGroupItem value="b">Ghost B</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" defaultValue="a" isOutlined>
    <ToggleGroupItem value="a">Outlined A</ToggleGroupItem>
    <ToggleGroupItem value="b">Outlined B</ToggleGroupItem>
  </ToggleGroup>
</div>`,

	sizes: `<div className="flex flex-col gap-4">
  <ToggleGroup type="single" defaultValue="a" isSmall>
    <ToggleGroupItem value="a">Small</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" defaultValue="a" isMedium>
    <ToggleGroupItem value="a">Medium</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" defaultValue="a" isLarge>
    <ToggleGroupItem value="a">Large</ToggleGroupItem>
    <ToggleGroupItem value="b">Option B</ToggleGroupItem>
  </ToggleGroup>
</div>`,

	controlled: `import { useState } from 'react'

const [alignment, setAlignment] = useState('left')

<ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`
} as const
