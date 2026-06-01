import type { Metadata } from "next";
import { DocsNav } from "@/components/docs/docs-nav";
import { DocsSidebar } from "@/components/docs/docs-sidebar";import { Toaster } from "@/components/ui/toaster";
import { z } from '@/components/ui'

export const metadata: Metadata = {
  title: "Documentation — tasteink",
  description: "Comprehensive documentation for the tasteink design system and component library.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <z.box className="zestPageBackground">
      <DocsNav />
      <z.box className="flex">
        <DocsSidebar />
        <z.box as='main' className="flex-1 lg:pl-72">
          <z.scrollArea className="h-[calc(100vh-3.5rem)]">
            <z.box className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
              {children}
            </z.box>
          </z.scrollArea>
        </z.box>
      </z.box>
      <Toaster />
    </z.box>
  );
}
