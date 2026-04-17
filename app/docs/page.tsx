import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  DocsTitle,
  DocsDescription,
  DocsSection,
  DocsSectionTitle,
  DocsText,
  DocsGrid,
} from "@/components/docs/mdx-components";
import { ArrowRightIcon } from "lucide-react";

const sections = [
  {
    title: "Foundations",
    description: "The core building blocks of our design language.",
    href: "/docs/foundations/colors",
    color: "neon-pink",
    items: ["Colors", "Typography", "Spacing", "Voice & Tone"],
  },
  {
    title: "Components",
    description: "A complete library of accessible, customizable components.",
    href: "/docs/components",
    color: "neon-green",
    items: ["50+ Components", "Radix Primitives", "Full Variants"],
  },
];

const quickLinks = [
  { title: "Button", href: "/docs/components/button", badge: "Popular" },
  { title: "Card", href: "/docs/components/card", badge: null },
  { title: "Dialog", href: "/docs/components/dialog", badge: null },
  { title: "Input", href: "/docs/components/input", badge: null },
  { title: "Badge", href: "/docs/components/badge", badge: null },
  { title: "Alert", href: "/docs/components/alert", badge: null },
];

export default function DocsPage() {
  return (
    <div>
      <DocsTitle badge="v1.0">Documentation</DocsTitle>
      <DocsDescription>
        Comprehensive documentation for the tasteink design system. 
        Everything you need to build interfaces that hit different.
      </DocsDescription>

      <DocsSection>
        <DocsGrid columns={2}>
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group block rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/30 hover:bg-card/80"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-semibold text-${section.color}`}>
                  {section.title}
                </h3>
                <ArrowRightIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-foreground text-sm mb-4">{section.description}</p>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <Badge key={item} kind="outline" color="white" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </DocsGrid>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Quick Start</DocsSectionTitle>
        <DocsText>
          Jump straight into the most commonly used components.
        </DocsText>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted/50 hover:border-foreground/30"
            >
              <span className="text-foreground font-medium">{link.title}</span>
              {link.badge && (
                <Badge kind="solid" color="green" className="text-[10px]">
                  {link.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Design Principles</DocsSectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <h4 className="font-semibold text-primary">Unapologetic</h4>
            </div>
            <p className="text-sm text-foreground">
              Bold choices, confident execution. We don&apos;t follow trends—we set them.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon-pink" />
              <h4 className="font-semibold text-primary">Accessible</h4>
            </div>
            <p className="text-sm text-foreground">
              Every component is built with accessibility in mind. No exceptions.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon-purple" />
              <h4 className="font-semibold text-primary">Composable</h4>
            </div>
            <p className="text-sm text-foreground">
              Small, focused components that compose into complex interfaces.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon-orange" />
              <h4 className="font-semibold text-primary">Themeable</h4>
            </div>
            <p className="text-sm text-foreground">
              CSS variables and variant props make customization effortless.
            </p>
          </div>
        </div>
      </DocsSection>
    </div>
  );
}
