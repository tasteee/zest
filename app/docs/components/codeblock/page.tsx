'use client'import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ChevronRight } from 'lucide-react'
import { codeBlockProps } from './props'
import { examples } from './examples'
const CodeBlockDocsPage = () => {
	return (
		<z.box className='space-y-16'>
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<z.link href='/docs'>Docs</z.link>
				<ChevronRight className='h-4 w-4' />
				<z.link href='/docs/components'>Components</z.link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Code Block</z.text>
			</z.box>

			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>z.codeblock</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-3xl leading-relaxed'>
					Syntax-highlighted code display with zest-dark semantics powered by starry-night. Use it for docs, examples, and
					developer-facing UI surfaces.
				</z.text.body>
			</z.box>

			<ComponentPreview code={examples.previewCode} title='Quick Preview' description='Configurable labels, tones, and dimensions.'>
				<z.box className='w-full max-w-3xl'>
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
				</z.box>
			</ComponentPreview>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock code={examples.usage} language='tsx' />
			</z.box>

			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>
				<ComponentPreview
					code={examples.languageExamples}
					title='Multiple Languages'
					description='Use language flags to drive highlighting.'
				>
					<z.box className='grid w-full gap-4 md:grid-cols-2'>
						<z.codeblock label='Styles' language='css' height={140} content={'.button {\n  color: var(--color-neon-purple);\n}'} />
						<z.codeblock label='Install' language='bash' tone='muted' height={140} content={'pnpm add @wooorm/starry-night'} />
					</z.box>
				</ComponentPreview>

				<ComponentPreview
					code={examples.doAndDoNot}
					title='Do And Do Not'
					description='Strike-through helps communicate anti-patterns clearly.'
				>
					<z.box className='grid w-full gap-4 md:grid-cols-2'>
						<z.codeblock label='Do' tone='success' language='tsx' height={180} content={examples.doCode} />
						<z.codeblock label="Don't" tone='danger' language='tsx' height={180} strikeThrough content={examples.dontCode} />
					</z.box>
				</ComponentPreview>
			</z.box>

			<z.box as='section' className='space-y-6'>
				<z.text.h2>Props</z.text.h2>
				<PropsTable props={codeBlockProps} />
			</z.box>
		</z.box>
	)
}

export default CodeBlockDocsPage
