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
import { Badge } from "@/components/ui/badge";

const typeScale = [
  {
    name: "Display",
    size: "72px / 4.5rem",
    weight: "700",
    lineHeight: "0.9",
    class: "text-7xl font-bold leading-[0.9]",
    sample: "Fuck it.",
  },
  {
    name: "H1",
    size: "48px / 3rem",
    weight: "700",
    lineHeight: "1.0",
    class: "text-5xl font-bold leading-tight",
    sample: "Headlines that hit.",
  },
  {
    name: "H2",
    size: "36px / 2.25rem",
    weight: "600",
    lineHeight: "1.1",
    class: "text-4xl font-semibold leading-tight",
    sample: "Section headers with attitude.",
  },
  {
    name: "H3",
    size: "24px / 1.5rem",
    weight: "600",
    lineHeight: "1.2",
    class: "text-2xl font-semibold leading-snug",
    sample: "Subsection with purpose.",
  },
  {
    name: "H4",
    size: "20px / 1.25rem",
    weight: "500",
    lineHeight: "1.3",
    class: "text-xl font-medium leading-snug",
    sample: "Component headers that guide.",
  },
  {
    name: "Body",
    size: "16px / 1rem",
    weight: "400",
    lineHeight: "1.6",
    class: "text-base font-normal leading-relaxed",
    sample: "Body text that reads well and carries the message without stealing the spotlight.",
  },
  {
    name: "Small",
    size: "14px / 0.875rem",
    weight: "400",
    lineHeight: "1.5",
    class: "text-sm font-normal leading-normal",
    sample: "Secondary text for additional context and descriptions.",
  },
  {
    name: "Caption",
    size: "12px / 0.75rem",
    weight: "500",
    lineHeight: "1.4",
    class: "text-xs font-medium leading-normal",
    sample: "LABELS, METADATA, AND TIMESTAMPS",
  },
];

const weights = [
  { name: "Light", value: 300, class: "font-light" },
  { name: "Regular", value: 400, class: "font-normal" },
  { name: "Medium", value: 500, class: "font-medium" },
  { name: "Semibold", value: 600, class: "font-semibold" },
  { name: "Bold", value: 700, class: "font-bold" },
  { name: "Black", value: 900, class: "font-black" },
];

export default function TypographyPage() {
  return (
    <div>
      <DocsTitle>Typography</DocsTitle>
      <DocsDescription>
        DM Sans. Clean, geometric, unapologetic. One typeface. Infinite expression.
      </DocsDescription>

      <DocsSection>
        <DocsSectionTitle>Typeface</DocsSectionTitle>
        <div className="rounded-lg border border-border p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-neon-orange text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                Primary Typeface
              </span>
              <h3 className="text-primary font-bold text-6xl tracking-tight">
                DM Sans
              </h3>
            </div>
            <div className="flex gap-2">
              <Badge kind="outline" color="white">Google Fonts</Badge>
              <Badge kind="outline" color="white">Open Source</Badge>
            </div>
          </div>
          <p className="text-primary text-2xl leading-relaxed mb-4">
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-foreground font-mono text-sm">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Font Weights</DocsSectionTitle>
        <DocsText>
          DM Sans supports a full range of weights for creating visual hierarchy.
        </DocsText>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {weights.map((weight) => (
            <div
              key={weight.name}
              className="rounded-lg border border-border p-4 text-center"
            >
              <span
                className={`text-primary text-3xl block mb-2 ${weight.class}`}
              >
                Aa
              </span>
              <span className="text-foreground text-sm font-medium block">
                {weight.name}
              </span>
              <span className="text-muted-foreground text-xs">{weight.value}</span>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Type Scale</DocsSectionTitle>
        <DocsText>
          A carefully crafted type scale for consistent hierarchy across the interface.
        </DocsText>
        <div className="space-y-6">
          {typeScale.map((type) => (
            <div
              key={type.name}
              className="flex flex-col lg:flex-row lg:items-center gap-4 py-6 border-b border-border last:border-b-0"
            >
              <div className="lg:w-24 shrink-0">
                <Badge kind="outline" color="green" className="text-xs">
                  {type.name}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-primary ${type.class} truncate`}>
                  {type.sample}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:w-64 shrink-0">
                <span className="text-muted-foreground text-xs border border-border px-2 py-1 rounded">
                  {type.size}
                </span>
                <span className="text-muted-foreground text-xs border border-border px-2 py-1 rounded">
                  {type.weight}
                </span>
                <span className="text-muted-foreground text-xs border border-border px-2 py-1 rounded">
                  LH {type.lineHeight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Text Hierarchy</DocsSectionTitle>
        <DocsText>
          Use color alongside size to establish clear visual hierarchy.
        </DocsText>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-primary font-bold text-2xl">
              Headlines demand attention.
            </h4>
            <p className="text-foreground leading-relaxed">
              Body text carries the message. It&apos;s readable, comfortable, and 
              gets the job done without stealing the spotlight. Keep it gray, not white.
            </p>
            <p className="text-muted-foreground text-sm">
              Secondary text provides context. It fades into the background while 
              remaining accessible.
            </p>
            <div className="flex gap-3">
              <span className="text-neon-green text-xs font-semibold tracking-wider uppercase">
                Label
              </span>
              <span className="text-neon-pink text-xs font-semibold tracking-wider uppercase">
                Tag
              </span>
              <span className="text-neon-orange text-xs font-semibold tracking-wider uppercase">
                Status
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-6 space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-primary font-semibold">White</span>
              <span className="text-neon-green text-xs">Headlines, CTAs</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-foreground">Gray</span>
              <span className="text-neon-pink text-xs">Body text</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Muted</span>
              <span className="text-neon-purple text-xs">Secondary</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-neon-orange">Brand</span>
              <span className="text-neon-orange text-xs">Accents, labels</span>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Usage in Code</DocsSectionTitle>
        
        <DocsSectionSubtitle>Layout Setup</DocsSectionSubtitle>
        <DocsText>
          Configure the font in your root layout:
        </DocsText>
        <CodeBlock
          code={`import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${dmSans.variable} font-sans antialiased\`}>
        {children}
      </body>
    </html>
  );
}`}
          language="tsx"
          filename="app/layout.tsx"
        />

        <DocsSectionSubtitle>Tailwind Classes</DocsSectionSubtitle>
        <DocsText>
          Use utility classes to apply typography styles:
        </DocsText>
        <CodeBlock
          code={`// Headlines
<h1 className="text-5xl font-bold leading-tight text-primary">
  Display Headline
</h1>

// Body text
<p className="text-base leading-relaxed text-foreground">
  Body copy with comfortable reading experience.
</p>

// Secondary text
<span className="text-sm text-muted-foreground">
  Supporting information
</span>

// Labels
<span className="text-xs font-semibold tracking-[0.1em] uppercase text-neon-green">
  Category Label
</span>`}
          language="tsx"
          filename="Example.tsx"
        />
      </DocsSection>

      <DocsNote>
        Always use the semantic text color classes (text-primary, text-foreground, 
        text-muted-foreground) rather than arbitrary colors to maintain consistency.
      </DocsNote>
    </div>
  );
}
