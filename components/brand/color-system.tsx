"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ColorSystemProps {
  onInView: () => void
}

const brandColors = [
  {
    name: "Neon Green",
    value: "#39FF14",
    oklch: "oklch(0.85 0.28 145)",
    usage: "Primary actions, success states, key highlights",
    variable: "--neon-green",
  },
  {
    name: "Neon Pink",
    value: "#FF1493",
    oklch: "oklch(0.75 0.25 350)",
    usage: "Secondary accents, badges, emphasis",
    variable: "--neon-pink",
  },
  {
    name: "Neon Purple",
    value: "#BF40BF",
    oklch: "oklch(0.7 0.25 300)",
    usage: "Tertiary accents, tags, categories",
    variable: "--neon-purple",
  },
  {
    name: "Neon Orange",
    value: "#FF6B35",
    oklch: "oklch(0.8 0.22 55)",
    usage: "Warnings, attention, call-outs",
    variable: "--neon-orange",
  },
]

const grayScale = [
  { name: "Pure White", value: "#FAFAFA", usage: "Headlines, primary text", class: "bg-primary" },
  { name: "Light Gray", value: "#A0A0A0", usage: "Body text, descriptions", class: "bg-foreground" },
  { name: "Muted Gray", value: "#707070", usage: "Secondary text, captions", class: "bg-muted-foreground" },
  { name: "Border", value: "#2A2F2A", usage: "Dividers, outlines", class: "bg-border" },
  { name: "Surface", value: "#141814", usage: "Cards, elevated surfaces", class: "bg-card" },
  { name: "Background", value: "#0A0F0A", usage: "Page background", class: "bg-background" },
]

export function ColorSystem({ onInView }: ColorSystemProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onInView()
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [onInView])

  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <section
      ref={sectionRef}
      id="colors"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-pink text-xs font-semibold tracking-[0.2em] uppercase">
              01
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Color System
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            Neons that cut through the dark. 
            <span className="text-muted-foreground"> No fucking blue. Ever.</span>
          </p>
        </div>

        {/* Brand Colors */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Brand Neons
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <div
                key={color.name}
                className="group border border-border rounded-lg overflow-hidden hover:border-foreground/30 transition-colors cursor-pointer"
                onClick={() => copyToClipboard(color.value, color.name)}
              >
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: color.value }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary font-semibold">{color.name}</span>
                    <span className={cn(
                      "text-xs transition-opacity",
                      copiedColor === color.name ? "text-neon-green opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                    )}>
                      {copiedColor === color.name ? "Copied!" : "Click to copy"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{color.usage}</p>
                  <div className="flex flex-col gap-1">
                    <code className="text-xs text-foreground font-mono">{color.value}</code>
                    <code className="text-xs text-muted-foreground font-mono">{color.oklch}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grayscale */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            Grayscale Palette
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {grayScale.map((gray) => (
              <div
                key={gray.name}
                className="group cursor-pointer"
                onClick={() => copyToClipboard(gray.value, gray.name)}
              >
                <div
                  className={cn(
                    "h-20 w-full rounded-lg border border-border mb-3",
                    gray.class
                  )}
                />
                <span className="text-primary text-sm font-medium block mb-1">{gray.name}</span>
                <span className="text-muted-foreground text-xs block mb-1">{gray.usage}</span>
                <code className="text-xs text-foreground font-mono">{gray.value}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Rules */}
        <div className="border border-border rounded-lg p-8 lg:p-12">
          <h3 className="text-primary font-semibold text-xl mb-8">Usage Rules</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-neon-green font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Do This
              </h4>
              <ul className="space-y-3 text-foreground text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-neon-green mt-1">•</span>
                  <span>Use <span className="text-neon-green">neon colors</span> for interactive elements, badges, and key highlights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-green mt-1">•</span>
                  <span>Maintain high contrast between text and backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-green mt-1">•</span>
                  <span>Use <span className="text-primary font-semibold">white</span> sparingly for hierarchy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-green mt-1">•</span>
                  <span>Scatter brand colors throughout the UI—don&apos;t be shy</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-neon-pink font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Never Do This
              </h4>
              <ul className="space-y-3 text-foreground text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-neon-pink mt-1">•</span>
                  <span>Never use <span className="text-muted-foreground line-through">blue</span>. Seriously. Not even close.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-pink mt-1">•</span>
                  <span>Don&apos;t place similar background colors on top of each other</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-pink mt-1">•</span>
                  <span>Avoid pure black (#000000) backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon-pink mt-1">•</span>
                  <span>Don&apos;t use neon colors for large text blocks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
