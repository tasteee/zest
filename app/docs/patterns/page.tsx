"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FormInput, 
  LayoutGrid, 
  Navigation, 
  UserCircle,
  FileText,
  MessageSquare,
  Settings,
  CreditCard
} from "lucide-react"

const patterns = [
  {
    name: "Forms",
    description: "Best practices for building accessible, user-friendly forms with validation and error handling.",
    href: "/docs/patterns/forms",
    icon: FormInput,
    status: "available"
  },
  {
    name: "Authentication",
    description: "Login, signup, and password reset flows with proper security considerations.",
    href: "/docs/patterns/authentication",
    icon: UserCircle,
    status: "coming-soon"
  },
  {
    name: "Navigation",
    description: "Sidebar, navbar, and mobile navigation patterns for different app structures.",
    href: "/docs/patterns/navigation",
    icon: Navigation,
    status: "coming-soon"
  },
  {
    name: "Data Tables",
    description: "Tables with sorting, filtering, pagination, and row selection.",
    href: "/docs/patterns/data-tables",
    icon: LayoutGrid,
    status: "coming-soon"
  },
  {
    name: "Settings Pages",
    description: "Account settings, preferences, and configuration interfaces.",
    href: "/docs/patterns/settings",
    icon: Settings,
    status: "coming-soon"
  },
  {
    name: "Content Pages",
    description: "Blog posts, articles, and documentation page layouts.",
    href: "/docs/patterns/content",
    icon: FileText,
    status: "coming-soon"
  },
  {
    name: "Chat Interfaces",
    description: "Real-time messaging and conversation UI patterns.",
    href: "/docs/patterns/chat",
    icon: MessageSquare,
    status: "coming-soon"
  },
  {
    name: "Checkout",
    description: "E-commerce checkout flows, payment forms, and order summaries.",
    href: "/docs/patterns/checkout",
    icon: CreditCard,
    status: "coming-soon"
  },
]

export default function PatternsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            Patterns
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          UI Patterns
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Common UI patterns and best practices for building consistent, accessible 
          interfaces. Each pattern demonstrates how to combine components effectively.
        </p>
      </div>

      {/* Pattern Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {patterns.map((pattern) => (
          <Link 
            key={pattern.name} 
            href={pattern.status === "available" ? pattern.href : "#"}
            className={pattern.status === "coming-soon" ? "cursor-not-allowed" : ""}
          >
            <Card className={`h-full transition-all duration-200 ${
              pattern.status === "available" 
                ? "hover:border-primary/50 hover:shadow-md" 
                : "opacity-60"
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <pattern.icon className="h-5 w-5 text-foreground" />
                  </div>
                  {pattern.status === "coming-soon" && (
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{pattern.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {pattern.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Contributing */}
      <Card className="border-dashed">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-lg font-semibold">Want to contribute a pattern?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We welcome contributions! If you have a UI pattern that could help others, 
            consider submitting it to our documentation.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
