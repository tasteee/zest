'use client'

import { Link } from '@/components/ui/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ChevronRight } from 'lucide-react'
import { codeBlockProps } from './props'
import { examples } from './examples'
const CodeBlockDocsPage = () => {
	return (
		<div className='space-y-16'>
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs'>Docs</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components'>Components</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Code Block</span>
			</div>

			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>z.codeblock</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-3xl leading-relaxed'>
					Syntax-highlighted code display with zest-dark semantics powered by starry-night. Use it for docs, examples, and
					developer-facing UI surfaces.
				</p>
			</div>

			<ComponentPreview code={examples.previewCode} title='Quick Preview' description='Configurable labels, tones, and dimensions.'>
				<div className='w-full max-w-3xl'>
					<z.codeblock
						label='Component'
						language='tsx'
						tone='success'
						height={220}
						content={`type LinkPropsT = {
  href: string
  label: string
}

export const LinkItem = (props: LinkPropsT) => {
  return <a href={props.href}>{props.label}</a>
}`}
					/>
				</div>
			</ComponentPreview>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</section>

			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>
				<ComponentPreview
					code={examples.languageExamples}
					title='Multiple Languages'
					description='Use language flags to drive highlighting.'
				>
					<div className='grid w-full gap-4 md:grid-cols-2'>
						<z.codeblock label='Styles' language='css' height={140} content={'.button {\n  color: var(--color-neon-purple);\n}'} />
						<z.codeblock label='Install' language='bash' tone='muted' height={140} content={'pnpm add @wooorm/starry-night'} />
					</div>
				</ComponentPreview>

				<ComponentPreview
					code={examples.doAndDoNot}
					title='Do And Do Not'
					description='Strike-through helps communicate anti-patterns clearly.'
				>
					<div className='grid w-full gap-4 md:grid-cols-2'>
						<z.codeblock label='Do' tone='success' language='tsx' height={180} content={examples.doCode} />
						<z.codeblock label="Don't" tone='danger' language='tsx' height={180} strikeThrough content={examples.dontCode} />
					</div>
				</ComponentPreview>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Props</h2>
				<PropsTable props={codeBlockProps} />
			</section>
		</div>
	)
}

export default CodeBlockDocsPage
