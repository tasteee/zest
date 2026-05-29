export const examples = {
	previewCode:
		`import { z } from '@tasteee/zest'

const componentCode = ` +
		'`' +
		`type LinkPropsT = {
  href: string
  label: string
}

export const LinkItem = (props: LinkPropsT) => {
  return <a href={props.href}>{props.label}</a>
}
` +
		'`' +
		`

export const Example = () => {
  return (
    <z.codeblock
      label='Component'
      language='tsx'
      content={componentCode}
      tone='success'
      height={220}
    />
  )
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.codeblock content={sourceCode} language='tsx' />`,

	languageExamples: `const cssSample = '.button { color: var(--color-neon-purple); }'
const bashSample = 'pnpm add @wooorm/starry-night'

<div className='grid gap-4 md:grid-cols-2'>
  <z.codeblock label='Styles' language='css' content={cssSample} height={140} />
  <z.codeblock label='Install' language='bash' content={bashSample} height={140} tone='muted' />
</div>`,

	doAndDoNot: `import { z } from '@tasteee/zest'

<div className='grid gap-4 md:grid-cols-2'>
  <z.codeblock label='Do' tone='success' content={doCode} />
  <z.codeblock label="Don't" tone='danger' strikeThrough content={dontCode} />
</div>`,

	doCode: `import { z } from '@tasteee/zest'

<z.codeblock
  label='Do'
  tone='success'
  language='tsx'
  content={safeCode}
/>`,

	dontCode: `<pre className='rounded border p-4'>
  {unsafeCode}
</pre>`
} as const
