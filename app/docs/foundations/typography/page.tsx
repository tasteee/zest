import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsSectionSubtitle,
	DocsText,
	DocsNote
} from '@/components/docs/mdx-components'
import { CodeBlock } from '@/components/docs/code-block'
import { z } from '@/components/ui'

const typeScale = [
	{
		name: 'Display',
		size: '72px / 4.5rem',
		weight: '700',
		lineHeight: '0.9',
		class: 'text-7xl font-bold leading-[0.9]',
		sample: 'Fuck it.'
	},
	{
		name: 'H1',
		size: '48px / 3rem',
		weight: '700',
		lineHeight: '1.0',
		class: 'text-5xl font-bold leading-tight',
		sample: 'Headlines that hit.'
	},
	{
		name: 'H2',
		size: '36px / 2.25rem',
		weight: '600',
		lineHeight: '1.1',
		class: 'text-4xl font-semibold leading-tight',
		sample: 'Section headers with attitude.'
	},
	{
		name: 'H3',
		size: '24px / 1.5rem',
		weight: '600',
		lineHeight: '1.2',
		class: 'text-2xl font-semibold leading-snug',
		sample: 'Subsection with purpose.'
	},
	{
		name: 'H4',
		size: '20px / 1.25rem',
		weight: '500',
		lineHeight: '1.3',
		class: 'text-xl font-medium leading-snug',
		sample: 'Component headers that guide.'
	},
	{
		name: 'Body',
		size: '16px / 1rem',
		weight: '400',
		lineHeight: '1.6',
		class: 'text-base font-normal leading-relaxed',
		sample: 'Body text that reads well and carries the message without stealing the spotlight.'
	},
	{
		name: 'Small',
		size: '14px / 0.875rem',
		weight: '400',
		lineHeight: '1.5',
		class: 'text-sm font-normal leading-normal',
		sample: 'Secondary text for additional context and descriptions.'
	},
	{
		name: 'Caption',
		size: '12px / 0.75rem',
		weight: '500',
		lineHeight: '1.4',
		class: 'text-xs font-medium leading-normal',
		sample: 'LABELS, METADATA, AND TIMESTAMPS'
	}
]

const weights = [
	{ name: 'Light', value: 300, class: 'font-light' },
	{ name: 'Regular', value: 400, class: 'font-normal' },
	{ name: 'Medium', value: 500, class: 'font-medium' },
	{ name: 'Semibold', value: 600, class: 'font-semibold' },
	{ name: 'Bold', value: 700, class: 'font-bold' },
	{ name: 'Black', value: 900, class: 'font-black' }
]

