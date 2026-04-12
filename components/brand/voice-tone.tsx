"use client";

import { useEffect, useRef } from "react";

interface VoiceToneProps {
  onInView: () => void;
}

const voicePrinciples = [
  {
    title: "Direct",
    description: "I don't always say what I mean, but when I do, I mean it.",
    example:
      '"Join the club" not "We\'d love for you to consider joining our exclusive waitlist experience"',
    color: "neon-green",
  },
  {
    title: "Confident",
    description: "I know my shit and I'm not afraid to say so.",
    example:
      '"This will change everything" not "We think this might possibly help"',
    color: "neon-pink",
  },
  {
    title: "Rebellious",
    description:
      "Challenge the status quo. Question everything. Rules are suggestions.",
    example: '"Fuck the algorithm" not "Working within platform guidelines"',
    color: "neon-purple",
  },
  {
    title: "Human",
    description:
      "Real talk with real people. Swear when it fits. Be the friend, not the brand.",
    example:
      '"We messed up, here\'s how we\'re fixing it" not "We apologize for any inconvenience"',
    color: "neon-orange",
  },
];

const toneSpectrum = [
  {
    context: "Error messages",
    tone: "Calm + Direct",
    example: "Something broke. We're on it.",
  },
  {
    context: "Success states",
    tone: "Celebratory",
    example: "Fuck yes. You did it.",
  },
  {
    context: "Onboarding",
    tone: "Warm + Guiding",
    example: "Let's get you set up. No bullshit, promise.",
  },
  {
    context: "Marketing",
    tone: "Bold + Provocative",
    example: "Ready to stop playing it safe?",
  },
  {
    context: "Support",
    tone: "Empathetic + Honest",
    example: "That sucks. Here's what we can do.",
  },
];

export function VoiceTone({ onInView }: VoiceToneProps) {
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
      id="voice"
      className="min-h-screen px-6 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-neon-green text-xs font-semibold tracking-[0.2em] uppercase">
              04
            </span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
          <h2 className="text-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Voice & Tone
          </h2>
          <p className="text-foreground text-lg max-w-2xl leading-relaxed">
            How we sound. How we feel. How we hit different.
            <span className="text-muted-foreground"> Unapologetically us.</span>
          </p>
        </div>

        {/* Voice Principles */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-pink" />
            Voice Principles
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {voicePrinciples.map((principle) => (
              <div
                key={principle.title}
                className="border border-border rounded-lg p-8 hover:border-foreground/30 transition-colors"
              >
                <h4
                  className={`text-${principle.color} font-bold text-2xl mb-4`}
                >
                  {principle.title}
                </h4>
                <p className="text-foreground mb-6 leading-relaxed">
                  {principle.description}
                </p>
                <div className="border-t border-border pt-6">
                  <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-2">
                    Example
                  </span>
                  <p className="text-foreground text-sm italic">
                    {principle.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tone Spectrum */}
        <div className="mb-24">
          <h3 className="text-primary font-semibold text-xl mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Tone Spectrum
          </h3>

          <div className="border border-border rounded-lg overflow-hidden">
            {toneSpectrum.map((item, index) => (
              <div
                key={item.context}
                className={`flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-6 ${
                  index !== toneSpectrum.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="lg:w-40 shrink-0">
                  <span className="text-neon-orange text-xs font-semibold tracking-wider uppercase">
                    {item.context}
                  </span>
                </div>
                <div className="lg:w-40 shrink-0">
                  <span className="text-foreground font-medium">
                    {item.tone}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm italic">
                    &quot;{item.example}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="border border-neon-green/30 rounded-lg p-8">
            <h4 className="text-neon-green font-bold text-xl mb-6 flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Sound Like This
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">•</span>
                <span className="text-foreground">
                  &quot;Let&apos;s fucking go.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">•</span>
                <span className="text-foreground">
                  &quot;No cap, this slaps.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">•</span>
                <span className="text-foreground">
                  &quot;Built different. Hits different.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">•</span>
                <span className="text-foreground">
                  &quot;You in or you out?&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">•</span>
                <span className="text-foreground">
                  &quot;Real ones know.&quot;
                </span>
              </li>
            </ul>
          </div>

          <div className="border border-neon-pink/30 rounded-lg p-8">
            <h4 className="text-neon-pink font-bold text-xl mb-6 flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Never Sound Like This
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-neon-pink mt-1">•</span>
                <span className="text-foreground">
                  &quot;We&apos;re excited to announce...&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-pink mt-1">•</span>
                <span className="text-foreground">
                  &quot;Please don&apos;t hesitate to reach out.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-pink mt-1">•</span>
                <span className="text-foreground">
                  &quot;Best-in-class synergy...&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-pink mt-1">•</span>
                <span className="text-foreground">
                  &quot;We appreciate your patience.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-pink mt-1">•</span>
                <span className="text-foreground">
                  &quot;Circle back to leverage...&quot;
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Quote */}
        <div className="mt-24 text-center">
          <blockquote className="text-primary font-bold text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto">
            Drop the base.
          </blockquote>
        </div>

        <div className="mt-2 text-center">
          <blockquote className="text-primary font-bold text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto">
            Its cooler.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
