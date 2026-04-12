"use client";

import { useEffect, useRef } from "react";

interface TypographySystemProps {
  onInView: () => void;
}

const typeScale = [
  {
    name: "Display",
    size: "72px / 4.5rem",
    weight: "700",
    lineHeight: "0.9",
    class: "text-7xl font-bold leading-[0.9]",
  },
  {
    name: "H1",
    size: "48px / 3rem",
    weight: "700",
    lineHeight: "1.0",
    class: "text-5xl font-bold leading-tight",
  },
  {
    name: "H2",
    size: "36px / 2.25rem",
    weight: "600",
    lineHeight: "1.1",
    class: "text-4xl font-semibold leading-tight",
  },
  {
    name: "H3",
    size: "24px / 1.5rem",
    weight: "600",
    lineHeight: "1.2",
    class: "text-2xl font-semibold leading-snug",
  },
  {
    name: "H4",
    size: "20px / 1.25rem",
    weight: "500",
    lineHeight: "1.3",
    class: "text-xl font-medium leading-snug",
  },
  {
    name: "Body",
    size: "16px / 1rem",
    weight: "400",
    lineHeight: "1.6",
    class: "text-base font-normal leading-relaxed",
  },
  {
    name: "Small",
    size: "14px / 0.875rem",
    weight: "400",
    lineHeight: "1.5",
    class: "text-sm font-normal leading-normal",
  },
  {
    name: "Caption",
    size: "12px / 0.75rem",
    weight: "500",
    lineHeight: "1.4",
    class: "text-xs font-medium leading-normal",
  },
];

const weights = [
  { name: "Light", value: 300 },
  { name: "Regular", value: 400 },
  { name: "Medium", value: 500 },
  { name: "Semibold", value: 600 },
  { name: "Bold", value: 700 },
  { name: "Black", value: 900 },
];

export function TypographySystem({ onInView }: TypographySystemProps) {
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
      id="typography"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-purple text-xs font-semibold tracking-[0.2em] uppercase">
              02
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Typography
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            DM Sans. Clean, geometric, unapologetic.
            <span className="text-muted-foreground">
              {" "}
              One typeface. Infinite expression.
            </span>
          </p>
        </div>

        {/* Typeface Showcase */}
        <div className="mb-24 border border-border rounded-lg p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-neon-orange text-xs font-semibold tracking-[0.2em] uppercase block mb-4">
                Primary Typeface
              </span>
              <h3 className="text-primary font-bold text-6xl md:text-7xl lg:text-8xl tracking-tight">
                DM Sans
              </h3>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground text-sm border border-border px-3 py-1 rounded">
                Google Fonts
              </span>
              <span className="text-muted-foreground text-sm border border-border px-3 py-1 rounded">
                Open Source
              </span>
            </div>
          </div>

          <p className="text-primary text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl">
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-foreground text-lg leading-relaxed mt-4 max-w-3xl">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-2 max-w-3xl">
            abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&*()
          </p>
        </div>

        {/* Weights */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Font Weights
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {weights.map((weight) => (
              <div
                key={weight.name}
                className="border border-border rounded-lg p-6 text-center"
              >
                <span
                  className="text-primary text-4xl block mb-4"
                  style={{ fontWeight: weight.value }}
                >
                  Aa
                </span>
                <span className="text-foreground text-sm font-medium block">
                  {weight.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {weight.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Scale */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Type Scale
          </h3>

          <div className="space-y-8">
            {typeScale.map((type) => (
              <div
                key={type.name}
                className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 py-6 border-b border-border"
              >
                <div className="lg:w-48 shrink-0">
                  <span className="text-neon-green text-xs font-semibold tracking-wider uppercase">
                    {type.name}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`text-primary ${type.class}`}>
                    Fuck it, I guess.
                  </p>
                </div>
                <div className="lg:w-64 shrink-0 flex flex-wrap gap-3">
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
        </div>

        {/* Text Hierarchy */}
        <div className="border border-border rounded-lg p-8 lg:p-12">
          <h3 className="text-primary font-semibold text-xl mb-8">
            Text Hierarchy in Action
          </h3>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-primary font-bold text-3xl leading-tight">
                Headlines demand attention.
              </h4>
              <p className="text-foreground leading-relaxed">
                Body text carries the message. It&apos;s readable, comfortable,
                and gets the job done without stealing the spotlight. Keep it
                gray, not white.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Secondary text provides context and additional information. It
                fades into the background while remaining accessible.
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

            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">White</span>
                <span className="text-neon-green text-xs">Headlines, CTAs</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-foreground">Gray</span>
                <span className="text-neon-pink text-xs">Body text</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Muted</span>
                <span className="text-neon-purple text-xs">Secondary</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-neon-orange">Brand</span>
                <span className="text-neon-orange text-xs">
                  Accents, labels
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