export default function TypographyPage() {
	return (
		<z.box>
			<DocsTitle>Typography</DocsTitle>
			<DocsDescription>DM Sans. Clean, geometric, unapologetic. One typeface. Infinite expression.</DocsDescription>

			<DocsSection>
				<DocsSectionTitle>Typeface</DocsSectionTitle>
				<z.box className='rounded-lg border border-border p-8'>
					<z.box className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8'>
						<z.box>
							<z.text className='text-neon-pink text-xs font-semibold tracking-[0.2em] uppercase block mb-3'>
								Primary Typeface
							</z.text>
							<z.text.h3 isPrimary isVeryBold>
								DM Sans
							</z.text.h3>
						</z.box>
						<z.box className='flex gap-2'>
							<z.badge isOutline isNeutral>
								Google Fonts
							</z.badge>
							<z.badge isOutline isNeutral>
								Open Source
							</z.badge>
						</z.box>
					</z.box>
					<z.text.body className='text-primary text-2xl leading-relaxed mb-4'>
						The quick brown fox jumps over the lazy dog.
					</z.text.body>
					<z.text.body className='text-foreground font-mono text-sm'>
						ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
					</z.text.body>
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Font Weights</DocsSectionTitle>
				<DocsText>DM Sans supports a full range of weights for creating visual hierarchy.</DocsText>
				<z.box className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					{weights.map((weight) => (
						<z.box key={weight.name} className='rounded-lg border border-border p-4 text-center'>
							<z.text className={`text-primary text-3xl block mb-2 ${weight.class}`}>Aa</z.text>
							<z.text className='text-foreground text-sm font-medium block'>{weight.name}</z.text>
							<z.text className='text-muted-foreground text-xs'>{weight.value}</z.text>
						</z.box>
					))}
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Type Scale</DocsSectionTitle>
				<DocsText>A carefully crafted type scale for consistent hierarchy across the interface.</DocsText>
				<z.box className='space-y-6'>
					{typeScale.map((type) => (
						<z.box
							key={type.name}
							className='flex flex-col lg:flex-row lg:items-center gap-4 py-6 border-b border-border last:border-b-0'
						>
							<z.box className='lg:w-24 shrink-0'>
								<z.badge isOutline isPurple className='text-xs'>
									{type.name}
								</z.badge>
							</z.box>
							<z.box className='flex-1 min-w-0'>
								<z.text.body className={`text-primary ${type.class} truncate`}>{type.sample}</z.text.body>
							</z.box>
							<z.box className='flex flex-wrap gap-2 lg:w-64 shrink-0'>
								<z.text className='text-muted-foreground text-xs border border-border px-2 py-1 rounded'>{type.size}</z.text>
								<z.text className='text-muted-foreground text-xs border border-border px-2 py-1 rounded'>{type.weight}</z.text>
								<z.text className='text-muted-foreground text-xs border border-border px-2 py-1 rounded'>
									LH {type.lineHeight}
								</z.text>
							</z.box>
						</z.box>
					))}
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Text Hierarchy</DocsSectionTitle>
				<DocsText>Use color alongside size to establish clear visual hierarchy.</DocsText>
				<z.box className='grid lg:grid-cols-2 gap-8'>
					<z.box className='space-y-4'>
						<z.text.h4 isPrimary isVeryBold>
							Headlines demand attention.
						</z.text.h4>
						<z.text.body className='text-foreground leading-relaxed'>
							Body text carries the message. It&apos;s readable, comfortable, and gets the job done without stealing the spotlight.
							Keep it gray, not neutral.
						</z.text.body>
						<z.text.body className='text-muted-foreground text-sm'>
							Secondary text provides context. It fades into the background while remaining accessible.
						</z.text.body>
						<z.box className='flex gap-3'>
							<z.text className='text-neon-purple text-xs font-semibold tracking-wider uppercase'>Label</z.text>
							<z.text className='text-neon-pink text-xs font-semibold tracking-wider uppercase'>Tag</z.text>
							<z.text className='text-neon-pink text-xs font-semibold tracking-wider uppercase'>Status</z.text>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-border p-6 space-y-3'>
						<z.box className='flex items-center justify-between py-2 border-b border-border'>
							<z.text className='text-primary font-semibold'>Neutral</z.text>
							<z.text className='text-neon-purple text-xs'>Headlines, CTAs</z.text>
						</z.box>
						<z.box className='flex items-center justify-between py-2 border-b border-border'>
							<z.text className='text-foreground'>Gray</z.text>
							<z.text className='text-neon-pink text-xs'>Body text</z.text>
						</z.box>
						<z.box className='flex items-center justify-between py-2 border-b border-border'>
							<z.text className='text-muted-foreground'>Muted</z.text>
							<z.text className='text-neon-purple text-xs'>Secondary</z.text>
						</z.box>
						<z.box className='flex items-center justify-between py-2'>
							<z.text className='text-neon-pink'>Brand</z.text>
							<z.text className='text-neon-pink text-xs'>Accents, labels</z.text>
						</z.box>
					</z.box>
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage in Code</DocsSectionTitle>

				<DocsSectionSubtitle>Layout Setup</DocsSectionSubtitle>
				<DocsText>Configure the font in your root layout:</DocsText>
				<CodeBlock
					code={`import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${dmSans.variable} font-sans antialiased\`}>
        {children}
      </body>
    </html>
  );
}`}
					language='tsx'
					filename='app/layout.tsx'
				/>

				<DocsSectionSubtitle>Tailwind Classes</DocsSectionSubtitle>
				<DocsText>Use utility classes to apply typography styles:</DocsText>
				<CodeBlock
					code={`// Headlines
<z.text.h1 isPrimary isVeryBold>
  Display Headline
</z.text.h1>

// Body text
<p className="text-base leading-relaxed text-foreground">
  Body copy with comfortable reading experience.
</p>

// Secondary text
<span className="text-sm text-muted-foreground">
  Supporting information
</span>

// Labels
<span className="text-xs font-semibold tracking-widest uppercase text-neon-purple">
  Category Label
</span>`}
					language='tsx'
					filename='Example.tsx'
				/>
			</DocsSection>

			<DocsNote>
				Always use the semantic text color classes (text-primary, text-foreground, text-muted-foreground) rather than arbitrary
				colors to maintain consistency.
			</DocsNote>
		</z.box>
	)
}
