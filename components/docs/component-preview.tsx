"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Tabs } from "@/components/ui/tabs";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
  align?: "start" | "center" | "end";
}

export function ComponentPreview({
  children,
  code,
  className,
  align = "center",
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <Tabs.List className="w-auto justify-start bg-muted rounded-lg p-1 h-auto">
        <Tabs.Trigger
          value="preview"
          className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground px-4 py-1.5 text-sm"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          value="code"
          className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground px-4 py-1.5 text-sm"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview" className="mt-0">
        <div
          className={cn(
            "flex min-h-[200px] w-full rounded-lg border border-border bg-card p-8",
            align === "center" && "items-center justify-center",
            align === "start" && "items-start justify-start",
            align === "end" && "items-end justify-end",
            className
          )}
        >
          {children}
        </div>
      </Tabs.Content>
      <Tabs.Content value="code" className="mt-0">
        <CodeBlock code={code} />
      </Tabs.Content>
    </Tabs>
  );
}

interface ComponentExampleProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  className?: string;
}

export function ComponentExample({
  title,
  description,
  children,
  code,
  className,
}: ComponentExampleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <ComponentPreview code={code}>{children}</ComponentPreview>
    </div>
  );
}
