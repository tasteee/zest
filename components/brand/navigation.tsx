"use client";

import { cn } from "@/lib/utils";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "colors", label: "Color" },
  { id: "typography", label: "Type" },
  { id: "components", label: "Components" },
  { id: "voice", label: "Voice" },
  { id: "icons", label: "Assets" },
  { id: "usage", label: "Usage" },
];

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-green" />
            <span className="text-primary font-bold tracking-tight text-lg">
              zest
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-4 py-2 text-sm transition-colors rounded-md",
                  activeSection === item.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-neon-pink text-xs font-medium tracking-wider uppercase">
              Brand Guide
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
