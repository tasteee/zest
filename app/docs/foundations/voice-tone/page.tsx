import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsText,
	DocsGrid
} from '@/components/docs/mdx-components'
import { z } from '@/components/ui'
import { Check, X } from 'lucide-react'

const voicePrinciples = [
	{
		title: 'Direct',
		description: 'Say what you mean. Mean what you say. No corporate fluff.',
		example: '"Join the club" not "We\'d love for you to consider joining our exclusive waitlist experience"',
		color: 'neon-purple'
	},
	{
		title: 'Confident',
		description: "We know our craft. We\'re not afraid to show it.",
		example: '"This will change everything" not "We think this might possibly help"',
		color: 'neon-pink'
	},
	{
		title: 'Rebellious',
		description: 'Challenge the status quo. Question everything. Rules are suggestions.',
		example: '"Outshine the algorithm" not "Working within platform guidelines"',
		color: 'neon-purple'
	},
	{
		title: 'Human',
		description: 'Real talk with real people. Swear when it fits. Be the friend, not the brand.',
		example: '"We messed up, here\'s how we\'re fixing it" not "We apologize for any inconvenience"',
		color: 'neon-pink'
	}
]

const toneSpectrum = [
	{
		context: 'Error messages',
		tone: 'Calm + Direct',
		example: "Something broke. We're on it."
	},
	{
		context: 'Success states',
		tone: 'Celebratory',
		example: 'Iconic. You did it.'
	},
	{
		context: 'Onboarding',
		tone: 'Warm + Guiding',
		example: "Let's get you set up. No fluff, promise."
	},
	{
		context: 'Marketing',
		tone: 'Bold + Provocative',
		example: 'Ready to stop playing it safe?'
	},
	{
		context: 'Support',
		tone: 'Empathetic + Honest',
		example: "That stings. Here's what we can do."
	}
]

