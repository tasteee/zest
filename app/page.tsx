'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/brand/hero-section'
import { ColorSystem } from '@/components/brand/color-system'
import { TypographySystem } from '@/components/brand/typography-system'
import { ComponentShowcase } from '@/components/brand/component-showcase'
import { VoiceTone } from '@/components/brand/voice-tone'
import { IconsAssets } from '@/components/brand/icons-assets'
import { UsageExamples } from '@/components/brand/usage-examples'
import { Navigation } from '@/components/brand/navigation'

export default function BrandGuidePage() {
	const [activeSection, setActiveSection] = useState('hero')

	return (
		<div className='min-h-screen bg-gradient-to-b from-[#050908] via-[#0a0f0a] to-[#0d120d]'>
			<Navigation activeSection={activeSection} />

			<main className='relative'>
				<HeroSection onInView={() => setActiveSection('hero')} />
				<ColorSystem onInView={() => setActiveSection('colors')} />
				<TypographySystem onInView={() => setActiveSection('typography')} />
				<ComponentShowcase onInView={() => setActiveSection('components')} />
				{/* <VoiceTone onInView={() => setActiveSection("voice")} /> */}
				{/* <IconsAssets onInView={() => setActiveSection("icons")} /> */}
				{/* <UsageExamples onInView={() => setActiveSection("usage")} /> */}

				{/* Footer */}
				<footer className='border-t border-border py-20 px-6 lg:px-12'>
					<div className='max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8'>
						<div>
							<p className='text-muted-foreground text-sm'>Built with intention. Designed without compromise.</p>
						</div>
						<div className='flex items-center gap-6'>
							<span className='text-neon-green text-xs font-medium tracking-wider uppercase'>v1.0</span>
							<span className='text-muted-foreground text-xs'>2026</span>
						</div>
					</div>
				</footer>
			</main>
		</div>
	)
}
