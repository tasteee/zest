import {
  DocsTitle,
  DocsDescription,
  DocsSection,
  DocsSectionTitle,
  DocsSectionSubtitle,
  DocsText,
  DocsNote,
} from "@/components/docs/mdx-components";
import { CodeBlock } from "@/components/docs/code-block";

const spacingScale = [
  { name: "0", value: "0px", class: "w-0" },
  { name: "px", value: "1px", class: "w-px" },
  { name: "0.5", value: "2px", class: "w-0.5" },
  { name: "1", value: "4px", class: "w-1" },
  { name: "1.5", value: "6px", class: "w-1.5" },
  { name: "2", value: "8px", class: "w-2" },
  { name: "2.5", value: "10px", class: "w-2.5" },
  { name: "3", value: "12px", class: "w-3" },
  { name: "3.5", value: "14px", class: "w-3.5" },
  { name: "4", value: "16px", class: "w-4" },
  { name: "5", value: "20px", class: "w-5" },
  { name: "6", value: "24px", class: "w-6" },
  { name: "7", value: "28px", class: "w-7" },
  { name: "8", value: "32px", class: "w-8" },
  { name: "9", value: "36px", class: "w-9" },
  { name: "10", value: "40px", class: "w-10" },
  { name: "11", value: "44px", class: "w-11" },
  { name: "12", value: "48px", class: "w-12" },
  { name: "14", value: "56px", class: "w-14" },
  { name: "16", value: "64px", class: "w-16" },
  { name: "20", value: "80px", class: "w-20" },
  { name: "24", value: "96px", class: "w-24" },
];

const radiusScale = [
  { name: "none", value: "0", class: "rounded-none", visual: "rounded-none" },
  { name: "sm", value: "calc(var(--radius) - 4px)", class: "rounded-sm", visual: "rounded-sm" },
  { name: "md", value: "calc(var(--radius) - 2px)", class: "rounded-md", visual: "rounded-md" },
  { name: "lg", value: "var(--radius)", class: "rounded-lg", visual: "rounded-lg" },
  { name: "xl", value: "calc(var(--radius) + 4px)", class: "rounded-xl", visual: "rounded-xl" },
  { name: "2xl", value: "calc(var(--radius) + 8px)", class: "rounded-2xl", visual: "rounded-2xl" },
  { name: "full", value: "9999px", class: "rounded-full", visual: "rounded-full" },
];

export default function SpacingPage() {
  return (
    <div>
      <DocsTitle>Spacing</DocsTitle>
      <DocsDescription>
        Consistent spacing creates rhythm. Use the Tailwind scale, not arbitrary values.
      </DocsDescription>

      <DocsSection>
        <DocsSectionTitle>Spacing Scale</DocsSectionTitle>
        <DocsText>
          The spacing scale follows Tailwind&apos;s default 4px base unit. 
          Prefer these values over arbitrary ones like p-[17px].
        </DocsText>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-[80px_80px_1fr] gap-4 p-4 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Name</span>
            <span>Size</span>
            <span>Visual</span>
          </div>
          <div className="divide-y divide-border">
            {spacingScale.slice(0, 16).map((space) => (
              <div
                key={space.name}
                className="grid grid-cols-[80px_80px_1fr] gap-4 p-4 items-center"
              >
                <code className="text-sm text-primary font-mono">{space.name}</code>
                <span className="text-sm text-muted-foreground">{space.value}</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 bg-neon-green ${space.class}`}
                    style={{ minWidth: space.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Common Patterns</DocsSectionTitle>
        
        <DocsSectionSubtitle>Component Padding</DocsSectionSubtitle>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border border-border p-3 text-center">
            <span className="text-xs text-muted-foreground block mb-2">Small</span>
            <code className="text-sm text-primary">p-3</code>
            <span className="text-xs text-muted-foreground block mt-1">12px</span>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <span className="text-xs text-muted-foreground block mb-2">Default</span>
            <code className="text-sm text-primary">p-4</code>
            <span className="text-xs text-muted-foreground block mt-1">16px</span>
          </div>
          <div className="rounded-lg border border-border p-6 text-center">
            <span className="text-xs text-muted-foreground block mb-2">Large</span>
            <code className="text-sm text-primary">p-6</code>
            <span className="text-xs text-muted-foreground block mt-1">24px</span>
          </div>
        </div>

        <DocsSectionSubtitle>Gap Spacing</DocsSectionSubtitle>
        <DocsText>
          Use gap utilities for consistent spacing between elements:
        </DocsText>
        <CodeBlock
          code={`// Flex layouts with gap
<div className="flex gap-2">      {/* 8px gap */}
<div className="flex gap-4">      {/* 16px gap */}
<div className="flex gap-6">      {/* 24px gap */}

// Grid layouts
<div className="grid grid-cols-3 gap-4">
<div className="grid grid-cols-2 gap-6">

// Different axis gaps
<div className="grid gap-x-4 gap-y-2">`}
          language="tsx"
          filename="Example.tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Border Radius</DocsSectionTitle>
        <DocsText>
          The radius scale is based on a CSS variable (--radius: 0.5rem) for easy customization.
        </DocsText>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {radiusScale.map((radius) => (
            <div key={radius.name} className="text-center">
              <div
                className={`w-16 h-16 bg-neon-purple mx-auto mb-3 ${radius.visual}`}
              />
              <code className="text-sm text-primary block">{radius.class}</code>
              <span className="text-xs text-muted-foreground">{radius.name}</span>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Layout Spacing</DocsSectionTitle>
        
        <DocsSectionSubtitle>Section Spacing</DocsSectionSubtitle>
        <CodeBlock
          code={`// Page sections
<section className="py-12">         {/* 48px vertical */}
<section className="py-16">         {/* 64px vertical */}
<section className="py-24">         {/* 96px vertical */}

// Content containers
<div className="px-4 md:px-6 lg:px-8">
<div className="max-w-4xl mx-auto">`}
          language="tsx"
          filename="Example.tsx"
        />

        <DocsSectionSubtitle>Stack Spacing</DocsSectionSubtitle>
        <CodeBlock
          code={`// Vertical stacks
<div className="space-y-2">   {/* 8px between items */}
<div className="space-y-4">   {/* 16px between items */}
<div className="space-y-6">   {/* 24px between items */}

// Better: Use flex with gap
<div className="flex flex-col gap-4">
<div className="flex flex-col gap-6">`}
          language="tsx"
          filename="Example.tsx"
        />
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Best Practices</DocsSectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-neon-green/30 p-6">
            <h4 className="text-neon-green font-semibold mb-4">Do</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-neon-green mt-1">•</span>
                Use the spacing scale: p-4, gap-6, mt-8
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-green mt-1">•</span>
                Prefer gap over margin for flex/grid layouts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-green mt-1">•</span>
                Use consistent padding within component types
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-green mt-1">•</span>
                Scale spacing responsively: p-4 md:p-6 lg:p-8
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-neon-pink/30 p-6">
            <h4 className="text-neon-pink font-semibold mb-4">Don&apos;t</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-neon-pink mt-1">•</span>
                Avoid arbitrary values: p-[17px], mt-[23px]
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-pink mt-1">•</span>
                Don&apos;t mix margin and gap on the same container
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-pink mt-1">•</span>
                Avoid inconsistent spacing between similar elements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-pink mt-1">•</span>
                Don&apos;t use space-* classes (prefer gap)
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsNote>
        The base radius variable (--radius: 0.5rem) can be adjusted to globally change 
        the roundness of all components in the design system.
      </DocsNote>
    </div>
  );
}
