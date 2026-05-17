import type { Meta, StoryObj } from '@storybook/nextjs'
import { CodeBlock } from './codeblock'

const doCode = `// Namespace import (preferred)
import * as Phosphor from "@phosphor-icons/react";

<Phosphor.ArrowRight size={20} weight="regular" />`

const dontCode = `import { ArrowRight } from "lucide-react";

<svg viewBox="0 0 24 24">...

<img src="/icons/arrow.svg" />`

const longCode = `import { z } from "@/components/ui";

const commands = [
  "ship the thing",
  "keep the surface quiet",
  "make scrolling boring in the good way",
];

export function Example() {
  return (
    <z.codeblock
      label="Example"
      content={commands.join("\\n")}
      height={160}
      maxHeight={220}
    />
  );
}`

const meta: Meta<typeof CodeBlock> = {
	title: 'UI/CodeBlock',
	component: CodeBlock,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		label: 'Do',
		content: doCode,
		language: 'tsx',
		height: 180,
		tone: 'success'
	}
}

export default meta

type StoryT = StoryObj<typeof CodeBlock>

export const Default: StoryT = {}

export const DoAndDont: StoryT = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		return (
			<div className='grid gap-6 p-8 md:grid-cols-2'>
				<CodeBlock label='Do' content={doCode} height={180} tone='success' />
				<CodeBlock label="Don't" content={dontCode} height={180} tone='danger' strikeThrough />
			</div>
		)
	}
}

export const ConstrainedHeight: StoryT = {
	render: () => {
		return (
			<div className='w-[520px]'>
				<CodeBlock label='Scrollable' content={longCode} height={140} minHeight={120} maxHeight={180} />
			</div>
		)
	}
}
