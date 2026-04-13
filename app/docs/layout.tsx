import type { Metadata } from "next";
import { DocsNav } from "@/components/docs/docs-nav";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="min-h-screen bg-background">
      <DocsNav />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 lg:pl-72">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
