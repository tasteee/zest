export const examples = {
	quickPreview: `import { ZText } from '@tasteee/zest'

export function TextDemo() {
  return (
    <div className="flex flex-col gap-3">
      <ZText.display>Display heading</ZText.display>
      <ZText.h1>Heading one</ZText.h1>
      <ZText.body>Body text for readable content.</ZText.body>
    </div>
  )
}`,

	usageImport: `import { ZText } from '@tasteee/zest'`,

	usage: `<ZText>Plain body text</ZText>
<ZText.h1>Heading</ZText.h1>
<ZText.body>Body paragraph</ZText.body>`,

	typographyScale: `<div className="flex flex-col gap-4">
  <ZText.display>Display — design language speaks in systems</ZText.display>
  <ZText.h1>Heading One</ZText.h1>
  <ZText.h2>Heading Two</ZText.h2>
  <ZText.h3>Heading Three</ZText.h3>
  <ZText.h4>Heading Four</ZText.h4>
  <ZText.body>Body — readable prose and descriptions</ZText.body>
  <ZText.small>Small — supporting metadata</ZText.small>
  <ZText.caption>Caption — labels and footnotes</ZText.caption>
</div>`,

	colors: `<div className="flex flex-col gap-3">
  <ZText>Neutral (default)</ZText>
  <ZText isMuted>Muted — subdued supporting text</ZText>
  <ZText isPurple>Purple — accent emphasis</ZText>
  <ZText isPink>Pink — accent emphasis</ZText>
</div>`,

	weights: `<div className="flex flex-col gap-3">
  <ZText isThin>Thin weight</ZText>
  <ZText isNormal>Normal weight (default)</ZText>
  <ZText isBold>Bold weight</ZText>
  <ZText isVeryBold>Very bold weight</ZText>
</div>`,

	styles: `<div className="flex flex-col gap-3">
  <ZText isItalic>Italic text</ZText>
  <ZText isUnderlined>Underlined text</ZText>
  <ZText isItalic isUnderlined>Italic and underlined</ZText>
</div>`,

	sizes: `<div className="flex flex-col gap-3">
  <ZText isExtraSmall>Extra small</ZText>
  <ZText isSmall>Small</ZText>
  <ZText isMedium>Medium (default)</ZText>
  <ZText isLarge>Large</ZText>
  <ZText isExtraLarge>Extra large</ZText>
</div>`,

	asElement: `{/* Render as a specific HTML element */}
<ZText as="p">Rendered as a paragraph</ZText>
<ZText as="span">Rendered as a span</ZText>
<ZText as="label">Rendered as a label</ZText>

{/* Semantic sub-components use the correct element automatically */}
<ZText.h1>Renders an h1</ZText.h1>
<ZText.body>Renders a p</ZText.body>`
} as const
