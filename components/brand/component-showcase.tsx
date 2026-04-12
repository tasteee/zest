"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ComponentShowcaseProps {
  onInView: () => void
}

export function ComponentShowcase({ onInView }: ComponentShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("primary")

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

  return (
    <section
      ref={sectionRef}
      id="components"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-orange text-xs font-semibold tracking-[0.2em] uppercase">
              03
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Components
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            Flat. No shadows. Accessible borders.
            <span className="text-muted-foreground"> Ultra premium, zero bullshit.</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Buttons
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Primary Buttons */}
            <div className="border border-border rounded-lg p-8">
              <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-6">Primary Actions</span>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
                  Get Started
                </button>
                <button className="bg-neon-green text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
                  Let&apos;s Go
                </button>
                <button className="bg-neon-pink text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
                  Fuck Yeah
                </button>
              </div>
            </div>
            
            {/* Secondary Buttons */}
            <div className="border border-border rounded-lg p-8">
              <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-6">Secondary Actions</span>
              <div className="flex flex-wrap gap-4">
                <button className="border border-border text-foreground px-6 py-3 rounded-md font-medium hover:border-foreground/50 transition-colors">
                  Learn More
                </button>
                <button className="border border-neon-green text-neon-green px-6 py-3 rounded-md font-medium hover:bg-neon-green/10 transition-colors">
                  Explore
                </button>
                <button className="text-neon-purple font-medium px-6 py-3 hover:opacity-70 transition-opacity">
                  Skip →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Badges & Tags */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-pink" />
            Badges & Tags
          </h3>
          
          <div className="border border-border rounded-lg p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-3 py-1.5 rounded-full">Active</span>
              <span className="bg-neon-pink/15 text-neon-pink text-xs font-semibold px-3 py-1.5 rounded-full">Featured</span>
              <span className="bg-neon-purple/15 text-neon-purple text-xs font-semibold px-3 py-1.5 rounded-full">New</span>
              <span className="bg-neon-orange/15 text-neon-orange text-xs font-semibold px-3 py-1.5 rounded-full">Hot</span>
              <span className="border border-border text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">Default</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="text-neon-green text-xs font-semibold tracking-wider uppercase">• Online</span>
              <span className="text-neon-pink text-xs font-semibold tracking-wider uppercase">• Premium</span>
              <span className="text-neon-orange text-xs font-semibold tracking-wider uppercase">• Limited</span>
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">• Archived</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Cards
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-2 py-1 rounded">Active</span>
                <span className="text-muted-foreground text-xs">2 min ago</span>
              </div>
              <h4 className="text-primary font-semibold text-lg mb-2">Project Alpha</h4>
              <p className="text-foreground text-sm mb-4">Breaking conventions since day one. No rules, just results.</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neon-pink" />
                <span className="text-muted-foreground text-sm">@creator</span>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-neon-purple/15 text-neon-purple text-xs font-semibold px-2 py-1 rounded">Draft</span>
                <span className="text-muted-foreground text-xs">Yesterday</span>
              </div>
              <h4 className="text-primary font-semibold text-lg mb-2">Campaign Beta</h4>
              <p className="text-foreground text-sm mb-4">Still cooking. The best things take time to burn bright.</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neon-orange" />
                <span className="text-muted-foreground text-sm">@team</span>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-xs font-medium border border-border px-2 py-1 rounded">Archived</span>
                <span className="text-muted-foreground text-xs">Last week</span>
              </div>
              <h4 className="text-primary font-semibold text-lg mb-2">Legacy Drop</h4>
              <p className="text-foreground text-sm mb-4">Done and dusted. History in the making.</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-foreground/50" />
                <span className="text-muted-foreground text-sm">@archive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-orange" />
            Tabs & Navigation
          </h3>
          
          <div className="border border-border rounded-lg p-8">
            <div className="flex gap-1 mb-6 border-b border-border">
              {["primary", "secondary", "tertiary"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors relative",
                    activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <p className="text-foreground">
                {activeTab === "primary" && "Primary content area. The main stage."}
                {activeTab === "secondary" && "Secondary content. Supporting act."}
                {activeTab === "tertiary" && "Tertiary content. The encore."}
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Form Elements
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-foreground text-sm font-medium block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-foreground text-sm font-medium block mb-2">Message</label>
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-neon-green focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-6 space-y-4">
              <span className="text-muted-foreground text-xs tracking-wider uppercase block">Input States</span>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-border" />
                <span className="text-foreground text-sm">Default</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-neon-green" />
                <span className="text-foreground text-sm">Focused / Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-neon-pink" />
                <span className="text-foreground text-sm">Error</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground text-sm">Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
