"use client";

import { useEffect, useRef } from "react";
import { TasteinkLogo } from "./tasteink-logo";

interface IconsAssetsProps {
  onInView: () => void;
}

const icons = [
  {
    name: "Arrow",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    ),
  },
  {
    name: "Check",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    name: "Close",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  },
  {
    name: "Plus",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: "Star",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    name: "Heart",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    name: "Fire",
    svg: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
  },
  {
    name: "Bolt",
    svg: (
      <svg
        className="w-6 h-6"
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
    ),
  },
];

export function IconsAssets({ onInView }: IconsAssetsProps) {
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
      id="icons"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-pink text-xs font-semibold tracking-[0.2em] uppercase">
              05
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Icons & Assets
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            Minimal. Functional. Sharp as fuck.
            <span className="text-muted-foreground">
              {" "}
              Every pixel has purpose.
            </span>
          </p>
        </div>

        {/* Icon Grid */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-orange" />
            Icon Set
          </h3>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {icons.map((icon) => (
              <div
                key={icon.name}
                className="aspect-square border border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-foreground/30 transition-colors group cursor-pointer"
              >
                <div className="text-foreground group-hover:text-neon-green transition-colors">
                  {icon.svg}
                </div>
                <span className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>

          {/* Icon in Colors */}
          <div className="mt-8 border border-border rounded-lg p-8">
            <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-6">
              Icon Colors
            </span>
            <div className="flex flex-wrap gap-8">
              <div className="text-foreground">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Default</span>
              </div>
              <div className="text-neon-green">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Success</span>
              </div>
              <div className="text-neon-pink">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Accent</span>
              </div>
              <div className="text-neon-purple">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Info</span>
              </div>
              <div className="text-neon-orange">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Warning</span>
              </div>
              <div className="text-muted-foreground">
                <svg
                  className="w-8 h-8"
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
                <span className="text-xs mt-2 block">Muted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Logo Mark
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Logo */}
            <div className="border border-border rounded-lg p-12 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-4 rounded-full bg-neon-green" />
                <span className="text-primary font-bold tracking-tight text-lg">
                  zest
                </span>
              </div>
              <span className="text-muted-foreground text-xs tracking-wider uppercase">
                Primary Lockup
              </span>
            </div>

            {/* Icon Only */}
            <div className="border border-border rounded-lg p-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-neon-green mb-8" />
              <span className="text-muted-foreground text-xs tracking-wider uppercase">
                Icon Mark
              </span>
            </div>
          </div>

          {/* Clear Space */}
          <div className="mt-8 border border-border rounded-lg p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-primary font-semibold mb-2">Clear Space</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  Maintain minimum clear space equal to the height of the icon
                  mark around all logo usage.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neon-pink text-xs font-semibold">
                  Min: 24px
                </span>
                <span className="text-neon-green text-xs font-semibold">
                  Preferred: 48px
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Spacing System
          </h3>

          <div className="border border-border rounded-lg p-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((space) => (
                <div key={space} className="text-center">
                  <div
                    className="bg-neon-green/20 border border-neon-green/50 mx-auto mb-2"
                    style={{
                      width: `${Math.min(space, 64)}px`,
                      height: `${Math.min(space, 64)}px`,
                    }}
                  />
                  <span className="text-foreground text-xs font-mono">
                    {space}px
                  </span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Use consistent spacing increments. Spacious layouts feel premium.
              Cramped layouts feel desperate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
