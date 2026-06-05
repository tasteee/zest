export const examples = {
	quickPreview: `import { ZBox } from '@tasteee/zest'

export function BoxDemo() {
  return (
    <ZBox
      isFlex
      isRow
      gap="1rem"
      padding="1.5rem"
      background="var(--color-surface)"
      borderRadius="var(--radius-md)"
    >
      <ZBox padding="0.5rem" background="var(--color-muted)" borderRadius="var(--radius-sm)">
        Item one
      </ZBox>
      <ZBox padding="0.5rem" background="var(--color-muted)" borderRadius="var(--radius-sm)">
        Item two
      </ZBox>
    </ZBox>
  )
}`,

	usageImport: `import { ZBox } from '@tasteee/zest'`,

	usage: `<ZBox padding="1rem" background="var(--color-surface)">
  Content
</ZBox>`,

	flex: `{/* Flex row with gap */}
<ZBox isFlex isRow gap="0.75rem" alignY="center">
  <ZBox>Left</ZBox>
  <ZBox>Right</ZBox>
</ZBox>

{/* Flex column centred */}
<ZBox isFlex isColumn alignX="center" gap="0.5rem">
  <ZBox>Top</ZBox>
  <ZBox>Bottom</ZBox>
</ZBox>`,

	spacing: `{/* Explicit padding */}
<ZBox padding="2rem">All sides</ZBox>
<ZBox paddingX="1.5rem" paddingY="0.75rem">Horizontal and vertical</ZBox>
<ZBox paddingTop="1rem" paddingBottom="1rem">Top and bottom only</ZBox>

{/* Margin */}
<ZBox marginX="auto">Centred with auto margins</ZBox>`,

	typography: `{/* Text styling */}
<ZBox
  fontSize="1.25rem"
  fontWeight="600"
  color="var(--color-text-primary)"
  lineHeight="1.5"
>
  Styled text inside a Box
</ZBox>`,

	asElement: `{/* Render as any HTML element */}
<ZBox as="section" padding="1.5rem">
  <ZBox as="h2" fontSize="1.5rem" fontWeight="700">Heading</ZBox>
  <ZBox as="p" color="var(--color-text-muted)">Paragraph content here.</ZBox>
</ZBox>`
} as const
