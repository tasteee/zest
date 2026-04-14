"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  MousePointerClick, 
  Type, 
  ToggleLeft, 
  CheckSquare, 
  CreditCard, 
  MessageSquare,
  Layers,
  ChevronDown,
  AlertCircle,
  Info,
  List,
  Menu,
  PanelLeft,
  Loader2,
  Search,
  SlidersHorizontal,
  Tag
} from "lucide-react"

const componentCategories = [
  {
    name: "Inputs",
    description: "Form controls for collecting user data",
    components: [
      {
        name: "Button",
        description: "Interactive buttons with multiple variants and states",
        href: "/docs/components/button",
        icon: MousePointerClick,
        preview: <Button size="sm">Button</Button>
      },
      {
        name: "Input",
        description: "Text input fields for single-line data entry",
        href: "/docs/components/input",
        icon: Type,
        preview: <Input placeholder="Type here..." className="w-32 h-8 text-sm" />
      },
      {
        name: "Checkbox",
        description: "Checkboxes for toggling boolean values",
        href: "/docs/components/checkbox",
        icon: CheckSquare,
        preview: <Checkbox defaultChecked />
      },
      {
        name: "Switch",
        description: "Toggle switches for on/off states",
        href: "/docs/components/switch",
        icon: ToggleLeft,
        preview: <Switch defaultChecked />
      },
      {
        name: "Select",
        description: "Dropdown select menus for choosing options",
        href: "/docs/components/select",
        icon: ChevronDown,
        preview: <Badge variant="outline">Select</Badge>
      },
    ]
  },
  {
    name: "Display",
    description: "Components for presenting content and data",
    components: [
      {
        name: "Card",
        description: "Containers for grouping related content",
        href: "/docs/components/card",
        icon: CreditCard,
        preview: <Card className="w-16 h-10" />
      },
      {
        name: "Badge",
        description: "Small labels for status and categorization",
        href: "/docs/components/badge",
        icon: Tag,
        preview: <Badge>Badge</Badge>
      },
      {
        name: "Alert",
        description: "Contextual feedback messages for users",
        href: "/docs/components/alert",
        icon: AlertCircle,
        preview: <Badge variant="secondary">Alert</Badge>
      },
      {
        name: "Tooltip",
        description: "Contextual information on hover",
        href: "/docs/components/tooltip",
        icon: Info,
        preview: <Badge variant="outline">Hover me</Badge>
      },
    ]
  },
  {
    name: "Layout",
    description: "Structural components for organizing interfaces",
    components: [
      {
        name: "Accordion",
        description: "Collapsible content sections",
        href: "/docs/components/accordion",
        icon: List,
        preview: <Badge variant="outline">Expand</Badge>
      },
      {
        name: "Tabs",
        description: "Tabbed navigation for switching views",
        href: "/docs/components/tabs",
        icon: PanelLeft,
        preview: <Badge variant="secondary">Tabs</Badge>
      },
      {
        name: "Dialog",
        description: "Modal dialogs for focused interactions",
        href: "/docs/components/dialog",
        icon: Layers,
        preview: <Badge variant="outline">Modal</Badge>
      },
      {
        name: "Dropdown Menu",
        description: "Contextual menus triggered by user action",
        href: "/docs/components/dropdown-menu",
        icon: Menu,
        preview: <Badge variant="outline">Menu</Badge>
      },
    ]
  },
]

export default function ComponentsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            Components
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Component Library
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A comprehensive collection of accessible, customizable components built with 
          Radix UI primitives and styled with the Zest design language. Each component 
          is designed to work together seamlessly.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search components..." 
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="space-y-16">
        {componentCategories.map((category) => (
          <section key={category.name} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {category.name}
              </h2>
              <p className="text-muted-foreground">
                {category.description}
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.components.map((component) => (
                <Link 
                  key={component.name} 
                  href={component.href}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <component.icon className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {component.name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center justify-center h-10 w-16">
                          {component.preview}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {component.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Patterns Link */}
      <Card className="border-dashed">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Looking for patterns?</h3>
            <p className="text-muted-foreground max-w-md">
              Check out our patterns documentation for common UI patterns and 
              best practices for combining components.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/docs/patterns">
              View Patterns
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
