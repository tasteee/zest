"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Examples", href: "/docs/examples" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/docs/foundations/colors" },
      { title: "Typography", href: "/docs/foundations/typography" },
      { title: "Spacing", href: "/docs/foundations/spacing" },
      { title: "Voice & Tone", href: "/docs/foundations/voice-tone" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components" },
    ],
  },
  {
    title: "Inputs",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Switch", href: "/docs/components/switch" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Table", href: "/docs/components/table" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Layout",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Overview", href: "/docs/patterns" },
      { title: "Forms", href: "/docs/patterns/forms" },
    ],
  },
];

export function DocsSidebarContent() {
  const pathname = usePathname();

  return (
    <div className="space-y-6 py-4">
      {navigation.map((section) => (
        <div key={section.title} className="px-4">
          <h4 className="mb-2 text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-muted text-primary font-medium"
                      : "text-foreground hover:bg-muted/50 hover:text-primary"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:pt-14 border-r border-border">
      <ScrollArea className="flex-1 py-4">
        <DocsSidebarContent />
      </ScrollArea>
    </aside>
  );
}
