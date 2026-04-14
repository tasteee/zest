import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DocsTitleProps {
  children: React.ReactNode;
  badge?: string;
  badgeVariant?: "green" | "pink" | "purple" | "orange";
}

export function DocsTitle({ children, badge, badgeVariant = "green" }: DocsTitleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{children}</h1>
        {badge && (
          <Badge variant={`${badgeVariant}-outline`}>{badge}</Badge>
        )}
      </div>
    </div>
  );
}

interface DocsDescriptionProps {
  children: React.ReactNode;
}

export function DocsDescription({ children }: DocsDescriptionProps) {
  return (
    <p className="text-lg text-foreground leading-relaxed mt-2">{children}</p>
  );
}

interface DocsSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsSection({ children, className }: DocsSectionProps) {
  return <section className={cn("mt-12", className)}>{children}</section>;
}

interface DocsSectionTitleProps {
  children: React.ReactNode;
  id?: string;
}

export function DocsSectionTitle({ children, id }: DocsSectionTitleProps) {
  return (
    <h2 id={id} className="text-2xl font-semibold text-primary mb-4 scroll-mt-20">
      {children}
    </h2>
  );
}

interface DocsSectionSubtitleProps {
  children: React.ReactNode;
  id?: string;
}

export function DocsSectionSubtitle({ children, id }: DocsSectionSubtitleProps) {
  return (
    <h3 id={id} className="text-lg font-semibold text-primary mb-3 mt-8 scroll-mt-20">
      {children}
    </h3>
  );
}

interface DocsTextProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsText({ children, className }: DocsTextProps) {
  return (
    <p className={cn("text-foreground leading-relaxed mb-4", className)}>
      {children}
    </p>
  );
}

interface DocsListProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsList({ children, className }: DocsListProps) {
  return (
    <ul className={cn("list-disc pl-6 space-y-2 text-foreground mb-4", className)}>
      {children}
    </ul>
  );
}

interface DocsNoteProps {
  children: React.ReactNode;
  variant?: "default" | "warning" | "success";
}

export function DocsNote({ children, variant = "default" }: DocsNoteProps) {
  const variants = {
    default: "border-neon-purple/50 bg-neon-purple/5",
    warning: "border-neon-orange/50 bg-neon-orange/5",
    success: "border-neon-green/50 bg-neon-green/5",
  };

  const iconColors = {
    default: "text-neon-purple",
    warning: "text-neon-orange",
    success: "text-neon-green",
  };

  return (
    <div className={cn("rounded-lg border p-4 my-6", variants[variant])}>
      <div className="flex gap-3">
        <svg
          className={cn("h-5 w-5 mt-0.5 shrink-0", iconColors[variant])}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

interface DocsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function DocsGrid({ children, columns = 2, className }: DocsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {children}
    </div>
  );
}
