export const examples = {
	quickPreview: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@tasteee/zest'

export function CollapsibleDemo() {
  return (
    <Collapsible className="w-72">
      <CollapsibleTrigger asChild>
        <button className="w-full text-left">Toggle section</button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <p className="text-sm text-muted-foreground">
          This content is collapsed by default.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}`,

	usageImport: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@tasteee/zest'`,

	usage: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content
  </CollapsibleContent>
</Collapsible>`,

	withButton: `<Collapsible className="w-72">
  <CollapsibleTrigger asChild>
    <button>Toggle section</button>
  </CollapsibleTrigger>
  <CollapsibleContent className="pt-2">
    <p className="text-sm text-muted-foreground">
      This content is collapsed by default.
    </p>
  </CollapsibleContent>
</Collapsible>`,

	controlled: `import { useState } from 'react'

export function ControlledCollapsible() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-72">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Dependencies</span>
        <CollapsibleTrigger asChild>
          <button>{isOpen ? 'Hide' : 'Show'}</button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        <div className="rounded-md border px-3 py-2 text-sm font-mono">react</div>
        <div className="rounded-md border px-3 py-2 text-sm font-mono mt-1">next</div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,

	faq: `{/* Useful for FAQ or accordion-style layouts */}
<div className="flex flex-col gap-2">
  {faqs.map((faq) => (
    <Collapsible key={faq.id} className="rounded-lg border px-4 py-2">
      <CollapsibleTrigger className="w-full text-left text-sm font-medium py-1">
        {faq.question}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-1">
        <p className="text-sm text-muted-foreground">{faq.answer}</p>
      </CollapsibleContent>
    </Collapsible>
  ))}
</div>`
} as const
