"use client";

import { useEffect, useRef } from "react";
import { TasteinkLogo } from "./tasteink-logo";

interface HeroSectionProps {
  onInView: () => void;
}

export function HeroSection({ onInView }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onInView();
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Overline */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-neon-green text-xs font-semibold tracking-[0.2em] uppercase">
            Brand System
          </span>
          <div className="h-px flex-1 max-w-24 bg-border" />
          <span className="text-muted-foreground text-xs tracking-wider">
            v1.0
          </span>
        </div>

        {/* Main Title */}
        <div className="mb-20 pt-12">
          <TasteinkLogo scale={5} />
        </div>

        {/* Tagline */}
        <p className="text-foreground text-xl md:text-2xl lg:text-3xl font-light max-w-2xl leading-relaxed mb-16">
          Same great value, great new{" "}
          <span className="text-neon-pink font-black italic">taste.</span>
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 border-t border-border pt-12">
          <div>
            <span className="text-neon-orange text-3xl md:text-4xl font-bold block mb-2">
              4
            </span>
            <span className="text-muted-foreground text-sm">Brand Colors</span>
          </div>
          <div>
            <span className="text-neon-green text-3xl md:text-4xl font-bold block mb-2">
              DM
            </span>
            <span className="text-muted-foreground text-sm">Sans Typeface</span>
          </div>
          <div>
            <span className="text-neon-pink text-3xl md:text-4xl font-bold block mb-2">
              ∞
            </span>
            <span className="text-muted-foreground text-sm">Possibilities</span>
          </div>
          <div>
            <span className="text-neon-purple text-3xl md:text-4xl font-bold block mb-2">
              0
            </span>
            <span className="text-muted-foreground text-sm">Compromises</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center gap-4">
          <div className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-neon-green rounded-full animate-bounce" />
          </div>
          <span className="text-muted-foreground text-xs tracking-wider uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
