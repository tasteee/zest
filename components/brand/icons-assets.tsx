"use client";

import { useEffect, useRef } from "react";
import * as Phosphor from "@phosphor-icons/react";
import { TasteinkLogo } from "./tasteink-logo";

type IconsAssetsPropsT = {
  onInView: () => void;
};

type IconEntryT = {
  name: string;
  component: React.ElementType;
};

const iconEntries: IconEntryT[] = [
  { name: "ArrowRight", component: Phosphor.ArrowRight },
  { name: "Check", component: Phosphor.Check },
  { name: "X", component: Phosphor.X },
  { name: "Plus", component: Phosphor.Plus },
  { name: "Star", component: Phosphor.Star },
  { name: "Heart", component: Phosphor.Heart },
  { name: "Fire", component: Phosphor.Fire },
  { name: "Lightning", component: Phosphor.Lightning },
  { name: "MagnifyingGlass", component: Phosphor.MagnifyingGlass },
  { name: "ChatCircle", component: Phosphor.ChatCircle },
  { name: "User", component: Phosphor.User },
  { name: "Bell", component: Phosphor.Bell },
  { name: "Gear", component: Phosphor.Gear },
  { name: "Download", component: Phosphor.Download },
  { name: "Upload", component: Phosphor.Upload },
  { name: "Trash", component: Phosphor.Trash },
  { name: "PencilSimple", component: Phosphor.PencilSimple },
  { name: "Camera", component: Phosphor.Camera },
  { name: "House", component: Phosphor.House },
  { name: "Globe", component: Phosphor.Globe },
];

type ColorShowcaseEntryT = {
  label: string;
  colorClass: string;
};

const colorShowcaseEntries: ColorShowcaseEntryT[] = [
  { label: "Default", colorClass: "text-foreground" },
  { label: "Success", colorClass: "text-neon-green" },
  { label: "Accent", colorClass: "text-neon-pink" },
  { label: "Info", colorClass: "text-neon-purple" },
  { label: "Warning", colorClass: "text-neon-orange" },
  { label: "Muted", colorClass: "text-muted-foreground" },
];

type WeightShowcaseEntryT = {
  label: string;
  weight: Phosphor.IconWeight;
};

const weightShowcaseEntries: WeightShowcaseEntryT[] = [
  { label: "Thin", weight: "thin" },
  { label: "Light", weight: "light" },
  { label: "Regular", weight: "regular" },
  { label: "Bold", weight: "bold" },
  { label: "Fill", weight: "fill" },
  { label: "Duotone", weight: "duotone" },
];

export const IconsAssets = (props: IconsAssetsPropsT) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry != null && entry.isIntersecting;
        if (isIntersecting) props.onInView();
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [props.onInView]);

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

        {/* Standard Banner */}
        <div className="mb-16 border border-neon-green/30 rounded-lg p-6 bg-neon-green/5">
          <div className="flex items-start gap-4">
            <Phosphor.Checks
              size={24}
              weight="bold"
              className="text-neon-green mt-0.5 shrink-0"
            />
            <div>
              <h3 className="text-primary font-semibold text-base mb-1">
                Phosphor Icons — Official Standard
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All icons in this product use{" "}
                <span className="text-neon-green font-semibold">
                  @phosphor-icons/react
                </span>
                . Do not use lucide-react, heroicons, or custom inline SVGs.
                Phosphor provides 1,248+ icons in 6 weights: thin, light,
                regular, bold, fill, and duotone.
              </p>
              <code className="mt-3 block text-xs font-mono text-neon-orange bg-black/30 px-3 py-2 rounded">
                {`import * as Phosphor from "@phosphor-icons/react";`}
              </code>
            </div>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-orange" />
            Icon Set
          </h3>

          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {iconEntries.map((iconEntry) => {
              const IconComponent = iconEntry.component;
              return (
                <div
                  key={iconEntry.name}
                  className="aspect-square border border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-foreground/30 transition-colors group cursor-pointer py-2"
                >
                  <div className="text-foreground group-hover:text-neon-green transition-colors">
                    <IconComponent size={24} weight="regular" />
                  </div>
                  <span className="text-muted-foreground text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-center px-1 leading-tight">
                    {iconEntry.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weights */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-pink" />
            Icon Weights
          </h3>

          <div className="border border-border rounded-lg p-8">
            <div className="flex flex-wrap gap-10">
              {weightShowcaseEntries.map((weightEntry) => {
                return (
                  <div
                    key={weightEntry.label}
                    className="flex flex-col items-center gap-3"
                  >
                    <Phosphor.Star
                      size={32}
                      weight={weightEntry.weight}
                      className="text-foreground"
                    />
                    <span className="text-muted-foreground text-xs font-mono">
                      {weightEntry.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Icon Colors */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Icon Colors
          </h3>

          <div className="border border-border rounded-lg p-8">
            <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-6">
              Semantic Colors
            </span>
            <div className="flex flex-wrap gap-8">
              {colorShowcaseEntries.map((colorEntry) => {
                return (
                  <div key={colorEntry.label} className={colorEntry.colorClass}>
                    <Phosphor.Lightning size={32} weight="bold" />
                    <span className="text-xs mt-2 block">
                      {colorEntry.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Usage
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <span className="text-neon-green text-xs font-semibold tracking-wider uppercase block mb-4">
                Do
              </span>
              <code className="text-sm font-mono text-foreground leading-relaxed whitespace-pre block">
                {`// Namespace import (preferred)\nimport * as Phosphor from "@phosphor-icons/react";\n\n<Phosphor.ArrowRight size={20} weight="regular" />`}
              </code>
            </div>
            <div className="border border-border rounded-lg p-6">
              <span className="text-neon-pink text-xs font-semibold tracking-wider uppercase block mb-4">
                Don&apos;t
              </span>
              <code className="text-sm font-mono text-muted-foreground leading-relaxed line-through whitespace-pre block">
                {`import { ArrowRight } from "lucide-react";\n\n<svg viewBox="0 0 24 24">...\n\n<img src="/icons/arrow.svg" />`}
              </code>
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
            <div className="border border-border rounded-lg p-12 flex flex-col items-center justify-center">
              <TasteinkLogo scale={2} />
              <span className="text-muted-foreground text-xs tracking-wider uppercase mt-8">
                Primary Lockup
              </span>
            </div>

            <div className="border border-border rounded-lg p-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-neon-green mb-8" />
              <span className="text-muted-foreground text-xs tracking-wider uppercase">
                Icon Mark
              </span>
            </div>
          </div>

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
              {[4, 8, 12, 16, 24, 32, 48, 64].map((space) => {
                return (
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
                );
              })}
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
};
