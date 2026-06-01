export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function BoxDemo() {
  return (
    <z.box
      isFlex
      isRow
      gap="1rem"
      padding="1.5rem"
      background="var(--color-surface)"
      borderRadius="var(--radius-md)"
    >
      <z.box padding="0.5rem" background="var(--color-muted)" borderRadius="var(--radius-sm)">
        Item one
      </z.box>
      <z.box padding="0.5rem" background="var(--color-muted)" borderRadius="var(--radius-sm)">
        Item two
      </z.box>
    </z.box>
  )
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.box padding="1rem" background="var(--color-surface)">
  Content
</z.box>`,

	flex: `{/* Flex row with gap */}
<z.box isFlex isRow gap="0.75rem" alignY="center">
  <z.box>Left</z.box>
  <z.box>Right</z.box>
</z.box>

{/* Flex column centred */}
<z.box isFlex isColumn alignX="center" gap="0.5rem">
  <z.box>Top</z.box>
  <z.box>Bottom</z.box>
</z.box>`,

	spacing: `{/* Explicit padding */}
<z.box padding="2rem">All sides</z.box>
<z.box paddingX="1.5rem" paddingY="0.75rem">Horizontal and vertical</z.box>
<z.box paddingTop="1rem" paddingBottom="1rem">Top and bottom only</z.box>

{/* Margin */}
<z.box marginX="auto">Centred with auto margins</z.box>`,

	typography: `{/* Text styling */}
<z.box
  fontSize="1.25rem"
  fontWeight="600"
  color="var(--color-text-primary)"
  lineHeight="1.5"
>
  Styled text inside a Box
</z.box>`,

	asElement: `{/* Render as any HTML element */}
<z.box as="section" padding="1.5rem">
  <z.box as="h2" fontSize="1.5rem" fontWeight="700">Heading</z.box>
  <z.box as="p" color="var(--color-text-muted)">Paragraph content here.</z.box>
</z.box>`
} as const
