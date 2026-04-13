"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { CodeBlock } from "@/components/docs/code-block"
import { ChevronRight, Bell, Check, CreditCard, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const cardProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the card container."
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The content to render inside the card."
  },
]

const cardHeaderProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the header."
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Typically includes CardTitle and CardDescription."
  },
]

const cardTitleProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the title."
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The title text content."
  },
]

export default function CardDocsPage() {
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
        <span className="text-foreground">Card</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Card
          </h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A container component for grouping related content and actions. Cards provide 
          a flexible foundation for building complex UI patterns.
        </p>
      </div>

      {/* Quick Preview */}
      <ComponentPreview
        title="Default Card"
        description="The default card with header, content, and footer."
        code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Card Content</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Card Footer</p>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="mt-4">
            <CodeBlock 
              code="npx shadcn@latest add card" 
              language="bash"
              filename="Terminal"
            />
          </TabsContent>
          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the following code into your project.
            </p>
            <CodeBlock
              code={`import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`}
              language="tsx"
              filename="components/ui/card.tsx"
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}
          language="tsx"
        />
        <CodeBlock
          code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`}
          language="tsx"
        />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Form Card */}
        <ComponentPreview
          title="Form Card"
          description="A card containing a form with inputs and submit button."
          code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>

        {/* Notifications Card */}
        <ComponentPreview
          title="Notifications"
          description="A card with a list of notifications settings."
          code={`<Card className="w-[380px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>Choose what you want to be notified about.</CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Bell className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Push Notifications</p>
        <p className="text-sm text-muted-foreground">Send notifications to device.</p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <CreditCard className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Billing Alerts</p>
        <p className="text-sm text-muted-foreground">Receive alerts for billing events.</p>
      </div>
      <Switch defaultChecked />
    </div>
  </CardContent>
</Card>`}
        >
          <Card className="w-[380px]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <Bell className="h-5 w-5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Send notifications to device.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <CreditCard className="h-5 w-5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Billing Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for billing events.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </ComponentPreview>

        {/* Simple Card */}
        <ComponentPreview
          title="Simple Card"
          description="A minimal card with just content."
          code={`<Card className="w-[300px]">
  <CardContent className="pt-6">
    <div className="flex items-center space-x-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">Payment successful</p>
        <p className="text-sm text-muted-foreground">Your payment has been processed.</p>
      </div>
    </div>
  </CardContent>
</Card>`}
        >
          <Card className="w-[300px]">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Payment successful</p>
                  <p className="text-sm text-muted-foreground">Your payment has been processed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ComponentPreview>

        {/* Card Grid */}
        <ComponentPreview
          title="Card Grid"
          description="Multiple cards in a responsive grid layout."
          code={`<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2350</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Now</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+573</div>
      <p className="text-xs text-muted-foreground">+201 since last hour</p>
    </CardContent>
  </Card>
</div>`}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <PropsTable title="Card" props={cardProps} />
        <PropsTable title="CardHeader" props={cardHeaderProps} />
        <PropsTable title="CardTitle" props={cardTitleProps} />
        <div className="text-sm text-muted-foreground">
          <p>
            CardDescription, CardContent, and CardFooter follow the same pattern, 
            accepting className and children props.
          </p>
        </div>
      </section>

      {/* Anatomy */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Card>
          <CardContent className="p-6">
            <CodeBlock
              code={`<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>`}
              language="tsx"
            />
          </CardContent>
        </Card>
        <div className="grid gap-4 text-sm">
          <div className="flex gap-4">
            <code className="font-mono text-primary">Card</code>
            <span className="text-muted-foreground">The root container with border, background, and shadow.</span>
          </div>
          <div className="flex gap-4">
            <code className="font-mono text-primary">CardHeader</code>
            <span className="text-muted-foreground">Contains the title and description with consistent spacing.</span>
          </div>
          <div className="flex gap-4">
            <code className="font-mono text-primary">CardTitle</code>
            <span className="text-muted-foreground">The main heading of the card.</span>
          </div>
          <div className="flex gap-4">
            <code className="font-mono text-primary">CardDescription</code>
            <span className="text-muted-foreground">Secondary text that describes the card content.</span>
          </div>
          <div className="flex gap-4">
            <code className="font-mono text-primary">CardContent</code>
            <span className="text-muted-foreground">The main content area of the card.</span>
          </div>
          <div className="flex gap-4">
            <code className="font-mono text-primary">CardFooter</code>
            <span className="text-muted-foreground">Contains actions or secondary information.</span>
          </div>
        </div>
      </section>
    </div>
  )
}
