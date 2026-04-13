"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <TabsList className="w-auto justify-start bg-muted rounded-lg p-1 h-auto">
        <TabsTrigger
          value="preview"
          className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground px-4 py-1.5 text-sm"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground px-4 py-1.5 text-sm"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-0">
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
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <CodeBlock code={code} />
      </TabsContent>
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
