export const examples = {
	quickPreview: `import {
  ZAccordion,
  ZAccordionContent,
  ZAccordionItem,
  ZAccordionTrigger,
} from '@tasteee/zest'

export function AccordionDemo() {
  return (
    <ZAccordion type="single" collapsible className="w-full">
      <ZAccordionItem value="item-1">
        <ZAccordionTrigger>Is it accessible?</ZAccordionTrigger>
        <ZAccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </ZAccordionContent>
      </ZAccordionItem>
      <ZAccordionItem value="item-2">
        <ZAccordionTrigger>Is it styled?</ZAccordionTrigger>
        <ZAccordionContent>
          Yes. It comes with default styles that match your design system.
        </ZAccordionContent>
      </ZAccordionItem>
      <ZAccordionItem value="item-3">
        <ZAccordionTrigger>Is it animated?</ZAccordionTrigger>
        <ZAccordionContent>
          Yes. It's animated by default, but you can disable it.
        </ZAccordionContent>
      </ZAccordionItem>
    </ZAccordion>
  )
}`,

	usageImport: `import {
  ZAccordion,
  ZAccordionContent,
  ZAccordionItem,
  ZAccordionTrigger,
} from '@tasteee/zest'`,

	usage: `<ZAccordion type="single" collapsible>
  <ZAccordionItem value="item-1">
    <ZAccordionTrigger>Title</ZAccordionTrigger>
    <ZAccordionContent>Content</ZAccordionContent>
  </ZAccordionItem>
</ZAccordion>`,

	multipleItems: `<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Section</AccordionTrigger>
    <AccordionContent>
      This section can stay open while others are opened.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Section</AccordionTrigger>
    <AccordionContent>
      This section can also remain open simultaneously.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Third Section</AccordionTrigger>
    <AccordionContent>
      All three can be open at the same time!
    </AccordionContent>
  </AccordionItem>
</Accordion>`,

	defaultOpen: `<Accordion type="single" collapsible defaultValue="item-2">
  <AccordionItem value="item-1">
    <AccordionTrigger>Closed by default</AccordionTrigger>
    <AccordionContent>
      This item starts closed.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Open by default</AccordionTrigger>
    <AccordionContent>
      This item is open when the page loads.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,

	faqSection: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="faq-1">
    <AccordionTrigger>How do I get started?</AccordionTrigger>
    <AccordionContent>
      Getting started is easy! Simply sign up for an account, 
      complete your profile, and you can begin using all our features 
      immediately.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-2">
    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
    <AccordionContent>
      We accept all major credit cards (Visa, MasterCard, American Express), 
      PayPal, and bank transfers for enterprise customers.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-3">
    <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
    <AccordionContent>
      Yes, you can cancel your subscription at any time from your account 
      settings. Your access will continue until the end of your billing period.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-4">
    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
    <AccordionContent>
      We offer a 30-day money-back guarantee for all new subscriptions. 
      If you're not satisfied, contact our support team for a full refund.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
} as const