export default function VoiceTonePage() {
	return (
		<z.box>
			<DocsTitle>Voice & Tone</DocsTitle>
			<DocsDescription>How we sound. How we feel. How we hit different. Unapologetically us.</DocsDescription>

			<DocsSection>
				<DocsSectionTitle>Voice Principles</DocsSectionTitle>
				<DocsText>Our voice stays consistent. It&apos;s who we are, not how we&apos;re feeling.</DocsText>
				<DocsGrid columns={2}>
					{voicePrinciples.map((principle) => (
						<z.box
							key={principle.title}
							className='rounded-lg border border-border p-6 hover:border-foreground/30 transition-colors'
						>
							<z.text.h4 isVeryBold className={`text-${principle.color} mb-3`}>
								{principle.title}
							</z.text.h4>
							<z.text.body className='text-foreground mb-4'>{principle.description}</z.text.body>
							<z.box className='border-t border-border pt-4'>
								<z.text className='text-xs text-muted-foreground uppercase tracking-wider block mb-2'>Example</z.text>
								<z.text.body className='text-sm text-foreground italic'>{principle.example}</z.text.body>
							</z.box>
						</z.box>
					))}
				</DocsGrid>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Tone Spectrum</DocsSectionTitle>
				<DocsText>Tone adapts to context. Same voice, different energy.</DocsText>
				<z.box className='rounded-lg border border-border overflow-hidden'>
					{toneSpectrum.map((item, index) => (
						<z.box
							key={item.context}
							className={`flex flex-col md:flex-row md:items-center gap-4 p-4 ${
								index !== toneSpectrum.length - 1 ? 'border-b border-border' : ''
							}`}
						>
							<z.box className='md:w-36 shrink-0'>
								<z.text className='text-neon-pink text-xs font-semibold tracking-wider uppercase'>{item.context}</z.text>
							</z.box>
							<z.box className='md:w-40 shrink-0'>
								<z.text className='text-primary font-medium'>{item.tone}</z.text>
							</z.box>
							<z.box className='flex-1'>
								<z.text.body className='text-muted-foreground text-sm italic'>&quot;{item.example}&quot;</z.text.body>
							</z.box>
						</z.box>
					))}
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Writing Guidelines</DocsSectionTitle>

				<z.box className='grid md:grid-cols-2 gap-6'>
					<z.box className='rounded-lg border border-neon-purple/30 p-6'>
						<z.text.h4 isPurple isBold className='mb-4 flex items-center gap-2'>
							<Check className='w-4 h-4' />
							Sound Like This
						</z.text.h4>
						<z.box as='ul' className='space-y-3 text-sm text-foreground'>
							<z.box as='li'>&quot;Let&apos;s go full voltage.&quot;</z.box>
							<z.box as='li'>&quot;No cap, this slaps.&quot;</z.box>
							<z.box as='li'>&quot;Built different. Hits different.&quot;</z.box>
							<z.box as='li'>&quot;You in or you out?&quot;</z.box>
							<z.box as='li'>&quot;Real ones know.&quot;</z.box>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-neon-pink/30 p-6'>
						<z.text.h4 isPink isBold className='mb-4 flex items-center gap-2'>
							<X className='w-4 h-4' />
							Never Sound Like This
						</z.text.h4>
						<z.box as='ul' className='space-y-3 text-sm text-foreground'>
							<z.box as='li'>&quot;We&apos;re excited to announce...&quot;</z.box>
							<z.box as='li'>&quot;Please don&apos;t hesitate to reach out.&quot;</z.box>
							<z.box as='li'>&quot;Best-in-class synergy...&quot;</z.box>
							<z.box as='li'>&quot;We appreciate your patience.&quot;</z.box>
							<z.box as='li'>&quot;Circle back to leverage...&quot;</z.box>
						</z.box>
					</z.box>
				</z.box>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>UI Copy Guidelines</DocsSectionTitle>

				<z.box className='space-y-6'>
					<z.box className='rounded-lg border border-border p-6'>
						<z.text.h4 isPrimary isBold className='mb-4'>
							Buttons & CTAs
						</z.text.h4>
						<z.box className='grid md:grid-cols-2 gap-4 text-sm'>
							<z.box>
								<z.text className='text-neon-purple text-xs uppercase tracking-wider block mb-2'>Do</z.text>
								<z.box as='ul' className='space-y-1 text-foreground'>
									<z.box as='li'>&quot;Get started&quot;</z.box>
									<z.box as='li'>&quot;Join now&quot;</z.box>
									<z.box as='li'>&quot;Let&apos;s go&quot;</z.box>
									<z.box as='li'>&quot;Save changes&quot;</z.box>
								</z.box>
							</z.box>
							<z.box>
								<z.text className='text-neon-pink text-xs uppercase tracking-wider block mb-2'>Don&apos;t</z.text>
								<z.box as='ul' className='space-y-1 text-muted-foreground line-through'>
									<z.box as='li'>&quot;Click here to begin&quot;</z.box>
									<z.box as='li'>&quot;Submit your information&quot;</z.box>
									<z.box as='li'>&quot;Proceed to next step&quot;</z.box>
									<z.box as='li'>&quot;Update your settings&quot;</z.box>
								</z.box>
							</z.box>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-border p-6'>
						<z.text.h4 isPrimary isBold className='mb-4'>
							Error States
						</z.text.h4>
						<z.box className='grid md:grid-cols-2 gap-4 text-sm'>
							<z.box>
								<z.text className='text-neon-purple text-xs uppercase tracking-wider block mb-2'>Do</z.text>
								<z.box as='ul' className='space-y-1 text-foreground'>
									<z.box as='li'>&quot;Something broke. We&apos;re on it.&quot;</z.box>
									<z.box as='li'>&quot;That didn&apos;t work. Try again?&quot;</z.box>
									<z.box as='li'>&quot;Oops. Let&apos;s fix that.&quot;</z.box>
								</z.box>
							</z.box>
							<z.box>
								<z.text className='text-neon-pink text-xs uppercase tracking-wider block mb-2'>Don&apos;t</z.text>
								<z.box as='ul' className='space-y-1 text-muted-foreground line-through'>
									<z.box as='li'>&quot;An unexpected error has occurred&quot;</z.box>
									<z.box as='li'>&quot;Please try again later&quot;</z.box>
									<z.box as='li'>&quot;Error code: 500&quot;</z.box>
								</z.box>
							</z.box>
						</z.box>
					</z.box>

					<z.box className='rounded-lg border border-border p-6'>
						<z.text.h4 isPrimary isBold className='mb-4'>
							Empty States
						</z.text.h4>
						<z.box className='grid md:grid-cols-2 gap-4 text-sm'>
							<z.box>
								<z.text className='text-neon-purple text-xs uppercase tracking-wider block mb-2'>Do</z.text>
								<z.box as='ul' className='space-y-1 text-foreground'>
									<z.box as='li'>&quot;Nothing here yet. Make some magic.&quot;</z.box>
									<z.box as='li'>&quot;Your canvas is empty. Time to create.&quot;</z.box>
									<z.box as='li'>&quot;No results. Try something else?&quot;</z.box>
								</z.box>
							</z.box>
							<z.box>
								<z.text className='text-neon-pink text-xs uppercase tracking-wider block mb-2'>Don&apos;t</z.text>
								<z.box as='ul' className='space-y-1 text-muted-foreground line-through'>
									<z.box as='li'>&quot;No items to display&quot;</z.box>
									<z.box as='li'>&quot;This section is empty&quot;</z.box>
									<z.box as='li'>&quot;0 results found&quot;</z.box>
								</z.box>
							</z.box>
						</z.box>
					</z.box>
				</z.box>
			</DocsSection>

			<DocsSection className='text-center'>
				<z.box as='blockquote' className='text-primary font-bold text-3xl md:text-4xl leading-tight max-w-3xl mx-auto'>
					&quot;Drop the base. It&apos;s cooler.&quot;
				</z.box>
				<z.text.body className='text-muted-foreground mt-4'>— The tasteink manifesto</z.text.body>
			</DocsSection>
		</z.box>
	)
}
