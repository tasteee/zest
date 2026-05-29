export const examples = {
	quickPreview: `import { ButtonGroup, ButtonGroupSeparator } from '@tasteee/zest'
import { z } from '@tasteee/zest'

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <z.button>Bold</z.button>
      <ButtonGroupSeparator />
      <z.button>Italic</z.button>
      <ButtonGroupSeparator />
      <z.button>Underline</z.button>
    </ButtonGroup>
  )
}`,

	usageImport: `import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@tasteee/zest'`,

	usage: `<ButtonGroup>
  <z.button>Bold</z.button>
  <ButtonGroupSeparator />
  <z.button>Italic</z.button>
</ButtonGroup>`,

	horizontal: `<ButtonGroup>
  <z.button>Bold</z.button>
  <ButtonGroupSeparator />
  <z.button>Italic</z.button>
  <ButtonGroupSeparator />
  <z.button>Underline</z.button>
</ButtonGroup>`,

	vertical: `<ButtonGroup orientation="vertical">
  <z.button>Top</z.button>
  <z.button>Middle</z.button>
  <z.button>Bottom</z.button>
</ButtonGroup>`,

	withText: `<ButtonGroup>
  <z.button>Copy</z.button>
  <ButtonGroupText>or</ButtonGroupText>
  <z.button>Paste</z.button>
</ButtonGroup>`,

	withIcons: `import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

<ButtonGroup>
  <z.button>
    <Bold className="h-4 w-4" />
  </z.button>
  <ButtonGroupSeparator />
  <z.button>
    <Italic className="h-4 w-4" />
  </z.button>
  <ButtonGroupSeparator />
  <z.button>
    <Underline className="h-4 w-4" />
  </z.button>
</ButtonGroup>`,

	mixed: `<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <z.button>example.com</z.button>
  <ButtonGroupSeparator />
  <z.button>Copy</z.button>
</ButtonGroup>`
} as const
