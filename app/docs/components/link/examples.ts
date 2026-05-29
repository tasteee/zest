export const examples = {
	quickPreview: `import { Link } from '@tasteee/zest'

export function LinkDemo() {
  return <Link href="#">Read the docs</Link>
}`,

	usageImport: `import { Link } from '@tasteee/zest'`,

	usage: `<Link href="/docs">Read the docs</Link>`,

	colorVariants: `<div className="flex flex-wrap gap-4">
  <Link href="#" color="default">Default link</Link>
  <Link href="#" color="purple">Purple link</Link>
  <Link href="#" color="pink">Pink link</Link>
  <Link href="#" color="neutral">Neutral link</Link>
  <Link href="#" color="muted">Muted link</Link>
</div>`,

	withIcons: `import { ExternalLink, ArrowRight } from 'lucide-react'

<div className="flex flex-wrap gap-4">
  <Link href="#" color="purple">
    Visit site
    <ExternalLink className="h-3.5 w-3.5" />
  </Link>
  <Link href="#" color="pink">
    Learn more
    <ArrowRight className="h-3.5 w-3.5" />
  </Link>
</div>`,

	withRouterLink: `import NextLink from 'next/link'
import { Link } from '@tasteee/zest'

<div className="flex flex-wrap gap-4">
  <Link as={NextLink} href="/docs/components/button" color="purple">
    Button docs
  </Link>
  <Link as={NextLink} to="/docs/components/badge" color="pink">
    Badge docs
  </Link>
</div>`,

	inlineInText: `<p className="text-muted-foreground">
  Read the{' '}
  <Link href="#" color="purple">full documentation</Link>{' '}
  to learn more about the design system and its principles.
</p>`
} as const
