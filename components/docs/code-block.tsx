'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { CodeBlock as UiCodeBlock } from '@/components/ui/codeblock'

type CodeBlockPropsT = {
	code: string
	language?: string
	filename?: string
	showLineNumbers?: boolean
	className?: string
}

export const CodeBlock = (props: CodeBlockPropsT) => {
	const [copied, setCopied] = useState(false)
	const language = props.language ?? 'tsx'
	const shouldShowLineNumbers = props.showLineNumbers === true
	const hasFilename = props.filename != null
	const copyButtonOffsetClassName = hasFilename ? 'top-11' : 'top-3'

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(props.code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const lines = props.code.split('\n')
	const highlightedCodeBlockClassName = cn(hasFilename && 'rounded-t-none')
	const lineNumberCodeBlockClassName = cn(
		'overflow-x-auto p-4 text-sm font-mono bg-card border border-border',
		hasFilename ? 'rounded-b-lg border-t-0' : 'rounded-lg'
	)

	return (
		<div className={cn('relative group', props.className)}>
			{hasFilename ? (
				<div className='flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30'>
					<span className='text-xs font-mono text-muted-foreground'>{props.filename}</span>
					<span className='text-xs font-mono text-muted-foreground uppercase'>{language}</span>
				</div>
			) : null}
			<div className='relative'>
				{shouldShowLineNumbers ? (
					<pre className={lineNumberCodeBlockClassName}>
						<code className='text-foreground'>
							<table className='border-collapse'>
								<tbody>
									{lines.map((line, index) => (
										<tr key={index}>
											<td className='pr-4 text-right text-muted-foreground select-none w-8'>{index + 1}</td>
											<td className='whitespace-pre'>{line}</td>
										</tr>
									))}
								</tbody>
							</table>
						</code>
					</pre>
				) : (
					<UiCodeBlock className={highlightedCodeBlockClassName} content={props.code} language={language} height='auto' />
				)}
				<button
					onClick={copyToClipboard}
					className={cn(
						'absolute right-3 p-2 rounded-md transition-all',
						copyButtonOffsetClassName,
						'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground',
						'opacity-0 group-hover:opacity-100 focus:opacity-100'
					)}
					aria-label='Copy code'
				>
					{copied ? <CheckIcon className='h-4 w-4 text-primary' /> : <CopyIcon className='h-4 w-4' />}
				</button>
			</div>
		</div>
	)
}

type InlineCodePropsT = {
	children: React.ReactNode
	className?: string
}

export const InlineCode = (props: InlineCodePropsT) => {
	return (
		<code
			className={cn('relative rounded bg-muted px-[0.4em] py-[0.2em] font-mono text-sm text-foreground', props.className)}
		>
			{props.children}
		</code>
	)
}
