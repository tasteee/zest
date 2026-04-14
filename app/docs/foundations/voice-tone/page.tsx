import {
  DocsTitle,
  DocsDescription,
  DocsSection,
  DocsSectionTitle,
  DocsText,
  DocsGrid,
} from "@/components/docs/mdx-components";

const voicePrinciples = [
  {
    title: "Direct",
    description: "Say what you mean. Mean what you say. No corporate fluff.",
    example: '"Join the club" not "We\'d love for you to consider joining our exclusive waitlist experience"',
    color: "neon-green",
  },
  {
    title: "Confident",
    description: "We know our shit. We\'re not afraid to show it.",
    example: '"This will change everything" not "We think this might possibly help"',
    color: "neon-pink",
  },
  {
    title: "Rebellious",
    description: "Challenge the status quo. Question everything. Rules are suggestions.",
    example: '"Fuck the algorithm" not "Working within platform guidelines"',
    color: "neon-purple",
  },
  {
    title: "Human",
    description: "Real talk with real people. Swear when it fits. Be the friend, not the brand.",
    example: '"We messed up, here\'s how we\'re fixing it" not "We apologize for any inconvenience"',
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

export default function VoiceTonePage() {
  return (
    <div>
      <DocsTitle>Voice & Tone</DocsTitle>
      <DocsDescription>
        How we sound. How we feel. How we hit different. Unapologetically us.
      </DocsDescription>

      <DocsSection>
        <DocsSectionTitle>Voice Principles</DocsSectionTitle>
        <DocsText>
          Our voice stays consistent. It&apos;s who we are, not how we&apos;re feeling.
        </DocsText>
        <DocsGrid columns={2}>
          {voicePrinciples.map((principle) => (
            <div
              key={principle.title}
              className="rounded-lg border border-border p-6 hover:border-foreground/30 transition-colors"
            >
              <h4 className={`text-${principle.color} font-bold text-xl mb-3`}>
                {principle.title}
              </h4>
              <p className="text-foreground mb-4">{principle.description}</p>
              <div className="border-t border-border pt-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  Example
                </span>
                <p className="text-sm text-foreground italic">{principle.example}</p>
              </div>
            </div>
          ))}
        </DocsGrid>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Tone Spectrum</DocsSectionTitle>
        <DocsText>
          Tone adapts to context. Same voice, different energy.
        </DocsText>
        <div className="rounded-lg border border-border overflow-hidden">
          {toneSpectrum.map((item, index) => (
            <div
              key={item.context}
              className={`flex flex-col md:flex-row md:items-center gap-4 p-4 ${
                index !== toneSpectrum.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="md:w-36 shrink-0">
                <span className="text-neon-orange text-xs font-semibold tracking-wider uppercase">
                  {item.context}
                </span>
              </div>
              <div className="md:w-40 shrink-0">
                <span className="text-primary font-medium">{item.tone}</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm italic">
                  &quot;{item.example}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>Writing Guidelines</DocsSectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-neon-green/30 p-6">
            <h4 className="text-neon-green font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sound Like This
            </h4>
            <ul className="space-y-3 text-sm text-foreground">
              <li>&quot;Let&apos;s fucking go.&quot;</li>
              <li>&quot;No cap, this slaps.&quot;</li>
              <li>&quot;Built different. Hits different.&quot;</li>
              <li>&quot;You in or you out?&quot;</li>
              <li>&quot;Real ones know.&quot;</li>
            </ul>
          </div>

          <div className="rounded-lg border border-neon-pink/30 p-6">
            <h4 className="text-neon-pink font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Never Sound Like This
            </h4>
            <ul className="space-y-3 text-sm text-foreground">
              <li>&quot;We&apos;re excited to announce...&quot;</li>
              <li>&quot;Please don&apos;t hesitate to reach out.&quot;</li>
              <li>&quot;Best-in-class synergy...&quot;</li>
              <li>&quot;We appreciate your patience.&quot;</li>
              <li>&quot;Circle back to leverage...&quot;</li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection>
        <DocsSectionTitle>UI Copy Guidelines</DocsSectionTitle>
        
        <div className="space-y-6">
          <div className="rounded-lg border border-border p-6">
            <h4 className="text-primary font-semibold mb-4">Buttons & CTAs</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neon-green text-xs uppercase tracking-wider block mb-2">Do</span>
                <ul className="space-y-1 text-foreground">
                  <li>&quot;Get started&quot;</li>
                  <li>&quot;Join now&quot;</li>
                  <li>&quot;Let&apos;s go&quot;</li>
                  <li>&quot;Save changes&quot;</li>
                </ul>
              </div>
              <div>
                <span className="text-neon-pink text-xs uppercase tracking-wider block mb-2">Don&apos;t</span>
                <ul className="space-y-1 text-muted-foreground line-through">
                  <li>&quot;Click here to begin&quot;</li>
                  <li>&quot;Submit your information&quot;</li>
                  <li>&quot;Proceed to next step&quot;</li>
                  <li>&quot;Update your settings&quot;</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border p-6">
            <h4 className="text-primary font-semibold mb-4">Error States</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neon-green text-xs uppercase tracking-wider block mb-2">Do</span>
                <ul className="space-y-1 text-foreground">
                  <li>&quot;Something broke. We&apos;re on it.&quot;</li>
                  <li>&quot;That didn&apos;t work. Try again?&quot;</li>
                  <li>&quot;Oops. Let&apos;s fix that.&quot;</li>
                </ul>
              </div>
              <div>
                <span className="text-neon-pink text-xs uppercase tracking-wider block mb-2">Don&apos;t</span>
                <ul className="space-y-1 text-muted-foreground line-through">
                  <li>&quot;An unexpected error has occurred&quot;</li>
                  <li>&quot;Please try again later&quot;</li>
                  <li>&quot;Error code: 500&quot;</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border p-6">
            <h4 className="text-primary font-semibold mb-4">Empty States</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neon-green text-xs uppercase tracking-wider block mb-2">Do</span>
                <ul className="space-y-1 text-foreground">
                  <li>&quot;Nothing here yet. Make some magic.&quot;</li>
                  <li>&quot;Your canvas is empty. Time to create.&quot;</li>
                  <li>&quot;No results. Try something else?&quot;</li>
                </ul>
              </div>
              <div>
                <span className="text-neon-pink text-xs uppercase tracking-wider block mb-2">Don&apos;t</span>
                <ul className="space-y-1 text-muted-foreground line-through">
                  <li>&quot;No items to display&quot;</li>
                  <li>&quot;This section is empty&quot;</li>
                  <li>&quot;0 results found&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection className="text-center">
        <blockquote className="text-primary font-bold text-3xl md:text-4xl leading-tight max-w-3xl mx-auto">
          &quot;Drop the base. It&apos;s cooler.&quot;
        </blockquote>
        <p className="text-muted-foreground mt-4">— The tasteink manifesto</p>
      </DocsSection>
    </div>
  );
}
