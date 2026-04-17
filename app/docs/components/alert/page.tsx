"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, AlertCircle, Terminal, Info, CheckCircle, XCircle } from "lucide-react"

const alertProps: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "destructive"',
    defaultValue: '"default"',
    description: "The visual style variant of the alert."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the alert."
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The content of the alert, typically AlertTitle and AlertDescription."
  },
]

export default function AlertDocsPage() {
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
        <span className="text-foreground">Alert</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            ZAlert
          </h1>
          <Badge kind="ghost" color="white">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Displays a callout for user attention. Alerts provide contextual feedback 
          messages for typical user actions.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        code={`import { ZAlert, ZAlertDescription, ZAlertTitle } from '@tasteee/zest'
import { Terminal } from 'lucide-react'

export function AlertDemo() {
  return (
    <ZAlert>
      <Terminal className="h-4 w-4" />
      <ZAlertTitle>Heads up!</ZAlertTitle>
      <ZAlertDescription>
        You can add components to your app using the cli.
      </ZAlertDescription>
    </ZAlert>
  )
}`}
      >
        <Alert className="max-w-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </ComponentPreview>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { ZAlert, ZAlertDescription, ZAlertTitle } from '@tasteee/zest'`}
          language="tsx"
        />
        <CodeBlock
          code={`<ZAlert>
  <ZAlertTitle>Alert Title</ZAlertTitle>
  <ZAlertDescription>Alert description text.</ZAlertDescription>
</ZAlert>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Destructive */}
        <ComponentPreview
          title="Destructive"
          description="An alert for error or destructive messages."
          code={`<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`}
        >
          <Alert variant="destructive" className="max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </ComponentPreview>

        {/* Info */}
        <ComponentPreview
          title="Info Alert"
          description="An informational alert styled with custom colors."
          code={`<Alert className="border-blue-500/50 text-blue-600 [&>svg]:text-blue-600">
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Your account is pending verification. Check your email for next steps.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="max-w-lg border-blue-500/50 text-blue-600 [&>svg]:text-blue-600">
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Your account is pending verification. Check your email for next steps.
            </AlertDescription>
          </Alert>
        </ComponentPreview>

        {/* Success */}
        <ComponentPreview
          title="Success Alert"
          description="A success alert styled with custom colors."
          code={`<Alert className="border-green-500/50 text-green-600 [&>svg]:text-green-600">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="max-w-lg border-green-500/50 text-green-600 [&>svg]:text-green-600">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
        </ComponentPreview>

        {/* Warning */}
        <ComponentPreview
          title="Warning Alert"
          description="A warning alert styled with custom colors."
          code={`<Alert className="border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Your storage is almost full. Consider upgrading your plan.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="max-w-lg border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Your storage is almost full. Consider upgrading your plan.
            </AlertDescription>
          </Alert>
        </ComponentPreview>

        {/* Without Icon */}
        <ComponentPreview
          title="Without Icon"
          description="Alerts work without icons too."
          code={`<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    This is a simple alert without an icon.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="max-w-lg">
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              This is a simple alert without an icon.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Alert" props={alertProps} />
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">ARIA Roles</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>The Alert component has <code className="text-primary">role=&quot;alert&quot;</code> by default</li>
                <li>Screen readers will announce alert content immediately</li>
                <li>For non-urgent information, consider using a different role</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Use descriptive titles that summarize the alert</li>
                <li>Keep alert descriptions concise and actionable</li>
                <li>Use appropriate variants to convey meaning (destructive for errors)</li>
                <li>Include icons for visual reinforcement of the alert type</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
