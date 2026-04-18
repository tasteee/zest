"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const accordionProps: PropDefinition[] = [
  {
    name: "type",
    type: '"single" | "multiple"',
    required: true,
    description: "Determines whether one or multiple items can be opened at the same time."
  },
  {
    name: "collapsible",
    type: "boolean",
    defaultValue: "false",
    description: 'When type is "single", allows closing content by clicking the open item.'
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "The value(s) of the item(s) to expand when initially rendered."
  },
  {
    name: "value",
    type: "string | string[]",
    description: "The controlled value of the item(s) to expand."
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Event handler called when the expanded state changes."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the accordion."
  },
]

const accordionItemProps: PropDefinition[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "A unique value for the item."
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the item."
  },
]

export default function AccordionDocsPage() {
  return (
    <div className="space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/docs/components" className="hover:text-foreground transition-colors">
          Components
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Accordion</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZAccordion
          </h1>
          <Badge kind="ghost" color="white">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A vertically stacked set of interactive headings that each reveal a section 
          of content. Built on Radix UI Accordion primitive.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        code={`import {
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
}`}
      >
        <Accordion type="single" collapsible className="w-full max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match your design system.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import {
  ZAccordion,
  ZAccordionContent,
  ZAccordionItem,
  ZAccordionTrigger,
} from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZAccordion type="single" collapsible>
  <ZAccordionItem value="item-1">
    <ZAccordionTrigger>Title</ZAccordionTrigger>
    <ZAccordionContent>Content</ZAccordionContent>
  </ZAccordionItem>
</ZAccordion>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Multiple */}
        <ComponentPreview
          title="Multiple Items Open"
          description="Allow multiple accordion items to be open at once."
          code={`<Accordion type="multiple" className="w-full">
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
</Accordion>`}
        >
          <Accordion type="multiple" className="w-full max-w-lg">
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
          </Accordion>
        </ComponentPreview>

        {/* Default Open */}
        <ComponentPreview
          title="Default Open"
          description="Set items to be open by default on initial render."
          code={`<Accordion type="single" collapsible defaultValue="item-2">
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
</Accordion>`}
        >
          <Accordion type="single" collapsible defaultValue="item-2" className="w-full max-w-lg">
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
          </Accordion>
        </ComponentPreview>

        {/* FAQ Example */}
        <ComponentPreview
          title="FAQ Section"
          description="Using accordion for a frequently asked questions section."
          code={`<Accordion type="single" collapsible className="w-full">
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
</Accordion>`}
        >
          <Accordion type="single" collapsible className="w-full max-w-lg">
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
                If you&apos;re not satisfied, contact our support team for a full refund.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Accordion" props={accordionProps} />
        <PropsTable title="AccordionItem" props={accordionItemProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Keyboard Interactions</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space / Enter</kbd>
                  <span className="text-muted-foreground">Toggle the accordion item</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Down</kbd>
                  <span className="text-muted-foreground">Move focus to the next trigger</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Up</kbd>
                  <span className="text-muted-foreground">Move focus to the previous trigger</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Home</kbd>
                  <span className="text-muted-foreground">Move focus to the first trigger</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">End</kbd>
                  <span className="text-muted-foreground">Move focus to the last trigger</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
