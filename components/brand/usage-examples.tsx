"use client";

import { useEffect, useRef } from "react";
import { TasteinkLogo } from "./tasteink-logo";

interface UsageExamplesProps {
  onInView: () => void;
}

export function UsageExamples({ onInView }: UsageExamplesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onInView();
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <section
      ref={sectionRef}
      id="usage"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-purple text-xs font-semibold tracking-[0.2em] uppercase">
              06
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Usage Examples
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            See the system in action.
            <span className="text-muted-foreground">
              {" "}
              Real patterns, real context.
            </span>
          </p>
        </div>

        {/* Example: Dashboard Card */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Dashboard Card
          </h3>

          <div className="border border-border rounded-lg p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-pink flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-primary font-semibold">
                    Active Campaign
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Running since Apr 1
                  </p>
                </div>
              </div>
              <span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-3 py-1.5 rounded-full">
                Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <span className="text-muted-foreground text-xs block mb-1">
                  Impressions
                </span>
                <span className="text-primary font-bold text-2xl">1.2M</span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs block mb-1">
                  Engagement
                </span>
                <span className="text-neon-purple font-bold text-2xl">
                  8.4%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs block mb-1">
                  Conversions
                </span>
                <span className="text-neon-orange font-bold text-2xl">
                  2.1K
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-md font-semibold text-sm">
                View Details
              </button>
              <button className="border border-border text-foreground px-4 py-2.5 rounded-md font-medium text-sm hover:border-foreground/50 transition-colors">
                Pause
              </button>
            </div>
          </div>
        </div>

        {/* Example: Notification */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-pink" />
            Notifications
          </h3>

          <div className="space-y-4 max-w-2xl">
            {/* Success */}
            <div className="border border-neon-green/30 bg-neon-green/5 rounded-lg p-4 flex items-start gap-4">
              <div className="text-neon-green shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-primary font-semibold text-sm mb-1">
                  Campaign launched
                </h4>
                <p className="text-foreground text-sm">
                  Your campaign &quot;Spring Drop&quot; is now live. Let&apos;s
                  fucking go.
                </p>
              </div>
            </div>

            {/* Warning */}
            <div className="border border-neon-orange/30 bg-neon-orange/5 rounded-lg p-4 flex items-start gap-4">
              <div className="text-neon-orange shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-primary font-semibold text-sm mb-1">
                  Budget running low
                </h4>
                <p className="text-foreground text-sm">
                  You&apos;ve used 85% of your monthly budget. Top up or
                  chill—your call.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="border border-neon-purple/30 bg-neon-purple/5 rounded-lg p-4 flex items-start gap-4">
              <div className="text-neon-purple shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-primary font-semibold text-sm mb-1">
                  New feature unlocked
                </h4>
                <p className="text-foreground text-sm">
                  You now have access to advanced analytics. About damn time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Example: Navigation */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-orange" />
            Navigation Pattern
          </h3>

          <div className="border border-border rounded-lg overflow-hidden max-w-4xl">
            {/* Header */}
            <div className="border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-primary font-bold tracking-tight text-lg">
                  zest
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-primary text-sm font-medium">
                  Dashboard
                </span>
                <span className="text-muted-foreground text-sm">Campaigns</span>
                <span className="text-muted-foreground text-sm">Analytics</span>
                <span className="text-muted-foreground text-sm">Settings</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-neon-pink/15 text-neon-pink text-xs font-semibold px-2 py-1 rounded">
                  Pro
                </span>
                <div className="w-8 h-8 rounded-full bg-neon-purple" />
              </div>
            </div>

            {/* Content Placeholder */}
            <div className="p-8">
              <div className="h-40 border border-dashed border-border rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Content Area
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Example: Data Table Row */}
        <div>
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Data Table
          </h3>

          <div className="border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border">
              <span className="col-span-4 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Campaign
              </span>
              <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Status
              </span>
              <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Reach
              </span>
              <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Engagement
              </span>
              <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Actions
              </span>
            </div>

            {/* Rows */}
            {[
              {
                name: "Summer Drop 2026",
                status: "Active",
                statusColor: "neon-green",
                reach: "2.4M",
                engagement: "12.3%",
              },
              {
                name: "Brand Awareness",
                status: "Paused",
                statusColor: "neon-orange",
                reach: "890K",
                engagement: "8.1%",
              },
              {
                name: "Product Launch",
                status: "Draft",
                statusColor: "neon-purple",
                reach: "—",
                engagement: "—",
              },
            ].map((row, index) => (
              <div
                key={row.name}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${
                  index !== 2 ? "border-b border-border" : ""
                } hover:bg-secondary/50 transition-colors`}
              >
                <div className="col-span-4">
                  <span className="text-primary font-medium">{row.name}</span>
                </div>
                <div className="col-span-2">
                  <span
                    className={`text-${row.statusColor} text-xs font-semibold`}
                  >
                    • {row.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-foreground">{row.reach}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-foreground">{row.engagement}</span>
                </div>
                <div className="col-span-2">
                  <button className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    Edit →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center border border-border rounded-lg p-12 lg:p-20">
          <span className="text-neon-green text-xs font-semibold tracking-[0.2em] uppercase block mb-6">
            Ready?
          </span>
          <h3 className="text-primary font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Now go build something
            <br />
            <span className="text-neon-pink">fucking incredible.</span>
          </h3>
          <p className="text-foreground max-w-xl mx-auto mb-10">
            You have the system. You have the voice. You have the colors.
            <span className="text-muted-foreground">
              {" "}
              No excuses. No compromises.
            </span>
          </p>
          <button className="bg-neon-green text-primary-foreground px-8 py-4 rounded-md font-bold text-lg hover:opacity-90 transition-opacity">
            Start Creating
          </button>
        </div>
      </div>
    </section>
  );
}
