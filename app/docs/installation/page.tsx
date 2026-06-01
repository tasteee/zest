import {
	DocsTitle,
	DocsDescription,
	DocsSection,
	DocsSectionTitle,
	DocsText,
	DocsList,
	DocsNote
} from '@/components/docs/mdx-components'
import { CodeBlock } from '@/components/docs/code-block'
import { z } from '@/components/ui'

export default function InstallationPage() {
	return (
		<z.box>
			<DocsTitle>Installation</DocsTitle>
			<DocsDescription>Get up and running with Zest in seconds.</DocsDescription>

			<DocsSection>
				<DocsSectionTitle>Install the package</DocsSectionTitle>
				<DocsText>Install Zest using your preferred package manager:</DocsText>
				<CodeBlock code={`npm install @tasteee/zest`} language='bash' filename='Terminal' />
				<DocsText>Or with other package managers:</DocsText>
				<CodeBlock
					code={`# yarn
yarn add @tasteee/zest

# pnpm
pnpm add @tasteee/zest

# bun
bun add @tasteee/zest`}
					language='bash'
					filename='Terminal'
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Usage</DocsSectionTitle>
				<DocsText>Import and use any component from the library:</DocsText>
				<CodeBlock
					code={`import { z, ZCard, ZInput } from '@tasteee/zest'

export function MyComponent() {
  return (
    <ZCard>
      <ZInput placeholder="Enter your email" />
      <z.button>Subscribe</z.button>
    </ZCard>
  )
}`}
					language='tsx'
					filename='app/page.tsx'
					showLineNumbers
				/>
			</DocsSection>

			<DocsSection>
				<DocsSectionTitle>Requirements</DocsSectionTitle>
				<DocsList>
					<z.box as='li'>React 18 or later</z.box>
					<z.box as='li'>Tailwind CSS 4.0 or later</z.box>
				</DocsList>
			</DocsSection>

			<DocsNote variant='success'>You&apos;re all set. Start building interfaces that hit different.</DocsNote>
		</z.box>
	)
}
